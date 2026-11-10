import { createContext } from 'react'
import type { Category, Condition, Listing } from '../types/listing'

export interface ListingInput {
  title: string
  description: string
  category: Category
  price: number
  condition: Condition
  images: string[]
}

export interface ListingsContextValue {
  /** Every listing, including sold ones (needed for history and details). */
  listings: Listing[]
  /** Listings currently for sale – what buyers see in the marketplace. */
  activeListings: Listing[]
  getListing: (id: string) => Listing | undefined
  createListing: (input: ListingInput, sellerId: string, location: string) => Listing
}

export const ListingsContext = createContext<ListingsContextValue | null>(null)
