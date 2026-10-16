// Hand-drawn bits: marker scribbles, sticky notes and a little Figma chrome.
// Scribble paths use pathLength="1" so they can "draw" themselves in (see .scribble in index.css).

const pen = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  pathLength: 1,
}

export function Squiggle({ className = '', draw = false }) {
  return (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden className={`scribble ${draw ? 'draw-now' : ''} ${className}`}>
      <path {...pen} strokeWidth="4" d="M3 13c16-9 26 6 42-1s25-8 40 0 26 6 42-2 28-6 40 1 18 3 30-3" />
    </svg>
  )
}

export function CircleScribble({ className = '', draw = false }) {
  return (
    <svg viewBox="0 0 220 90" preserveAspectRatio="none" aria-hidden className={`scribble ${draw ? 'draw-now' : ''} ${className}`}>
      <path
        {...pen}
        strokeWidth="3"
        d="M152 10C108 2 40 8 16 30-4 49 30 80 102 82c66 2 112-14 110-40C210 18 160 6 110 9 72 12 46 20 40 26"
      />
    </svg>
  )
}

export function CurvyArrow({ className = '', draw = false, flip = false }) {
  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden
      className={`scribble ${draw ? 'draw-now' : ''} ${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <path {...pen} strokeWidth="3" d="M112 70C90 72 54 66 40 46S26 14 14 8" />
      <path {...pen} strokeWidth="3" d="M8 26 13 7l19 6" />
    </svg>
  )
}

export function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        d="M20 4v32M4 20h32M9 9l22 22M31 9 9 31"
      />
    </svg>
  )
}

// Figma / FigJam multiplayer cursor with a name tag
export function Cursor({ label, color = 'var(--color-figma)', className = '' }) {
  return (
    <span aria-hidden className={`pointer-events-none inline-flex items-start ${className}`}>
      <svg viewBox="0 0 24 24" className="size-5 drop-shadow-sm">
        <path d="M3 2l7.5 19 2.6-7.9L21 10.5z" fill={color} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span
        className="mt-4 -ml-1 rounded-md px-2 py-0.5 font-mono text-[11px] font-medium tracking-normal whitespace-nowrap text-white shadow-sm"
        style={{ background: color }}
      >
        {label}
      </span>
    </span>
  )
}

// Figma-style selection box with corner handles and a size tag
export function Selection({ children, tag, className = '' }) {
  const handle = 'absolute size-2 border-[1.5px] border-figma bg-white'
  return (
    <span className={`relative inline-block ${className}`}>
      <span aria-hidden className="pointer-events-none absolute -inset-x-2 -inset-y-0.5 border-[1.5px] border-figma">
        <span className={`${handle} -top-1 -left-1`} />
        <span className={`${handle} -top-1 -right-1`} />
        <span className={`${handle} -bottom-1 -left-1`} />
        <span className={`${handle} -right-1 -bottom-1`} />
        {tag && (
          <span className="absolute -top-5 -left-[1.5px] hidden rounded-sm bg-figma px-1.5 py-0.5 font-mono text-[10px] leading-none font-medium tracking-normal whitespace-nowrap text-white sm:block">
            {tag}
          </span>
        )}
      </span>
      {children}
    </span>
  )
}

export function StickyNote({ color = 'bg-note-yellow', rotate = '-rotate-2', tape = false, className = '', children }) {
  return <div className={`sticky-note ${color} ${rotate} ${tape ? 'tape' : ''} ${className}`}>{children}</div>
}

// Little palette card with swatches and hex codes
export function Palette({ colors, title = 'palette.fig', className = '' }) {
  return (
    <div className={`rounded-xl border border-ink/10 bg-paper p-3 shadow-[0_14px_30px_-16px_rgba(22,35,44,0.45)] ${className}`}>
      <p className="mb-2 font-mono text-[10px] tracking-wide text-muted">{title}</p>
      <div className="flex gap-1.5">
        {colors.map((c) => (
          <div key={c} className="text-center">
            <span className="block size-9 rounded-md border border-ink/10" style={{ background: c }} />
            <span className="mt-1 block font-mono text-[9px] text-ink-soft uppercase">{c.replace('#', '')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
