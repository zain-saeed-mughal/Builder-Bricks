import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects } from
"@/data/projects";
import {
  breadcrumbJsonLd,
  createMetadata,
  projectJsonLd } from
"@/lib/seo";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { MagneticLink } from "@/components/common/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";





export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return createMetadata({ noIndex: true });

  return createMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
    image: project.coverImage.src
  });
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);

  const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: project.title, path: `/projects/${project.slug}` }];


  return (/*#__PURE__*/
    _jsxs(_Fragment, { children: [/*#__PURE__*/
      _jsx("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify([
          breadcrumbJsonLd(breadcrumbs),
          projectJsonLd(project)]
          )
        } }
      ), /*#__PURE__*/

      _jsxs("article", { children: [/*#__PURE__*/
        _jsxs("header", { className: "theme-dark relative min-h-[70svh] overflow-hidden bg-obsidian pt-[var(--header-height)]", children: [/*#__PURE__*/
          _jsxs("div", { className: "absolute inset-0", children: [/*#__PURE__*/
            _jsx(Image, {
              src: project.coverImage.src,
              alt: project.coverImage.alt,
              fill: true,
              priority: true,
              sizes: "100vw",
              className: "object-cover opacity-60" }
            ), /*#__PURE__*/
            _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/30" })] }
          ), /*#__PURE__*/

          _jsxs("div", { className: "container-site relative flex min-h-[60svh] flex-col justify-end pb-12 pt-16", children: [/*#__PURE__*/
            _jsx("nav", { "aria-label": "Breadcrumb", className: "mb-8", children: /*#__PURE__*/
              _jsx("ol", { className: "label-caps flex flex-wrap items-center gap-2 text-concrete", children:
                breadcrumbs.map((item, index) => /*#__PURE__*/
                _jsxs("li", { className: "flex items-center gap-2", children: [
                  index > 0 ? /*#__PURE__*/_jsx("span", { "aria-hidden": true, children: "/" }) : null,
                  index === breadcrumbs.length - 1 ? /*#__PURE__*/
                  _jsx("span", { "aria-current": "page", className: "text-warm-ivory", children:
                    item.name }
                  ) : /*#__PURE__*/

                  _jsx(Link, { href: item.path, className: "hover:text-brick", children:
                    item.name }
                  )] }, item.path

                )
                ) }
              ) }
            ), /*#__PURE__*/

            _jsxs("p", { className: "label-caps mb-4 text-brick", children: [
              project.category, " · ", project.city] }
            ), /*#__PURE__*/
            _jsx(TextReveal, {
              as: "h1",
              type: "lines",
              className: "font-display display-lg max-w-4xl text-warm-ivory", children:

              project.title }
            ), /*#__PURE__*/
            _jsx("p", { className: "mt-6 max-w-2xl text-lg text-concrete", children:
              project.shortDescription }
            ), /*#__PURE__*/

            _jsxs("dl", { className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [/*#__PURE__*/
              _jsx(MetaFact, { label: "Status", value: project.status }), /*#__PURE__*/
              _jsx(MetaFact, { label: "Year", value: String(project.year) }), /*#__PURE__*/
              _jsx(MetaFact, { label: "Area", value: project.area }), /*#__PURE__*/
              _jsx(MetaFact, { label: "Client", value: project.client })] }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsx("section", { className: "theme-light section-pad", children: /*#__PURE__*/
          _jsxs("div", { className: "container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]", children: [/*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("h2", { className: "label-caps mb-4 text-brick", children: "Overview" }), /*#__PURE__*/
              _jsx("p", { className: "text-lg text-pretty text-obsidian/80", children:
                project.overview }
              )] }
            ), /*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("h2", { className: "label-caps mb-4 text-brick", children: "Design concept" }), /*#__PURE__*/
              _jsx("p", { className: "text-lg text-pretty text-obsidian/80", children:
                project.designConcept }
              )] }
            )] }
          ) }
        ), /*#__PURE__*/

        _jsx("section", { className: "theme-dark section-pad", children: /*#__PURE__*/
          _jsxs("div", { className: "container-site", children: [/*#__PURE__*/
            _jsx("h2", { className: "label-caps mb-8", children: "Gallery" }), /*#__PURE__*/
            _jsx(ProjectGallery, { images: project.gallery, title: project.title })] }
          ) }
        ), /*#__PURE__*/

        _jsx("section", { className: "theme-light section-pad", children: /*#__PURE__*/
          _jsxs("div", { className: "container-site grid gap-12 lg:grid-cols-2", children: [/*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("h2", { className: "label-caps mb-6 text-brick", children: "Amenities" }), /*#__PURE__*/
              _jsx("ul", { className: "grid gap-3 sm:grid-cols-2", children:
                project.amenities.map((item) => /*#__PURE__*/
                _jsx("li", {

                  className: "border border-obsidian/10 px-4 py-3 text-obsidian/80", children:

                  item }, item
                )
                ) }
              )] }
            ), /*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("h2", { className: "label-caps mb-6 text-brick", children: "Key facts" }), /*#__PURE__*/
              _jsx("dl", { className: "space-y-4", children:
                project.keyFacts.map((fact) => /*#__PURE__*/
                _jsxs("div", {

                  className: "flex items-baseline justify-between gap-4 border-b border-obsidian/10 pb-4", children: [/*#__PURE__*/

                  _jsx("dt", { className: "label-caps", children: fact.label }), /*#__PURE__*/
                  _jsx("dd", { className: "font-display text-xl text-obsidian", children:
                    fact.value }
                  )] }, fact.label
                )
                ) }
              )] }
            )] }
          ) }
        ), /*#__PURE__*/

        _jsx("section", { className: "theme-dark section-pad", children: /*#__PURE__*/
          _jsx("div", { className: "container-site max-w-4xl text-center", children: /*#__PURE__*/
            _jsxs("blockquote", { className: "font-display text-2xl text-pretty text-warm-ivory md:text-4xl", children: ["“",
              project.quote, "”"] }
            ) }
          ) }
        ), /*#__PURE__*/

        _jsx("section", { className: "theme-light section-pad", children: /*#__PURE__*/
          _jsx("div", { className: "container-site", children: /*#__PURE__*/
            _jsxs("nav", {
              "aria-label": "Adjacent projects",
              className: "grid gap-6 border-t border-obsidian/10 pt-10 md:grid-cols-2", children: [

              previous ? /*#__PURE__*/
              _jsxs(Link, {
                href: `/projects/${previous.slug}`,
                className: "group border border-obsidian/10 p-6 transition-colors hover:border-brick", children: [/*#__PURE__*/

                _jsx("p", { className: "label-caps text-brick", children: "Previous" }), /*#__PURE__*/
                _jsx("p", { className: "font-display mt-2 text-2xl text-obsidian group-hover:text-brick", children:
                  previous.title }
                )] }
              ) : /*#__PURE__*/

              _jsx("div", {}),

              next ? /*#__PURE__*/
              _jsxs(Link, {
                href: `/projects/${next.slug}`,
                className: "group border border-obsidian/10 p-6 text-right transition-colors hover:border-brick md:ml-auto", children: [/*#__PURE__*/

                _jsx("p", { className: "label-caps text-brick", children: "Next" }), /*#__PURE__*/
                _jsx("p", { className: "font-display mt-2 text-2xl text-obsidian group-hover:text-brick", children:
                  next.title }
                )] }
              ) :
              null] }
            ) }
          ) }
        ), /*#__PURE__*/

        _jsx("section", { className: "theme-dark section-pad", children: /*#__PURE__*/
          _jsxs("div", { className: "container-site flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between", children: [/*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("h2", { className: "font-display text-3xl text-warm-ivory md:text-4xl", children: "Interested in a similar project?" }

              ), /*#__PURE__*/
              _jsx("p", { className: "mt-3 max-w-lg text-concrete", children: "Share your site and ambitions — our team will respond with clarity on scope, timeline, and next steps." }


              )] }
            ), /*#__PURE__*/
            _jsx(MagneticLink, { href: "/contact", children: "Start a conversation" })] }
          ) }
        )] }
      )] }
    ));

}

function MetaFact({ label, value }) {
  return (/*#__PURE__*/
    _jsxs("div", { className: "border border-warm-ivory/10 px-4 py-3", children: [/*#__PURE__*/
      _jsx("dt", { className: "label-caps text-concrete", children: label }), /*#__PURE__*/
      _jsx("dd", { className: "mt-1 font-display text-lg text-warm-ivory", children: value })] }
    ));

}