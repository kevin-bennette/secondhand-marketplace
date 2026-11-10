import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/authentication/AuthShell'
import { RegisterForm } from '../../components/authentication/RegisterForm'
import { VerifyEmailForm } from '../../components/authentication/VerifyEmailForm'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

export function RegisterPage() {
  const navigate = useNavigate()
  const { pendingRegistration, cancelRegistration } = useAuth()
  const { showToast } = useToast()

  if (pendingRegistration) {
    return (
      <AuthShell title="Verify your email" subtitle="Enter the code we sent to confirm your email address.">
        <VerifyEmailForm
          onBack={cancelRegistration}
          onVerified={(email) => {
            showToast('Email verified – your account has been created. Please sign in.')
            navigate('/login', { replace: true, state: { email } })
          }}
        />
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Create an account"
      subtitle="Register with your email address to buy and sell."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  )
}
