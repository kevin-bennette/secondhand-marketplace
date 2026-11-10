import type { Listing } from '../../types/listing'
import { formatDate, formatPrice } from '../../utils/format'
import { Badge } from '../common/Badge'

/** Title, price, description and condition block of the product details screen. */
export function ListingSummary({ listing }: { listing: Listing }) {
  return (
    <section className="px-4 pt-4">
      <div className="flex items-center gap-2 text-sm text-muted">
        <span>{listing.category}</span>
        <span aria-hidden="true">|</span>
        <span>Listed {formatDate(listing.createdAt)}</span>
        {listing.status === 'sold' && <Badge tone="red">Sold</Badge>}
      </div>
      <h1 className="mt-1 text-xl font-bold leading-snug">{listing.title}</h1>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-bold">{formatPrice(listing.price)}</span>
        {listing.originalPrice && <span className="text-sm text-gray-400 line-through">{formatPrice(listing.originalPrice)}</span>}
      </p>

      <h2 className="mt-5 text-base font-bold">Description</h2>
      <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted">{listing.description}</p>

      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-base font-bold">Condition</h2>
        <span className="rounded-lg border border-line px-3 py-1 text-sm">{listing.condition}</span>
      </div>
    </section>
  )
}
