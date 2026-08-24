"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  useBodyScrollLock,
  useEscapeKey,
  useFocusTrap } from
"@/hooks/use-ui";










export function Lightbox({
  images,
  index,
  open,
  onClose,
  onNavigate,
  title
}) {
  const containerRef = useFocusTrap(open);
  useBodyScrollLock(open);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEscapeKey(handleClose, open);

  const goPrev = useCallback(() => {
    onNavigate(index === 0 ? images.length - 1 : index - 1);
  }, [images.length, index, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate(index === images.length - 1 ? 0 : index + 1);
  }, [images.length, index, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  if (!open) return null;

  const current = images[index];
  if (!current) return null;

  return (/*#__PURE__*/
    _jsx("div", {
      className: "fixed inset-0 z-[120] flex items-center justify-center bg-obsidian/95 p-4 md:p-8",
      role: "presentation",
      onClick: handleClose, children: /*#__PURE__*/

      _jsxs("div", {
        ref: containerRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": `${title} gallery`,
        "aria-describedby": "lightbox-caption",
        className: "relative flex h-full w-full max-w-6xl flex-col",
        onClick: (event) => event.stopPropagation(), children: [/*#__PURE__*/

        _jsxs("div", { className: "mb-4 flex items-center justify-between gap-4", children: [/*#__PURE__*/
          _jsxs("p", { id: "lightbox-caption", className: "label-caps text-warm-ivory", children: [
            current.alt, " — ", index + 1, " / ", images.length] }
          ), /*#__PURE__*/
          _jsxs("button", {
            type: "button",
            onClick: handleClose,
            className: "label-caps inline-flex touch-target items-center gap-2 border border-warm-ivory/25 px-3 py-2 text-warm-ivory transition-colors hover:border-brick hover:text-brick", children: [/*#__PURE__*/

            _jsx(X, { className: "h-4 w-4", "aria-hidden": true }), "Close"] }

          )] }
        ), /*#__PURE__*/

        _jsx("div", { className: "relative min-h-0 flex-1 overflow-hidden bg-charcoal", children: /*#__PURE__*/
          _jsx(Image, {
            src: current.src,
            alt: current.alt,
            fill: true,
            sizes: "(max-width: 768px) 100vw, 80vw",
            className: "object-contain",
            priority: true }
          ) }
        ),

        images.length > 1 ? /*#__PURE__*/
        _jsxs("div", { className: "mt-4 flex items-center justify-between gap-4", children: [/*#__PURE__*/
          _jsxs("button", {
            type: "button",
            onClick: goPrev,
            className: cn(
              "label-caps inline-flex touch-target items-center gap-2 border border-warm-ivory/25 px-4 py-2 text-warm-ivory transition-colors hover:border-brick hover:text-brick"
            ),
            "aria-label": "Previous image", children: [/*#__PURE__*/

            _jsx(ChevronLeft, { className: "h-4 w-4", "aria-hidden": true }), "Prev"] }

          ), /*#__PURE__*/
          _jsxs("button", {
            type: "button",
            onClick: goNext,
            className: "label-caps inline-flex touch-target items-center gap-2 border border-warm-ivory/25 px-4 py-2 text-warm-ivory transition-colors hover:border-brick hover:text-brick",
            "aria-label": "Next image", children: [
            "Next", /*#__PURE__*/

            _jsx(ChevronRight, { className: "h-4 w-4", "aria-hidden": true })] }
          )] }
        ) :
        null] }
      ) }
    ));

}