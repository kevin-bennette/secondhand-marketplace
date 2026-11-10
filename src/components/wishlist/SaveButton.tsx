import { Heart } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { useWishlist } from '../../hooks/useWishlist'
import type { Listing } from '../../types/listing'

interface SaveButtonProps {
  listing: Listing
  /** "icon" for product cards, "pill" (with Save/Saved label) for the details screen. */
  variant?: 'icon' | 'pill'
}

/** Save/unsave a listing to the wishlist. Hidden on the user's own listings. */
export function SaveButton({ listing, variant = 'icon' }: SaveButtonProps) {
  const { currentUser } = useAuth()
  const { isSaved, toggleSaved } = useWishlist()
  const { showToast } = useToast()

  if (!currentUser || listing.sellerId === currentUser.id) return null
  const saved = isSaved(listing.id)

  const handleClick = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const nowSaved = toggleSaved(listing.id)
    showToast(nowSaved ? 'Saved to your wishlist.' : 'Removed from your wishlist.', nowSaved ? 'success' : 'info')
  }

  const label = saved ? `Remove ${listing.title} from wishlist` : `Save ${listing.title} to wishlist`

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={label}
        className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold shadow hover:bg-white"
      >
        <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
        {saved ? 'Saved' : 'Save'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
    >
      <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : 'text-ink'}`} />
    </button>
  )
}
