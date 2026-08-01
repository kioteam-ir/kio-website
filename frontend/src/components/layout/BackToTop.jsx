import { useScrollPosition } from "../../hooks/useScrollPosition";
import { IconArrowUp } from "../icons";
import { cn } from "../../utils/cn";

export function BackToTop() {
  const visible = useScrollPosition(500);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="بازگشت به بالا"
      className={cn(
        "grad-brand-ring fixed bottom-6 end-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-slate-100 shadow-lg backdrop-blur transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <IconArrowUp className="h-5 w-5" />
    </button>
  );
}
