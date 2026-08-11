import { CornerFrame } from "../../components/ui/CornerFrame";
import { Dropdown } from "../../components/ui/Dropdown";
import { IconEmail, IconTrash } from "../../components/icons";

export function SubscriptionsList({ subscriptions, onDelete, mutatingId }) {
  return (
    <div className="grid gap-2.5">
      {subscriptions.map((sub) => (
        <CornerFrame
          key={sub.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-3"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-brand-blue-300">
              <IconEmail className="h-3.5 w-3.5" />
            </span>
            <span dir="ltr" className="truncate text-sm text-neutral-300">
              {sub.email}
            </span>
          </div>

          <Dropdown
            items={[
              {
                label: "حذف اشتراک",
                icon: IconTrash,
                destructive: true,
                disabled: mutatingId === sub.id,
                onClick: () => onDelete(sub.id),
              },
            ]}
          />
        </CornerFrame>
      ))}
    </div>
  );
}
