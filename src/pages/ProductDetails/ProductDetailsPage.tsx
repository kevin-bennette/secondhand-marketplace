import { ChevronLeft, PackageX } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmptyState } from '../../components/common/EmptyState'
import { ImageGallery } from '../../components/listings/ImageGallery'
import { ListingSummary } from '../../components/listings/ListingSummary'
import { SellerCard } from '../../components/listings/SellerCard'
import { SimilarProducts } from '../../components/marketplace/SimilarProducts'
import { ChatWithSellerButton } from '../../components/messaging/ChatWithSellerButton'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { useAuth, useCurrentUser } from '../../hooks/useAuth'
import { useListings } from '../../hooks/useListings'

export function ProductDetailsPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const user = useCurrentUser()
  const { getListing } = useListings()
  const { getUser } = useAuth()

  const listing = getListing(id)
  const seller = listing ? getUser(listing.sellerId) : undefined

  if (!listing || !seller) {
    return (
      <Screen header={<PageHeader title="Listing" />}>
        <EmptyState icon={PackageX} title="Listing not found" message="This item may have been removed by the seller." />
      </Screen>
    )
  }

  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/', { replace: true }))
  const isOwner = listing.sellerId === user.id

  const footer = isOwner ? (
    <p className="py-2 text-center text-sm text-muted">You are the seller of this listing.</p>
  ) : listing.status === 'active' ? (
    <ChatWithSellerButton listing={listing} />
  ) : (
    <p className="py-2 text-center text-sm text-muted">This item has been sold.</p>
  )

  return (
    <Screen key={listing.id} footer={footer}>
      <div className="relative">
        <ImageGallery images={listing.images} title={listing.title} />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <button type="button" onClick={goBack} aria-label="Go back" className="rounded-full bg-white/90 p-2 shadow hover:bg-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ListingSummary listing={listing} />
      <SellerCard seller={seller} location={listing.location} />

      <div className="h-5" />
      <SimilarProducts listing={listing} />
    </Screen>
  )
}
