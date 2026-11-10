import { Fragment, useEffect, useRef } from 'react'
import type { Message } from '../../types/chat'
import { formatDate } from '../../utils/format'
import { MessageBubble } from './MessageBubble'

/** Conversation history grouped by day, auto-scrolled to the newest message. */
export function MessageList({ messages, currentUserId }: { messages: Message[]; currentUserId: string }) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length])

  return (
    <div className="flex flex-col gap-2 px-4 py-4" role="log" aria-live="polite">
      {messages.map((message, index) => {
        const day = formatDate(message.sentAt)
        const showDay = index === 0 || formatDate(messages[index - 1].sentAt) !== day
        return (
          <Fragment key={message.id}>
            {showDay && <p className="my-2 text-center text-[11px] font-medium text-muted">{day}</p>}
            <MessageBubble message={message} mine={message.senderId === currentUserId} />
          </Fragment>
        )
      })}
      <div ref={endRef} />
    </div>
  )
}
