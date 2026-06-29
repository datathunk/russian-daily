import { t as Anthropic } from "../_libs/@anthropic-ai/sdk+[...].mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BXX2GHSp.mjs";
import { a as objectType, i as enumType, n as arrayType, o as recordType, r as booleanType, s as stringType, t as anyType } from "../_libs/zod.mjs";
import process from "node:process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/chat.functions-CQhDjkg7.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _client;
function getAnthropicClient() {
	if (!_client) {
		const apiKey = process.env.ANTHROPIC_API_KEY;
		if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY in environment");
		_client = new Anthropic({ apiKey });
	}
	return _client;
}
var DATA_DIR = process.env.DB_PATH ?? "data";
function readJson(file) {
	const p = join(DATA_DIR, file);
	if (!existsSync(p)) return [];
	try {
		return JSON.parse(readFileSync(p, "utf-8"));
	} catch {
		return [];
	}
}
function writeJson(file, data) {
	mkdirSync(DATA_DIR, { recursive: true });
	writeFileSync(join(DATA_DIR, file), JSON.stringify(data, null, 2));
}
var MessageSchema = objectType({
	role: enumType([
		"user",
		"assistant",
		"system"
	]),
	content: stringType()
});
var TutorReplySchema = objectType({
	russian_text: stringType(),
	transliteration: stringType().default(""),
	english_gloss: stringType().default(""),
	corrections: arrayType(objectType({
		was: stringType(),
		fix: stringType(),
		why: stringType()
	})).default([]),
	scene_complete: booleanType().default(false),
	next_state: recordType(anyType()).optional()
});
var InputSchema = objectType({
	scenarioId: stringType(),
	scenarioTitle: stringType(),
	scenarioSetting: stringType(),
	mode: enumType([
		"IN_SCENE",
		"COACH",
		"DRILL"
	]),
	history: arrayType(MessageSchema).default([]),
	userMessage: stringType().default(""),
	state: recordType(anyType()).default({})
});
function systemPrompt(args) {
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
var sendChatMessage_createServerFn_handler = createServerRpc({
	id: "abb0f390d0d9d5c002c238029f7d6ac7eceb5f795c2ff0103d4fb2cfd687a422",
	name: "sendChatMessage",
	filename: "src/lib/chat.functions.ts"
}, (opts) => sendChatMessage.__executeServer(opts));
var sendChatMessage = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(sendChatMessage_createServerFn_handler, async ({ data, context }) => {
	const response = await getAnthropicClient().messages.create({
		model: "claude-sonnet-4-6",
		max_tokens: 1024,
		system: systemPrompt(data),
		messages: [...data.history.filter((m) => m.role !== "system"), ...data.userMessage ? [{
			role: "user",
			content: data.userMessage
		}] : []]
	});
	const rawText = response.content[0]?.type === "text" ? response.content[0].text : "";
	let parsed;
	try {
		const text = rawText.trim().replace(/^```json\s*|\s*```$/g, "");
		parsed = TutorReplySchema.parse(JSON.parse(text));
	} catch {
		parsed = {
			russian_text: rawText,
			transliteration: "",
			english_gloss: "",
			corrections: [],
			scene_complete: false
		};
	}
	try {
		const userId = context.userId;
		const rows = readJson("scenario_progress.json");
		const idx = rows.findIndex((r) => r.user_id === userId && r.scenario_id === data.scenarioId);
		if (idx >= 0) {
			if (parsed.scene_complete) {
				rows[idx] = {
					...rows[idx],
					times_practiced: (rows[idx].times_practiced ?? 0) + 1,
					confidence: Math.min(5, (rows[idx].confidence ?? 0) + 1),
					last_practiced_at: (/* @__PURE__ */ new Date()).toISOString()
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
				last_practiced_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			writeJson("scenario_progress.json", rows);
		}
	} catch (e) {
		console.warn("progress update failed", e);
	}
	return parsed;
});
var confirmRealLifeUse_createServerFn_handler = createServerRpc({
	id: "33b58f5d5489266a049f39cf22dab45fb4355e717ef5844af983a1581d70c62f",
	name: "confirmRealLifeUse",
	filename: "src/lib/chat.functions.ts"
}, (opts) => confirmRealLifeUse.__executeServer(opts));
var confirmRealLifeUse = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	phraseId: stringType(),
	scenarioId: stringType().optional()
}).parse(input)).handler(confirmRealLifeUse_createServerFn_handler, async ({ data, context }) => {
	const rows = readJson("real_life_uses.json");
	rows.push({
		id: crypto.randomUUID(),
		user_id: context.userId,
		phrase_id: data.phraseId,
		scenario_id: data.scenarioId ?? null,
		confirmed_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	writeJson("real_life_uses.json", rows);
	return { ok: true };
});
var getWeeklyRealLifeCount_createServerFn_handler = createServerRpc({
	id: "148e90b05d61d224626ebdc2f4ffb87b023640e2461864c43aa7db1bc76ae5b3",
	name: "getWeeklyRealLifeCount",
	filename: "src/lib/chat.functions.ts"
}, (opts) => getWeeklyRealLifeCount.__executeServer(opts));
var getWeeklyRealLifeCount = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getWeeklyRealLifeCount_createServerFn_handler, async ({ context }) => {
	const since = (/* @__PURE__ */ new Date(Date.now() - 168 * 3600 * 1e3)).toISOString();
	return { count: readJson("real_life_uses.json").filter((r) => r.user_id === context.userId && r.confirmed_at >= since).length };
});
var getAllScenarioProgress_createServerFn_handler = createServerRpc({
	id: "cb2275e82cea5c7a5c891c4ec4291794f409d242f981ff13ffa6daf5fd3b8bf4",
	name: "getAllScenarioProgress",
	filename: "src/lib/chat.functions.ts"
}, (opts) => getAllScenarioProgress.__executeServer(opts));
var getAllScenarioProgress = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAllScenarioProgress_createServerFn_handler, async ({ context }) => {
	return { progress: readJson("scenario_progress.json").filter((r) => r.user_id === context.userId).map(({ scenario_id, confidence, times_practiced, can_do_confirmed }) => ({
		scenario_id,
		confidence,
		times_practiced,
		can_do_confirmed
	})) };
});
//#endregion
export { confirmRealLifeUse_createServerFn_handler, getAllScenarioProgress_createServerFn_handler, getWeeklyRealLifeCount_createServerFn_handler, sendChatMessage_createServerFn_handler };
