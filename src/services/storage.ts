/**
 * Thin wrapper around LocalStorage used to persist all demonstration data.
 * Every key is namespaced so the demo can be reset without touching other sites' data.
 */
const PREFIX = 'reloop:v1:'

export function loadState<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function saveState<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Unable to persist "${key}" to LocalStorage`, error)
  }
}

export function clearAllState(): void {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => window.localStorage.removeItem(key))
  } catch {
    // Storage unavailable (private mode etc.) – nothing to clear.
  }
}
