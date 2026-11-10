import { CalendarDays, MapPin, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import type { PublicUser } from '../../types/user'
import { formatDate } from '../../utils/format'
import { Avatar } from '../common/Avatar'

interface ProfileHeaderProps {
  user: PublicUser
  stats: { label: string; value: string | number }[]
  actions?: ReactNode
}

export function ProfileHeader({ user, stats, actions }: ProfileHeaderProps) {
  return (
    <section className="px-4 pt-5">
      <div className="flex items-center gap-4">
        <Avatar name={user.name} color={user.avatarColor} size="xl" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold">{user.name}</h2>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5" /> {user.location}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
            <CalendarDays className="h-3.5 w-3.5" /> Member since {formatDate(user.joinedAt)}
          </p>
          {user.verified && (
            <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified email
            </p>
          )}
        </div>
      </div>
      {user.bio && <p className="mt-3 text-sm text-ink">{user.bio}</p>}
      <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line py-3 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-[11px] text-muted">{stat.label}</dt>
            <dd className="text-base font-bold">{stat.value}</dd>
          </div>
        ))}
      </dl>
      {actions && <div className="mt-3 flex gap-2">{actions}</div>}
    </section>
  )
}
