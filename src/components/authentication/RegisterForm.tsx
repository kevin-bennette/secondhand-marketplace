import { useState, type FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword, validateRequired } from '../../utils/validation'
import { Button } from '../common/Button'
import { TextField } from '../common/FormFields'

interface RegisterFormProps {
  onCodeSent?: () => void
}

type Field = 'name' | 'email' | 'password' | 'confirm' | 'location' | 'form'

export function RegisterForm({ onCodeSent }: RegisterFormProps) {
  const { startRegistration } = useAuth()
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '', location: '' })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})

  const update = (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Partial<Record<Field, string>> = {
      name: validateRequired(values.name, 'Full name'),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirm: values.confirm === values.password ? undefined : 'Passwords do not match.',
    }
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors)
      return
    }
    const result = startRegistration({
      name: values.name,
      email: values.email,
      password: values.password,
      location: values.location,
    })
    if (!result.ok) {
      setErrors({ form: result.error })
      return
    }
    onCodeSent?.()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField label="Full name" autoComplete="name" placeholder="Jane Citizen" value={values.name} onChange={update('name')} error={errors.name} />
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="Example@email.com"
        value={values.email}
        onChange={update('email')}
        error={errors.email}
      />
      <TextField
        label="Suburb (optional)"
        autoComplete="address-level2"
        placeholder="e.g. Footscray, VIC 3011"
        value={values.location}
        onChange={update('location')}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        value={values.password}
        onChange={update('password')}
        error={errors.password}
        hint="Use 8+ characters with letters and numbers."
      />
      <TextField
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        value={values.confirm}
        onChange={update('confirm')}
        error={errors.confirm}
      />
      {errors.form && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errors.form}
        </p>
      )}
      <Button type="submit" fullWidth>
        Sign up
      </Button>
    </form>
  )
}
