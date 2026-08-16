/**
 * Tiny className joiner — the one bit of "shadcn glue code" we keep,
 * rewritten with zero dependencies.
 */
export function cn(...values) {
  return values.flat().filter(Boolean).join(" ");
}
