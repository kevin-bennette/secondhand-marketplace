import { ChevronLeft, MessageCircleOff } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '../../components/common/Avatar'
import { EmptyState } from '../../components/common/EmptyState'
import { ProductImage } from '../../components/common/ProductImage'
import { MessageComposer } from '../../components/messaging/MessageComposer'
import { MessageList } from '../../components/messaging/MessageList'
import { PageHeader } from '../../components/navigation/PageHeader'
import { Screen } from '../../components/navigation/Screen'
import { useAuth, useCurrentUser } from '../../hooks/useAuth'
import { useChat } from '../../hooks/useChat'
import { useListings } from '../../hooks/useListings'
import { formatPrice } from '../../utils/format'

export function ChatPage() {
  const { id = '' } = useParams()
  const user = useCurrentUser()
  const navigate = useNavigate()
  const { getUser } = useAuth()
  const { getListing } = useListings()
  const { getConversation, sendMessage, markAsRead } = useChat()

  const conversation = getConversation(id)
  const isParticipant = conversation && (conversation.buyerId === user.id || conversation.sellerId === user.id)
  const messageCount = conversation?.messages.length ?? 0

  useEffect(() => {
    if (isParticipant) markAsRead(id, user.id)
  }, [id, user.id, isParticipant, messageCount, markAsRead])

  if (!conversation || !isParticipant) {
    return (
      <Screen header={<PageHeader title="Chat" backTo="/inbox" />}>
        <EmptyState icon={MessageCircleOff} title="Conversation not found" message="It may belong to another account." />
      </Screen>
    )
  }

  const other = getUser(conversation.buyerId === user.id ? conversation.sellerId : conversation.buyerId)
  const listing = getListing(conversation.listingId)
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/inbox', { replace: true }))

  return (
    <Screen
      className="bg-gray-50"
      header={
        <div className="border-b border-line bg-white">
          <div className="flex h-14 items-center gap-2 px-2">
            <button type="button" onClick={goBack} aria-label="Go back" className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
              <ChevronLeft className="h-6 w-6" />
            </button>
            {other && <Avatar name={other.name} color={other.avatarColor} size="sm" />}
            <h1 className="truncate text-base font-bold">{other?.name ?? 'Unknown user'}</h1>
          </div>
          {listing && (
            <Link to={`/listing/${listing.id}`} className="flex items-center gap-3 border-t border-line px-4 py-2 hover:bg-gray-50">
              <ProductImage src={listing.images[0]} alt={listing.title} className="h-10 w-10 rounded-lg" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{listing.title}</span>
                <span className="block text-xs text-muted">
                  {formatPrice(listing.price)}
                  {listing.status === 'sold' && ' · Sold'}
                </span>
              </span>
            </Link>
          )}
        </div>
      }
      footer={<MessageComposer onSend={(text) => sendMessage(conversation.id, user.id, text)} />}
    >
      {conversation.messages.length === 0 ? (
        <p className="px-8 py-10 text-center text-sm text-muted">
          Say hello to {other?.name.split(' ')[0] ?? 'the seller'}! Ask about the item’s condition, pick-up time or price.
        </p>
      ) : (
        <MessageList messages={conversation.messages} currentUserId={user.id} />
      )}
    </Screen>
  )
}
