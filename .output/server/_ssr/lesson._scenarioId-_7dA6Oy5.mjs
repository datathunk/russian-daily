import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { h as Link, v as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { c as sendChatMessage, i as findScenario, n as confirmRealLifeUse, s as photoUrl, u as useServerFn } from "./chat.functions-DIXOzQUw.mjs";
import { a as Keyboard, c as EyeOff, i as Lightbulb, l as ArrowLeft, n as Send, o as Gauge, r as Mic, s as Eye, t as Volume2, u as CircleQuestionMark } from "../_libs/lucide-react.mjs";
import { n as Input, t as Button } from "./button-Da-LobHp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lesson._scenarioId-_7dA6Oy5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/Users/datathunk/dev/AI/russian-daily/src/components/ChatBubble.tsx";
function speak(text, rate = 1) {
	if (typeof window === "undefined" || !window.speechSynthesis) return;
	const u = new SpeechSynthesisUtterance(text);
	u.lang = "ru-RU";
	u.rate = rate;
	window.speechSynthesis.cancel();
	window.speechSynthesis.speak(u);
}
function ChatBubble({ msg }) {
	const [showTranslit, setShowTranslit] = (0, import_react.useState)(true);
	const [showGloss, setShowGloss] = (0, import_react.useState)(false);
	const isUser = msg.role === "user";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `flex ${isUser ? "justify-end" : "justify-start"} gap-2`,
		children: [!isUser && /* @__PURE__ */ (void 0)("div", {
			className: "w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0",
			children: "Л"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 29,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: `max-w-[80%] rounded-2xl px-4 py-3 ${isUser ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card border rounded-bl-md"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `text-[17px] leading-snug ${isUser ? "" : "text-foreground font-medium"}`,
					children: msg.russian
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 40,
					columnNumber: 9
				}, this),
				msg.translit && showTranslit && /* @__PURE__ */ (void 0)("div", {
					className: `text-xs italic mt-1 ${isUser ? "opacity-80" : "text-muted-foreground"}`,
					children: msg.translit
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 44,
					columnNumber: 11
				}, this),
				msg.gloss && showGloss && /* @__PURE__ */ (void 0)("div", {
					className: `text-xs mt-1 ${isUser ? "opacity-90" : "text-muted-foreground"}`,
					children: msg.gloss
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 49,
					columnNumber: 11
				}, this),
				!isUser && /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3 mt-2 text-muted-foreground",
					children: [
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => speak(msg.russian, 1),
							"aria-label": "Play",
							className: "hover:text-primary",
							children: /* @__PURE__ */ (void 0)(Volume2, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 56,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 55,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => speak(msg.russian, .75),
							"aria-label": "Slow play",
							className: "hover:text-primary",
							children: /* @__PURE__ */ (void 0)(Gauge, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 59,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 58,
							columnNumber: 13
						}, this),
						msg.translit && /* @__PURE__ */ (void 0)("button", {
							onClick: () => setShowTranslit((v) => !v),
							"aria-label": "Toggle transliteration",
							className: "hover:text-primary",
							children: showTranslit ? /* @__PURE__ */ (void 0)(EyeOff, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 63,
								columnNumber: 33
							}, this) : /* @__PURE__ */ (void 0)(Eye, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 63,
								columnNumber: 66
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 62,
							columnNumber: 15
						}, this),
						msg.gloss && /* @__PURE__ */ (void 0)("button", {
							onClick: () => setShowGloss((v) => !v),
							className: "text-[11px] underline-offset-2 hover:underline",
							children: showGloss ? "Hide EN" : "Show EN"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 67,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 54,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 33,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 27,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/Users/datathunk/dev/AI/russian-daily/src/routes/_authenticated/lesson.$scenarioId.tsx?tsr-split=component";
function LessonPage() {
	const { scenarioId } = useParams({ from: "/_authenticated/lesson/$scenarioId" });
	const found = findScenario(scenarioId);
	const send = useServerFn(sendChatMessage);
	const confirmUse = useServerFn(confirmRealLifeUse);
	const [mode, setMode] = (0, import_react.useState)("IN_SCENE");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [textMode, setTextMode] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sceneComplete, setSceneComplete] = (0, import_react.useState)(false);
	const [corrections, setCorrections] = (0, import_react.useState)([]);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const startedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, loading]);
	(0, import_react.useEffect)(() => {
		if (!found || startedRef.current) return;
		startedRef.current = true;
		runTurn("", "IN_SCENE", []);
	}, [scenarioId]);
	if (!found) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6",
		children: ["Scenario not found. ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/home",
			className: "underline",
			children: "Back"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 56,
			columnNumber: 29
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 55,
		columnNumber: 12
	}, this);
	const { scenario, category } = found;
	const setting = `${category.nameEn}: ${scenario.canDo}`;
	async function runTurn(userText, m, hist) {
		setLoading(true);
		try {
			const reply = await send({ data: {
				scenarioId: scenario.id,
				scenarioTitle: scenario.titleRu,
				scenarioSetting: setting,
				mode: m,
				history: hist,
				userMessage: userText,
				state: {}
			} });
			const assistantMsg = {
				id: crypto.randomUUID(),
				role: "assistant",
				russian: reply.russian_text,
				translit: reply.transliteration,
				gloss: reply.english_gloss
			};
			setMessages((m) => [...m, assistantMsg]);
			setHistory((h) => [...h, {
				role: "assistant",
				content: reply.russian_text
			}]);
			if (reply.corrections?.length) setCorrections((c) => [...c, ...reply.corrections]);
			if (reply.scene_complete) setSceneComplete(true);
			if (m === "IN_SCENE" && typeof window !== "undefined" && window.speechSynthesis) {
				const u = new SpeechSynthesisUtterance(reply.russian_text);
				u.lang = "ru-RU";
				window.speechSynthesis.cancel();
				window.speechSynthesis.speak(u);
			}
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Чё-то сломалось");
		} finally {
			setLoading(false);
		}
	}
	async function submitUser(text) {
		const t = text.trim();
		if (!t || loading) return;
		const userMsg = {
			id: crypto.randomUUID(),
			role: "user",
			russian: t
		};
		setMessages((m) => [...m, userMsg]);
		const newHist = [...history, {
			role: "user",
			content: t
		}];
		setHistory(newHist);
		setInput("");
		await runTurn(t, mode, newHist);
	}
	function toggleCoach() {
		const next = mode === "COACH" ? "IN_SCENE" : "COACH";
		setMode(next);
		if (next === "COACH") runTurn("(The learner tapped Help. Explain the last exchange in English, then offer to return to the scene.)", "COACH", history);
	}
	function startRecording() {
		const W = window;
		const Ctor = W.SpeechRecognition || W.webkitSpeechRecognition;
		if (!Ctor) {
			toast.error("Voice input not supported here. Use the keyboard.");
			setTextMode(true);
			return;
		}
		const rec = new Ctor();
		rec.lang = "ru-RU";
		rec.interimResults = false;
		rec.continuous = false;
		setRecording(true);
		rec.onresult = (e) => {
			const text = e.results[0]?.[0]?.transcript ?? "";
			setRecording(false);
			if (text) submitUser(text);
		};
		rec.onerror = () => setRecording(false);
		rec.onend = () => setRecording(false);
		rec.start();
	}
	const modeColor = mode === "IN_SCENE" ? "bg-primary text-primary-foreground" : mode === "COACH" ? "bg-accent text-accent-foreground" : "bg-foreground text-background";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "sticky top-0 z-10 bg-background/95 backdrop-blur border-b",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-md px-3 py-2 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/category/$categoryId",
							params: { categoryId: category.id },
							className: "p-2 -ml-2 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-sm font-semibold text-foreground truncate",
								children: scenario.titleRu
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[11px] text-muted-foreground truncate",
								children: scenario.titleEn
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 179,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 177,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${modeColor}`,
							children: mode
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: toggleCoach,
							className: "p-2 text-muted-foreground hover:text-primary",
							"aria-label": "Help",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleQuestionMark, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 171,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 170,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-md w-full px-3 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "aspect-video rounded-2xl bg-muted bg-cover bg-center",
					style: { backgroundImage: `url(${photoUrl(scenario.photo)})` }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-2 px-1",
					children: [
						scenario.titleEn,
						" — ",
						scenario.canDo,
						"."
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 195,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 191,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				ref: scrollRef,
				className: "flex-1 overflow-y-auto px-3 py-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-md space-y-3",
					children: [
						messages.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChatBubble, { msg: m }, m.id, false, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 30
						}, this)),
						loading && /* @__PURE__ */ (void 0)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold",
								children: "Л"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "bg-card border rounded-2xl rounded-bl-md px-4 py-3",
								children: /* @__PURE__ */ (void 0)("div", {
									className: "flex gap-1",
									children: [
										/* @__PURE__ */ (void 0)("span", { className: "w-2 h-2 rounded-full bg-muted-foreground animate-bounce" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("span", { className: "w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:120ms]" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 209,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("span", { className: "w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:240ms]" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 210,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 23
						}, this),
						sceneComplete && /* @__PURE__ */ (void 0)(SummaryCard, {
							corrections,
							scenarioId: scenario.id,
							onConfirmUse: async (phraseId) => {
								await confirmUse({ data: {
									phraseId,
									scenarioId: scenario.id
								} });
								toast.success("Logged!");
							}
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 29
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 202,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 201,
				columnNumber: 7
			}, this),
			!sceneComplete && /* @__PURE__ */ (void 0)("div", {
				className: "sticky bottom-0 bg-background/95 backdrop-blur border-t",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "mx-auto max-w-md px-3 py-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)("button", {
						onClick: () => setTextMode((v) => !v),
						className: "p-2 text-muted-foreground",
						"aria-label": "Toggle keyboard",
						children: /* @__PURE__ */ (void 0)(Keyboard, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 231,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 13
					}, this), textMode ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Input, {
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && submitUser(input),
						placeholder: "Напишите по-русски...",
						className: "flex-1"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 234,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)(Button, {
						onClick: () => submitUser(input),
						disabled: loading || !input.trim(),
						size: "icon",
						children: /* @__PURE__ */ (void 0)(Send, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 235,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 233,
						columnNumber: 25
					}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("button", {
						onClick: startRecording,
						disabled: loading || recording,
						className: `flex-1 h-12 rounded-full font-semibold transition ${recording ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-primary text-primary-foreground active:scale-[0.98]"} flex items-center justify-center gap-2`,
						children: [/* @__PURE__ */ (void 0)(Mic, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 19
						}, this), recording ? "Слушаю..." : "Hold to speak"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => submitUser("(I'm stuck — give me a hint of what to say next, then continue the scene.)"),
						className: "p-2 text-muted-foreground",
						"aria-label": "Hint",
						title: "Hint",
						children: /* @__PURE__ */ (void 0)(Lightbulb, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 21
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 229,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 228,
				columnNumber: 26
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 168,
		columnNumber: 10
	}, this);
}
function SummaryCard({ corrections, scenarioId, onConfirmUse }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mt-4 rounded-2xl bg-card border p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-sm font-semibold text-accent mb-1",
				children: "Scene complete ✓"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 261,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-base font-bold text-foreground",
				children: "Nice work."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 262,
				columnNumber: 7
			}, this),
			corrections.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2",
					children: "Errors logged"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 264,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("ul", {
					className: "space-y-2",
					children: corrections.map((c, i) => /* @__PURE__ */ (void 0)("li", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "line-through text-destructive",
								children: c.was
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 17
							}, this),
							" ",
							/* @__PURE__ */ (void 0)("span", {
								className: "text-foreground font-medium",
								children: ["→ ", c.fix]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "text-xs text-muted-foreground",
								children: c.why
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 271,
								columnNumber: 17
							}, this)
						]
					}, i, true, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 40
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 267,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 263,
				columnNumber: 34
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2",
					children: "Did you use any of these today in real life?"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 276,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: (corrections.length ? corrections.map((c) => c.fix) : ["Phrase from this scene"]).map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => onConfirmUse(`${scenarioId}:${i}:${p}`),
						className: "w-full text-left text-sm px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80",
						children: ["✓ ", p]
					}, i, true, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 106
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 279,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 275,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/home",
					className: "flex-1 text-center text-sm font-semibold bg-primary text-primary-foreground rounded-full py-2.5",
					children: "Home"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 286,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => window.location.reload(),
					className: "flex-1 text-sm font-semibold bg-secondary text-secondary-foreground rounded-full py-2.5",
					children: "Practice again"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 289,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 285,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 260,
		columnNumber: 10
	}, this);
}
//#endregion
export { LessonPage as component };
