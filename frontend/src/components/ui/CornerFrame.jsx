import { cn } from "../../utils/cn";

const CORNERS = [
  "top-0 start-0 border-t border-s rounded-tr-none",
  "top-0 end-0 border-t border-e",
  "bottom-0 start-0 border-b border-s",
  "bottom-0 end-0 border-b border-e",
];

/**
 * The signature visual motif of the site: four small corner brackets around
 * a card, like a callout on a technical drawing. Pure CSS/SVG-free — just
 * absolutely positioned bordered squares.
 */
export function CornerFrame({ as: Tag = "div", tone = "amber", className, children, ...props }) {
  const toneClass = tone === "amber" ? "border-amber-400/70" : "border-teal-400/70";

  return (
    <Tag className={cn("group relative", className)} {...props}>
      {CORNERS.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={cn("pointer-events-none absolute h-3 w-3 opacity-70 transition-opacity group-hover:opacity-100", toneClass, pos)}
        />
      ))}
      {children}
    </Tag>
  );
}
