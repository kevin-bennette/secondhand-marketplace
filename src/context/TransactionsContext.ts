import { createContext } from 'react'
import type { Listing } from '../types/listing'
import type { Transaction } from '../types/transaction'

export type PurchaseResult = { ok: true; transaction: Transaction } | { ok: false; error: string }

export interface TransactionsContextValue {
  transactions: Transaction[]
  /** Completed transactions where the user was buyer or seller, newest first. */
  transactionsFor: (userId: string) => Transaction[]
  getTransaction: (id: string) => Transaction | undefined
  /** Records a simulated purchase (no payment) and marks the listing as sold. */
  completePurchase: (listing: Listing, buyerId: string) => PurchaseResult
}

export const TransactionsContext = createContext<TransactionsContextValue | null>(null)
