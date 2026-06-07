import { useEffect, useState, useCallback } from "react";

const WATCHLIST_KEY = "dse.watchlist.v1";
const RECENT_KEY = "dse.recentlyViewed.v1";

function readArr(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeArr(key: string, v: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
    window.dispatchEvent(new CustomEvent("dse-storage", { detail: { key } }));
  } catch {
    // ignore quota
  }
}

function useStorageArray(key: string) {
  const [items, setItems] = useState<string[]>(() => readArr(key));

  useEffect(() => {
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail?.key === key || (e as StorageEvent).key === key) {
        setItems(readArr(key));
      }
    };
    window.addEventListener("dse-storage", onChange as EventListener);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("dse-storage", onChange as EventListener);
      window.removeEventListener("storage", onChange);
    };
  }, [key]);

  return [items, setItems] as const;
}

export function useWatchlist() {
  const [items, setItems] = useStorageArray(WATCHLIST_KEY);

  const has = useCallback((code: string) => items.includes(code.toUpperCase()), [items]);

  const toggle = useCallback((code: string) => {
    const C = code.toUpperCase();
    const next = items.includes(C) ? items.filter((c) => c !== C) : [...items, C];
    setItems(next);
    writeArr(WATCHLIST_KEY, next);
  }, [items, setItems]);

  return { items, has, toggle };
}

export function useRecentlyViewed() {
  const [items, setItems] = useStorageArray(RECENT_KEY);

  const push = useCallback((code: string) => {
    const C = code.toUpperCase();
    const next = [C, ...items.filter((c) => c !== C)].slice(0, 5);
    setItems(next);
    writeArr(RECENT_KEY, next);
  }, [items, setItems]);

  return { items, push };
}
