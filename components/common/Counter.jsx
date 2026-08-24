"use client";

import { jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);








export function Counter({ value, suffix = "", decimals = 0, className }) {
  const ref = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reducedMotion) {
        ref.current.textContent = `${value.toFixed(decimals)}${suffix}`;
        return;
      }

      const state = { current: 0 };
      const tween = gsap.to(state, {
        current: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true
        },
        onUpdate: () => {
          if (!ref.current) return;
          ref.current.textContent = `${state.current.toFixed(decimals)}${suffix}`;
        }
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [value, suffix, decimals, reducedMotion] }
  );

  return (/*#__PURE__*/
    _jsxs("span", {
      ref: ref,
      className: cn("font-display tabular-nums", className), children: [
      "0",
      suffix] }
    ));

}