"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

function splitText(text, type) {
  if (type === "chars") {
    return text.split("").map((char, index) => ({
      key: `c-${index}`,
      content: char === " " ? "\u00A0" : char
    }));
  }
  if (type === "words") {
    return text.split(/\s+/).filter(Boolean).map((word, index) => ({
      key: `w-${index}`,
      content: word
    }));
  }
  return text.split("\n").map((line, index) => ({
    key: `l-${index}`,
    content: line
  }));
}

export function TextReveal({
  children,
  as: Tag = "div",
  type = "lines",
  className,
  delay = 0,
  mode = "once",
  start = "top 85%",
  end = "top 35%",
  scrub = 0.6,
  /** Skip ScrollTrigger — play on mount (hero entrances). */
  immediate = false,
  /** Gate playback (e.g. wait for preloader) — plays once when true. */
  ready = true,
  duration,
  stagger
}) {
  const rootRef = useRef(null);
  const { reducedMotion } = useMotionSettings();
  const text = typeof children === "string" ? children : null;

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion || !text || !ready) return;

      const items = rootRef.current.querySelectorAll("[data-reveal-item]");
      if (!items.length) return;

      const scrubMode = mode === "scrub";
      const itemDuration =
        duration ?? (scrubMode ? 1 : immediate ? 1.15 : 1.05);
      const itemStagger =
        stagger ??
        (type === "chars" ? 0.018 : type === "words" ? 0.065 : 0.12);

      const tween = gsap.fromTo(
        items,
        {
          yPercent: 110,
          opacity: scrubMode ? 0.12 : 0,
          rotateX: immediate ? 14 : 0,
          transformOrigin: "50% 100%"
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: itemDuration,
          stagger: itemStagger,
          delay: scrubMode ? 0 : delay,
          ease: scrubMode ? "none" : "power4.out",
          force3D: true,
          onComplete: () => {
            items.forEach((el) => {
              el.style.willChange = "auto";
            });
          },
          ...(immediate
            ? {}
            : {
                scrollTrigger: scrubMode
                  ? {
                      trigger: rootRef.current,
                      start,
                      end,
                      scrub
                    }
                  : {
                      trigger: rootRef.current,
                      start,
                      toggleActions: "play none none none"
                    }
              })
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    {
      dependencies: [
        text,
        type,
        delay,
        reducedMotion,
        mode,
        start,
        end,
        scrub,
        immediate,
        ready,
        duration,
        stagger
      ]
    }
  );

  if (!text) {
    return <Tag className={className}>{children}</Tag>;
  }

  const parts = splitText(text, type);

  return (
    <Tag
      ref={rootRef}
      className={cn(immediate && "[perspective:900px]", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="block">
        {parts.map((part, index) => (
          <span
            key={part.key}
            className={cn(
              "inline-block overflow-hidden align-bottom",
              type === "lines" && "block pb-[0.08em]",
              type === "words" && "mr-[0.28em]"
            )}
          >
            <span
              data-reveal-item
              className="inline-block will-change-transform"
              style={immediate ? { opacity: 0 } : undefined}
            >
              {part.content}
              {type === "lines" && index < parts.length - 1 ? <br /> : null}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
