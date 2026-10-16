import { Link } from 'react-router-dom'
import CardLink, { frameName } from '../CardLink'
import { ArrowUpRight } from '../Icons'
import ProjectVisual from '../ProjectVisual'
import Reveal from '../Reveal'

// "More case studies": every other project, as compact cards, at the bottom of a case-study page
export default function MoreWork({ projects, current }) {
  const others = projects.map((p, i) => ({ ...p, frameNo: i + 1 })).filter((p) => p.slug !== current)
  if (!others.length) return null

  return (
    <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-wide text-ink-soft">
              <span className="text-marker">[→]</span> keep_reading
            </p>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">More case studies</h2>
          </div>
          <Link to="/#work" className="font-mono text-xs text-ink-soft underline underline-offset-4 transition-colors hover:text-marker">
            see all on the home page
          </Link>
        </Reveal>

        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project, k) => (
            <Reveal as="li" key={project.title} delay={k * 100}>
              <CardLink project={project}>
                <p className="mb-2 flex items-center justify-between font-mono text-[11px] text-ink-soft">
                  <span className="transition-colors group-hover:text-figma">
                    ▢ frame_{String(project.frameNo).padStart(2, '0')} / {frameName(project)}
                  </span>
                  <span>{project.year}</span>
                </p>
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-ink ${project.tint} transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-hard`}
                >
                  <div aria-hidden className="absolute inset-0 bg-dots opacity-70" />
                  <ProjectVisual type={project.visual} note={project.note} project={project} />
                  <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full border-2 border-ink bg-paper text-ink transition-all duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-cream">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <p className="mt-4 font-mono text-[11px] tracking-wide text-ink-soft uppercase">{project.client}</p>
                <h3 className="mt-1.5 text-xl leading-snug font-bold tracking-tight">{project.title}</h3>
                <p className="mt-2 inline-block rounded-md bg-note-yellow px-2 py-0.5 font-hand text-lg font-bold">{project.result}</p>
              </CardLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
