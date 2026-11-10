import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}

/** For screens behind <RequireAuth>, where a signed-in user is guaranteed. */
export function useCurrentUser() {
  const { currentUser } = useAuth()
  if (!currentUser) throw new Error('useCurrentUser called without a signed-in user')
  return currentUser
}
