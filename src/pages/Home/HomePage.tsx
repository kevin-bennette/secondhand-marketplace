import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/common/buttonStyles'
import { ListingGrid } from '../../components/listings/ListingGrid'
import { Screen } from '../../components/navigation/Screen'
import { useCurrentUser } from '../../hooks/useAuth'
import { useListings } from '../../hooks/useListings'

/** Home screen showing the latest listings. Expanded into the full marketplace by US3. */
export function HomePage() {
  const user = useCurrentUser()
  const { activeListings } = useListings()

  return (
    <Screen>
      <header className="px-4 pb-2 pt-5">
        <h1 className="text-xl font-bold text-primary">Marketplace</h1>
        <p className="text-sm text-muted">Hi {user.name.split(' ')[0]}, here&apos;s what&apos;s new near you.</p>
      </header>
      <div className="flex justify-center py-3">
        <Link to="/sell" className={buttonClasses('outline', 'sm')}>
          <Plus className="h-4 w-4" /> Create a listing
        </Link>
      </div>
      <section className="px-4 pb-6">
        <h2 className="mb-3 text-base font-bold">Latest listings</h2>
        <ListingGrid listings={activeListings} />
      </section>
    </Screen>
  )
}
