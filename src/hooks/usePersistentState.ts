import { useEffect, useState } from 'react'
import { loadState, saveState } from '../services/storage'

/** useState that is initialised from, and written back to, LocalStorage. */
export function usePersistentState<T>(key: string, initial: T | (() => T)) {
  const [state, setState] = useState<T>(() =>
    loadState<T>(key, typeof initial === 'function' ? (initial as () => T)() : initial),
  )

  useEffect(() => {
    saveState(key, state)
  }, [key, state])

  return [state, setState] as const
}
