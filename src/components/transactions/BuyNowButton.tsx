import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { useTransactions } from '../../hooks/useTransactions'
import type { Listing } from '../../types/listing'
import { formatPrice } from '../../utils/format'
import { Button } from '../common/Button'
import { ConfirmDialog } from '../common/ConfirmDialog'

interface BuyNowButtonProps {
  listing: Listing
  /** Where to go after the simulated purchase completes. */
  afterPurchasePath: (transactionId: string) => string
}

/**
 * Records a simulated purchase so the transaction-dependent features (reviews, history)
 * can be demonstrated. No payment is taken and nothing is charged.
 */
export function BuyNowButton({ listing, afterPurchasePath }: BuyNowButtonProps) {
  const user = useCurrentUser()
  const { completePurchase } = useTransactions()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [confirming, setConfirming] = useState(false)

  if (listing.sellerId === user.id || listing.status !== 'active') return null

  const confirm = () => {
    setConfirming(false)
    const result = completePurchase(listing, user.id)
    if (!result.ok) {
      showToast(result.error, 'error')
      return
    }
    showToast('Purchase recorded (simulated). You can now rate the seller.')
    navigate(afterPurchasePath(result.transaction.id), { replace: true })
  }

  return (
    <>
      <Button variant="outline" fullWidth icon={<ShoppingBag className="h-[18px] w-[18px]" />} onClick={() => setConfirming(true)}>
        Mark as bought
      </Button>
      <ConfirmDialog
        open={confirming}
        title="Complete this purchase?"
        message={`Demo only – no payment is taken. This records that you bought "${listing.title}" for ${formatPrice(listing.price)} after meeting the seller, and marks the item as sold.`}
        confirmLabel="Confirm purchase"
        onCancel={() => setConfirming(false)}
        onConfirm={confirm}
      />
    </>
  )
}
