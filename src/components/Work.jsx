import { projects } from '../data/content'
import CardLink, { frameName, slugify } from './CardLink'
import { StickyNote } from './Doodles'
import { ArrowUpRight } from './Icons'
import ProjectVisual from './ProjectVisual'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Work() {
  return (
    <section id="work" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            index="01"
            eyebrow="selected_work"
            title="Case studies"
            note="real problems, measured outcomes"
            intro="An enterprise healthcare platform, and two products of my own: one for photo crews, one for contractors. Each one is tied to a real user problem."
          />
          <Reveal className="font-mono text-xs text-ink-soft md:pb-2">
            {String(projects.length).padStart(2, '0')} frames · 2025 → now
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-6">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 3) * 120}
              // on two-column screens an odd last card sits centred on its own row
              className="md:last:odd:col-span-2 md:last:odd:mx-auto md:last:odd:w-[calc(50%-1rem)] lg:last:odd:col-span-1 lg:last:odd:w-auto"
            >
              <CardLink project={project}>
                {/* Figma-style frame label */}
                <p className="mb-2 flex items-center justify-between font-mono text-[11px] text-ink-soft">
                  <span className="transition-colors group-hover:text-figma">
                    ▢ frame_{String(i + 1).padStart(2, '0')} / {frameName(project)}
                  </span>
                  <span>{project.year}</span>
                </p>

                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-ink ${project.tint} transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-hard`}
                >
                  <div aria-hidden className="absolute inset-0 bg-dots opacity-70" />
                  <ProjectVisual type={project.visual} note={project.note} project={project} />
                  <span className="absolute top-4 right-4 grid size-11 place-items-center rounded-full border-2 border-ink bg-paper text-ink transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-cream">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>

                <div className="relative pt-6 pr-2">
                  <StickyNote
                    color="bg-note-yellow"
                    rotate={i % 2 ? 'rotate-3' : '-rotate-3'}
                    className="absolute -top-7 right-4 px-3 py-2 text-xl font-bold sm:text-2xl"
                  >
                    {project.result}
                  </StickyNote>
                  <p className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">{project.client}</p>
                  <h3 className="mt-2 text-2xl leading-tight font-bold tracking-tight sm:text-[1.75rem]">
                    {project.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{project.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-dashed border-ink/40 px-2 py-1 font-mono text-[11px] text-ink-soft"
                      >
                        #{slugify(tag)}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
