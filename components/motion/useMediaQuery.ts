"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Always starts as `false` so the first client
 * render matches the server-rendered markup exactly (no hydration
 * mismatch), then syncs to the real value in an effect once mounted.
 * Framer Motion's own `useReducedMotion` evaluates synchronously on the
 * client during the very first render, which can disagree with the
 * server pass and trigger a hydration warning — this avoids that.
 */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

/** True only on devices with a genuine hover-capable fine pointer. */
export function useHoverCapable() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** SSR-safe `prefers-reduced-motion: reduce` check. */
export function useReducedMotionSafe() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
