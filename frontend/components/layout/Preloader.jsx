"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";
import { useSessionFlag } from "@/hooks/use-ui";

const PRELOADER_KEY = "bb-preloader-seen";

export function Preloader() {
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const lineRef = useRef(null);
  const bricksRef = useRef(null);
  const brandRef = useRef(null);
  const { reducedMotion, setPreloaderDone } = useMotionSettings();
  const { value: seen, ready, mark } = useSessionFlag(PRELOADER_KEY);

  useGSAP(
    () => {
      if (!ready) return;

      if (seen || reducedMotion) {
        setPreloaderDone(true);
        mark();
        if (rootRef.current) {
          gsap.set(rootRef.current, { display: "none" });
        }
        return;
      }

      const root = rootRef.current;
      const counter = counterRef.current;
      const line = lineRef.current;
      const brand = brandRef.current;
      const bricks = bricksRef.current?.querySelectorAll(".preloader-brick");
      if (!root || !counter || !line || !bricks) return;

      const state = { value: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          mark();
          setPreloaderDone(true);
        }
      });

      tl.fromTo(
        bricks,
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.03, duration: 0.28 }
      )
        .fromTo(
          brand,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.35 },
          0.1
        )
        .to(
          state,
          {
            value: 100,
            duration: 0.45,
            ease: "power2.inOut",
            onUpdate: () => {
              counter.textContent = String(Math.round(state.value)).padStart(
                2,
                "0"
              );
            }
          },
          0
        )
        .to(line, { scaleX: 1, duration: 0.35, ease: "power3.inOut" }, 0.08)
        .to(root, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.4,
          ease: "power3.inOut"
        })
        .set(root, { display: "none" });

      const safety = window.setTimeout(() => {
        mark();
        setPreloaderDone(true);
        gsap.set(root, { display: "none" });
      }, 1600);

      return () => {
        window.clearTimeout(safety);
        tl.kill();
      };
    },
    { dependencies: [ready, seen, reducedMotion, mark, setPreloaderDone] }
  );

  return (
    <div
      ref={rootRef}
      className="preloader-clip fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian text-warm-ivory"
      role="status"
      aria-live="polite"
      aria-label="Loading Builder Bricks"
    >
      <div className="absolute inset-0 architectural-grid opacity-40" aria-hidden />
      <div
        ref={bricksRef}
        className="mb-10 grid grid-cols-3 gap-1.5"
        aria-hidden
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="preloader-brick h-3 w-8 bg-brick"
            style={{
              opacity: index === 4 ? 0.45 : 1,
              background:
                index % 3 === 1
                  ? "var(--color-sage)"
                  : index % 2 === 0
                    ? "var(--color-brick)"
                    : "var(--color-concrete)"
            }}
          />
        ))}
      </div>
      <p
        ref={brandRef}
        className="font-display text-2xl tracking-[0.18em] uppercase md:text-3xl"
      >
        Builder Bricks
      </p>
      <div className="mt-8 flex items-baseline gap-2">
        <span ref={counterRef} className="font-display text-5xl tabular-nums">
          00
        </span>
        <span className="label-caps">Loading</span>
      </div>
      <div
        ref={lineRef}
        className="absolute bottom-[22%] h-px w-[min(70vw,36rem)] origin-left scale-x-0 bg-brick"
        aria-hidden
      />
    </div>
  );
}
