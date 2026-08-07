import { cn } from "../../utils/cn";
import { SectionTag } from "./SectionTag";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "center",
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-start",
      )}
    >
      {index && <SectionTag index={index} label={eyebrow ?? ""} />}
      <h2
        className={cn(
          "text-3xl font-bold text-white sm:text-4xl md:text-5xl",
          className,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-8 text-slate-400 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
