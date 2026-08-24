"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { footerNav, siteConfig, socialLinks } from "@/data/site";
import { projects } from "@/data/projects";
import { MagneticButton } from "@/components/common/MagneticButton";
import { useLenis } from "lenis/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";

gsap.registerPlugin(ScrollTrigger);

const newsletterSchema = z.object({
  email: z.email("Enter a valid email.")
});

export function SiteFooter() {
  const lenis = useLenis();
  const year = new Date().getFullYear();
  const [status, setStatus] = useState("idle");
  const marqueeRef = useRef(null);
  const { reducedMotion } = useMotionSettings();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(newsletterSchema)
  });

  useGSAP(
    () => {
      if (!marqueeRef.current || reducedMotion) return;

      const tween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1
      });

      const st = ScrollTrigger.create({
        trigger: marqueeRef.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tween.play(),
        onLeave: () => tween.pause(),
        onEnterBack: () => tween.play(),
        onLeaveBack: () => tween.pause()
      });

      return () => {
        st.kill();
        tween.kill();
      };
    },
    { dependencies: [reducedMotion] }
  );

  const onSubmit = handleSubmit(() => {
    setStatus("success");
    reset();
  });

  return (
    <footer className="relative overflow-hidden border-t border-warm-ivory/10 bg-obsidian text-warm-ivory">
      <div
        className="pointer-events-none absolute inset-x-0 top-8 overflow-hidden whitespace-nowrap font-display text-[clamp(4rem,14vw,11rem)] tracking-[-0.04em] text-warm-ivory/[0.04]"
        aria-hidden
      >
        <div ref={marqueeRef} className="inline-block will-change-transform">
          BUILDER BRICKS — BUILDER BRICKS — BUILDER BRICKS — BUILDER BRICKS —
          BUILDER BRICKS — BUILDER BRICKS —
        </div>
      </div>

      <div className="container-site relative section-pad">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.14em] uppercase">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-md text-pretty text-concrete">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="label-caps hover:text-brick"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="label-caps mb-4">Navigate</p>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brick">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps mb-4">Projects</p>
            <ul className="space-y-3">
              {projects.slice(0, 4).map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-brick"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-warm-ivory/10 pt-10 md:grid-cols-[1fr_1.1fr]">
          <div className="text-sm text-concrete">
            <p className="label-caps mb-3 text-warm-ivory">Office</p>
            <p>
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}, {siteConfig.address.city}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 block hover:text-brick"
            >
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="mt-1 block hover:text-brick"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>

          <form onSubmit={onSubmit} className="max-w-lg" noValidate>
            <label htmlFor="newsletter-email" className="label-caps">
              Newsletter
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className="w-full border border-warm-ivory/20 bg-transparent px-4 py-3 outline-none focus:border-brick"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
              <MagneticButton type="submit" className="shrink-0">
                Subscribe
              </MagneticButton>
            </div>
            {errors.email ? (
              <p className="mt-2 text-sm text-brick" role="alert">
                {errors.email.message}
              </p>
            ) : null}
            {status === "success" ? (
              <p className="mt-2 text-sm text-sage" role="status">
                Thanks — this is a sample capture. Connect your email provider
                in the form handler.
              </p>
            ) : null}
          </form>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-warm-ivory/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-concrete">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="label-caps hover:text-brick">
              Privacy
            </Link>
            <button
              type="button"
              className="label-caps inline-flex touch-target items-center gap-2 hover:text-brick"
              onClick={() => {
                if (lenis) lenis.scrollTo(0, { duration: 1.4 });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back to top
              <ArrowUp className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
