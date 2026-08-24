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
| Backend API | **Node.js + Express** (`server/index.js`) |
| Styling | Tailwind CSS v4 |
| Motion | GSAP, `@gsap/react`, ScrollTrigger |
| Smooth scroll | Lenis |
| 3D | Three.js, `@react-three/fiber`, `@react-three/drei` |
| Forms | React Hook Form, Zod, `@hookform/resolvers` |
| Icons | Lucide React |

## Getting started

```bash
npm install
npm run dev
```

This starts:
- Next.js UI on **http://localhost:3000**
- Express API on **http://localhost:4000**

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
npx tsc --noEmit
npm run build
```

## Folder structure

```text
app/                    # Routes, layout, SEO, API
components/
  animations/           # TextReveal, ImageReveal
  common/               # Buttons, headings, counters
  forms/                # ContactForm
  layout/               # Header, footer, preloader, cursor
  projects/             # Cards, filters, gallery, lightbox
  providers/            # Lenis, motion, transitions
  sections/             # Homepage sections
  services/             # Services page client UI
  three/                # Hero R3F scene
data/                   # Central typed content
hooks/                  # Media / UI hooks
lib/                    # Utils, SEO, validation
types/                  # Shared TypeScript types
public/images/          # Static assets / OG image
.cursor/rules/          # Persistent agent rules
```

## Replacing project data

All sample company content lives under `data/`:

| File | Contents |
| --- | --- |
| `data/site.ts` | Brand, CTAs, navigation, contact, process, philosophy |
| `data/projects.ts` | Projects, galleries, filters helpers |
| `data/services.ts` | Service offerings |
| `data/content.ts` | Testimonials, stats, team, timeline |
| `data/testimonials.ts` | Re-exports content collections |

Search for `SAMPLE` / `Replace` comments before launch. Update `siteConfig.url`, email, phone, and address first.

## Replacing images

1. Add production images under `public/images/projects/{slug}/`.
2. Update `coverImage` and `gallery` entries in `data/projects.ts`.
3. Keep accurate `width` / `height` and descriptive `alt` text.
4. Remote Unsplash placeholders are allowed via `next.config.ts` `images.remotePatterns` — remove when fully local.

## Connecting the contact form

1. Client: `components/forms/ContactForm.tsx` posts to `/api/contact`.
2. Server: `app/api/contact/route.ts` validates with `contactFormSchema`.
3. At the marked integration point, connect Resend, SendGrid, SES, or a CRM webhook.
4. Store API keys in environment variables only — never in frontend code.

Example env (server-only):

```bash
CONTACT_TO_EMAIL=hello@yourdomain.com
RESEND_API_KEY=re_xxx
```

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
2. Deploy to Vercel, Netlify, or any Node host supporting Next.js.
3. Configure env vars for contact delivery.
4. Verify `/sitemap.xml` and `/robots.txt`.
5. Run Lighthouse on mobile and desktop after deploy.

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
