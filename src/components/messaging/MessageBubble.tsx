import type { Message } from '../../types/chat'
import { formatTime } from '../../utils/format'

export function MessageBubble({ message, mine }: { message: Message; mine: boolean }) {
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm ${
          mine ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md border border-line bg-white text-ink'
        }`}
      >
        {message.automated && <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide opacity-60">Auto-reply</span>}
        <span className="whitespace-pre-wrap break-words">{message.text}</span>
        <time dateTime={message.sentAt} className={`ml-2 inline-block text-[10px] ${mine ? 'text-blue-100' : 'text-gray-400'}`}>
          {formatTime(message.sentAt)}
        </time>
      </div>
    </div>
  )
}
