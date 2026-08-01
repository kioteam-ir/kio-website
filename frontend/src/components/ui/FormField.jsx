import { Label } from "./Label";

/** Label + input/textarea + inline error message, in one place. */
export function FormField({ id, label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
