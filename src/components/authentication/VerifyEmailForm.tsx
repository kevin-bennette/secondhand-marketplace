import { MailCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../common/Button'
import { TextField } from '../common/FormFields'

interface VerifyEmailFormProps {
  onVerified: (email: string) => void
  onBack: () => void
}

/** Step 2 of registration: simulated email verification with a 6-digit code. */
export function VerifyEmailForm({ onVerified, onBack }: VerifyEmailFormProps) {
  const { pendingRegistration, verifyRegistration, resendVerificationCode } = useAuth()
  const [code, setCode] = useState('')
  const [error, setError] = useState<string>()

  if (!pendingRegistration) return null

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!/^\d{6}$/.test(code.trim())) {
      setError('Enter the 6-digit code.')
      return
    }
    const email = pendingRegistration.email
    const result = verifyRegistration(code)
    if (!result.ok) {
      setError(result.error)
      return
    }
    onVerified(email)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="rounded-xl border border-line bg-field p-4 text-sm">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <MailCheck className="h-4 w-4 text-primary" /> Simulated email
        </div>
        <p className="mt-1 text-muted">
          In this demo no real email is sent. Your verification code for <strong className="text-ink">{pendingRegistration.email}</strong> is:
        </p>
        <p className="mt-2 font-mono text-2xl font-bold tracking-[0.3em] text-primary" data-testid="verification-code">
          {pendingRegistration.code}
        </p>
      </div>
      <TextField
        label="Verification code"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="6-digit code"
        value={code}
        onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
        error={error}
      />
      <Button type="submit" fullWidth>
        Verify &amp; create account
      </Button>
      <div className="flex justify-between text-sm">
        <button type="button" className="font-medium text-muted hover:text-ink" onClick={onBack}>
          Change details
        </button>
        <button
          type="button"
          className="font-semibold text-primary hover:underline"
          onClick={() => {
            resendVerificationCode()
            setCode('')
            setError(undefined)
          }}
        >
          Resend code
        </button>
      </div>
    </form>
  )
}
