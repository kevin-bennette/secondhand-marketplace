import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useCurrentUser } from '../../hooks/useAuth'
import { useListings } from '../../hooks/useListings'
import { useToast } from '../../hooks/useToast'
import type { Listing } from '../../types/listing'
import { Button } from '../common/Button'
import { ConfirmDialog } from '../common/ConfirmDialog'
import type { ButtonSize } from '../common/buttonStyles'

interface DeleteListingButtonProps {
  listing: Listing
  size?: ButtonSize
  fullWidth?: boolean
  onDeleted?: () => void
}

/** Delete action with a confirmation dialog. Ownership is enforced by the listings state. */
export function DeleteListingButton({ listing, size = 'md', fullWidth, onDeleted }: DeleteListingButtonProps) {
  const user = useCurrentUser()
  const { deleteListing } = useListings()
  const { showToast } = useToast()
  const [confirming, setConfirming] = useState(false)

  const confirm = () => {
    setConfirming(false)
    const result = deleteListing(listing.id, user.id)
    if (!result.ok) {
      showToast(result.error, 'error')
      return
    }
    showToast(`"${listing.title}" was deleted.`)
    onDeleted?.()
  }

  return (
    <>
      <Button variant="outline" size={size} fullWidth={fullWidth} className="text-red-600" icon={<Trash2 className="h-4 w-4" />} onClick={() => setConfirming(true)}>
        Delete
      </Button>
      <ConfirmDialog
        open={confirming}
        title="Delete this listing?"
        message={`"${listing.title}" will be removed from the marketplace and search results. This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onCancel={() => setConfirming(false)}
        onConfirm={confirm}
      />
    </>
  )
}
