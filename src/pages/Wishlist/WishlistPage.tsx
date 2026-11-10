import { Heart } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/common/buttonStyles'
import { ConfirmDialog } from '../../components/common/ConfirmDialog'
import { EmptyState } from '../../components/common/EmptyState'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { WishlistItem } from '../../components/wishlist/WishlistItem'
import { useListings } from '../../hooks/useListings'
import { useToast } from '../../hooks/useToast'
import { useWishlist } from '../../hooks/useWishlist'
import type { Listing } from '../../types/listing'

export function WishlistPage() {
  const { savedIds, removeSaved } = useWishlist()
  const { getListing } = useListings()
  const { showToast } = useToast()
  const [pendingRemoval, setPendingRemoval] = useState<Listing | null>(null)

  // Listings deleted by their seller simply drop out of the wishlist.
  const saved = savedIds.map(getListing).filter((listing): listing is Listing => Boolean(listing))

  return (
    <Screen header={<PageHeader title="Wishlist" showBack={false} />}>
      {saved.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          message="Tap the heart on any listing to save it for later."
          action={
            <Link to="/" className={buttonClasses('secondary', 'sm')}>
              Browse listings
            </Link>
          }
        />
      ) : (
        <>
          <p className="px-4 pt-3 text-sm text-muted">
            {saved.length} saved {saved.length === 1 ? 'item' : 'items'}
          </p>
          <div className="divide-y divide-line">
            {saved.map((listing) => (
              <WishlistItem key={listing.id} listing={listing} onRemove={() => setPendingRemoval(listing)} />
            ))}
          </div>
        </>
      )}

      <ConfirmDialog
        open={pendingRemoval !== null}
        title="Remove from wishlist?"
        message={pendingRemoval ? `"${pendingRemoval.title}" will be removed from your saved items.` : ''}
        confirmLabel="Remove"
        destructive
        onCancel={() => setPendingRemoval(null)}
        onConfirm={() => {
          if (pendingRemoval) {
            removeSaved(pendingRemoval.id)
            showToast('Removed from your wishlist.', 'info')
          }
          setPendingRemoval(null)
        }}
      />
    </Screen>
  )
}
