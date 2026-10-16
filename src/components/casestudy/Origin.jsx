import { useEffect, useRef, useState } from 'react'
import { CurvyArrow, StickyNote } from '../Doodles'
import Reveal from '../Reveal'
import SectionLabel from './SectionLabel'

// A short archive clip, playing silently on loop like a GIF, with a pause button.
// Only the first `seconds` of the file play; then it jumps back to the start.
function ArchiveClip({ src, poster, caption, seconds = 6 }) {
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)

  // check every frame while playing, so the loop point lands on time rather than up to 250 ms late
  useEffect(() => {
    const v = video.current
    if (!v) return
    let frame = 0
    const tick = () => {
      if (v.currentTime >= seconds) v.currentTime = 0
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(tick)
    }
    const stop = () => cancelAnimationFrame(frame)
    v.addEventListener('play', start)
    v.addEventListener('pause', stop)
    return () => {
      stop()
      v.removeEventListener('play', start)
      v.removeEventListener('pause', stop)
    }
  }, [seconds])

  // honour reduced-motion: show the still frame and let people press play themselves
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) v.play().then(() => setPlaying(true))
    else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <figure className="relative">
      <div className="relative rotate-[-1.5deg] rounded-xl bg-paper p-3 pb-14 shadow-[0_20px_40px_-18px_rgba(22,35,44,0.55)] sm:p-4 sm:pb-16">
        <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-white/70 shadow-sm" />
        {/* the clip was filmed off a monitor, so it's cropped in a little to hide the screen edges */}
        <div className="relative aspect-video overflow-hidden rounded-md bg-ink">
          <video
            ref={video}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={caption}
            className="size-full origin-[50%_35%] scale-[1.13] object-cover"
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pause the clip' : 'Play the clip'}
            className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-ink/70 text-cream backdrop-blur transition-colors hover:bg-ink"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="ml-0.5 size-4" aria-hidden>
                <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
        <figcaption className="absolute inset-x-4 bottom-4 font-hand text-lg leading-tight font-bold text-ink-soft sm:text-xl">
          {caption}
        </figcaption>
      </div>
      <p className="absolute -top-9 left-4 flex items-end gap-1 font-hand text-2xl font-bold text-marker sm:-top-10 sm:left-10">
        that&apos;s me, college days
        <CurvyArrow className="mb-[-1.75rem] w-10 shrink-0 -scale-y-100" />
      </p>
    </figure>
  )
}

// Work + Hive, drawn as two honeycomb cells
function NameMark({ parts }) {
  const hex = 'M50 4 92 28v48L50 100 8 76V28z'
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {parts.map((part, k) => (
        <div key={part} className="flex items-center gap-1">
          {k > 0 && <span className="px-1 text-3xl font-extrabold text-ink/40">+</span>}
          <svg viewBox="0 0 100 104" className="w-24 sm:w-28">
            <path d={hex} className={k ? 'fill-note-yellow stroke-ink' : 'fill-paper stroke-ink'} strokeWidth="3" strokeLinejoin="round" />
            <text x="50" y="60" textAnchor="middle" className="fill-ink font-sans text-[22px] font-extrabold">
              {part.toLowerCase()}
            </text>
          </svg>
        </div>
      ))}
    </div>
  )
}

export default function Origin({ origin, index = '01' }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel index={index}>origin_story</SectionLabel>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">It started at weddings</h2>
            <div className="mt-6 space-y-4">
              {origin.text.map((para, k) => (
                <p key={k} className={k === 0 ? 'text-xl leading-snug font-semibold sm:text-2xl' : 'text-lg leading-relaxed text-ink-soft'}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="pt-6 lg:col-span-7 lg:pt-16" delay={120}>
            <ArchiveClip src={origin.video} poster={origin.poster} caption={origin.videoCaption} />
          </Reveal>
        </div>

        {/* the moment */}
        <Reveal className="mt-20 lg:mt-24">
          <article className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-ink px-6 py-10 text-cream sm:px-10 sm:py-12 lg:px-14">
            <div aria-hidden className="absolute inset-0 bg-dots-light" />
            {/* a crashed drone, caught in a palm */}
            <svg viewBox="0 0 220 200" aria-hidden className="absolute -right-6 -bottom-4 hidden w-64 text-cream/25 md:block lg:w-80">
              <path d="M120 200C118 150 112 110 100 80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <path
                d="M100 80c-20-18-50-18-70-6M100 80c-6-26-28-44-52-46M100 80c14-24 40-34 66-28M100 80c24-6 50 6 66 26M100 80c-2 22 8 44 26 58"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <g transform="rotate(-24 128 64)" className="text-note-yellow">
                <rect x="112" y="58" width="32" height="12" rx="4" fill="currentColor" />
                <path d="M104 56h16M136 56h16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </g>
              <text x="150" y="40" className="fill-marker font-hand text-[22px] font-bold">
                oops
              </text>
            </svg>

            <div className="relative max-w-2xl">
              <p className="font-mono text-xs text-note-yellow">{origin.moment.label} / goa</p>
              <h3 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">{origin.moment.title}</h3>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-cream/80">
                {origin.moment.text.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <p className="mt-6 inline-block font-hand text-2xl font-bold text-note-yellow sm:text-3xl">{origin.moment.punchline}</p>
            </div>
          </article>
        </Reveal>

        {/* the name, and why the domain knowledge matters */}
        <div className="mt-20 grid items-center gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-dashed border-ink/25 p-6 sm:p-8">
              <p className="font-mono text-[11px] text-ink-soft">the_name</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{origin.name.title}</h3>
              <div className="mt-6">
                <NameMark parts={origin.name.parts} />
              </div>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{origin.name.text}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <StickyNote tape rotate="rotate-1" className="relative p-6 sm:p-8">
              <span className="block font-mono text-[10px] font-medium text-ink/60">why it works</span>
              <span className="mt-3 block text-3xl leading-tight font-bold sm:text-4xl">Designed from inside the domain.</span>
              <span className="mt-4 block font-sans text-lg leading-relaxed text-ink-soft">{origin.insider}</span>
            </StickyNote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
