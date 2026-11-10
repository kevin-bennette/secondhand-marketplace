import { SearchX } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Listing } from '../../types/listing'
import { Button } from '../common/Button'
import { EmptyState } from '../common/EmptyState'
import { ListingGrid } from '../listings/ListingGrid'

interface SearchResultsProps {
  listings: Listing[]
  summary: string
  onReset: () => void
  renderAction?: (listing: Listing) => ReactNode
}

export function SearchResults({ listings, summary, onReset, renderAction }: SearchResultsProps) {
  if (listings.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No results found"
        message="Try a different keyword, another category or fewer filters."
        action={
          <Button variant="secondary" size="sm" onClick={onReset}>
            Show all listings
          </Button>
        }
      />
    )
  }

  return (
    <section className="px-4 pb-6">
      <p className="mb-3 text-sm text-muted" aria-live="polite">
        {summary}
      </p>
      <ListingGrid listings={listings} linkTo={(listing) => `/listing/${listing.id}`} renderAction={renderAction} />
    </section>
  )
}
