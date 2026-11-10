import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

/** Layout for the main tabs: page content plus the bottom navigation. */
export function AppLayout() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
