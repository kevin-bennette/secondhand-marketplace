import type { ReactNode } from 'react'

type Tone = 'blue' | 'green' | 'amber' | 'red' | 'gray'

const tones: Record<Tone, string> = {
  blue: 'bg-primary-light text-primary',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
  gray: 'bg-gray-100 text-gray-700',
}

export function Badge({ tone = 'gray', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>
}
