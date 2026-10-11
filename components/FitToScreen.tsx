"use client";

import { useEffect, useRef } from "react";

/**
 * Horizontal (mouse / trackpad) layout only: each panel is exactly one screen
 * tall, so if its content is still taller than the screen (a short window,
 * long text) it's scaled down evenly rather than cut off.
 *
 * Vertical (touch) layout: does nothing. Panels simply grow with their content.
 */
export default function FitToScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const horizontal = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    const fit = () => {
      el.style.transform = "none";
      if (!horizontal.matches) return;
      const scale = Math.min(1, el.clientHeight / el.scrollHeight);
      if (scale < 1) {
        el.style.transformOrigin = "top center";
        el.style.transform = `scale(${scale})`;
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    horizontal.addEventListener("change", fit);
    document.fonts.ready.then(fit);

    return () => {
      observer.disconnect();
      horizontal.removeEventListener("change", fit);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="motion-safe:mouse:flex motion-safe:mouse:h-full motion-safe:mouse:flex-col motion-safe:mouse:justify-center-safe"
    >
      {children}
    </div>
  );
}
