import { CATEGORIES, CONDITIONS } from '../data/constants'
import type { ListingInput } from '../context/ListingsContext'
import type { Category, Condition } from '../types/listing'

export interface ListingFormValues {
  title: string
  description: string
  category: Category | ''
  price: string
  condition: Condition | ''
  images: string[]
}

export type ListingFormErrors = Partial<Record<keyof ListingFormValues, string>>

export const emptyListingForm: ListingFormValues = {
  title: '',
  description: '',
  category: '',
  price: '',
  condition: '',
  images: [],
}

export function validateListing(values: ListingFormValues): ListingFormErrors {
  const errors: ListingFormErrors = {}
  const price = Number(values.price)

  if (values.images.length === 0) errors.images = 'Add at least one photo of your item.'
  if (!values.title.trim()) errors.title = 'Title is required.'
  else if (values.title.trim().length < 3) errors.title = 'Title must be at least 3 characters.'
  else if (values.title.trim().length > 80) errors.title = 'Title must be 80 characters or fewer.'
  if (!values.description.trim()) errors.description = 'Description is required.'
  else if (values.description.trim().length < 10) errors.description = 'Please describe the item in at least 10 characters.'
  if (!values.category || !CATEGORIES.includes(values.category)) errors.category = 'Choose a category.'
  if (!values.condition || !CONDITIONS.includes(values.condition)) errors.condition = 'Choose the item condition.'
  if (!values.price.trim()) errors.price = 'Price is required.'
  else if (!Number.isFinite(price) || price <= 0) errors.price = 'Enter a price greater than $0.'
  else if (price > 100000) errors.price = 'Price must be below $100,000.'

  return errors
}

export function toListingInput(values: ListingFormValues): ListingInput {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    category: values.category as Category,
    condition: values.condition as Condition,
    price: Math.round(Number(values.price) * 100) / 100,
    images: values.images,
  }
}
