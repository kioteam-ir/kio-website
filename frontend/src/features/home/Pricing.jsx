import { SectionHeading } from "../../components/ui/SectionHeading";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { CornerFrame } from "../../components/ui/CornerFrame";
import { IconCheck } from "../../components/icons";
import { cn } from "../../utils/cn";
import { PRICING_PLANS } from "./data/pricing";

export function Pricing() {
  return (
    <Container as="section" id="pricing" dir="rtl" className="py-20">
      <SectionHeading
        index="04"
        eyebrow="تعرفه‌ها"
        title="پلن مناسب پروژه‌تان را انتخاب کنید"
        description="قیمت‌ها برآورد اولیه هستند؛ برای هر پروژه پیش‌فاکتور دقیق بعد از جلسه اول ارسال می‌شود."
      />

      <div className="mt-16 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <CornerFrame
            key={plan.id}
            className={cn(
              "flex flex-col rounded-lg p-7",
              plan.highlighted
                ? "grad-brand-ring bg-slate-900/50"
                : "border border-dashed border-slate-800 bg-slate-900/30",
            )}
          >
            {plan.highlighted && (
              <span className="grad-brand mb-4 inline-block w-fit rounded-full px-3 py-1 font-mono text-xs font-bold text-white">
                پیشنهاد ویژه
              </span>
            )}
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
            <p className="mt-4 font-mono text-2xl font-bold text-white">{plan.price}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button href="#contact" variant={plan.highlighted ? "primary" : "outline"} className="mt-8 w-full">
              شروع همکاری
            </Button>
          </CornerFrame>
        ))}
      </div>
    </Container>
  );
}
