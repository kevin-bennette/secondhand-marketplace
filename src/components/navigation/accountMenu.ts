import type { LucideIcon } from 'lucide-react'

export interface AccountMenuItem {
  to: string
  label: string
  description: string
  icon: LucideIcon
  /** Only shown to moderator accounts. */
  adminOnly?: boolean
}

/** Entries on the Account screen. User stories register their screens here. */
export const accountMenu: AccountMenuItem[] = []
