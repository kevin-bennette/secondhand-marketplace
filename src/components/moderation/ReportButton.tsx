import { Flag } from 'lucide-react'
import { useState } from 'react'
import { ReportDialog, type ReportTarget } from './ReportDialog'

interface ReportButtonProps {
  target: ReportTarget
  /** "overlay" = round icon on photos, "inline" = text button. */
  variant?: 'overlay' | 'inline'
}

export function ReportButton({ target, variant = 'inline' }: ReportButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {variant === 'overlay' ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Report ${target.type}`}
          className="rounded-full bg-white/90 p-2 shadow hover:bg-white"
        >
          <Flag className="h-5 w-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-muted hover:bg-red-50 hover:text-red-600"
        >
          <Flag className="h-3.5 w-3.5" /> Report {target.type}
        </button>
      )}
      <ReportDialog target={target} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
