import { useAuth } from '../../hooks/useAuth'
import { useChat } from '../../hooks/useChat'

/** Red counter of conversations with unread messages (used on navigation icons). */
export function UnreadBadge() {
  const { currentUser } = useAuth()
  const { unreadCount } = useChat()
  const count = currentUser ? unreadCount(currentUser.id) : 0
  if (count === 0) return null

  return (
    <span
      aria-label={`${count} unread`}
      className="absolute -right-2 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
    >
      {count}
    </span>
  )
}
