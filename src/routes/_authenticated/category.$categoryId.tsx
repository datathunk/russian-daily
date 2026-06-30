import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { findCategory, photoUrl } from "@/data/categories";
import { ConfidenceDots } from "@/components/ConfidenceDots";
import { getAllScenarioProgress } from "@/lib/chat.functions";

export const Route = createFileRoute("/_authenticated/category/$categoryId")({
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryId } = useParams({ from: "/_authenticated/category/$categoryId" });
  const cat = findCategory(categoryId);
  const fetchProgress = useServerFn(getAllScenarioProgress);
  const { data: progress } = useQuery({
    queryKey: ["progress"],
    queryFn: () => fetchProgress(),
  });

  if (!cat) {
    return (
      <div className="p-6 text-foreground">
        Category not found. <Link to="/home" className="underline text-primary">Back</Link>
      </div>
    );
  }

  const confOf = (sid: string) =>
    (progress?.progress ?? []).find((p) => p.scenario_id === sid)?.confidence ?? 0;

  const totalPracticed = cat.scenarios.filter((s) => confOf(s.id) > 0).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="relative overflow-hidden">
        <div
          className="h-44 bg-cover bg-center"
          style={{ backgroundImage: `url(${photoUrl(cat.scenarios[0]?.photo ?? "")})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
        <div className="absolute top-4 left-4">
          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-sm text-white/90"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{cat.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-white leading-tight">{cat.nameRu}</h1>
              <p className="text-sm text-white/70">{cat.nameEn}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{totalPracticed}</div>
            <div className="text-xs text-white/60">of {cat.scenarios.length}</div>
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div className="mx-auto max-w-md px-4 pt-4 pb-24 space-y-3">
        {cat.scenarios.map((s) => {
          const confidence = confOf(s.id);
          return (
            <div key={s.id} className="relative overflow-hidden rounded-2xl group">
              {/* Photo background */}
              <div
                className="h-28 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${photoUrl(s.photo)})`, backgroundColor: "var(--color-card)" }}
              />
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* Content overlay on photo */}
              <div className="absolute top-0 left-0 h-28 flex flex-col justify-center px-4">
                <div className="text-base font-bold text-white leading-tight">{s.titleRu}</div>
                <div className="text-xs text-white/60 mt-0.5">{s.titleEn}</div>
                <div className="mt-1.5">
                  <ConfidenceDots value={confidence} size={7} />
                </div>
              </div>

              {/* Practice button */}
              <div className="absolute top-0 right-0 h-28 flex items-center pr-4">
                <Link
                  to="/lesson/$scenarioId"
                  params={{ scenarioId: s.id }}
                  className="flex items-center gap-1.5 bg-primary text-white rounded-full px-4 py-2 text-sm font-semibold glow-primary active:scale-95 transition-transform"
                >
                  <Play className="w-3.5 h-3.5" />
                  {confidence > 0 ? "Practice" : "Start"}
                </Link>
              </div>

              {/* Can-do tag below */}
              <div className="glass px-4 py-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground leading-snug">{s.canDo}</span>
                {confidence >= 4 && (
                  <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Confident</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
