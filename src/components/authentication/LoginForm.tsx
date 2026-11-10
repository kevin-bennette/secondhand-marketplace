import { useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail } from '../../utils/validation'
import { Button } from '../common/Button'
import { TextField } from '../common/FormFields'

interface LoginFormProps {
  initialEmail?: string
  onSuccess: () => void
}

export const DEMO_CREDENTIALS = { email: 'demo@reloop.test', password: 'demo1234' }

export function LoginForm({ initialEmail = '', onSuccess }: LoginFormProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = {
      email: validateEmail(email),
      password: password ? undefined : 'Password is required.',
    }
    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors)
      return
    }
    const result = login(email, password)
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }
    onSuccess()
  }

  const useDemoAccount = () => {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="Example@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="At least 8 characters"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
      />
      {errors.form && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errors.form}
        </p>
      )}
      <Button type="submit" fullWidth>
        Sign in
      </Button>

      <div className="mt-2 rounded-xl border border-dashed border-primary/40 bg-primary-light/50 p-3 text-xs text-ink">
        <p className="font-semibold">Demo account</p>
        <p className="mt-0.5 text-muted">
          {DEMO_CREDENTIALS.email} · {DEMO_CREDENTIALS.password}
        </p>
        <button type="button" onClick={useDemoAccount} className="mt-2 font-semibold text-primary hover:underline">
          Fill in demo credentials
        </button>
      </div>
    </form>
  )
}
