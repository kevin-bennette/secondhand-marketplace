import { Inbox, ShieldAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EmptyState } from '../../components/common/EmptyState'
import { ReportListItem } from '../../components/moderation/ReportListItem'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { REPORT_STATUSES } from '../../data/reports'
import { useAuth, useCurrentUser } from '../../hooks/useAuth'
import { useReports } from '../../hooks/useReports'
import { useToast } from '../../hooks/useToast'
import type { Report, ReportStatus } from '../../types/report'

type Filter = 'All' | ReportStatus

/** Simulated administrator dashboard listing every submitted report. */
export function ModerationDashboardPage() {
  const user = useCurrentUser()

  if (user.role !== 'admin') {
    return (
      <Screen header={<PageHeader title="Moderation" backTo="/account" />}>
        <EmptyState icon={ShieldAlert} title="Moderators only" message="Sign in with the moderator demo account to view reports." />
      </Screen>
    )
  }
  return <Dashboard />
}

function Dashboard() {
  const { reports, updateStatus, unseenCount, markAllSeen } = useReports()
  const { getUser } = useAuth()
  const { showToast } = useToast()
  const [filter, setFilter] = useState<Filter>('All')
  // Remember which reports were new when the dashboard opened, before marking them as seen.
  const [newOnOpen] = useState(() => new Set(reports.filter((report) => !report.seenByModerator).map((report) => report.id)))

  useEffect(() => {
    if (unseenCount > 0) markAllSeen()
  }, [unseenCount, markAllSeen])

  const counts = Object.fromEntries(REPORT_STATUSES.map((status) => [status, reports.filter((report) => report.status === status).length]))
  const visible = filter === 'All' ? reports : reports.filter((report) => report.status === filter)

  const changeStatus = (report: Report, status: ReportStatus) => {
    updateStatus(report.id, status)
    showToast(`Report on “${report.targetLabel}” marked as ${status.toLowerCase()}.`, 'info')
  }

  return (
    <Screen
      header={
        <>
          <PageHeader title="Moderation" backTo="/account" />
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-line bg-white px-4 py-2.5" role="tablist">
            {(['All', ...REPORT_STATUSES] as Filter[]).map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={filter === option}
                onClick={() => setFilter(option)}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${
                  filter === option ? 'border-primary bg-primary text-white' : 'border-line text-ink'
                }`}
              >
                {option} ({option === 'All' ? reports.length : counts[option]})
              </button>
            ))}
          </div>
        </>
      }
    >
      {newOnOpen.size > 0 && (
        <p className="mx-4 mt-3 rounded-xl bg-primary-light px-3 py-2 text-sm font-medium text-primary">
          {newOnOpen.size} new {newOnOpen.size === 1 ? 'report' : 'reports'} since your last visit.
        </p>
      )}
      {visible.length === 0 ? (
        <EmptyState icon={Inbox} title="No reports here" />
      ) : (
        <div className="divide-y divide-line">
          {visible.map((report) => (
            <ReportListItem
              key={report.id}
              report={newOnOpen.has(report.id) ? { ...report, seenByModerator: false } : report}
              reporterName={getUser(report.reporterId)?.name}
              actions={
                <label className="flex items-center gap-2 text-xs text-muted">
                  Status
                  <select
                    value={report.status}
                    onChange={(event) => changeStatus(report, event.target.value as ReportStatus)}
                    aria-label={`Change status of report on ${report.targetLabel}`}
                    className="rounded-lg border border-line bg-white px-2 py-1 text-xs font-medium text-ink"
                  >
                    {REPORT_STATUSES.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </label>
              }
            />
          ))}
        </div>
      )}
    </Screen>
  )
}
