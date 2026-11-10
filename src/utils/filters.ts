import { CONDITIONS } from '../data/constants'
import type { Category, Condition, Listing } from '../types/listing'
import { formatPrice } from './format'
import { parseCategory } from './search'

export interface ListingFilters {
  category: Category | null
  minPrice: number | null
  maxPrice: number | null
  conditions: Condition[]
}

export const emptyFilters: ListingFilters = { category: null, minPrice: null, maxPrice: null, conditions: [] }

function parsePrice(value: string | null): number | null {
  if (value === null || value.trim() === '') return null
  const price = Number(value)
  return Number.isFinite(price) && price >= 0 ? price : null
}

/** Filters are stored in the URL: ?category=&min=&max=&condition=New,Used - Good */
export function filtersFromParams(params: URLSearchParams): ListingFilters {
  const conditions = (params.get('condition') ?? '')
    .split(',')
    .filter((value): value is Condition => (CONDITIONS as readonly string[]).includes(value))
  return {
    category: parseCategory(params.get('category')),
    minPrice: parsePrice(params.get('min')),
    maxPrice: parsePrice(params.get('max')),
    conditions,
  }
}

export function filtersToParams(filters: ListingFilters): Record<string, string | null> {
  return {
    category: filters.category,
    min: filters.minPrice === null ? null : String(filters.minPrice),
    max: filters.maxPrice === null ? null : String(filters.maxPrice),
    condition: filters.conditions.length ? filters.conditions.join(',') : null,
  }
}

/** All active filters must match (category AND price range AND one of the selected conditions). */
export function applyFilters(listings: Listing[], filters: ListingFilters): Listing[] {
  return listings.filter(
    (listing) =>
      (!filters.category || listing.category === filters.category) &&
      (filters.minPrice === null || listing.price >= filters.minPrice) &&
      (filters.maxPrice === null || listing.price <= filters.maxPrice) &&
      (filters.conditions.length === 0 || filters.conditions.includes(listing.condition)),
  )
}

/** Number of filter groups in use (shown as a badge on the Filters button). */
export function countActiveFilters(filters: ListingFilters): number {
  return [filters.category, filters.minPrice ?? filters.maxPrice, filters.conditions.length ? true : null].filter(
    (value) => value !== null && value !== undefined,
  ).length
}

export function describePriceRange({ minPrice, maxPrice }: ListingFilters): string | null {
  if (minPrice !== null && maxPrice !== null) return `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`
  if (minPrice !== null) return `From ${formatPrice(minPrice)}`
  if (maxPrice !== null) return `Up to ${formatPrice(maxPrice)}`
  return null
}
