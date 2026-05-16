import { memo } from 'react'
import type { AppEntry } from '../apps'

interface TabBarProps {
  apps: AppEntry[]
  activeIndex: number
  onTabChange: (index: number) => void
}

export const TabBar = memo(function TabBar({ apps, activeIndex, onTabChange }: TabBarProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-end pb-[env(safe-area-inset-bottom,0px)] h-[calc(56px+env(safe-area-inset-bottom,0px))] bg-[#0a0a0f]/80 backdrop-blur-[20px] backdrop-saturate-[180%] border-t border-white/[0.06]"
      style={{ WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
    >
      {apps.map((app, i) => {
        const isActive = i === activeIndex
        return (
          <button
            key={app.id}
            onClick={() => onTabChange(i)}
            className="flex flex-col items-center justify-center gap-1 min-w-0 flex-1 h-full pb-1 pt-2 transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-90"
            aria-label={app.name}
            aria-selected={isActive}
            role="tab"
          >
            <span
              className="text-[26px] leading-none transition-all duration-200"
              style={{
                transform: isActive ? 'scale(1.1)' : 'scale(0.95)',
                filter: isActive ? 'grayscale(0) brightness(1.1)' : 'grayscale(0.3) brightness(0.7)',
              }}
            >
              {app.emoji}
            </span>
            <span
              className="text-[10px] font-medium leading-none transition-colors duration-200"
              style={{
                color: isActive ? app.color : '#52525b',
                fontWeight: isActive ? 600 : 500,
              }}
            >
              {app.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
})
