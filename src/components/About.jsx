import { about, profile } from '../data/content'
import { Squiggle, StickyNote } from './Doodles'
import { ArrowUpRight } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

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
            <a href={profile.resumeUrl} className="group relative inline-flex items-center gap-2 pb-2 font-semibold">
              Download résumé <ArrowUpRight />
              <Squiggle className="absolute inset-x-0 -bottom-1 h-2.5 w-full text-marker [&_path]:[stroke-dashoffset:0]" />
            </a>
          </Reveal>

          {/* credentials as pinned index cards */}
          <Reveal delay={200} className="mt-12">
            <p className="mb-4 font-mono text-xs text-ink-soft">
              <span className="text-marker">[✓]</span> credentials
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {about.credentials.map((c, i) => (
                <li
                  key={c.title}
                  className={`rounded-md border-2 border-ink bg-paper p-4 shadow-[3px_3px_0_var(--color-ink)] ${i % 2 ? 'sm:rotate-1' : 'sm:-rotate-1'}`}
                >
                  <span className="mb-2 block h-0.5 w-8 bg-marker" />
                  <span className="block leading-snug font-semibold">{c.title}</span>
                  <span className="mt-1 block font-mono text-[11px] text-ink-soft">{c.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-10">
          {/* affinity map board */}
          <Reveal className="relative rounded-2xl border-2 border-dashed border-ink/35 bg-paper/60 p-5 sm:p-8">
            <p className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">affinity_map.fig / skills</p>
            <div className="grid gap-8 sm:grid-cols-2">
              {about.skillGroups.map((group, g) => (
                <div key={group.label}>
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

          <Reveal delay={120} className="mt-10">
            <p className="mb-4 font-mono text-xs text-ink-soft">
              <span className="text-marker">[⌘]</span> toolkit
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {about.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border-2 border-ink bg-paper px-4 py-2 font-mono text-sm font-medium transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-cream"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
