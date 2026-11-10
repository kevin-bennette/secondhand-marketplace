import type { ReactNode } from 'react'
import type { Listing } from '../../types/listing'
import { ListingCard } from './ListingCard'

interface ListingGridProps {
  listings: Listing[]
  linkTo?: (listing: Listing) => string | undefined
  renderAction?: (listing: Listing) => ReactNode
}

export function ListingGrid({ listings, linkTo, renderAction }: ListingGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} to={linkTo?.(listing)} action={renderAction?.(listing)} />
      ))}
    </div>
  )
}
