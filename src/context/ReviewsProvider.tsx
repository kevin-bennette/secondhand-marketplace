import { useCallback, useMemo, type ReactNode } from 'react'
import { seedReviews } from '../data/reviews'
import { usePersistentState } from '../hooks/usePersistentState'
import { useTransactions } from '../hooks/useTransactions'
import type { Review } from '../types/review'
import { createId } from '../utils/format'
import { ReviewsContext, type ReviewsContextValue } from './ReviewsContext'

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = usePersistentState<Review[]>('reviews', seedReviews)
  const { transactions, getTransaction } = useTransactions()

  const reviewsFor = useCallback(
    (userId: string) => reviews.filter((review) => review.revieweeId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [reviews],
  )

  const ratingSummary = useCallback<ReviewsContextValue['ratingSummary']>(
    (userId) => {
      const received = reviews.filter((review) => review.revieweeId === userId)
      const distribution = [0, 0, 0, 0, 0]
      received.forEach((review) => (distribution[review.rating - 1] += 1))
      const average = received.length ? received.reduce((sum, review) => sum + review.rating, 0) / received.length : 0
      return { average: Math.round(average * 10) / 10, count: received.length, distribution }
    },
    [reviews],
  )

  const hasReviewed = useCallback(
    (transactionId: string, reviewerId: string) =>
      reviews.some((review) => review.transactionId === transactionId && review.reviewerId === reviewerId),
    [reviews],
  )

  const pendingReviews = useCallback<ReviewsContextValue['pendingReviews']>(
    (reviewerId, revieweeId) =>
      transactions
        .filter((transaction) => transaction.status === 'completed')
        .filter((transaction) => transaction.buyerId === reviewerId || transaction.sellerId === reviewerId)
        .filter((transaction) => !revieweeId || transaction.buyerId === revieweeId || transaction.sellerId === revieweeId)
        .filter((transaction) => !hasReviewed(transaction.id, reviewerId))
        .sort((a, b) => b.completedAt.localeCompare(a.completedAt)),
    [transactions, hasReviewed],
  )

  const submitReview = useCallback<ReviewsContextValue['submitReview']>(
    ({ transactionId, reviewerId, rating, comment }) => {
      const transaction = getTransaction(transactionId)
      if (!transaction || transaction.status !== 'completed') {
        return { ok: false, error: 'You can only review someone after completing a transaction with them.' }
      }
      const isBuyer = transaction.buyerId === reviewerId
      if (!isBuyer && transaction.sellerId !== reviewerId) return { ok: false, error: 'You were not part of this transaction.' }
      if (hasReviewed(transactionId, reviewerId)) return { ok: false, error: 'You have already reviewed this transaction.' }
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { ok: false, error: 'Please choose a rating from 1 to 5 stars.' }
      if (comment.trim().length < 10) return { ok: false, error: 'Please write at least 10 characters.' }

      const review: Review = {
        id: createId('r'),
        transactionId,
        reviewerId,
        revieweeId: isBuyer ? transaction.sellerId : transaction.buyerId,
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
        reviewerRole: isBuyer ? 'buyer' : 'seller',
      }
      setReviews((current) => [review, ...current])
      return { ok: true, review }
    },
    [getTransaction, hasReviewed, setReviews],
  )

  const value = useMemo<ReviewsContextValue>(
    () => ({ reviewsFor, ratingSummary, pendingReviews, hasReviewed, submitReview }),
    [reviewsFor, ratingSummary, pendingReviews, hasReviewed, submitReview],
  )

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}
