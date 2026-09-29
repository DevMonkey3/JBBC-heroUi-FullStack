import { jstInputToDate } from "@/lib/dates";

/**
 * The optional publish-date field of the admin forms.
 * Empty → null (keep the stored value, or the default "now" on create).
 * Invalid → false so the caller can report a field error.
 */
export function parsePublishedAt(value: string | undefined): Date | null | false {
  if (!value) return null;
  return jstInputToDate(value) ?? false;
}
