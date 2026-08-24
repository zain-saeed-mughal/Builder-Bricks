"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedProjects } from "@/data/projects";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";
import { formatProjectNumber } from "@/lib/utils";


gsap.registerPlugin(ScrollTrigger);

const featured = getFeaturedProjects().slice(0, 6);

function FeaturedProjectSlide({
  project,
  index,
  onActive,
  compact





}) {
  const imageRef = useRef(null);

  const handlePointerMove = useCallback(
    (event) => {
      if (!imageRef.current) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      imageRef.current.style.transform = `scale(1.08) translate(${x * -18}px, ${y * -12}px)`;
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "scale(1.05) translate(0px, 0px)";
  }, []);

  if (compact) {
    return (/*#__PURE__*/
      _jsx("article", {
        className: "group relative w-full",
        onPointerEnter: () => onActive?.(index),
        onFocus: () => onActive?.(index), children: /*#__PURE__*/

        _jsxs(Link, {
          href: `/projects/${project.slug}`,
          className: "block",
          "data-cursor": "hover",
          onPointerMove: handlePointerMove,
          onPointerLeave: handlePointerLeave, children: [/*#__PURE__*/

          _jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-charcoal", children: [/*#__PURE__*/
            _jsx("div", {
              ref: imageRef,
              className: "absolute inset-[-8%] transition-transform duration-500 ease-out",
              style: { transform: "scale(1.05)" }, children: /*#__PURE__*/

              _jsx(Image, {
                src: project.coverImage.src,
                alt: project.coverImage.alt,
                fill: true,
                sizes: "(max-width: 1024px) 92vw, 640px",
                quality: 65,
                className: "object-cover" }
              ) }
            ), /*#__PURE__*/
            _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/15 to-transparent" })] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "mt-5 flex items-end justify-between gap-4 border-b border-current/10 pb-5", children: [/*#__PURE__*/
            _jsxs("div", { className: "min-w-0 flex-1", children: [/*#__PURE__*/
              _jsxs("p", { className: "label-caps mb-2 text-concrete", children: [
                project.category, " · ", project.city] }
              ), /*#__PURE__*/
              _jsx("h3", { className: "font-display text-2xl text-warm-ivory sm:text-3xl", children:
                project.title }
              )] }
            ), /*#__PURE__*/
            _jsx("span", { className: "label-caps shrink-0 text-brick", children: "View" })] }
          )] }
        ) }
      ));

  }

  return (/*#__PURE__*/
    _jsx("article", {
      className: "group relative flex h-full w-[min(42vw,420px)] max-w-[420px] shrink-0 flex-col",
      onPointerEnter: () => onActive?.(index),
      onFocus: () => onActive?.(index), children: /*#__PURE__*/

      _jsxs(Link, {
        href: `/projects/${project.slug}`,
        className: "flex h-full min-h-0 flex-col",
        "data-cursor": "hover",
        onPointerMove: handlePointerMove,
        onPointerLeave: handlePointerLeave, children: [/*#__PURE__*/

        _jsxs("div", { className: "relative min-h-0 w-full flex-1 overflow-hidden bg-charcoal", children: [/*#__PURE__*/
          _jsx("div", {
            ref: imageRef,
            className: "absolute inset-[-6%] transition-transform duration-500 ease-out",
            style: { transform: "scale(1.05)" }, children: /*#__PURE__*/

            _jsx(Image, {
              src: project.coverImage.src,
              alt: project.coverImage.alt,
              fill: true,
              sizes: "420px",
              quality: 65,
              className: "object-cover" }
            ) }
          ), /*#__PURE__*/
          _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/15 to-transparent" })] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "mt-4 flex shrink-0 items-end justify-between gap-4 border-b border-current/10 pb-4", children: [/*#__PURE__*/
          _jsxs("div", { className: "min-w-0 flex-1", children: [/*#__PURE__*/
            _jsxs("p", { className: "label-caps mb-2 text-concrete", children: [
              project.category, " · ", project.city] }
            ), /*#__PURE__*/
            _jsxs("h3", { className: "font-display relative h-[1.15em] overflow-hidden text-2xl text-warm-ivory xl:text-3xl", children: [/*#__PURE__*/
              _jsx("span", { className: "block transition-transform duration-700 ease-out group-hover:-translate-y-full", children:
                project.title }
              ), /*#__PURE__*/
              _jsx("span", {
                className: "absolute inset-x-0 top-0 block translate-y-full text-brick transition-transform duration-700 ease-out group-hover:translate-y-0",
                "aria-hidden": true, children:

                project.title }
              )] }
            )] }
          ), /*#__PURE__*/
          _jsx("span", { className: "label-caps shrink-0 text-brick", children: "View" })] }
        )] }
      ) }
    ));

}

