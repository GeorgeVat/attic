// Best-effort in-memory rate limit (per warm serverless instance). Not a hard
// cross-instance guarantee, but stops trivial floods: MAX_HITS / WINDOW_MS / IP.
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

// One bucket map per route, so /api/contact and /api/callback don't share quota.
export function createRateLimiter({ windowMs = WINDOW_MS, maxHits = MAX_HITS } = {}) {
  const hits = new Map<string, number[]>()

  return function rateLimited(ip: string): boolean {
    const now = Date.now()
    // Sweep every bucket so the Map can't grow unbounded: drop IPs whose hits
    // have all aged out (otherwise once-seen IPs would linger forever — a slow
    // leak and a spoofed-`x-forwarded-for` memory-exhaustion vector).
    for (const [key, times] of hits) {
      const live = times.filter((t) => now - t < windowMs)
      if (live.length === 0) hits.delete(key)
      else hits.set(key, live)
    }
    const recent = hits.get(ip) ?? []
    recent.push(now)
    hits.set(ip, recent)
    return recent.length > maxHits
  }
}
