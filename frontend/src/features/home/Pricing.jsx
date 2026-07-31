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
        index="03"
        eyebrow="تعرفه‌ها"
        title="پلن مناسب پروژه‌تان را انتخاب کنید"
        description="قیمت‌ها برآورد اولیه هستند؛ برای هر پروژه پیش‌فاکتور دقیق بعد از جلسه اول ارسال می‌شود."
      />

      <div className="mt-16 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <CornerFrame
            key={plan.id}
            tone={plan.highlighted ? "amber" : "teal"}
            className={cn(
              "flex flex-col rounded-lg border p-7",
              plan.highlighted ? "border-amber-400/40 bg-amber-400/[0.04]" : "border-dashed border-slate-800 bg-slate-900/30",
            )}
          >
            {plan.highlighted && (
              <span className="mb-4 inline-block w-fit rounded-full bg-amber-400 px-3 py-1 font-mono text-xs font-bold text-slate-950">
                پیشنهاد ویژه
              </span>
            )}
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
            <p className="mt-4 font-mono text-2xl font-bold text-amber-400">{plan.price}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
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
