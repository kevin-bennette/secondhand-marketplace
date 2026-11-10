import { Package, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Report } from '../../types/report'
import { formatDate } from '../../utils/format'
import { ReportStatusBadge } from './ReportStatusBadge'

interface ReportListItemProps {
  report: Report
  reporterName?: string
  /** Moderator controls (status changes). */
  actions?: ReactNode
}

export function ReportListItem({ report, reporterName, actions }: ReportListItemProps) {
  const Icon = report.targetType === 'listing' ? Package : UserRound
  const targetPath = report.targetType === 'listing' ? `/listing/${report.targetId}` : `/profile/${report.targetId}`

  return (
    <article className="px-4 py-3.5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-muted">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link to={targetPath} className="truncate text-sm font-semibold hover:underline">
              {report.targetLabel}
            </Link>
            <ReportStatusBadge status={report.status} />
          </div>
          <p className="text-xs font-medium text-red-600">{report.reason}</p>
          {report.details && <p className="mt-1 text-sm text-ink">{report.details}</p>}
          <p className="mt-1 text-xs text-muted">
            {report.targetType === 'listing' ? 'Listing' : 'User'} · {reporterName ? `reported by ${reporterName} · ` : ''}
            {formatDate(report.createdAt)}
            {!report.seenByModerator && <span className="ml-1 font-semibold text-primary">· New</span>}
          </p>
          {actions && <div className="mt-2">{actions}</div>}
        </div>
      </div>
    </article>
  )
}
