globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/ConfidenceDots-DOAfS9sC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"243f-ybRx6BeAIdgZGNmSwUfEFQpK0sE\"",
		"mtime": "2026-06-29T19:01:15.521Z",
		"size": 9279,
		"path": "../public/assets/ConfidenceDots-DOAfS9sC.js"
	},
	"/assets/arrow-left-CT0yKRN-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-crVUhZKc2busMQWVS6JfSE/5ejc\"",
		"mtime": "2026-06-29T19:01:15.522Z",
		"size": 165,
		"path": "../public/assets/arrow-left-CT0yKRN-.js"
	},
	"/assets/auth-DIwoBI8g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-mxZ+n3+Dad4p/FigDJpOeTM9ED8\"",
		"mtime": "2026-06-29T19:01:15.522Z",
		"size": 310,
		"path": "../public/assets/auth-DIwoBI8g.js"
	},
	"/assets/button-Ce7avi-T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7eff-t8ZPzwCUIWZGMe9r2NEWZwJ7SYw\"",
		"mtime": "2026-06-29T19:01:15.522Z",
		"size": 32511,
		"path": "../public/assets/button-Ce7avi-T.js"
	},
	"/assets/category._categoryId-C0pg_Qxk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfa-P7aTAoLqxOOLKdTkSDhB9xcGuN8\"",
		"mtime": "2026-06-29T19:01:15.522Z",
		"size": 3578,
		"path": "../public/assets/category._categoryId-C0pg_Qxk.js"
	},
	"/assets/home-DuO0spVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1101-mpkFP/YgOR/UjkXHYQugQc5eyEU\"",
		"mtime": "2026-06-29T19:01:15.522Z",
		"size": 4353,
		"path": "../public/assets/home-DuO0spVr.js"
	},
	"/assets/createLucideIcon-1S9Y6tN1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af-mMwif0Gg1KEidR7grCvppdZZL3I\"",
		"mtime": "2026-06-29T19:01:15.522Z",
		"size": 1199,
		"path": "../public/assets/createLucideIcon-1S9Y6tN1.js"
	},
	"/assets/drill.numbers-DUds9J1b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1035-Dsgx4EGFDe0jQ3d0GGBsRxmIVuI\"",
		"mtime": "2026-06-29T19:01:15.522Z",
		"size": 4149,
		"path": "../public/assets/drill.numbers-DUds9J1b.js"
	},
	"/assets/jsx-dev-runtime-CU9os1S-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2247-UXpO6XCEN7DGTXgaOJVEoXTii3g\"",
		"mtime": "2026-06-29T19:01:15.523Z",
		"size": 8775,
		"path": "../public/assets/jsx-dev-runtime-CU9os1S-.js"
	},
	"/assets/lesson._scenarioId-C_LVMB30.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87cd-FL9q4Ro+CXRqtRwmElv+KTEXoik\"",
		"mtime": "2026-06-29T19:01:15.523Z",
		"size": 34765,
		"path": "../public/assets/lesson._scenarioId-C_LVMB30.js"
	},
	"/assets/chat.functions-cdQ_IBAf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2814-2OL5T6jSGJREA6eGa4lxEiDDufg\"",
		"mtime": "2026-06-29T19:01:15.522Z",
		"size": 10260,
		"path": "../public/assets/chat.functions-cdQ_IBAf.js"
	},
	"/assets/index-DwuW3k4j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"554e4-tbz3NeUn4vgPyw2Ll36OmdQtumk\"",
		"mtime": "2026-06-29T19:01:15.521Z",
		"size": 349412,
		"path": "../public/assets/index-DwuW3k4j.js"
	},
	"/assets/mic-B02R9OEV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb-tqj4q1Hzn0wuVHR2qwvK4NzycBE\"",
		"mtime": "2026-06-29T19:01:15.523Z",
		"size": 235,
		"path": "../public/assets/mic-B02R9OEV.js"
	},
	"/assets/progress-CJ6woXzD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aec-jLzGnnMsoXpD+NdQER9tW+dWmI4\"",
		"mtime": "2026-06-29T19:01:15.523Z",
		"size": 2796,
		"path": "../public/assets/progress-CJ6woXzD.js"
	},
	"/assets/route-DSqlIWx8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131-ZwqEgA1bDqwOFZp5rUk3cKDVWuc\"",
		"mtime": "2026-06-29T19:01:15.523Z",
		"size": 305,
		"path": "../public/assets/route-DSqlIWx8.js"
	},
	"/assets/routes-VW8QWvxT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"137-qqv28jOV2hsiN+hcBY3cOjUF6Zs\"",
		"mtime": "2026-06-29T19:01:15.523Z",
		"size": 311,
		"path": "../public/assets/routes-VW8QWvxT.js"
	},
	"/assets/styles-BJZiRCQ3.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"12794-X2MUOozP8PGyRM+o8yrnjlUOfqU\"",
		"mtime": "2026-06-29T19:01:15.523Z",
		"size": 75668,
		"path": "../public/assets/styles-BJZiRCQ3.css"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_NkaUTb = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_NkaUTb
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
