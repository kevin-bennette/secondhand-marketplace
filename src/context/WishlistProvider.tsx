import { useCallback, useMemo, type ReactNode } from 'react'
import { DEMO_USER_ID } from '../data/users'
import { useAuth } from '../hooks/useAuth'
import { usePersistentState } from '../hooks/usePersistentState'
import { WishlistContext, type WishlistContextValue } from './WishlistContext'

type Wishlists = Record<string, string[]>

const seedWishlists: Wishlists = { [DEMO_USER_ID]: ['l-sofa', 'l-road-bike', 'l-dslr'] }

/** Per-user wishlists persisted in LocalStorage, so saved items survive sign-out and refresh. */
export function WishlistProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth()
  const [wishlists, setWishlists] = usePersistentState<Wishlists>('wishlists', seedWishlists)
  const userId = currentUser?.id

  const savedIds = useMemo(() => (userId ? (wishlists[userId] ?? []) : []), [wishlists, userId])

  const isSaved = useCallback((listingId: string) => savedIds.includes(listingId), [savedIds])

  const toggleSaved = useCallback(
    (listingId: string) => {
      if (!userId) return false
      const willSave = !savedIds.includes(listingId)
      setWishlists((current) => {
        const list = current[userId] ?? []
        return { ...current, [userId]: willSave ? [listingId, ...list] : list.filter((id) => id !== listingId) }
      })
      return willSave
    },
    [userId, savedIds, setWishlists],
  )

  const removeSaved = useCallback(
    (listingId: string) => {
      if (!userId) return
      setWishlists((current) => ({ ...current, [userId]: (current[userId] ?? []).filter((id) => id !== listingId) }))
    },
    [userId, setWishlists],
  )

  const value = useMemo<WishlistContextValue>(
    () => ({ savedIds, isSaved, toggleSaved, removeSaved }),
    [savedIds, isSaved, toggleSaved, removeSaved],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
