// Cloudflare Pages Function — Claude API proxy
// Keeps ANTHROPIC_API_KEY server-side, never in client bundle

interface Env {
  ANTHROPIC_API_KEY: string;
}

interface ChatRequest {
  scenarioId: string;
  scenarioTitle: string;
  scenarioSetting: string;
  mode: "IN_SCENE" | "COACH" | "DRILL";
  history: Array<{ role: "user" | "assistant"; content: string }>;
  userMessage: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing ANTHROPIC_API_KEY" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const systemPrompt = buildSystemPrompt(body);

  const messages = [
    ...body.history.filter((m) => m.role === "user" || m.role === "assistant"),
    ...(body.userMessage ? [{ role: "user" as const, content: body.userMessage }] : []),
  ];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: `Anthropic error: ${err}` }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data: any = await response.json();
    const text: string = data.content?.[0]?.text ?? "";

    let parsed: any;
    try {
      parsed = JSON.parse(text.trim().replace(/^```json\s*|\s*```$/g, ""));
    } catch {
      parsed = {
        russian_text: text,
        transliteration: "",
        english_gloss: "",
        corrections: [],
        scene_complete: false,
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

function buildSystemPrompt(args: ChatRequest): string {
  return `You are Лена, a warm Russian tutor and conversation partner. You help an English speaker living in Russia practice everyday Russian interactions.

SCENARIO: ${args.scenarioTitle} — ${args.scenarioSetting}
CURRENT MODE: ${args.mode}

RULES:
- IN_SCENE mode: Play the Russian character (shopkeeper, cashier, official, etc). Speak ONLY Russian. Max 1–2 short sentences. Then wait. Never blend into English. If the user makes a grammar error that doesn't block comprehension, recast the correct form naturally in your reply and log it in corrections[]. Greet first if history is empty.
- COACH mode: Switch to English. Explain what just happened, correct errors, teach the grammar pattern briefly (2–4 sentences). Then offer to return to the scene.
- DRILL mode: Fire one rapid number/price/weight prompt in Russian. Grade the response strictly.

ERROR HANDLING:
- Recast errors naturally — don't lecture. Log them in corrections[].
- If the error blocks comprehension: ask for clarification in-character ("Простите?").
- Set scene_complete=true only when the transaction reaches a natural close.

OUTPUT FORMAT — return ONLY valid JSON, no markdown fences:
{
  "russian_text": string,
  "transliteration": string,
  "english_gloss": string,
  "corrections": [{"was": string, "fix": string, "why": string}],
  "scene_complete": boolean,
  "next_state": {}
}`;
}
