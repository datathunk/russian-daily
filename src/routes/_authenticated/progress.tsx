import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flame, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { categories } from "@/data/categories";
import { ConfidenceDots } from "@/components/ConfidenceDots";
import { getAllScenarioProgress, getWeeklyRealLifeCount } from "@/lib/chat.functions";

export const Route = createFileRoute("/_authenticated/progress")({
  component: ProgressPage,
});

function ProgressPage() {
  const fp = useServerFn(getAllScenarioProgress);
  const fc = useServerFn(getWeeklyRealLifeCount);
  const { data: prog } = useQuery({ queryKey: ["progress"], queryFn: () => fp() });
  const { data: cnt } = useQuery({ queryKey: ["weekly-rl"], queryFn: () => fc() });
  const rows = prog?.progress ?? [];

  const conf = (sid: string) => rows.find((r) => r.scenario_id === sid)?.confidence ?? 0;
  const times = (sid: string) => rows.find((r) => r.scenario_id === sid)?.times_practiced ?? 0;

  const totalScenarios = categories.reduce((a, c) => a + c.scenarios.length, 0);
  const totalPracticed = categories.reduce((a, c) =>
    a + c.scenarios.filter((s) => conf(s.id) > 0).length, 0
  );
  const totalConfident = categories.reduce((a, c) =>
    a + c.scenarios.filter((s) => conf(s.id) >= 4).length, 0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 pt-4 pb-24">
        <Link to="/home" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <h1 className="text-2xl font-bold mb-6">Progress</h1>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="glass rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-accent mb-1">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-foreground tabular-nums">{cnt?.count ?? 0}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">used this week</div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-foreground tabular-nums">{totalPracticed}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">tried of {totalScenarios}</div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-2xl font-bold text-foreground tabular-nums">{totalConfident}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">confident</div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="glass rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Overall fluency</span>
            <span className="text-sm font-bold text-primary tabular-nums">
              {totalScenarios > 0 ? Math.round((totalPracticed / totalScenarios) * 100) : 0}%
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 glow-primary"
              style={{ width: `${totalScenarios > 0 ? (totalPracticed / totalScenarios) * 100 : 0}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {totalScenarios - totalPracticed} scenarios left to try
          </p>
        </div>

        {/* Per-category breakdown */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const catPracticed = cat.scenarios.filter((s) => conf(s.id) > 0).length;
            const catPct = cat.scenarios.length > 0 ? (catPracticed / cat.scenarios.length) * 100 : 0;

            return (
              <div key={cat.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{cat.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{cat.nameEn}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {catPracticed}/{cat.scenarios.length}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full bg-primary/70 rounded-full transition-all duration-500"
                        style={{ width: `${catPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl divide-y divide-white/[0.06]">
                  {cat.scenarios.map((s) => {
                    const c = conf(s.id);
                    const t = times(s.id);
                    const label = c >= 4 ? "Confident" : c >= 1 ? "Tried" : "Not started";
                    const labelColor = c >= 4 ? "text-accent" : c >= 1 ? "text-primary" : "text-muted-foreground";
                    return (
                      <div key={s.id} className="px-4 py-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">{s.canDo}</div>
                          <div className={`text-xs ${labelColor} mt-0.5`}>
                            {label}{t > 0 ? ` · ${t}×` : ""}
                          </div>
                        </div>
                        <ConfidenceDots value={c} size={7} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
