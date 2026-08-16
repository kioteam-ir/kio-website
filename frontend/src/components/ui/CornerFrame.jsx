import { cn } from "../../utils/cn";

/**
 * Signature visual motif: four corner brackets, colored to echo the two
 * halves of the Kio logo — blue at the top, crimson at the bottom — so
 * every framed card quietly carries the brand mark's duotone split.
 */
export function CornerFrame({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("group relative", className)} {...props}>
      <span aria-hidden="true" className="pointer-events-none absolute top-0 start-0 h-3 w-3 border-t border-s border-brand-blue-400/70 opacity-70 transition-opacity group-hover:opacity-100" />
      <span aria-hidden="true" className="pointer-events-none absolute top-0 end-0 h-3 w-3 border-t border-e border-brand-blue-400/70 opacity-70 transition-opacity group-hover:opacity-100" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 start-0 h-3 w-3 border-b border-s border-brand-crimson-400/70 opacity-70 transition-opacity group-hover:opacity-100" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 end-0 h-3 w-3 border-b border-e border-brand-crimson-400/70 opacity-70 transition-opacity group-hover:opacity-100" />
      {children}
    </Tag>
  );
}
