const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'Email is required.'
  if (!isValidEmail(email)) return 'Please enter a valid email address (e.g. name@example.com).'
  return undefined
}

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Password is required.'
  if (password.length < 8) return 'Password must be at least 8 characters.'
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return 'Password must contain letters and numbers.'
  return undefined
}

export function validateRequired(value: string, label: string): string | undefined {
  return value.trim() ? undefined : `${label} is required.`
}
