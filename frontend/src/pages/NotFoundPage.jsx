import { MainLayout } from "../components/layout/MainLayout";
import { Button } from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <MainLayout showChrome={false}>
      <section dir="rtl" className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 font-mono text-xs tracking-widest text-amber-400/80">ERROR / 404</span>
        <h1 className="mb-4 text-7xl font-extrabold text-white lg:text-9xl">
          ۴<span className="text-amber-400">۰</span>۴
        </h1>
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">صفحه مورد نظر پیدا نشد</h2>
        <p className="mb-8 max-w-xl text-lg leading-loose text-slate-400">
          متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است. برای ادامه
          می‌توانید به صفحه اصلی بازگردید.
        </p>
        <img src="/404-computer.svg" alt="صفحه پیدا نشد" className="mb-8 w-full max-w-md" />
        <Button to="/" size="lg">بازگشت به صفحه اصلی</Button>
      </section>
    </MainLayout>
  );
}
