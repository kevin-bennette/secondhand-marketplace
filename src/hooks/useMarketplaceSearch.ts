import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Category } from '../types/listing'
import { parseCategory } from '../utils/search'

/**
 * Search state lives in the URL (?q=&category=) so results survive a page refresh
 * and can be shared or navigated back to.
 */
export function useMarketplaceSearch() {
  const [params, setParams] = useSearchParams()

  const query = params.get('q') ?? ''
  const category = parseCategory(params.get('category'))

  const update = useCallback(
    (changes: Record<string, string | null>) => {
      setParams(
        (current) => {
          const next = new URLSearchParams(current)
          Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  const setQuery = useCallback((value: string) => update({ q: value || null }), [update])
  const setCategory = useCallback((value: Category | null) => update({ category: value }), [update])
  const reset = useCallback(() => setParams(new URLSearchParams(), { replace: true }), [setParams])

  return useMemo(
    () => ({ query, category, params, setQuery, setCategory, update, reset }),
    [query, category, params, setQuery, setCategory, update, reset],
  )
}
