"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Expand } from "lucide-react";

import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/projects/Lightbox";







export function ProjectGallery({ images, title, className }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef(null);

  const openLightbox = useCallback((index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0 && activeIndex < images.length - 1) {
        setActiveIndex((i) => i + 1);
      } else if (delta > 0 && activeIndex > 0) {
        setActiveIndex((i) => i - 1);
      }
    }
    touchStart.current = null;
  };

  if (images.length === 0) return null;

  const hero = images[0];
  const rest = images.slice(1);

  return (/*#__PURE__*/
    _jsxs("section", { className: cn("space-y-4 overflow-x-clip", className), "aria-label": `${title} gallery`, children: [/*#__PURE__*/
      _jsxs("button", {
        type: "button",
        className: "group relative aspect-[16/10] w-full overflow-hidden bg-charcoal",
        onClick: () => openLightbox(0),
        "aria-label": `View full size: ${hero.alt}`, children: [/*#__PURE__*/

        _jsx(Image, {
          src: hero.src,
          alt: hero.alt,
          fill: true,
          sizes: "(max-width: 768px) 92vw, 90vw",
          className: "object-cover transition-transform duration-700 group-hover:scale-[1.03]",
          priority: true }
        ), /*#__PURE__*/
        _jsx("span", { className: "absolute inset-0 bg-obsidian/0 transition-colors group-hover:bg-obsidian/20" }), /*#__PURE__*/
        _jsxs("span", { className: "label-caps absolute bottom-4 right-4 inline-flex min-h-11 items-center gap-2 border border-warm-ivory/30 bg-obsidian/70 px-3 py-2 text-warm-ivory md:bg-obsidian/50 md:backdrop-blur-sm bb-no-blur-mobile", children: [/*#__PURE__*/
          _jsx(Expand, { className: "h-3.5 w-3.5", "aria-hidden": true }), "View"] }

        )] }
      ),

      images.length > 1 ? /*#__PURE__*/
      _jsxs("div", {
        className: "relative aspect-[4/3] overflow-hidden bg-charcoal md:hidden",
        onTouchStart: onTouchStart,
        onTouchEnd: onTouchEnd, children: [/*#__PURE__*/

        _jsx(Image, {
          src: images[activeIndex]?.src ?? hero.src,
          alt: images[activeIndex]?.alt ?? hero.alt,
          fill: true,
          sizes: "(max-width: 768px) 92vw, 640px",
          className: "object-cover" }
        ), /*#__PURE__*/
        _jsx("button", {
          type: "button",
          className: "absolute inset-0 z-0",
          "aria-label": `Open lightbox: ${images[activeIndex]?.alt ?? hero.alt}`,
          onClick: () => openLightbox(activeIndex) }
        ), /*#__PURE__*/
        _jsxs("div", { className: "absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-obsidian/70 to-transparent p-4", children: [/*#__PURE__*/
          _jsx("button", {
            type: "button",
            className: "label-caps touch-target px-2 py-1 text-warm-ivory disabled:opacity-40",
            disabled: activeIndex === 0,
            onClick: (event) => {
              event.stopPropagation();
              setActiveIndex((i) => Math.max(0, i - 1));
            }, children:
            "Prev" }

          ), /*#__PURE__*/
          _jsxs("p", { className: "label-caps text-warm-ivory", children: [
            activeIndex + 1, " / ", images.length] }
          ), /*#__PURE__*/
          _jsx("button", {
            type: "button",
            className: "label-caps touch-target px-2 py-1 text-warm-ivory disabled:opacity-40",
            disabled: activeIndex === images.length - 1,
            onClick: (event) => {
              event.stopPropagation();
              setActiveIndex((i) => Math.min(images.length - 1, i + 1));
            }, children:
            "Next" }

          )] }
        )] }
      ) :
      null, /*#__PURE__*/

      _jsxs("div", { className: "hidden space-y-4 md:block", children: [
        rest.length >= 2 ? /*#__PURE__*/
        _jsx("div", { className: "grid gap-4 md:grid-cols-2", children:
          rest.slice(0, 2).map((image, idx) => /*#__PURE__*/
          _jsx(GalleryTile, {

            image: image,
            index: idx + 1,
            onOpen: openLightbox }, `${image.src}-${idx}`
          )
          ) }
        ) :
        null,

        rest.slice(2).map((image, idx) => /*#__PURE__*/
        _jsx(GalleryTile, {

          image: image,
          index: idx + 3,
          onOpen: openLightbox,
          fullWidth: true }, `${image.src}-${idx + 2}`
        )
        )] }
      ), /*#__PURE__*/

      _jsx(Lightbox, {
        images: images,
        index: activeIndex,
        open: lightboxOpen,
        onClose: () => setLightboxOpen(false),
        onNavigate: setActiveIndex,
        title: title }
      )] }
    ));

}

function GalleryTile({
  image,
  index,
  onOpen,
  fullWidth = false





}) {
  return (/*#__PURE__*/
    _jsxs("button", {
      type: "button",
      className: cn(
        "group relative overflow-hidden bg-charcoal",
        fullWidth ? "aspect-[21/9] w-full" : "aspect-[4/3]"
      ),
      onClick: () => onOpen(index),
      "aria-label": `View full size: ${image.alt}`, children: [/*#__PURE__*/

      _jsx(Image, {
        src: image.src,
        alt: image.alt,
        fill: true,
        sizes:
        fullWidth ?
        "(max-width: 768px) 92vw, 90vw" :
        "(max-width: 768px) 92vw, 45vw",

        className: "object-cover transition-transform duration-700 group-hover:scale-[1.03]" }
      ), /*#__PURE__*/
      _jsx("span", { className: "absolute inset-0 bg-obsidian/0 transition-colors group-hover:bg-obsidian/15" })] }
    ));

}