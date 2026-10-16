import { CurvyArrow, StickyNote } from '../Doodles'
import Reveal from '../Reveal'
import SectionLabel from './SectionLabel'

const scoreLabel = ['Not covered', 'Partly, or with workarounds', 'Built for it']

function Score({ value, us }) {
  if (value === 2)
    return (
      <span
        title={scoreLabel[2]}
        className={`mx-auto grid size-6 place-items-center rounded-full border-2 border-ink ${us ? 'bg-note-yellow' : 'bg-note-green'}`}
      >
        <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="sr-only">{scoreLabel[2]}</span>
      </span>
    )
  if (value === 1)
    return (
      <span title={scoreLabel[1]} className="mx-auto block size-6 rounded-full border-2 border-ink bg-[linear-gradient(90deg,var(--color-ink)_50%,transparent_50%)]">
        <span className="sr-only">{scoreLabel[1]}</span>
      </span>
    )
  return (
    <span title={scoreLabel[0]} className="mx-auto block h-0.5 w-4 rounded-full bg-ink/25">
      <span className="sr-only">{scoreLabel[0]}</span>
    </span>
  )
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-ink-soft">
      {[2, 1, 0].map((v) => (
        <span key={v} className="flex items-center gap-2">
          <Score value={v} />
          {scoreLabel[v].toLowerCase()}
        </span>
      ))}
    </div>
  )
}

// What each tool is for, as a row of index cards
function Landscape({ tools }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((t) => (
        <li
          key={t.name}
          className={`rounded-xl p-4 ${t.us ? 'border-2 border-ink bg-note-yellow shadow-hard' : 'border border-ink/15 bg-paper/70'}`}
        >
          <p className={`font-mono text-[10px] tracking-wide uppercase ${t.us ? 'text-ink/70' : 'text-ink-soft'}`}>{t.kind}</p>
          <p className="mt-1 text-lg font-bold">{t.name}</p>
          <p className={`mt-1.5 text-sm leading-snug ${t.us ? 'text-ink' : 'text-ink-soft'}`}>
            <span className="font-semibold">Built for: </span>
            {t.builtFor}
          </p>
        </li>
      ))}
    </ul>
  )
}

