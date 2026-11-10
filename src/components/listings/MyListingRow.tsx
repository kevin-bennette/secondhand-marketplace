import { Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Listing } from '../../types/listing'
import { formatDate, formatPrice } from '../../utils/format'
import { Badge } from '../common/Badge'
import { buttonClasses } from '../common/buttonStyles'
import { ProductImage } from '../common/ProductImage'
import { DeleteListingButton } from './DeleteListingButton'

export function MyListingRow({ listing }: { listing: Listing }) {
  return (
    <div className="flex gap-3 px-4 py-3.5">
      <Link to={`/listing/${listing.id}`} className="shrink-0">
        <ProductImage src={listing.images[0]} alt={listing.title} className="h-20 w-20 rounded-xl border border-line" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/listing/${listing.id}`} className="truncate text-sm font-semibold hover:underline">
            {listing.title}
          </Link>
          <Badge tone={listing.status === 'active' ? 'green' : 'gray'}>{listing.status === 'active' ? 'Active' : 'Sold'}</Badge>
        </div>
        <p className="text-sm font-bold">{formatPrice(listing.price)}</p>
        <p className="text-xs text-muted">Listed {formatDate(listing.createdAt)}</p>
        {listing.status === 'active' && (
          <div className="mt-2 flex gap-2">
            <Link to={`/listing/${listing.id}/edit`} className={buttonClasses('secondary', 'sm')}>
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Link>
            <DeleteListingButton listing={listing} size="sm" />
          </div>
        )}
      </div>
    </div>
  )
}
