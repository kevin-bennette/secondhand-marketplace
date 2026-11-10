import { Plus } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/common/buttonStyles'
import { ListingGrid } from '../../components/listings/ListingGrid'
import { CategoryChips } from '../../components/marketplace/CategoryChips'
import { CategoryTiles } from '../../components/marketplace/CategoryTiles'
import { FeaturedCarousel } from '../../components/marketplace/FeaturedCarousel'
import { MarketplaceHeader } from '../../components/marketplace/MarketplaceHeader'
import { SearchBar } from '../../components/marketplace/SearchBar'
import { SearchResults } from '../../components/marketplace/SearchResults'
import { Screen } from '../../components/navigation/Screen'
import { CATEGORIES } from '../../data/constants'
import { useListings } from '../../hooks/useListings'
import { useMarketplaceSearch } from '../../hooks/useMarketplaceSearch'
import type { Category } from '../../types/listing'
import { searchListings } from '../../utils/search'

export function MarketplacePage() {
  const { activeListings } = useListings()
  const { query, category, setQuery, setCategory, reset } = useMarketplaceSearch()

  const isBrowsing = !query && !category
  const results = useMemo(() => searchListings(activeListings, { query, category }), [activeListings, query, category])

  const counts = useMemo(
    () =>
      Object.fromEntries(CATEGORIES.map((item) => [item, activeListings.filter((listing) => listing.category === item).length])) as Record<
        Category,
        number
      >,
    [activeListings],
  )

  const featured = useMemo(() => activeListings.filter((listing) => listing.originalPrice).slice(0, 5), [activeListings])

  const summary = `${results.length} ${results.length === 1 ? 'result' : 'results'}${query ? ` for “${query}”` : ''}${category ? ` in ${category}` : ''}`

  return (
    <Screen
      header={
        <div className="border-b border-line bg-white">
          <MarketplaceHeader />
          <div className="flex flex-col gap-3 px-4 pb-3">
            <SearchBar value={query} onSearch={setQuery} />
            <CategoryChips selected={category} onSelect={setCategory} />
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
    </Screen>
  )
}
