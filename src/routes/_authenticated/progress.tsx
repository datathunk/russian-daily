import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
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
  const status = (sid: string) => {
    const c = conf(sid);
    if (c >= 4) return "Confident";
    if (c >= 1) return "Tried";
    return "Rehearsed";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 pt-4 pb-24">
        <Link to="/home" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <h1 className="text-xl font-bold mb-1">Progress</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {cnt?.count ?? 0} phrases used in real life this week.
        </p>

        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.id}>
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span> {cat.nameEn}
              </div>
              <div className="rounded-2xl bg-card border divide-y">
                {cat.scenarios.map((s) => (
                  <div key={s.id} className="p-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{s.canDo}</div>
                      <div className="text-xs text-muted-foreground">{status(s.id)}</div>
                    </div>
                    <ConfidenceDots value={conf(s.id)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}