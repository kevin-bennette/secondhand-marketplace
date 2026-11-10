import { useCallback, useMemo, type ReactNode } from 'react'
import { seedListings } from '../data/listings'
import { usePersistentState } from '../hooks/usePersistentState'
import type { Listing } from '../types/listing'
import { createId } from '../utils/format'
import { ListingsContext, type ListingsContextValue, type OwnershipResult } from './ListingsContext'

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

  /** Ownership check shared by edit and delete: only the seller may modify a listing. */
  const checkOwnership = useCallback(
    (id: string, actorId: string): OwnershipResult => {
      const listing = listings.find((item) => item.id === id)
      if (!listing) return { ok: false, error: 'This listing no longer exists.' }
      if (listing.sellerId !== actorId) return { ok: false, error: 'Access denied: you can only modify your own listings.' }
      return { ok: true }
    },
    [listings],
  )

  const updateListing = useCallback<ListingsContextValue['updateListing']>(
    (id, input, actorId) => {
      const result = checkOwnership(id, actorId)
      if (!result.ok) return result
      setListings((current) =>
        current.map((listing) =>
          listing.id === id ? { ...listing, ...input, title: input.title.trim(), description: input.description.trim() } : listing,
        ),
      )
      return result
    },
    [checkOwnership, setListings],
  )

  const deleteListing = useCallback<ListingsContextValue['deleteListing']>(
    (id, actorId) => {
      const result = checkOwnership(id, actorId)
      if (!result.ok) return result
      setListings((current) => current.filter((listing) => listing.id !== id))
      return result
    },
    [checkOwnership, setListings],
  )

  const value = useMemo<ListingsContextValue>(
    () => ({ listings, activeListings, getListing, createListing, updateListing, deleteListing }),
    [listings, activeListings, getListing, createListing, updateListing, deleteListing],
  )

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>
}
