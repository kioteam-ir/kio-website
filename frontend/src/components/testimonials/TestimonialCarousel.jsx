import { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "../icons";
import { CornerFrame } from "../ui/CornerFrame";

const SHUFFLE_TIME = 15;

export function TestimonialCarousel({ testimonials, autoplay = true }) {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    if (!autoplay) return undefined;

    const id = setInterval(next, SHUFFLE_TIME * 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const current = testimonials[active];

  return (
    <div className="mx-auto max-w-4xl">
      <CornerFrame className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-4 sm:p-6">
        <div className="grid min-h-[500px] grid-cols-1 gap-6 md:min-h-[450px] md:grid-cols-2 md:gap-10">
          {/* Image - responsive sizing with smooth transition */}
          <div className="relative h-56 w-full flex-shrink-0 overflow-hidden rounded-md sm:h-64 md:h-auto">
            <div className="relative h-full w-full">
              <img
                key={current.src}
                src={current.src}
                alt={current.name}
                draggable={false}
                className={`h-full w-full object-cover object-center transition-all duration-500 ease-in-out ${
                  isTransitioning
                    ? "scale-105 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              />
              {/* Optional fade overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent transition-opacity duration-500 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>

          {/* Content - responsive sizing with smooth transition */}
          <div className="flex min-h-[280px] flex-col justify-between md:min-h-[320px]">
            <div key={active} className="relative overflow-hidden">
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isTransitioning
                    ? "-translate-y-4 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  {current.name}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-brand-blue-300 md:mt-2 md:text-sm">
                  {current.designation}
                </p>
                {/* Fixed quote height with scroll if needed */}
                <div className="mt-3 h-[180px] overflow-y-auto md:h-[250px]">
                  <p className="text-base leading-7 text-slate-300 md:text-lg md:leading-8">
                    {current.quote}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col gap-4 pt-4 transition-all duration-500 delay-100 flex-row items-center justify-between pt-6 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex gap-2">
                <button
                  onClick={next}
                  disabled={isTransitioning}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-slate-700 text-slate-300 transition-colors hover:border-brand-blue-400/50 hover:text-brand-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="بعدی"
                >
                  <IconArrowRight />
                </button>
                <button
                  onClick={prev}
                  disabled={isTransitioning}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-slate-700 text-slate-300 transition-colors hover:border-brand-blue-400/50 hover:text-brand-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="قبلی"
                >
                  <IconArrowLeft />
                </button>
              </div>

              <a
                href={current.website}
                target="_blank"
                rel="noopener noreferrer"
                className="grad-brand-text w-fit truncate rounded-2xl border-2 border-slate-700 px-3 py-1.5 pb-2 text-xs font-semibold transition-transform hover:scale-105 sm:text-sm"
              >
                صفحه شخصی {String(current.name).split(" ")[0]}
              </a>
            </div>
          </div>
        </div>
      </CornerFrame>
    </div>
  );
}
