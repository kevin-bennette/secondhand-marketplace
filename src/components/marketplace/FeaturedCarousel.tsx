import { Link } from 'react-router-dom'
import type { Listing } from '../../types/listing'
import { formatPrice } from '../../utils/format'
import { ProductImage } from '../common/ProductImage'

/** Horizontally scrolling hero cards for featured listings. */
export function FeaturedCarousel({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) return null

  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4" aria-label="Featured listings">
      {listings.map((listing) => (
        <Link key={listing.id} to={`/listing/${listing.id}`} className="relative w-[68%] shrink-0 snap-center overflow-hidden rounded-2xl">
          <ProductImage src={listing.images[0]} alt={listing.title} className="aspect-[4/5] w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-white">
            <p className="truncate text-sm font-semibold">{listing.title}</p>
            <p className="text-sm font-bold">
              {formatPrice(listing.price)}
              {listing.originalPrice && <span className="ml-1.5 text-xs font-normal line-through opacity-75">{formatPrice(listing.originalPrice)}</span>}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
