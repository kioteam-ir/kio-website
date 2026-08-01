import { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "../icons";
import { CornerFrame } from "../ui/CornerFrame";

export function TestimonialCarousel({ testimonials, autoplay = false }) {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return undefined;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const current = testimonials[active];

  return (
    <div className="mx-auto max-w-4xl">
      <CornerFrame className="grid grid-cols-1 gap-10 rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-6 md:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-md">
          <img
            key={current.src}
            src={current.src}
            alt={current.name}
            draggable={false}
            className="h-full w-full animate-fade-in object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div key={active} className="animate-fade-in">
            <h3 className="text-2xl font-bold text-white">{current.name}</h3>
            <p className="font-mono text-sm text-brand-blue-300">
              {current.designation}
            </p>
            <p className="mt-3 text-lg leading-8 text-slate-300">
              {current.quote}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6">
            <div className="flex gap-2">
              <button
                onClick={next}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-slate-300 transition-colors hover:border-brand-blue-400/50 hover:text-brand-blue-300"
                aria-label="بعدی"
              >
                <IconArrowRight />
              </button>
              <button
                onClick={prev}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 text-slate-300 transition-colors hover:border-brand-blue-400/50 hover:text-brand-blue-300"
                aria-label="قبلی"
              >
                <IconArrowLeft />
              </button>
            </div>

            <a
              href={current.website}
              target="_blank"
              rel="noopener noreferrer"
              className="grad-brand-text border-2 border-slate-700 px-3 py-1.5 rounded-2xl pb-2 truncate text-sm font-semibold transition-transform hover:scale-105"
            >
              صفحه شخصی {String(current.name).split(" ")[0]}
            </a>
          </div>
        </div>
      </CornerFrame>
    </div>
  );
}
