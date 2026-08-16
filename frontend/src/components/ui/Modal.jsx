import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { cn } from "../../utils/cn";

export function Modal({ isOpen, onClose, className, children }) {
  const panelRef = useRef(null);
  useClickOutside(panelRef, onClose, isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div ref={panelRef} className={cn("mx-4 w-full max-w-lg overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-2xl animate-scale-in", className)}>
        {children}
      </div>
    </div>
  );
}
