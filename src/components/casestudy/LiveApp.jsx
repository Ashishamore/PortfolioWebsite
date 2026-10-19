import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import QRCode from 'qrcode'

// A real prototype, running inside the page in a phone frame.
// Each app is built into /public/<app>/ with in-page routing (memory or hash), so it never navigates the page.
const APP_W = 390
const APP_H = 844
const appUrlFor = (app) => `${import.meta.env.BASE_URL}${app}/index.html`

// The app on its own, at a short address on this site, for opening on a phone
const phoneUrlFor = (app) => new URL(`${import.meta.env.BASE_URL}${app}/`, window.location.origin).href

// Small, quiet panel in the corner of full-screen mode: scan or type the address to use the app on a phone
function OpenOnPhone({ app }) {
  const [qr, setQr] = useState('')
  const [copied, setCopied] = useState(false)
  const url = phoneUrlFor(app)

  useEffect(() => {
    QRCode.toDataURL(url, { margin: 1, width: 240, color: { dark: '#16232c', light: '#fffdf6' } })
      .then(setQr)
      .catch(() => setQr(''))
  }, [url])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <aside className="absolute bottom-6 left-6 hidden w-64 items-center gap-3 rounded-2xl border border-cream/15 bg-cream/5 p-3 text-cream lg:flex">
      {qr && <img src={qr} alt={`QR code for ${url}`} className="size-20 shrink-0 rounded-lg" />}
      <div className="min-w-0">
        <p className="text-sm leading-snug font-semibold">Try it on your phone</p>
        <p className="mt-0.5 text-xs leading-snug text-cream/60">Scan to use it just like a mobile app.</p>
        <button
          type="button"
          onClick={copy}
          className="mt-1.5 font-mono text-[10px] text-note-yellow underline decoration-note-yellow/40 underline-offset-2 hover:decoration-note-yellow"
        >
          {copied ? 'link copied!' : 'copy link'}
        </button>
      </div>
    </aside>
  )
}

