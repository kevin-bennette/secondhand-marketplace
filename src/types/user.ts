export type UserRole = 'user' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  /** Demo only: stored locally in plain text. Never do this in production. */
  password: string
  location: string
  avatarColor: string
  joinedAt: string
  verified: boolean
  role: UserRole
  bio?: string
}

export type PublicUser = Omit<User, 'password'>
