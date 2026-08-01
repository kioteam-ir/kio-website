import { cn } from "../../utils/cn";

const TONES = {
  error: "bg-brand-crimson-900/30 border-brand-crimson-400/30 text-brand-crimson-300",
  success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  info: "bg-brand-blue-400/10 border-brand-blue-400/30 text-brand-blue-300",
};

export function Alert({ tone = "info", className, children }) {
  if (!children) return null;
  return (
    <p className={cn("rounded-md border px-3.5 py-2.5 text-center text-sm", TONES[tone], className)}>
      {children}
    </p>
  );
}
