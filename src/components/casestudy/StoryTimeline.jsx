import { useEffect, useRef, useState } from 'react'
import Reveal from '../Reveal'
import { colorOf } from './personaColors'

const toneText = { bad: 'text-marker', good: 'text-emerald-700' }
const toneChip = { bad: 'bg-marker text-white', good: 'bg-emerald-600 text-white' }
const toneBorder = { bad: 'border-l-marker', good: 'border-l-emerald-600' }

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-hidden>
      <path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="9" r="2.5" fill="currentColor" />
    </svg>
  )
}

// Maria's year as one vertical timeline. A spine runs down the page and fills in as you scroll;
// each chapter's heading stays pinned beside its events on wide screens.
export default function StoryTimeline({ chapters }) {
  const root = useRef(null)
  const marks = useRef([])
  const [progress, setProgress] = useState(0)
  const [reached, setReached] = useState(-1)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = root.current
      if (!el) return
      const line = window.innerHeight * 0.5
      const rect = el.getBoundingClientRect()
      setProgress(Math.min(1, Math.max(0, (line - rect.top) / rect.height)))
      setReached(marks.current.filter((m) => m && m.getBoundingClientRect().top < line).length - 1)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ol ref={root} className="relative">
      {/* spine, filling in with scroll */}
      <span aria-hidden className="absolute top-3 bottom-0 left-[calc(0.75rem-1.5px)] w-[3px] rounded-full bg-ink/10 lg:left-[calc(18.75rem-1.5px)]">
        <span className="story-spine-fill block w-full rounded-full bg-ink" style={{ height: `${progress * 100}%` }} />
      </span>

      {chapters.map((c, i) => {
        const done = i <= reached
        return (
          <li
            key={c.label}
            className="relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-16 last:pb-0 lg:grid-cols-[16rem_1.5rem_1fr] lg:gap-x-8 lg:pb-20"
          >
            {/* chapter marker on the spine */}
            <span
              ref={(el) => (marks.current[i] = el)}
              aria-hidden
              className={`story-marker col-start-1 row-start-1 mt-1 grid size-6 place-items-center rounded-full border-[3px] transition-colors duration-300 lg:col-start-2 ${
                done ? 'border-ink bg-ink' : 'border-ink/30 bg-cream'
              }`}
            >
              {done && <span className={`size-2 rounded-full ${c.tone === 'bad' ? 'bg-marker' : c.tone === 'good' ? 'bg-note-green' : 'bg-note-yellow'}`} />}
            </span>

            {/* chapter heading, pinned on wide screens */}
            <header className="col-start-2 row-start-1 self-start lg:sticky lg:top-28 lg:col-start-1">
              <p className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">
                {c.label} · <span className={c.tone ? toneText[c.tone] : 'text-ink'}>{c.day}</span>
              </p>
              <h4 className="mt-1.5 text-2xl leading-tight font-extrabold tracking-tight">{c.title}</h4>
              <span className={`mt-3 inline-block rounded-full px-2.5 py-1 font-mono text-[11px] ${c.tone ? toneChip[c.tone] : 'bg-ink text-cream'}`}>
                case 1042 · {c.status}
              </span>
            </header>

            {/* events */}
            <ol className="col-start-2 mt-5 space-y-4 lg:col-start-3 lg:row-start-1 lg:mt-0">
              {c.moments.map((m, k) => (
                <Reveal as="li" key={k} delay={k * 60} className="relative">
                  {/* the first event sits beside the chapter marker, so it doesn't get its own dot */}
                  {k > 0 && (
                    <span
                      aria-hidden
                      className="absolute top-5 -left-[2.125rem] size-3 rounded-full border-2 border-ink lg:-left-[3.125rem]"
                      style={{ background: colorOf(m.persona).fill }}
                    />
                  )}
                  <div
                    className={`rounded-xl border border-l-4 border-ink/15 bg-paper p-4 sm:p-5 ${
                      m.tone ? toneBorder[m.tone] : 'border-l-ink/15'
                    }`}
                  >
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className={`rounded-md border border-ink/20 px-2 py-0.5 font-mono text-[11px] font-medium ${colorOf(m.persona).bg}`}>
                        {m.persona}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px] text-ink-soft">
                        <PinIcon /> {m.city}
                      </span>
                      <span className="font-mono text-[11px] text-ink-soft sm:ml-auto">{m.when}</span>
                    </p>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">{m.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </li>
        )
      })}
    </ol>
  )
}
