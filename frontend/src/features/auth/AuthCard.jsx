import { Link } from "react-router-dom";
import { CornerFrame } from "../../components/ui/CornerFrame";

export function AuthCard({ title, subtitle, subtitleTo, children }) {
  return (
    <div
      dir="rtl"
      className="relative -mt-20 flex min-h-screen items-center justify-center px-4 pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-blueprint-grid bg-ink-vignette"
        aria-hidden="true"
      />
      <CornerFrame className="relative w-full max-w-md rounded-lg border border-dashed border-slate-700 bg-slate-900/70 p-6 shadow-2xl md:p-8">
        <div className="space-y-3 text-center">
          <span className="font-mono text-xs tracking-widest text-slate-500">
            KIO / ACCESS
          </span>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <Link
            to={subtitleTo}
            className="inline-block text-sm text-brand-blue-300 transition-colors hover:text-brand-blue-200"
          >
            {subtitle}
          </Link>
        </div>
        {children}
      </CornerFrame>
    </div>
  );
}
