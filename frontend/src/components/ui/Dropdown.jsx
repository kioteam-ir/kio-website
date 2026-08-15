import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { cn } from "../../utils/cn";
import { IconDots } from "../icons";

/**
 * A small action menu anchored to a "..." trigger. Used wherever a row/card
 * has more than one or two actions — keeps dense UI (tables, cards) from
 * turning into a row of competing buttons. Destructive items get a subtle
 * red tint and a divider above them, so "delete" is never one misclick
 * away from "view".
 */
export function Dropdown({ items, align = "end" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((v) => !v);
        }}
        aria-label="عملیات بیشتر"
        aria-expanded={isOpen}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition-colors",
          "hover:bg-white/5 hover:text-neutral-200",
          isOpen && "bg-white/5 text-neutral-200",
        )}
      >
        <IconDots className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute top-full z-20 mt-1.5 min-w-[10rem] overflow-hidden rounded-md border border-neutral-800 bg-neutral-900 py-1 shadow-xl animate-scale-in",
            align === "end" ? "end-0" : "start-0",
          )}
        >
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              disabled={item.disabled}
              onClick={() => {
                setIsOpen(false);
                item.onClick();
              }}
              className={cn(
                "flex w-full items-center gap-2.5 px-3.5 py-2 text-start text-sm transition-colors",
                "disabled:pointer-events-none disabled:opacity-40",
                item.destructive
                  ? "text-brand-crimson-300 hover:bg-brand-crimson-900/20"
                  : "text-neutral-300 hover:bg-white/5",
                item.destructive &&
                  i > 0 &&
                  "mt-1 border-t border-neutral-800 pt-2.5",
              )}
            >
              {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
