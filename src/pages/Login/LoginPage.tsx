import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthShell } from '../../components/authentication/AuthShell'
import { LoginForm } from '../../components/authentication/LoginForm'

interface LoginLocationState {
  from?: string
  email?: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state ?? {}) as LoginLocationState

  return (
    <AuthShell
      title="Log in"
      subtitle="Welcome back! Sign in with your email address."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm initialEmail={state.email} onSuccess={() => navigate(state.from ?? '/', { replace: true })} />
    </AuthShell>
  )
}
