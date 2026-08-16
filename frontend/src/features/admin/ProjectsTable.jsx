import { Switch } from "../../components/ui/Switch";
import { Dropdown } from "../../components/ui/Dropdown";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { IconEye, IconTrash } from "../../components/icons";
import { cn } from "../../utils/cn";

function StatusBadge({ isDone }) {
  return isDone ? (
    <span className="inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-400">
      انجام‌شده
    </span>
  ) : (
    <span className="inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full border border-brand-blue-400/30 bg-brand-blue-400/10 px-2.5 py-1 font-mono text-[11px] text-brand-blue-300">
      در حال انجام
    </span>
  );
}

/**
 * One layout for every screen size — a stack of rows that wrap their
 * internal content with flexbox instead of switching between a <table>
 * and a card grid at a breakpoint. Fewer moving parts, fewer ways for
 * desktop and mobile to end up out of sync with each other.
 */
export function ProjectsTable({ projects, onSelect, onDelete, onToggleDone, mutatingId }) {
  return (
    <div className="grid gap-3">
      {projects.map((item) => (
        <CornerFrame
          key={item.id}
          onClick={() => onSelect(item)}
          className="relative cursor-pointer overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40 ps-4 pe-3 py-3.5 transition-colors hover:bg-white/[0.03]"
        >
          <span
            className={cn("absolute inset-y-0 start-0 w-[3px]", item.is_done ? "bg-emerald-500/70" : "bg-brand-blue-400/70")}
            aria-hidden="true"
          />

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="truncate text-sm font-medium text-neutral-100">{item.title}</h3>
                <span className="text-xs text-neutral-500">— {item.project_type}</span>
              </div>
              <p className="mt-1.5 text-xs leading-6 text-neutral-400">{item.description}</p>
              <span dir="ltr" className="mt-1 inline-block font-mono text-xs text-neutral-500">{item.phone_number}</span>
            </div>

            <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <StatusBadge isDone={item.is_done} />
              <Switch
                checked={item.is_done}
                disabled={mutatingId === item.id}
                onChange={(next) => onToggleDone(item.id, next)}
                label={item.is_done ? "علامت‌گذاری به عنوان در حال انجام" : "علامت‌گذاری به عنوان انجام‌شده"}
              />
              <Dropdown
                items={[
                  { label: "مشاهده جزئیات", icon: IconEye, onClick: () => onSelect(item) },
                  { label: "حذف پروژه", icon: IconTrash, destructive: true, onClick: () => onDelete(item.id) },
                ]}
              />
            </div>
          </div>
        </CornerFrame>
      ))}
    </div>
  );
}
