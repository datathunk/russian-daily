import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/drill/numbers")({
  component: NumbersDrill,
});

function speakRu(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ru-RU";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function priceWord(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "рублей";
  if (mod10 === 1) return "рубль";
  if (mod10 >= 2 && mod10 <= 4) return "рубля";
  return "рублей";
}

function NumbersDrill() {
  const [target, setTarget] = useState<number>(() => Math.floor(Math.random() * 1000) + 1);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [feedback, setFeedback] = useState<null | { ok: boolean; correct: number }>(null);
  const [timeLeft, setTimeLeft] = useState(8);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function next() {
    const n = Math.floor(Math.random() * 1000) + 1;
    setTarget(n);
    setAnswer("");
    setFeedback(null);
    setTimeLeft(8);
    setTimeout(() => speakRu(`${n} ${priceWord(n)}`), 200);
  }

  useEffect(() => { next(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  useEffect(() => {
    if (feedback) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setFeedback({ ok: false, correct: target });
          setScore((s) => ({ right: s.right, total: s.total + 1 }));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { timerRef.current && clearInterval(timerRef.current); };
  }, [target, feedback]);

  function submit() {
    const guess = parseInt(answer, 10);
    const ok = guess === target;
    setFeedback({ ok, correct: target });
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 pt-4 pb-24">
        <Link to="/home" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Numbers Drill</h1>
          <div className="text-sm text-muted-foreground">
            Score: <span className="text-foreground font-semibold">{score.right}/{score.total}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-card border p-6 text-center">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">
            Listen — type the number
          </div>
          <button
            onClick={() => speakRu(`${target} ${priceWord(target)}`)}
            className="mt-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground"
          >
            <Volume2 className="w-8 h-8" />
          </button>
          <div className="mt-3 text-xs text-muted-foreground">{timeLeft}s</div>

          <Input
            inputMode="numeric"
            autoFocus
            value={answer}
            onChange={(e) => setAnswer(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="₽"
            className="mt-6 text-center text-2xl h-14"
            disabled={!!feedback}
          />

          {feedback ? (
            <div className="mt-4">
              <div className={`text-lg font-bold ${feedback.ok ? "text-accent" : "text-destructive"}`}>
                {feedback.ok ? "Правильно!" : `${feedback.correct} ₽`}
              </div>
              <Button onClick={next} className="mt-3 w-full h-11">Next</Button>
            </div>
          ) : (
            <Button onClick={submit} className="mt-4 w-full h-11" disabled={!answer}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
}