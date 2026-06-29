import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
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
      <div className="p-6">
        Category not found. <Link to="/home" className="underline">Back</Link>
      </div>
    );
  }

  const confOf = (sid: string) =>
    (progress?.progress ?? []).find((p) => p.scenario_id === sid)?.confidence ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 pt-4 pb-24">
        <Link to="/home" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">{cat.icon}</div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{cat.nameRu}</h1>
            <p className="text-sm text-muted-foreground">{cat.nameEn}</p>
          </div>
        </div>

        <div className="space-y-3">
          {cat.scenarios.map((s) => (
            <div key={s.id} className="rounded-2xl bg-card border overflow-hidden">
              <div
                className="w-full h-32 bg-muted bg-cover bg-center"
                style={{ backgroundImage: `url(${photoUrl(s.photo)})` }}
              />
              <div className="p-4">
                <div className="text-base font-semibold text-foreground">{s.titleRu}</div>
                <div className="text-xs text-muted-foreground">{s.titleEn}</div>
                <div className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {s.canDo}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <ConfidenceDots value={confOf(s.id)} />
                  <Link
                    to="/lesson/$scenarioId"
                    params={{ scenarioId: s.id }}
                    className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full"
                  >
                    Practice
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}