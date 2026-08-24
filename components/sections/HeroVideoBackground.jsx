"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { useMotionSettings } from "@/components/providers/ReducedMotionProvider";
import { cn } from "@/lib/utils";

/**
 * Full-bleed hero HD loop.
 * Poster mounts after preloader so it isn't link-preloaded then left unused.
 * Video reveals only after the first decoded frame is painting.
 */
export function HeroVideoBackground({ className }) {
  const videoRef = useRef(null);
  const rootRef = useRef(null);
  const { reducedMotion, preloaderDone } = useMotionSettings();
  const media = siteConfig.heroVideo;
  const [ready, setReady] = useState(false);
  const showVideo = !reducedMotion;
  // Avoid fetching poster during preloader (unused-preload console noise).
  const showPoster = preloaderDone || reducedMotion;

  useEffect(() => {
    if (!showVideo || !preloaderDone) return;

    const video = videoRef.current;
    const root = rootRef.current;
    if (!video || !root) return;

    let cancelled = false;
    let usedFallback = false;
    let revealed = false;
    let fallbackTimer = 0;

    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      window.clearTimeout(fallbackTimer);
      setReady(true);
    };

    const revealWhenPainting = () => {
      if (cancelled || revealed) return;

      if (typeof video.requestVideoFrameCallback === "function") {
        video.requestVideoFrameCallback(() => {
          if (!cancelled) reveal();
        });
        return;
      }

      const onTime = () => {
        if (video.currentTime > 0.04) {
          video.removeEventListener("timeupdate", onTime);
          reveal();
        }
      };
      video.addEventListener("timeupdate", onTime);
    };

    const tryPlay = async () => {
      if (cancelled) return;
      try {
        video.defaultMuted = true;
        video.muted = true;
        video.playsInline = true;
        const playPromise = video.play();
        if (playPromise !== undefined) await playPromise;
        revealWhenPainting();
      } catch {
        // Autoplay blocked — poster stays.
      }
    };

    const onError = () => {
      if (cancelled) return;
      if (!usedFallback && media.fallbackSrc) {
        usedFallback = true;
        video.src = media.fallbackSrc;
        video.load();
      }
    };

    const onCanPlayThrough = () => {
      window.clearTimeout(fallbackTimer);
      void tryPlay();
    };

    video.src = media.src;
    video.addEventListener("canplaythrough", onCanPlayThrough, { once: true });
    video.addEventListener("error", onError);
    video.load();

    fallbackTimer = window.setTimeout(() => {
      if (!cancelled && !revealed && video.readyState >= 3) void tryPlay();
    }, 1200);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (cancelled) return;
        if (entry.isIntersecting) {
          if (video.readyState >= 3) void tryPlay();
        } else if (revealed) {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(root);

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      io.disconnect();
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [showVideo, preloaderDone, media.src, media.fallbackSrc]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-obsidian",
        className
      )}
      aria-hidden
    >
      {showPoster ? (
        <img
          src={media.poster}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out",
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          )}
        />
      ) : null}

      {showVideo && preloaderDone ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center",
            "transition-opacity duration-700 ease-out",
            "[transform:translate3d(0,0,0)] [backface-visibility:hidden]",
            ready ? "opacity-100" : "opacity-0"
          )}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 bg-obsidian/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian/88 via-obsidian/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/15 to-obsidian/40"
        aria-hidden
      />
    </div>
  );
}
