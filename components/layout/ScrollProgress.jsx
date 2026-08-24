"use client";

import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useEffect(() => {
    if (!barRef.current || reducedMotion) return;

    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  return (/*#__PURE__*/
    _jsx("div", {
      className: "pointer-events-none fixed top-0 right-0 left-0 z-[80] h-[2px] bg-transparent",
      "aria-hidden": true, children: /*#__PURE__*/

      _jsx("div", {
        ref: barRef,
        className: "h-full origin-left scale-x-0 bg-brick" }
      ) }
    ));

}