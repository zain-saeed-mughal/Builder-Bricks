import { Suspense } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Explore Builder Bricks residential, commercial, and mixed-use developments across Pakistan.",
  path: "/projects"
});

function ArchiveFallback() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="h-12 max-w-md animate-pulse bg-current/10" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse bg-current/10" />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <section className="theme-light section-pad pt-[calc(var(--header-height)+2rem)]">
      <div className="container-site">
        <SectionHeading
          light
          eyebrow="Portfolio"
          title="Our projects"
          description="Filter by category, status, or city to explore developments shaped with purpose and precision."
        />
        <div className="mt-12">
          <Suspense fallback={<ArchiveFallback />}>
            <ProjectsArchive />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
