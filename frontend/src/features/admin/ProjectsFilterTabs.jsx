import { cn } from "../../utils/cn";

const TABS = [
  { key: "all", label: "همه" },
  { key: "undone", label: "در حال انجام" },
  { key: "done", label: "انجام‌شده" },
];

export function ProjectsFilterTabs({ active, onChange, counts }) {
  return (
    <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-neutral-800 bg-neutral-900/40 p-1">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3.5 py-1.5 font-mono text-xs transition-colors duration-150",
            active === tab.key
              ? "grad-brand text-white"
              : "text-neutral-400 hover:text-neutral-200",
          )}
        >
          {tab.label}
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px]",
              active === tab.key ? "bg-black/20" : "bg-white/5",
            )}
          >
            {counts[tab.key]}
          </span>
        </button>
      ))}
    </div>
  );
}
