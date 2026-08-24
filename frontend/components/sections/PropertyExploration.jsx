"use client";

import { useMemo, useState } from "react";
import { projects, projectCities } from "@/data/projects";
import {
  ProjectFilters,
  filterProjects
} from "@/components/projects/ProjectFilters";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const defaultFilters = {
  query: "",
  category: "All",
  status: "All",
  city: "All"
};

export function PropertyExploration() {
  const [filters, setFilters] = useState(defaultFilters);

  const filtered = useMemo(
    () => filterProjects(projects, filters),
    [filters]
  );

  return (
    <section className="theme-dark section-pad" data-header-theme="dark">
      <div className="container-site">
        <SectionHeading
          eyebrow="Portfolio"
          title="Explore Our Developments"
          description="Filter by typology, status, or city to find projects aligned with your vision."
          className="mb-10"
        />

        <ScrollReveal y={20} duration={0.7}>
          <ProjectFilters
            value={filters}
            onChange={setFilters}
            cities={projectCities}
            showStatus
            showCity
            className="mb-10"
          />
        </ScrollReveal>

        {filtered.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="border border-current/10 bg-charcoal/40 px-6 py-16 text-center">
            <p className="font-display mb-2 text-2xl text-warm-ivory">
              No projects match your filters
            </p>
            <p className="mx-auto max-w-md text-concrete">
              Try adjusting your search or clearing filters to browse the full
              portfolio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
