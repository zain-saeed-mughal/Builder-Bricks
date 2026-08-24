"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({
  children,
  as: Tag = "div",
  className,
  y = 20,
  delay = 0,
  duration = 0.65,
  stagger = 0.06,
  start = "top 90%",
  childSelector,
  once = true
}) {
  const rootRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) return;

      const targets = childSelector
        ? Array.from(rootRef.current.querySelectorAll(childSelector))
        : [rootRef.current];

      if (!targets.length) return;

      // Do not force-hide with immediateRender — avoids blank content flash/lag feel
      const tween = gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration,
        delay,
        stagger: childSelector ? stagger : 0,
        ease: "power2.out",
        clearProps: "opacity,visibility,transform",
        scrollTrigger: {
          trigger: rootRef.current,
          start,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse"
        }
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    {
      dependencies: [
        reducedMotion,
        y,
        delay,
        duration,
        stagger,
        start,
        childSelector,
        once
      ]
    }
  );

  return (
    <Tag ref={rootRef} className={cn(className)}>
      {children}
    </Tag>
  );
}
