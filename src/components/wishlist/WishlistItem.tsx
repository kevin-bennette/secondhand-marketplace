import { HeartOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Listing } from '../../types/listing'
import { formatPrice } from '../../utils/format'
import { Badge } from '../common/Badge'
import { ProductImage } from '../common/ProductImage'

interface WishlistItemProps {
  listing: Listing
  onRemove: () => void
}

export function WishlistItem({ listing, onRemove }: WishlistItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Link to={`/listing/${listing.id}`} className="flex min-w-0 flex-1 items-center gap-3">
        <ProductImage src={listing.images[0]} alt={listing.title} className="h-20 w-20 shrink-0 rounded-xl border border-line" />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{listing.title}</span>
          <span className="block text-sm font-bold">{formatPrice(listing.price)}</span>
          <span className="mt-0.5 flex items-center gap-2 text-xs text-muted">
            {listing.condition}
            {listing.status === 'sold' && <Badge tone="red">Sold</Badge>}
          </span>
        </span>
      </Link>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${listing.title} from wishlist`}
        className="rounded-full p-2 text-muted hover:bg-red-50 hover:text-red-600"
      >
        <HeartOff className="h-5 w-5" />
      </button>
    </div>
  )
}
