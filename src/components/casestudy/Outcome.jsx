import { CurvyArrow, StickyNote } from '../Doodles'
import Reveal from '../Reveal'

// Onboarding before vs. after, drawn to scale in working days:
// 2-3 weeks is 10-15 day blocks, 30 minutes is a sliver of one 8-hour day.
function OnboardingBars({ onboarding }) {
  const days = Array.from({ length: 15 })
  return (
    <div className="rounded-2xl border-2 border-ink bg-paper shadow-hard">
      <p className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink px-5 py-2.5 font-mono text-[11px] text-ink-soft">
        <span>onboarding_time / new team member</span>
        <span>1 block = 1 working day</span>
      </p>
      <div className="space-y-7 px-5 py-6 sm:px-6 sm:py-7">
        <div>
          <p className="mb-2.5 flex items-baseline justify-between gap-3">
            <span className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">before</span>
            <span className="text-xl font-extrabold">{onboarding.before}</span>
          </p>
          <div className="grid grid-cols-15 gap-1 sm:gap-1.5">
            {days.map((_, k) => (
              <span
                key={k}
                className={`h-7 rounded-[3px] border-2 sm:h-9 ${
                  k < 10 ? 'border-ink bg-ink/80' : 'border-ink/50 bg-[repeating-linear-gradient(135deg,transparent_0_4px,rgb(22_35_44/0.35)_4px_6px)]'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-ink-soft">{onboarding.beforeNote}</p>
        </div>
        <div>
          <p className="mb-2.5 flex items-baseline justify-between gap-3">
            <span className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">after</span>
            <span className="text-xl font-extrabold text-emerald-700">{onboarding.after}</span>
          </p>
          <div className="grid grid-cols-15 gap-1 sm:gap-1.5">
            {/* 30 minutes of an 8-hour day */}
            <span className="relative h-7 overflow-hidden rounded-[3px] border-2 border-ink/25 sm:h-9">
              <span className="absolute inset-y-0 left-0 w-[6.25%] bg-emerald-600" />
            </span>
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-ink-soft">
            {onboarding.afterNote}
            <span className="font-hand text-lg font-bold whitespace-nowrap text-marker">that tiny sliver ↑</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Outcome({ outcome, index = '03' }) {
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-xs tracking-wide text-ink-soft">
              <span className="text-marker">[{index}]</span> outcome
            </p>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">Outcome</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 lg:pt-8">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{outcome.lead}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <OnboardingBars onboarding={outcome.onboarding} />
          </Reveal>

          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {outcome.points.map((p, k) => (
              <Reveal as="li" key={p.title} delay={k * 100}>
                <StickyNote
                  color={k ? 'bg-note-blue' : 'bg-note-yellow'}
                  rotate={k ? 'rotate-1' : '-rotate-1'}
                  className="h-full p-5"
                >
                  <span className="block text-3xl font-bold">{p.title}</span>
                  <span className="mt-2 block font-sans text-base leading-relaxed text-ink-soft">{p.text}</span>
                </StickyNote>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* the narrative travelled */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-ink px-6 py-10 text-cream sm:px-10 sm:py-12 lg:px-14">
            <div aria-hidden className="absolute inset-0 bg-dots-light" />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-xs text-note-yellow">bonus / unplanned</p>
                <h3 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">{outcome.travelled.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-cream/75">{outcome.travelled.text}</p>
              </div>

              {/* built for -> adopted by */}
              <div className="flex flex-col items-start gap-2 lg:col-span-5 lg:items-center">
                <StickyNote color="bg-note-green" rotate="-rotate-2" className="w-full max-w-xs p-4">
                  <span className="block font-mono text-[10px] font-medium text-ink/60">built for</span>
                  <span className="text-2xl font-bold">{outcome.travelled.from}</span>
                </StickyNote>
                <p className="flex items-center gap-1 self-center font-hand text-xl font-bold text-note-yellow">
                  <CurvyArrow className="w-10 rotate-[250deg]" />
                  travelled to
                </p>
                <StickyNote color="bg-note-pink" rotate="rotate-2" className="w-full max-w-xs p-4">
                  <span className="block font-mono text-[10px] font-medium text-ink/60">adopted by</span>
                  <span className="text-2xl font-bold">{outcome.travelled.to}</span>
                </StickyNote>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
