import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const TextArea = forwardRef(function TextArea({ className, error, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full resize-none rounded-md border bg-slate-950/60 px-3.5 py-3 text-sm leading-7 text-white placeholder-slate-600",
        "outline-none transition-all duration-200",
        "border-slate-700 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/15",
        error && "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20",
        className,
      )}
      {...props}
    />
  );
});
