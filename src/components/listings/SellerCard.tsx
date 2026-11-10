import { MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import type { PublicUser } from '../../types/user'
import { Avatar } from '../common/Avatar'

interface SellerCardProps {
  seller: PublicUser
  location: string
  /** Optional decoration under the seller name (e.g. rating). */
  meta?: ReactNode
  /** Optional action button (e.g. Message). */
  action?: ReactNode
  /** Optional wrapper to make the seller identity clickable (e.g. link to profile). */
  renderIdentity?: (identity: ReactNode) => ReactNode
}

export function SellerCard({ seller, location, meta, action, renderIdentity }: SellerCardProps) {
  const identity = (
    <span className="flex min-w-0 items-center gap-3">
      <Avatar name={seller.name} color={seller.avatarColor} size="lg" />
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-ink">{seller.name}</span>
        {meta}
      </span>
    </span>
  )

  return (
    <section className="px-4 pt-5">
      <h2 className="text-base font-bold text-primary">Seller Details</h2>
      <div className="mt-3 flex items-center justify-between gap-3">
        {renderIdentity ? renderIdentity(identity) : identity}
        {action}
      </div>
      <p className="mt-3 flex items-center gap-1 text-sm text-ink">
        <MapPin className="h-4 w-4 text-muted" /> {location}
      </p>
      <p className="ml-5 text-xs text-muted">Exact address shared after you agree on a pick-up.</p>
    </section>
  )
}
