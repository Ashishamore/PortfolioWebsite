import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, profile } from '../data/content'
import { ArrowUpRight, CloseIcon, MenuIcon } from './Icons'

// In-page section links: a plain #anchor on the home page, a route back to it from other pages
function SectionLink({ hash, ...props }) {
  const { pathname } = useLocation()
  return pathname === '/' ? <a href={hash} {...props} /> : <Link to={`/${hash}`} {...props} />
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll and allow Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Close the mobile menu if the viewport grows past the breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // At the top the header matches the hero photo's yellow; once scrolled it turns into an ink bar,
  // like the skills strip and contact board further down the page.
  const dark = scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        dark ? 'bg-ink text-cream shadow-[0_6px_0_var(--color-note-yellow)]' : 'bg-sand text-ink'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <SectionLink hash="#top" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            className={`grid size-9 -rotate-6 place-items-center rounded-md font-hand text-2xl leading-none font-bold shadow-[2px_2px_0_var(--color-marker)] transition-[transform,background-color,color] duration-300 group-hover:rotate-3 ${
              dark ? 'bg-note-yellow text-ink' : 'bg-ink text-note-yellow'
            }`}
          >
            {profile.initials}
          </span>
          <span className="leading-tight">
            <span className="block text-[1.05rem] font-bold tracking-tight">{profile.name}</span>
            <span className={`block font-mono text-[10px] tracking-wide ${dark ? 'text-cream/60' : 'text-ink-soft'}`}>
              {profile.tagline.toLowerCase()}
            </span>
          </span>
        </SectionLink>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <SectionLink
                hash={link.href}
                className={`group rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  dark ? 'text-cream/75 hover:text-note-yellow' : 'text-ink-soft hover:text-ink'
                }`}
              >
                <span className="font-mono text-[11px] text-marker opacity-0 transition-opacity group-hover:opacity-100">#</span>
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <SectionLink
          hash="#contact"
          className={`hidden items-center gap-1.5 rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-marker)] md:inline-flex ${
            dark ? 'border-note-yellow bg-note-yellow text-ink' : 'border-ink bg-ink text-cream'
          }`}
        >
          Let&apos;s talk <ArrowUpRight />
        </SectionLink>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-full md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <ul className="flex h-[calc(100dvh-4rem)] flex-col px-4 pt-4 pb-8 sm:px-6">
            {navLinks.map((link, i) => (
              <li key={link.href} className={`border-b ${dark ? 'border-cream/15' : 'border-ink/15'}`}>
                <SectionLink
                  hash={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between py-5 text-4xl font-bold tracking-tight"
                >
                  {link.label}
                  <span className={`font-mono text-xs ${dark ? 'text-note-yellow' : 'text-marker'}`}>0{i + 1}</span>
                </SectionLink>
              </li>
            ))}
            <li className="mt-auto">
              <SectionLink
                hash="#contact"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`flex items-center justify-center gap-2 rounded-full px-6 py-4 font-medium ${
                  dark ? 'bg-note-yellow text-ink' : 'bg-ink text-cream'
                }`}
              >
                Let&apos;s work together <ArrowUpRight />
              </SectionLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
