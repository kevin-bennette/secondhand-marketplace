import { NavLink } from 'react-router-dom'
import { navItems } from './navItems'

export function BottomNav() {
  if (navItems.length < 2) return null

  return (
    <nav aria-label="Main" className="shrink-0 border-t border-line bg-white px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5">
      <ul className="flex items-end justify-around">
        {navItems.map(({ to, label, icon: Icon, primary, badge: BadgeComponent }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-0.5 py-1 text-[11px] font-medium ${
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-ink'
                }`
              }
            >
              {primary ? (
                <span className="-mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                  <Icon className="h-6 w-6" />
                </span>
              ) : (
                <span className="relative">
                  <Icon className="h-6 w-6" />
                  {BadgeComponent && <BadgeComponent />}
                </span>
              )}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
