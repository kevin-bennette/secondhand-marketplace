import { useReviews } from '../../hooks/useReviews'
import { StarRating } from './StarRating'

/** Compact "★★★★☆ 4.5 (3)" label for a user. */
export function SellerRating({ userId }: { userId: string }) {
  const { ratingSummary } = useReviews()
  const { average, count } = ratingSummary(userId)

  if (count === 0) return <span className="block text-xs text-muted">No reviews yet</span>

  return (
    <span className="flex items-center gap-1 text-xs text-muted">
      <StarRating value={average} size="sm" />
      <span className="font-semibold text-ink">{average.toFixed(1)}</span>({count})
    </span>
  )
}
