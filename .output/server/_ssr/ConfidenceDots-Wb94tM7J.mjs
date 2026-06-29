import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ConfidenceDots-Wb94tM7J.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/Users/datathunk/dev/AI/russian-daily/src/components/ConfidenceDots.tsx";
function ConfidenceDots({ value, size = 8 }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center gap-1",
		"aria-label": `Confidence ${value} of 5`,
		children: [
			0,
			1,
			2,
			3,
			4
		].map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: `rounded-full ${i < value ? "bg-accent" : "bg-muted-foreground/25"}`,
			style: {
				width: size,
				height: size
			}
		}, i, false, {
			fileName: _jsxFileName,
			lineNumber: 5,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 3,
		columnNumber: 5
	}, this);
}
//#endregion
export { ConfidenceDots as t };
