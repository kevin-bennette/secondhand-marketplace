import { Search, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'

interface SearchBarProps {
  value: string
  onSearch: (query: string) => void
}

/** Keyword search box. Submits on Enter; clearing it resets the search. */
export function SearchBar({ value, onSearch }: SearchBarProps) {
  const [draft, setDraft] = useState(value)

  useEffect(() => setDraft(value), [value])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    onSearch(draft.trim())
  }

  return (
    <form role="search" onSubmit={submit} className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Search for desks, phones, bikes…"
        aria-label="Search listings"
        enterKeyHint="search"
        className="h-11 w-full rounded-xl border border-line bg-field pl-9 pr-10 text-sm placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
      />
      {draft && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setDraft('')
            onSearch('')
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-gray-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  )
}
