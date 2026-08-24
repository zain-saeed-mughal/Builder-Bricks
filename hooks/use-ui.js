"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

export function useFocusTrap(active) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement;

    const focusable = () =>
    Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    const first = focusable()[0];
    first?.focus();

    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [active]);

  return containerRef;
}

export function useEscapeKey(handler, active = true) {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handler, active]);
}

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

function subscribeSessionFlag(key, onStoreChange) {
  const onStorage = (event) => {
    if (event.key === key) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function readSessionFlag(key) {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function useSessionFlag(key) {
  const value = useSyncExternalStore(
    (onStoreChange) => subscribeSessionFlag(key, onStoreChange),
    () => readSessionFlag(key),
    () => false
  );

  const mark = useCallback(() => {
    try {
      sessionStorage.setItem(key, "1");
      window.dispatchEvent(new StorageEvent("storage", { key }));
    } catch {

      // ignore storage failures
    }}, [key]);

  return { value, ready: true, mark };
}