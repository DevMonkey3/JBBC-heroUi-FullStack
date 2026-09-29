import { cn } from "@/lib/utils";

export const inputCls =
  "h-11 w-full rounded-md border bg-white px-3 text-base outline-none focus-visible:ring-3 focus-visible:ring-brand/30 aria-[invalid=true]:border-red-500";

export const textareaCls =
  "w-full rounded-md border bg-white px-3 py-2 text-base outline-none focus-visible:ring-3 focus-visible:ring-brand/30 aria-[invalid=true]:border-red-500";

/** Label + control + optional error for the public forms. */
export function FormField({
  label,
  required,
  error,
  hint,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-medium">
        {label}
        {required && (
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            必須
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
