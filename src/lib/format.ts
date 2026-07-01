// Formatting helpers. Dates are ISO strings (yyyy-mm-dd); parse as UTC to avoid
// off-by-one shifts from the local timezone.

function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

const dayMonth = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const dayMonthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDateRange(
  from: string | null,
  to: string | null,
): string | null {
  if (!from && !to) return null;
  if (from && to) {
    const a = parseISODate(from);
    const b = parseISODate(to);
    const sameYear = a.getUTCFullYear() === b.getUTCFullYear();
    return `${(sameYear ? dayMonth : dayMonthYear).format(a)} – ${dayMonthYear.format(b)}`;
  }
  return dayMonthYear.format(parseISODate((from ?? to)!));
}

export function nightsLabel(nights: number | null): string | null {
  if (!nights || nights < 1) return null;
  return `${nights} night${nights === 1 ? "" : "s"}`;
}
