import { SectionHeading } from "../../components/ui/SectionHeading";
import { Container } from "../../components/ui/Container";
import { PROCESS_STEPS } from "./data/process";

export function Process() {
  return (
    <Container as="section" id="process" dir="rtl" className="py-20">
      <SectionHeading index="02" eyebrow="فرآیند کار" title="چطور کار می‌کنیم" />

      <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-5">
        <div className="absolute inset-x-0 top-6 hidden h-px grad-brand opacity-30 md:block" aria-hidden="true" />
        {PROCESS_STEPS.map((item) => (
          <div key={item.step} className="relative">
            <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-950 font-mono text-sm text-slate-200">
              {item.step}
            </div>
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
