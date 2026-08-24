"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function BrandStatement() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const accentRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (!lineRef.current || !sectionRef.current || reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 35%",
            scrub: 0.7
          }
        });

        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, ease: "none" }
        );

        if (accentRef.current) {
          tl.fromTo(
            accentRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, ease: "none" },
            0.25
          );
        }

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        const tween = gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%"
            }
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="theme-light section-pad"
      data-header-theme="light"
    >
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <TextReveal
              as="h2"
              type="lines"
              className="font-display display-xl text-obsidian"
            >
              {"BUILDING SPACES\nTHAT OUTLIVE\nTRENDS."}
            </TextReveal>
          </div>

          <div className="space-y-8">
            <div
              ref={lineRef}
              className="relative h-px w-full origin-left bg-obsidian/15"
              aria-hidden
            >
              <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-brick bg-warm-ivory" />
              <div
                ref={accentRef}
                className="absolute right-[18%] top-1/2 hidden h-px w-[32%] origin-left -translate-y-1/2 bg-brick/60 md:block"
              />
            </div>

            <ScrollReveal y={24} delay={0.05}>
              <p className="max-w-md text-pretty text-obsidian/70 md:text-lg">
                {siteConfig.description}
              </p>
            </ScrollReveal>

            <ScrollReveal y={16} delay={0.12}>
              <p className="label-caps text-obsidian/45">
                Architecture with permanence · Craft with intention
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
