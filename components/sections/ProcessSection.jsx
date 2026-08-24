"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const stepsRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (!sectionRef.current || !progressRef.current || reducedMotion) return;

      const tween = gsap.fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 30%",
            scrub: true
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

  useGSAP(
    () => {
      if (!stepsRef.current || reducedMotion) return;

      const items = stepsRef.current.querySelectorAll("[data-process-step]");

      const fade = gsap.fromTo(
        items,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      return () => {
        fade.scrollTrigger?.kill();
        fade.kill();
      };
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="theme-dark section-pad overflow-x-clip"
      data-header-theme="dark"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Our Process"
          title="From Site to Signature"
          description="A disciplined sequence that keeps design intent intact from first conversation to handover."
          className="mb-12"
        />

        <div className="relative mb-10 hidden h-px bg-current/10 md:block">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full origin-left bg-brick"
            aria-hidden
          />
        </div>

        <div ref={stepsRef} className="relative">
          <div className="hidden grid-cols-4 gap-6 md:grid">
            {processSteps.map((step) => (
              <article
                key={`d-${step.number}`}
                data-process-step
                className={cn(
                  "border-t border-transparent pt-6 transition-colors duration-500",
                  "[&.is-active]:border-brick"
                )}
              >
                <p className="label-caps mb-4 text-concrete transition-colors duration-500 group-[.is-active]:text-brick [&.is-active]:text-brick">
                  {step.number}
                </p>
                <h3 className="font-display mb-3 text-2xl text-warm-ivory">
                  {step.title}
                </h3>
                <p className="text-sm text-concrete md:text-base">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="relative space-y-0 pl-8 md:hidden">
            <div
              className="absolute bottom-2 left-[7px] top-2 w-px bg-current/15"
              aria-hidden
            />
            {processSteps.map((step, index) => (
              <article
                key={`m-${step.number}`}
                data-process-step
                className={cn(
                  "relative border-b border-current/10 py-8 last:border-b-0",
                  "before:absolute before:-left-8 before:top-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rotate-45 before:border before:border-current/25 before:bg-obsidian before:transition-colors before:duration-500",
                  "[&.is-active]:before:border-brick [&.is-active]:before:bg-brick"
                )}
              >
                <p className="label-caps mb-3 text-concrete">{step.number}</p>
                <h3 className="font-display mb-2 text-xl text-warm-ivory">
                  {step.title}
                </h3>
                <p className="text-sm text-concrete">{step.description}</p>
                {index < processSteps.length - 1 ? (
                  <span className="sr-only">
                    Next: {processSteps[index + 1]?.title}
                  </span>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
