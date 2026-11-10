import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { seedConversations } from '../data/conversations'
import { seedUsers } from '../data/users'
import { usePersistentState } from '../hooks/usePersistentState'
import type { Conversation, Message } from '../types/chat'
import { createId } from '../utils/format'
import { ChatContext, type ChatContextValue } from './ChatContext'

const AUTO_REPLY_DELAY_MS = 1500
const seedAccountIds = new Set(seedUsers.map((user) => user.id))

/**
 * Simulated messaging. Conversations are stored in LocalStorage, so they persist when
 * navigating away and are visible to the other participant when they sign in.
 * There is no real-time server: demo sellers send a single labelled auto-reply.
 */
export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = usePersistentState<Conversation[]>('conversations', seedConversations)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), [])

  const appendMessage = useCallback(
    (conversationId: string, message: Message) =>
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, message],
                updatedAt: message.sentAt,
                // Sending implies the sender has read the thread – except simulated auto-replies.
                lastReadAt: message.automated
                  ? conversation.lastReadAt
                  : { ...conversation.lastReadAt, [message.senderId]: message.sentAt },
              }
            : conversation,
        ),
      ),
    [setConversations],
  )

  const conversationsFor = useCallback(
    (userId: string) =>
      conversations
        .filter((conversation) => (conversation.buyerId === userId || conversation.sellerId === userId) && conversation.messages.length > 0)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [conversations],
  )

  const getConversation = useCallback((id: string) => conversations.find((conversation) => conversation.id === id), [conversations])

  const startConversation = useCallback<ChatContextValue['startConversation']>(
    (listing, buyerId) => {
      const existing = conversations.find(
        (conversation) => conversation.listingId === listing.id && conversation.buyerId === buyerId && conversation.sellerId === listing.sellerId,
      )
      if (existing) return existing
      const now = new Date().toISOString()
      const conversation: Conversation = {
        id: createId('c'),
        listingId: listing.id,
        buyerId,
        sellerId: listing.sellerId,
        messages: [],
        updatedAt: now,
        lastReadAt: { [buyerId]: now },
      }
      setConversations((current) => [conversation, ...current])
      return conversation
    },
    [conversations, setConversations],
  )

  const sendMessage = useCallback<ChatContextValue['sendMessage']>(
    (conversationId, senderId, text) => {
      const trimmed = text.trim()
      const conversation = conversations.find((item) => item.id === conversationId)
      if (!trimmed || !conversation) return

      appendMessage(conversationId, { id: createId('m'), senderId, text: trimmed, sentAt: new Date().toISOString() })

      // Demo convenience: the first message a buyer sends to a sample seller gets an automatic acknowledgement.
      const isFirstBuyerMessage = senderId === conversation.buyerId && !conversation.messages.some((m) => m.senderId === senderId)
      if (isFirstBuyerMessage && seedAccountIds.has(conversation.sellerId)) {
        const timer = window.setTimeout(() => {
          appendMessage(conversationId, {
            id: createId('m'),
            senderId: conversation.sellerId,
            text: 'Thanks for your message! The item is still available – I’ll reply properly shortly.',
            sentAt: new Date().toISOString(),
            automated: true,
          })
        }, AUTO_REPLY_DELAY_MS)
        timers.current.push(timer)
      }
    },
    [conversations, appendMessage],
  )

  const markAsRead = useCallback<ChatContextValue['markAsRead']>(
    (conversationId, userId) =>
      setConversations((current) =>
        current.map((conversation) => {
          if (conversation.id !== conversationId) return conversation
          const latest = conversation.messages.at(-1)?.sentAt ?? conversation.updatedAt
          if ((conversation.lastReadAt[userId] ?? '') >= latest) return conversation
          return { ...conversation, lastReadAt: { ...conversation.lastReadAt, [userId]: latest } }
        }),
      ),
    [setConversations],
  )

  /** Unread when someone else wrote (by hand) after the user last opened the thread. */
  const isUnread = useCallback((conversation: Conversation, userId: string) => {
    const lastRead = conversation.lastReadAt[userId] ?? ''
    return conversation.messages.some((message) => message.senderId !== userId && !message.automated && message.sentAt > lastRead)
  }, [])

  const unreadCount = useCallback(
    (userId: string) => conversationsFor(userId).filter((conversation) => isUnread(conversation, userId)).length,
    [conversationsFor, isUnread],
  )

  const value = useMemo<ChatContextValue>(
    () => ({ conversationsFor, getConversation, startConversation, sendMessage, markAsRead, isUnread, unreadCount }),
    [conversationsFor, getConversation, startConversation, sendMessage, markAsRead, isUnread, unreadCount],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
