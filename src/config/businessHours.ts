// Business hours that drive the callback promise. Times are interpreted in the
// studio's timezone, so the visitor sees the correct promise no matter where
// they are. Edit these four values to change the schedule.
export const BUSINESS_HOURS = {
  timeZone: 'Europe/Athens',
  workdays: [1, 2, 3, 4, 5], // 0 = Sun ... 6 = Sat
  startHour: 9, // 09:00 inclusive
  endHour: 18, // 18:00 exclusive
} as const

export type CallbackPromise = { open: boolean; promise: string }

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

// Whether the studio is currently open, plus the line to show the visitor.
// Pure and side-effect free so it runs identically on the server and client.
export function getCallbackPromise(now: Date = new Date()): CallbackPromise {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_HOURS.timeZone,
    weekday: 'short',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(now)

  const weekday = WEEKDAY_INDEX[parts.find((p) => p.type === 'weekday')?.value ?? ''] ?? 0
  // Intl can emit "24" at midnight under hour12:false — normalize to 0.
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0') % 24

  const open =
    (BUSINESS_HOURS.workdays as readonly number[]).includes(weekday) &&
    hour >= BUSINESS_HOURS.startHour &&
    hour < BUSINESS_HOURS.endHour

  return {
    open,
    promise: open
      ? "We'll call you within 30 minutes."
      : "We'll call you first thing on the next business day.",
  }
}
