import Reveal from '../Reveal'
import SectionLabel from './SectionLabel'

const icons = {
  camera: (
    <path
      d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.4-2h5.8l1.4 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5zM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  clipboard: (
    <path
      d="M9 4h6v2.5H9zM7 5.5H5.5v14h13v-14H17M8.5 11l2 2 4-4M8.5 16.5h7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
}

function Meter({ label, value }) {
  return (
    <div>
      <p className="flex justify-between font-mono text-[10px] text-ink-soft">
        <span>{label}</span>
        <span>{value}/5</span>
      </p>
      <div className="mt-1 flex gap-1" aria-hidden>
        {[1, 2, 3, 4, 5].map((k) => (
          <span key={k} className={`h-1.5 flex-1 rounded-full ${k <= value ? 'bg-ink' : 'bg-ink/15'}`} />
        ))}
      </div>
    </div>
  )
}

function List({ title, items, tone }) {
  const mark = tone === 'good' ? 'bg-emerald-600' : 'bg-marker'
  return (
    <div>
      <p className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-snug">
            <span aria-hidden className={`mt-1.5 size-2 shrink-0 rounded-full ${mark}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PersonaCard({ p, index }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-hard">
      {/* header: who they are */}
      <header className={`relative border-b-2 border-ink p-6 sm:p-7 ${p.color}`}>
        <p className="font-mono text-[10px] font-medium text-ink/60">persona_{String(index + 1).padStart(2, '0')}</p>
        <div className="mt-3 flex items-center gap-4">
          <span className="relative grid size-20 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper text-2xl font-extrabold">
            {p.initials}
            <span className="absolute -right-1 -bottom-1 grid size-8 place-items-center rounded-full border-2 border-ink bg-ink text-cream">
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                {icons[p.icon]}
              </svg>
            </span>
          </span>
          <div className="min-w-0">
            <h3 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{p.name}</h3>
            <p className="mt-1 font-semibold">{p.role}</p>
            <p className="mt-0.5 text-sm text-ink-soft">
              {p.age} · {p.city}
            </p>
          </div>
        </div>
        <p className="mt-5 font-hand text-2xl leading-snug font-bold">&ldquo;{p.quote}&rdquo;</p>
      </header>

      <div className="flex flex-1 flex-col gap-7 p-6 sm:p-7">
        <div>
          <p className="text-sm font-semibold">{p.business}</p>
          <p className="mt-2 leading-relaxed text-ink-soft">{p.bio}</p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2">
          <List title="Goals" items={p.goals} tone="good" />
          <List title="Frustrations" items={p.frustrations} tone="bad" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">Uses today</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <li key={t} className="rounded-md border border-dashed border-ink/40 px-2 py-1 font-mono text-[11px] text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">Tech profile</p>
            {p.tech.map((t) => (
              <Meter key={t.label} {...t} />
            ))}
          </div>
        </div>

        {/* a moment from their week */}
        <div className="rounded-xl border-2 border-dashed border-ink/25 p-4">
          <p className="font-mono text-[10px] text-marker">scenario</p>
          <p className="mt-1 font-bold">{p.scenario.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{p.scenario.text}</p>
        </div>

        <div className="mt-auto rounded-xl bg-note-green/60 p-4">
          <p className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">How Workive! helps</p>
          <ul className="mt-3 space-y-2">
            {p.workive.map((w) => (
              <li key={w} className="flex gap-2.5 text-[15px] leading-snug">
                <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default function Personas({ personas, index = '03' }) {
  const [a, b] = personas.people
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index}>user_personas</SectionLabel>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">Who it&apos;s for</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 lg:pt-8">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{personas.lead}</p>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink-soft">{personas.note}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-2">
          {personas.people.map((p, k) => (
            <Reveal key={p.name} delay={k * 120} className="h-full">
              <PersonaCard p={p} index={k} />
            </Reveal>
          ))}
        </div>

        {/* how the two meet on the platform */}
        <Reveal className="mt-10">
          <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-ink bg-ink px-6 py-6 text-center text-cream sm:flex-row sm:text-left">
            <div className="flex shrink-0 items-center gap-2" aria-hidden>
              <span className={`grid size-11 place-items-center rounded-full border-2 border-cream text-sm font-extrabold text-ink ${b.color}`}>
                {b.initials}
              </span>
              <span className="font-hand text-xl text-note-yellow">hires</span>
              <span className={`grid size-11 place-items-center rounded-full border-2 border-cream text-sm font-extrabold text-ink ${a.color}`}>
                {a.initials}
              </span>
              <span className="font-hand text-xl text-note-yellow">staffs</span>
              <span className="grid size-11 place-items-center rounded-full border-2 border-dashed border-cream/60 font-mono text-xs">crew</span>
            </div>
            <p className="text-lg leading-snug">{personas.link}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
