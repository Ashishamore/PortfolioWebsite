import { useEffect, useRef } from 'react'
import heroImage from '../assets/hero.jpg'
import { certification, hero, heroNotes, heroStats, profile } from '../data/content'
import { Cursor, CurvyArrow, Palette, Selection, Sparkle, Squiggle, StickyNote } from './Doodles'
import { ArrowDown, ArrowUpRight, SealIcon } from './Icons'

// Chrome renders a blank page when printing a size container, so before printing the photo's
// pinned annotations are frozen at their on-screen size and the container query is switched off.
function usePrintSafePhotoFrame(frameRef) {
  useEffect(() => {
    const freeze = () => {
      const frame = frameRef.current
      if (!frame) return
      const box = frame.parentElement.getBoundingClientRect()
      const r = frame.getBoundingClientRect()
      Object.assign(frame.style, {
        left: `${r.left - box.left}px`,
        top: `${r.top - box.top}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
      })
      frame.parentElement.style.containerType = 'normal'
    }
    const thaw = () => {
      const frame = frameRef.current
      if (!frame) return
      frame.removeAttribute('style')
      frame.parentElement.style.containerType = ''
    }
    window.addEventListener('beforeprint', freeze)
    window.addEventListener('afterprint', thaw)
    return () => {
      window.removeEventListener('beforeprint', freeze)
      window.removeEventListener('afterprint', thaw)
    }
  }, [frameRef])
}

export default function Hero() {
  const frameRef = useRef(null)
  usePrintSafePhotoFrame(frameRef)
  return (
    <section id="top" className="relative overflow-hidden bg-sand">
      {/* Full-bleed photo below the header: a top band on mobile, the whole hero background on desktop */}
      <div className="absolute inset-x-0 top-[4.5rem] h-[58svh] min-h-80 animate-[fadeIn_1s_ease_both] [container-type:size] sm:h-[56svh] lg:top-20 lg:bottom-0 lg:h-auto">
        <img
          src={heroImage}
          alt={`${profile.name} giving a thumbs up from a desk with a design project on the monitor`}
          className="size-full object-cover object-[78%_30%] lg:object-[75%_30%]"
          width="2000"
          height="1331"
          fetchPriority="high"
        />
        {/* soften the seam under the header */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-10 bg-linear-to-b from-sand to-sand/0 lg:h-20" />
        {/* mobile: fade the bottom of the photo into the page */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-sand/0 via-sand/70 to-sand lg:hidden" />
        {/* desktop: soften the left side so the copy stays readable */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-linear-to-r from-sand from-20% via-sand/80 via-45% to-sand/0 to-70% lg:block xl:from-15% xl:via-38% xl:to-62%"
        />

        {/* "that's me!" is pinned to a spot in the photo itself so it tracks the person at any screen size.
            Mobile: on the floor under the chair. Desktop: written on the black desk, arrow pointing at the person. */}
        <div ref={frameRef} aria-hidden className="pointer-events-none z-20 photo-frame">
          <div className="halo absolute top-[66%] left-[70%] flex animate-[fadeUp_0.8s_0.6s_ease_both] items-start gap-1 text-marker lg:top-[32%] lg:left-[81%] lg:flex-col lg:gap-0 lg:text-note-yellow lg:filter-none">
            <CurvyArrow draw className="mt-1 w-9 shrink-0 sm:w-11 lg:mt-0 lg:w-12 xl:w-14" />
            <span className="-rotate-6 font-hand text-xl leading-none font-bold whitespace-nowrap sm:text-2xl lg:ml-4 lg:text-[1.7rem] xl:text-3xl 2xl:text-[2rem]">
              {heroNotes.pointer}
            </span>
          </div>
        </div>

        <StickyNote
          color="bg-note-pink"
          rotate="rotate-3"
          tape
          className="absolute right-[4%] bottom-[12%] z-10 hidden w-44 animate-[fadeUp_0.8s_0.8s_ease_both] p-4 text-2xl lg:block xl:w-52 xl:text-[1.7rem]"
        >
          {heroNotes.sticky}
        </StickyNote>

        <Palette
          colors={heroNotes.palette}
          className="absolute right-[26%] bottom-[11%] z-10 hidden -rotate-2 animate-[fadeUp_0.8s_1s_ease_both] xl:block"
        />
      </div>

      {/* dotted canvas behind the copy */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,transparent_45%,#000_70%)] lg:[mask-image:linear-gradient(to_right,#000_20%,transparent_55%)]"
      />
      {/* blend the hero into the page below */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-sand/0 to-cream" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 pt-[calc(58svh+1.5rem)] pb-20 sm:px-6 sm:pt-[calc(56svh+1.5rem)] lg:min-h-svh lg:justify-center lg:px-8 lg:pt-32 lg:pb-24">
        <div className="max-w-xl animate-[fadeUp_0.9s_0.15s_ease_both] lg:max-w-[30rem] xl:max-w-[38rem]">
          <h1 className="text-[2.75rem] leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-6xl lg:text-[3.6rem] xl:text-[4.6rem]">
            {hero.headline.start}{' '}
            <Selection className="whitespace-nowrap">
              {hero.headline.selected}
              <Cursor
                label={profile.firstName}
                className="absolute top-1/2 left-full ml-4 animate-float max-sm:hidden"
              />
            </Selection>{' '}
            {hero.headline.middle}{' '}
            <span className="relative inline-block font-hand text-[1.2em] leading-none font-bold text-marker">
              {hero.headline.scribbled}
              <Squiggle draw className="absolute -bottom-1 left-0 h-3 w-full text-marker sm:h-4" />
            </span>{' '}
            {hero.headline.end}
          </h1>

          <p className="mt-5 flex items-center gap-2 font-hand text-2xl text-marker sm:text-[1.7rem]">
            <Sparkle className="size-5 shrink-0" />
            {heroNotes.aside}
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Hi, I&apos;m {profile.firstName}, {hero.intro}
          </p>

          {/* certification badge */}
          <p className="mt-6 inline-flex max-w-full items-center gap-3 rounded-2xl border-2 border-ink bg-paper py-2 pr-4 pl-2 shadow-[3px_3px_0_var(--color-ink)]">
            <SealIcon className="size-8 shrink-0 text-figma" />
            <span className="leading-tight">
              <span className="block text-sm font-bold sm:text-base">{certification.title}</span>
              <span className="block font-mono text-[10px] tracking-wide text-ink-soft uppercase sm:text-[11px]">
                <span className="max-sm:hidden">Human Factors International · </span>
                <span className="whitespace-nowrap">{certification.detail}</span>
              </span>
            </span>
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-ink px-7 py-3.5 font-semibold text-cream transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-marker)]"
            >
              View my work <ArrowDown />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-dashed border-ink/60 bg-paper/50 px-7 py-3.5 font-semibold transition-all hover:-translate-y-0.5 hover:border-solid hover:border-ink"
            >
              Get in touch <ArrowUpRight />
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t-2 border-dashed border-ink/20 pt-6">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-extrabold tracking-tight sm:text-4xl">{stat.value}</dd>
                <dd className="mt-1 font-mono text-[10px] leading-snug text-ink-soft uppercase sm:text-[11px]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
