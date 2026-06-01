"use client";

import { useState, useEffect } from "react";

/**
 * Returns the live data for a section, falling back to the imported
 * lib/data default when no localStorage override exists.
 *
 * Pattern: admin page writes JSON to localStorage[key].
 *          Section components read it on mount via this hook.
 *
 * v0.8 migration: replace the localStorage read with a Supabase fetch;
 * the signature and contract stay identical.
 */
export function useAdminData<T>(key: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as T;
        if (parsed !== null && parsed !== undefined) setData(parsed);
      }
    } catch {
      // Corrupted storage entry — use imported fallback
    }
  }, [key]);

  return data;
}
