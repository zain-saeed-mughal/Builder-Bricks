"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { philosophyItems } from "@/data/site";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const sectionRef = useRef(null);
  const blocksRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (!blocksRef.current || !sectionRef.current || reducedMotion) return;

      const items = blocksRef.current.querySelectorAll("[data-philosophy-item]");

      // One-shot stagger — no pin/scrub (was stacking with FeaturedProjects).
      const tween = gsap.fromTo(
        items,
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: blocksRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="theme-dark"
      data-header-theme="dark"
    >
      <div className="section-pad lg:flex lg:min-h-[100svh] lg:items-center">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:self-start">
            <TextReveal
              as="h2"
              type="lines"
              className="font-display display-lg whitespace-pre-line text-warm-ivory"
            >
              {"DESIGNED AROUND LIFE.\nBUILT AROUND PEOPLE."}
            </TextReveal>
            <ScrollReveal y={20} delay={0.1}>
              <p className="mt-6 max-w-sm text-pretty text-concrete">
                Our practice balances architectural clarity with the rhythms of
                everyday living—spaces that feel composed, not performed.
              </p>
            </ScrollReveal>
          </div>

          <div ref={blocksRef} className="space-y-0 divide-y divide-current/10">
            {philosophyItems.map((item, index) => (
              <article
                key={item.title}
                data-philosophy-item
                className={cn("py-8 first:pt-0 last:pb-0 md:py-10")}
              >
                <p className="label-caps mb-4 text-brick">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mb-3 text-2xl text-warm-ivory md:text-3xl">
                  {item.title}
                </h3>
                <p className="max-w-lg text-pretty text-concrete">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
