"use client";

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";
import { useCoarsePointer, useMediaQuery } from "@/hooks/use-media";
import { useLowPowerDevice } from "@/hooks/use-performance";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerBridge() {
  const lenis = useLenis();
  const { preloaderDone } = useMotionSettings();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [lenis]);

  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.refresh();
      lenis?.resize();
    };

    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);
    return () => window.removeEventListener("load", refresh);
  }, [lenis]);

  // Preloader removal changes page height — refresh Lenis/ST or hero scroll feels stuck.
  useEffect(() => {
    if (!preloaderDone) return;
    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      lenis?.resize();
    });
    return () => window.cancelAnimationFrame(id);
  }, [preloaderDone, lenis]);

  return null;
}

function NativeScrollRefresh() {
  const { preloaderDone } = useMotionSettings();

  useEffect(() => {
    if (!preloaderDone) return;
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [preloaderDone]);

  return null;
}

export function SmoothScrollProvider({ children }) {
  const { reducedMotion, menuOpen } = useMotionSettings();
  const coarse = useCoarsePointer();
  const isNarrow = useMediaQuery("(max-width: 1023px)");
  const lowPower = useLowPowerDevice();

  // Prefer native scrolling on touch / narrow / low-power for smoother UX
  if (reducedMotion || coarse || isNarrow || lowPower) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(NativeScrollRefresh, {}), children]
    });
  }

  return (/*#__PURE__*/
    _jsxs(ReactLenis, {
      root: true,
      options: {
        autoRaf: false,
        duration: 0.9,
        smoothWheel: !menuOpen,
        touchMultiplier: 1.15,
        // Wheel over full-bleed media (hero video) should still scroll the page.
        syncTouch: false
      }, children: [/*#__PURE__*/

      _jsx(LenisScrollTriggerBridge, {}),
      children] }
    ));

}
