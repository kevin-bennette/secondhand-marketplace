import { ShieldCheck } from 'lucide-react'
import { EmptyState } from '../../components/common/EmptyState'
import { ReportListItem } from '../../components/moderation/ReportListItem'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { useCurrentUser } from '../../hooks/useAuth'
import { useReports } from '../../hooks/useReports'

/** Reports the signed-in user has submitted, with their moderation status. */
export function MyReportsPage() {
  const user = useCurrentUser()
  const { reportsBy } = useReports()
  const reports = reportsBy(user.id)

  return (
    <Screen header={<PageHeader title="My Reports" backTo="/account" />}>
      {reports.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="No reports submitted"
          message="Use the flag on a listing or profile to report suspicious activity."
        />
      ) : (
        <div className="divide-y divide-line">
          {reports.map((report) => (
            <ReportListItem key={report.id} report={report} />
          ))}
        </div>
      )}
    </Screen>
  )
}
