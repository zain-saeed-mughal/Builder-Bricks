"use client";

import { useCallback, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import { projects, projectCities } from "@/data/projects";
import {
  ProjectFilters,
  filterProjects,
  useDefaultFilterState
} from "@/components/projects/ProjectFilters";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

export function ProjectsArchive() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const filters = useDefaultFilterState(searchParams);
  const view = searchParams.get("view") || "grid";

  const syncParams = useCallback(
    (nextFilters, nextView = view) => {
      const params = new URLSearchParams();
      if (nextFilters.query) params.set("q", nextFilters.query);
      if (nextFilters.category !== "All")
        params.set("category", nextFilters.category);
      if (nextFilters.status !== "All") params.set("status", nextFilters.status);
      if (nextFilters.city !== "All") params.set("city", nextFilters.city);
      if (nextView !== "grid") params.set("view", nextView);

      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `/projects?${query}` : "/projects", {
          scroll: false
        });
      });
    },
    [router, startTransition, view]
  );

  const filtered = useMemo(
    () => filterProjects(projects, filters),
    [filters]
  );

  return (
    <div className="space-y-10">
      <ScrollReveal y={20}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <ProjectFilters
            value={filters}
            onChange={(next) => syncParams(next)}
            cities={projectCities}
            className="flex-1"
          />

          <div
            className="flex shrink-0 items-center gap-2"
            role="group"
            aria-label="View mode"
          >
            <button
              type="button"
              aria-pressed={view === "grid"}
              className={cn(
                "label-caps inline-flex touch-target items-center gap-2 border px-4 py-2 transition-colors",
                view === "grid"
                  ? "border-brick bg-brick text-muted-white"
                  : "border-current/20 hover:border-brick"
              )}
              onClick={() => syncParams(filters, "grid")}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
              Grid
            </button>
            <button
              type="button"
              aria-pressed={view === "list"}
              className={cn(
                "label-caps inline-flex touch-target items-center gap-2 border px-4 py-2 transition-colors",
                view === "list"
                  ? "border-brick bg-brick text-muted-white"
                  : "border-current/20 hover:border-brick"
              )}
              onClick={() => syncParams(filters, "list")}
            >
              <List className="h-4 w-4" aria-hidden />
              List
            </button>
          </div>
        </div>
      </ScrollReveal>

      <p className="label-caps">
        {filtered.length} project{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="border border-current/10 px-6 py-16 text-center">
          <p className="font-display text-2xl md:text-3xl">No projects found</p>
          <p className="mt-3 text-concrete">
            Try adjusting your search or filters to explore more of our work.
          </p>
        </div>
      ) : view === "list" ? (
        <div>
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              layout="list"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              layout="grid"
            />
          ))}
        </div>
      )}
    </div>
  );
}
