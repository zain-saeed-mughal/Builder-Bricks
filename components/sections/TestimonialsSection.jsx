"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { useReducedMotion } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const reducedMotion = useReducedMotion();
  const total = testimonials.length;

  const goTo = useCallback(
    (next) => {
      setIndex((next % total + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (reducedMotion || paused) return;

    const timer = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goNext, paused, reducedMotion]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  const onPointerDown = (event) => {
    touchStartX.current = event.clientX;
  };

  const onPointerUp = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const active = testimonials[index];

  return (
    <section className="theme-dark section-pad" data-header-theme="dark">
      <div className="container-site">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Client Voices"
            title="What Residents & Partners Say"
            className="mb-0"
          />
          <ScrollReveal y={16} delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="touch-target border border-current/20 p-3 transition-colors hover:border-brick hover:text-brick"
                onClick={goPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                className="touch-target border border-current/20 p-3 transition-colors hover:border-brick hover:text-brick"
                onClick={goNext}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal y={28} duration={0.9}>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative border border-current/10 bg-charcoal/35 px-6 py-10 md:px-12 md:py-14"
          >
            <div className="overflow-hidden">
              <blockquote
                key={active.id}
                className="max-w-4xl animate-[fadeIn_0.5s_ease]"
              >
                <TextReveal
                  as="p"
                  type="lines"
                  className="font-display text-2xl leading-snug text-warm-ivory md:text-3xl lg:text-4xl"
                >
                  {`“${active.quote}”`}
                </TextReveal>
                <footer className="mt-8">
                  <cite className="not-italic">
                    <span className="block font-display text-lg text-warm-ivory">
                      {active.name}
                    </span>
                    <span className="mt-1 block text-sm text-concrete">
                      {active.role}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </div>

            <div className="mt-8 flex items-center gap-2">
              {testimonials.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to testimonial ${dotIndex + 1}`}
                  aria-current={dotIndex === index ? "true" : undefined}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    dotIndex === index
                      ? "bg-brick"
                      : "bg-current/20 hover:bg-current/40"
                  )}
                  onClick={() => goTo(dotIndex)}
                />
              ))}
              <span className="label-caps ml-auto text-concrete">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
