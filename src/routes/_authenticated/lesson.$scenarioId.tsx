import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, HelpCircle, Mic, Keyboard, Lightbulb, Send } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { findScenario, photoUrl } from "@/data/categories";
import { ChatBubble, type BubbleMsg } from "@/components/ChatBubble";
import { sendChatMessage, confirmRealLifeUse, type TutorReply } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/lesson/$scenarioId")({
  component: LessonPage,
});

type Mode = "IN_SCENE" | "COACH" | "DRILL";
type Correction = { was: string; fix: string; why: string };

const MODE_STYLES: Record<Mode, string> = {
  IN_SCENE: "bg-primary/20 text-primary border border-primary/30",
  COACH: "bg-accent/20 text-accent border border-accent/30",
  DRILL: "bg-foreground/10 text-foreground border border-white/10",
};

function LessonPage() {
  const { scenarioId } = useParams({ from: "/_authenticated/lesson/$scenarioId" });
  const found = findScenario(scenarioId);
  const send = useServerFn(sendChatMessage);
  const confirmUse = useServerFn(confirmRealLifeUse);

  const [mode, setMode] = useState<Mode>("IN_SCENE");
  const [messages, setMessages] = useState<BubbleMsg[]>([]);
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [textMode, setTextMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sceneComplete, setSceneComplete] = useState(false);
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [recording, setRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!found || startedRef.current) return;
    startedRef.current = true;
    void runTurn("", "IN_SCENE", []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId]);

  if (!found) {
    return (
      <div className="p-6 text-foreground">
        Scenario not found. <Link to="/home" className="underline text-primary">Back</Link>
      </div>
    );
  }
  const { scenario, category } = found;
  const setting = `${category.nameEn}: ${scenario.canDo}`;

  async function runTurn(userText: string, m: Mode, hist: typeof history) {
    setLoading(true);
    try {
      const reply: TutorReply = await send({
        data: {
          scenarioId: scenario.id,
          scenarioTitle: scenario.titleRu,
          scenarioSetting: setting,
          mode: m,
          history: hist,
          userMessage: userText,
          state: {},
        },
      });
      const assistantMsg: BubbleMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        russian: reply.russian_text,
        translit: reply.transliteration,
        gloss: reply.english_gloss,
      };
      setMessages((m) => [...m, assistantMsg]);
      setHistory((h) => [...h, { role: "assistant", content: reply.russian_text }]);
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

  async function submitUser(text: string) {
    const t = text.trim();
    if (!t || loading) return;
    const userMsg: BubbleMsg = { id: crypto.randomUUID(), role: "user", russian: t };
    setMessages((m) => [...m, userMsg]);
    const newHist = [...history, { role: "user" as const, content: t }];
    setHistory(newHist);
    setInput("");
    await runTurn(t, mode, newHist);
  }

  function toggleCoach() {
    const next: Mode = mode === "COACH" ? "IN_SCENE" : "COACH";
    setMode(next);
    if (next === "COACH") {
      void runTurn("(The learner tapped Help. Explain the last exchange in English, then offer to return to the scene.)", "COACH", history);
    }
  }

  function startRecording() {
    type SR = {
      lang: string; interimResults: boolean; continuous: boolean;
      onresult: (e: { results: Array<Array<{ transcript: string }>> }) => void;
      onerror: () => void; onend: () => void; start: () => void;
    };
    const W = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
    const Ctor = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!Ctor) {
      toast.error("Voice input not supported. Use the keyboard.");
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
      if (text) void submitUser(text);
    };
    rec.onerror = () => setRecording(false);
    rec.onend = () => setRecording(false);
    rec.start();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar — frosted glass */}
      <div className="sticky top-0 z-10 glass-strong border-b border-white/[0.06]">
        <div className="mx-auto max-w-md px-3 py-2.5 flex items-center gap-2">
          <Link
            to="/category/$categoryId"
            params={{ categoryId: category.id }}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">{scenario.titleRu}</div>
            <div className="text-[11px] text-muted-foreground truncate">{scenario.titleEn}</div>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${MODE_STYLES[mode]}`}>
            {mode === "IN_SCENE" ? "Scene" : mode === "COACH" ? "Coach" : "Drill"}
          </span>
          <button
            onClick={toggleCoach}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scenario header photo */}
      <div className="mx-auto max-w-md w-full px-3 pt-3">
        <div
          className="aspect-video rounded-2xl bg-card bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${photoUrl(scenario.photo)})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-xs text-white/70 leading-snug">{scenario.canDo}</p>
          </div>
        </div>
      </div>

      {/* Conversation scroll area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mx-auto max-w-md space-y-4">
          {messages.map((m) => <ChatBubble key={m.id} msg={m} />)}

          {loading && (
            <div className="flex gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center text-xs font-bold shrink-0">Л</div>
              <div className="glass-strong rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center h-5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:120ms]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:240ms]" />
                </div>
              </div>
            </div>
          )}

          {sceneComplete && (
            <SummaryCard
              corrections={corrections}
              scenarioId={scenario.id}
              onConfirmUse={async (phraseId) => {
                await confirmUse({ data: { phraseId, scenarioId: scenario.id } });
                toast.success("Logged!");
              }}
            />
          )}
        </div>
      </div>

      {/* Input bar */}
      {!sceneComplete && (
        <div className="sticky bottom-0 glass-strong border-t border-white/[0.06]">
          <div className="mx-auto max-w-md px-3 py-3 flex items-center gap-2">
            <button
              onClick={() => setTextMode((v) => !v)}
              className={`p-2 transition-colors ${textMode ? "text-primary" : "text-muted-foreground"}`}
              aria-label="Toggle keyboard"
            >
              <Keyboard className="w-5 h-5" />
            </button>

            {textMode ? (
              <>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitUser(input)}
                  placeholder="Напишите по-русски..."
                  className="flex-1 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/50"
                />
                <Button
                  onClick={() => submitUser(input)}
                  disabled={loading || !input.trim()}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 glow-primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={startRecording}
                  disabled={loading || recording}
                  className={`flex-1 h-12 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    recording
                      ? "bg-destructive text-white animate-pulse"
                      : "bg-primary text-white glow-primary active:scale-[0.97]"
                  }`}
                >
                  <Mic className="w-5 h-5" />
                  {recording ? "Слушаю..." : "Tap to speak"}
                </button>
                <button
                  onClick={() => submitUser("(I'm stuck — give me a hint of what to say next, then continue the scene.)")}
                  className="p-2 text-muted-foreground hover:text-accent transition-colors"
                  aria-label="Hint"
                >
                  <Lightbulb className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  corrections,
  scenarioId,
  onConfirmUse,
}: {
  corrections: Correction[];
  scenarioId: string;
  onConfirmUse: (phraseId: string) => Promise<void> | void;
}) {
  return (
    <div className="mt-4 glass-strong rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm">✓</div>
        <div className="text-sm font-bold text-accent">Scene complete</div>
      </div>

      {corrections.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Corrections
          </div>
          <ul className="space-y-2.5">
            {corrections.map((c, i) => (
              <li key={i} className="text-sm bg-white/[0.04] rounded-xl px-3 py-2.5">
                <div>
                  <span className="line-through text-destructive mr-2">{c.was}</span>
                  <span className="text-accent font-semibold">→ {c.fix}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.why}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Used any of these today?
        </div>
        <div className="space-y-2">
          {(corrections.length ? corrections.map((c) => c.fix) : ["Phrase from this scene"]).map((p, i) => (
            <button
              key={i}
              onClick={() => onConfirmUse(`${scenarioId}:${i}:${p}`)}
              className="w-full text-left text-sm px-3 py-2.5 rounded-xl bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              ✓ {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to="/home"
          className="flex-1 text-center text-sm font-semibold bg-primary text-white rounded-full py-2.5 glow-primary"
        >
          Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="flex-1 text-sm font-semibold glass rounded-full py-2.5 text-foreground"
        >
          Again
        </button>
      </div>
    </div>
  );
}
