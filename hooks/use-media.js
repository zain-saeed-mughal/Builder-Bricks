"use client";

import { useSyncExternalStore } from "react";

function subscribeReducedMotion(onStoreChange) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
}

function subscribeCoarsePointer(onStoreChange) {
  const media = window.matchMedia("(pointer: coarse)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function useCoarsePointer() {
  return useSyncExternalStore(subscribeCoarsePointer, getCoarsePointer, () => true);
}

export function useMediaQuery(query) {
  const subscribe = (onStoreChange) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onStoreChange);
    return () => media.removeEventListener("change", onStoreChange);
  };
  const getSnapshot = () => window.matchMedia(query).matches;
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useIsMobile(breakpoint = 768) {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

export function useMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
}

export function usePrefersFinePointer() {
  const coarse = useCoarsePointer();
  const isNarrow = useMediaQuery("(max-width: 1023px)");
  return !coarse && !isNarrow;
}