export function FeaturedProjects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const { reducedMotion } = useMotionSettings();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !trackRef.current) return;

      const section = sectionRef.current;
      const track = trackRef.current;

      const getScrollDistance = () =>
      Math.max(track.scrollWidth - window.innerWidth, 1);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const index = Math.min(
                featured.length - 1,
                Math.round(self.progress * (featured.length - 1))
              );
              // DOM-only — avoid React re-renders every scrub tick.
              if (progressRef.current) {
                progressRef.current.textContent = formatProjectNumber(
                  index,
                  featured.length
                );
              }
            }
          }
        });

        const refresh = () => ScrollTrigger.refresh();
        const images = section.querySelectorAll("img");
        images.forEach((img) => {
          if (!img.complete) {
            img.addEventListener("load", refresh, { once: true });
          }
        });
        requestAnimationFrame(refresh);

        return () => {
          images.forEach((img) => img.removeEventListener("load", refresh));
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  return (/*#__PURE__*/
    _jsxs("section", {
      ref: sectionRef,
      className: "theme-dark relative overflow-x-clip",
      "data-header-theme": "dark", children: [/*#__PURE__*/


      _jsxs("div", { className: "section-pad lg:hidden", children: [/*#__PURE__*/
        _jsx("div", { className: "container-site mb-10", children: /*#__PURE__*/
          _jsx(SectionHeading, {
            eyebrow: "Selected Work",
            title: "Featured Projects",
            description: "A curated sequence of developments where material, light, and daily life align." }
          ) }
        ), /*#__PURE__*/
        _jsx("div", { className: "container-site grid gap-10", children:
          featured.map((project, index) => /*#__PURE__*/
          _jsx(FeaturedProjectSlide, {

            project: project,
            index: index,
            compact: true }, `m-${project.slug}`
          )
          ) }
        )] }
      ), /*#__PURE__*/





      _jsxs("div", { className: "hidden h-[100svh] flex-col lg:flex", children: [/*#__PURE__*/
        _jsxs("div", { className: "container-site flex shrink-0 items-end justify-between gap-6 pb-6 pt-[calc(var(--header-height)+1.25rem)]", children: [/*#__PURE__*/
          _jsx(SectionHeading, {
            eyebrow: "Selected Work",
            title: "Featured Projects",
            description: "A curated sequence of developments where material, light, and daily life align.",
            className: "mb-0 [&_.display-md]:text-[clamp(2rem,4vw,3rem)]" }
          ), /*#__PURE__*/
          _jsxs("p", { className: "label-caps shrink-0 pb-1 text-concrete", children: ["Progress",
            " ", /*#__PURE__*/
            _jsx("span", { ref: progressRef, children:
              formatProjectNumber(0, featured.length) }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsx("div", { className: "relative min-h-0 flex-1 overflow-hidden pb-8", children: /*#__PURE__*/
          _jsx("div", {
            ref: trackRef,
            className: "flex h-full items-stretch gap-8 px-[max(1rem,calc((100%-min(100%,var(--content-max)))/2))] xl:gap-10", children:

            featured.map((project, index) => /*#__PURE__*/
            _jsx(FeaturedProjectSlide, {

              project: project,
              index: index }, `d-${project.slug}`
            )
            ) }
          ) }
        )] }
      )] }
    ));

}