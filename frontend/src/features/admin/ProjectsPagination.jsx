import { cn } from "../../utils/cn";

export function ProjectsPagination({ page, pages, onChange, disabled }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 pt-6 font-mono text-xs text-neutral-500">
      <button
        onClick={() => onChange(page - 1)}
        disabled={disabled || page <= 1}
        className="rounded-md border border-neutral-800 px-3 py-1.5 text-neutral-300 transition-colors hover:border-brand-blue-400/40 hover:text-brand-blue-300 disabled:pointer-events-none disabled:opacity-30"
      >
        قبلی
      </button>

      <span className="tracking-widest">
        صفحه{" "}
        <span className="text-neutral-200">
          {String(page).padStart(2, "0")}
        </span>{" "}
        / {String(pages).padStart(2, "0")}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        disabled={disabled || page >= pages}
        className={cn(
          "rounded-md border border-neutral-800 px-3 py-1.5 text-neutral-300 transition-colors hover:border-brand-blue-400/40 hover:text-brand-blue-300",
          "disabled:pointer-events-none disabled:opacity-30",
        )}
      >
        بعدی
      </button>
    </div>
  );
}
