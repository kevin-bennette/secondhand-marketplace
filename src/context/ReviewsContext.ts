import { createContext } from 'react'
import type { Review } from '../types/review'
import type { Transaction } from '../types/transaction'

export interface RatingSummary {
  average: number
  count: number
  /** Number of reviews per star value, index 0 = 1 star. */
  distribution: number[]
}

export interface ReviewInput {
  transactionId: string
  reviewerId: string
  rating: number
  comment: string
}

export type ReviewResult = { ok: true; review: Review } | { ok: false; error: string }

export interface ReviewsContextValue {
  reviewsFor: (userId: string) => Review[]
  ratingSummary: (userId: string) => RatingSummary
  /** Completed transactions between reviewer and reviewee that the reviewer has not reviewed yet. */
  pendingReviews: (reviewerId: string, revieweeId?: string) => Transaction[]
  hasReviewed: (transactionId: string, reviewerId: string) => boolean
  /** Rejects reviews without a completed transaction between the two users. */
  submitReview: (input: ReviewInput) => ReviewResult
}

export const ReviewsContext = createContext<ReviewsContextValue | null>(null)
