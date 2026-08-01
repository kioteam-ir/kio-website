import { Marquee } from "../../components/marquee/Marquee";
import { Container } from "../../components/ui/Container";
import { TECHNOLOGIES } from "./data/technologies";

export function TechStack() {
  return (
    <Container as="section" dir="rtl" className="py-14 mt-20">
      <p className="mb-8 text-center font-mono text-sm tracking-widest text-slate-600">
        ابزارها و فناوری‌هایی که با آن‌ها کار می‌کنیم
      </p>
      <Marquee
        items={TECHNOLOGIES}
        renderItem={(tech) => (
          <div className="flex w-[130px] shrink-0 flex-col items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/40 px-5 py-5">
            <img src={tech.icon} alt={tech.title} className="h-9 w-9" />
            <span className="font-mono text-xs text-slate-500">
              {tech.title}
            </span>
          </div>
        )}
      />
    </Container>
  );
}
