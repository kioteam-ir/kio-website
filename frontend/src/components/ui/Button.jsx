import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const VARIANTS = {
  primary: "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/10 hover:bg-amber-300",
  secondary: "bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/10 hover:bg-teal-300",
  outline: "border border-slate-600 text-slate-200 hover:border-amber-400/60 hover:text-amber-300",
  ghost: "text-slate-300 hover:bg-white/5",
  danger: "border border-rose-500/30 text-rose-400 hover:bg-rose-500/10",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-8 py-3.5 text-base sm:text-lg",
};

export function Button({ to, href, variant = "primary", size = "md", className, disabled, children, ...props }) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-bold transition-all duration-200 active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{children}</a>;
  return <button className={classes} disabled={disabled} {...props}>{children}</button>;
}
