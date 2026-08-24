"use client";

import { getFeaturedProjects } from "@/data/projects";
import { atmosphereLabels } from "@/data/site";
import { HorizontalMarquee } from "@/components/animations/HorizontalMarquee";

const stripImages = getFeaturedProjects()
  .slice(0, 4)
  .map((project) => ({
    ...project.coverImage,
    // Prefer smaller remote asset when Unsplash
    src: project.coverImage.src.includes("images.unsplash.com")
      ? project.coverImage.src.replace(/w=\d+/, "w=640")
      : project.coverImage.src
  }));

export function AtmosphereStrip() {
  return (
    <section
      className="theme-dark relative overflow-hidden py-10 md:py-14"
      data-header-theme="dark"
      aria-label="Project atmosphere"
    >
      <div className="container-site mb-8">
        <p className="label-caps text-concrete">Spaces in motion</p>
      </div>

      <div className="atmosphere-fade space-y-4 md:space-y-5">
        {/* Images only on md+ — mobile stays light */}
        <div className="hidden md:block">
          <HorizontalMarquee images={stripImages} speed={42} pauseOnHover />
        </div>
        <HorizontalMarquee
          items={atmosphereLabels}
          speed={30}
          reverse
          pauseOnHover
        />
      </div>

      <div className="container-site mt-10">
        <div className="section-divider" aria-hidden />
      </div>
    </section>
  );
}
