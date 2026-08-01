import { Button } from "../../components/ui/Button";
import { Container } from "../../components/ui/Container";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { STATS } from "./data/stats";

const TAGS = ["React", "FastAPI", "Docker", "Tailwind CSS"];

export function Hero() {
  return (
    <Container
      as="section"
      id="top"
      dir="rtl"
      className="relative overflow-hidden pt-10 md:pt-24"
    >
      <div className="relative flex flex-col items-center gap-14 md:flex-row md:items-start md:justify-between">
        <div className="w-full max-w-xl space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3.5 py-1.5 font-mono text-xs text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full grad-brand" />
            در دسترس برای پروژه‌های جدید
          </div>

          <div>
            <span className="font-mono text-sm tracking-widest text-slate-500">
              KIO / SOFTWARE STUDIO
            </span>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
              محصولات دیجیتال را
              <br />
              مثل یک <span className="grad-brand-text">نقشه مهندسی</span>{" "}
              می‌سازیم.
            </h1>
          </div>

          <p className="max-w-lg text-base leading-8 text-slate-400">
            تیم کایو ارائه‌دهنده خدمات تولید نرم‌افزارهای تحت وب و میزبانی است.
            هدف ما ایجاد و ارتقاء جایگاه کسب‌وکار شما در دنیای وب است — با
            معماری تمیز، کد قابل‌نگهداری و پشتیبانی بی‌وقفه.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="#contact" size="lg">
              شروع پروژه
            </Button>
            <Button href="#projects" variant="outline" size="lg">
              مشاهده نمونه‌کارها
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded border border-slate-800 px-2.5 py-1 font-mono text-xs text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full relative max-w-md md:max-w-lg animate-[float_4s_ease-in-out_infinite]">
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-20 right-30 h-[32rem] w-[32rem] rotate-12 opacity-[0.2] "
          />
          <img
            src="/404-computer.svg"
            alt="Kio illustration"
            className="w-full"
          />
        </div>
      </div>

      <div className="relative mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mt-24">
        {STATS.map((stat) => (
          <CornerFrame
            key={stat.label}
            className="rounded-lg border border-dashed border-slate-800 px-4 py-6 text-center transition-colors hover:border-slate-700"
          >
            <div className="font-mono text-2xl font-bold text-white sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-slate-500 sm:text-sm">
              {stat.label}
            </div>
          </CornerFrame>
        ))}
      </div>
    </Container>
  );
}
