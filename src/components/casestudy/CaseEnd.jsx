import { Link } from 'react-router-dom'
import { ArrowUpRight } from '../Icons'
import Reveal from '../Reveal'

// Sign-off at the bottom of every case study
export default function CaseEnd({ line = 'Want the longer version, or to talk about a system like this?' }) {
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-hand text-3xl font-bold text-marker">thanks for reading!</p>
            <p className="mt-1 text-ink-soft">{line}</p>
          </div>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink px-6 py-3 font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-marker)]"
          >
            Let&apos;s talk <ArrowUpRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
