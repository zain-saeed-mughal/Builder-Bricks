# Builder Bricks

Premium, scroll-driven real-estate and property-development website for **Builder Bricks** — an original architectural experience built with Next.js App Router, GSAP, Lenis, and React Three Fiber.

> **Tagline:** We don’t just build. We shape how you live.

## Overview

Builder Bricks is a production-oriented marketing site for residential and commercial development. It combines editorial layouts, cinematic motion, a procedural 3D brick tower hero, project archives, service storytelling, and a validated contact flow — while remaining responsive, accessible, and performance-conscious.

## Main features

- Cinematic session-aware preloader and page transitions
- Sticky header, fullscreen accessible menu, custom desktop cursor
- Smooth scrolling (Lenis) synchronized with GSAP ScrollTrigger
- Procedural React Three Fiber hero with WebGL fallback
- Pinned horizontal project showcase (vertical alternative on mobile)
- Filterable project exploration and shareable archive URL params
- Dynamic project detail pages with gallery lightbox and JSON-LD
- Services, About, Contact, Privacy, and custom 404
- Contact form with React Hook Form + Zod + API route
- SEO metadata, sitemap, robots, and organization schema

## Technology stack

| Area | Library |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, **JavaScript** |
| Backend API | **Node.js + Express** (`backend/index.js`) |
| Styling | Tailwind CSS v4 |
| Motion | GSAP, `@gsap/react`, ScrollTrigger |
| Smooth scroll | Lenis |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei` |
| Forms | React Hook Form, Zod, `@hookform/resolvers` |
| Icons | Lucide React |

## Getting started

```bash
npm run install:all
npm run dev
```

This starts:
- Next.js UI on **http://localhost:3000** (`frontend/`)
- Express API on **http://localhost:4000** (`backend/`)

Contact form posts to `/api/contact` (proxied to Express).

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm start
```

### Quality checks

```bash
npm run lint
npm run build
```

## Folder structure

```text
frontend/               # Next.js App Router site
  app/                  # Routes, layout, SEO
  components/           # UI, animations, sections, forms
  data/                 # Central company content
  hooks/                # Media / UI hooks
  lib/                  # Utils, SEO, validation
  public/               # Static assets / videos / images
backend/                # Express API (contact, etc.)
.cursor/rules/          # Persistent agent rules
```

## Replacing project data

All sample company content lives under `frontend/data/`:

| File | Contents |
| --- | --- |
| `frontend/data/site.js` | Brand, CTAs, navigation, contact, process, philosophy |
| `frontend/data/projects.js` | Projects, galleries, filters helpers |
| `frontend/data/services.js` | Service offerings |
| `frontend/data/content.js` | Testimonials, stats, team, timeline |

Search for `SAMPLE` / `Replace` comments before launch. Update `siteConfig.url`, email, phone, and address first.

## Replacing images

1. Add production images under `frontend/public/images/projects/{slug}/`.
2. Update `coverImage` and `gallery` entries in `frontend/data/projects.js`.
3. Keep accurate `width` / `height` and descriptive `alt` text.
4. Remote Unsplash placeholders are allowed via `frontend/next.config.mjs` `images.remotePatterns` — remove when fully local.

## Connecting the contact form

1. Client: `frontend/components/forms/ContactForm.jsx` posts to `/api/contact`.
2. Proxy: `frontend/next.config.mjs` rewrites `/api/*` to the origin in `API_ORIGIN`.
3. Server: `backend/index.js` validates with Zod and handles delivery.
4. At the marked integration point, connect Resend, SendGrid, SES, or a CRM webhook.
5. Store API keys in environment variables only — never in frontend code.

Copy `.env.example` and fill it in. Server-only values:

```bash
API_ORIGIN=https://api.your-domain.com
CONTACT_TO_EMAIL=hello@yourdomain.com
RESEND_API_KEY=re_xxx
```

`API_ORIGIN` only falls back to `http://localhost:4000` during local development. If it
is missing in a deployed environment the rewrite is skipped and `/api/contact` returns
404, so set it wherever the site is hosted.

## Animations

- Global motion preferences: `ReducedMotionProvider`
- Scroll / entrance: GSAP + ScrollTrigger via `@gsap/react` (`useGSAP` cleanup)
- Smooth scroll bridge: `SmoothScrollProvider` syncs Lenis ↔ ScrollTrigger
- Homepage pinned / horizontal / parallax sections live in `components/sections/`
- Call `ScrollTrigger.refresh()` after fonts/images load (already handled in the Lenis bridge)

## Disabling or simplifying 3D

- Hero uses `DynamicHeroScene` (`ssr: false`).
- Without WebGL, `WebGLFallback` renders automatically.
- Mobile uses a lighter brick count in `BrickBuilding`.
- To disable 3D entirely, replace `<DynamicHeroScene />` in `HeroSection` with `<WebGLFallback />`.

## Deployment

1. Set `siteConfig.url` to the production domain.
2. Deploy to Vercel, Netlify, or any Node host supporting Next.js. On Vercel set the
   project **Root Directory** to `frontend`.
3. Deploy `backend/` separately and set `API_ORIGIN` to its public URL, plus the env
   vars for contact delivery.
4. Verify `/sitemap.xml` and `/robots.txt`.
5. Run Lighthouse on mobile and desktop after deploy.

The Express API only allows browser origins `localhost:3000` / `127.0.0.1:3000`
(`backend/index.js`). Requests routed through the Next.js rewrite are server-to-server
so CORS does not apply, but widen that list before calling the API directly from a
deployed browser origin.

## Performance notes

- Dynamic import for the Three.js canvas
- Capped device pixel ratio and tab-visibility pause for WebGL
- `next/image` with AVIF/WebP and responsive `sizes`
- Animate `transform` / `opacity`; avoid heavy blurs on mobile
- Instanced meshes for repeated bricks

## Accessibility notes

- Skip-to-content link, semantic landmarks, visible focus styles
- Fullscreen menu and lightbox: focus trap + Escape + focus restore
- Custom cursor disabled on touch / coarse pointers and reduced motion
- Forms expose inline errors with `aria-invalid` / `role="alert"`
- Text reveals keep screen-reader text available

## License / content disclaimer

Sample statistics, testimonials, team profiles, timeline milestones, and legal copy are placeholders for demonstration. Replace with verified company information before production use.
