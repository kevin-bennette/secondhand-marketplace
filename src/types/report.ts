export type ReportTargetType = 'listing' | 'user'

export type ReportStatus = 'Pending' | 'Under review' | 'Resolved' | 'Dismissed'

export interface Report {
  id: string
  targetType: ReportTargetType
  targetId: string
  /** Snapshot of the listing title or user name at the time of reporting. */
  targetLabel: string
  reason: string
  details: string
  reporterId: string
  createdAt: string
  status: ReportStatus
  /** False until a moderator has opened the dashboard after the report arrived. */
  seenByModerator: boolean
}
