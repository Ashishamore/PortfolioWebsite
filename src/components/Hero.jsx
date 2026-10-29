import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.jpg'
import { certification, hero, heroNotes, profile } from '../data/content'
import CertificateDialog, { preloadCertificate } from './CertificateDialog'
import { Cursor, CurvyArrow, Selection, Sparkle, Squiggle } from './Doodles'
import { ArrowDown, ArrowUpRight, ExpandIcon, SealIcon } from './Icons'

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
  const badgeRef = useRef(null)
  const [certOpen, setCertOpen] = useState(false)
  return (
    // --band: height of the mobile photo band, sized to the width so the whole desk fits on a phone
    <section id="top" className="relative overflow-hidden bg-sand [--band:min(120vw,60svh)]">
      {/* Full-bleed photo below the header: a top band on mobile, the whole hero background on desktop */}
      <div className="absolute inset-x-0 top-[4.5rem] h-(--band) animate-[fadeIn_1s_ease_both] [container-type:size] lg:top-20 lg:bottom-0 lg:h-auto">
        <img
          src={heroImage}
          alt={`${profile.name} giving a thumbs up from a desk with a design project on the monitor`}
          className="size-full object-cover object-[92%_30%] lg:object-[75%_30%]"
          width="2000"
          height="1331"
          fetchPriority="high"
        />
        {/* soften the seam under the header */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-10 bg-linear-to-b from-sand to-sand/0 lg:h-20" />
        {/* mobile: fade the bottom of the photo into the page */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-sand/0 via-sand/70 to-sand lg:hidden" />
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
      </div>

      {/* dotted canvas behind the copy */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,transparent_45%,#000_70%)] lg:[mask-image:linear-gradient(to_right,#000_20%,transparent_55%)]"
      />
      {/* blend the hero into the page below */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-sand/0 to-cream" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 pt-[calc(4.5rem+var(--band)*0.8)] pb-20 sm:px-6 lg:min-h-svh lg:justify-center lg:px-8 lg:pt-28 lg:pb-20 short:pt-24">
        <div className="max-w-xl animate-[fadeUp_0.9s_0.15s_ease_both] lg:max-w-[30rem] xl:max-w-[38rem]">
          <h1 className="text-[2.75rem] leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-6xl lg:text-[3.6rem] xl:text-[4.6rem] short:max-w-[28rem] short:text-[3.4rem]">
            {hero.headline.start}{' '}
            <Selection className="whitespace-nowrap">
              {hero.headline.selected}
              <Cursor
                label={profile.firstName}
                className="absolute top-1/2 left-full ml-4 animate-float max-lg:hidden"
              />
            </Selection>{' '}
            {hero.headline.middle}{' '}
            <span className="relative inline-block font-hand text-[1.2em] leading-none font-bold text-marker">
              {hero.headline.scribbled}
              <Squiggle draw className="absolute -bottom-1 left-0 h-3 w-full text-marker sm:h-4" />
            </span>{' '}
            {hero.headline.end}
          </h1>

          <p className="mt-5 flex items-center gap-2 font-hand text-2xl text-marker sm:text-[1.7rem] short:mt-3">
            <Sparkle className="size-5 shrink-0" />
            {heroNotes.aside}
          </p>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg short:mt-3 short:text-base">
            Hi, I&apos;m {profile.firstName}, {hero.intro}
          </p>

          {/* AI-enabled UX: what it means here, with plain links to the proof */}
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 short:mt-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-cream">
              <Sparkle className="size-3.5 text-note-yellow" />
              {hero.ai.label}
            </span>
            {hero.ai.proofs.map((proof) => (
              <Link
                key={proof.to}
                to={proof.to}
                className="inline-flex items-center gap-1 text-sm text-ink-soft underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                {proof.label} <ArrowUpRight className="size-3.5" />
              </Link>
            ))}
          </div>

          {/* certification badge: opens the certificate itself */}
          <button
            ref={badgeRef}
            type="button"
            aria-haspopup="dialog"
            onClick={() => setCertOpen(true)}
            onPointerEnter={preloadCertificate}
            onFocus={preloadCertificate}
            className="group mt-4 inline-flex max-w-full cursor-pointer short:mt-3 items-center gap-3 rounded-2xl border-2 border-ink bg-paper py-2 pr-2 pl-2 text-left shadow-[3px_3px_0_var(--color-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-marker)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-figma active:translate-y-0 active:shadow-[2px_2px_0_var(--color-ink)]"
          >
            <SealIcon className="size-8 shrink-0 text-figma" />
            <span className="leading-tight">
              <span className="sr-only">View certificate: </span>
              <span className="block text-sm font-bold sm:text-base">{certification.title}</span>
              <span className="block font-mono text-[10px] tracking-wide text-ink-soft uppercase sm:text-[11px]">
                <span className="max-sm:hidden">Human Factors International · </span>
                <span className="whitespace-nowrap">{certification.detail}</span>
              </span>
            </span>
            {/* always visible, so it reads as clickable on touch screens too */}
            <span className="ml-1 grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-ink group-hover:text-cream">
              <ExpandIcon className="size-3.5" />
            </span>
          </button>
          <CertificateDialog
            open={certOpen}
            onClose={() => {
              setCertOpen(false)
              badgeRef.current?.focus()
            }}
          />

          <div className="mt-9 flex flex-col gap-3 sm:flex-row short:mt-6">
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
        </div>
      </div>
    </section>
  )
}
