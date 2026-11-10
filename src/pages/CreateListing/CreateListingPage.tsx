import { useNavigate } from 'react-router-dom'
import { ListingForm } from '../../components/listings/ListingForm'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { useCurrentUser } from '../../hooks/useAuth'
import { useListings } from '../../hooks/useListings'
import { useToast } from '../../hooks/useToast'

export function CreateListingPage() {
  const user = useCurrentUser()
  const { createListing } = useListings()
  const { showToast } = useToast()
  const navigate = useNavigate()

  return (
    <Screen header={<PageHeader title="Create Listing" />}>
      <ListingForm
        submitLabel="Publish Listing"
        onSubmit={(input) => {
          const listing = createListing(input, user.id, user.location)
          showToast(`"${listing.title}" is now live in the marketplace.`)
          navigate('/', { replace: true, state: { highlight: listing.id } })
        }}
      />
    </Screen>
  )
}
