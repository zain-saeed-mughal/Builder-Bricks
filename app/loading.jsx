import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Loading() {
  return (/*#__PURE__*/
    _jsx("div", {
      className: "theme-dark flex min-h-[60svh] items-center justify-center bg-obsidian",
      role: "status",
      "aria-live": "polite",
      "aria-label": "Loading page", children: /*#__PURE__*/

      _jsxs("div", { className: "text-center", children: [/*#__PURE__*/
        _jsx("div", {
          className: "mx-auto mb-8 grid grid-cols-3 gap-1.5",
          "aria-hidden": true, children:

          Array.from({ length: 9 }).map((_, index) => /*#__PURE__*/
          _jsx("div", {

            className: "h-3 w-8 animate-pulse",
            style: {
              background:
              index % 3 === 1 ?
              "var(--color-sage)" :
              index % 2 === 0 ?
              "var(--color-brick)" :
              "var(--color-concrete)",
              animationDelay: `${index * 80}ms`
            } }, index
          )
          ) }
        ), /*#__PURE__*/
        _jsx("p", { className: "font-display text-xl tracking-[0.14em] uppercase text-warm-ivory md:text-2xl", children: "Builder Bricks" }

        ), /*#__PURE__*/
        _jsx("p", { className: "label-caps mt-4 text-concrete", children: "Loading" })] }
      ) }
    ));

}