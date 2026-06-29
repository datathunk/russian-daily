import { h as Link, v as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as getAllScenarioProgress, r as findCategory, s as photoUrl, u as useServerFn } from "./chat.functions-DIXOzQUw.mjs";
import { t as ConfidenceDots } from "./ConfidenceDots-Wb94tM7J.mjs";
import { l as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._categoryId-B6OWznkC.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/Users/datathunk/dev/AI/russian-daily/src/routes/_authenticated/category.$categoryId.tsx?tsr-split=component";
function CategoryPage() {
	const { categoryId } = useParams({ from: "/_authenticated/category/$categoryId" });
	const cat = findCategory(categoryId);
	const fetchProgress = useServerFn(getAllScenarioProgress);
	const { data: progress } = useQuery({
		queryKey: ["progress"],
		queryFn: () => fetchProgress()
	});
	if (!cat) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6",
		children: ["Category not found. ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/home",
			className: "underline",
			children: "Back"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 29
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 23,
		columnNumber: 12
	}, this);
	const confOf = (sid) => (progress?.progress ?? []).find((p) => p.scenario_id === sid)?.confidence ?? 0;
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
						lineNumber: 31,
						columnNumber: 11
					}, this), " Home"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-3xl",
						children: cat.icon
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 34,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-xl font-bold text-foreground",
						children: cat.nameRu
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground",
						children: cat.nameEn
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-3",
					children: cat.scenarios.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl bg-card border overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full h-32 bg-muted bg-cover bg-center",
							style: { backgroundImage: `url(${photoUrl(s.photo)})` }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 43,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-base font-semibold text-foreground",
									children: s.titleRu
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 47,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: s.titleEn
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 48,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground",
									children: s.canDo
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 49,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ConfidenceDots, { value: confOf(s.id) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 53,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/lesson/$scenarioId",
										params: { scenarioId: s.id },
										className: "text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full",
										children: "Practice"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 54,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 52,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 46,
							columnNumber: 15
						}, this)]
					}, s.id, true, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 35
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 29,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 28,
		columnNumber: 10
	}, this);
}
//#endregion
export { CategoryPage as component };
