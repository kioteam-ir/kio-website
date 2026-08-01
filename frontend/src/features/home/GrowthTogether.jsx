import { Button } from "../../components/ui/Button";
import { Container } from "../../components/ui/Container";
import { CornerFrame } from "../../components/ui/CornerFrame";

export function GrowthTogether() {
  return (
    <Container as="section" dir="rtl" className="py-20">
      <CornerFrame className="grid items-center gap-10 rounded-lg border border-dashed border-slate-800 bg-slate-900/30 p-8 lg:grid-cols-3 lg:p-12">
        <div className="hidden overflow-hidden rounded-md border border-slate-800 lg:block">
          <img src="/grow-w.png" alt="" className="h-[24rem] w-full object-cover" />
        </div>

        <div className="space-y-6 text-center lg:col-span-1">
          <span className="font-mono text-xs tracking-widest text-slate-500">// PARTNERSHIP</span>
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">با هم رشد کنیم.</h2>
          <p className="text-base leading-8 text-slate-400 lg:text-lg">
            شما دانش ارزشمندی درباره بازار و خدمات خود در اختیار دارید. این اطلاعات برای ما اهمیت
            زیادی دارد، زیرا یک راهکار دیجیتال موفق با همکاری و تعامل ساخته می‌شود. به همین دلیل هیچ
            پروژه‌ای بدون یک جلسه آغازین دقیق شروع نمی‌شود.
          </p>
          <Button href="#contact">تماس با ما</Button>
        </div>

        <div className="hidden overflow-hidden rounded-md border border-slate-800 lg:block">
          <img src="/grow-m.png" alt="" className="h-[24rem] w-full object-cover" />
        </div>
      </CornerFrame>
    </Container>
  );
}
