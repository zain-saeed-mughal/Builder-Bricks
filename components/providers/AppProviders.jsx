"use client";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReducedMotionProvider } from "@/components/providers/ReducedMotionProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PageTransition } from "@/components/providers/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function AppProviders({ children }) {
  return (/*#__PURE__*/
    _jsx(ReducedMotionProvider, { children: /*#__PURE__*/
      _jsxs(SmoothScrollProvider, { children: [/*#__PURE__*/
        _jsx(Preloader, {}), /*#__PURE__*/
        _jsx(CustomCursor, {}), /*#__PURE__*/
        _jsx(ScrollProgress, {}), /*#__PURE__*/
        _jsx(SiteHeader, {}), /*#__PURE__*/
        _jsx(PageTransition, { children: children }), /*#__PURE__*/
        _jsx(SiteFooter, {})] }
      ) }
    ));

}