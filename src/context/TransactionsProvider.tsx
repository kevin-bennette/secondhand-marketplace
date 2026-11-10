import { useCallback, useMemo, type ReactNode } from 'react'
import { seedTransactions } from '../data/transactions'
import { useListings } from '../hooks/useListings'
import { usePersistentState } from '../hooks/usePersistentState'
import type { Transaction } from '../types/transaction'
import { createId } from '../utils/format'
import { TransactionsContext, type TransactionsContextValue } from './TransactionsContext'

/** Simulated transaction records. Completing one makes rating & review available. */
export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = usePersistentState<Transaction[]>('transactions', seedTransactions)
  const { markAsSold } = useListings()

  const transactionsFor = useCallback(
    (userId: string) =>
      transactions
        .filter((transaction) => transaction.buyerId === userId || transaction.sellerId === userId)
        .sort((a, b) => b.completedAt.localeCompare(a.completedAt)),
    [transactions],
  )

  const getTransaction = useCallback((id: string) => transactions.find((transaction) => transaction.id === id), [transactions])

  const completePurchase = useCallback<TransactionsContextValue['completePurchase']>(
    (listing, buyerId) => {
      if (listing.sellerId === buyerId) return { ok: false, error: 'You cannot buy your own listing.' }
      if (listing.status !== 'active') return { ok: false, error: 'This item has already been sold.' }
      const transaction: Transaction = {
        id: createId('t'),
        listingId: listing.id,
        listingTitle: listing.title,
        listingImage: listing.images[0] ?? '',
        category: listing.category,
        price: listing.price,
        buyerId,
        sellerId: listing.sellerId,
        completedAt: new Date().toISOString(),
        status: 'completed',
      }
      setTransactions((current) => [transaction, ...current])
      markAsSold(listing.id)
      return { ok: true, transaction }
    },
    [setTransactions, markAsSold],
  )

  const value = useMemo<TransactionsContextValue>(
    () => ({ transactions, transactionsFor, getTransaction, completePurchase }),
    [transactions, transactionsFor, getTransaction, completePurchase],
  )

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>
}
