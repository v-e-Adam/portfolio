"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToPanel } from "@/lib/scrollToPanel";

export type MenuItem = { id: string; label: string };

export default function Menu({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Close when clicking anywhere outside the menu, or pressing Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={root} className="fixed right-4 top-4 z-50">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-current transition-all duration-300 motion-reduce:transition-none ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <nav id="site-menu" className="absolute right-0 top-12">
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
                  className="block whitespace-nowrap px-3 py-1"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
