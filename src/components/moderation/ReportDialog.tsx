import { CheckCircle2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { REPORT_REASONS } from '../../data/reports'
import { useCurrentUser } from '../../hooks/useAuth'
import { useReports } from '../../hooks/useReports'
import { useToast } from '../../hooks/useToast'
import type { ReportTargetType } from '../../types/report'
import { Button } from '../common/Button'
import { buttonClasses } from '../common/buttonStyles'
import { TextArea } from '../common/FormFields'
import { Modal } from '../common/Modal'

export interface ReportTarget {
  type: ReportTargetType
  id: string
  label: string
}

interface ReportDialogProps {
  target: ReportTarget
  open: boolean
  onClose: () => void
}

export function ReportDialog({ target, open, onClose }: ReportDialogProps) {
  return (
    <Modal open={open} title={target.type === 'listing' ? 'Report listing' : 'Report user'} onClose={onClose}>
      {open && <ReportForm target={target} onClose={onClose} />}
    </Modal>
  )
}

function ReportForm({ target, onClose }: { target: ReportTarget; onClose: () => void }) {
  const user = useCurrentUser()
  const { submitReport, hasOpenReport } = useReports()
  const { showToast } = useToast()
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState<string>()
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-4 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        <h3 className="mt-3 text-base font-semibold">Report submitted</h3>
        <p className="mt-1 text-sm text-muted">
          Thanks for helping keep the marketplace safe. Our moderators have been notified and will review “{target.label}”.
        </p>
        <div className="mt-5 grid w-full grid-cols-2 gap-3">
          <Link to="/reports" className={buttonClasses('outline')}>
            My reports
          </Link>
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    )
  }

  const alreadyReported = hasOpenReport(user.id, target.type, target.id)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const result = submitReport({
      targetType: target.type,
      targetId: target.id,
      targetLabel: target.label,
      reason,
      details,
      reporterId: user.id,
    })
    if (!result.ok) {
      setError(result.error)
      return
    }
    setSubmitted(true)
    showToast('Report submitted. Moderators have been notified.')
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        Why are you reporting <strong className="text-ink">{target.label}</strong>?
      </p>
      {alreadyReported && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
          You already have an open report for this {target.type}. You can still add another reason.
        </p>
      )}
      <fieldset>
        <legend className="sr-only">Reason</legend>
        <div className="flex flex-col divide-y divide-line rounded-xl border border-line">
          {REPORT_REASONS[target.type].map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm">
              <input
                type="radio"
                name="reason"
                value={option}
                checked={reason === option}
                onChange={() => {
                  setReason(option)
                  setError(undefined)
                }}
                className="h-4 w-4 accent-primary"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <TextArea
        label={reason === 'Other' ? 'Details (required)' : 'Details (optional)'}
        placeholder="Add anything that will help our moderators."
        rows={3}
        maxLength={500}
        value={details}
        onChange={(event) => {
          setDetails(event.target.value)
          setError(undefined)
        }}
      />
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
      <Button type="submit" variant="danger" fullWidth>
        Submit report
      </Button>
    </form>
  )
}
