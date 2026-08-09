import { NavLink } from "react-router-dom";
import { Button } from "../ui/Button";
import { IconEmail, IconLayers, IconLogout } from "../icons";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { label: "پروژه‌ها", to: "/admin", icon: IconLayers, end: true },
  { label: "ایمیل‌ها", to: "/admin/emails", icon: IconEmail, end: true },
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
 * Admin chrome: a fixed sidebar on desktop, a fixed bottom bar on mobile.
 * Kept deliberately simple — two sections today (Projects / Emails), no
 * collapsing, no nested menus. Both surfaces share the same NAV_ITEMS so
 * adding a third admin section later is a one-line change in both places.
 */
export function AdminLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div dir="rtl" className="min-h-screen bg-neutral-950 text-white">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-60 flex-col border-e border-neutral-800 bg-neutral-950/95 md:flex">
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

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/95 px-4 py-3 backdrop-blur md:hidden">
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

      {/* Content */}
      <main className="pb-20 md:ms-60 md:pb-0">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-neutral-800 bg-neutral-950/95 backdrop-blur md:hidden">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.to}
            item={item}
            className="flex-1 flex-col gap-1 rounded-none py-2.5 text-[11px]"
          />
        ))}
      </nav>
    </div>
  );
}
