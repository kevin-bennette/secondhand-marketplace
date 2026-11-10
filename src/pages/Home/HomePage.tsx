import { ShoppingBag } from 'lucide-react'
import { Screen } from '../../components/navigation/Screen'
import { APP_NAME } from '../../data/constants'
import { useCurrentUser } from '../../hooks/useAuth'

/** Home screen. Becomes the marketplace once browsing (US3) is integrated. */
export function HomePage() {
  const user = useCurrentUser()

  return (
    <Screen>
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white">
          <ShoppingBag className="h-8 w-8" />
        </span>
        <h1 className="text-2xl font-bold">Welcome, {user.name.split(' ')[0]}!</h1>
        <p className="mt-2 text-sm text-muted">You are signed in to {APP_NAME}.</p>
      </div>
    </Screen>
  )
}
