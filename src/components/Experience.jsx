import { experience } from '../data/content'
import { StickyNote } from './Doodles'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

// Career as a commit log: dashed timeline, one node per role
export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <SectionHeading
            index="03"
            eyebrow="git log --career"
            title="Where I've been."
            note="10 years of making things"
            className="lg:sticky lg:top-28"
          />
        </div>

        <ol className="relative border-l-2 border-dashed border-ink/30 lg:col-span-8">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.period} delay={i * 80} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden
                className={`absolute top-1.5 -left-[9px] size-4 rounded-full border-2 border-ink ${i === 0 ? 'bg-marker' : 'bg-paper'}`}
              />
              <p className="font-mono text-xs text-ink-soft">
                <span className="text-marker">●</span> {job.period}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{job.role}</h3>
                {i === 0 && (
                  <StickyNote rotate="rotate-3" className="px-2.5 py-1 text-lg font-bold">
                    current!
                  </StickyNote>
                )}
              </div>
              <p className="mt-1 font-hand text-2xl text-ink-soft">@ {job.company}</p>
              <ul className="mt-4 space-y-2.5">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-ink-soft">
                    <span aria-hidden className="mt-0.5 shrink-0 font-mono text-sm text-marker">
                      →
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
