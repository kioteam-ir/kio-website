export function SectionTag({ index, label }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-widest text-amber-400/80">
      <span className="h-px w-8 bg-amber-400/40" />
      <span>SEC.{index} — {label}</span>
      <span className="h-px w-8 bg-amber-400/40" />
    </div>
  );
}
