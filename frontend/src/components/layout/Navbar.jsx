import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { Button } from "../ui/Button";
import { IconClose, IconMenu, IconUser } from "../icons";
import { cn } from "../../utils/cn";

const NAV_ITEMS = [
  { name: "خانه", to: "/#top" },
  { name: "خدمات", to: "/#services" },
  { name: "فرآیند کار", to: "/#process" },
  { name: "نمونه‌کار", to: "/#projects" },
  { name: "تعرفه‌ها", to: "/#pricing" },
  { name: "تماس با ما", to: "/#contact" },
];

function AuthSlot() {
  const { isChecking, isAuthenticated } = useAuth();

  if (isChecking)
    return <div className="h-10 w-24 animate-pulse rounded-md bg-white/5" />;

  if (isAuthenticated) {
    return (
      <Link
        to="/dashboard"
        className="grad-brand-ring flex h-10 w-10 items-center justify-center rounded-md text-slate-200 transition-transform hover:scale-105"
        aria-label="حساب کاربری"
      >
        <IconUser className="h-5 w-5" />
      </Link>
    );
  }

  return (
    <Button to="/login" size="sm">
      ورود / ثبت‌نام
    </Button>
  );
}

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="fixed top-3 px-3 z-50 w-full" dir="ltr">
      <div className="border-b transition-all rounded-2xl opacity-98 backdrop-blur-[200px] duration-300 border-slate-800 bg-gradient-to-l from-brand-navy-900/60 via-neutral-950 to-brand-crimson-900/60">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-blue-400/50 to-transparent" />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-lg font-bold text-white"
          >
            <img src="/logo.png" alt="Kio" className="h-9 scale-250 w-9" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" dir="rtl">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.to}
                className="group relative rounded-md px-3.5 py-2 font-mono text-md text-slate-300 transition-colors hover:text-white"
              >
                {item.name}
                <span className="absolute inset-x-3 -bottom-0.5 h-px scale-x-0 grad-brand transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <AuthSlot />
          </div>

          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="rounded-md border cursor-pointer border-slate-700 p-2 text-white lg:hidden"
            aria-label="منو"
          >
            {isMobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div
        className={`
    overflow-hidden border-b border-slate-800 bg-gradient-to-l from-brand-navy-900/60 via-neutral-950 to-brand-crimson-900/60 backdrop-blur-md
    transition-all duration-300 ease-out lg:hidden
    ${isMobileOpen ? "max-h-96 opacity-100 py-5" : "max-h-0 opacity-0 py-0"}
  `}
      >
        <div className="px-4">
          <nav className="grid grid-cols-2 gap-2.5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className="rounded-md border border-slate-800 py-3 text-center font-mono text-sm text-slate-300 transition-colors hover:border-brand-blue-400/40 hover:text-brand-blue-300"
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 flex justify-center">
            <AuthSlot />
          </div>
        </div>
      </div>
    </header>
  );
}
