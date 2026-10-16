import { CurvyArrow, StickyNote } from '../Doodles'
import JourneyMap from '../JourneyMap'
import Reveal from '../Reveal'
import Approach from './Approach'
import Learned from './Learned'
import Outcome from './Outcome'
import { colorOf } from './personaColors'
import SectionLabel from './SectionLabel'

// Case study 01: the specialty pharma platform, told as one patient's journey

const noteTilts = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1']

// Hero visual: the journey map, full width
export function PharmaVisual({ study, project }) {
  return (
    <figure className="relative">
      <p className="mb-3 flex items-center gap-1 font-hand text-2xl font-bold text-marker sm:absolute sm:-top-12 sm:right-6 sm:mb-0 sm:text-3xl">
        {project.note}
        <CurvyArrow draw className="w-10 shrink-0 rotate-[200deg] -scale-x-100 sm:w-12" />
      </p>

      <div className="overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-hard">
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink px-4 py-2.5 font-mono text-[11px] text-ink-soft sm:px-5">
          <span>journey_map / patient_01</span>
          <span className="font-hand text-base font-bold text-marker md:hidden">drag to explore →</span>
          <span className="hidden items-center gap-5 md:flex">
            <span className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-ink" /> the case
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 border-t-2 border-dashed border-ink" /> detour
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 border-t-2 border-dotted border-ink/40" /> data
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-marker" /> patient
            </span>
          </span>
        </div>
        {/* the map needs room to read, so on phones it scrolls sideways */}
        <div className="overflow-x-auto">
          <JourneyMap journey={study.journeyMap} className="w-full min-w-[860px] pb-8 lg:pb-10" />
        </div>
      </div>

      <StickyNote
        tape
        rotate="rotate-3"
        className="relative -mt-6 ml-auto w-fit px-4 py-3 text-2xl font-bold sm:absolute sm:right-8 sm:-bottom-8 sm:mt-0 sm:text-3xl"
      >
        {project.result}
      </StickyNote>
      <figcaption className="sr-only">
        One patient&apos;s case moving across every persona&apos;s lane, from referral to therapy, with a denial
        and appeal detour.
      </figcaption>
    </figure>
  )
}

export default function PharmaStudy({ study }) {
  return (
    <>
      {/* 01 Context */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="01">context</SectionLabel>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">Context</h2>
          </Reveal>
          <Reveal className="space-y-5 lg:col-span-8 lg:pt-8">
            {study.context.text.map((para, k) => (
              <p
                key={k}
                className={k === 0 ? 'text-xl leading-snug sm:text-2xl lg:text-[1.75rem]' : 'text-lg leading-relaxed text-ink-soft sm:text-xl'}
              >
                {para}
              </p>
            ))}
          </Reveal>
        </div>

        {/* the personas, as sticky notes on the board */}
        <Reveal className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:mt-16 lg:px-8">
          <div className="relative rounded-2xl border-2 border-dashed border-ink/25 px-5 pt-14 pb-8 sm:px-8 sm:pb-10">
            <p className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">
              who_touches_a_case / {study.context.personas.length} personas
            </p>
            <p className="absolute top-4 right-5 flex items-center gap-1 font-hand text-xl font-bold text-marker sm:right-8 sm:text-2xl">
              same case, different views
              <CurvyArrow className="w-9 shrink-0 rotate-[200deg] -scale-x-100" />
            </p>
            {/* equal-size notes; a short last row is centred (4 + 3 on desktop) */}
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {study.context.personas.map((persona, k) => (
                <li
                  key={persona.name}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
                >
                  <StickyNote
                    color={colorOf(persona.name).bg}
                    rotate={noteTilts[k % noteTilts.length]}
                    className={`relative flex h-full min-h-44 flex-col p-4 sm:min-h-52 sm:p-5 ${persona.main ? 'outline-2 outline-offset-4 outline-marker' : ''}`}
                  >
                    <span className="flex items-center justify-between gap-2 font-mono text-[10px] font-medium tracking-wide text-ink/60">
                      persona_{String(k + 1).padStart(2, '0')}
                      {persona.main && (
                        <span className="rounded-sm bg-marker px-1.5 py-0.5 whitespace-nowrap text-white">main user</span>
                      )}
                    </span>
                    <span className="mt-auto pt-6 text-2xl font-bold sm:text-[1.7rem]">{persona.name}</span>
                    <span className="mt-2 font-sans text-[13px] leading-snug text-ink-soft sm:text-sm">{persona.role}</span>
                  </StickyNote>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* 02 Approach */}
      <Approach approach={study.approach} stages={study.journeyMap.stages} />

      {/* 03 Outcome */}
      <Outcome outcome={study.outcome} />

      {/* 04 What I learned */}
      <Learned learned={study.learned} />
    </>
  )
}
