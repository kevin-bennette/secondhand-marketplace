import type { Transaction } from '../../types/transaction'
import { formatPrice } from '../../utils/format'

/** Totals for purchases and sales. */
export function TransactionSummary({ transactions, userId }: { transactions: Transaction[]; userId: string }) {
  const purchases = transactions.filter((transaction) => transaction.buyerId === userId)
  const sales = transactions.filter((transaction) => transaction.sellerId === userId)
  const sum = (items: Transaction[]) => items.reduce((total, transaction) => total + transaction.price, 0)

  return (
    <div className="grid grid-cols-2 gap-3 px-4 pt-4">
      <div className="rounded-2xl border border-line p-3">
        <p className="text-xs text-muted">Purchases ({purchases.length})</p>
        <p className="text-lg font-bold">{formatPrice(sum(purchases))}</p>
      </div>
      <div className="rounded-2xl border border-line p-3">
        <p className="text-xs text-muted">Sales ({sales.length})</p>
        <p className="text-lg font-bold text-emerald-700">{formatPrice(sum(sales))}</p>
      </div>
    </div>
  )
}
