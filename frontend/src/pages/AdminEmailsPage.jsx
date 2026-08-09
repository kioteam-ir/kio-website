import { AdminLayout } from "../components/layout/AdminLayout";
import { Container } from "../components/ui/Container";
import { CornerFrame } from "../components/ui/CornerFrame";
import { Alert } from "../components/ui/Alert";
import { IconEmail } from "../components/icons";
import {
  MOCK_EMAIL_STATS,
  MOCK_RECENT_SUBSCRIBERS,
} from "../features/admin/data/mockEmailStats";

function StatCard({ label, value, suffix }) {
  return (
    <CornerFrame className="rounded-lg border border-dashed border-neutral-800 bg-neutral-900/40 p-5">
      <p className="font-mono text-xs text-neutral-500">{label}</p>
      <p className="mt-2 font-mono text-2xl font-bold sm:text-3xl">
        <span className="grad-brand-text">{value}</span>
        {suffix && (
          <span className="ms-1 text-base text-neutral-500">{suffix}</span>
        )}
      </p>
    </CornerFrame>
  );
}

export default function AdminEmailsPage() {
  return (
    <AdminLayout>
      <Container dir="rtl" className="min-h-screen py-6 sm:py-8">
        <div className="mb-5 sm:mb-6">
          <h1 className="text-lg font-medium text-neutral-100 sm:text-xl">
            اشتراک ایمیل وبلاگ
          </h1>
          <p className="mt-0.5 text-xs text-neutral-500 sm:text-sm">
            آمار کاربرانی که برای دریافت مطالب جدید ثبت‌نام کرده‌اند
          </p>
        </div>

        <Alert tone="info" className="mb-6 text-start">
          بک‌اند هنوز endpoint برای دریافت لیست و آمار ایمیل‌ها ندارد — اعداد
          زیر نمونه هستند و فقط برای پیش‌نمایش طراحی UI قرار داده شده‌اند.
        </Alert>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="کل مشترکین" value={MOCK_EMAIL_STATS.total} />
          <StatCard
            label="مشترک جدید (۷ روز اخیر)"
            value={`+${MOCK_EMAIL_STATS.newThisWeek}`}
          />
          <StatCard
            label="نرخ رشد ماهانه"
            value={MOCK_EMAIL_STATS.growthPercent}
            suffix="%"
          />
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-neutral-300">
              آخرین مشترکین
            </h2>
            <span className="rounded-full border border-neutral-800 px-2.5 py-1 font-mono text-[10px] text-neutral-500">
              نمونه
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40 opacity-90">
            <ul className="divide-y divide-neutral-800/70">
              {MOCK_RECENT_SUBSCRIBERS.map((sub) => (
                <li
                  key={sub.email}
                  className="flex items-center justify-between gap-3 px-4 py-3.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-brand-blue-300">
                      <IconEmail className="h-3.5 w-3.5" />
                    </span>
                    <span
                      dir="ltr"
                      className="truncate text-sm text-neutral-300"
                    >
                      {sub.email}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-neutral-500">
                    {sub.subscribedAt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </AdminLayout>
  );
}
