"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToPanel } from "@/lib/scrollToPanel";

export type MenuItem = { id: string; label: string };

export default function Menu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Close when clicking anywhere outside the menu, or pressing Escape
  // Close when clicking anywhere outside the menu, pressing Escape, or scrolling
  useEffect(() => {
    if (!open) return;

    const startY = window.scrollY;

    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    // Mouse wheel / trackpad
    const onWheel = () => setOpen(false);
    // Keyboard, scrollbar, touch momentum. The small threshold stops tiny
    // layout jitters (e.g. a mobile address bar moving) from closing it.
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 10) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <div ref={root} className="fixed right-4 top-4 z-50 text-white mix-blend-difference motion-safe:text-(--menu-color) motion-safe:mix-blend-normal">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${open ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Always rendered so it can slide; `invisible` keeps it out of reach when closed */}
      <nav
        id="site-menu"
        aria-hidden={!open}
        className={`absolute right-0 top-12 bg-white text-black transition-[translate,visibility] duration-300 ease-out motion-reduce:transition-none motion-safe:bg-(--menu-color) motion-safe:text-(--menu-bg) p-5 md:p-10 rounded-xl ${
          open ? "visible translate-x-0" : "invisible translate-x-[calc(100%+1rem)]"
        }`}
      >
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  scrollToPanel(item.id);
                }}
                className="block whitespace-nowrap px-3 py-1 font-modestic text-[1rem] md:text-[1.5rem]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
