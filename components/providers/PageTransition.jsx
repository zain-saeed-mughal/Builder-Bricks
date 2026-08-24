"use client";

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function PageTransition({ children }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const { reducedMotion, setMenuOpen } = useMotionSettings();
  const lenis = useLenis();

  useEffect(() => {
    setMenuOpen(false);
    lenis?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();

    if (reducedMotion || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const tl = gsap.timeline();
    tl.set(overlay, { scaleY: 1, transformOrigin: "top" }).
    to(overlay, {
      scaleY: 0,
      duration: 0.7,
      ease: "power4.inOut",
      transformOrigin: "bottom"
    });

    return () => {
      tl.kill();
    };
  }, [pathname, reducedMotion, setMenuOpen, lenis]);

  return (/*#__PURE__*/
    _jsxs(_Fragment, { children: [/*#__PURE__*/
      _jsx("div", {
        ref: overlayRef,
        className: "page-transition-overlay",
        "aria-hidden": "true" }
      ),
      children] }
    ));

}