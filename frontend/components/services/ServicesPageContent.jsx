"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MagneticLink } from "@/components/common/MagneticButton";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

export function ServicesPageContent() {
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug ?? "");
  const sectionRefs = useRef(new Map());

  useEffect(() => {
    const observers = [];

    services.forEach((service) => {
      const element = sectionRefs.current.get(service.slug);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveSlug(service.slug);
          }
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <>
      <section className="theme-dark section-pad pt-[calc(var(--header-height)+2rem)]">
        <div className="container-site">
          <SectionHeading
            eyebrow="Services"
            title="Integrated development expertise"
            description="Seven disciplines working as one practice—from land strategy and architecture to delivery and investment partnerships."
          />
        </div>
      </section>

      <section className="theme-light section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-[14rem_1fr]">
          <nav aria-label="Services index" className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-height)+2rem)] space-y-2">
              {services.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className={cn(
                    "label-caps block border-l-2 py-2 pl-4 transition-colors",
                    activeSlug === service.slug
                      ? "border-brick text-brick"
                      : "border-transparent text-obsidian/50 hover:text-obsidian"
                  )}
                >
                  {service.number} — {service.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-24">
            {services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                ref={(node) => {
                  if (node) sectionRefs.current.set(service.slug, node);
                }}
                className="scroll-mt-[calc(var(--header-height)+2rem)] border-t border-obsidian/10 pt-12 first:border-t-0 first:pt-0"
              >
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                  <ScrollReveal y={28} delay={0.05}>
                    <div>
                      <p className="label-caps text-brick">{service.number}</p>
                      <h2 className="font-display mt-3 text-3xl text-obsidian md:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-lg text-obsidian/70">
                        {service.summary}
                      </p>
                      <p className="mt-6 text-pretty text-obsidian/80">
                        {service.explanation}
                      </p>
                      <div className="mt-8">
                        <h3 className="label-caps mb-4">Deliverables</h3>
                        <ul className="space-y-2">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-obsidian/80"
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 bg-brick"
                                aria-hidden
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <MagneticLink
                        href="/contact"
                        variant="secondary"
                        className="mt-8 text-obsidian"
                      >
                        Discuss this service
                      </MagneticLink>
                    </div>
                  </ScrollReveal>
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                    <ImageReveal
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 45vw"
                      className="absolute inset-0 h-full w-full"
                      delay={(index % 3) * 0.05}
                      variant={index % 2 === 0 ? "wipe" : "clip"}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
