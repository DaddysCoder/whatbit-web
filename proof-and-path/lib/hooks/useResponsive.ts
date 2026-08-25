"use client";

import { useEffect, useState } from "react";

export const DESKTOP_BREAKPOINT = 900;

export function useResponsive() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

    const update = () => {
      setIsDesktop(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return { isDesktop };
}
