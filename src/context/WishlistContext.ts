import { createContext } from 'react'

export interface WishlistContextValue {
  /** Listing IDs saved by the signed-in user, most recently saved first. */
  savedIds: string[]
  isSaved: (listingId: string) => boolean
  /** Adds or removes a listing; returns true when the listing is now saved. */
  toggleSaved: (listingId: string) => boolean
  removeSaved: (listingId: string) => void
}

export const WishlistContext = createContext<WishlistContextValue | null>(null)
