import { StickyNote } from '../Doodles'
import Reveal from '../Reveal'
import CastMap from './CastMap'
import { colorOf } from './personaColors'
import StoryTimeline from './StoryTimeline'

function Label({ index, children }) {
  return (
    <p className="font-mono text-xs tracking-wide text-ink-soft">
      <span className="text-marker">[{index}]</span> {children}
    </p>
  )
}

function SubHeading({ children, note }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{children}</h3>
      {note && <p className="font-hand text-xl font-bold text-marker sm:text-2xl">{note}</p>}
    </div>
  )
}

// "Before / after": the platform as a pile of modules vs. the same platform as one patient's journey
function ModulesVsJourney({ modules, stages }) {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
      <figure className="relative rounded-2xl border-2 border-dashed border-ink/30 p-5 sm:p-6">
        <figcaption className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">
          before / module by module
        </figcaption>
        <ul aria-hidden className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {/* unlabelled grey blocks: the point is the pile, not the names. A non-breaking space keeps one line's height */}
          {modules.map((m, k) => (
            <li
              key={m}
              className={`rounded-md border-2 border-ink/15 bg-ink/10 px-2 py-3 font-mono text-[11px] ${
                ['rotate-1', '-rotate-1', 'rotate-0', '-rotate-2', 'rotate-2'][k % 5]
              }`}
            >
              {' '}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-hand text-xl font-bold text-marker">20+ modules. Nobody could hold it in their head.</p>
      </figure>

      <p className="flex items-center justify-center gap-2 font-hand text-2xl font-bold text-marker lg:flex-col lg:gap-0">
        instead
        <span aria-hidden className="text-4xl leading-none">
          <span className="lg:hidden">↓</span>
          <span className="max-lg:hidden">→</span>
        </span>
      </p>

      <figure className="relative rounded-2xl border-2 border-ink bg-paper p-5 shadow-hard sm:p-6">
        <figcaption className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink">
          after / one patient&apos;s journey
        </figcaption>
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-note-orange text-xs font-bold">
            MA
          </span>
          <ol className="relative flex flex-1 justify-between">
            <span aria-hidden className="absolute top-[7px] right-1.5 left-1.5 h-[3px] rounded-full bg-ink" />
            {stages.map((s, k) => (
              <li key={s} className="relative flex flex-col items-center gap-2">
                <span
                  className={`size-4 rounded-full border-[3px] border-ink ${k === stages.length - 1 ? 'bg-note-green' : k === 0 ? 'bg-ink' : 'bg-paper'}`}
                />
                {/* on phones only the ends are labelled, so the names don't collide */}
                <span
                  className={`font-mono text-[10px] text-ink-soft sm:block sm:text-[11px] ${
                    k === 0 || k === stages.length - 1 ? '' : 'hidden'
                  }`}
                >
                  {s.toLowerCase()}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <p className="rounded-lg bg-note-yellow/70 px-3 py-2">
            <span className="block font-mono text-[10px] text-ink-soft">real time</span>
            Day 0 to Day 365, by the clock
          </p>
          <p className="rounded-lg bg-note-blue/70 px-3 py-2">
            <span className="block font-mono text-[10px] text-ink-soft">real places</span>
            6 cities, 2 time zones
          </p>
        </div>
        <p className="mt-4 font-hand text-xl font-bold text-marker">One story the whole team can follow.</p>
      </figure>
    </div>
  )
}

function MeetMaria({ story }) {
  const { patient } = story
  const others = story.cast.filter((c) => c.persona !== 'Patient')
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Maria */}
      <div className="lg:col-span-4">
        <div className="relative -rotate-1 rounded-2xl border-2 border-ink bg-paper p-6 shadow-hard">
          <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-white/70 shadow-sm" aria-hidden />
          <div className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full border-2 border-ink bg-note-orange text-xl font-extrabold">
              {patient.initials}
            </span>
            <div>
              <p className="font-mono text-[11px] text-ink-soft">persona / patient</p>
              <p className="text-2xl font-extrabold tracking-tight">{patient.name}</p>
            </div>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {patient.facts.map((f) => (
              <li key={f} className="rounded-full border border-ink/25 px-3 py-1 text-sm">
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Prescribed: </span>
            {patient.therapy}
          </p>
        </div>
        <p className="mt-5 font-mono text-[11px] leading-relaxed text-ink-soft">{story.disclaimer}</p>
      </div>

      {/* the cast, on a map */}
      <div className="lg:col-span-8">
        <div className="overflow-hidden rounded-2xl border-2 border-ink bg-paper">
          <p className="border-b-2 border-ink px-4 py-2.5 font-mono text-[11px] text-ink-soft">the_cast / 6 cities · 2 time zones</p>
          <div className="relative bg-dots">
            <CastMap cast={story.cast} className="w-full" />
          </div>
        </div>
        <p className="mt-3 text-sm text-ink-soft">{story.castNote}</p>
      </div>

      {/* who's who */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
        {others.map((c) => (
          <li key={c.who} className="flex gap-3 rounded-xl border border-ink/15 bg-paper/70 p-4">
            <span className={`mt-1 size-4 shrink-0 -rotate-6 rounded-[3px] border border-ink/40 ${colorOf(c.persona).bg}`} />
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-ink-soft">
                {c.persona} · {c.city} · {c.tz}
              </p>
              <p className="mt-0.5 font-semibold">{c.who}</p>
              <p className="text-sm text-ink-soft">{c.org}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Numbers({ numbers }) {
  const colors = ['bg-note-yellow', 'bg-note-green', 'bg-note-blue', 'bg-note-pink']
  const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {numbers.map((n, k) => (
        <li key={n.label}>
          <StickyNote color={colors[k % 4]} rotate={tilts[k % 4]} className="flex h-full flex-col p-5">
            <span className="text-5xl font-bold">{n.value}</span>
            <span className="mt-3 font-sans text-base font-semibold">{n.label}</span>
            <span className="mt-1 font-sans text-sm text-ink-soft">{n.note}</span>
          </StickyNote>
        </li>
      ))}
    </ul>
  )
}

function Routes({ routes }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {routes.map((r) => (
        <li key={r.if} className="relative flex gap-4 rounded-2xl border-2 border-dashed border-ink/30 bg-paper/60 p-5">
          <svg viewBox="0 0 40 40" className="size-9 shrink-0 text-ink" aria-hidden>
            <path d="M8 4v32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M8 14c0 10 24 6 24 16" stroke="currentColor" strokeWidth="3" strokeDasharray="4 5" strokeLinecap="round" fill="none" />
            <circle cx="32" cy="32" r="4" className="fill-marker" />
          </svg>
          <div>
            <p className="font-mono text-[11px] text-marker">what if</p>
            <p className="mt-0.5 font-bold">{r.if}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{r.then}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Approach({ approach, stages, index = '02' }) {
  const { story } = approach
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <Label index={index}>approach</Label>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">Approach</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 lg:pt-8">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{approach.statement}</p>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-16">
          <ModulesVsJourney modules={approach.modules} stages={stages} />
        </Reveal>

        <Reveal className="mt-24">
          <SubHeading note="a composite patient, built to explain the system">Meet Maria, and everyone on her case</SubHeading>
          <MeetMaria story={story} />
        </Reveal>

        <Reveal className="mt-24">
          <SubHeading note="scroll through Maria's year ↓">Maria&apos;s first year, chapter by chapter</SubHeading>
          <StoryTimeline chapters={story.chapters} />
        </Reveal>

        <Reveal className="mt-24">
          <SubHeading>Maria&apos;s first year in numbers</SubHeading>
          <Numbers numbers={story.numbers} />
        </Reveal>

        <Reveal className="mt-24">
          <SubHeading note="same platform, different paths">Other routes the same journey can take</SubHeading>
          <Routes routes={story.routes} />
        </Reveal>
      </div>
    </section>
  )
}
