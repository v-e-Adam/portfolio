"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Stops the mobile address bar showing/hiding from triggering a full refresh
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Turns vertical scrolling into horizontal movement through its children.
 * Scrolling down moves forward, scrolling up moves back, and it stops at the
 * first and last panel. The background blends between each panel's
 * `data-color` as you scroll, landing exactly on a panel's colour when it is
 * in view. Works at all screen sizes. If the visitor prefers reduced motion, it
 * falls back to a normal vertical page where each panel has its own colour.
 */
export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
          // How far the track must travel: the last panel's left edge. Measuring
          // the panels themselves (not window.innerWidth) stays correct on
          // mobile, where the window and layout widths can disagree.
          const getDistance = () =>
            (track.current!.lastElementChild as HTMLElement).offsetLeft;

          // One colour per panel, read from each panel's data-color attribute
          const colors = gsap.utils
            .toArray<HTMLElement>("[data-color]", track.current)
            .map((el) => el.dataset.color as string);

          // One blend function per pair of neighbouring colours (red -> blue, blue -> green, ...)
          const blends = colors
            .slice(1)
            .map((color, i) => gsap.utils.interpolate(colors[i], color));

          // Colour the wrapper and the page itself, so nothing white can show
          // through if the mobile browser's visible area changes size
          const paint = (color: string) => {
            if (wrapper.current) wrapper.current.style.backgroundColor = color;
            document.documentElement.style.backgroundColor = color;
          };

          const setBackground = (progress: number) => {
            if (colors.length === 0) return;
            if (blends.length === 0) {
              paint(colors[0]);
              return;
            }
            const scaled = Math.min(progress, 1) * blends.length;
            const segment = Math.min(blends.length - 1, Math.floor(scaled));
            paint(blends[segment](scaled - segment));
          };

          setBackground(0);

          // Declared first: GSAP can fire onUpdate while the tween is still being created
          let tween: gsap.core.Tween | undefined;

          tween = gsap.to(track.current, {
            x: () => -getDistance(),
            ease: "none",
            onUpdate: () => {
              if (tween) setBackground(tween.progress());
            },
            scrollTrigger: {
              id: "horizontal-scroll",
              trigger: wrapper.current,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 0.6, // seconds of smoothing; use true for 1:1
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Recalculate whenever the width changes (resize, rotation, split screen)
          let lastWidth = wrapper.current!.clientWidth;
          const observer = new ResizeObserver(() => {
            const width = wrapper.current?.clientWidth ?? lastWidth;
            if (width !== lastWidth) {
              lastWidth = width;
              ScrollTrigger.refresh();
            }
          });
          observer.observe(wrapper.current!);

          return () => {
            observer.disconnect();
            if (wrapper.current) wrapper.current.style.backgroundColor = "";
            document.documentElement.style.backgroundColor = "";
          };
      });
    },
    { scope: wrapper }
  );

  return (
    <div ref={wrapper} className="motion-safe:overflow-hidden">
      <div
        ref={track}
        className="relative flex flex-col motion-safe:w-max motion-safe:flex-row"
      >
        {children}
      </div>
    </div>
  );
}
