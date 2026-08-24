"use client";

import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { usePrefersFinePointer } from "@/hooks/use-media";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

/**
 * Custom cursor mounts as always-null on the server and on the first client
 * paint (refs exist only after an effect enables the pointer). Nodes are
 * rendered only when fine-pointer desktop is confirmed in an effect to avoid
 * hydration divergence.
 */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const enabled = usePrefersFinePointer();
  const { reducedMotion } = useMotionSettings();
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const shouldEnable = enabled && !reducedMotion;

    if (!shouldEnable) {
      document.documentElement.classList.remove("has-custom-cursor");
      host.replaceChildren();
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const dot = document.createElement("div");
    dot.className =
    "pointer-events-none fixed top-0 left-0 z-[120] h-1.5 w-1.5 rounded-full bg-brick";
    dot.setAttribute("aria-hidden", "true");

    const ring = document.createElement("div");
    ring.className =
    "pointer-events-none fixed top-0 left-0 z-[120] h-10 w-10 rounded-full border border-warm-ivory/70";
    ring.setAttribute("aria-hidden", "true");

    host.replaceChildren(dot, ring);
    dotRef.current = dot;
    ringRef.current = ring;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let hovering = false;
    let raf = 0;

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
    };

    const onOver = (event) => {
      const target = event.target;
      hovering = Boolean(
        target?.closest(
          "a, button, [data-cursor='hover'], input, textarea, select"
        )
      );
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hovering ? 1.65 : 1})`;
      ring.style.opacity = hovering ? "0.35" : "0.7";
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
      host.replaceChildren();
      dotRef.current = null;
      ringRef.current = null;
    };
  }, [enabled, reducedMotion]);

  return /*#__PURE__*/_jsx("div", { ref: hostRef, className: "contents", "aria-hidden": true });
}