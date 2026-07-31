import { cn } from "../../utils/cn";

const TONES = {
  error: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  success: "bg-teal-500/10 border-teal-500/30 text-teal-300",
  info: "bg-amber-400/10 border-amber-400/30 text-amber-300",
};

export function Alert({ tone = "info", className, children }) {
  if (!children) return null;
  return (
    <p className={cn("rounded-md border px-3.5 py-2.5 text-center text-sm", TONES[tone], className)}>
      {children}
    </p>
  );
}
