import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { formatDate } from "../../utils/formatDate";
import { IconClose } from "../../components/icons";

export function SubmissionModal({ submission, onClose, onDelete }) {
  return (
    <Modal isOpen={!!submission} onClose={onClose}>
      {submission && (
        <>
          <div className="flex items-start justify-between border-b border-slate-800 px-6 pb-4 pt-5">
            <div>
              <h2 className="text-base font-medium text-slate-100">{submission.title}</h2>
              <p className="mt-0.5 font-mono text-xs text-slate-500">#{submission.id}</p>
            </div>
            <button onClick={onClose} className="rounded-md p-1 text-slate-500 hover:bg-white/5 hover:text-slate-300" aria-label="بستن">
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4 px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 font-mono text-xs text-slate-500">نام</p>
                <p className="text-sm text-slate-200">{submission.title}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-slate-500">شماره تلفن</p>
                <p className="font-mono text-sm text-slate-200" dir="ltr">{submission.phone_number}</p>
              </div>
            </div>

            <div>
              <p className="mb-1 font-mono text-xs text-slate-500">تاریخ</p>
              <p className="text-sm text-slate-200">{formatDate(submission.createdAt)}</p>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <p className="mb-2 font-mono text-xs text-slate-500">پیام</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{submission.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-800 px-6 py-4">
            <Button variant="ghost" size="sm" onClick={onClose}>بستن</Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(submission.id)}>حذف</Button>
          </div>
        </>
      )}
    </Modal>
  );
}
