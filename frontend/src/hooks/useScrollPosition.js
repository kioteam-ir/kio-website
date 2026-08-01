import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past `threshold`.
 * Replaces the previous framer-motion `useMotionValueEvent(scrollY, ...)`
 * with a plain passive scroll listener.
 */
export function useScrollPosition(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
