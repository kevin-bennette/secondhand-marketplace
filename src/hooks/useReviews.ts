import { useContext } from 'react'
import { ReviewsContext } from '../context/ReviewsContext'

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (!context) throw new Error('useReviews must be used inside <ReviewsProvider>')
  return context
}
