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

export function formatDateTime(date: Date | string) {
  return formatDate(date, { hour: "2-digit", minute: "2-digit" });
}

export function toIso(date: Date | string) {
  return new Date(date).toISOString();
}
