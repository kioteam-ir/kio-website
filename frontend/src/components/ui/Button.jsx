import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const VARIANTS = {
  primary: "grad-brand text-white shadow-lg shadow-black/30 hover:brightness-110",
  outline: "border border-slate-600 text-slate-200 hover:border-brand-blue-400/60 hover:text-brand-blue-300",
  ghost: "text-slate-300 hover:bg-white/5",
  danger: "border border-brand-crimson-400/30 text-brand-crimson-300 hover:bg-brand-crimson-900/20",
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
