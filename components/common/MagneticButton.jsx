"use client";

import { jsx as _jsx } from "react/jsx-runtime";
import {
  useCallback,
  useRef } from


"react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePrefersFinePointer, useReducedMotion } from "@/hooks/use-media";







const variants = {
  primary:
  "bg-brick text-muted-white border border-brick hover:bg-transparent hover:text-brick",
  secondary:
  "bg-transparent text-current border border-current/35 hover:border-brick hover:text-brick",
  ghost: "bg-transparent text-current border border-transparent hover:text-brick"
};

const baseClass =
"label-caps inline-flex touch-target items-center justify-center px-5 py-3 transition-[transform,color,background,border-color] duration-300";

export function MagneticButton({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}) {
  const ref = useRef(null);
  const fine = usePrefersFinePointer();
  const reduced = useReducedMotion();

  const onPointerMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!fine || reduced || !node) return;
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    },
    [fine, reduced]
  );

  const onPointerLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }, []);

  return (/*#__PURE__*/
    _jsx("button", {
      ref: ref,
      type: type,
      onPointerMove: onPointerMove,
      onPointerLeave: onPointerLeave,
      className: cn(baseClass, variants[variant], className), ...
      props, children:

      children }
    ));

}

export function MagneticLink({
  href,
  children,
  className,
  variant = "primary"
}) {
  const ref = useRef(null);
  const fine = usePrefersFinePointer();
  const reduced = useReducedMotion();

  const onPointerMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!fine || reduced || !node) return;
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    },
    [fine, reduced]
  );

  const onPointerLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }, []);

  return (/*#__PURE__*/
    _jsx(Link, {
      href: href,
      ref: ref,
      onPointerMove: onPointerMove,
      onPointerLeave: onPointerLeave,
      className: cn(baseClass, variants[variant], className), children:

      children }
    ));

}