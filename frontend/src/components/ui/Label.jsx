import { cn } from "../../utils/cn";

export function Label({ htmlFor, className, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "font-mono text-sm tracking-wide text-slate-400",
        className,
      )}
    >
      {children}
    </label>
  );
}
