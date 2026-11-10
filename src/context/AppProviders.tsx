import type { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'
import { ChatProvider } from './ChatProvider'
import { ListingsProvider } from './ListingsProvider'
import { ToastProvider } from './ToastProvider'
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
          <ChatProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </ChatProvider>
        </ListingsProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
