import { Home, Plus, UserRound, type LucideIcon } from 'lucide-react'
import type { ComponentType } from 'react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  /** Highlighted centre action (e.g. Sell). */
  primary?: boolean
  /** Optional component rendering a counter badge (e.g. unread messages). */
  badge?: ComponentType
}

/** Bottom navigation entries. User stories append their own entries here. */
export const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/sell', label: 'Sell', icon: Plus, primary: true },
  { to: '/account', label: 'Account', icon: UserRound },
]
