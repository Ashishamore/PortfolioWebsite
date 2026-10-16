import Reveal from '../Reveal'

// Wraps the first occurrence of `highlight` in a highlighter swipe
function Highlighted({ text, highlight }) {
  const at = highlight ? text.indexOf(highlight) : -1
  if (at < 0) return text
  return (
    <>
      {text.slice(0, at)}
      <span className="marker-swipe text-ink">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  )
}

export default function Learned({ learned, index = '04' }) {
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-wide text-ink-soft">
            <span className="text-marker">[{index}]</span> what_i_learned
          </p>
          <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">What I learned</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          {learned.lessons.map((lesson, k) => (
            <Reveal key={lesson.title} delay={k * 120} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border-2 border-ink bg-paper p-6 shadow-hard sm:p-8">
                <p className="font-hand text-5xl leading-none font-bold text-marker">{String(k + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{lesson.title}</h3>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-soft">
                  {lesson.text.map((para) => (
                    <p key={para}>
                      <Highlighted text={para} highlight={lesson.highlight} />
                    </p>
                  ))}
                </div>

                {lesson.contrast && (
                  <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
                    <p className="rounded-xl border-2 border-dashed border-ink/30 p-4">
                      <span className="block font-mono text-[10px] text-ink-soft">{lesson.contrast.left.label}</span>
                      <span className="mt-1 block font-mono text-sm text-ink-soft">{lesson.contrast.left.text}</span>
                    </p>
                    <p className="sticky-note rotate-1 bg-note-yellow p-4">
                      <span className="block font-mono text-[10px] font-medium text-ink/60">{lesson.contrast.right.label}</span>
                      <span className="mt-1 block text-2xl font-bold">{lesson.contrast.right.text}</span>
                    </p>
                  </div>
                )}

                {lesson.tag && (
                  <p className="mt-auto pt-8 font-hand text-2xl font-bold text-marker">{lesson.tag}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
