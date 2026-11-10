import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { seedUsers } from '../data/users'
import { usePersistentState } from '../hooks/usePersistentState'
import type { PublicUser, User } from '../types/user'
import { createId } from '../utils/format'
import { isValidEmail } from '../utils/validation'
import { AuthContext, type AuthContextValue, type PendingRegistration, type RegistrationInput } from './AuthContext'

const AVATAR_COLOURS = ['#0b6bff', '#e11d48', '#059669', '#d97706', '#7c3aed', '#0891b2', '#db2777']

function toPublic({ password: _password, ...user }: User): PublicUser {
  return user
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

/**
 * Simulated authentication. Accounts live in LocalStorage; registration requires a
 * (simulated) email verification code before the account is created.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = usePersistentState<User[]>('users', seedUsers)
  const [sessionUserId, setSessionUserId] = usePersistentState<string | null>('session', null)
  const [pending, setPending] = useState<(PendingRegistration & { input: RegistrationInput }) | null>(null)

  const users = useMemo(() => accounts.map(toPublic), [accounts])
  const currentUser = useMemo(() => users.find((user) => user.id === sessionUserId) ?? null, [users, sessionUserId])

  const login = useCallback<AuthContextValue['login']>(
    (email, password) => {
      if (!isValidEmail(email)) return { ok: false, error: 'Please enter a valid email address.' }
      const account = accounts.find((item) => item.email.toLowerCase() === email.trim().toLowerCase())
      if (!account || account.password !== password) return { ok: false, error: 'Incorrect email or password.' }
      if (!account.verified) return { ok: false, error: 'Please verify your email address before signing in.' }
      setSessionUserId(account.id)
      return { ok: true }
    },
    [accounts, setSessionUserId],
  )

  const logout = useCallback(() => setSessionUserId(null), [setSessionUserId])

  const startRegistration = useCallback<AuthContextValue['startRegistration']>(
    (input) => {
      const email = input.email.trim().toLowerCase()
      if (!isValidEmail(email)) return { ok: false, error: 'Please enter a valid email address.' }
      if (accounts.some((item) => item.email.toLowerCase() === email)) {
        return { ok: false, error: 'An account with this email already exists. Please sign in.' }
      }
      setPending({ email, code: generateCode(), input: { ...input, email } })
      return { ok: true }
    },
    [accounts],
  )

  const resendVerificationCode = useCallback(() => {
    setPending((current) => (current ? { ...current, code: generateCode() } : current))
  }, [])

  const verifyRegistration = useCallback<AuthContextValue['verifyRegistration']>(
    (code) => {
      if (!pending) return { ok: false, error: 'Your registration session has expired. Please start again.' }
      if (code.trim() !== pending.code) return { ok: false, error: 'That verification code is incorrect.' }
      const { input } = pending
      const account: User = {
        id: createId('u'),
        name: input.name.trim(),
        email: input.email,
        password: input.password,
        location: input.location.trim() || 'Melbourne, VIC',
        avatarColor: AVATAR_COLOURS[accounts.length % AVATAR_COLOURS.length],
        joinedAt: new Date().toISOString(),
        verified: true,
        role: 'user',
      }
      setAccounts((current) => [...current, account])
      setPending(null)
      return { ok: true }
    },
    [pending, accounts.length, setAccounts],
  )

  const cancelRegistration = useCallback(() => setPending(null), [])

  const getUser = useCallback((id: string) => users.find((user) => user.id === id), [users])

  const value = useMemo<AuthContextValue>(
    () => ({
      users,
      currentUser,
      pendingRegistration: pending ? { email: pending.email, code: pending.code } : null,
      login,
      logout,
      startRegistration,
      resendVerificationCode,
      verifyRegistration,
      cancelRegistration,
      getUser,
    }),
    [users, currentUser, pending, login, logout, startRegistration, resendVerificationCode, verifyRegistration, cancelRegistration, getUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
