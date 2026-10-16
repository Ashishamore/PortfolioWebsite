import { CurvyArrow } from './Doodles'
import Reveal from './Reveal'

// Section title styled like a labelled frame on a research board
export default function SectionHeading({ index, eyebrow, title, intro, note, dark = false, className = '' }) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className={`mb-4 font-mono text-xs tracking-wide ${dark ? 'text-note-yellow' : 'text-ink-soft'}`}>
        <span className={dark ? 'text-cream/50' : 'text-marker'}>[{index}]</span> {eyebrow}
      </p>
      <h2 className="text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl lg:text-6xl">{title}</h2>
      {note && (
        <p className="mt-3 flex items-center gap-1 font-hand text-2xl text-marker">
          <CurvyArrow className="w-10 -scale-y-100 rotate-12" />
          {note}
        </p>
      )}
      {intro && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-cream/70' : 'text-ink-soft'}`}>{intro}</p>
      )}
    </Reveal>
  )
}
