import { useEffect } from "react";

/**
 * Fires `handler` when a pointer event happens outside `ref.current`.
 * Used to close menus/modals without any external dependency.
 */
export function useClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return undefined;

    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, active]);
}
