import { Star } from 'lucide-react'
import { useState } from 'react'

const labels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent']

/** Interactive 1–5 star rating control. */
export function StarInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value

  return (
    <div className="flex flex-col items-center gap-1">
      <div role="radiogroup" aria-label="Rating" className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            className="p-1"
          >
            <Star className={`h-8 w-8 transition-colors ${star <= shown ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
          </button>
        ))}
      </div>
      <span className="h-4 text-xs font-medium text-muted">{shown ? labels[shown - 1] : 'Tap to rate'}</span>
    </div>
  )
}
