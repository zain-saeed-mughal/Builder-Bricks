"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedProjects } from "@/data/projects";
import { MagneticLink } from "@/components/common/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

const featuredProject = getFeaturedProjects()[0] ?? null;

export function FeaturedProperty() {
  const sectionRef = useRef(null);
  const maskRef = useRef(null);
  const mediaRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (
        !featuredProject ||
        !sectionRef.current ||
        !maskRef.current ||
        !mediaRef.current ||
        reducedMotion
      ) {
        return;
      }

      // One-shot reveal — avoids continuous clip-path scrub paint cost.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(
        maskRef.current,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }
      ).fromTo(
        mediaRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.05, ease: "power2.out" },
        0
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  if (!featuredProject) return null;

  return (
    <section
      ref={sectionRef}
      className="theme-dark section-pad overflow-hidden"
      data-header-theme="dark"
    >
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div
          ref={maskRef}
          className="relative aspect-[4/5] overflow-hidden bg-charcoal lg:aspect-[3/4]"
        >
          <div ref={mediaRef} className="absolute inset-0">
            <Image
              src={featuredProject.coverImage.src}
              alt={featuredProject.coverImage.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 50vw"
              className="object-cover"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent"
            aria-hidden
          />
        </div>

        <div>
          <ScrollReveal y={16}>
            <p className="label-caps mb-4 text-brick">Featured Property</p>
          </ScrollReveal>
          <TextReveal
            as="h2"
            type="lines"
            className="font-display display-md text-warm-ivory"
          >
            {featuredProject.title}
          </TextReveal>
          <ScrollReveal y={18} delay={0.08}>
            <p className="label-caps mt-4 text-concrete">
              {featuredProject.city} · {featuredProject.year} ·{" "}
              {featuredProject.status}
            </p>
          </ScrollReveal>
          <ScrollReveal y={22} delay={0.12}>
            <p className="mt-6 max-w-lg text-pretty text-concrete">
              {featuredProject.overview}
            </p>
          </ScrollReveal>
          <ScrollReveal y={18} delay={0.18}>
            <div className="mt-8">
              <MagneticLink
                href={`/projects/${featuredProject.slug}`}
                variant="primary"
              >
                View Project
              </MagneticLink>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
