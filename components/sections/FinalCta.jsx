"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site";
import { MagneticLink } from "@/components/common/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const floatingBricks = [
  { id: "a", className: "left-[8%] top-[18%] h-16 w-24" },
  { id: "b", className: "right-[12%] top-[28%] h-12 w-20" },
  { id: "c", className: "right-[20%] bottom-[18%] h-14 w-[5.5rem]" }
];

export function FinalCta() {
  const sectionRef = useRef(null);
  const fieldRef = useRef(null);
  const contentRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (!fieldRef.current || reducedMotion) return;

      const bricks = fieldRef.current.querySelectorAll("[data-float-brick]");
      const tweens = gsap.utils.toArray(bricks).map((brick, index) =>
        gsap.to(brick, {
          y: "+=12",
          duration: 2.6 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true
        })
      );

      const io = new IntersectionObserver(
        ([entry]) => {
          tweens.forEach((tween) => {
            if (entry.isIntersecting) tween.play();
            else tween.pause();
          });
        },
        { threshold: 0.1 }
      );
      io.observe(sectionRef.current);

      let contentTween = null;
      if (contentRef.current) {
        contentTween = gsap.fromTo(
          contentRef.current.children,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      return () => {
        io.disconnect();
        tweens.forEach((tween) => tween.kill());
        contentTween?.scrollTrigger?.kill();
        contentTween?.kill();
      };
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="theme-dark relative overflow-hidden section-pad"
      data-header-theme="dark"
    >
      <div
        ref={fieldRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        {floatingBricks.map((brick) => (
          <div
            key={brick.id}
            data-float-brick
            className={cn(
              "absolute hidden rounded-sm border border-brick/30 bg-brick/20 md:block",
              brick.className
            )}
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className="container-site relative z-10 text-center"
      >
        <TextReveal
          as="h2"
          type="lines"
          className="font-display display-lg whitespace-pre-line text-warm-ivory"
        >
          {"LET'S BUILD\nWHAT'S NEXT."}
        </TextReveal>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-concrete">
          Whether you are planning a residence, mixed-use destination, or a full
          development partnership—we are ready to shape it with you.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <MagneticLink href="/contact" variant="primary">
            Contact Our Team
          </MagneticLink>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-sm text-concrete sm:flex-row sm:gap-6">
          <a
            href={`mailto:${siteConfig.email}`}
            className="transition-colors hover:text-brick"
          >
            {siteConfig.email}
          </a>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="transition-colors hover:text-brick"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
