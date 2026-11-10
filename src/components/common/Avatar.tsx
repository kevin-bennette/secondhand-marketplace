import { initials } from '../../utils/format'

interface AvatarProps {
  name: string
  color?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-2xl',
}

/** Initials avatar – avoids using real people's photos in the demo. */
export function Avatar({ name, color = '#64748b', size = 'md' }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${sizes[size]}`}
      style={{ backgroundColor: color }}
    >
      {initials(name)}
    </span>
  )
}
