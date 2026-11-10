import { CONDITIONS } from '../../data/constants'
import type { Condition } from '../../types/listing'

interface ConditionPickerProps {
  value: Condition | ''
  onChange: (value: Condition) => void
  error?: string
}

export function ConditionPicker({ value, onChange, error }: ConditionPickerProps) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-sm font-medium text-ink">Condition</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup">
        {CONDITIONS.map((condition) => {
          const selected = value === condition
          return (
            <button
              key={condition}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(condition)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                selected ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:border-primary'
              }`}
            >
              {condition}
            </button>
          )
        })}
      </div>
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  )
}
