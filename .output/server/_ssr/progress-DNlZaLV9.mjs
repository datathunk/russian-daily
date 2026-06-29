import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as getAllScenarioProgress, o as getWeeklyRealLifeCount, t as categories, u as useServerFn } from "./chat.functions-DIXOzQUw.mjs";
import { t as ConfidenceDots } from "./ConfidenceDots-Wb94tM7J.mjs";
import { l as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DNlZaLV9.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/Users/datathunk/dev/AI/russian-daily/src/routes/_authenticated/progress.tsx?tsr-split=component";
function ProgressPage() {
	const fp = useServerFn(getAllScenarioProgress);
	const fc = useServerFn(getWeeklyRealLifeCount);
	const { data: prog } = useQuery({
		queryKey: ["progress"],
		queryFn: () => fp()
	});
	const { data: cnt } = useQuery({
		queryKey: ["weekly-rl"],
		queryFn: () => fc()
	});
	const rows = prog?.progress ?? [];
	const conf = (sid) => rows.find((r) => r.scenario_id === sid)?.confidence ?? 0;
	const status = (sid) => {
		const c = conf(sid);
		if (c >= 4) return "Confident";
		if (c >= 1) return "Tried";
		return "Rehearsed";
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-md px-4 pt-4 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/home",
					className: "inline-flex items-center gap-1 text-sm text-muted-foreground mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "w-4 h-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 34,
						columnNumber: 11
					}, this), " Home"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-bold mb-1",
					children: "Progress"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mb-6",
					children: [cnt?.count ?? 0, " phrases used in real life this week."]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-sm font-semibold mb-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-lg",
								children: cat.icon
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 17
							}, this),
							" ",
							cat.nameEn
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-card border divide-y",
						children: cat.scenarios.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-3 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm font-medium truncate",
									children: s.canDo
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 49,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: status(s.id)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 50,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 48,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ConfidenceDots, { value: conf(s.id) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 21
							}, this)]
						}, s.id, true, {
							fileName: _jsxFileName,
							lineNumber: 47,
							columnNumber: 41
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 15
					}, this)] }, cat.id, true, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 34
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 32,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 31,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProgressPage as component };
