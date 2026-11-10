import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/common/buttonStyles'
import { ListingGrid } from '../../components/listings/ListingGrid'
import { ActiveFilters } from '../../components/marketplace/ActiveFilters'
import { CategoryChips } from '../../components/marketplace/CategoryChips'
import { CategoryTiles } from '../../components/marketplace/CategoryTiles'
import { FeaturedCarousel } from '../../components/marketplace/FeaturedCarousel'
import { FilterButton } from '../../components/marketplace/FilterButton'
import { FilterSheet } from '../../components/marketplace/FilterSheet'
import { MarketplaceHeader } from '../../components/marketplace/MarketplaceHeader'
import { InboxShortcut } from '../../components/messaging/InboxShortcut'
import { SearchBar } from '../../components/marketplace/SearchBar'
import { SearchResults } from '../../components/marketplace/SearchResults'
import { Screen } from '../../components/navigation/Screen'
import { CATEGORIES } from '../../data/constants'
import { useListings } from '../../hooks/useListings'
import { useMarketplaceSearch } from '../../hooks/useMarketplaceSearch'
import type { Category } from '../../types/listing'
import { applyFilters, countActiveFilters, filtersFromParams, filtersToParams, type ListingFilters } from '../../utils/filters'
import { matchesQuery } from '../../utils/search'

export function MarketplacePage() {
  const { activeListings } = useListings()
  const { query, category, params, setQuery, setCategory, update, reset } = useMarketplaceSearch()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filters = useMemo(() => filtersFromParams(params), [params])
  const activeFilterCount = countActiveFilters(filters)
  const isBrowsing = !query && activeFilterCount === 0

  const results = useMemo(
    () => applyFilters(activeListings, filters).filter((listing) => matchesQuery(listing, query)),
    [activeListings, filters, query],
  )

  const counts = useMemo(
    () =>
      Object.fromEntries(CATEGORIES.map((item) => [item, activeListings.filter((listing) => listing.category === item).length])) as Record<
        Category,
        number
      >,
    [activeListings],
  )

  const featured = useMemo(() => activeListings.filter((listing) => listing.originalPrice).slice(0, 5), [activeListings])

  const applyNewFilters = (next: ListingFilters) => {
    update(filtersToParams(next))
    setFiltersOpen(false)
  }

  const summary = `${results.length} ${results.length === 1 ? 'result' : 'results'}${query ? ` for “${query}”` : ''}${category ? ` in ${category}` : ''}`

  return (
    <Screen
      header={
        <div className="border-b border-line bg-white">
          <MarketplaceHeader actions={<InboxShortcut />} />
          <div className="flex flex-col gap-3 px-4 pb-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <SearchBar value={query} onSearch={setQuery} />
              </div>
              <FilterButton activeCount={activeFilterCount} onClick={() => setFiltersOpen(true)} />
            </div>
            <CategoryChips selected={category} onSelect={setCategory} />
            <ActiveFilters filters={filters} onChange={(next) => update(filtersToParams(next))} />
          </div>
        </div>
      }
    >
      {isBrowsing ? (
        <div className="flex flex-col gap-5 px-4 py-4">
          <FeaturedCarousel listings={featured} />
          <div className="flex justify-center">
            <Link to="/sell" className={buttonClasses('outline', 'sm')}>
              <Plus className="h-4 w-4" /> Create a listing
            </Link>
          </div>
          <section>
            <h2 className="mb-3 text-base font-bold">Shop by category</h2>
            <CategoryTiles counts={counts} onSelect={setCategory} />
          </section>
          <section className="pb-2">
            <h2 className="mb-3 text-base font-bold">Fresh finds</h2>
            <ListingGrid listings={activeListings} linkTo={(listing) => `/listing/${listing.id}`} />
          </section>
        </div>
      ) : (
        <div className="pt-4">
          <SearchResults listings={results} summary={summary} onReset={reset} />
        </div>
      )}

      <FilterSheet open={filtersOpen} filters={filters} onApply={applyNewFilters} onClose={() => setFiltersOpen(false)} />
    </Screen>
  )
}
