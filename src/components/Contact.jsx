import { useState } from 'react'
import { experience, heroNotes, profile } from '../data/content'
import { CircleScribble, Cursor, Palette, StickyNote } from './Doodles'
import { ArrowUpRight, CheckIcon, CopyIcon, MailIcon } from './Icons'
import Reveal from './Reveal'

const currentCompany = experience[0]?.company

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="px-4 pt-10 pb-6 sm:px-6 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border-2 border-ink bg-ink px-6 py-16 text-cream sm:px-12 sm:py-20 lg:rounded-[2.5rem] lg:px-16 lg:py-24">
        <div aria-hidden className="absolute inset-0 bg-dots-light" />

        {/* pinned notes on the right */}
        <div aria-hidden className="absolute top-14 right-12 hidden w-60 lg:block xl:right-20">
          <StickyNote tape rotate="rotate-6" className="relative p-5 text-3xl font-bold">
            say hi! I reply within a day
          </StickyNote>
          <StickyNote color="bg-note-blue" rotate="-rotate-3" className="mt-6 ml-10 p-4 text-2xl font-bold">
            currently @ {currentCompany}
          </StickyNote>
          <Palette colors={heroNotes.palette} title="brand.tokens" className="mt-8 rotate-2 text-ink" />
        </div>

        <div className="relative max-w-2xl">
          <p className="mb-5 font-mono text-xs text-cream/60">
            <span className="text-note-yellow">[04]</span> contact --open
          </p>
          <h2 className="text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-6xl lg:text-7xl">
            Have a product that needs a little{' '}
            <span className="relative inline-block font-hand text-[1.25em] font-bold text-note-yellow">
              love?
              <CircleScribble className="absolute -inset-x-4 -inset-y-1 h-[120%] w-[calc(100%+2rem)] text-marker" />
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
            I&apos;m open to full-time roles, freelance projects and design chats about research, design systems
            and usability.
          </p>

          <div className="relative mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-note-yellow bg-note-yellow px-5 py-4 text-sm font-semibold text-ink sm:px-7 sm:text-base transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-marker)]"
            >
              <MailIcon /> {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-cream/40 px-6 py-4 font-mono text-sm transition-colors hover:border-solid hover:border-cream"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              <span aria-live="polite">{copied ? 'copied!' : 'copy email'}</span>
            </button>
            <Cursor label="you?" color="var(--color-marker)" className="absolute -bottom-10 left-40 animate-float max-sm:hidden" />
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-cream/80 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-note-yellow hover:decoration-note-yellow"
                >
                  {s.label} <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
