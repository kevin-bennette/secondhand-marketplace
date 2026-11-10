import type { Report, ReportStatus, ReportTargetType } from '../types/report'
import { daysAgo } from '../utils/format'
import { DEMO_USER_ID } from './users'

export const REPORT_REASONS: Record<ReportTargetType, string[]> = {
  listing: ['Scam or fraud', 'Counterfeit or fake item', 'Prohibited item', 'Misleading description or photos', 'Inappropriate content', 'Other'],
  user: ['Scam or fraud', 'Harassment or abusive messages', 'Fake profile', 'Spam', 'No-show or unreliable', 'Other'],
}

export const REPORT_STATUSES: ReportStatus[] = ['Pending', 'Under review', 'Resolved', 'Dismissed']

export const seedReports: Report[] = [
  {
    id: 'rep-1',
    targetType: 'listing',
    targetId: 'l-console',
    targetLabel: 'PlayStation 5 Disc Edition',
    reason: 'Misleading description or photos',
    details: 'Photo looks like a stock image rather than the actual console.',
    reporterId: DEMO_USER_ID,
    createdAt: daysAgo(2, 4),
    status: 'Under review',
    seenByModerator: true,
  },
  {
    id: 'rep-2',
    targetType: 'user',
    targetId: 'u-daniel',
    targetLabel: 'Daniel Kim',
    reason: 'No-show or unreliable',
    details: 'Did not turn up for two agreed pick-up times.',
    reporterId: 'u-jessica',
    createdAt: daysAgo(6),
    status: 'Resolved',
    seenByModerator: true,
  },
  {
    id: 'rep-3',
    targetType: 'listing',
    targetId: 'l-road-bike',
    targetLabel: 'Carbon Road Bike – 54cm',
    reason: 'Scam or fraud',
    details: 'Price seems far too low for this bike – possibly stolen.',
    reporterId: 'u-sarah',
    createdAt: daysAgo(0, 9),
    status: 'Pending',
    seenByModerator: false,
  },
]
