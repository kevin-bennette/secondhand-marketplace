import { ShoppingBag } from 'lucide-react'
import type { ReactNode } from 'react'
import { Screen } from '../navigation/Screen'
import { APP_NAME } from '../../data/constants'

interface AuthShellProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

/** Shared layout for the login, registration and verification screens. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <Screen>
      <div className="flex min-h-full flex-col justify-center px-6 py-10">
        <div className="mb-8 flex items-center gap-2 text-primary">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-lg font-bold">{APP_NAME}</span>
        </div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-8 text-center text-sm text-muted">{footer}</div>}
      </div>
    </Screen>
  )
}
