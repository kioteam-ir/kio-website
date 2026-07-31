import { useState } from "react";
import { IconChevronDown } from "../icons";
import { cn } from "../../utils/cn";

/** Single-open accordion. No external dependency — just a bit of state. */
export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-slate-800 rounded-lg border border-slate-800">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-slate-100">{item.question}</span>
              <IconChevronDown className={cn("h-5 w-5 shrink-0 text-amber-400 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            <div className={cn("grid transition-all duration-200 ease-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-7 text-slate-400">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
