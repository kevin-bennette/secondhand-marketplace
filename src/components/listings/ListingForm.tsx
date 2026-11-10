import { useState, type FormEvent } from 'react'
import { CATEGORIES } from '../../data/constants'
import type { ListingInput } from '../../context/ListingsContext'
import type { Category } from '../../types/listing'
import {
  emptyListingForm,
  toListingInput,
  validateListing,
  type ListingFormErrors,
  type ListingFormValues,
} from '../../utils/listingValidation'
import { Button } from '../common/Button'
import { SelectField, TextArea, TextField } from '../common/FormFields'
import { ConditionPicker } from './ConditionPicker'
import { ImageUploader } from './ImageUploader'

interface ListingFormProps {
  initialValues?: ListingFormValues
  submitLabel: string
  onSubmit: (input: ListingInput) => void
}

/** Reusable listing form used for creating (US2) and editing listings. */
export function ListingForm({ initialValues = emptyListingForm, submitLabel, onSubmit }: ListingFormProps) {
  const [values, setValues] = useState<ListingFormValues>(initialValues)
  const [errors, setErrors] = useState<ListingFormErrors>({})

  const set = <K extends keyof ListingFormValues>(field: K, value: ListingFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateListing(values)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return
    onSubmit(toListingInput(values))
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 px-4 py-4">
      <ImageUploader images={values.images} onChange={(images) => set('images', images)} error={errors.images} />

      <div className="grid grid-cols-[2fr_3fr] gap-3">
        <SelectField
          label="Category"
          options={CATEGORIES}
          placeholder="Select"
          value={values.category}
          onChange={(event) => set('category', event.target.value as Category | '')}
          error={errors.category}
        />
        <TextField
          label="Title"
          placeholder="e.g. Oak study desk"
          maxLength={80}
          value={values.title}
          onChange={(event) => set('title', event.target.value)}
          error={errors.title}
        />
      </div>

      <TextField
        label="Price (AUD)"
        inputMode="decimal"
        placeholder="0.00"
        leading={<span className="text-sm font-semibold">$</span>}
        value={values.price}
        onChange={(event) => set('price', event.target.value.replace(/[^\d.]/g, ''))}
        error={errors.price}
      />

      <TextArea
        label="Description"
        placeholder={'Size: 200cm x 60cm\nColour: Oak white\nMaterial: Wood'}
        value={values.description}
        onChange={(event) => set('description', event.target.value)}
        error={errors.description}
      />

      <ConditionPicker value={values.condition} onChange={(condition) => set('condition', condition)} error={errors.condition} />

      {errorCount > 0 && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          Please fix {errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`} before continuing.
        </p>
      )}

      <Button type="submit" fullWidth>
        {submitLabel}
      </Button>
    </form>
  )
}
