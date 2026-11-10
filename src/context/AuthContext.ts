import { createContext } from 'react'
import type { PublicUser } from '../types/user'

export type AuthResult = { ok: true } | { ok: false; error: string }

export interface RegistrationInput {
  name: string
  email: string
  password: string
  location: string
}

export interface PendingRegistration {
  email: string
  /** Simulated verification code – displayed in the demo instead of being emailed. */
  code: string
}

export interface AuthContextValue {
  users: PublicUser[]
  currentUser: PublicUser | null
  pendingRegistration: PendingRegistration | null
  login: (email: string, password: string) => AuthResult
  logout: () => void
  startRegistration: (input: RegistrationInput) => AuthResult
  resendVerificationCode: () => void
  verifyRegistration: (code: string) => AuthResult
  cancelRegistration: () => void
  getUser: (id: string) => PublicUser | undefined
}

export const AuthContext = createContext<AuthContextValue | null>(null)
