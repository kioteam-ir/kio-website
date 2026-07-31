import { formatDate } from "../../utils/formatDate";

export function SubmissionsTable({ submissions, onSelect, onDelete }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/40">
      <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr className="border-b border-slate-800">
            <th className="w-10 px-4 py-3 text-start font-mono text-xs font-medium text-slate-500">#</th>
            <th className="w-32 px-4 py-3 text-start font-mono text-xs font-medium text-slate-500">نام</th>
            <th className="w-44 px-4 py-3 text-start font-mono text-xs font-medium text-slate-500">شماره تلفن</th>
            <th className="px-4 py-3 text-start font-mono text-xs font-medium text-slate-500">موضوع</th>
            <th className="w-36 px-4 py-3 text-start font-mono text-xs font-medium text-slate-500">تاریخ</th>
            <th className="w-28 px-4 py-3 text-end font-mono text-xs font-medium text-slate-500">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((item, index) => (
            <tr key={item.id ?? index} onClick={() => onSelect(item)} className="cursor-pointer border-b border-slate-800/60 last:border-0 hover:bg-white/[0.03]">
              <td className="px-4 py-3 text-slate-500">{index + 1}</td>
              <td className="truncate px-4 py-3 text-slate-200">{item.title}</td>
              <td className="truncate px-4 py-3 font-mono text-slate-400" dir="ltr">{item.phone_number}</td>
              <td className="truncate px-4 py-3 text-slate-300">
                {String(item.description).slice(0, 30)}
                {item.description?.length > 30 ? "..." : ""}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{formatDate(item.createdAt)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => onSelect(item)} className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-amber-400/40 hover:text-amber-300">
                    مشاهده
                  </button>
                  <button onClick={() => onDelete(item.id)} className="rounded-md border border-rose-500/20 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10">
                    حذف
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
