"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function ImageReveal({
  src,
  alt,
  width,
  height,
  fill,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  quality = 70,
  className,
  imageClassName,
  variant = "wipe",
  start = "top 85%",
  delay = 0
}) {
  const rootRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (!rootRef.current || reducedMotion) return;

      const media = rootRef.current.querySelector("[data-reveal-media]");
      const mask = rootRef.current.querySelector("[data-reveal-mask]");
      if (!media) return;

      // Images stay visible — only enhance with motion (never cover permanently)
      if (mask) gsap.set(mask, { scaleY: 0 });

      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: rootRef.current,
          start,
          toggleActions: "play none none none"
        }
      });

      if (variant === "clip") {
        gsap.set(rootRef.current, { clipPath: "inset(8% 6% 8% 6%)" });
        tl.to(rootRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "power3.out"
        }).fromTo(
          media,
          { scale: 1.06 },
          { scale: 1, duration: 1, ease: "power2.out" },
          0
        );
      } else {
        tl.fromTo(
          media,
          { scale: 1.06, autoAlpha: 0.72 },
          { scale: 1, autoAlpha: 1, duration: 0.85, ease: "power2.out" }
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { dependencies: [reducedMotion, src, variant, start, delay] }
  );

  return (
    <div ref={rootRef} className={cn("relative overflow-hidden", className)}>
      <div
        data-reveal-media
        className={cn("relative h-full w-full", imageClassName)}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            loading={priority ? "eager" : "lazy"}
            className="object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 1200}
            height={height ?? 800}
            sizes={sizes}
            priority={priority}
            quality={quality}
            loading={priority ? "eager" : "lazy"}
            className="h-auto w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
