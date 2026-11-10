import { Star } from 'lucide-react'

interface StarRatingProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-6 w-6' }

/** Read-only star display supporting fractional values (e.g. 4.5). */
export function StarRating({ value, size = 'md' }: StarRatingProps) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.max(0, Math.min(1, value - (star - 1)))
        return (
          <span key={star} className="relative inline-block">
            <Star className={`${sizes[size]} text-gray-300`} />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={`${sizes[size]} fill-amber-400 text-amber-400`} />
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}
