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

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] bg-primary rounded-2xl rounded-br-sm px-4 py-3 glow-primary">
          <div className="text-[17px] leading-snug text-white font-medium">{msg.russian}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 justify-start">
      {/* Лена avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center text-xs font-bold shrink-0 ring-1 ring-primary/30">
        Л
      </div>
      <div className="max-w-[78%]">
        <div className="glass-strong rounded-2xl rounded-bl-sm px-4 py-3">
          <div className="text-[17px] leading-snug text-foreground font-medium">{msg.russian}</div>
          {msg.translit && showTranslit && (
            <div className="text-xs italic mt-1.5 text-muted-foreground">{msg.translit}</div>
          )}
          {msg.gloss && showGloss && (
            <div className="text-xs mt-1 text-accent font-medium">{msg.gloss}</div>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1.5 px-1 text-muted-foreground">
          <button
            onClick={() => speak(msg.russian, 1)}
            aria-label="Play"
            className="hover:text-primary transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => speak(msg.russian, 0.72)}
            aria-label="Slow"
            className="hover:text-primary transition-colors"
          >
            <Gauge className="w-4 h-4" />
          </button>
          {msg.translit && (
            <button
              onClick={() => setShowTranslit((v) => !v)}
              aria-label="Toggle transliteration"
              className="hover:text-primary transition-colors"
            >
              {showTranslit ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
          {msg.gloss && (
            <button
              onClick={() => setShowGloss((v) => !v)}
              className="text-[11px] font-medium hover:text-accent transition-colors"
            >
              {showGloss ? "Hide EN" : "EN"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
