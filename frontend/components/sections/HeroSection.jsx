"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { siteConfig } from "@/data/site";
import { MagneticLink } from "@/components/common/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

export function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const indicatorRef = useRef(null);
  const { reducedMotion, preloaderDone } = useMotionSettings();

  useGSAP(
    () => {
      if (!sectionRef.current || reducedMotion || !preloaderDone) return;

      const eyebrow = contentRef.current?.querySelector("[data-hero-eyebrow]");
      const body = contentRef.current?.querySelector("[data-hero-body]");
      const ctas = contentRef.current?.querySelectorAll("[data-hero-cta]");
      const meta = contentRef.current?.querySelector("[data-hero-meta]");

      gsap.set(
        [eyebrow, body, meta, indicatorRef.current, ...(ctas || [])].filter(
          Boolean
        ),
        { autoAlpha: 0 }
      );

      const tl = gsap.timeline({
        delay: 0.08,
        defaults: { ease: "power3.out", force3D: true }
      });

      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { autoAlpha: 0, y: 18, letterSpacing: "0.28em" },
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: "0.18em",
            duration: 0.85
          },
          0
        );
      }

      if (body) {
        tl.fromTo(
          body,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out"
          },
          0.55
        );
      }

      if (ctas?.length) {
        tl.fromTo(
          ctas,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out"
          },
          0.72
        );
      }

      if (meta) {
        tl.fromTo(
          meta,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          0.95
        );
      }

      if (indicatorRef.current) {
        tl.fromTo(
          indicatorRef.current,
          { autoAlpha: 0, y: -8 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          1.05
        );
      }

      const bob = indicatorRef.current
        ? gsap.to(indicatorRef.current.querySelector("[data-scroll-line]"), {
            scaleY: 0.5,
            transformOrigin: "top",
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.35
          })
        : null;

      return () => {
        tl.kill();
        bob?.kill();
      };
    },
    { dependencies: [reducedMotion, preloaderDone], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="theme-dark relative min-h-[100svh] overflow-x-clip"
      data-header-theme="dark"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <HeroVideoBackground />
      </div>

      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <div className="container-site relative z-10 flex min-h-[100svh] flex-col justify-end pb-10 pt-[calc(var(--header-height)+1.5rem)] sm:pb-12 sm:pt-[calc(var(--header-height)+2.25rem)] lg:justify-center lg:pb-20">
        <div ref={contentRef} className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          <p
            data-hero-eyebrow
            className="label-caps mb-4 text-concrete tracking-[0.18em] sm:mb-5"
            style={reducedMotion ? undefined : { opacity: 0 }}
          >
            Real Estate · Architecture · Development
          </p>

          <TextReveal
            as="h1"
            type="lines"
            immediate
            ready={preloaderDone || reducedMotion}
            delay={0.18}
            duration={1.2}
            stagger={0.14}
            className="font-display display-xl whitespace-pre-line text-warm-ivory"
          >
            {siteConfig.tagline}
          </TextReveal>

          <p
            data-hero-body
            className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-concrete sm:mt-6 sm:text-base md:max-w-lg md:text-lg"
            style={reducedMotion ? undefined : { opacity: 0 }}
          >
            {siteConfig.shortDescription}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
            <span
              data-hero-cta
              className="inline-flex w-full sm:w-auto"
              style={reducedMotion ? undefined : { opacity: 0 }}
            >
              <MagneticLink
                href={siteConfig.primaryCta.href}
                variant="primary"
                className="w-full justify-center sm:w-auto"
              >
                {siteConfig.primaryCta.label}
              </MagneticLink>
            </span>
            <span
              data-hero-cta
              className="inline-flex w-full sm:w-auto"
              style={reducedMotion ? undefined : { opacity: 0 }}
            >
              <MagneticLink
                href={siteConfig.secondaryCta.href}
                variant="secondary"
                className="w-full justify-center sm:w-auto"
              >
                {siteConfig.secondaryCta.label}
              </MagneticLink>
            </span>
          </div>

          <p
            data-hero-meta
            className="label-caps mt-8 text-concrete/55 sm:mt-10"
            style={reducedMotion ? undefined : { opacity: 0 }}
          >
            Est. {siteConfig.foundingYear} · {siteConfig.address.city}
          </p>
        </div>
      </div>

      <div
        ref={indicatorRef}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        style={reducedMotion ? undefined : { opacity: 0 }}
        aria-hidden
      >
        <span className="label-caps text-concrete/70">Scroll</span>
        <span
          data-scroll-line
          className="block h-11 w-px origin-top bg-gradient-to-b from-brick via-brick/50 to-transparent"
        />
      </div>
    </section>
  );
}
