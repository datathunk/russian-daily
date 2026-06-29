import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { l as ArrowLeft, t as Volume2 } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./button-Da-LobHp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drill.numbers-B97gPZ3G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/Users/datathunk/dev/AI/russian-daily/src/routes/_authenticated/drill.numbers.tsx?tsr-split=component";
function speakRu(text) {
	if (typeof window === "undefined" || !window.speechSynthesis) return;
	const u = new SpeechSynthesisUtterance(text);
	u.lang = "ru-RU";
	window.speechSynthesis.cancel();
	window.speechSynthesis.speak(u);
}
function priceWord(n) {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod100 >= 11 && mod100 <= 14) return "рублей";
	if (mod10 === 1) return "рубль";
	if (mod10 >= 2 && mod10 <= 4) return "рубля";
	return "рублей";
}
function NumbersDrill() {
	const [target, setTarget] = (0, import_react.useState)(() => Math.floor(Math.random() * 1e3) + 1);
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [score, setScore] = (0, import_react.useState)({
		right: 0,
		total: 0
	});
	const [feedback, setFeedback] = (0, import_react.useState)(null);
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(8);
	const timerRef = (0, import_react.useRef)(null);
	function next() {
		const n = Math.floor(Math.random() * 1e3) + 1;
		setTarget(n);
		setAnswer("");
		setFeedback(null);
		setTimeLeft(8);
		setTimeout(() => speakRu(`${n} ${priceWord(n)}`), 200);
	}
	(0, import_react.useEffect)(() => {
		next();
	}, []);
	(0, import_react.useEffect)(() => {
		if (feedback) return;
		timerRef.current && clearInterval(timerRef.current);
		timerRef.current = setInterval(() => {
			setTimeLeft((t) => {
				if (t <= 1) {
					setFeedback({
						ok: false,
						correct: target
					});
					setScore((s) => ({
						right: s.right,
						total: s.total + 1
					}));
					return 0;
				}
				return t - 1;
			});
		}, 1e3);
		return () => {
			timerRef.current && clearInterval(timerRef.current);
		};
	}, [target, feedback]);
	function submit() {
		const ok = parseInt(answer, 10) === target;
		setFeedback({
			ok,
			correct: target
		});
		setScore((s) => ({
			right: s.right + (ok ? 1 : 0),
			total: s.total + 1
		}));
	}
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
						lineNumber: 83,
						columnNumber: 11
					}, this), " Home"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-xl font-bold",
						children: "Numbers Drill"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-sm text-muted-foreground",
						children: ["Score: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-foreground font-semibold",
							children: [
								score.right,
								"/",
								score.total
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 88,
							columnNumber: 20
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl bg-card border p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: "Listen — type the number"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => speakRu(`${target} ${priceWord(target)}`),
							className: "mt-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Volume2, { className: "w-8 h-8" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 97,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [timeLeft, "s"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 99,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							inputMode: "numeric",
							autoFocus: true,
							value: answer,
							onChange: (e) => setAnswer(e.target.value.replace(/\D/g, "")),
							onKeyDown: (e) => e.key === "Enter" && submit(),
							placeholder: "₽",
							className: "mt-6 text-center text-2xl h-14",
							disabled: !!feedback
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 11
						}, this),
						feedback ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `text-lg font-bold ${feedback.ok ? "text-accent" : "text-destructive"}`,
								children: feedback.ok ? "Правильно!" : `${feedback.correct} ₽`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 104,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: next,
								className: "mt-3 w-full h-11",
								children: "Next"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 23
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: submit,
							className: "mt-4 w-full h-11",
							disabled: !answer,
							children: "Submit"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 108,
							columnNumber: 22
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 81,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 80,
		columnNumber: 10
	}, this);
}
//#endregion
export { NumbersDrill as component };
