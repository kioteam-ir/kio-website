import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const TextArea = forwardRef(function TextArea(
  { className, error, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full mt-3 resize-none rounded-md border bg-slate-950/60 px-3.5 py-3 text-sm leading-7 text-white placeholder-slate-600",
        "outline-none transition-all duration-200",
        "border-slate-700 focus:border-brand-blue-400/70 focus:ring-2 focus:ring-brand-blue-400/15",
        error &&
          "border-brand-crimson-400/60 focus:border-brand-crimson-400 focus:ring-brand-crimson-400/20",
        className,
      )}
      {...props}
    />
  );
});
