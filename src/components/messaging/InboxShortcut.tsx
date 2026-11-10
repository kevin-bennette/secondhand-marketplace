import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { UnreadBadge } from './UnreadBadge'

/** Chat icon for the marketplace header (Figma home screen). */
export function InboxShortcut() {
  return (
    <Link to="/inbox" aria-label="Inbox" className="relative rounded-full p-2 hover:bg-gray-100">
      <span className="relative block">
        <MessageCircle className="h-5 w-5" />
        <UnreadBadge />
      </span>
    </Link>
  )
}
