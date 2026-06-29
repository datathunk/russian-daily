import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as getAllScenarioProgress, l as todaysScenario, o as getWeeklyRealLifeCount, t as categories, u as useServerFn } from "./chat.functions-DIXOzQUw.mjs";
import { t as ConfidenceDots } from "./ConfidenceDots-Wb94tM7J.mjs";
import { r as Mic } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-BRFpdDAp.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/Users/datathunk/dev/AI/russian-daily/src/routes/_authenticated/home.tsx?tsr-split=component";
function Home() {
	const fetchCount = useServerFn(getWeeklyRealLifeCount);
	const fetchProgress = useServerFn(getAllScenarioProgress);
	const { data: weekly } = useQuery({
		queryKey: ["weekly-rl"],
		queryFn: () => fetchCount()
	});
	const { data: progress } = useQuery({
		queryKey: ["progress"],
		queryFn: () => fetchProgress()
	});
	const today = todaysScenario();
	const progByCat = (catId) => {
		const rows = progress?.progress ?? [];
		const cat = categories.find((c) => c.id === catId);
		const ids = new Set(cat.scenarios.map((s) => s.id));
		const vals = rows.filter((r) => ids.has(r.scenario_id)).map((r) => r.confidence);
		if (vals.length === 0) return 0;
		return Math.round(vals.reduce((a, b) => a + b, 0) / cat.scenarios.length);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-md px-4 pt-6 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-wide text-muted-foreground mb-4",
					children: [
						"Phrases used in real life this week:",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-accent font-semibold",
							children: weekly?.count ?? 0
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 40,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/lesson/$scenarioId",
					params: { scenarioId: today.scenario.id },
					className: "block group",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-primary text-primary-foreground p-5 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs uppercase tracking-wide opacity-80",
								children: "Today's Survival Drill"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 48,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 text-2xl font-bold leading-tight",
								children: today.scenario.titleRu
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 51,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-sm opacity-90 mt-1",
								children: [
									today.category.icon,
									" ",
									today.scenario.titleEn,
									" — ",
									today.scenario.canDo
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 54,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold rounded-full px-4 py-2 group-active:scale-95 transition",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mic, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 58,
									columnNumber: 15
								}, this), "Start Drill →"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 57,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 47,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-sm font-semibold text-foreground",
						children: "Categories"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/progress",
						className: "text-xs text-primary font-medium",
						children: "Progress →"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 gap-3",
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/category/$categoryId",
						params: { categoryId: cat.id },
						className: "rounded-2xl bg-card border p-4 active:scale-[0.98] transition flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl",
								children: cat.icon
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 text-sm font-semibold text-foreground leading-tight",
								children: cat.nameRu
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 76,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-muted-foreground leading-tight",
								children: cat.nameEn
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ConfidenceDots, { value: progByCat(cat.id) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 83,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 15
							}, this)
						]
					}, cat.id, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 34
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/drill/numbers",
						className: "block text-center text-sm text-primary font-medium underline-offset-4 hover:underline",
						children: "Open Numbers Drill →"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 10
	}, this);
}
//#endregion
export { Home as component };
