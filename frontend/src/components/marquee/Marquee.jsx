import { cn } from "../../utils/cn";

export function Marquee({ items, renderItem, speedSeconds = 30, pauseOnHover = true, className }) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className,
      )}
    >
      <div
        className={cn("flex w-max shrink-0 gap-4 py-2 animate-marquee", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={{ "--marquee-duration": `${speedSeconds}s` }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={`${item.title}-${index}`}>{renderItem(item)}</div>
        ))}
      </div>
    </div>
  );
}
