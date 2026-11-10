import type { ReportStatus } from '../../types/report'
import { Badge } from '../common/Badge'

const tones = {
  Pending: 'amber',
  'Under review': 'blue',
  Resolved: 'green',
  Dismissed: 'gray',
} as const

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  return <Badge tone={tones[status]}>{status}</Badge>
}
