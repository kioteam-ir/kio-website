import { Switch } from "../../components/ui/Switch";
import { Dropdown } from "../../components/ui/Dropdown";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { IconEye, IconTrash } from "../../components/icons";
import { cn } from "../../utils/cn";

function StatusBadge({ isDone, className }) {
  return isDone ? (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-400",
        className,
      )}
    >
      انجام‌شده
    </span>
  ) : (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-blue-400/30 bg-brand-blue-400/10 px-2.5 py-1 font-mono text-[11px] text-brand-blue-300",
        className,
      )}
    >
      در حال انجام
    </span>
  );
}

function rowActions({ item, onSelect, onDelete }) {
  return [
    { label: "مشاهده جزئیات", icon: IconEye, onClick: () => onSelect(item) },
    {
      label: "حذف پروژه",
      icon: IconTrash,
      destructive: true,
      onClick: () => onDelete(item.id),
    },
  ];
}

/**
 * Desktop: a dense table. Mobile: the same data as a stack of cards — the
 * table's fixed columns simply don't work below ~640px, so rather than
 * force horizontal scroll (bad UX for a data table) we swap layouts
 * entirely at the `md` breakpoint. Both share the same status badge,
 * done/undone switch, and Dropdown action menu, so nothing is exclusive
 * to one screen size — same actions, just re-flowed.
 *
 * A 3px status-colored bar on the mobile card's leading edge (blue for
 * in-progress, emerald for done) lets you scan status at a glance while
 * scrolling — the desktop table already has the badge column for that,
 * but a card list benefits from a peripheral-vision cue too.
 */
export function ProjectsTable({
  projects,
  onSelect,
  onDelete,
  onToggleDone,
  mutatingId,
}) {
  return (
    <>
      {/* Desktop / tablet — table */}
      <div className="hidden overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40 md:block">
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="w-10 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
                #
              </th>
              <th className="w-40 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
                عنوان
              </th>
              <th className="w-28 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
                نوع پروژه
              </th>
              <th className="w-36 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
                شماره تلفن
              </th>
              <th className="px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
                توضیحات
              </th>
              <th className="w-44 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
                وضعیت
              </th>
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {projects.map((item, index) => (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className="cursor-pointer border-b border-neutral-800/60 transition-colors last:border-0 hover:bg-white/[0.03]"
              >
                <td className="px-4 py-3 text-neutral-500">{index + 1}</td>
                <td className="truncate px-4 py-3 text-neutral-200">
                  {item.title}
                </td>
                <td className="truncate px-4 py-3 text-neutral-400">
                  {item.project_type}
                </td>
                <td
                  className="truncate px-4 py-3 font-mono text-neutral-400"
                  dir="ltr"
                >
                  {item.phone_number}
                </td>
                <td className="truncate px-4 py-3 text-neutral-300">
                  {String(item.description).slice(0, 30)}
                  {item.description?.length > 30 ? "..." : ""}
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2.5">
                    <Switch
                      checked={item.is_done}
                      disabled={mutatingId === item.id}
                      onChange={(next) => onToggleDone(item.id, next)}
                      label={
                        item.is_done
                          ? "علامت‌گذاری به عنوان در حال انجام"
                          : "علامت‌گذاری به عنوان انجام‌شده"
                      }
                    />
                    <StatusBadge isDone={item.is_done} />
                  </div>
                </td>
                <td className="px-2 py-3" onClick={(e) => e.stopPropagation()}>
                  <Dropdown items={rowActions({ item, onSelect, onDelete })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile — cards */}
      <div className="grid gap-3 md:hidden">
        {projects.map((item) => (
          <CornerFrame
            key={item.id}
            onClick={() => onSelect(item)}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-lg border bg-neutral-900/40 ps-4 pe-3 py-3.5 transition-colors",
              "border-neutral-800 active:bg-white/[0.03]",
            )}
          >
            <span
              className={cn(
                "absolute inset-y-0 start-0 w-[3px]",
                item.is_done ? "bg-emerald-500/70" : "bg-brand-blue-400/70",
              )}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-neutral-100">
                  {item.title}
                </h3>
                <p className="mt-0.5 truncate text-xs text-neutral-500">
                  {item.project_type}
                </p>
              </div>
              <div onClick={(e) => e.stopPropagation()} className="shrink-0">
                <Dropdown items={rowActions({ item, onSelect, onDelete })} />
              </div>
            </div>

            <p className="mt-2.5 line-clamp-2 text-xs leading-6 text-neutral-400">
              {item.description}
            </p>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-neutral-800/70 pt-3">
              <span dir="ltr" className="font-mono text-xs text-neutral-500">
                {item.phone_number}
              </span>
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <StatusBadge isDone={item.is_done} />
                <Switch
                  checked={item.is_done}
                  disabled={mutatingId === item.id}
                  onChange={(next) => onToggleDone(item.id, next)}
                  label={
                    item.is_done
                      ? "علامت‌گذاری به عنوان در حال انجام"
                      : "علامت‌گذاری به عنوان انجام‌شده"
                  }
                />
              </div>
            </div>
          </CornerFrame>
        ))}
      </div>
    </>
  );
}
