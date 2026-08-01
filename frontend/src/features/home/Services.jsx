import { SectionHeading } from "../../components/ui/SectionHeading";
import { Container } from "../../components/ui/Container";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { SERVICES } from "./data/services";

export function Services() {
  return (
    <Container as="section" id="services" dir="rtl" className="py-20">
      <SectionHeading
        index="01"
        eyebrow="خدمات"
        title="خدمات ما"
        description={
          <>
            ساختن یک تیم برای پروژه شما خوب است، اما داشتن یک{" "}
            <span className="font-semibold text-slate-200">سازمان‌دهی دقیق و بدون نقص</span> بهتر
            است؛ چون باعث افزایش بهره‌وری، صرفه‌جویی در زمان و خلق ایده‌های نو می‌شود.
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <CornerFrame
            key={service.id}
            className="rounded-lg border border-dashed border-slate-800 bg-slate-900/30 p-6 transition-colors hover:border-slate-700"
          >
            <span className="font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>
            <div className="my-4 flex h-12 w-12 items-center justify-center rounded-md bg-white/5 text-2xl">{service.icon}</div>
            <h3 className="text-lg font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">{service.description}</p>
          </CornerFrame>
        ))}
      </div>
    </Container>
  );
}
