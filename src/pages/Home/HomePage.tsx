import { ShoppingBag } from 'lucide-react'
import { Screen } from '../../components/navigation/Screen'
import { APP_NAME } from '../../data/constants'

/** Landing screen. Replaced by the marketplace once user stories are integrated. */
export function HomePage() {
  return (
    <Screen>
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white">
          <ShoppingBag className="h-8 w-8" />
        </span>
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        <p className="mt-2 text-sm text-muted">Buy and sell pre-owned items in your neighbourhood.</p>
      </div>
    </Screen>
  )
}
