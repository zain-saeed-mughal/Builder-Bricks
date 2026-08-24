"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navigation, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { AnimatedLink } from "@/components/common/AnimatedLink";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overLight, setOverLight] = useState(false);

  const primaryNav = useMemo(
    () => navigation.filter((item) => item.href !== "/contact"),
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Lenis/root scroll sometimes updates via transform path — also poll rAF lightly on first paint.
    const id = window.requestAnimationFrame(onScroll);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const sections = Array.from(
        document.querySelectorAll("[data-header-theme]")
      );
      const probe = 72;
      let theme = "dark";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom >= probe) {
          theme = section.dataset.headerTheme === "light" ? "light" : "dark";
          break;
        }
      }
      setOverLight(theme === "light");
    };

    update();
    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,color,backdrop-filter] duration-300",
        scrolled
          ? "bb-mobile-solid-header bg-obsidian/92 md:bg-obsidian/75 md:backdrop-blur-md"
          : "bg-transparent",
        overLight && !scrolled ? "text-obsidian" : "text-warm-ivory",
        overLight &&
          scrolled &&
          "bb-mobile-solid-header bg-warm-ivory/95 text-obsidian md:bg-warm-ivory/80 md:backdrop-blur-md"
      )}
    >
      <div className="container-site bb-safe-top flex h-[var(--header-height)] items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3 touch-target"
          aria-label="Builder Bricks home"
        >
          <span className="grid grid-cols-2 gap-0.5" aria-hidden>
            <span className="h-2 w-3 bg-brick transition-transform group-hover:translate-x-0.5" />
            <span className="h-2 w-3 bg-sage" />
            <span className="h-2 w-3 bg-concrete" />
            <span className="h-2 w-3 bg-brick/70" />
          </span>
          <span className="font-display text-sm tracking-[0.2em] uppercase md:text-base">
            {siteConfig.name}
          </span>
        </Link>

        <nav
          className="no-scrollbar flex min-w-0 flex-1 items-center justify-end gap-4 overflow-x-auto px-2 sm:gap-6 lg:justify-center lg:gap-8"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <AnimatedLink
              key={item.href}
              href={item.href}
              className="shrink-0 text-xs sm:text-sm"
            >
              {item.label}
            </AnimatedLink>
          ))}
        </nav>

        <Link
          href="/contact"
          className="label-caps inline-flex shrink-0 touch-target items-center border border-current/30 px-3 py-2 transition-colors hover:border-brick hover:text-brick sm:px-4"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}
