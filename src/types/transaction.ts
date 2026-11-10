import type { Category } from './listing'

/** A simulated, completed sale. Item details are snapshotted so history survives listing deletion. */
export interface Transaction {
  id: string
  listingId: string
  listingTitle: string
  listingImage: string
  category: Category
  price: number
  buyerId: string
  sellerId: string
  completedAt: string
  status: 'completed'
}
