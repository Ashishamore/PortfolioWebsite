import Reveal from '../Reveal'
import SectionLabel from './SectionLabel'

// Information architecture of the app, drawn as a tree hanging off the bottom navigation bar

const tabIcons = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9" />,
  chat: <path d="M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5" />,
  schedule: <path d="M4 6h16v14H4zM4 10h16M8 3v5M16 3v5" />,
  profile: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4 4.5-6 8-6s7 2 8 6" />,
}

const tabColors = ['bg-note-yellow', 'bg-note-pink', 'bg-note-blue', 'bg-note-green']

const kindStyle = {
  screen: 'border-2 border-ink bg-paper',
  section: 'border-2 border-dashed border-ink/40 bg-paper/60',
  overlay: 'border-2 border-ink bg-ink text-cream',
}

function Icon({ name, className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {tabIcons[name]}
    </svg>
  )
}

// A node and its children, joined by tree lines
// The parent list draws the vertical spine; each node draws its own tick, and the last one hides the spine below it.
function Node({ item, last }) {
  return (
    <li className="relative pl-4">
      <span aria-hidden className="absolute top-5 left-0 w-3 border-t-2 border-ink/30" />
      {last && <span aria-hidden className="absolute top-[1.375rem] bottom-0 -left-[2px] w-[2px] bg-paper" />}
      <div className={`rounded-lg px-3 py-2 ${kindStyle[item.kind] ?? kindStyle.screen}`}>
        <p className="text-sm leading-snug font-bold">{item.name}</p>
        {item.note && <p className={`mt-0.5 text-xs leading-snug ${item.kind === 'overlay' ? 'text-cream/70' : 'text-ink-soft'}`}>{item.note}</p>}
        {item.to && (
          <p className={`mt-1.5 inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[10px] ${item.kind === 'overlay' ? 'bg-note-yellow text-ink' : 'bg-marker/10 text-marker'}`}>
            → {item.to}
          </p>
        )}
      </div>
      {item.children && (
        <ul className="relative mt-2 ml-3 space-y-2 border-l-2 border-ink/30">
          {item.children.map((c, k) => (
            <Node key={c.name} item={c} last={k === item.children.length - 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

function Legend() {
  const rows = [
    ['screen', 'Screen'],
    ['section', 'Section on a screen'],
    ['overlay', 'Overlay or sheet'],
  ]
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-ink-soft">
      {rows.map(([k, label]) => (
        <span key={k} className="flex items-center gap-2">
          <span className={`h-3.5 w-5 rounded-[3px] ${kindStyle[k]}`} />
          {label}
        </span>
      ))}
      <span className="flex items-center gap-2">
        <span className="rounded-sm bg-marker/10 px-1 text-marker">→</span>
        opens a shared screen
      </span>
    </div>
  )
}

export default function InfoArchitecture({ ia, index = '05' }) {
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index}>information_architecture</SectionLabel>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">Information architecture</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 lg:pt-8">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{ia.lead}</p>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-16">
          <div className="rounded-2xl border-2 border-ink bg-paper shadow-hard">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-4 py-3 sm:px-5">
              <span className="font-mono text-[11px] text-ink-soft">ia_diagram / bottom navigation</span>
              <Legend />
            </div>

            <div className="relative bg-dots p-4 sm:p-6 lg:p-8">
              {/* root: the bottom navigation bar, drawn like the app's own */}
              <div className="mx-auto max-w-xl">
                <p className="mb-2 text-center font-mono text-[11px] text-ink-soft">bottom navigation · 4 tabs</p>
                <div className="flex rounded-2xl border-2 border-ink bg-ink p-1.5 text-cream shadow-[4px_4px_0_var(--color-note-yellow)]">
                  {ia.tabs.map((t, k) => (
                    <span key={t.name} className="flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-semibold">
                      <span className={`grid size-9 place-items-center rounded-full text-ink ${tabColors[k % 4]}`}>
                        <Icon name={t.icon} />
                      </span>
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* connectors from the bar to each column (wide screens) */}
              <div aria-hidden className="relative mx-auto mt-0 hidden h-10 lg:block">
                <span className="absolute top-0 left-1/2 h-4 border-l-2 border-ink/30" />
                <span className="absolute top-4 right-[12.5%] left-[12.5%] border-t-2 border-ink/30" />
                {[12.5, 37.5, 62.5, 87.5].map((x) => (
                  <span key={x} className="absolute top-4 h-6 border-l-2 border-ink/30" style={{ left: `${x}%` }} />
                ))}
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-5">
                {ia.tabs.map((t, k) => (
                  <div key={t.name}>
                    <div className={`sticky-note rounded-md p-3 ${tabColors[k % 4]}`}>
                      <p className="flex items-center gap-2 font-sans text-lg font-extrabold">
                        <Icon name={t.icon} className="size-5" /> {t.name}
                      </p>
                      <p className="mt-0.5 text-lg font-bold">{t.job}</p>
                    </div>
                    <ul className="mt-3 ml-3 space-y-2 border-l-2 border-ink/30 pt-1">
                      {t.items.map((item, k) => (
                        <Node key={item.name} item={item} last={k === t.items.length - 1} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* shared screens */}
              <div className="mt-12 border-t-2 border-dashed border-ink/20 pt-8">
                <p className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xl font-extrabold">Shared screens</span>
                  <span className="font-hand text-xl font-bold text-marker">many roads lead here</span>
                </p>
                <div className="grid gap-5 md:grid-cols-2">
                  {ia.shared.map((s, k) => (
                    <div key={s.name} className={`rounded-xl border-2 border-ink p-5 ${k ? 'bg-paper' : 'bg-note-yellow'} shadow-[4px_4px_0_var(--color-ink)]`}>
                      <p className="font-mono text-[10px] text-ink/60">shared_screen_{String(k + 1).padStart(2, '0')}</p>
                      <p className="mt-1 text-2xl font-extrabold">{s.name}</p>
                      <p className="mt-3 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-ink-soft">
                        reached from
                        {s.from.map((f) => (
                          <span key={f} className="rounded-sm border border-ink/30 bg-paper px-1.5 py-0.5 text-ink">
                            {f}
                          </span>
                        ))}
                      </p>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {s.tabs.map((t) => (
                          <li key={t} className="rounded-md border border-ink/20 bg-paper/80 px-2.5 py-1.5 text-xs leading-snug">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
