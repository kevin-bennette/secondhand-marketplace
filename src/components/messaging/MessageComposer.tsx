import { SendHorizontal } from 'lucide-react'
import { useState, type FormEvent } from 'react'

export function MessageComposer({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Message"
        aria-label="Message"
        maxLength={1000}
        className="h-10 flex-1 rounded-full border border-line bg-field px-4 text-sm placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        aria-label="Send message"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white disabled:opacity-40"
      >
        <SendHorizontal className="h-[18px] w-[18px]" />
      </button>
    </form>
  )
}
