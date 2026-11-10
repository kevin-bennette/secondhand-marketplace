import { CATEGORIES } from '../../data/constants'
import type { Category } from '../../types/listing'

interface CategoryChipsProps {
  selected: Category | null
  onSelect: (category: Category | null) => void
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  const options: (Category | null)[] = [null, ...CATEGORIES]

  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="tablist" aria-label="Categories">
      {options.map((category) => {
        const active = selected === category
        return (
          <button
            key={category ?? 'all'}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(category)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              active ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:border-primary'
            }`}
          >
            {category ?? 'All'}
          </button>
        )
      })}
    </div>
  )
}
