import { createContext } from 'react'
import type { Conversation } from '../types/chat'
import type { Listing } from '../types/listing'

export interface ChatContextValue {
  conversationsFor: (userId: string) => Conversation[]
  getConversation: (id: string) => Conversation | undefined
  /** Returns the existing buyer–seller conversation for a listing, or creates a new one. */
  startConversation: (listing: Listing, buyerId: string) => Conversation
  sendMessage: (conversationId: string, senderId: string, text: string) => void
  markAsRead: (conversationId: string, userId: string) => void
  isUnread: (conversation: Conversation, userId: string) => boolean
  unreadCount: (userId: string) => number
}

export const ChatContext = createContext<ChatContextValue | null>(null)
