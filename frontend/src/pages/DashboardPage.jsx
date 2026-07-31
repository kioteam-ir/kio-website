import { MainLayout } from "../components/layout/MainLayout";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { CornerFrame } from "../components/ui/CornerFrame";
import { useAuth } from "../hooks/useAuth";

/**
 * Placeholder dashboard — wire this up to real user/project data once the
 * corresponding backend endpoints exist. Layout, auth guard, and logout
 * are already fully functional.
 */
export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <MainLayout>
      <Container as="section" dir="rtl" className="min-h-[70vh] py-24">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs tracking-widest text-amber-400/80">KIO / ACCOUNT</span>
            <h1 className="mt-1 text-2xl font-bold text-white">داشبورد کاربری</h1>
          </div>
          <Button variant="danger" size="sm" onClick={logout}>خروج از حساب</Button>
        </div>

        <CornerFrame className="mt-8 max-w-lg rounded-lg border border-dashed border-slate-800 bg-slate-900/30 p-6">
          <p className="text-sm leading-7 text-slate-400">
            این صفحه آماده اتصال به داده‌های واقعی کاربر است — پروژه‌ها، فاکتورها و تنظیمات حساب را
            اینجا اضافه کنید.
          </p>
        </CornerFrame>
      </Container>
    </MainLayout>
  );
}
