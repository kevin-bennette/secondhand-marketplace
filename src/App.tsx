import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/navigation/AppLayout'
import { PhoneFrame } from './components/navigation/PhoneFrame'
import { AppProviders } from './context/AppProviders'
import { HomePage } from './pages/Home/HomePage'

export default function App() {
  return (
    <PhoneFrame>
      <AppProviders>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviders>
    </PhoneFrame>
  )
}
