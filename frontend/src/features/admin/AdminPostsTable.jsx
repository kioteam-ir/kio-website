import { cn } from "../../utils/cn";
import { formatDate } from "../../utils/formatDate";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { Dropdown } from "../../components/ui/Dropdown";
import { IconEye, IconTrash } from "../../components/icons";
import { POST_STATUS_LABELS } from "./hooks/useAdminPosts";

const STATUS_STYLES = {
  waiting:
    "border-brand-blue-400/30 bg-brand-blue-400/10 text-brand-blue-300",
  published:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  rejected:
    "border-brand-crimson-400/30 bg-brand-crimson-900/20 text-brand-crimson-300",
};

const STATUS_BAR = {
  waiting: "bg-brand-blue-400/70",
  published: "bg-emerald-500/70",
  rejected: "bg-brand-crimson-400/70",
};

export function PostStatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px]",
        STATUS_STYLES[status] ?? STATUS_STYLES.waiting,
      )}
    >
      {POST_STATUS_LABELS[status] ?? status}
    </span>
  );
}

/**
 * Row-per-post admin list (same layout strategy as ProjectsTable: one
 * flexbox layout for every screen size, no table/card switch).
 */
export function AdminPostsTable({ posts, onSelect, onDelete, mutatingId }) {
  return (
    <div className="grid gap-3">
      {posts.map((post) => (
        <CornerFrame
          key={post.id}
          onClick={() => onSelect(post)}
          className="relative cursor-pointer overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40 ps-4 pe-3 py-3.5 transition-colors hover:bg-white/[0.03]"
        >
          <span
            className={cn(
              "absolute inset-y-0 start-0 w-[3px]",
              STATUS_BAR[post.status] ?? STATUS_BAR.waiting,
            )}
            aria-hidden="true"
          />

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="truncate text-sm font-medium text-neutral-100">
                  {post.title}
                </h3>
                <span
                  dir="ltr"
                  className="font-mono text-[11px] text-neutral-500"
                >
                  /{post.slug}
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-xs leading-6 text-neutral-400">
                {post.summary}
              </p>
              <span
                dir="ltr"
                className="mt-1 inline-block font-mono text-xs text-neutral-500"
              >
                {formatDate(post.created_at)}
              </span>
            </div>

            <div
              className="flex shrink-0 items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <PostStatusBadge status={post.status} />
              <Dropdown
                items={[
                  { label: "مشاهده جزئیات", icon: IconEye, onClick: () => onSelect(post) },
                  {
                    label: "حذف مقاله",
                    icon: IconTrash,
                    destructive: true,
                    disabled: mutatingId === post.id,
                    onClick: () => onDelete(post.id),
                  },
                ]}
              />
            </div>
          </div>
        </CornerFrame>
      ))}
    </div>
  );
}