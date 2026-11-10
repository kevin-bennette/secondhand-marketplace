import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useReports } from '../../hooks/useReports'

/** Moderator notification bell: shows how many new reports are waiting. Hidden for regular users. */
export function ModerationShortcut() {
  const { currentUser } = useAuth()
  const { unseenCount } = useReports()
  if (currentUser?.role !== 'admin') return null

  return (
    <Link
      to="/admin/reports"
      aria-label={unseenCount ? `Moderation: ${unseenCount} new reports` : 'Moderation dashboard'}
      className="relative rounded-full p-2 hover:bg-gray-100"
    >
      <span className="relative block">
        <Bell className="h-5 w-5" />
        {unseenCount > 0 && (
          <span className="absolute -right-2 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unseenCount}
          </span>
        )}
      </span>
    </Link>
  )
}
