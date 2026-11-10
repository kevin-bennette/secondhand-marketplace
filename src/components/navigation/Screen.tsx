import type { ReactNode } from 'react'

interface ScreenProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
}

/** Standard screen: fixed header/footer with a scrollable body. */
export function Screen({ header, footer, children, className = '' }: ScreenProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {header && <div className="shrink-0">{header}</div>}
      <div className={`no-scrollbar min-h-0 flex-1 overflow-y-auto ${className}`}>{children}</div>
      {footer && <div className="shrink-0 border-t border-line bg-white px-4 py-3">{footer}</div>}
    </div>
  )
}
