import { PackageOpen, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/common/buttonStyles'
import { EmptyState } from '../../components/common/EmptyState'
import { MyListingRow } from '../../components/listings/MyListingRow'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { useCurrentUser } from '../../hooks/useAuth'
import { useListings } from '../../hooks/useListings'
import type { ListingStatus } from '../../types/listing'

const tabs: { value: ListingStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'sold', label: 'Sold' },
]

export function MyListingsPage() {
  const user = useCurrentUser()
  const { listings } = useListings()
  const [tab, setTab] = useState<ListingStatus>('active')

  const mine = listings.filter((listing) => listing.sellerId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const visible = mine.filter((listing) => listing.status === tab)

  return (
    <Screen
      header={
        <>
          <PageHeader
            title="My Listings"
            backTo="/account"
            actions={
              <Link to="/sell" aria-label="Create listing" className="rounded-full p-2 text-primary hover:bg-primary-light">
                <Plus className="h-5 w-5" />
              </Link>
            }
          />
          <div className="flex border-b border-line bg-white" role="tablist">
            {tabs.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                onClick={() => setTab(value)}
                className={`flex-1 border-b-2 py-2.5 text-sm font-semibold ${tab === value ? 'border-primary text-primary' : 'border-transparent text-muted'}`}
              >
                {label} ({mine.filter((listing) => listing.status === value).length})
              </button>
            ))}
          </div>
        </>
      }
    >
      {visible.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title={tab === 'active' ? 'No active listings' : 'Nothing sold yet'}
          message={tab === 'active' ? 'Items you list for sale will appear here.' : 'Sold items will appear here.'}
          action={
            tab === 'active' && (
              <Link to="/sell" className={buttonClasses('secondary', 'sm')}>
                Create a listing
              </Link>
            )
          }
        />
      ) : (
        <div className="divide-y divide-line">
          {visible.map((listing) => (
            <MyListingRow key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </Screen>
  )
}
