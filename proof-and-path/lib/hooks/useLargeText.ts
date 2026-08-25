"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "proof-and-path-large-text";

function readStoredLargeText(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function applyLargeTextAttribute(enabled: boolean) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.largeText = enabled ? "true" : "false";
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function getSnapshot(): boolean {
  const stored = readStoredLargeText();
  applyLargeTextAttribute(stored);
  return stored;
}

function getServerSnapshot(): boolean {
  return false;
}

function setStoredLargeText(enabled: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  } catch {
    // Ignore storage failures (private browsing, quota, etc.)
  }

  applyLargeTextAttribute(enabled);
  listeners.forEach((listener) => listener());
}

export function useLargeText() {
  const largeText = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setLargeText = useCallback((enabled: boolean) => {
    setStoredLargeText(enabled);
  }, []);

  const toggleLargeText = useCallback(() => {
    setStoredLargeText(!readStoredLargeText());
  }, []);

  return {
    largeText,
    isReady: typeof window !== "undefined",
    setLargeText,
    toggleLargeText,
  };
}

export type LargeTextContextValue = ReturnType<typeof useLargeText>;
