import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicOnly, RequireAuth } from './components/authentication/RequireAuth'
import { AppLayout } from './components/navigation/AppLayout'
import { PhoneFrame } from './components/navigation/PhoneFrame'
import { AppProviders } from './context/AppProviders'
import { AccountPage } from './pages/Account/AccountPage'
import { ChatPage } from './pages/Chat/ChatPage'
import { CreateListingPage } from './pages/CreateListing/CreateListingPage'
import { EditListingPage } from './pages/EditListing/EditListingPage'
import { InboxPage } from './pages/Inbox/InboxPage'
import { MarketplacePage } from './pages/Marketplace/MarketplacePage'
import { MyListingsPage } from './pages/MyListings/MyListingsPage'
import { LoginPage } from './pages/Login/LoginPage'
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetailsPage'
import { RegisterPage } from './pages/Register/RegisterPage'

export default function App() {
  return (
    <PhoneFrame>
      <AppProviders>
        <Routes>
          {/* US1 – public authentication screens */}
          <Route element={<PublicOnly />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Authenticated area */}
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route index element={<MarketplacePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/sell" element={<CreateListingPage />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/my-listings" element={<MyListingsPage />} />
            </Route>

            {/* Full-screen pages (no bottom navigation) */}
            <Route path="/listing/:id" element={<ProductDetailsPage />} />
            <Route path="/listing/:id/edit" element={<EditListingPage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviders>
    </PhoneFrame>
  )
}
