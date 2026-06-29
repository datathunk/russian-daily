import { useState } from "react";
import { Volume2, Gauge, Eye, EyeOff } from "lucide-react";

export type BubbleMsg = {
  id: string;
  role: "assistant" | "user";
  russian: string;
  translit?: string;
  gloss?: string;
};

function speak(text: string, rate = 1) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ru-RU";
  u.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export function ChatBubble({ msg }: { msg: BubbleMsg }) {
  const [showTranslit, setShowTranslit] = useState(true);
  const [showGloss, setShowGloss] = useState(false);
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
          Л
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-card border rounded-bl-md"
        }`}
      >
        <div className={`text-[17px] leading-snug ${isUser ? "" : "text-foreground font-medium"}`}>
          {msg.russian}
        </div>
        {msg.translit && showTranslit && (
          <div className={`text-xs italic mt-1 ${isUser ? "opacity-80" : "text-muted-foreground"}`}>
            {msg.translit}
          </div>
        )}
        {msg.gloss && showGloss && (
          <div className={`text-xs mt-1 ${isUser ? "opacity-90" : "text-muted-foreground"}`}>
            {msg.gloss}
          </div>
        )}
        {!isUser && (
          <div className="flex items-center gap-3 mt-2 text-muted-foreground">
            <button onClick={() => speak(msg.russian, 1)} aria-label="Play" className="hover:text-primary">
              <Volume2 className="w-4 h-4" />
            </button>
            <button onClick={() => speak(msg.russian, 0.75)} aria-label="Slow play" className="hover:text-primary">
              <Gauge className="w-4 h-4" />
            </button>
            {msg.translit && (
              <button onClick={() => setShowTranslit((v) => !v)} aria-label="Toggle transliteration" className="hover:text-primary">
                {showTranslit ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            {msg.gloss && (
              <button
                onClick={() => setShowGloss((v) => !v)}
                className="text-[11px] underline-offset-2 hover:underline"
              >
                {showGloss ? "Hide EN" : "Show EN"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}