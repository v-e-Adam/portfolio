/**
 * One full-screen step in the horizontal scroll.
 * `color` is blended into the page background as you scroll , and
 * used as the panel's own background in the stacked fallback layout (reduced motion).
 */
export default function Panel({
  children,
  id,
  color,
  text
}: {
  children: React.ReactNode;
  id?: string;
  color: string;
  text?:string
}) {
  return (
    <section
      id={id}
      data-color={color}
      style={{ "--panel-bg": color, "--text-col":text || "#000000" } as React.CSSProperties}
      className="flex items-center text-(--text-col) justify-center bg-(--panel-bg) p-6 motion-safe:h-lvh motion-safe:w-screen motion-safe:shrink-0 motion-safe:bg-transparent"

    >
      <div className="w-full max-w-5xl">{children}</div>
    </section>
  );
}
