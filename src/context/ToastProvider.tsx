import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { createId } from '../utils/format'
import { ToastContext, type ToastTone } from './ToastContext'

interface Toast {
  id: string
  message: string
  tone: ToastTone
}

const icons = { success: CheckCircle2, error: XCircle, info: Info }
const tones = {
  success: 'bg-emerald-600',
  error: 'bg-red-600',
  info: 'bg-gray-900',
}

/** App-wide confirmation/error messages, shown at the top of the phone frame. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = createId('toast')
    setToasts((current) => [...current, { id, message, tone }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3200)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none absolute inset-x-0 top-3 z-[60] flex flex-col items-center gap-2 px-4" aria-live="polite">
        {toasts.map((toast) => {
          const Icon = icons[toast.tone]
          return (
            <div
              key={toast.id}
              role="status"
              className={`pointer-events-auto flex w-full items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${tones[toast.tone]}`}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{toast.message}</span>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
