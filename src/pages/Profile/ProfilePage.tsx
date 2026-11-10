import { Lock, MessageSquareText, UserX } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { EmptyState } from '../../components/common/EmptyState'
import { ListingGrid } from '../../components/listings/ListingGrid'
import { ReportButton } from '../../components/moderation/ReportButton'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { PendingReviewList } from '../../components/reviews/PendingReviewList'
import { ProfileHeader } from '../../components/reviews/ProfileHeader'
import { RatingSummaryCard } from '../../components/reviews/RatingSummaryCard'
import { ReviewCard } from '../../components/reviews/ReviewCard'
import { ReviewDialog } from '../../components/reviews/ReviewDialog'
import { useAuth, useCurrentUser } from '../../hooks/useAuth'
import { useListings } from '../../hooks/useListings'
import { useReviews } from '../../hooks/useReviews'
import { useTransactions } from '../../hooks/useTransactions'
import type { Transaction } from '../../types/transaction'

export function ProfilePage() {
  const { userId = 'me' } = useParams()
  const currentUser = useCurrentUser()
  const { getUser } = useAuth()
  const { listings } = useListings()
  const { transactionsFor, getTransaction } = useTransactions()
  const { reviewsFor, ratingSummary, pendingReviews } = useReviews()
  const [reviewing, setReviewing] = useState<Transaction | null>(null)

  const profile = userId === 'me' ? currentUser : getUser(userId)

  if (!profile) {
    return (
      <Screen header={<PageHeader title="Profile" />}>
        <EmptyState icon={UserX} title="User not found" />
      </Screen>
    )
  }

  const isOwnProfile = profile.id === currentUser.id
  const summary = ratingSummary(profile.id)
  const reviews = reviewsFor(profile.id)
  const activeListings = listings.filter((listing) => listing.sellerId === profile.id && listing.status === 'active')
  const completedSales = transactionsFor(profile.id).filter((transaction) => transaction.sellerId === profile.id).length

  // Reviews are only possible after a completed transaction between the two users.
  const reviewable = isOwnProfile ? pendingReviews(currentUser.id) : pendingReviews(currentUser.id, profile.id)
  const revieweeOf = (transaction: Transaction) =>
    getUser(transaction.buyerId === currentUser.id ? transaction.sellerId : transaction.buyerId)?.name ?? 'user'

  return (
    <Screen header={<PageHeader title={isOwnProfile ? 'My Profile' : 'Profile'} />}>
      <ProfileHeader
        user={profile}
        stats={[
          { label: 'Rating', value: summary.count ? `${summary.average.toFixed(1)}★` : '–' },
          { label: 'Sales', value: completedSales },
          { label: 'For sale', value: activeListings.length },
        ]}
        actions={!isOwnProfile && <ReportButton target={{ type: 'user', id: profile.id, label: profile.name }} />}
      />

      <section className="px-4 pt-6">
        <h3 className="mb-3 text-base font-bold">{isOwnProfile ? 'Reviews to write' : `Rate ${profile.name.split(' ')[0]}`}</h3>
        {reviewable.length > 0 ? (
          <PendingReviewList transactions={reviewable} currentUserId={currentUser.id} onReview={setReviewing} />
        ) : (
          <p className="flex items-start gap-2 rounded-2xl bg-field p-3 text-sm text-muted">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" />
            {isOwnProfile
              ? 'You have reviewed all of your completed transactions.'
              : `You can rate and review ${profile.name.split(' ')[0]} after completing a transaction with them.`}
          </p>
        )}
      </section>

      <section className="px-4 pt-6">
        <h3 className="mb-3 text-base font-bold">Ratings &amp; reviews</h3>
        <RatingSummaryCard summary={summary} />
        {reviews.length === 0 ? (
          <EmptyState icon={MessageSquareText} title="No reviews yet" message="Reviews appear here after completed transactions." />
        ) : (
          <div className="divide-y divide-line">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} itemTitle={getTransaction(review.transactionId)?.listingTitle} />
            ))}
          </div>
        )}
      </section>

      {activeListings.length > 0 && (
        <section className="px-4 pb-6 pt-4">
          <h3 className="mb-3 text-base font-bold">{isOwnProfile ? 'Your listings' : `Listings by ${profile.name.split(' ')[0]}`}</h3>
          <ListingGrid listings={activeListings} linkTo={(listing) => `/listing/${listing.id}`} />
        </section>
      )}

      <ReviewDialog transaction={reviewing} revieweeName={reviewing ? revieweeOf(reviewing) : ''} onClose={() => setReviewing(null)} />
    </Screen>
  )
}
