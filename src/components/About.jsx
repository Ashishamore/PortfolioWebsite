import { about, profile } from '../data/content'
import { Squiggle, StickyNote } from './Doodles'
import { ArrowUpRight } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Toolkit from './Toolkit'

// Each skill cluster gets its own sticky-note colour, like an affinity map
const clusterColors = ['bg-note-yellow', 'bg-note-pink', 'bg-note-blue', 'bg-note-green']
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-3']

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading index="02" eyebrow="about_me" title={about.heading} />
          <Reveal delay={100} className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={150} className="mt-8">
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="group relative inline-flex items-center gap-2 pb-2 font-semibold">
              Download résumé <ArrowUpRight />
              <Squiggle className="absolute inset-x-0 -bottom-1 h-2.5 w-full text-marker [&_path]:[stroke-dashoffset:0]" />
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-10">
          {/* affinity map board */}
          <Reveal className="relative rounded-2xl border-2 border-dashed border-ink/35 bg-paper/60 p-5 sm:p-8">
            <p className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">affinity_map.fig / skills</p>
            <div className="grid gap-8 sm:grid-cols-2">
              {/* `wide` clusters run full width; the others pair up in a row */}
              {about.skillGroups.map((group, g) => (
                <div key={group.label} className={group.wide ? 'sm:col-span-2' : ''}>
                  <p className="mb-3 inline-block rounded-sm bg-ink px-2 py-1 font-mono text-[11px] tracking-wide text-cream uppercase">
                    {group.label} · {group.items.length}
                  </p>
                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((item, k) => (
                      <li key={item}>
                        <StickyNote
                          color={clusterColors[g % clusterColors.length]}
                          rotate={tilts[(k + g) % tilts.length]}
                          className="px-3 py-2 text-xl font-bold transition-transform hover:z-10 hover:scale-110 hover:rotate-0"
                        >
                          {item}
                        </StickyNote>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <Toolkit />

      {/* credentials, oldest to newest, as a timeline across the full width */}
      <Reveal delay={150} className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:px-8">
        <p className="mb-6 font-mono text-xs text-ink-soft">
          <span className="text-marker">[✓]</span> credentials
        </p>
        <ol className="relative grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {/* the line through the year dots: down the side on phones, across on wide screens */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-ink/25 sm:hidden" />
          <span aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-0.5 bg-ink/25 lg:block" />
          {about.credentials.map((c, i) => (
            <li key={c.title} className="relative">
              <span
                aria-hidden
                className={`relative block size-4 rounded-full border-2 border-ink ${c.kind === 'Degree' ? 'bg-note-blue' : 'bg-marker'}`}
              />
              <p className="mt-3 font-hand text-3xl leading-none font-bold text-marker">{c.year}</p>
              <div
                className={`mt-3 rounded-md border-2 border-ink bg-paper p-4 shadow-[3px_3px_0_var(--color-ink)] ${i % 2 ? 'sm:rotate-1' : 'sm:-rotate-1'}`}
              >
                <span className="block font-mono text-[10px] tracking-wide text-ink-soft uppercase">{c.kind}</span>
                <span className="mt-1 block leading-snug font-semibold">{c.title}</span>
                <span className="mt-1 block font-mono text-[11px] text-ink-soft">{c.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
