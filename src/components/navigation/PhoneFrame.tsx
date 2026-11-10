import type { ReactNode } from 'react'

/**
 * Full-screen on phones; on larger screens the app is shown inside an
 * iPhone-sized frame so the mobile-first design can be demonstrated on a laptop.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full items-center justify-center sm:py-6">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white sm:h-[844px] sm:max-h-[calc(100dvh-3rem)] sm:w-[390px] sm:rounded-[44px] sm:border-[10px] sm:border-gray-900 sm:shadow-2xl">
        {children}
        <div id="overlay-root" />
      </div>
    </div>
  )
}
