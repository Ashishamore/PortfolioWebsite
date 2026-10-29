import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, profile, whatsappUrl } from '../data/content'
import { ArrowUpRight, CheckIcon, CloseIcon, CopyIcon, FileIcon, MailIcon, MenuIcon, WhatsAppIcon } from './Icons'

// In-page section links: a plain #anchor on the home page, a route back to it from other pages
function SectionLink({ hash, ...props }) {
  const { pathname } = useLocation()
  return pathname === '/' ? <a href={hash} {...props} /> : <Link to={`/${hash}`} {...props} />
}

// "Let's talk": a small menu with the two quickest ways to reach me, WhatsApp and email
function TalkMenu({ dark }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const wrap = useRef(null)
  const button = useRef(null)

  // close on a click outside, or on Escape (back to the button)
  useEffect(() => {
    if (!open) return
    const onDown = (e) => !wrap.current.contains(e.target) && setOpen(false)
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      button.current.focus()
    }
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const row = 'flex min-w-0 flex-1 items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors'

  return (
    <div ref={wrap} className="relative hidden md:block">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="talk-menu"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border-2 px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-marker)] ${
          dark ? 'border-note-yellow bg-note-yellow text-ink' : 'border-ink bg-ink text-cream'
        }`}
      >
        Let&apos;s talk <ArrowUpRight className={`size-4 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
      </button>

      {open && (
        <div
          id="talk-menu"
          className="absolute top-full right-0 mt-3 w-80 animate-[fadeIn_0.15s_ease_both] rounded-2xl border-2 border-ink bg-paper p-2 text-ink shadow-[4px_4px_0_var(--color-ink)]"
        >
          <p className="px-2.5 pt-1.5 pb-1 font-mono text-[11px] text-ink-soft">quick connect</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className={`${row} hover:bg-note-green/70`}>
            <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-[#25d366] text-white">
              <WhatsAppIcon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">Chat on WhatsApp</span>
              <span className="block font-mono text-[11px] text-ink-soft">{profile.whatsapp.display}</span>
            </span>
          </a>
          <div className="flex items-center gap-1">
            <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)} className={`${row} hover:bg-note-yellow/70`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-note-yellow">
                <MailIcon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">Send an email</span>
                <span className="block truncate font-mono text-[11px] text-ink-soft">{profile.email}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink hover:text-cream"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
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
      {/* From tablet width up, three columns: name | links, centred on the page | résumé + let's talk */}
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:h-20 lg:px-8">
        <SectionLink hash="#top" className="group flex items-center gap-2.5 md:justify-self-start" onClick={() => setOpen(false)}>
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
                className={`group rounded-full px-3 py-2 text-sm font-medium transition-colors lg:px-4 ${
                  dark ? 'text-cream/75 hover:text-note-yellow' : 'text-ink-soft hover:text-ink'
                }`}
              >
                <span className="font-mono text-[11px] text-marker opacity-0 transition-opacity group-hover:opacity-100">#</span>
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:col-start-3 md:justify-self-end">
          {/* résumé: an icon on tablets, where the header is tight, and a labelled button from laptop width up */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            title="Résumé"
            aria-label="Résumé (opens in a new tab)"
            className={`hidden items-center justify-center gap-1.5 rounded-full border-2 border-dashed text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-solid md:inline-flex md:size-10 lg:size-auto lg:px-4 lg:py-2 ${
              dark ? 'border-cream/50 text-cream hover:border-cream' : 'border-ink/50 text-ink hover:border-ink'
            }`}
          >
            <FileIcon className="size-4 lg:hidden" />
            <span className="hidden lg:inline">Résumé</span>
            <ArrowUpRight className="hidden size-4 lg:block" />
          </a>

          <TalkMenu dark={dark} />

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
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          {/* scrolls if the screen is too short for the whole menu, e.g. a phone turned sideways */}
          <ul className="flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto px-4 pt-4 pb-8 sm:px-6">
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
            <li className={`border-b ${dark ? 'border-cream/15' : 'border-ink/15'}`}>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="flex items-center justify-between py-5 text-4xl font-bold tracking-tight"
              >
                Résumé
                <ArrowUpRight className={`size-5 ${dark ? 'text-note-yellow' : 'text-marker'}`} />
              </a>
            </li>
            {/* let's talk: the same two quick ways to reach me as the desktop menu */}
            <li className="mt-auto">
              <p className={`mb-3 font-mono text-xs ${dark ? 'text-cream/60' : 'text-ink-soft'}`}>let&apos;s talk</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-[#25d366] px-4 py-4 font-medium text-ink"
                >
                  <WhatsAppIcon className="size-5" /> WhatsApp
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-center justify-center gap-2 rounded-full px-4 py-4 font-medium ${
                    dark ? 'bg-note-yellow text-ink' : 'bg-ink text-cream'
                  }`}
                >
                  <MailIcon /> Email
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
