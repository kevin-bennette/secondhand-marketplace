import { CATEGORIES } from '../data/constants'
import type { Category, Listing } from '../types/listing'

export interface SearchCriteria {
  query: string
  category: Category | null
}

export function parseCategory(value: string | null): Category | null {
  return value && (CATEGORIES as readonly string[]).includes(value) ? (value as Category) : null
}

/** Keyword search: every word in the query must appear in the title, description or category. */
export function matchesQuery(listing: Listing, query: string): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return true
  const haystack = `${listing.title} ${listing.description} ${listing.category}`.toLowerCase()
  return terms.every((term) => haystack.includes(term))
}

export function searchListings(listings: Listing[], { query, category }: SearchCriteria): Listing[] {
  return listings.filter((listing) => (!category || listing.category === category) && matchesQuery(listing, query))
}

/** Other active listings in the same category, newest first. */
export function findSimilarListings(listings: Listing[], target: Listing, limit = 4): Listing[] {
  return listings
    .filter((listing) => listing.id !== target.id && listing.status === 'active' && listing.category === target.category)
    .slice(0, limit)
}
