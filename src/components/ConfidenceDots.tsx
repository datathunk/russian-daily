export function ConfidenceDots({ value, size = 8 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Confidence ${value} of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`rounded-full ${i < value ? "bg-accent" : "bg-muted-foreground/25"}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}