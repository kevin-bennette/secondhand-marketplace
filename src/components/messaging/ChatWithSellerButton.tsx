import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useAuth'
import { useChat } from '../../hooks/useChat'
import type { Listing } from '../../types/listing'
import { Button } from '../common/Button'

/** Starts (or resumes) a conversation with the listing's seller. */
export function ChatWithSellerButton({ listing, fullWidth = true }: { listing: Listing; fullWidth?: boolean }) {
  const user = useCurrentUser()
  const { startConversation } = useChat()
  const navigate = useNavigate()

  if (listing.sellerId === user.id) return null

  return (
    <Button
      fullWidth={fullWidth}
      icon={<MessageCircle className="h-[18px] w-[18px]" />}
      onClick={() => navigate(`/chat/${startConversation(listing, user.id).id}`)}
    >
      Chat with Seller
    </Button>
  )
}
