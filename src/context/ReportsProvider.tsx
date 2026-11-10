import { useCallback, useMemo, type ReactNode } from 'react'
import { REPORT_REASONS, seedReports } from '../data/reports'
import { usePersistentState } from '../hooks/usePersistentState'
import type { Report } from '../types/report'
import { createId } from '../utils/format'
import { ReportsContext, type ReportsContextValue } from './ReportsContext'

/** Simulated moderation queue: user reports are stored locally and shown on the moderator dashboard. */
export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = usePersistentState<Report[]>('reports', seedReports)

  const sorted = useMemo(() => [...reports].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [reports])

  const reportsBy = useCallback((userId: string) => sorted.filter((report) => report.reporterId === userId), [sorted])

  const hasOpenReport = useCallback<ReportsContextValue['hasOpenReport']>(
    (reporterId, targetType, targetId) =>
      reports.some(
        (report) =>
          report.reporterId === reporterId &&
          report.targetType === targetType &&
          report.targetId === targetId &&
          (report.status === 'Pending' || report.status === 'Under review'),
      ),
    [reports],
  )

  const submitReport = useCallback<ReportsContextValue['submitReport']>(
    (input) => {
      if (!input.reason || !REPORT_REASONS[input.targetType].includes(input.reason)) {
        return { ok: false, error: 'Please select a reason for your report.' }
      }
      if (input.reason === 'Other' && input.details.trim().length < 10) {
        return { ok: false, error: 'Please describe the problem (at least 10 characters).' }
      }
      const report: Report = {
        ...input,
        details: input.details.trim(),
        id: createId('rep'),
        createdAt: new Date().toISOString(),
        status: 'Pending',
        seenByModerator: false,
      }
      setReports((current) => [report, ...current])
      return { ok: true, report }
    },
    [setReports],
  )

  const updateStatus = useCallback<ReportsContextValue['updateStatus']>(
    (reportId, status) =>
      setReports((current) => current.map((report) => (report.id === reportId ? { ...report, status, seenByModerator: true } : report))),
    [setReports],
  )

  const unseenCount = useMemo(() => reports.filter((report) => !report.seenByModerator).length, [reports])

  const markAllSeen = useCallback(
    () =>
      setReports((current) =>
        current.some((report) => !report.seenByModerator) ? current.map((report) => ({ ...report, seenByModerator: true })) : current,
      ),
    [setReports],
  )

  const value = useMemo<ReportsContextValue>(
    () => ({ reports: sorted, reportsBy, hasOpenReport, submitReport, updateStatus, unseenCount, markAllSeen }),
    [sorted, reportsBy, hasOpenReport, submitReport, updateStatus, unseenCount, markAllSeen],
  )

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
}
