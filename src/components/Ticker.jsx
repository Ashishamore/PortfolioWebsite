import { ticker } from '../data/content'
import { Sparkle } from './Doodles'

// Tilted strip of skills scrolling sideways, like a strip of tape across the page
export default function Ticker() {
  const items = [...ticker, ...ticker]
  return (
    <div className="relative z-10 -my-2 overflow-hidden py-6" aria-label="Skills">
      <div className="relative left-1/2 w-[110vw] -translate-x-1/2 -rotate-2 border-y-2 border-ink bg-ink py-3 text-cream shadow-[0_8px_0_var(--color-note-yellow)]">
        <ul className="flex w-max animate-marquee items-center font-mono text-sm tracking-wide uppercase sm:text-base">
          {items.map((item, i) => (
            <li key={i} aria-hidden={i >= ticker.length} className="flex items-center gap-6 pr-6 whitespace-nowrap">
              {item}
              <Sparkle className="size-4 text-note-yellow" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
