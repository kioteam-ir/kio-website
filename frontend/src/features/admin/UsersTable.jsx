import { CornerFrame } from "../../components/ui/CornerFrame";
import { IconShield, IconUser } from "../../components/icons";

/** Initial-based avatar (no profile images in the system yet). */
function UserAvatar({ firstName }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-sm text-brand-blue-300">
      {firstName ? firstName.trim().charAt(0) : <IconUser className="h-4 w-4" />}
    </span>
  );
}

export function UsersTable({ users, onSelect }) {
  return (
    <div className="grid gap-2.5">
      {users.map((user) => (
        <CornerFrame
          key={user.id}
          onClick={() => onSelect(user)}
          className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-3 transition-colors hover:bg-white/[0.03]"
        >
          <div className="flex min-w-0 items-center gap-3">
            <UserAvatar firstName={user.first_name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-100">
                {user.first_name} {user.last_name}
              </p>
              <p
                dir="ltr"
                className="truncate text-left font-mono text-xs text-neutral-500"
              >
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {user.is_admin && (
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-brand-crimson-400/30 bg-brand-crimson-900/20 px-2.5 py-1 font-mono text-[11px] text-brand-crimson-300">
                <IconShield className="h-3 w-3" />
                ادمین
              </span>
            )}
            <span
              className="hidden font-mono text-[11px] text-neutral-600 sm:inline"
              dir="ltr"
            >
              #{user.id}
            </span>
          </div>
        </CornerFrame>
      ))}
    </div>
  );
}