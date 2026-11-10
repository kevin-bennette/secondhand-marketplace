import { X } from 'lucide-react'
import { describePriceRange, emptyFilters, type ListingFilters } from '../../utils/filters'

interface ActiveFiltersProps {
  filters: ListingFilters
  onChange: (filters: ListingFilters) => void
}

/** Removable chips for the price and condition filters currently applied. */
export function ActiveFilters({ filters, onChange }: ActiveFiltersProps) {
  const price = describePriceRange(filters)
  const chips: { key: string; label: string; remove: () => void }[] = []

  if (price) chips.push({ key: 'price', label: price, remove: () => onChange({ ...filters, minPrice: null, maxPrice: null }) })
  filters.conditions.forEach((condition) =>
    chips.push({
      key: condition,
      label: condition,
      remove: () => onChange({ ...filters, conditions: filters.conditions.filter((item) => item !== condition) }),
    }),
  )

  if (chips.length === 0) return null

  return (
    <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4" aria-label="Active filters">
      {chips.map((chip) => (
        <span key={chip.key} className="flex shrink-0 items-center gap-1 rounded-full bg-primary-light py-1 pl-3 pr-1.5 text-xs font-semibold text-primary">
          {chip.label}
          <button type="button" onClick={chip.remove} aria-label={`Remove ${chip.label} filter`} className="rounded-full p-0.5 hover:bg-blue-100">
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      ))}
      <button type="button" onClick={() => onChange(emptyFilters)} className="shrink-0 px-1 text-xs font-semibold text-muted hover:text-ink">
        Clear all
      </button>
    </div>
  )
}
