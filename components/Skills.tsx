"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bodies, Body, Composite, Engine, Events, Runner } from "matter-js";

// How close (px) the mouse / finger has to be to push a skill, and how hard
const POINTER_RADIUS = 110;
const POINTER_FORCE = 0.0012;

export type Skill = { name: string; color: string };

/** WCAG relative luminance of one 0-255 colour channel */
function channel(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Picks white or black text, whichever has more contrast on a #rrggbb background */
function readableText(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return "#fff";
  const n = parseInt(m[1], 16);
  const L =
    0.2126 * channel(n >> 16) +
    0.7152 * channel((n >> 8) & 255) +
    0.0722 * channel(n & 255);
  // Contrast with white is 1.05 / (L + 0.05); with black it is (L + 0.05) / 0.05
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.05 ? "#fff" : "#000";
}

/**
 * Skills that drop in and bump into each other. Move your mouse or drag a
 * finger over them to knock them around. With reduced motion enabled they're
 * just a plain wrapped list.
 */
export default function Skills({ skills }: { skills: Skill[] }) {
  const container = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLSpanElement | null)[]>([]);
  const [layoutKey, setLayoutKey] = useState(0);

  // When the width changes (rotating a phone, resizing the window) everything
  // is measured and dropped in again, so the pills always fit the new size
  useEffect(() => {
    const box = container.current;
    if (!box) return;
    let width = box.clientWidth;
    let timer: number;
    const relayout = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setLayoutKey((n) => n + 1), 300);
    };
    const observer = new ResizeObserver(() => {
      if (box.clientWidth === width) return;
      width = box.clientWidth;
      relayout();
    });
    observer.observe(box);

    // Phones: also re-fit when rotating, once the new screen height has settled
    const portrait = window.matchMedia("(orientation: portrait)");
    portrait.addEventListener("change", relayout);

    // Mouse layout: also re-fit when the window height changes. (Not on touch,
    // where height changes are just the address bar moving.)
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mouse.matches) window.addEventListener("resize", relayout);

    return () => {
      observer.disconnect();
      portrait.removeEventListener("change", relayout);
      window.removeEventListener("resize", relayout);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const box = container.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    // Wait for fonts so each skill is measured at its final size
    document.fonts.ready.then(() => {
      if (cancelled) return;

      const els = chips.current.filter(Boolean) as HTMLSpanElement[];

      // Random size for each skill (padding scales with it, as it's in em).
      // Narrow screens start with a smaller range.
      const fit = Math.max(0.75, Math.min(1, box.clientWidth / 700));
      const baseSizes = els.map(() => (0.85 + Math.random() * 0.55) * fit);
      const applySizes = (k: number) => {
        els.forEach((el, i) => {
          el.style.fontSize = `${Math.max(baseSizes[i] * k, 0.5).toFixed(2)}rem`;
        });
      };
      const measure = () =>
        els.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }));
      const area = (list: { w: number; h: number }[]) =>
        list.reduce((sum, s) => sum + (s.w + 8) * (s.h + 8), 0);

      // Horizontal layout (mouse): the panel is exactly one screen tall, so the
      // box is capped and the pills shrink evenly until they all fit.
      // Vertical layout (touch): no cap. The box grows to hold every pill.
      const horizontal = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
      const maxHeight = horizontal ? window.innerHeight * 0.7 : Infinity;

      // Pills rarely pack tighter than ~40%, so that's the area we plan for
      const available = box.clientWidth * (maxHeight - 40) * 0.4;
      applySizes(1);
      let sizes = measure();
      const k = Math.min(1, Math.sqrt(available / area(sizes)));
      if (k < 1) {
        applySizes(k);
        sizes = measure();
      }

      // Box height: just enough for the pills (capped on the horizontal layout)
      const needed = area(sizes) / (box.clientWidth * 0.4) + 40;
      box.style.height = `${Math.round(Math.min(Math.max(needed, 260), maxHeight))}px`;

      let W = box.clientWidth;
      let H = box.clientHeight;

      const engine = Engine.create();
      engine.gravity.y = 0.5; // lower = floatier

      // Floor and side walls (no ceiling, so skills can fall in from above)
      let walls: Body[] = [];
      const buildWalls = () => {
        Composite.remove(engine.world, walls);
        const t = 200;
        walls = [
          Bodies.rectangle(W / 2, H + t / 2, W + t * 2, t, { isStatic: true }),
          Bodies.rectangle(-t / 2, H / 2 - 500, t, H + 1000, { isStatic: true }),
          Bodies.rectangle(W + t / 2, H / 2 - 500, t, H + 1000, { isStatic: true }),
        ];
        Composite.add(engine.world, walls);
      };
      buildWalls();

      // Random drop order, so a different skill lands first each visit
      const order = els.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }

      // One rounded body per skill, starting above the box so they rain in
      // from random positions, at slightly random angles
      const bodies = els.map((_, i) => {
        const { w, h } = sizes[i];
        const body = Bodies.rectangle(
          w / 2 + Math.random() * Math.max(W - w, 1),
          -h - order.indexOf(i) * h * 0.9 - Math.random() * 100,
          w,
          h,
          {
            chamfer: { radius: h / 2 },
            restitution: 0.6, // bounciness
            friction: 0.1,
            frictionAir: 0.01,
            density: 0.002,
          }
        );
        Body.setAngle(body, (Math.random() - 0.5) * 1.2);
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 0 });
        return body;
      });
      Composite.add(engine.world, bodies);

      const render = () => {
        bodies.forEach((body, i) => {
          const el = els[i];
          el.style.transform = `translate(${body.position.x - sizes[i].w / 2}px, ${
            body.position.y - sizes[i].h / 2
          }px) rotate(${body.angle}rad)`;
          el.style.opacity = "1";
        });
      };
      render();
      Events.on(engine, "afterUpdate", render);

      // Push skills away from the mouse / finger
      let pointer: { x: number; y: number } | null = null;
      let pointerType: "mouse" | "touch" = "mouse";

      Events.on(engine, "beforeUpdate", () => {
        const p = pointer;
        if (!p) return;
        for (const body of bodies) {
          const dx = body.position.x - p.x;
          const dy = body.position.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist > POINTER_RADIUS) continue;
          const strength = POINTER_FORCE * body.mass * (1 - dist / POINTER_RADIUS);
          Body.applyForce(body, body.position, {
            x: (dx / dist) * strength,
            y: (dy / dist) * strength - strength * 0.6, // slight upward hop
          });
          Body.setAngularVelocity(
            body,
            body.angularVelocity + (Math.random() - 0.5) * 0.02
          );
        }
      });

      const setFromClient = (clientX: number, clientY: number) => {
        const rect = box.getBoundingClientRect();
        pointer = { x: clientX - rect.left, y: clientY - rect.top };
      };
      const clear = () => {
        pointer = null;
      };
      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        pointerType = "mouse";
        setFromClient(e.clientX, e.clientY);
      };
      // Touch events keep firing while the page scrolls (pointer events don't)
      const onTouch = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (!touch) return;
        pointerType = "touch";
        setFromClient(touch.clientX, touch.clientY);
      };
      // The box moves when the page scrolls, so a resting mouse shouldn't keep pushing
      const onScroll = () => {
        if (pointerType === "mouse") clear();
      };

      box.addEventListener("pointermove", onPointerMove);
      box.addEventListener("pointerleave", clear);
      box.addEventListener("touchstart", onTouch, { passive: true });
      box.addEventListener("touchmove", onTouch, { passive: true });
      box.addEventListener("touchend", clear);
      box.addEventListener("touchcancel", clear);
      window.addEventListener("scroll", onScroll, { passive: true });

      // Keep walls and skills inside the box when it changes size
      const resizeObserver = new ResizeObserver(() => {
        const nextW = box.clientWidth;
        const nextH = box.clientHeight;
        if (nextW === W && nextH === H) return;
        W = nextW;
        H = nextH;
        buildWalls();
        bodies.forEach((body, i) => {
          const { w, h } = sizes[i];
          Body.setPosition(body, {
            x: Math.min(Math.max(body.position.x, w / 2), W - w / 2),
            y: Math.min(body.position.y, H - h / 2),
          });
        });
      });
      resizeObserver.observe(box);

      // The box changed height, so let the scroll animations re-measure the page
      ScrollTrigger.refresh();

      // Only run the physics while the section is on screen
      const runner = Runner.create();
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) Runner.run(runner, engine);
        else Runner.stop(runner);
      });
      intersectionObserver.observe(box);

      cleanup = () => {
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        Runner.stop(runner);
        Events.off(engine, "afterUpdate", render);
        box.removeEventListener("pointermove", onPointerMove);
        box.removeEventListener("pointerleave", clear);
        box.removeEventListener("touchstart", onTouch);
        box.removeEventListener("touchmove", onTouch);
        box.removeEventListener("touchend", clear);
        box.removeEventListener("touchcancel", clear);
        window.removeEventListener("scroll", onScroll);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [skills, layoutKey]);

  return (
    <div
      ref={container}
      className="touch-pan-y flex flex-wrap gap-2 motion-safe:relative motion-safe:block motion-safe:overflow-hidden"
    >
      {skills.map((skill, i) => (
        <span
          key={skill.name}
          ref={(el) => {
            chips.current[i] = el;
          }}
          style={{
            backgroundColor: skill.color,
            color: readableText(skill.color),
          }}
          className="select-none whitespace-nowrap rounded-full px-[1em] py-[0.5em] will-change-transform motion-safe:absolute motion-safe:left-0 motion-safe:top-0 motion-safe:opacity-0 font-winter"
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
}
