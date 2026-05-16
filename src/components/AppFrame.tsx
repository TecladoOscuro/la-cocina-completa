import { useState, useRef, useEffect } from 'react'
import type { AppEntry } from '../apps'

interface AppFrameProps {
  app: AppEntry
  active: boolean
  lazy: boolean
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
    <div className="w-full h-full relative bg-[#0a0a0f]">
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0a0a0f] p-6">
          <div className="flex gap-2 items-center">
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0ms' }}>
              {app.emoji}
            </span>
          </div>
          <div
            className="w-12 h-12 rounded-full border-[3px] border-white/[0.06] animate-spin"
            style={{ borderTopColor: app.color }}
          />
          <p className="text-sm text-zinc-500 font-medium">Cargando {app.name}...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0a0a0f] p-6">
          <span className="text-5xl">😵</span>
          <p className="text-sm text-zinc-400 text-center max-w-xs">
            No se pudo cargar {app.name}.<br />
            Comprueba tu conexión.
          </p>
          <button
            onClick={() => {
              setStatus('idle')
              setRetryKey((k) => k + 1)
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
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
