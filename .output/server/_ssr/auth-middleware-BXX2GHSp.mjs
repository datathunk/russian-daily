import { t as createMiddleware } from "./createStart-Dt05N14y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-BXX2GHSp.js
var requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	return next({ context: {
		supabase: {},
		userId: "local-user"
	} });
});
//#endregion
export { requireSupabaseAuth as t };
