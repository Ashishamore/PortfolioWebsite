import { Link, Navigate, useParams } from 'react-router-dom'
import { caseStudies, projects } from '../data/content'
import AccessStudy, { AccessVisual } from '../components/casestudy/AccessStudy'
import CaseEnd from '../components/casestudy/CaseEnd'
import MoreWork from '../components/casestudy/MoreWork'
import SiteSaathiStudy, { SiteSaathiVisual } from '../components/casestudy/SiteSaathiStudy'
import WorkiveStudy, { WorkiveVisual } from '../components/casestudy/WorkiveStudy'

// Each case study brings its own hero visual and body; the header, sign-off and "more" links are shared
const layouts = {
  'specialty-pharma': { Visual: AccessVisual, Body: AccessStudy },
  workive: { Visual: WorkiveVisual, Body: WorkiveStudy },
  sitesaathi: { Visual: SiteSaathiVisual, Body: SiteSaathiStudy },
}

export default function CaseStudy() {
  const { slug } = useParams()
  const study = caseStudies[slug]
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const layout = layouts[slug]
  if (!study || !project || !layout) return <Navigate to="/" replace />
  const { Visual, Body } = layout

  return (
    <main>
      <section id="top" className="relative overflow-hidden bg-sand pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
        <div aria-hidden className="absolute inset-0 bg-dots" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-sand/0 to-cream" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* breadcrumb, styled like the frame label on the card */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-ink-soft">
            <Link to="/#work" className="inline-flex items-center gap-2 transition-colors hover:text-marker">
              <span aria-hidden>←</span> all case studies
            </Link>
            <span>
              ▢ frame_{String(index + 1).padStart(2, '0')} / {project.frame}
            </span>
          </div>

          <div className="mt-10 max-w-5xl animate-[fadeUp_0.9s_ease_both] lg:mt-14">
            <p className="font-mono text-xs tracking-wide text-ink-soft uppercase sm:text-sm">{study.eyebrow}</p>
            <h1 className="mt-5 text-[2.5rem] leading-[1.04] font-extrabold tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              {study.title.before} <span className="marker-swipe">{study.title.highlight}</span>
              {/* closing punctuation sits tight against the highlight */}
              {/^[.,!?]/.test(study.title.after) ? (
                <span className="-ml-[0.12em]">{study.title.after}</span>
              ) : (
                ` ${study.title.after}`
              )}
            </h1>
            <p className="mt-7 max-w-4xl text-xl leading-snug text-ink-soft sm:text-2xl lg:text-[1.75rem]">
              {study.deck}
            </p>
          </div>

          <dl className="mt-10 grid gap-5 border-y-2 border-dashed border-ink/20 py-6 sm:grid-cols-[auto_auto_1fr] sm:gap-12 lg:mt-14">
            {study.meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[11px] tracking-wide text-ink-soft uppercase">{item.label}</dt>
                <dd className="mt-1.5 text-base font-semibold sm:text-lg">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 animate-[fadeUp_0.9s_0.2s_ease_both] lg:mt-20">
            <Visual study={study} project={project} />
          </div>
        </div>
      </section>

      <Body study={study} project={project} />

      <CaseEnd line={study.endLine} />

      {/* links to the other case studies */}
      <MoreWork projects={projects} current={slug} />
    </main>
  )
}
