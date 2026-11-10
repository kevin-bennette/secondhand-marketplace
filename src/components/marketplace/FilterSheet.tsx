import { Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { CATEGORIES, CONDITIONS } from '../../data/constants'
import type { Category, Condition } from '../../types/listing'
import { emptyFilters, type ListingFilters } from '../../utils/filters'
import { Button } from '../common/Button'
import { TextField } from '../common/FormFields'
import { Modal } from '../common/Modal'

interface FilterSheetProps {
  open: boolean
  filters: ListingFilters
  onApply: (filters: ListingFilters) => void
  onClose: () => void
}

const toInput = (value: number | null) => (value === null ? '' : String(value))

/** Bottom sheet for filtering by category, price range and condition. */
export function FilterSheet({ open, filters, onApply, onClose }: FilterSheetProps) {
  return (
    <Modal open={open} title="Filters" onClose={onClose}>
      {/* Remount on open so the draft always starts from the applied filters. */}
      {open && <FilterForm filters={filters} onApply={onApply} />}
    </Modal>
  )
}

function FilterForm({ filters, onApply }: { filters: ListingFilters; onApply: (filters: ListingFilters) => void }) {
  const [category, setCategory] = useState<Category | null>(filters.category)
  const [minPrice, setMinPrice] = useState(toInput(filters.minPrice))
  const [maxPrice, setMaxPrice] = useState(toInput(filters.maxPrice))
  const [conditions, setConditions] = useState<Condition[]>(filters.conditions)
  const [priceError, setPriceError] = useState<string>()

  const toggleCondition = (condition: Condition) =>
    setConditions((current) => (current.includes(condition) ? current.filter((item) => item !== condition) : [...current, condition]))

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const min = minPrice === '' ? null : Number(minPrice)
    const max = maxPrice === '' ? null : Number(maxPrice)
    if ((min !== null && (!Number.isFinite(min) || min < 0)) || (max !== null && (!Number.isFinite(max) || max < 0))) {
      setPriceError('Prices must be positive numbers.')
      return
    }
    if (min !== null && max !== null && min > max) {
      setPriceError('Minimum price cannot be greater than maximum price.')
      return
    }
    onApply({ category, minPrice: min, maxPrice: max, conditions })
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Category</legend>
        <div className="flex flex-wrap gap-2">
          {[null, ...CATEGORIES].map((item) => (
            <button
              key={item ?? 'any'}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                category === item ? 'border-primary bg-primary text-white' : 'border-line text-ink hover:border-primary'
              }`}
            >
              {item ?? 'Any'}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Price (AUD)</legend>
        <div className="grid grid-cols-2 gap-3">
          <TextField
            aria-label="Minimum price"
            placeholder="Min"
            inputMode="decimal"
            leading={<span className="text-sm">$</span>}
            value={minPrice}
            onChange={(event) => {
              setMinPrice(event.target.value.replace(/[^\d.]/g, ''))
              setPriceError(undefined)
            }}
          />
          <TextField
            aria-label="Maximum price"
            placeholder="Max"
            inputMode="decimal"
            leading={<span className="text-sm">$</span>}
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(event.target.value.replace(/[^\d.]/g, ''))
              setPriceError(undefined)
            }}
          />
        </div>
        {priceError && (
          <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
            {priceError}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Condition</legend>
        <div className="flex flex-col divide-y divide-line rounded-xl border border-line">
          {CONDITIONS.map((condition) => {
            const checked = conditions.includes(condition)
            return (
              <label key={condition} className="flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm">
                {condition}
                <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleCondition(condition)} />
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 items-center justify-center rounded-md border ${checked ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}
                >
                  {checked && <Check className="h-3.5 w-3.5" />}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => onApply(emptyFilters)}>
          Clear Filters
        </Button>
        <Button type="submit">Apply Filters</Button>
      </div>
    </form>
  )
}
