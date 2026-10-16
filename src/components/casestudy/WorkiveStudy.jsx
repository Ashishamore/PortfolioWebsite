import { workiveScreens as shots } from '../../data/workive'
import { CurvyArrow, StickyNote } from '../Doodles'
import Reveal from '../Reveal'
import Competition from './Competition'
import DesignSystem from './DesignSystem'
import { designSystem } from '../../data/workiveDesignSystem'
import InfoArchitecture from './InfoArchitecture'
import LiveApp from './LiveApp'
import Origin from './Origin'
import Personas from './Personas'
import Phone from './Phone'
import Wireframes from './Wireframes'
import SectionLabel from './SectionLabel'

// Case study 02: Workive!, coordination for freelance photography crews

const jobColors = ['bg-note-yellow', 'bg-note-pink', 'bg-note-blue', 'bg-note-green', 'bg-note-lilac']
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2']

function SectionHead({ index, label, title, children }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-4">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">{title}</h2>
      </Reveal>
      {children && <Reveal className="space-y-5 lg:col-span-8 lg:pt-8">{children}</Reveal>}
    </div>
  )
}

// Hero visual: the real app, running right here in a phone frame
export function WorkiveVisual({ study, project }) {
  return (
    <figure className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-ink px-5 py-10 text-cream sm:px-10 sm:py-14">
      <div aria-hidden className="absolute inset-0 bg-dots-light" />

      <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6 lg:col-start-2">
          <p className="font-mono text-xs text-note-yellow">live / not a video, not a mockup</p>
          <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">Try the app right here</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/75">
            This is the working prototype, running inside the page. Tap the phone to start, then use it like you would on
            your own.
          </p>

          <StickyNote tape rotate="-rotate-2" className="relative mt-8 max-w-sm p-5">
            <span className="block font-mono text-[10px] font-medium text-ink/60">things to try</span>
            <ol className="mt-2 space-y-1.5 text-xl font-bold">
              {study.tryThis.map((t, k) => (
                <li key={t} className="flex gap-2">
                  <span className="text-marker">{k + 1}.</span> {t}
                </li>
              ))}
            </ol>
          </StickyNote>

          <p className="mt-6 hidden items-center gap-1 font-hand text-2xl font-bold text-note-yellow lg:flex">
            {project.note}, end to end
            <CurvyArrow className="w-12 shrink-0 rotate-[200deg] -scale-x-100 -scale-y-100" />
          </p>
        </div>

        <LiveApp poster={shots[study.heroPoster]} className="mx-auto w-full max-w-[19rem] lg:col-span-4" />
      </div>
      <figcaption className="sr-only">An interactive copy of the Workive prototype, running inside this page.</figcaption>
    </figure>
  )
}

export default function WorkiveStudy({ study }) {
  return (
    <>
      {/* 01 Origin story */}
      <Origin origin={study.origin} />

      {/* 02 Context */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="02" label="context" title="The everyday problem">
            {study.context.text.map((para, k) => (
              <p
                key={k}
                className={k === 0 ? 'text-xl leading-snug sm:text-2xl lg:text-[1.75rem]' : 'text-lg leading-relaxed text-ink-soft sm:text-xl'}
              >
                {para}
              </p>
            ))}
          </SectionHead>

          <Reveal className="mt-14 lg:mt-16">
            <div className="relative rounded-2xl border-2 border-dashed border-ink/25 px-5 pt-14 pb-8 sm:px-8 sm:pb-10">
              <p className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">
                jobs_to_be_done / {study.context.jobs.length}
              </p>
              <p className="absolute top-4 right-5 flex items-center gap-1 font-hand text-xl font-bold text-marker sm:right-8 sm:text-2xl">
                one shoot, five jobs
                <CurvyArrow className="w-9 shrink-0 rotate-[200deg] -scale-x-100" />
              </p>
              <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {study.context.jobs.map((job, k) => (
                  <li key={job.title} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)]">
                    <StickyNote color={jobColors[k % 5]} rotate={tilts[k % 5]} className="flex h-full min-h-44 flex-col p-4 sm:p-5">
                      <span className="font-mono text-[10px] font-medium tracking-wide text-ink/60">job_{String(k + 1).padStart(2, '0')}</span>
                      <span className="mt-auto pt-6 text-2xl font-bold">{job.title}</span>
                      <span className="mt-2 font-sans text-[13px] leading-snug text-ink-soft">{job.text}</span>
                    </StickyNote>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 Personas */}
      <Personas personas={study.personas} />

      {/* 04 Competitive analysis */}
      <Competition competition={study.competition} index="04" />

      {/* 05 Information architecture */}
      <InfoArchitecture ia={study.ia} />

      {/* 06 Lo-fi wireframes */}
      <Wireframes wireframes={study.wireframes} />

      {/* 07 The app */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="07" label="the_app" title="The app, screen by screen">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">
              Eight of the screens, each built around one question a photographer has during a shoot&apos;s life.
            </p>
          </SectionHead>

          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:mt-16 lg:grid-cols-4">
            {study.screens.map((s, k) => (
              <Reveal as="li" key={s.key} delay={(k % 4) * 80}>
                <Phone src={shots[s.key]} alt={`Workive ${s.title} screen`} />
                <p className="mt-5 font-mono text-[11px] text-ink-soft">screen_{String(k + 1).padStart(2, '0')}</p>
                <h3 className="mt-1 text-lg font-bold sm:text-xl">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft sm:text-base">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 Decisions */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="08" label="design_decisions" title="Design decisions">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">
              Six choices that shaped the app, and the problem behind each one.
            </p>
          </SectionHead>

          <ol className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
            {study.decisions.map((d, k) => (
              <Reveal as="li" key={d.title} delay={(k % 2) * 100} className="h-full">
                <article className="grid h-full grid-cols-[5.5rem_1fr] gap-5 rounded-2xl border-2 border-ink bg-paper p-5 shadow-hard sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:p-6">
                  <Phone src={shots[d.screen]} alt="" rounded="rounded-[1rem]" className="self-start rounded-[1.3rem] p-1 shadow-none" />
                  <div>
                    <p className="font-hand text-4xl leading-none font-bold text-marker">{String(k + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-xl leading-tight font-extrabold tracking-tight sm:text-2xl">{d.title}</h3>
                    <p className="mt-4 rounded-lg border-2 border-dashed border-ink/25 px-3 py-2 text-sm text-ink-soft">
                      <span className="block font-mono text-[10px] text-marker">problem</span>
                      {d.problem}
                    </p>
                    <p className="mt-2 rounded-lg bg-note-green/60 px-3 py-2 text-sm">
                      <span className="block font-mono text-[10px] text-ink-soft">decision</span>
                      {d.decision}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 09 Design system */}
      <DesignSystem ds={designSystem} />

      {/* 10 Status */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="10" label="where_it_stands" title="Where it stands">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{study.status.lead}</p>
          </SectionHead>

          <ul className="mt-14 grid gap-5 sm:grid-cols-3 lg:mt-16">
            {study.status.points.map((p, k) => (
              <Reveal as="li" key={p.label} delay={k * 100}>
                <StickyNote color={['bg-note-green', 'bg-note-yellow', 'bg-note-pink'][k % 3]} rotate={tilts[k % 5]} className="h-full p-5">
                  <span className="block text-4xl font-bold">{p.label}</span>
                  <span className="mt-2 block font-sans text-base leading-relaxed text-ink-soft">{p.text}</span>
                </StickyNote>
              </Reveal>
            ))}
          </ul>

        </div>
      </section>
    </>
  )
}
