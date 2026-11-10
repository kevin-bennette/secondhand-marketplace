import { SlidersHorizontal } from 'lucide-react'

export function FilterButton({ activeCount, onClick }: { activeCount: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={activeCount ? `Filters (${activeCount} active)` : 'Filters'}
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
        activeCount ? 'border-primary bg-primary-light text-primary' : 'border-line bg-field text-ink hover:border-primary'
      }`}
    >
      <SlidersHorizontal className="h-5 w-5" />
      {activeCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
          {activeCount}
        </span>
      )}
    </button>
  )
}
