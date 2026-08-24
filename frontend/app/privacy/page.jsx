import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
  "Builder Bricks privacy policy — a cookie-free, privacy-friendly approach to handling your information.",
  path: "/privacy"
});

export default function PrivacyPage() {
  const lastUpdated = "July 27, 2026";

  return (/*#__PURE__*/
    _jsx("article", { className: "theme-light section-pad pt-[calc(var(--header-height)+2rem)]", children: /*#__PURE__*/
      _jsxs("div", { className: "container-site max-w-3xl", children: [/*#__PURE__*/
        _jsx("p", { className: "label-caps mb-4 text-brick", children: "Legal" }), /*#__PURE__*/
        _jsx("h1", { className: "font-display display-md text-obsidian", children: "Privacy Policy" }), /*#__PURE__*/
        _jsxs("p", { className: "mt-4 text-sm text-obsidian/60", children: ["Last updated: ",
          lastUpdated, " ·", " ", /*#__PURE__*/
          _jsx("strong", { children: "Sample legal text" }), " — have qualified counsel review before production use."] }

        ), /*#__PURE__*/

        _jsxs("div", { className: "prose-spacing mt-12 space-y-8 text-obsidian/80", children: [/*#__PURE__*/
          _jsxs("section", { children: [/*#__PURE__*/
            _jsx("h2", { className: "font-display text-2xl text-obsidian", children: "Overview" }

            ), /*#__PURE__*/
            _jsxs("p", { className: "mt-4 text-pretty", children: [
              siteConfig.legalName, " (“Builder Bricks,” “we,” “us”) respects your privacy. This policy describes how we collect, use, and protect personal information submitted through this website."] }



            )] }
          ), /*#__PURE__*/

          _jsxs("section", { children: [/*#__PURE__*/
            _jsx("h2", { className: "font-display text-2xl text-obsidian", children: "Cookie-free browsing" }

            ), /*#__PURE__*/
            _jsx("p", { className: "mt-4 text-pretty", children: "This site is designed without advertising or analytics cookies. We do not use third-party tracking pixels or behavioral profiling on this website. Essential session storage may be used locally in your browser for UI preferences (for example, skipping the preloader during a visit)." }





            )] }
          ), /*#__PURE__*/

          _jsxs("section", { children: [/*#__PURE__*/
            _jsx("h2", { className: "font-display text-2xl text-obsidian", children: "Information we collect" }

            ), /*#__PURE__*/
            _jsx("p", { className: "mt-4 text-pretty", children: "When you submit our contact form, we collect the details you provide—such as your name, email, phone number, company, project type, budget, preferred location, and message—solely to respond to your inquiry." }




            )] }
          ), /*#__PURE__*/

          _jsxs("section", { children: [/*#__PURE__*/
            _jsx("h2", { className: "font-display text-2xl text-obsidian", children: "How we use information" }

            ), /*#__PURE__*/
            _jsxs("ul", { className: "mt-4 list-disc space-y-2 pl-5", children: [/*#__PURE__*/
              _jsx("li", { children: "To respond to project inquiries and schedule conversations" }), /*#__PURE__*/
              _jsx("li", { children: "To evaluate whether our services match your needs" }), /*#__PURE__*/
              _jsx("li", { children: "To maintain records of business correspondence" })] }
            ), /*#__PURE__*/
            _jsx("p", { className: "mt-4 text-pretty", children: "We do not sell your personal information to third parties." }

            )] }
          ), /*#__PURE__*/

          _jsxs("section", { children: [/*#__PURE__*/
            _jsx("h2", { className: "font-display text-2xl text-obsidian", children: "Data retention" }

            ), /*#__PURE__*/
            _jsxs("p", { className: "mt-4 text-pretty", children: ["We retain contact submissions only as long as needed to respond, manage the relationship, or meet legal obligations. You may request deletion of your information by emailing",


              " ", /*#__PURE__*/
              _jsx("a", {
                href: `mailto:${siteConfig.email}`,
                className: "underline hover:text-brick", children:

                siteConfig.email }
              ), "."] }

            )] }
          ), /*#__PURE__*/

          _jsxs("section", { children: [/*#__PURE__*/
            _jsx("h2", { className: "font-display text-2xl text-obsidian", children: "Security" }), /*#__PURE__*/
            _jsx("p", { className: "mt-4 text-pretty", children: "We apply reasonable technical and organizational measures to protect submitted information. No method of transmission over the internet is completely secure; please share sensitive details through appropriate channels when needed." }




            )] }
          ), /*#__PURE__*/

          _jsxs("section", { children: [/*#__PURE__*/
            _jsx("h2", { className: "font-display text-2xl text-obsidian", children: "Your rights" }

            ), /*#__PURE__*/
            _jsx("p", { className: "mt-4 text-pretty", children: "Depending on your jurisdiction, you may have rights to access, correct, or delete personal data we hold about you. Contact us to exercise these rights." }



            )] }
          ), /*#__PURE__*/

          _jsxs("section", { children: [/*#__PURE__*/
            _jsx("h2", { className: "font-display text-2xl text-obsidian", children: "Contact" }), /*#__PURE__*/
            _jsxs("p", { className: "mt-4 text-pretty", children: ["Questions about this policy? Email",
              " ", /*#__PURE__*/
              _jsx("a", {
                href: `mailto:${siteConfig.email}`,
                className: "underline hover:text-brick", children:

                siteConfig.email }
              ), " ", "or write to us at ",
              siteConfig.address.line1, ",", " ",
              siteConfig.address.line2, ", ", siteConfig.address.city, "."] }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsxs("p", { className: "mt-12 border-t border-obsidian/10 pt-8 text-sm text-obsidian/60", children: ["Return to",
          " ", /*#__PURE__*/
          _jsx(Link, { href: "/", className: "underline hover:text-brick", children: "home" }

          ), " ", "or",
          " ", /*#__PURE__*/
          _jsx(Link, { href: "/contact", className: "underline hover:text-brick", children: "contact" }

          ), "."] }

        )] }
      ) }
    ));

}