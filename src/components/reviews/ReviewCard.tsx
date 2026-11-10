import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import type { Review } from '../../types/review'
import { formatDate } from '../../utils/format'
import { Avatar } from '../common/Avatar'
import { StarRating } from './StarRating'

export function ReviewCard({ review, itemTitle }: { review: Review; itemTitle?: string }) {
  const { getUser } = useAuth()
  const reviewer = getUser(review.reviewerId)

  return (
    <article className="py-3.5">
      <div className="flex items-center gap-3">
        {reviewer && <Avatar name={reviewer.name} color={reviewer.avatarColor} size="sm" />}
        <div className="min-w-0 flex-1">
          {reviewer ? (
            <Link to={`/profile/${reviewer.id}`} className="block truncate text-sm font-semibold hover:underline">
              {reviewer.name}
            </Link>
          ) : (
            <span className="text-sm font-semibold">Former user</span>
          )}
          <p className="text-xs text-muted">
            {review.reviewerRole === 'buyer' ? 'Bought' : 'Sold'} {itemTitle ? `“${itemTitle}”` : 'an item'} · {formatDate(review.createdAt)}
          </p>
        </div>
        <StarRating value={review.rating} size="sm" />
      </div>
      <p className="mt-2 text-sm text-ink">{review.comment}</p>
    </article>
  )
}
