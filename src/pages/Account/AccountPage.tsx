import { ChevronRight, LogOut, MapPin, RotateCcw, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '../../components/common/Avatar'
import { ConfirmDialog } from '../../components/common/ConfirmDialog'
import { accountMenu } from '../../components/navigation/accountMenu'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { useAuth, useCurrentUser } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { clearAllState } from '../../services/storage'

export function AccountPage() {
  const user = useCurrentUser()
  const { logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [confirmReset, setConfirmReset] = useState(false)

  const items = accountMenu.filter((item) => !item.adminOnly || user.role === 'admin')

  const handleLogout = () => {
    logout()
    showToast('You have been signed out.', 'info')
    navigate('/login', { replace: true })
  }

  return (
    <Screen header={<PageHeader title="Account" showBack={false} />}>
      <section className="flex items-center gap-4 px-5 py-6">
        <Avatar name={user.name} color={user.avatarColor} size="lg" />
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold">{user.name}</h2>
          <p className="truncate text-sm text-muted">{user.email}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5" /> {user.location}
          </p>
          {user.verified && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Email verified
            </p>
          )}
        </div>
      </section>

      {items.length > 0 && (
        <ul className="mx-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {items.map(({ to, label, description, icon: Icon }) => (
            <li key={to}>
              <Link to={to} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block truncate text-xs text-muted">{description}</span>
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mx-4 mt-4 flex flex-col gap-2 pb-6">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-[18px] w-[18px]" /> Log out
        </button>
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-medium text-muted hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4" /> Reset demo data
        </button>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset demo data?"
        message="All locally stored accounts, listings and activity will be restored to the original sample data, and you will be signed out."
        confirmLabel="Reset"
        destructive
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          clearAllState()
          window.location.assign('/login')
        }}
      />
    </Screen>
  )
}
