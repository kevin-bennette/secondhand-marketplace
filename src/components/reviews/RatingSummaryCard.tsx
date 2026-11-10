import type { RatingSummary } from '../../context/ReviewsContext'
import { StarRating } from './StarRating'

/** Average rating with a per-star breakdown, shown on user profiles. */
export function RatingSummaryCard({ summary }: { summary: RatingSummary }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-line p-4">
      <div className="text-center">
        <p className="text-3xl font-bold" data-testid="average-rating">
          {summary.count ? summary.average.toFixed(1) : '–'}
        </p>
        <StarRating value={summary.average} size="sm" />
        <p className="mt-1 text-xs text-muted">
          {summary.count} {summary.count === 1 ? 'review' : 'reviews'}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = summary.distribution[star - 1]
          const width = summary.count ? (count / summary.count) * 100 : 0
          return (
            <div key={star} className="flex items-center gap-2 text-xs text-muted">
              <span className="w-2">{star}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <span className="block h-full rounded-full bg-amber-400" style={{ width: `${width}%` }} />
              </span>
              <span className="w-3 text-right">{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
