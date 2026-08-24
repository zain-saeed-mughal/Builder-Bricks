"use client";

import { jsx as _jsx } from "react/jsx-runtime";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState } from

"react";
import { useReducedMotion } from "@/hooks/use-media";










const MotionContext = /*#__PURE__*/createContext(null);

export function ReducedMotionProvider({ children }) {
  const reducedMotion = useReducedMotion();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const value = useMemo(
    () => ({
      reducedMotion,
      preloaderDone,
      setPreloaderDone,
      menuOpen,
      setMenuOpen,
      toggleMenu
    }),
    [reducedMotion, preloaderDone, menuOpen, toggleMenu]
  );

  return (/*#__PURE__*/
    _jsx(MotionContext.Provider, { value: value, children: children }));

}

export function useMotionSettings() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotionSettings must be used within ReducedMotionProvider");
  }
  return ctx;
}