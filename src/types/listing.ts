import type { CATEGORIES, CONDITIONS } from '../data/constants'

export type Category = (typeof CATEGORIES)[number]
export type Condition = (typeof CONDITIONS)[number]
export type ListingStatus = 'active' | 'sold'

export interface Listing {
  id: string
  title: string
  description: string
  category: Category
  price: number
  originalPrice?: number
  condition: Condition
  images: string[]
  sellerId: string
  location: string
  createdAt: string
  status: ListingStatus
}
