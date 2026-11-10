import { PackageX, ShieldAlert } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { buttonClasses } from '../../components/common/buttonStyles'
import { EmptyState } from '../../components/common/EmptyState'
import { DeleteListingButton } from '../../components/listings/DeleteListingButton'
import { ListingForm } from '../../components/listings/ListingForm'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { useCurrentUser } from '../../hooks/useAuth'
import { useListings } from '../../hooks/useListings'
import { useToast } from '../../hooks/useToast'

export function EditListingPage() {
  const { id = '' } = useParams()
  const user = useCurrentUser()
  const navigate = useNavigate()
  const { getListing, updateListing } = useListings()
  const { showToast } = useToast()
  const listing = getListing(id)

  if (!listing) {
    return (
      <Screen header={<PageHeader title="Edit Listing" backTo="/my-listings" />}>
        <EmptyState icon={PackageX} title="Listing not found" message="It may have been deleted." />
      </Screen>
    )
  }

  // Listing ownership validation: other accounts cannot open the edit form.
  if (listing.sellerId !== user.id) {
    return (
      <Screen header={<PageHeader title="Edit Listing" backTo={`/listing/${listing.id}`} />}>
        <EmptyState
          icon={ShieldAlert}
          title="Access denied"
          message="You can only edit listings that you created."
          action={
            <Link to={`/listing/${listing.id}`} className={buttonClasses('secondary', 'sm')}>
              Back to listing
            </Link>
          }
        />
      </Screen>
    )
  }

  if (listing.status === 'sold') {
    return (
      <Screen header={<PageHeader title="Edit Listing" backTo="/my-listings" />}>
        <EmptyState icon={PackageX} title="This item has been sold" message="Sold listings can no longer be edited." />
      </Screen>
    )
  }

  return (
    <Screen header={<PageHeader title="Edit Listing" backTo={`/listing/${listing.id}`} />}>
      <ListingForm
        submitLabel="Save Changes"
        initialValues={{
          title: listing.title,
          description: listing.description,
          category: listing.category,
          price: String(listing.price),
          condition: listing.condition,
          images: listing.images,
        }}
        onSubmit={(input) => {
          const result = updateListing(listing.id, input, user.id)
          if (!result.ok) {
            showToast(result.error, 'error')
            return
          }
          showToast('Your changes have been saved.')
          navigate(`/listing/${listing.id}`, { replace: true })
        }}
      />
      <div className="px-4 pb-6">
        <DeleteListingButton listing={listing} fullWidth onDeleted={() => navigate('/my-listings', { replace: true })} />
      </div>
    </Screen>
  )
}
