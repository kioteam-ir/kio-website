import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { Switch } from "../../components/ui/Switch";
import { IconClose } from "../../components/icons";

export function ProjectModal({
  project,
  onClose,
  onDelete,
  onToggleDone,
  mutatingId,
}) {
  return (
    <Modal isOpen={!!project} onClose={onClose}>
      {project && (
        <>
          <div className="flex items-start justify-between border-b border-neutral-800 px-6 pb-4 pt-5">
            <div>
              <h2 className="text-base font-medium text-neutral-100">
                {project.title}
              </h2>
              <p className="mt-0.5 font-mono text-xs text-neutral-500">
                #{project.id} — {project.project_type}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
              aria-label="بستن"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4 px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 font-mono text-xs text-neutral-500">
                  نوع پروژه
                </p>
                <p className="text-sm text-neutral-200">
                  {project.project_type}
                </p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-neutral-500">
                  شماره تلفن
                </p>
                <p className="font-mono text-sm text-neutral-200" dir="ltr">
                  {project.phone_number}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-900/50 px-4 py-3">
              <div>
                <p className="text-sm text-neutral-200">وضعیت پروژه</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {project.is_done
                    ? "این پروژه به عنوان انجام‌شده علامت خورده"
                    : "این پروژه هنوز در حال انجام است"}
                </p>
              </div>
              <Switch
                checked={project.is_done}
                disabled={mutatingId === project.id}
                onChange={(next) => onToggleDone(project.id, next)}
                label="تغییر وضعیت پروژه"
              />
            </div>

            <div className="border-t border-neutral-800 pt-4">
              <p className="mb-2 font-mono text-xs text-neutral-500">توضیحات</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-300">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-neutral-800 px-6 py-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              بستن
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(project.id)}
              disabled={mutatingId === project.id}
            >
              حذف
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
