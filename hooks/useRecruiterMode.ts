"use client";

import { useState, useCallback } from "react";

export function useRecruiterMode() {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  const enable = useCallback(() => setIsRecruiterMode(true), []);
  const disable = useCallback(() => setIsRecruiterMode(false), []);
  const toggle = useCallback(() => setIsRecruiterMode((prev) => !prev), []);

  return { isRecruiterMode, enable, disable, toggle };
}
