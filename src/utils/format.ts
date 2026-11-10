const priceFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
})

export function formatPrice(value: number): string {
  return priceFormatter.format(value)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatTime(iso: string): string {
  return new Date(iso)
    .toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })
    .replace(' ', '')
    .toLowerCase()
}

/** "12:24pm" for today, "Yesterday", or "1 Sep" for older dates. */
export function formatShortDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (date.getTime() >= startOfToday) return formatTime(iso)
  if (date.getTime() >= startOfToday - 86_400_000) return 'Yesterday'
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/** ISO timestamp relative to now – used to keep seed data looking fresh. */
export function daysAgo(days: number, hours = 0, minutes = 0): string {
  return new Date(Date.now() - ((days * 24 + hours) * 60 + minutes) * 60_000).toISOString()
}
