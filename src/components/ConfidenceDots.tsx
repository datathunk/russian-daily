export function ConfidenceDots({ value, size = 8 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Confidence ${value} of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < value
              ? "bg-accent shadow-[0_0_6px_var(--color-accent)]"
              : "bg-white/15"
          }`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}
