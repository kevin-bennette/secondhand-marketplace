import { useListings } from '../../hooks/useListings'
import type { Listing } from '../../types/listing'
import { findSimilarListings } from '../../utils/search'
import { ListingGrid } from '../listings/ListingGrid'

export function SimilarProducts({ listing }: { listing: Listing }) {
  const { activeListings } = useListings()
  const similar = findSimilarListings(activeListings, listing)
  if (similar.length === 0) return null

  return (
    <section className="border-t border-line px-4 py-5">
      <h2 className="mb-3 text-base font-bold">Similar Products</h2>
      <ListingGrid listings={similar} linkTo={(item) => `/listing/${item.id}`} />
    </section>
  )
}
