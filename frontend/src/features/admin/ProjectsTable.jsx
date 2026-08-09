import { Switch } from "../../components/ui/Switch";
import { IconClose } from "../../components/icons";

function StatusBadge({ isDone }) {
  return isDone ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-400">
      انجام‌شده
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-400/30 bg-brand-blue-400/10 px-2.5 py-1 font-mono text-[11px] text-brand-blue-300">
      در حال انجام
    </span>
  );
}

export function ProjectsTable({
  projects,
  onSelect,
  onDelete,
  onToggleDone,
  mutatingId,
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40">
      <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr className="border-b border-neutral-800">
            <th className="w-10 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
              #
            </th>
            <th className="w-40 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
              عنوان
            </th>
            <th className="w-32 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
              نوع پروژه
            </th>
            <th className="w-40 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
              شماره تلفن
            </th>
            <th className="px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
              توضیحات
            </th>
            <th className="w-36 px-4 py-3 text-start font-mono text-xs font-medium text-neutral-500">
              وضعیت
            </th>
            <th className="w-36 px-4 py-3 text-end font-mono text-xs font-medium text-neutral-500">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => onSelect(item)}
              className="cursor-pointer border-b border-neutral-800/60 last:border-0 hover:bg-white/[0.03]"
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
              <td className="px-4 py-3">
                <div
                  className="flex items-center justify-end gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onSelect(item)}
                    className="rounded-md border border-neutral-700 px-3 py-1.5 text-xs text-neutral-300 hover:border-brand-blue-400/40 hover:text-brand-blue-300"
                  >
                    مشاهده
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    disabled={mutatingId === item.id}
                    className="flex items-center justify-center rounded-md border border-brand-crimson-400/20 p-1.5 text-brand-crimson-300 hover:bg-brand-crimson-900/20 disabled:opacity-40"
                    aria-label="حذف"
                  >
                    <IconClose className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
