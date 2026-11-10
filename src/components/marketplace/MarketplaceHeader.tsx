import { UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** "Marketplace" title bar with quick-access icons, following the Figma home screen. */
export function MarketplaceHeader({ actions }: { actions?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pb-2 pt-4">
      <h1 className="text-xl font-bold text-primary">Marketplace</h1>
      <div className="flex items-center gap-1 text-ink">
        {actions}
        <Link to="/account" aria-label="Account" className="rounded-full p-2 hover:bg-gray-100">
          <UserRound className="h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}
