import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as useRouter, O as isRedirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-Bta1hCgK.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BXX2GHSp.mjs";
import { a as objectType, i as enumType, n as arrayType, o as recordType, s as stringType, t as anyType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat.functions-DIXOzQUw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var categories = [
	{
		id: "supermarket",
		nameRu: "Супермаркет",
		nameEn: "Supermarket & Market",
		icon: "🛒",
		scenarios: [
			{
				id: "checkout",
				titleRu: "На кассе",
				titleEn: "At the checkout",
				canDo: "I can handle the checkout",
				photo: "supermarket-checkout"
			},
			{
				id: "deli_counter",
				titleRu: "У прилавка",
				titleEn: "At the deli counter",
				canDo: "I can order at the deli",
				photo: "deli-counter"
			},
			{
				id: "produce",
				titleRu: "Фрукты и овощи",
				titleEn: "Fruit and veg section",
				canDo: "I can buy produce by weight",
				photo: "produce-market"
			},
			{
				id: "find_item",
				titleRu: "Где это?",
				titleEn: "Finding items",
				canDo: "I can ask where things are",
				photo: "supermarket-aisle"
			}
		]
	},
	{
		id: "numbers",
		nameRu: "Числа и цены",
		nameEn: "Numbers, Prices & Weights",
		icon: "🔢",
		scenarios: [
			{
				id: "prices_1_20",
				titleRu: "Цены 1–20",
				titleEn: "Prices 1–20",
				canDo: "I understand prices under 20 rubles",
				photo: "price-tag"
			},
			{
				id: "prices_to_1000",
				titleRu: "Цены до 1000",
				titleEn: "Prices up to 1000₽",
				canDo: "I understand prices at normal speed",
				photo: "cash-register"
			},
			{
				id: "weights",
				titleRu: "Вес и граммы",
				titleEn: "Weights and grams",
				canDo: "I can order by weight",
				photo: "market-scale"
			},
			{
				id: "number_noun",
				titleRu: "Число + слово",
				titleEn: "1 рубль / 2 рубля / 5 рублей",
				canDo: "I know the 1/2-4/5+ rule",
				photo: "numbers"
			}
		]
	},
	{
		id: "food",
		nameRu: "Продукты",
		nameEn: "Food: Fruit, Veg, Meat, Fish",
		icon: "🥕",
		scenarios: [
			{
				id: "vegetables",
				titleRu: "Овощи",
				titleEn: "Vegetables",
				canDo: "I know 15 vegetables",
				photo: "vegetables"
			},
			{
				id: "fruit",
				titleRu: "Фрукты",
				titleEn: "Fruit",
				canDo: "I know 10 fruits",
				photo: "fruit-market"
			},
			{
				id: "meat",
				titleRu: "Мясо",
				titleEn: "Meat",
				canDo: "I can order meat at the counter",
				photo: "butcher"
			},
			{
				id: "fish",
				titleRu: "Рыба",
				titleEn: "Fish",
				canDo: "I can buy fish by weight",
				photo: "fish-market"
			}
		]
	},
	{
		id: "questions",
		nameRu: "Вопросы",
		nameEn: "Asking Questions",
		icon: "❓",
		scenarios: [
			{
				id: "where",
				titleRu: "Где находится?",
				titleEn: "Where is...?",
				canDo: "I can ask and understand directions",
				photo: "asking-directions"
			},
			{
				id: "how_much",
				titleRu: "Сколько стоит?",
				titleEn: "How much is it?",
				canDo: "I can ask and understand prices",
				photo: "price-inquiry"
			},
			{
				id: "do_you_have",
				titleRu: "У вас есть?",
				titleEn: "Do you have...?",
				canDo: "I can ask for items I need",
				photo: "shop-inquiry"
			},
			{
				id: "can_i",
				titleRu: "Можно?",
				titleEn: "Can I...? / May I...?",
				canDo: "I can use Можно for permission/requests",
				photo: "polite-request"
			}
		]
	},
	{
		id: "pharmacy",
		nameRu: "Аптека",
		nameEn: "Pharmacy & Health",
		icon: "💊",
		scenarios: [{
			id: "pharmacy_basic",
			titleRu: "В аптеке",
			titleEn: "In the pharmacy",
			canDo: "I can ask for basic medication",
			photo: "pharmacy"
		}, {
			id: "symptoms",
			titleRu: "Что болит",
			titleEn: "Describing symptoms",
			canDo: "I can say what hurts",
			photo: "health"
		}]
	},
	{
		id: "transport",
		nameRu: "Транспорт",
		nameEn: "Transport & Directions",
		icon: "🚇",
		scenarios: [{
			id: "taxi",
			titleRu: "Такси",
			titleEn: "Taking a taxi",
			canDo: "I can tell a taxi driver where to go",
			photo: "taxi"
		}, {
			id: "metro",
			titleRu: "Метро",
			titleEn: "Metro",
			canDo: "I can navigate the metro",
			photo: "metro"
		}]
	},
	{
		id: "cafe",
		nameRu: "Кафе",
		nameEn: "Café & Restaurant",
		icon: "☕",
		scenarios: [{
			id: "ordering",
			titleRu: "Заказ",
			titleEn: "Ordering",
			canDo: "I can order food and drinks",
			photo: "cafe"
		}, {
			id: "paying",
			titleRu: "Оплата",
			titleEn: "Paying the bill",
			canDo: "I can ask for the bill and pay",
			photo: "cafe-paying"
		}]
	},
	{
		id: "money",
		nameRu: "Деньги",
		nameEn: "Money & Banking",
		icon: "💳",
		scenarios: [{
			id: "paying_methods",
			titleRu: "Как платить",
			titleEn: "Payment methods",
			canDo: "I know cash vs card phrases",
			photo: "payment"
		}]
	},
	{
		id: "smalltalk",
		nameRu: "Общение",
		nameEn: "Small Talk & Politeness",
		icon: "🤝",
		scenarios: [
			{
				id: "vy_vs_ty",
				titleRu: "Вы и ты",
				titleEn: "Formal vs informal",
				canDo: "I know when to use вы vs ты",
				photo: "conversation"
			},
			{
				id: "getting_attention",
				titleRu: "Девушка! Молодой человек!",
				titleEn: "Getting attention",
				canDo: "I can get someone's attention politely",
				photo: "asking-help"
			},
			{
				id: "softeners",
				titleRu: "Пожалуйста / Давайте / Норм",
				titleEn: "Russian softeners and fillers",
				canDo: "I sound natural not robotic",
				photo: "polite"
			}
		]
	},
	{
		id: "emergency",
		nameRu: "Срочно",
		nameEn: "Emergencies & Officials",
		icon: "🚨",
		scenarios: [{
			id: "help",
			titleRu: "Помогите!",
			titleEn: "Asking for help",
			canDo: "I can ask for help in an emergency",
			photo: "emergency"
		}, {
			id: "documents",
			titleRu: "Документы",
			titleEn: "Documents & officials",
			canDo: "I can handle a basic official interaction",
			photo: "documents"
		}]
	}
];
function findScenario(scenarioId) {
	for (const cat of categories) {
		const s = cat.scenarios.find((s) => s.id === scenarioId);
		if (s) return {
			category: cat,
			scenario: s
		};
	}
	return null;
}
function findCategory(categoryId) {
	return categories.find((c) => c.id === categoryId) ?? null;
}
function photoUrl(keyword, w = 800) {
	return `https://source.unsplash.com/${w}x${Math.round(w * .5625)}/?${encodeURIComponent(keyword)}`;
}
function todaysScenario() {
	const all = categories.flatMap((c) => c.scenarios.map((s) => ({
		category: c,
		scenario: s
	})));
	return all[Math.floor(Date.now() / (1e3 * 60 * 60 * 24)) % all.length];
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var MessageSchema = objectType({
	role: enumType([
		"user",
		"assistant",
		"system"
	]),
	content: stringType()
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
var sendChatMessage = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(createSsrRpc("abb0f390d0d9d5c002c238029f7d6ac7eceb5f795c2ff0103d4fb2cfd687a422"));
var confirmRealLifeUse = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	phraseId: stringType(),
	scenarioId: stringType().optional()
}).parse(input)).handler(createSsrRpc("33b58f5d5489266a049f39cf22dab45fb4355e717ef5844af983a1581d70c62f"));
var getWeeklyRealLifeCount = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("148e90b05d61d224626ebdc2f4ffb87b023640e2461864c43aa7db1bc76ae5b3"));
var getAllScenarioProgress = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("cb2275e82cea5c7a5c891c4ec4291794f409d242f981ff13ffa6daf5fd3b8bf4"));
//#endregion
export { getAllScenarioProgress as a, sendChatMessage as c, findScenario as i, todaysScenario as l, confirmRealLifeUse as n, getWeeklyRealLifeCount as o, findCategory as r, photoUrl as s, categories as t, useServerFn as u };
