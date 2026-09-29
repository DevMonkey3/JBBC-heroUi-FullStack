import { Label } from "@/components/ui/label";

/** Label, required badge, and either an error or a hint under the control. */
export function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2">
        {label}
        {required && (
          <span className="bg-accent-brand rounded px-1.5 py-0.5 text-[10px] font-bold text-white">
            必須
          </span>
        )}
      </Label>
      {children}
      {error ? (
        <p className="text-destructive text-xs">{error}</p>
      ) : hint ? (
        <p className="text-muted-foreground text-xs">{hint}</p>
      ) : null}
    </div>
  );
}
