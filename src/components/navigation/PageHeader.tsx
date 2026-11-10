import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface PageHeaderProps {
  title: ReactNode
  /** Where the back button goes when there is no history (e.g. after a refresh). */
  backTo?: string
  showBack?: boolean
  actions?: ReactNode
}

export function PageHeader({ title, backTo = '/', showBack = true, actions }: PageHeaderProps) {
  const navigate = useNavigate()

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) navigate(-1)
    else navigate(backTo, { replace: true })
  }

  return (
    <header className="relative flex h-14 items-center justify-center border-b border-line bg-white px-12">
      {showBack && (
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="absolute left-2 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      <h1 className="truncate text-lg font-bold">{title}</h1>
      {actions && <div className="absolute right-2 flex items-center gap-1">{actions}</div>}
    </header>
  )
}
