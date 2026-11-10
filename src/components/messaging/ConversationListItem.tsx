import { Link } from 'react-router-dom'
import type { Conversation } from '../../types/chat'
import type { Listing } from '../../types/listing'
import type { PublicUser } from '../../types/user'
import { formatShortDate } from '../../utils/format'
import { Avatar } from '../common/Avatar'

interface ConversationListItemProps {
  conversation: Conversation
  otherUser: PublicUser
  listing?: Listing
  currentUserId: string
  unread: boolean
}

export function ConversationListItem({ conversation, otherUser, listing, currentUserId, unread }: ConversationListItemProps) {
  const last = conversation.messages.at(-1)
  const preview = last ? `${last.senderId === currentUserId ? 'You: ' : ''}${last.text}` : 'No messages yet'

  return (
    <Link to={`/chat/${conversation.id}`} className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50">
      <Avatar name={otherUser.name} color={otherUser.avatarColor} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">
          <span className="font-semibold">{otherUser.name}</span>
          <span className="text-muted"> · {listing?.title ?? 'Removed listing'}</span>
        </p>
        <p className={`truncate text-xs ${unread ? 'font-semibold text-ink' : 'text-muted'}`}>
          {preview}
          {last && <span className="font-normal text-muted"> · {formatShortDate(last.sentAt)}</span>}
        </p>
      </div>
      {unread && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
    </Link>
  )
}
