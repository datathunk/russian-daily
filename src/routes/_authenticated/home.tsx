import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mic } from "lucide-react";
import { categories, todaysScenario } from "@/data/categories";
import { ConfidenceDots } from "@/components/ConfidenceDots";
import { getWeeklyRealLifeCount, getAllScenarioProgress } from "@/lib/chat.functions";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({ meta: [{ title: "Russian Daily" }] }),
  component: Home,
});

function Home() {
  const fetchCount = useServerFn(getWeeklyRealLifeCount);
  const fetchProgress = useServerFn(getAllScenarioProgress);

  const { data: weekly } = useQuery({
    queryKey: ["weekly-rl"],
    queryFn: () => fetchCount(),
  });
  const { data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: () => fetchProgress(),
  });

  const today = todaysScenario();
  const progByCat = (catId: string) => {
    const rows = (progress?.progress ?? []) as Array<{ scenario_id: string; confidence: number }>;
    const cat = categories.find((c) => c.id === catId)!;
    const ids = new Set(cat.scenarios.map((s) => s.id));
    const vals = rows.filter((r) => ids.has(r.scenario_id)).map((r) => r.confidence);
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / cat.scenarios.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 pt-6 pb-24">
        {/* Top strip */}
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-4">
          Phrases used in real life this week:{" "}
          <span className="text-accent font-semibold">{weekly?.count ?? 0}</span>
        </div>

        {/* Hero: Today's Survival Drill */}
        <Link
          to="/lesson/$scenarioId"
          params={{ scenarioId: today.scenario.id }}
          className="block group"
        >
          <div className="rounded-2xl bg-primary text-primary-foreground p-5 shadow-sm">
            <div className="text-xs uppercase tracking-wide opacity-80">
              Today's Survival Drill
            </div>
            <div className="mt-2 text-2xl font-bold leading-tight">
              {today.scenario.titleRu}
            </div>
            <div className="text-sm opacity-90 mt-1">
              {today.category.icon} {today.scenario.titleEn} — {today.scenario.canDo}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold rounded-full px-4 py-2 group-active:scale-95 transition">
              <Mic className="w-4 h-4" />
              Start Drill →
            </div>
          </div>
        </Link>

        {/* Categories */}
        <div className="mt-8 mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Categories</h2>
          <Link to="/progress" className="text-xs text-primary font-medium">
            Progress →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/category/$categoryId"
              params={{ categoryId: cat.id }}
              className="rounded-2xl bg-card border p-4 active:scale-[0.98] transition flex flex-col"
            >
              <div className="text-2xl">{cat.icon}</div>
              <div className="mt-2 text-sm font-semibold text-foreground leading-tight">
                {cat.nameRu}
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                {cat.nameEn}
              </div>
              <div className="mt-3">
                <ConfidenceDots value={progByCat(cat.id)} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/drill/numbers"
            className="block text-center text-sm text-primary font-medium underline-offset-4 hover:underline"
          >
            Open Numbers Drill →
          </Link>
        </div>
      </div>
    </div>
  );
}