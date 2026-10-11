import FitToScreen from "@/components/FitToScreen";

/**
 * One step in the scroll.
 * `color` is blended into the page background as you scroll, and used as
 * the panel's own background in the stacked fallback layout (reduced motion).
 *
 * Vertical (touch, reduced motion): at least a screen tall, grows with its content.
 * Horizontal (mouse / trackpad): exactly one screen, side by side.
 */
export default function Panel({
  children,
  id,
  color,
  text,
}: {
  children: React.ReactNode;
  id?: string;
  color: string;
  text?: string;
}) {
  return (
    <section
      id={id}
      data-color={color}
      style={
        { "--panel-bg": color, "--text-col": text || "#000000" } as React.CSSProperties
      }
      className="flex min-h-svh items-center justify-center bg-(--panel-bg) px-6 py-16 text-(--text-col) md:px-10 md:py-20 motion-safe:bg-transparent motion-safe:mouse:h-lvh motion-safe:mouse:w-screen motion-safe:mouse:shrink-0 motion-safe:mouse:py-10"
    >
      <div className="w-full max-w-5xl motion-safe:mouse:h-full">
        <FitToScreen>{children}</FitToScreen>
      </div>
    </section>
  );
}