import { sitesaathiScreens as shots } from '../../data/sitesaathi'
import { CurvyArrow, StickyNote } from '../Doodles'
import Reveal from '../Reveal'
import LiveApp from './LiveApp'
import Phone from './Phone'
import SectionLabel from './SectionLabel'

// Case study 03: SiteSaathi, a project management platform for contractors (work in progress)

const tilts = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.5deg]']
const toneStyle = {
  done: { chip: 'bg-emerald-600 text-white', dot: 'bg-emerald-600', card: 'bg-note-green' },
  doing: { chip: 'bg-marker text-white', dot: 'bg-marker', card: 'bg-note-yellow' },
  next: { chip: 'bg-ink text-cream', dot: 'bg-ink/40', card: 'bg-paper' },
}

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

function Lead({ children }) {
  return <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{children}</p>
}

// "Work in progress" tape strip
function WipTape({ className = '' }) {
  return (
    <div aria-hidden className={`overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee gap-6 bg-[repeating-linear-gradient(135deg,var(--color-note-yellow)_0_18px,var(--color-ink)_18px_36px)] py-1">
        {Array.from({ length: 2 }).map((_, k) => (
          <span key={k} className="flex gap-6">
            {Array.from({ length: 8 }).map((__, j) => (
              <span key={j} className="rounded-sm bg-note-yellow px-2 font-mono text-[11px] font-bold tracking-widest text-ink">
                WORK IN PROGRESS
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

// Hero visual: the prototype, live, with a persona hint
export function SiteSaathiVisual({ study }) {
  return (
    <figure className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-ink text-cream">
      <WipTape />
      <div className="relative px-5 py-10 sm:px-10 sm:py-14">
        <div aria-hidden className="absolute inset-0 bg-dots-light" />
        <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 lg:col-start-2">
            <p className="font-mono text-xs text-note-yellow">live prototype / still being built</p>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">Try SiteSaathi right here</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/75">
              Every screen is wired to real data. Tap the phone, pick any of the ten people on the login screen, and run a
              real flow from their side.
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
              open two personas in two tabs: they share data live
              <CurvyArrow className="w-12 shrink-0 rotate-[200deg] -scale-x-100 -scale-y-100" />
            </p>
          </div>
          <LiveApp app={study.app} poster={shots[study.poster]} title="SiteSaathi prototype" className="mx-auto w-full max-w-[19rem] lg:col-span-4" />
        </div>
      </div>
      <figcaption className="sr-only">An interactive copy of the SiteSaathi prototype, running inside this page.</figcaption>
    </figure>
  )
}

export default function SiteSaathiStudy({ study }) {
  const { progress, problem, roles, screens, decisions, modules, firstRelease } = study
  const total = problem.areas.reduce((n, a) => n + a.count, 0)
  const max = Math.max(...problem.areas.map((a) => a.count))

  return (
    <>
      {/* 01 Work in progress */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="01" label="work_in_progress" title="Where it stands">
            <Lead>{progress.lead}</Lead>
          </SectionHead>

          <Reveal className="mt-12">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {progress.stats.map((s) => (
                <li key={s.label} className="rounded-xl border-2 border-ink bg-paper p-4 shadow-[3px_3px_0_var(--color-ink)]">
                  <p className="text-4xl font-extrabold tracking-tight">{s.value}</p>
                  <p className="mt-1 font-mono text-[11px] text-ink-soft">{s.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* kanban board */}
          <Reveal className="mt-10">
            <div className="relative rounded-2xl border-2 border-dashed border-ink/25 bg-dots px-4 pt-12 pb-6 sm:px-6">
              <p className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">sitesaathi / board</p>
              <div className="grid gap-6 md:grid-cols-3">
                {progress.columns.map((col) => {
                  const t = toneStyle[col.tone]
                  return (
                    <div key={col.label}>
                      <p className="mb-4 flex items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-bold ${t.chip}`}>{col.label}</span>
                        <span className="font-mono text-[11px] text-ink-soft">{col.items.length}</span>
                      </p>
                      <ul className="space-y-3">
                        {col.items.map((item, k) => (
                          <li key={item} className={`sticky-note ${t.card} ${tilts[k % 4]} flex gap-2.5 p-3.5`}>
                            <span className={`mt-1.5 size-2 shrink-0 rounded-full ${t.dot}`} />
                            <span className="font-sans text-sm leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 The problem */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="02" label="the_problem" title={`${total} problems, 17 areas`}>
            <Lead>{problem.lead}</Lead>
            <p className="text-base leading-relaxed text-ink-soft">{problem.note}</p>
          </SectionHead>

          <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-hard sm:p-6">
                <p className="mb-4 font-mono text-[11px] text-ink-soft">problem_map / problems per area</p>
                <ul className="space-y-2">
                  {problem.areas.map((a) => (
                    <li key={a.id} className="grid grid-cols-[1.5rem_9.5rem_1fr] items-center gap-2 sm:grid-cols-[1.5rem_12rem_1fr]">
                      <span className="font-mono text-[11px] font-bold text-marker">{a.id}</span>
                      <span className="truncate text-sm">{a.name}</span>
                      <span className="flex items-center gap-2">
                        <span className="h-3 rounded-sm bg-ink" style={{ width: `${(a.count / max) * 85}%` }} />
                        <span className="font-mono text-[11px] text-ink-soft">{a.count}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <div className="space-y-4 lg:col-span-5">
              {problem.voices.map((v, k) => (
                <Reveal key={v.id} delay={k * 80}>
                  <StickyNote color={['bg-note-yellow', 'bg-note-pink', 'bg-note-blue', 'bg-note-green'][k % 4]} rotate={tilts[k % 4]} className="p-5">
                    <span className="block font-mono text-[10px] font-medium text-ink/60">problem {v.id}</span>
                    <span className="mt-1 block text-2xl leading-snug font-bold">{v.text}</span>
                  </StickyNote>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 Who uses it */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="03" label="who_uses_it" title="Ten roles, one app">
            <Lead>{roles.lead}</Lead>
          </SectionHead>
          <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2">
            {roles.side.map((side, s) => (
              <Reveal key={side.label} delay={s * 120}>
                <div className={`h-full rounded-2xl border-2 p-5 sm:p-6 ${s ? 'border-dashed border-ink/40 bg-paper/60' : 'border-ink bg-paper shadow-hard'}`}>
                  <p className="font-mono text-[11px] text-ink-soft">{s ? 'shared space only' : 'private team space'}</p>
                  <p className="mt-1 text-2xl font-extrabold">{side.label}</p>
                  <ul className="mt-5 space-y-3">
                    {side.people.map((p) => (
                      <li key={p.role} className="flex gap-3">
                        <span className={`grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink text-xs font-extrabold ${s ? 'bg-note-blue' : 'bg-note-yellow'}`}>
                          {p.who
                            .replace('Ar. ', '')
                            .split(' ')
                            .map((w) => w[0])
                            .join('')
                            .slice(0, 2)}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold">
                            {p.role} <span className="font-normal text-ink-soft">· {p.who}</span>
                          </span>
                          <span className="block text-sm text-ink-soft">{p.sees}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 The app */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="04" label="the_app" title="The app, screen by screen">
            <Lead>Ten screens from four of the roles: the owner, the supervisor, a worker and a client.</Lead>
          </SectionHead>
          <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:mt-16 lg:grid-cols-5">
            {screens.map((s, k) => (
              <Reveal as="li" key={s.key} delay={(k % 5) * 70}>
                <Phone src={shots[s.key]} alt={`SiteSaathi ${s.title} screen`} />
                <p className="mt-5 font-mono text-[11px] text-ink-soft">screen_{String(k + 1).padStart(2, '0')}</p>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 Decisions */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="05" label="design_decisions" title="Design decisions">
            <Lead>Each decision answers problems from the map. The IDs show which ones.</Lead>
          </SectionHead>
          <ol className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
            {decisions.map((d, k) => (
              <Reveal as="li" key={d.title} delay={(k % 2) * 100} className="h-full">
                <article className="grid h-full grid-cols-[5.5rem_1fr] gap-5 rounded-2xl border-2 border-ink bg-paper p-5 shadow-hard sm:grid-cols-[7.5rem_1fr] sm:gap-6 sm:p-6">
                  <Phone src={shots[d.screen]} alt="" rounded="rounded-[1rem]" className="self-start rounded-[1.3rem] p-1 shadow-none" />
                  <div>
                    <p className="font-hand text-4xl leading-none font-bold text-marker">{String(k + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-xl leading-tight font-extrabold tracking-tight sm:text-2xl">{d.title}</h3>
                    <p className="mt-3 inline-block rounded-sm bg-marker/10 px-1.5 py-0.5 font-mono text-[11px] text-marker">solves {d.problem}</p>
                    <p className="mt-3 leading-relaxed text-ink-soft">{d.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 Modules */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="06" label="feature_map" title="19 modules">
            <Lead>Nineteen modules cover all {total} problems. A first release of six covers the daily pains every contractor shares: forgetting, labour and money.</Lead>
          </SectionHead>
          <Reveal className="mt-14 lg:mt-16">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((m, k) => {
                const first = firstRelease.includes(k + 1)
                return (
                  <li
                    key={m}
                    className={`flex items-start gap-3 rounded-xl p-3.5 ${first ? 'border-2 border-ink bg-note-yellow shadow-[3px_3px_0_var(--color-ink)]' : 'border border-ink/15 bg-paper/70'}`}
                  >
                    <span className="font-mono text-xs font-bold text-marker">{String(k + 1).padStart(2, '0')}</span>
                    <span className="text-sm leading-snug font-semibold">{m}</span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-ink-soft">
              <span className="h-3.5 w-5 rounded-[3px] border-2 border-ink bg-note-yellow" /> first release
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
