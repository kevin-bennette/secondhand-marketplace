import { categoryImages } from '../../data/categories'
import { CATEGORIES } from '../../data/constants'
import type { Category } from '../../types/listing'
import { ProductImage } from '../common/ProductImage'

interface CategoryTilesProps {
  counts: Record<Category, number>
  onSelect: (category: Category) => void
}

/** Image tiles for browsing by category (as in the Figma home screen). */
export function CategoryTiles({ counts, onSelect }: CategoryTilesProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CATEGORIES.map((category) => (
        <button key={category} type="button" onClick={() => onSelect(category)} className="group text-left">
          <ProductImage
            src={categoryImages[category]}
            alt={category}
            className="aspect-[4/3] w-full rounded-2xl border border-line transition-opacity group-hover:opacity-90"
          />
          <span className="mt-1 flex items-baseline justify-between px-0.5">
            <span className="text-sm font-semibold">{category}</span>
            <span className="text-xs text-muted">{counts[category]} items</span>
          </span>
        </button>
      ))}
    </div>
  )
}
