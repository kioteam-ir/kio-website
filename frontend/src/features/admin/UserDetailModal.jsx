import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { IconClose, IconEmail, IconPhone, IconShield } from "../../components/icons";

/** Read-only detail modal — the accounts API has no update/delete (yet). */
export function UserDetailModal({ user, onClose }) {
  return (
    <Modal isOpen={!!user} onClose={onClose}>
      {user && (
        <>
          <div className="flex items-start justify-between border-b border-neutral-800 px-6 pb-4 pt-5">
            <div className="min-w-0">
              <h2 className="truncate text-base font-medium text-neutral-100">
                {user.first_name} {user.last_name}
              </h2>
              <p className="mt-0.5 font-mono text-xs text-neutral-500">#{user.id}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
              aria-label="بستن"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3 px-6 py-4">
            <div className="flex items-center gap-3 rounded-md border border-neutral-800 bg-neutral-900/50 px-4 py-3">
              <IconEmail className="h-4 w-4 shrink-0 text-brand-blue-300" />
              <span dir="ltr" className="truncate font-mono text-sm text-neutral-200">
                {user.email}
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-neutral-800 bg-neutral-900/50 px-4 py-3">
              <IconPhone className="h-4 w-4 shrink-0 text-brand-blue-300" />
              {user.phone_number ? (
                <span dir="ltr" className="font-mono text-sm text-neutral-200">
                  {user.phone_number}
                </span>
              ) : (
                <span className="text-sm text-neutral-500">شماره‌ای ثبت نشده</span>
              )}
            </div>

            <div className="flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-900/50 px-4 py-3">
              <div>
                <p className="text-sm text-neutral-200">سطح دسترسی</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {user.is_admin
                    ? "این کاربر دسترسی ادمین دارد"
                    : "کاربر عادی — دسترسی به پنل مدیریت ندارد"}
                </p>
              </div>
              {user.is_admin && (
                <span className="inline-flex items-center gap-1 rounded-full border border-brand-crimson-400/30 bg-brand-crimson-900/20 px-2.5 py-1 font-mono text-[11px] text-brand-crimson-300">
                  <IconShield className="h-3 w-3" />
                  ادمین
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-neutral-800 px-6 py-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              بستن
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}