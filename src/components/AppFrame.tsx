import { useState, useRef, useEffect } from 'react'
import type { AppEntry } from '../apps'

interface AppFrameProps {
  app: AppEntry
  active: boolean
  lazy: boolean
}

function Shimmer({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative overflow-hidden bg-white/[0.03] ${className ?? ''}`} style={style}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)`,
          animation: 'shimmer 2s ease-in-out infinite',
        }}
      />
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.04]">
      <Shimmer className="h-40 rounded-none" />
      <div className="p-4 space-y-3">
        <Shimmer className="h-5 w-3/4 rounded-lg" />
        <Shimmer className="h-3 w-full rounded-md" />
        <Shimmer className="h-3 w-2/3 rounded-md" />
        <div className="flex gap-2 pt-1">
          <Shimmer className="h-6 w-16 rounded-full" />
          <Shimmer className="h-6 w-12 rounded-full" />
          <Shimmer className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function SkeletonHero() {
  return (
    <div className="space-y-4">
      <Shimmer className="h-48 rounded-2xl" />
      <div className="px-1 space-y-3">
        <Shimmer className="h-6 w-2/3 rounded-lg" />
        <Shimmer className="h-4 w-full rounded-md" />
        <Shimmer className="h-4 w-4/5 rounded-md" />
      </div>
    </div>
  )
}

export function AppFrame({ app, active, lazy }: AppFrameProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (lazy || !active) return
    if (status === 'loaded') return

    const iframe = iframeRef.current
    if (!iframe) return

    setStatus('loading')

    const handleLoad = () => {
      setStatus('loaded')
    }

    const handleError = () => {
      setStatus('error')
    }

    iframe.addEventListener('load', handleLoad, { once: true })
    iframe.addEventListener('error', handleError, { once: true })

    const timeout = setTimeout(() => {
      if (status === 'loading') {
        setStatus('error')
      }
    }, 15000)

    return () => {
      iframe.removeEventListener('load', handleLoad)
      iframe.removeEventListener('error', handleError)
      clearTimeout(timeout)
    }
  }, [active, lazy, status, retryKey])

  if (lazy && !active) {
    return null
  }

  return (
    <div className="w-full h-full relative" style={{ backgroundColor: '#0a0a0f' }}>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {status === 'loading' && (
        <div
          className="absolute inset-0 z-10 overflow-y-auto overscroll-none"
          style={{ backgroundColor: '#0a0a0f' }}
        >
          <div className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between backdrop-blur-xl border-b border-white/[0.04]" style={{ backgroundColor: 'rgba(10,10,15,0.85)' }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{app.emoji}</span>
              <div className="flex flex-col gap-1">
                <Shimmer className="h-4 w-32 rounded-md" />
                <Shimmer className="h-3 w-20 rounded-md" />
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: app.color, animation: 'pulse-dot 1.2s ease-in-out infinite', animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: app.color, animation: 'pulse-dot 1.2s ease-in-out infinite', animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: app.color, animation: 'pulse-dot 1.2s ease-in-out infinite', animationDelay: '0.4s' }} />
            </div>
          </div>

          <div className="px-4 py-5 space-y-5" style={{ animation: 'fadeSlideUp 0.5s ease-out both' }}>
            <div className="flex gap-2 overflow-hidden pb-1">
              {[1, 2, 3, 4].map((i) => (
                <Shimmer key={i} className="h-8 rounded-full flex-shrink-0" style={{ width: `${60 + i * 15}px` }} />
              ))}
            </div>

            <SkeletonHero />

            <div className="grid grid-cols-1 gap-4" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ animation: `fadeSlideUp 0.5s ease-out ${i * 0.08}s both` }}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6"
          style={{ backgroundColor: '#0a0a0f' }}
        >
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl" style={{ backgroundColor: `${app.color}15` }}>
            {app.emoji}
          </div>
          <p className="text-base text-zinc-300 font-semibold text-center">
            No se pudo cargar {app.name}
          </p>
          <p className="text-sm text-zinc-500 text-center -mt-2 max-w-xs">
            Comprueba tu conexión a internet y vuelve a intentarlo.
          </p>
          <button
            onClick={() => {
              setStatus('idle')
              setRetryKey((k) => k + 1)
            }}
            className="px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95 shadow-lg active:shadow-sm"
            style={{ backgroundColor: app.color }}
          >
            Reintentar
          </button>
        </div>
      )}

      <iframe
        ref={iframeRef}
        key={retryKey}
        src={app.url}
        title={app.name}
        className="w-full h-full border-0"
        style={{
          display: status === 'loaded' ? 'block' : 'block',
          opacity: status === 'loaded' ? 1 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        allow="geolocation"
        loading="lazy"
      />
    </div>
  )
}
