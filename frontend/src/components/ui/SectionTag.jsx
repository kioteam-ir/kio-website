export function SectionTag({ index, label }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-widest text-slate-400">
      <span className="h-px w-8 grad-brand opacity-60" />
      <span>SEC.{index} — {label}</span>
      <span className="h-px w-8 grad-brand opacity-60" />
    </div>
  );
}
