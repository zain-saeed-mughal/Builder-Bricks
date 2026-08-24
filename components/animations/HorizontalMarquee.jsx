"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

export function HorizontalMarquee({
  items = [],
  images = [],
  className,
  speed = 32,
  reverse = false,
  pauseOnHover = true
}) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  const textLoop = items.length ? [...items, ...items] : [];
  const imageLoop = images.length ? [...images, ...images] : [];

  useGSAP(
    () => {
      if (!trackRef.current || !rootRef.current || reducedMotion) return;

      const track = trackRef.current;
      const root = rootRef.current;
      const distance = track.scrollWidth / 2;
      if (!distance) return;

      gsap.set(track, { x: reverse ? -distance : 0 });

      const loop = gsap.to(track, {
        x: reverse ? 0 : -distance,
        duration: speed,
        ease: "none",
        repeat: -1
      });

      // Pause when off-screen — stops continuous compositor work.
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) loop.play();
          else loop.pause();
        },
        { threshold: 0.05, rootMargin: "80px 0px" }
      );
      io.observe(root);

      const onEnter = () => {
        if (pauseOnHover) loop.pause();
      };
      const onLeave = () => {
        if (pauseOnHover) loop.play();
      };

      if (pauseOnHover) {
        root.addEventListener("pointerenter", onEnter);
        root.addEventListener("pointerleave", onLeave);
      }

      return () => {
        io.disconnect();
        loop.kill();
        root.removeEventListener("pointerenter", onEnter);
        root.removeEventListener("pointerleave", onLeave);
      };
    },
    {
      dependencies: [
        reducedMotion,
        speed,
        reverse,
        pauseOnHover,
        items.length,
        images.length
      ]
    }
  );

  if (!textLoop.length && !imageLoop.length) return null;

  return (
    <div
      ref={rootRef}
      className={cn("relative overflow-hidden", className)}
      aria-hidden
    >
      <div ref={trackRef} className="flex w-max">
        {imageLoop.length
          ? imageLoop.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative mx-2 h-36 w-52 shrink-0 overflow-hidden sm:mx-3 sm:h-44 sm:w-72 md:h-56 md:w-80"
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="320px"
                  quality={50}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))
          : textLoop.map((label, index) => (
              <span
                key={`${label}-${index}`}
                className="font-display mx-6 shrink-0 whitespace-nowrap text-4xl text-warm-ivory/25 sm:mx-8 sm:text-5xl md:text-6xl"
              >
                {label}
              </span>
            ))}
      </div>
    </div>
  );
}
