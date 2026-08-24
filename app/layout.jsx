import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { Syne, Manrope } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { createMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  preload: false
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  // First paint is often the Syne preloader — avoid unused Manrope preload warnings.
  preload: false,
  adjustFontFallback: true
});

export const metadata = createMetadata();

export default function RootLayout({
  children


}) {
  return (/*#__PURE__*/
    _jsx("html", { lang: "en", className: `${syne.variable} ${manrope.variable}`, children: /*#__PURE__*/
      _jsxs("body", { className: `${manrope.className} antialiased`, children: [/*#__PURE__*/
        _jsx("a", {
          href: "#main-content",
          className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:border focus:border-brick focus:bg-obsidian focus:px-4 focus:py-2 focus:text-warm-ivory", children:
          "Skip to main content" }

        ), /*#__PURE__*/
        _jsx("script", {
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify(organizationJsonLd())
          } }
        ), /*#__PURE__*/
        _jsx(AppProviders, { children: /*#__PURE__*/
          _jsx("main", { id: "main-content", children: children }) }
        )] }
      ) }
    ));

}