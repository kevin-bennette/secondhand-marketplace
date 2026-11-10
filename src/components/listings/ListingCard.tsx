import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Listing } from '../../types/listing'
import { formatPrice } from '../../utils/format'
import { ProductImage } from '../common/ProductImage'

interface ListingCardProps {
  listing: Listing
  /** Where the card links to. Omit to render a non-interactive card. */
  to?: string
  /** Overlay action in the image corner (e.g. save to wishlist). */
  action?: ReactNode
}

export function ListingCard({ listing, to, action }: ListingCardProps) {
  const body = (
    <>
      <ProductImage src={listing.images[0]} alt={listing.title} className="aspect-square w-full rounded-2xl border border-line" />
      <div className="mt-1.5 px-0.5">
        <p className="truncate text-sm font-semibold text-ink">{listing.title}</p>
        <p className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-ink">{formatPrice(listing.price)}</span>
          {listing.originalPrice && <span className="text-xs text-gray-400 line-through">{formatPrice(listing.originalPrice)}</span>}
        </p>
        <p className="truncate text-xs text-muted">{listing.condition}</p>
      </div>
    </>
  )

  return (
    <article className="relative">
      {to ? (
        <Link to={to} className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-primary">
          {body}
        </Link>
      ) : (
        body
      )}
      {action && <div className="absolute right-2 top-2">{action}</div>}
    </article>
  )
}
