import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicOnly, RequireAuth } from './components/authentication/RequireAuth'
import { AppLayout } from './components/navigation/AppLayout'
import { PhoneFrame } from './components/navigation/PhoneFrame'
import { AppProviders } from './context/AppProviders'
import { AccountPage } from './pages/Account/AccountPage'
import { CreateListingPage } from './pages/CreateListing/CreateListingPage'
import { HomePage } from './pages/Home/HomePage'
import { LoginPage } from './pages/Login/LoginPage'
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
              <Route index element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/sell" element={<CreateListingPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviders>
    </PhoneFrame>
  )
}
