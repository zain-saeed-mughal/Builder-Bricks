"use client";

import { jsx as _jsx } from "react/jsx-runtime";
import Link from "next/link";

import { cn } from "@/lib/utils";







export function AnimatedLink({ href, children, className, ...props }) {
  return (/*#__PURE__*/
    _jsx(Link, {
      href: href,
      className: cn(
        "label-caps relative inline-flex touch-target items-center after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brick after:transition-transform after:duration-300 hover:after:scale-x-100",
        className
      ), ...
      props, children:

      children }
    ));

}