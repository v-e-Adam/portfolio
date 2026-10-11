"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Stops the mobile address bar showing/hiding from triggering a full refresh
ScrollTrigger.config({ ignoreMobileResize: true });

// Mouse / trackpad: vertical scroll drives a horizontal slide through the panels
const MOUSE =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Touch: normal vertical scrolling, with the background colour blending as you go
const TOUCH =
  "(hover: none) and (prefers-reduced-motion: no-preference), (pointer: coarse) and (prefers-reduced-motion: no-preference)";

/** Returns a function that blends between neighbouring colours: (segment, 0..1) => colour */
function createMixer(colors: string[]) {
  const blends = colors
    .slice(1)
    .map((color, i) => gsap.utils.interpolate(colors[i], color));

  return (segment: number, t: number) => {
    if (blends.length === 0) return colors[0];
    const i = Math.min(Math.max(segment, 0), blends.length - 1);
    return blends[i](Math.min(Math.max(t, 0), 1));
  };
}

let colorContext: CanvasRenderingContext2D | null = null;

/** Converts any CSS colour (rgb, hex, oklch...) into plain rgb(), which GSAP can blend */
function toRgb(css: string) {
  colorContext ??= document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true });
  if (!colorContext) return css;
  colorContext.clearRect(0, 0, 1, 1);
  colorContext.fillStyle = css;
  colorContext.fillRect(0, 0, 1, 1);
  const [r, g, b] = colorContext.getImageData(0, 0, 1, 1).data;
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Subtle animation for one project card:
 * - the screenshot and text ease in as the card arrives (and reverse on the way back)
 * - the screenshot drifts slightly inside its frame as the card moves past (parallax)
 * Pass the horizontal tween as `containerAnimation` in sideways mode.
 */
function animateCard(card: HTMLElement, containerAnimation?: gsap.core.Animation) {
  const horizontal = !!containerAnimation;
  const frame = card.querySelector("[data-card-frame]");
  const image = card.querySelector("[data-card-image]");
  const text = card.querySelectorAll("[data-card-text] > *");

  // Ease in
  const reveal = gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: {
      trigger: card,
      containerAnimation,
      start: horizontal ? "left 75%" : "top 80%",
      toggleActions: "play none none reverse",
    },
  });
  if (frame) {
    reveal.from(frame, {
      opacity: 0,
      scale: 0.95,
      x: horizontal ? 60 : 0,
      y: horizontal ? 0 : 40,
      duration: 0.9,
    });
  }
  if (text.length) {
    reveal.from(
      text,
      {
        opacity: 0,
        x: horizontal ? 30 : 0,
        y: horizontal ? 0 : 20,
        duration: 0.7,
        stagger: 0.08,
      },
      "-=0.5"
    );
  }

  // Parallax: the screenshot slides a little against its frame as you scroll past
  if (image) {
    gsap.fromTo(
      image,
      horizontal ? { xPercent: 6 } : { yPercent: 6 },
      {
        ...(horizontal ? { xPercent: -6 } : { yPercent: -6 }),
        ease: "none",
        scrollTrigger: {
          trigger: card,
          containerAnimation,
          start: horizontal ? "left right" : "top bottom",
          end: horizontal ? "right left" : "bottom top",
          scrub: true,
        },
      }
    );
  }
}

/**
 * Scroll through the panels, with the background blending between each
 * panel's `data-color`, landing exactly on a panel's colour when it's in view.
 *
 * - Mouse / trackpad: scrolling moves sideways through the panels (pinned).
 * - Touch screens: normal vertical scrolling.
 * - Reduced motion: normal vertical scrolling, each panel keeps its own colour.
 *
 * The layout itself is switched in CSS (see the `mouse` variant in globals.css
 * and the classes in Panel.tsx); this component adds the animation on top.
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

      const panels = gsap.utils.toArray<HTMLElement>(
        "[data-color]",
        track.current
      );
      const colors = panels.map((el) => el.dataset.color as string);
      const mix = createMixer(colors);

      // Each panel's text colour, read from the page so it always matches the copy.
      // Used to colour the menu button as you scroll (--menu-color).
      const textMix = createMixer(
        panels.map((el) => toRgb(getComputedStyle(el.firstElementChild ?? el).color))
      );

      // Paint the wrapper and the page itself, so nothing white can show
      // through if the mobile browser's visible area changes size
      const paint = (segment: number, t: number) => {
        const background = mix(segment, t);
        if (wrapper.current) wrapper.current.style.backgroundColor = background;
        document.documentElement.style.backgroundColor = background;
        document.documentElement.style.setProperty(
          "--menu-color",
          textMix(segment, t)
        );
        document.documentElement.style.setProperty("--menu-bg", background);
      };

      const reset = () => {
        if (wrapper.current) wrapper.current.style.backgroundColor = "";
        document.documentElement.style.backgroundColor = "";
        document.documentElement.style.removeProperty("--menu-color");
        document.documentElement.style.removeProperty("--menu-bg");
      };

      // ---------- Mouse / trackpad: horizontal ----------
      mm.add(MOUSE, () => {
        // How far the track must travel: the last panel's left edge
        const getDistance = () =>
          (track.current!.lastElementChild as HTMLElement).offsetLeft;

        const setBackground = (progress: number) => {
          const scaled = Math.min(progress, 1) * (colors.length - 1);
          const segment = Math.floor(scaled);
          paint(segment, scaled - segment);
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

        // Subtle per-card animation, driven by the same sideways movement
        gsap.utils
          .toArray<HTMLElement>("[data-card]", track.current)
          .forEach((card) => animateCard(card, tween));

        // Recalculate whenever the width changes (resize, split screen)
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
          reset();
        };
      });

      // ---------- Touch: vertical ----------
      mm.add(TOUCH, () => {
        let tops: number[] = [];

        // Scroll position at which each panel is lined up with the top of the screen
        const measure = () => {
          const max = ScrollTrigger.maxScroll(window);
          tops = panels.map((el) =>
            Math.min(el.getBoundingClientRect().top + window.scrollY, max)
          );
        };

        const update = () => {
          if (tops.length < 2) {
            paint(0, 0);
            return;
          }
          const y = window.scrollY;
          let segment = 0;
          for (let i = 0; i < tops.length - 1; i++) {
            if (y >= tops[i]) segment = i;
          }
          const start = tops[segment];
          const end = tops[segment + 1];
          const t = end > start ? (y - start) / (end - start) : 1;
          paint(segment, t);
        };

        measure();
        update();

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onRefresh: () => {
            measure();
            update();
          },
          onUpdate: update,
        });

        // Subtle per-card animation, driven by normal scrolling
        gsap.utils
          .toArray<HTMLElement>("[data-card]", track.current)
          .forEach((card) => animateCard(card));

        return reset;
      });
    },
    { scope: wrapper }
  );

  return (
    <div ref={wrapper} className="motion-safe:mouse:overflow-hidden">
      <div
        ref={track}
        className="relative flex flex-col motion-safe:mouse:w-max motion-safe:mouse:flex-row"
      >
        {children}
      </div>
    </div>
  );
}
