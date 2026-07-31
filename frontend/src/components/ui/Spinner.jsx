import { cn } from "../../utils/cn";

export function Spinner({ className }) {
  return (
    <span
      className={cn("inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-amber-400", className)}
      role="status"
      aria-label="در حال بارگذاری"
    />
  );
}