function Matrix({ tools, rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-hard">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-4 py-3 sm:px-5">
        <span className="font-mono text-[11px] text-ink-soft">feature_matrix / what a shoot crew needs</span>
        <span className="font-hand text-base font-bold text-marker md:hidden">scroll sideways →</span>
      </div>
      {/* relative, so the screen-reader-only labels inside the cells stay inside the scroller */}
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left sm:min-w-[920px]">
          <caption className="sr-only">How Workive compares with other tools on what a shoot crew needs</caption>
          <thead>
            <tr className="border-b-2 border-dashed border-ink/15">
              <th scope="col" className="sticky left-0 z-10 w-[11rem] bg-paper px-4 py-3 font-mono sm:w-[19rem] text-[11px] font-normal text-ink-soft sm:px-5">
                what the crew needs
              </th>
              {tools.map((t) => (
                <th
                  key={t.name}
                  scope="col"
                  className={`px-2 py-3 text-center text-[13px] leading-tight font-bold ${t.us ? 'bg-note-yellow' : ''}`}
                >
                  {t.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.need} className="border-b border-ink/10 last:border-0">
                <th scope="row" className="sticky left-0 z-10 bg-paper px-4 py-3.5 text-[13px] leading-snug font-medium shadow-[6px_0_8px_-6px_rgba(22,35,44,0.25)] sm:px-5 sm:text-sm">
                  {row.need}
                </th>
                {row.scores.map((v, k) => (
                  <td key={tools[k].name} className={`px-2 py-3.5 text-center ${tools[k].us ? 'bg-note-yellow/60' : ''}`}>
                    <Score value={v} us={tools[k].us} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// 2x2 positioning map: who each tool is for vs. how specific it is to shoots
function PositioningMap({ points }) {
  return (
    <figure className="relative rounded-2xl border-2 border-ink bg-paper p-4 sm:p-6">
      <figcaption className="mb-4 font-mono text-[11px] text-ink-soft">positioning_map</figcaption>
      <div className="relative ml-6 aspect-square border-b-2 border-l-2 border-ink sm:ml-8">
        {/* quadrant guides */}
        <span aria-hidden className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-ink/20" />
        <span aria-hidden className="absolute top-1/2 right-0 left-0 border-t border-dashed border-ink/20" />
        <span aria-hidden className="absolute top-0 right-0 h-1/2 w-1/2 bg-note-yellow/30" />
        <span className="absolute top-[42%] right-2 font-hand text-lg font-bold text-marker">nobody else here</span>

        {points.map((p) => (
          <span
            key={p.name}
            className="absolute flex -translate-x-1/2 translate-y-1/2 flex-col items-center"
            style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
          >
            <span className={`rounded-full border-2 border-ink ${p.us ? 'size-5 bg-note-yellow shadow-[2px_2px_0_var(--color-ink)]' : 'size-3 bg-paper'}`} />
            <span className={`mt-1 whitespace-nowrap ${p.us ? 'text-sm font-extrabold' : 'font-mono text-[10px] text-ink-soft sm:text-[11px]'}`}>
              {p.name}
            </span>
          </span>
        ))}

        <span className="absolute -bottom-7 left-0 font-mono text-[10px] text-ink-soft sm:text-[11px]">your own team</span>
        <span className="absolute right-0 -bottom-7 font-mono text-[10px] text-ink-soft sm:text-[11px]">open network of freelancers →</span>
        <span className="absolute bottom-0 -left-6 origin-bottom-left -rotate-90 font-mono text-[10px] whitespace-nowrap text-ink-soft sm:-left-7 sm:text-[11px]">
          general purpose · built for shoots →
        </span>
      </div>
      <div className="h-8" />
    </figure>
  )
}

export default function Competition({ competition, index = '03' }) {
  const { tools, matrix, map, different } = competition
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index}>competitive_analysis</SectionLabel>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">How it&apos;s different</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 lg:pt-8">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{competition.lead}</p>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-16">
          <h3 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">The tools crews use today</h3>
          <Landscape tools={tools} />
        </Reveal>

        <Reveal className="mt-20">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Side by side</h3>
            <Legend />
          </div>
          <Matrix tools={tools} rows={matrix} />
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink-soft">
            Based on each tool&apos;s core features out of the box. Many can be stretched further with integrations and
            custom setups.
          </p>
        </Reveal>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h3 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">Where it sits</h3>
            <PositioningMap points={map} />
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <h3 className="mb-6 flex flex-wrap items-center gap-x-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Why Workive! is different
              <span className="flex items-center gap-1 font-hand text-xl font-bold text-marker">
                <CurvyArrow className="w-9 shrink-0 -scale-y-100 rotate-12" />
                four things
              </span>
            </h3>
            <ol className="grid gap-4 sm:grid-cols-2">
              {different.map((d, k) => (
                <li key={d.title}>
                  <StickyNote
                    color={['bg-note-yellow', 'bg-note-pink', 'bg-note-blue', 'bg-note-green'][k % 4]}
                    rotate={['-rotate-1', 'rotate-1', 'rotate-1', '-rotate-1'][k % 4]}
                    className="h-full p-5"
                  >
                    <span className="block font-mono text-[10px] font-medium text-ink/60">{String(k + 1).padStart(2, '0')}</span>
                    <span className="mt-1 block text-2xl leading-tight font-bold">{d.title}</span>
                    <span className="mt-2 block font-sans text-sm leading-relaxed text-ink-soft">{d.text}</span>
                  </StickyNote>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-xl border-2 border-dashed border-ink/25 p-4 text-base leading-relaxed text-ink-soft">
              {competition.note}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
