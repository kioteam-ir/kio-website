import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { IconClose } from "../../components/icons";
import { formatDate } from "../../utils/formatDate";
import { PostStatusBadge } from "./AdminPostsTable";

/**
 * Detail + moderation modal for a single post. The three moderation
 * actions are mutually exclusive buttons — the button matching the
 * current status is disabled, so an admin can't "re-publish" an
 * already published post by accident.
 */
export function PostDetailModal({ post, onClose, onDelete, onModerate, mutatingId }) {
  const busy = mutatingId !== null && mutatingId === post?.id;

  return (
    <Modal isOpen={!!post} onClose={onClose}>
      {post && (
        <>
          <div className="flex items-start justify-between gap-3 border-b border-neutral-800 px-6 pb-4 pt-5">
            <div className="min-w-0">
              <h2 className="truncate text-base font-medium text-neutral-100">
                {post.title}
              </h2>
              <p dir="ltr" className="mt-0.5 font-mono text-xs text-neutral-500">
                #{post.id} — /{post.slug}
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
                <p className="mb-1 font-mono text-xs text-neutral-500">وضعیت</p>
                <PostStatusBadge status={post.status} />
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-neutral-500">تاریخ ایجاد</p>
                <p dir="ltr" className="font-mono text-sm text-neutral-200">
                  {formatDate(post.created_at)}
                </p>
              </div>
            </div>

            <div className="rounded-md border border-neutral-800 bg-neutral-900/50 px-4 py-3">
              <p className="mb-1 font-mono text-xs text-neutral-500">خلاصه</p>
              <p className="text-sm leading-7 text-neutral-300">{post.summary}</p>
            </div>

            <div className="border-t border-neutral-800 pt-4">
              <p className="mb-2 font-mono text-xs text-neutral-500">متن مقاله</p>
              <div className="max-h-64 space-y-3 overflow-y-auto pe-1">
                {String(post.content ?? "")
                  .split(/\n{2,}/)
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="whitespace-pre-wrap text-sm leading-7 text-neutral-300"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 px-6 py-4">
            <p className="mb-2.5 font-mono text-xs text-neutral-500">اقدام بازبینی</p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                disabled={busy || post.status === "published"}
                onClick={() => onModerate(post.id, "published")}
              >
                انتشار
              </Button>
              <Button
                variant="danger"
                size="sm"
                disabled={busy || post.status === "rejected"}
                onClick={() => onModerate(post.id, "rejected")}
              >
                رد کردن
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={busy || post.status === "waiting"}
                onClick={() => onModerate(post.id, "waiting")}
              >
                بازگشت به انتظار
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-neutral-800 px-6 py-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              بستن
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(post.id)}
              disabled={busy}
            >
              حذف
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}