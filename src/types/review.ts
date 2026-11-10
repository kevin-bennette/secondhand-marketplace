export interface Review {
  id: string
  transactionId: string
  reviewerId: string
  revieweeId: string
  /** 1–5 stars */
  rating: number
  comment: string
  createdAt: string
  /** The reviewer's role in the transaction. */
  reviewerRole: 'buyer' | 'seller'
}
