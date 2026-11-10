import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Transaction } from '../../types/transaction'
import type { PublicUser } from '../../types/user'
import { formatDate, formatPrice } from '../../utils/format'
import { Badge } from '../common/Badge'
import { ProductImage } from '../common/ProductImage'

interface TransactionListItemProps {
  transaction: Transaction
  currentUserId: string
  otherParty?: PublicUser
}

export function TransactionListItem({ transaction, currentUserId, otherParty }: TransactionListItemProps) {
  const isPurchase = transaction.buyerId === currentUserId

  return (
    <Link to={`/transactions/${transaction.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
      <ProductImage src={transaction.listingImage} alt={transaction.listingTitle} className="h-14 w-14 shrink-0 rounded-xl border border-line" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Badge tone={isPurchase ? 'blue' : 'green'}>{isPurchase ? 'Purchase' : 'Sale'}</Badge>
          <span className="text-xs text-muted">{formatDate(transaction.completedAt)}</span>
        </div>
        <p className="mt-0.5 truncate text-sm font-semibold">{transaction.listingTitle}</p>
        <p className="truncate text-xs text-muted">
          {isPurchase ? 'From' : 'To'} {otherParty?.name ?? 'a former user'}
        </p>
      </div>
      <span className={`text-sm font-bold ${isPurchase ? 'text-ink' : 'text-emerald-700'}`}>
        {isPurchase ? '' : '+'}
        {formatPrice(transaction.price)}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
    </Link>
  )
}
