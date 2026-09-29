const TZ = "Asia/Tokyo";

export function formatDate(date: Date | string, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: TZ,
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  }).format(new Date(date));
}

/** 2026年10月5日(日) */
export function formatDateWeekday(date: Date | string) {
  return formatDate(date, { weekday: "short" });
}

/** 14:00 */
export function formatTime(date: Date | string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string) {
  return formatDate(date, { hour: "2-digit", minute: "2-digit" });
}

/** True once the given end time is in the past. */
export function hasEnded(endsAt: Date | string): boolean {
  return new Date(endsAt).getTime() < Date.now();
}

export function toIso(date: Date | string) {
  return new Date(date).toISOString();
}

/**
 * Parse a `datetime-local` value ("YYYY-MM-DDTHH:mm") as Japan time, no
 * matter where the admin's browser is. Returns null when invalid.
 */
export function jstInputToDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const d = new Date(`${value}:00+09:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Format a date as a `datetime-local` value in Japan time. */
export function dateToJstInput(date: Date | string | null | undefined): string {
  if (!date) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(date));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}
