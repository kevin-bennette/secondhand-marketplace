import { useCallback, useMemo, type ReactNode } from 'react'
import { seedListings } from '../data/listings'
import { usePersistentState } from '../hooks/usePersistentState'
import type { Listing } from '../types/listing'
import { createId } from '../utils/format'
import { ListingsContext, type ListingsContextValue } from './ListingsContext'

/** Shared listing state: creating a listing immediately updates every screen that shows listings. */
export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = usePersistentState<Listing[]>('listings', seedListings)

  const activeListings = useMemo(
    () => listings.filter((listing) => listing.status === 'active').sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [listings],
  )

  const getListing = useCallback((id: string) => listings.find((listing) => listing.id === id), [listings])

  const createListing = useCallback<ListingsContextValue['createListing']>(
    (input, sellerId, location) => {
      const listing: Listing = {
        ...input,
        id: createId('l'),
        title: input.title.trim(),
        description: input.description.trim(),
        sellerId,
        location,
        createdAt: new Date().toISOString(),
        status: 'active',
      }
      setListings((current) => [listing, ...current])
      return listing
    },
    [setListings],
  )

  const value = useMemo<ListingsContextValue>(
    () => ({ listings, activeListings, getListing, createListing }),
    [listings, activeListings, getListing, createListing],
  )

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>
}
