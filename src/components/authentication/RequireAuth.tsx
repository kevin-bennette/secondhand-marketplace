import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/** Route guard: only authenticated users can access the marketplace. */
export function RequireAuth() {
  const { currentUser } = useAuth()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }
  return <Outlet />
}

/** Login/registration screens redirect signed-in users to the home page. */
export function PublicOnly() {
  const { currentUser } = useAuth()
  return currentUser ? <Navigate to="/" replace /> : <Outlet />
}
