import { Info, MapPin, ReceiptText, Star } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar } from '../../components/common/Avatar'
import { Badge } from '../../components/common/Badge'
import { Button } from '../../components/common/Button'
import { buttonClasses } from '../../components/common/buttonStyles'
import { EmptyState } from '../../components/common/EmptyState'
import { ProductImage } from '../../components/common/ProductImage'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { ReviewDialog } from '../../components/reviews/ReviewDialog'
import { SellerRating } from '../../components/reviews/SellerRating'
import { useAuth, useCurrentUser } from '../../hooks/useAuth'
import { useListings } from '../../hooks/useListings'
import { useReviews } from '../../hooks/useReviews'
import { useTransactions } from '../../hooks/useTransactions'
import { formatDate, formatPrice, formatTime } from '../../utils/format'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  )
}

export function TransactionDetailsPage() {
  const { id = '' } = useParams()
  const user = useCurrentUser()
  const { getUser } = useAuth()
  const { getListing } = useListings()
  const { getTransaction } = useTransactions()
  const { hasReviewed } = useReviews()
  const [reviewOpen, setReviewOpen] = useState(false)

  const transaction = getTransaction(id)
  const isParticipant = transaction && (transaction.buyerId === user.id || transaction.sellerId === user.id)

  if (!transaction || !isParticipant) {
    return (
      <Screen header={<PageHeader title="Transaction" backTo="/transactions" />}>
        <EmptyState icon={ReceiptText} title="Transaction not found" message="It may belong to another account." />
      </Screen>
    )
  }

  const isPurchase = transaction.buyerId === user.id
  const other = getUser(isPurchase ? transaction.sellerId : transaction.buyerId)
  const listingStillExists = Boolean(getListing(transaction.listingId))
  const reviewed = hasReviewed(transaction.id, user.id)

  return (
    <Screen header={<PageHeader title="Transaction Details" backTo="/transactions" />}>
      <section className="px-4 pt-5">
        <div className="flex items-center gap-4">
          <ProductImage src={transaction.listingImage} alt={transaction.listingTitle} className="h-20 w-20 shrink-0 rounded-2xl border border-line" />
          <div className="min-w-0">
            <Badge tone={isPurchase ? 'blue' : 'green'}>{isPurchase ? 'Purchase' : 'Sale'}</Badge>
            <h2 className="mt-1 text-base font-bold leading-snug">{transaction.listingTitle}</h2>
            <p className="text-xs text-muted">{transaction.category}</p>
            {listingStillExists && (
              <Link to={`/listing/${transaction.listingId}`} className="text-xs font-semibold text-primary hover:underline">
                View listing
              </Link>
            )}
          </div>
        </div>

        <dl className="mt-5 divide-y divide-line rounded-2xl border border-line px-4">
          <Row label="Price">{formatPrice(transaction.price)}</Row>
          <Row label="Date">
            {formatDate(transaction.completedAt)}, {formatTime(transaction.completedAt)}
          </Row>
          <Row label="Status">
            <Badge tone="green">Completed</Badge>
          </Row>
          <Row label="Reference">
            <span className="font-mono text-xs">{transaction.id.toUpperCase()}</span>
          </Row>
        </dl>
      </section>

      <section className="px-4 pt-5">
        <h3 className="mb-2 text-base font-bold">{isPurchase ? 'Seller' : 'Buyer'}</h3>
        {other ? (
          <div className="flex items-center gap-3 rounded-2xl border border-line p-3">
            <Avatar name={other.name} color={other.avatarColor} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{other.name}</p>
              <SellerRating userId={other.id} />
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                <MapPin className="h-3 w-3" /> {other.location}
              </p>
            </div>
            <Link to={`/profile/${other.id}`} className={buttonClasses('outline', 'sm')}>
              Profile
            </Link>
          </div>
        ) : (
          <p className="text-sm text-muted">This account no longer exists.</p>
        )}
      </section>

      {other && (
        <section className="px-4 pt-5">
          {reviewed ? (
            <p className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
              <Star className="h-4 w-4 fill-current" /> You have reviewed {other.name.split(' ')[0]} for this transaction.
            </p>
          ) : (
            <Button fullWidth variant="secondary" icon={<Star className="h-4 w-4" />} onClick={() => setReviewOpen(true)}>
              Rate &amp; review {other.name.split(' ')[0]}
            </Button>
          )}
        </section>
      )}

      <p className="mx-4 my-5 flex items-start gap-2 rounded-xl bg-field p-3 text-xs text-muted">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Demonstration record only – no real payment was processed for this transaction.
      </p>

      <ReviewDialog transaction={reviewOpen ? transaction : null} revieweeName={other?.name ?? ''} onClose={() => setReviewOpen(false)} />
    </Screen>
  )
}
