import { useAuth } from '../../hooks/useAuth'
import type { Transaction } from '../../types/transaction'
import { formatDate } from '../../utils/format'
import { Button } from '../common/Button'
import { ProductImage } from '../common/ProductImage'

interface PendingReviewListProps {
  transactions: Transaction[]
  currentUserId: string
  onReview: (transaction: Transaction) => void
}

/** Completed transactions the user can still rate. */
export function PendingReviewList({ transactions, currentUserId, onReview }: PendingReviewListProps) {
  const { getUser } = useAuth()

  return (
    <ul className="divide-y divide-line rounded-2xl border border-line">
      {transactions.map((transaction) => {
        const otherId = transaction.buyerId === currentUserId ? transaction.sellerId : transaction.buyerId
        const other = getUser(otherId)
        return (
          <li key={transaction.id} className="flex items-center gap-3 p-3">
            <ProductImage src={transaction.listingImage} alt={transaction.listingTitle} className="h-11 w-11 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{transaction.listingTitle}</p>
              <p className="truncate text-xs text-muted">
                {transaction.buyerId === currentUserId ? 'Bought from' : 'Sold to'} {other?.name ?? 'a former user'} · {formatDate(transaction.completedAt)}
              </p>
            </div>
            <Button size="sm" variant="secondary" onClick={() => onReview(transaction)}>
              Rate
            </Button>
          </li>
        )
      })}
    </ul>
  )
}
