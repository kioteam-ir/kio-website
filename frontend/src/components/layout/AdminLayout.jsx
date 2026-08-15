import { NavLink } from "react-router-dom";
import { Button } from "../ui/Button";
import { IconEmail, IconLayers, IconLogout, IconTarget } from "../icons";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { label: "پروژه‌ها", to: "/admin", icon: IconLayers, end: true },
  { label: "ایمیل‌ها", to: "/admin/emails", icon: IconEmail, end: true },
  { label: "محتوای سایت/سئو", to: "/admin/seo", icon: IconTarget, end: true },
];

function NavItem({ item, className }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm transition-colors",
          isActive
            ? "grad-brand text-white"
            : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200",
          className,
        )
      }
    >
      <item.icon className="h-4 w-4 shrink-0" />
      {item.label}
    </NavLink>
  );
}

/**
 * Admin shell — sidebar on large screens, top bar + bottom tab bar on
 * small screens. Layout mechanism: a plain flex row (`lg:flex` on the
 * outer div), sidebar and content are flex siblings. The sidebar uses
 * `sticky top-0 h-screen`, not `fixed` — sticky participates in normal
 * layout flow, so there's no manual margin/offset to keep in sync with
 * the sidebar's width. That offset math was the actual fragile part in
 * every earlier version of this file.
 */
export function AdminLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div dir="rtl" className="min-h-screen bg-neutral-950 text-white lg:flex">
      {/* Sidebar — large screens only */}
      <aside className="hidden w-60 shrink-0 border-e border-neutral-800 bg-neutral-950/95 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="flex items-center gap-2.5 border-b border-neutral-800 px-5 py-5">
          <img src="/logo.png" alt="Kio" className="h-8 w-8" />
          <div>
            <p className="text-sm font-bold text-white">Kio Admin</p>
            <p className="font-mono text-[11px] text-neutral-500">پنل مدیریت</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} item={item} />
          ))}
        </nav>

        <div className="border-t border-neutral-800 p-3">
          <Button
            variant="danger"
            size="sm"
            onClick={logout}
            className="w-full"
          >
            <IconLogout className="h-4 w-4" />
            خروج از حساب
          </Button>
        </div>
      </aside>

      {/* Content column */}
      <div className="min-w-0 flex-1">
        {/* Top bar — small screens only */}
        <header className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/95 px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Kio" className="h-7 w-7" />
            <span className="text-sm font-bold text-white">Kio Admin</span>
          </div>
          <button
            onClick={logout}
            aria-label="خروج"
            className="flex h-8 w-8 items-center justify-center rounded-md text-brand-crimson-300 hover:bg-brand-crimson-900/20"
          >
            <IconLogout className="h-4 w-4" />
          </button>
        </header>

        <main className="pb-20 lg:pb-0 sticky">{children}</main>

        {/* Bottom tab bar — small screens only */}
        <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-neutral-800 bg-neutral-950/95 backdrop-blur lg:hidden">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.to}
              item={item}
              className="flex-1 flex-col gap-1 rounded-none py-2.5 text-[11px]"
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
