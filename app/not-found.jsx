import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { MagneticLink } from "@/components/common/MagneticButton";

export default function NotFound() {
  return (/*#__PURE__*/
    _jsxs("section", { className: "theme-dark relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-obsidian pt-[var(--header-height)]", children: [/*#__PURE__*/
      _jsx("div", { className: "absolute inset-0 architectural-grid opacity-25", "aria-hidden": true }), /*#__PURE__*/
      _jsxs("div", { className: "container-site relative text-center", children: [/*#__PURE__*/
        _jsx("p", { className: "label-caps mb-4 text-brick", children: "404" }), /*#__PURE__*/
        _jsx("h1", { className: "font-display display-lg text-warm-ivory", children: "Page not found" }

        ), /*#__PURE__*/
        _jsx("p", { className: "mx-auto mt-6 max-w-md text-pretty text-concrete", children: "The page you are looking for may have moved, or the link may be incorrect. Let's get you back on track." }


        ), /*#__PURE__*/
        _jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-4", children: [/*#__PURE__*/
          _jsx(MagneticLink, { href: "/", children: "Return home" }), /*#__PURE__*/
          _jsx(Link, {
            href: "/projects",
            className: "label-caps inline-flex touch-target items-center border border-warm-ivory/30 px-5 py-3 transition-colors hover:border-brick hover:text-brick", children:
            "Browse projects" }

          )] }
        ), /*#__PURE__*/
        _jsx("p", { className: "label-caps mt-16 text-concrete", children: "Builder Bricks — Architecture · Development · Delivery" }

        )] }
      )] }
    ));

}