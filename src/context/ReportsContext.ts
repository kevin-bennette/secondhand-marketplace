import { createContext } from 'react'
import type { Report, ReportStatus, ReportTargetType } from '../types/report'

export interface ReportInput {
  targetType: ReportTargetType
  targetId: string
  targetLabel: string
  reason: string
  details: string
  reporterId: string
}

export type ReportResult = { ok: true; report: Report } | { ok: false; error: string }

export interface ReportsContextValue {
  reports: Report[]
  reportsBy: (userId: string) => Report[]
  hasOpenReport: (reporterId: string, targetType: ReportTargetType, targetId: string) => boolean
  submitReport: (input: ReportInput) => ReportResult
  updateStatus: (reportId: string, status: ReportStatus) => void
  /** Reports moderators have not seen yet (drives the moderator notification badge). */
  unseenCount: number
  markAllSeen: () => void
}

export const ReportsContext = createContext<ReportsContextValue | null>(null)
