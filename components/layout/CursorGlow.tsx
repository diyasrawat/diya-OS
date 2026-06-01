"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none w-[600px] h-[600px] rounded-full opacity-[0.07] bg-primary blur-[120px] -z-10 transition-transform duration-200 ease-out"
      style={{ transform: "translate(0,0)" }}
      aria-hidden
    />
  );
}