// A phone mockup: metal rail, side buttons, black bezel and a camera island over the screen.
// Sizes are relative, so it reads right from a small inline phone to a full-height one.
function PhoneMockup({ children, screenStyle, className = '' }) {
  const rail = 'absolute w-[3px] bg-gradient-to-r from-slate-700 to-slate-500'
  return (
    <div
      className={`relative rounded-[3rem] bg-[linear-gradient(150deg,#94a3b8_0%,#334155_16%,#cbd5e1_30%,#475569_46%,#1e293b_60%,#a8b3c2_76%,#334155_100%)] p-[3px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.8),0_10px_24px_-10px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* side buttons on the metal rail */}
      <span aria-hidden className={`${rail} top-[13%] -left-[2px] h-[4%] rounded-l-sm`} />
      <span aria-hidden className={`${rail} top-[20%] -left-[2px] h-[7%] rounded-l-sm`} />
      <span aria-hidden className={`${rail} top-[29%] -left-[2px] h-[7%] rounded-l-sm`} />
      <span aria-hidden className={`${rail} top-[24%] -right-[2px] h-[10%] rounded-r-sm bg-gradient-to-l`} />

      <div className="rounded-[2.85rem] bg-black p-[9px]">
        <div className="relative overflow-hidden rounded-[2.3rem] bg-slate-950" style={screenStyle}>
          {children}
          {/* camera island */}
          <span aria-hidden className="pointer-events-none absolute top-[1.3%] left-1/2 z-20 h-[3.2%] w-[27%] -translate-x-1/2 rounded-full bg-black" />
          {/* glass sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(125deg,rgba(255,255,255,0.09)_0%,transparent_28%,transparent_72%,rgba(255,255,255,0.04)_100%)]"
          />
        </div>
      </div>
    </div>
  )
}

const useSmallScreen = () => {
  const [small, setSmall] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = (e) => setSmall(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return small
}

// An iframe drawn at real phone size, scaled down to fit the width it's given
function ScaledApp({ title, reloadKey, appUrl }) {
  const box = useRef(null)
  const [scale, setScale] = useState(0.8)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / APP_W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={box} className="relative w-full overflow-hidden bg-slate-950" style={{ height: APP_H * scale }}>
      <iframe
        key={reloadKey}
        src={appUrl}
        title={title}
        width={APP_W}
        height={APP_H}
        className="absolute top-0 left-0 origin-top-left border-0"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  )
}

export default function LiveApp({ poster, app = 'workive-app', title = 'Workive prototype', className = '' }) {
  const appUrl = appUrlFor(app)
  const [started, setStarted] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [full, setFull] = useState(false)
  const small = useSmallScreen()

  // full-screen mode: lock page scroll and close on Escape
  useEffect(() => {
    if (!full) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setFull(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [full])

  return (
    <div className={className}>
      <PhoneMockup>
        {started ? (
          <ScaledApp title={title} reloadKey={reloadKey} appUrl={appUrl} />
        ) : (
          // a screenshot until someone opts in, so the page scrolls freely and loads light
          <button
            type="button"
            // On phones the app opens full screen at its real size. A scaled-down app inside a scrolling page
            // is too small to use there, and phone browsers can misplace taps inside a scaled frame.
            onClick={() => (small ? setFull(true) : setStarted(true))}
            className="group relative block w-full focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-note-yellow"
          >
            <img src={poster} alt="" className="block aspect-[390/844] w-full object-cover object-top" />
            <span className="absolute inset-0 grid place-items-center bg-ink/55 transition-colors group-hover:bg-ink/40">
              <span className="flex flex-col items-center gap-3">
                <span className="grid size-16 place-items-center rounded-full border-2 border-ink bg-note-yellow text-ink shadow-[4px_4px_0_var(--color-marker)] transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-1 size-7" aria-hidden>
                    <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
                  </svg>
                </span>
                <span className="rounded-full bg-paper px-4 py-1.5 font-semibold text-ink">{small ? 'Tap to open the app' : 'Tap to try the app'}</span>
              </span>
            </span>
          </button>
        )}
      </PhoneMockup>

      {started && (
        <div className="mt-6 flex justify-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="rounded-full border-2 border-dashed border-cream/40 px-3.5 py-1.5 text-cream transition-colors hover:border-solid hover:border-cream"
          >
            ↺ restart
          </button>
          <button
            type="button"
            onClick={() => setFull(true)}
            className="rounded-full border-2 border-note-yellow bg-note-yellow px-3.5 py-1.5 text-ink transition-transform hover:-translate-y-0.5"
          >
            ⤢ full screen
          </button>
        </div>
      )}

      {/* full-screen overlay, still inside the portfolio; portalled to <body> so no parent can clip it */}
      {full &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3 text-cream">
              <p className="font-mono text-xs text-cream/70">{title.toLowerCase().replace(/\s+/g, '_')} / live</p>
              <button
                type="button"
                onClick={() => setFull(false)}
                autoFocus
                className="rounded-full border-2 border-cream/40 px-4 py-1.5 font-mono text-xs transition-colors hover:border-cream"
              >
                ✕ close
              </button>
            </div>
            {small ? (
              <>
                {/* already on a phone: the app edge to edge, with a one-line note */}
                <p className="bg-note-yellow px-4 py-2 text-center font-hand text-lg font-bold text-ink">
                  You&apos;re on a phone, so use it just like a mobile app ✓
                </p>
                <iframe src={appUrl} title={`${title}, full screen`} className="min-h-0 w-full flex-1 border-0 bg-slate-950" />
              </>
            ) : (
              <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
                <PhoneMockup screenStyle={{ height: 'min(calc(100dvh - 8rem), 860px)', aspectRatio: `${APP_W} / ${APP_H}` }}>
                  <iframe src={appUrl} title={`${title}, full screen`} className="block size-full border-0" />
                </PhoneMockup>
                <OpenOnPhone app={app} />
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  )
}
