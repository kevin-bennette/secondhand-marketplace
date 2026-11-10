import type { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { ChatProvider } from './ChatProvider'
import { ListingsProvider } from './ListingsProvider'
import { ReportsProvider } from './ReportsProvider'
import { ReviewsProvider } from './ReviewsProvider'
import { ToastProvider } from './ToastProvider'
import { TransactionsProvider } from './TransactionsProvider'
import { WishlistProvider } from './WishlistProvider'

/**
 * Composes every application-wide provider. Each user story registers its
 * shared state here so features stay in sync (e.g. new listings update the marketplace).
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ListingsProvider>
          <TransactionsProvider>
            <ReviewsProvider>
              <ChatProvider>
                <WishlistProvider>
                  <ReportsProvider>{children}</ReportsProvider>
                </WishlistProvider>
              </ChatProvider>
            </ReviewsProvider>
          </TransactionsProvider>
        </ListingsProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
