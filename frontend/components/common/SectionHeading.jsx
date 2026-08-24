"use client";

import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <ScrollReveal y={16} duration={0.7}>
          <p className={cn("label-caps mb-4", light && "text-obsidian/55")}>
            {eyebrow}
          </p>
        </ScrollReveal>
      ) : null}

      {typeof title === "string" ? (
        <TextReveal
          as="h2"
          type="lines"
          className={cn(
            "font-display display-md whitespace-pre-line text-balance",
            light ? "text-obsidian" : "text-warm-ivory"
          )}
        >
          {title}
        </TextReveal>
      ) : (
        <h2
          className={cn(
            "font-display display-md whitespace-pre-line text-balance",
            light ? "text-obsidian" : "text-warm-ivory"
          )}
        >
          {title}
        </h2>
      )}

      {description ? (
        <ScrollReveal y={20} delay={0.12} duration={0.8}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-pretty",
              light ? "text-obsidian/70" : "text-concrete",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
