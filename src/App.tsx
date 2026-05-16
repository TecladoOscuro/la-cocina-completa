import { useState, useCallback } from 'react'
import { apps } from './apps'
import { TabBar } from './components/TabBar'
import { AppFrame } from './components/AppFrame'

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]))

  const handleTabChange = useCallback((index: number) => {
    setVisited((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
    setActiveIndex(index)
  }, [])

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f]">
      <div className="flex-1 relative overflow-hidden" style={{ paddingBottom: '56px' }}>
        {apps.map((app, i) => (
          <div
            key={app.id}
            className="absolute inset-0 transition-opacity duration-300 ease-out"
            style={{
              opacity: i === activeIndex ? 1 : 0,
              pointerEvents: i === activeIndex ? 'auto' : 'none',
              zIndex: i === activeIndex ? 1 : 0,
            }}
          >
            <AppFrame
              app={app}
              active={i === activeIndex}
              lazy={!visited.has(i)}
            />
          </div>
        ))}
      </div>
      <TabBar
        apps={apps}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </div>
  )
}
