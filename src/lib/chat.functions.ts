import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getAnthropicClient } from "./ai-gateway.server";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { z } from "zod";

// ---------------------------------------------------------------------------
// JSON file-based persistence (replaces Supabase)
// ---------------------------------------------------------------------------

const DATA_DIR = process.env.DB_PATH ?? "data";

function readJson(file: string): any[] {
  try {
    const p = join(DATA_DIR, file);
    if (!existsSync(p)) return [];
    return JSON.parse(readFileSync(p, "utf-8"));
  } catch {
    return []; // no-op on CF Workers (no filesystem)
  }
}

function writeJson(file: string, data: any[]) {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(join(DATA_DIR, file), JSON.stringify(data, null, 2));
  } catch {
    // no-op on CF Workers (no filesystem)
  }
}

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

const TutorReplySchema = z.object({
  russian_text: z.string(),
  transliteration: z.string().default(""),
  english_gloss: z.string().default(""),
  corrections: z
    .array(z.object({ was: z.string(), fix: z.string(), why: z.string() }))
    .default([]),
  scene_complete: z.boolean().default(false),
  next_state: z.record(z.any()).optional(),
});

export type TutorReply = z.infer<typeof TutorReplySchema>;

const InputSchema = z.object({
  scenarioId: z.string(),
  scenarioTitle: z.string(),
  scenarioSetting: z.string(),
  mode: z.enum(["IN_SCENE", "COACH", "DRILL"]),
  history: z.array(MessageSchema).default([]),
  userMessage: z.string().default(""),
  state: z.record(z.any()).default({}),
});

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

function systemPrompt(args: z.infer<typeof InputSchema>) {
  return `You are Лена, a warm Russian tutor and conversation partner. You help an English speaker living in Russia practice everyday Russian interactions.

SCENARIO: ${args.scenarioTitle} — ${args.scenarioSetting}
CURRENT MODE: ${args.mode}
CURRENT STATE: ${JSON.stringify(args.state)}

RULES:
- IN_SCENE mode: Play the Russian character (shopkeeper, cashier, official, etc). Speak ONLY Russian. Max 1–2 short sentences. Then wait. Never blend into English. Never over-explain. If the user makes a grammar error that doesn't block comprehension, recast the correct form naturally in your reply and log it in corrections[]. Greet first if history is empty.
- COACH mode: Switch to English. Explain what just happened, correct errors, teach the grammar pattern briefly (2–4 sentences). Then offer to return to the scene.
- DRILL mode: Fire one rapid number/price/weight prompt in Russian. Grade the response strictly.

ERROR HANDLING:
- If the error doesn't block comprehension: recast it in your reply, add to corrections[].
- If it blocks comprehension: ask for clarification in-character ("Простите?").
- Never praise mediocre output. Recast and move on.
- Set scene_complete=true only when the transaction has reached a natural close (e.g. "С вас 145 рублей. Спасибо!" after payment, "Хорошего дня!").

OUTPUT FORMAT — return ONLY a single JSON object, no markdown fences, no commentary. Schema:
{
  "russian_text": string,        // What Лена/character says this turn (Russian in IN_SCENE/DRILL, English in COACH)
  "transliteration": string,     // Latin transliteration of russian_text (empty in COACH)
  "english_gloss": string,       // Short English meaning (empty in COACH)
  "corrections": [{"was": string, "fix": string, "why": string}],
  "scene_complete": boolean,
  "next_state": object
}`;
}

// ---------------------------------------------------------------------------
// Server functions
// ---------------------------------------------------------------------------

export const sendChatMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const client = getAnthropicClient();

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt(data),
      messages: [
        ...data.history.filter((m) => m.role !== "system"),
        ...(data.userMessage
          ? [{ role: "user" as const, content: data.userMessage }]
          : []),
      ],
    });

    const rawText =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    let parsed: TutorReply;
    try {
      const text = rawText.trim().replace(/^```json\s*|\s*```$/g, "");
      parsed = TutorReplySchema.parse(JSON.parse(text));
    } catch {
      parsed = {
        russian_text: rawText,
        transliteration: "",
        english_gloss: "",
        corrections: [],
        scene_complete: false,
      };
    }

    // bump scenario_progress via JSON file
    try {
      const userId = context.userId;
      const rows: any[] = readJson("scenario_progress.json");
      const idx = rows.findIndex(
        (r) => r.user_id === userId && r.scenario_id === data.scenarioId,
      );
      if (idx >= 0) {
        if (parsed.scene_complete) {
          rows[idx] = {
            ...rows[idx],
            times_practiced: (rows[idx].times_practiced ?? 0) + 1,
            confidence: Math.min(5, (rows[idx].confidence ?? 0) + 1),
            last_practiced_at: new Date().toISOString(),
          };
          writeJson("scenario_progress.json", rows);
        }
      } else {
        rows.push({
          id: crypto.randomUUID(),
          user_id: userId,
          scenario_id: data.scenarioId,
          times_practiced: parsed.scene_complete ? 1 : 0,
          confidence: parsed.scene_complete ? 1 : 0,
          last_practiced_at: new Date().toISOString(),
        });
        writeJson("scenario_progress.json", rows);
      }
    } catch (e) {
      console.warn("progress update failed", e);
    }

    return parsed;
  });

export const confirmRealLifeUse = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({ phraseId: z.string(), scenarioId: z.string().optional() })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const rows: any[] = readJson("real_life_uses.json");
    rows.push({
      id: crypto.randomUUID(),
      user_id: context.userId,
      phrase_id: data.phraseId,
      scenario_id: data.scenarioId ?? null,
      confirmed_at: new Date().toISOString(),
    });
    writeJson("real_life_uses.json", rows);
    return { ok: true };
  });

export const getWeeklyRealLifeCount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
    const rows: any[] = readJson("real_life_uses.json");
    const count = rows.filter(
      (r) => r.user_id === context.userId && r.confirmed_at >= since,
    ).length;
    return { count };
  });

export const getAllScenarioProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const rows: any[] = readJson("scenario_progress.json");
    const progress = rows
      .filter((r) => r.user_id === context.userId)
      .map(({ scenario_id, confidence, times_practiced, can_do_confirmed }) => ({
        scenario_id,
        confidence,
        times_practiced,
        can_do_confirmed,
      }));
    return { progress };
  });
