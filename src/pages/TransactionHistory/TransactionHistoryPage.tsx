import { Receipt } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/common/buttonStyles'
import { EmptyState } from '../../components/common/EmptyState'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { TransactionListItem } from '../../components/transactions/TransactionListItem'
import { TransactionSummary } from '../../components/transactions/TransactionSummary'
import { useAuth, useCurrentUser } from '../../hooks/useAuth'
import { useTransactions } from '../../hooks/useTransactions'

type Tab = 'all' | 'purchases' | 'sales'

const tabs: { value: Tab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'purchases', label: 'Purchases' },
  { value: 'sales', label: 'Sales' },
]

const emptyMessages: Record<Tab, string> = {
  all: 'You have no transactions yet. Completed purchases and sales will appear here.',
  purchases: 'You have not bought anything yet.',
  sales: 'You have not sold anything yet.',
}

export function TransactionHistoryPage() {
  const user = useCurrentUser()
  const { getUser } = useAuth()
  const { transactionsFor } = useTransactions()
  const [tab, setTab] = useState<Tab>('all')

  const all = transactionsFor(user.id)
  const visible = all.filter(
    (transaction) =>
      tab === 'all' || (tab === 'purchases' ? transaction.buyerId === user.id : transaction.sellerId === user.id),
  )

  return (
    <Screen
      header={
        <>
          <PageHeader title="Transaction History" backTo="/account" />
          <div className="flex border-b border-line bg-white" role="tablist">
            {tabs.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                onClick={() => setTab(value)}
                className={`flex-1 border-b-2 py-2.5 text-sm font-semibold ${tab === value ? 'border-primary text-primary' : 'border-transparent text-muted'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      }
    >
      {all.length > 0 && <TransactionSummary transactions={all} userId={user.id} />}
      {visible.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No transactions found"
          message={emptyMessages[tab]}
          action={
            <Link to="/" className={buttonClasses('secondary', 'sm')}>
              Browse listings
            </Link>
          }
        />
      ) : (
        <div className="mt-2 divide-y divide-line">
          {visible.map((transaction) => (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
              currentUserId={user.id}
              otherParty={getUser(transaction.buyerId === user.id ? transaction.sellerId : transaction.buyerId)}
            />
          ))}
        </div>
      )}
    </Screen>
  )
}
