"use client";

import { useSyncExternalStore } from "react";
import { useCoarsePointer, useMediaQuery, useReducedMotion } from "@/hooks/use-media";

function subscribeSaveData(onStoreChange) {
  const connection =
  navigator.


  connection;

  if (!connection) return () => undefined;
  connection.addEventListener("change", onStoreChange);
  return () => connection.removeEventListener("change", onStoreChange);
}

function getSaveData() {
  const connection =
  navigator.


  connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  const type = connection.effectiveType;
  return type === "slow-2g" || type === "2g";
}

export function useSaveData() {
  return useSyncExternalStore(subscribeSaveData, getSaveData, () => false);
}

function getHardwareConcurrency() {
  return typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;
}

/**
 * Heuristic for constrained devices: few CPU cores, Save-Data / slow network,
 * or forced low-power via CSS class / query.
 */
export function useLowPowerDevice() {
  const saveData = useSaveData();
  const reducedMotion = useReducedMotion();
  const coarse = useCoarsePointer();
  const isNarrow = useMediaQuery("(max-width: 767px)");
  const prefersLowData = useMediaQuery("(prefers-reduced-data: reduce)");
  const lowCores = useSyncExternalStore(
    () => () => undefined,
    () => getHardwareConcurrency() <= 4,
    () => true
  );

  return (
    saveData ||
    prefersLowData ||
    reducedMotion ||
    coarse && isNarrow ||
    lowCores && isNarrow);

}



/**
 * - fallback: CSS/SVG only (phones, low-power, reduced motion, no WebGL)
 * - lite: reduced brick count, no shadows, dpr 1 (tablets)
 * - full: desktop premium scene
 */
export function useVisualQuality() {
  const lowPower = useLowPowerDevice();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const reducedMotion = useReducedMotion();

  if (reducedMotion || lowPower || isMobile) return "fallback";
  if (isTablet) return "lite";
  return "full";
}