"use client";

import { statistics } from "@/data/content";
import { Counter } from "@/components/common/Counter";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function NumbersSection() {
  return (
    <section className="theme-light section-pad" data-header-theme="light">
      <div className="container-site">
        <SectionHeading
          eyebrow="By the Numbers"
          title="Measured Impact"
          description="Key metrics from our development practice. Values shown are sample placeholders."
          light
          className="mb-12"
        />

        <div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          data-numbers-grid
        >
          {statistics.map((stat, index) => (
            <ScrollReveal
              key={stat.id}
              y={36}
              delay={index * 0.08}
              duration={0.9}
            >
              <div className="border-t border-obsidian/10 pt-6">
                <p className="font-display text-4xl text-obsidian md:text-5xl">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </p>
                <p className="mt-3 text-obsidian/65">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal y={12} delay={0.2}>
          <p className="label-caps mt-10 text-obsidian/40">
            Sample values — replace with verified company metrics before launch.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
