import { cn } from "../../utils/cn";

export function Marquee({ items, renderItem, speedSeconds = 15, className }) {
  return (
    <div
      className={cn("flex w-full overflow-hidden gap-4", className)}
      dir="ltr"
    >
      <div
        className="flex shrink-0 gap-4 animate-marquee"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {items.map((item, index) => (
          <div key={`group1-${index}`} className="shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>

      <div
        className="flex shrink-0 gap-4 animate-marquee"
        style={{ animationDuration: `${speedSeconds}s` }}
        aria-hidden="true"
      >
        {items.map((item, index) => (
          <div key={`group2-${index}`} className="shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
