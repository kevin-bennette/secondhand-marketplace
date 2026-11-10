import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '../../components/common/buttonStyles'
import { EmptyState } from '../../components/common/EmptyState'
import { ConversationListItem } from '../../components/messaging/ConversationListItem'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { useAuth, useCurrentUser } from '../../hooks/useAuth'
import { useChat } from '../../hooks/useChat'
import { useListings } from '../../hooks/useListings'

export function InboxPage() {
  const user = useCurrentUser()
  const { getUser } = useAuth()
  const { getListing } = useListings()
  const { conversationsFor, isUnread } = useChat()
  const conversations = conversationsFor(user.id)

  return (
    <Screen header={<PageHeader title="Inbox" />}>
      {conversations.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title="No messages yet"
          message="Tap “Chat with Seller” on any listing to ask a question."
          action={
            <Link to="/" className={buttonClasses('secondary', 'sm')}>
              Browse listings
            </Link>
          }
        />
      ) : (
        <ul className="divide-y divide-line">
          {conversations.map((conversation) => {
            const otherId = conversation.buyerId === user.id ? conversation.sellerId : conversation.buyerId
            const otherUser = getUser(otherId)
            if (!otherUser) return null
            return (
              <li key={conversation.id}>
                <ConversationListItem
                  conversation={conversation}
                  otherUser={otherUser}
                  listing={getListing(conversation.listingId)}
                  currentUserId={user.id}
                  unread={isUnread(conversation, user.id)}
                />
              </li>
            )
          })}
        </ul>
      )}
    </Screen>
  )
}
