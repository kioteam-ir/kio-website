import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Input = forwardRef(function Input(
  { className, error, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border bg-slate-950/60 px-3.5 py-3.5 mt-2 mb-5 text-sm text-white placeholder-slate-600",
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
