import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scrolls to a panel by id. When the horizontal scroll is active, the target
 * is converted into the matching vertical scroll position; otherwise (mobile
 * or reduced motion) it's a normal scroll to the element.
 */
export function scrollToPanel(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const st = ScrollTrigger.getById("horizontal-scroll");

  if (!st) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const track = el.parentElement as HTMLElement; // the flex track (position: relative)
  const distance = (track.lastElementChild as HTMLElement).offsetLeft;
  const progress = distance > 0 ? Math.min(el.offsetLeft / distance, 1) : 0;
  const top = st.start + progress * (st.end - st.start);

  window.scrollTo({ top, behavior: "smooth" });
}
