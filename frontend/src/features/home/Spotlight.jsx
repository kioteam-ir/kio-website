import { Container } from "../../components/ui/Container";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { Button } from "../../components/ui/Button";
import { SPOTLIGHT } from "./data/spotlight";

/**
 * A single flagship case study, pulled out of the generic project grid and
 * given room to breathe — the "proof" section that shows real outcomes
 * (timeline, conversion lift, active users) instead of just a screenshot.
 */
export function Spotlight() {
  return (
    <Container as="section" dir="rtl" className="py-16">
      <CornerFrame className="grid gap-10 rounded-lg border border-dashed border-slate-800 bg-slate-900/30 p-6 lg:grid-cols-2 lg:p-10">
        <div className="overflow-hidden rounded-md border border-slate-800">
          <img
            src={SPOTLIGHT.image}
            alt={SPOTLIGHT.title}
            className="h-72 w-full object-contain lg:h-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-3 w-fit rounded-full border border-brand-blue-400/30 px-3 py-1 font-mono text-xs text-brand-blue-300">
            {SPOTLIGHT.tag}
          </span>
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            {SPOTLIGHT.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            {SPOTLIGHT.description}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-slate-800 py-6">
            {SPOTLIGHT.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="grad-brand-text font-mono text-xl font-bold sm:text-2xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <blockquote className="mt-6 border-e-2 border-brand-crimson-400/40 pe-4 text-sm italic leading-7 text-slate-300">
            «{SPOTLIGHT.quote}»
            <footer className="mt-2 font-mono text-xs not-italic text-slate-500">
              {SPOTLIGHT.quoteAuthor}
            </footer>
          </blockquote>

          <Button href={SPOTLIGHT.url} variant="outline" className="mt-8 w-fit">
            مشاهده کامل پروژه ←
          </Button>
        </div>
      </CornerFrame>
    </Container>
  );
}
