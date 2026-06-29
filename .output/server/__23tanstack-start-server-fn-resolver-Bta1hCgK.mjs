//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Bta1hCgK.js
var manifest = {
	"148e90b05d61d224626ebdc2f4ffb87b023640e2461864c43aa7db1bc76ae5b3": {
		functionName: "getWeeklyRealLifeCount_createServerFn_handler",
		importer: () => import("./_ssr/chat.functions-CQhDjkg7.mjs")
	},
	"33b58f5d5489266a049f39cf22dab45fb4355e717ef5844af983a1581d70c62f": {
		functionName: "confirmRealLifeUse_createServerFn_handler",
		importer: () => import("./_ssr/chat.functions-CQhDjkg7.mjs")
	},
	"abb0f390d0d9d5c002c238029f7d6ac7eceb5f795c2ff0103d4fb2cfd687a422": {
		functionName: "sendChatMessage_createServerFn_handler",
		importer: () => import("./_ssr/chat.functions-CQhDjkg7.mjs")
	},
	"cb2275e82cea5c7a5c891c4ec4291794f409d242f981ff13ffa6daf5fd3b8bf4": {
		functionName: "getAllScenarioProgress_createServerFn_handler",
		importer: () => import("./_ssr/chat.functions-CQhDjkg7.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
