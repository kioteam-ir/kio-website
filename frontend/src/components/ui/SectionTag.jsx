export function SectionTag({ index, label }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3 font-mono text-sm tracking-widest text-slate-400">
      <span className="h-1 w-24 rounded-2xl grad-brand opacity-90" />
      <span>
        SEC.{index} — {label}
      </span>
      <span className="h-1 w-24 rounded-2xl grad-brand opacity-90" />
    </div>
  );
}
