import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Mic, Flame, ChevronRight, TrendingUp } from "lucide-react";
import { categories, todaysScenario, photoUrl } from "@/data/categories";
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

  const weeklyCount = weekly?.count ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 pt-6 pb-28">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Доброе утро</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Ready to practice?</p>
          </div>
          <Link
            to="/progress"
            className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground"
          >
            <Flame className="w-3.5 h-3.5 text-accent" />
            <span className="tabular-nums">{weeklyCount}</span>
            <span className="text-muted-foreground">this week</span>
          </Link>
        </div>

        {/* Hero: Today's Drill */}
        <Link
          to="/lesson/$scenarioId"
          params={{ scenarioId: today.scenario.id }}
          className="block group relative overflow-hidden rounded-2xl"
        >
          {/* Background photo */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 group-active:scale-100 transition-transform duration-300"
            style={{ backgroundImage: `url(${photoUrl(today.scenario.photo)})` }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          {/* Indigo glow at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/20 to-transparent" />

          {/* Content */}
          <div className="relative p-5 pt-20">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80 mb-3">
              <Mic className="w-3 h-3" />
              Today's Drill
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">
              {today.scenario.titleRu}
            </h2>
            <p className="text-sm text-white/70 mt-1">{today.scenario.titleEn}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-white/60">{today.scenario.canDo}</span>
              <div className="flex items-center gap-1.5 bg-primary text-white rounded-full px-4 py-2 text-sm font-semibold glow-primary group-active:scale-95 transition-transform">
                <Mic className="w-3.5 h-3.5" />
                Start
              </div>
            </div>
          </div>
        </Link>

        {/* Numbers drill shortcut */}
        <Link
          to="/drill/numbers"
          className="mt-3 flex items-center justify-between glass rounded-xl px-4 py-3 group"
        >
          <div>
            <div className="text-sm font-semibold text-foreground">Numbers & Prices</div>
            <div className="text-xs text-muted-foreground mt-0.5">Ruble amounts, weights, quantities</div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>

        {/* Categories */}
        <div className="mt-8 flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Scenarios</h2>
          <Link to="/progress" className="flex items-center gap-1 text-xs text-primary font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            Progress
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const confidence = progByCat(cat.id);
            const catScenarioCount = cat.scenarios.length;
            const practicedCount = (progress?.progress ?? []).filter((r) =>
              cat.scenarios.some((s) => s.id === r.scenario_id)
            ).length;

            return (
              <Link
                key={cat.id}
                to="/category/$categoryId"
                params={{ categoryId: cat.id }}
                className="group relative overflow-hidden rounded-2xl aspect-square flex flex-col justify-end active:scale-[0.97] transition-transform"
              >
                {/* Background — use first scenario photo */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-active:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${photoUrl(cat.scenarios[0]?.photo ?? "")})`,
                    backgroundColor: "var(--color-card)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative p-3">
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-sm font-bold text-white leading-tight">{cat.nameRu}</div>
                  <div className="text-[11px] text-white/60 leading-tight">{cat.nameEn}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <ConfidenceDots value={confidence} size={6} />
                    <span className="text-[10px] text-white/50">
                      {practicedCount}/{catScenarioCount}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
