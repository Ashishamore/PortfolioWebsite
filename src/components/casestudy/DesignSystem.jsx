import { useState } from 'react'
import { CurvyArrow } from '../Doodles'
import Reveal from '../Reveal'
import SectionLabel from './SectionLabel'

// The Workive! design system. Specimens are drawn in the app's own dark style (slate + indigo)
// so they look exactly like the components in the prototype.

const parts = [
  ['ds-principles', 'Principles'],
  ['ds-colour', 'Colour'],
  ['ds-type', 'Typography'],
  ['ds-space', 'Spacing + layout'],
  ['ds-shape', 'Radius, icons + motion'],
  ['ds-components', 'Components'],
  ['ds-feedback', 'Error handling'],
]

function Part({ id, n, title, note, children }) {
  return (
    <Reveal className="scroll-mt-28 border-t-2 border-dashed border-ink/15 pt-10" as="div">
      <div id={id} className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          <span className="mr-2 font-mono text-sm text-marker">{n}</span>
          {title}
        </h3>
        {note && <p className="font-hand text-xl font-bold text-marker">{note}</p>}
      </div>
      {children}
    </Reveal>
  )
}

// a dark "artboard" in the app's own colours
function Board({ label, className = '', children }) {
  return (
    <div className={`overflow-hidden rounded-2xl border-2 border-ink bg-slate-950 text-slate-300 ${className}`}>
      {label && <p className="border-b border-white/10 px-4 py-2 font-mono text-[10px] text-slate-500">{label}</p>}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  )
}

/* ---------- colour ---------- */

function Swatch({ s }) {
  const translucent = s.hex.startsWith('rgba')
  return (
    <li className="overflow-hidden rounded-xl border border-ink/15 bg-paper">
      <div className="relative h-16" style={{ background: translucent ? '#020617' : s.hex }}>
        {translucent && <div className="absolute inset-0" style={{ background: s.hex }} />}
      </div>
      <div className="p-3">
        <p className="text-sm font-bold">{s.name}</p>
        <p className="mt-0.5 font-mono text-[10px] text-ink-soft">
          {s.token} · {s.hex}
        </p>
        <p className="mt-1.5 text-xs leading-snug text-ink-soft">{s.use}</p>
      </div>
    </li>
  )
}

function ColourGroup({ group, cols = 'sm:grid-cols-3' }) {
  return (
    <div>
      <p className="font-bold">{group.label}</p>
      <p className="mt-0.5 text-sm text-ink-soft">{group.note}</p>
      <ul className={`mt-4 grid grid-cols-2 gap-3 ${cols}`}>
        {group.swatches.map((s) => (
          <Swatch key={s.name} s={s} />
        ))}
      </ul>
    </div>
  )
}

/* ---------- components (specimens) ---------- */

const btn = 'rounded-xl py-2.5 px-4 text-sm font-semibold text-white transition'

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`flex h-5 w-9 items-center rounded-full p-0.5 transition focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none ${on ? 'bg-indigo-500' : 'bg-white/15'}`}
    >
      <span className={`size-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : ''}`} />
    </button>
  )
}

function Spec({ name, children, note }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-3 font-mono text-[10px] text-slate-500">{name}</p>
      {children}
      {note && <p className="mt-3 text-[11px] leading-snug text-slate-500">{note}</p>}
    </div>
  )
}

function Components() {
  const [chip, setChip] = useState('All')
  const [t1, setT1] = useState(true)
  const [t2, setT2] = useState(false)
  const [field, setField] = useState('')
  const [tried, setTried] = useState(false)
  const fieldError = tried && !field.trim() ? 'Assignment name and location are required.' : ''

  return (
    <Board label="component_library / live specimens · tap them">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Spec name="Button" note="One primary per screen. Destructive actions are rose and always confirm first.">
          <div className="grid gap-2">
            <button type="button" className={`${btn} bg-indigo-500 hover:bg-indigo-400`}>
              Publish and invite 2 people
            </button>
            <button type="button" className={`${btn} border border-white/15 bg-white/5 hover:bg-white/10`}>
              Cancel
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={`${btn} bg-rose-500 hover:bg-rose-400`}>
                Delete
              </button>
              <button type="button" className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
                Answer
              </button>
            </div>
          </div>
        </Spec>

        <Spec name="Text field" note="Focus turns the border indigo. Errors appear under the form in rose, with what to do.">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              setTried(true)
            }}
          >
            <label className="mb-1.5 block text-[10px] font-semibold tracking-wide text-slate-500 uppercase" htmlFor="ds-field">
              Assignment name
            </label>
            <input
              id="ds-field"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. Kapoor Wedding, Udaipur"
              className={`w-full rounded-xl border bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none ${
                fieldError ? 'border-rose-400/60' : 'border-white/10 focus:border-indigo-500/50'
              }`}
            />
            <p role="alert" className="mt-2 min-h-4 text-xs text-rose-400">
              {fieldError}
            </p>
            <button type="submit" className={`${btn} mt-1 w-full bg-indigo-500 hover:bg-indigo-400`}>
              Publish
            </button>
          </form>
        </Spec>

        <Spec name="Chip · filter">
          <div className="flex flex-wrap gap-2">
            {['All', 'Unread', 'Events', 'People'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChip(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  chip === c ? 'bg-indigo-500 text-white' : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-4 mb-2 font-mono text-[10px] text-slate-500">Toggle</p>
          <div className="space-y-3">
            {[
              ['Night-before reminders', t1, setT1],
              ['Show my day rate', t2, setT2],
            ].map(([label, on, set]) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-white">{label}</span>
                <Toggle on={on} onChange={set} label={label} />
              </div>
            ))}
          </div>
        </Spec>

        <Spec name="Day status pill" note="Every status carries a word, so colour is never the only signal.">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">Available</span>
            <span className="rounded-lg border border-indigo-400/30 bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300">Occupied</span>
            <span className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-400">Unavailable</span>
            <span className="flex items-center gap-1 rounded-lg border border-indigo-400/30 bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300">
              <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" />
              </svg>
              Occupied · locked
            </span>
          </div>
          <p className="mt-4 mb-2 font-mono text-[10px] text-slate-500">Invite badge</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-400/30 bg-amber-500/15 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-amber-300 uppercase">Response awaited</span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-emerald-300 uppercase">Accepted</span>
            <span className="rounded-full border border-rose-400/30 bg-rose-500/15 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-rose-300 uppercase">Declined</span>
          </div>
        </Spec>

        <Spec name="Level badge + rating">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-400/25 bg-slate-500/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-300 uppercase">Emerging</span>
            <span className="rounded-full border border-sky-400/25 bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-sky-300 uppercase">Intermediate</span>
            <span className="rounded-full border border-violet-400/25 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-violet-300 uppercase">Advanced</span>
            <span className="rounded-full border border-amber-400/25 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber-300 uppercase">Expert</span>
          </div>
          <p className="mt-4 flex items-center gap-1 text-sm">
            <svg viewBox="0 0 24 24" className="size-3.5 fill-amber-400" aria-hidden>
              <path d="m12 2.5 2.9 5.9 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.4l1.2-6.5L2.5 9.3l6.6-.9z" />
            </svg>
            <span className="font-medium text-white">4.8</span>
          </p>
        </Spec>

        <Spec name="Avatar · xs / sm / md / lg" note="Initials on a gradient until a photo is added.">
          <div className="flex items-end gap-3">
            {[
              ['size-6 text-[9px]', 'from-indigo-500 to-violet-500'],
              ['size-8 text-[11px]', 'from-orange-500 to-rose-500'],
              ['size-12 text-sm', 'from-emerald-500 to-teal-600'],
              ['size-20 text-xl', 'from-sky-500 to-indigo-500'],
            ].map(([dims, g]) => (
              <span key={dims} className={`grid shrink-0 place-items-center rounded-full bg-linear-to-br font-semibold text-white ${dims} ${g}`}>
                AM
              </span>
            ))}
          </div>
        </Spec>

        <Spec name="Card · assignment row">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-indigo-300">Kapoor Wedding, Udaipur</p>
                <p className="mt-0.5 text-[11px] text-slate-500">30 Oct · 3 days · Team of 3</p>
              </div>
              <span className="rounded-full border border-indigo-400/30 bg-indigo-500/15 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-indigo-300 uppercase">
                Upcoming
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ['Budget', '₹2,00,000', 'text-white'],
                ['Expenses', '₹30,000', 'text-white'],
                ['Expected', '₹1,70,000', 'text-emerald-300'],
              ].map(([l, v, c]) => (
                <div key={l} className="rounded-lg bg-white/5 p-2">
                  <p className="text-[9px] tracking-wide text-slate-500 uppercase">{l}</p>
                  <p className={`mt-0.5 text-[11px] font-semibold ${c}`}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Spec>

        <Spec name="Alert · late payment">
          <div className="flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2.5 text-xs font-medium text-rose-200">
            <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 3 2 20h20L12 3zM12 10v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            2 assignments have late payments
            <span className="ml-auto text-slate-400">›</span>
          </div>
        </Spec>

        <Spec name="Bottom navigation" note="4 tabs, label always visible, unread count read out to screen readers.">
          <div className="flex rounded-xl border border-white/10 bg-slate-950">
            {[
              ['Home', 'M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9', true],
              ['Chat', 'M4 5h16v11H9l-5 4z', false],
              ['Schedule', 'M4 6h16v14H4zM4 10h16M8 3v5M16 3v5', false],
              ['Profile', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4 4.5-6 8-6s7 2 8 6', false],
            ].map(([label, d, active]) => (
              <span key={label} className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium ${active ? 'text-indigo-400' : 'text-slate-500'}`}>
                <span className="relative">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={d} />
                  </svg>
                  {label === 'Chat' && (
                    <span className="absolute -top-1 -right-2 grid h-4 min-w-4 place-items-center rounded-full border-2 border-slate-950 bg-rose-500 px-1 text-[9px] leading-none font-bold text-white">
                      9
                    </span>
                  )}
                </span>
                {label}
              </span>
            ))}
          </div>
        </Spec>
      </div>

      {/* bottom sheet, full width */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Spec name="Bottom sheet · confirm" note="Sheets rise from the bottom over a dimmed, blurred scrim. Tapping the scrim cancels.">
            <div className="relative overflow-hidden rounded-xl bg-black/60 px-4 pt-10">
              <div className="rounded-t-3xl border-t border-white/10 bg-slate-900 px-5 pt-4 pb-5">
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
                <p className="text-sm font-semibold text-white">Delete this assignment?</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  &ldquo;Kapoor Wedding, Udaipur&rdquo; and its group chat will be removed for everyone on it. This cannot be undone.
                </p>
                <div className="mt-4 flex gap-3">
                  <button type="button" className={`${btn} flex-1 border border-white/15 bg-white/5 hover:bg-white/10`}>
                    Cancel
                  </button>
                  <button type="button" className={`${btn} flex-1 bg-rose-500 hover:bg-rose-400`}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Spec>
        </div>
        <Spec name="Empty state">
          <div className="grid min-h-32 place-items-center rounded-xl border border-dashed border-white/15 px-4 py-6 text-center">
            <div>
              <p className="text-sm text-slate-400">No chats match that search.</p>
            </div>
          </div>
        </Spec>
      </div>
    </Board>
  )
}

/* ---------- section ---------- */

export default function DesignSystem({ ds, index = '09' }) {
  const { colors, type, spacing, radius, motion, icons, feedback } = ds
  return (
    <section id="design-system" className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index}>design_system</SectionLabel>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">Design system</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 lg:pt-8">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{ds.lead}</p>
          </Reveal>
        </div>

        {/* contents */}
        <Reveal className="mt-10">
          <nav aria-label="Design system contents" className="flex flex-wrap gap-2">
            {parts.map(([id, label], k) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="rounded-full border-2 border-dashed border-ink/30 px-3 py-1.5 font-mono text-xs transition-colors hover:border-solid hover:border-ink"
              >
                <span className="text-marker">{String(k + 1).padStart(2, '0')}</span> {label}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="mt-12 space-y-16">
          {/* principles */}
          <Part id="ds-principles" n="01" title="Principles">
            <ul className="grid gap-4 sm:grid-cols-3">
              {ds.principles.map((p, k) => (
                <li key={p.title} className={`sticky-note p-5 ${['bg-note-yellow -rotate-1', 'bg-note-blue rotate-1', 'bg-note-green -rotate-1'][k]}`}>
                  <span className="block text-2xl leading-tight font-bold">{p.title}</span>
                  <span className="mt-2 block font-sans text-sm leading-relaxed text-ink-soft">{p.text}</span>
                </li>
              ))}
            </ul>
          </Part>

          {/* colour */}
          <Part id="ds-colour" n="02" title="Colour" note="dark base, one action colour">
            <div className="space-y-10">
              <div className="grid gap-10 lg:grid-cols-2">
                <ColourGroup group={colors.primary} />
                <ColourGroup group={colors.secondary} cols="sm:grid-cols-2" />
              </div>
              <ColourGroup group={colors.neutrals} cols="sm:grid-cols-4 lg:grid-cols-7" />
              <ColourGroup group={colors.semantic} cols="sm:grid-cols-4" />
              <ColourGroup group={colors.surfaces} cols="sm:grid-cols-4" />

              {/* contrast check, on the real background */}
              <Board label="contrast / text on slate-950">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {[
                    ['text-white', 'Text primary', '20.2 : 1', 'AAA'],
                    ['text-slate-300', 'Text body', '13.6 : 1', 'AAA'],
                    ['text-slate-400', 'Text secondary', '7.9 : 1', 'AAA'],
                    ['text-rose-400', 'Error text', '7.5 : 1', 'AAA'],
                    ['text-indigo-400', 'Links + active', '6.8 : 1', 'AA'],
                    ['text-slate-500', 'Hints only', '4.2 : 1', 'AA large'],
                  ].map(([c, l, ratio, r]) => (
                    <div key={l} className="rounded-lg bg-white/5 p-3">
                      <p className={`text-sm font-semibold ${c}`}>{l}</p>
                      <p className="mt-1 font-mono text-[10px] text-slate-400">
                        {ratio} · {r}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-slate-400">
                  slate-500 sits just under 4.5 : 1, so it is kept for non-essential hints and timestamps, never for
                  information you need.
                </p>
              </Board>
            </div>
          </Part>

          {/* type */}
          <Part id="ds-type" n="03" title="Typography" note="the phone's own font">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="rounded-2xl border-2 border-ink bg-paper p-5">
                  <p className="font-mono text-[10px] text-ink-soft">typeface</p>
                  <p className="mt-2 font-[system-ui] text-6xl font-semibold tracking-tight">Aa</p>
                  <p className="mt-3 text-lg font-bold">{type.family}</p>
                  <p className="mt-1 font-mono text-[10px] leading-relaxed text-ink-soft">{type.stack}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{type.why}</p>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {type.weights.map((w) => (
                    <li key={w.name} className="rounded-lg border border-ink/15 bg-paper/70 p-3">
                      <p className="font-[system-ui] text-lg" style={{ fontWeight: w.value }}>
                        {w.name} {w.value}
                      </p>
                      <p className="mt-0.5 text-xs leading-snug text-ink-soft">{w.use}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-8">
                <Board label="type_scale / px · weight · line-height">
                  <ul className="divide-y divide-white/10">
                    {type.scale.map((t) => (
                      <li key={t.name} className="grid items-baseline gap-2 py-3 sm:grid-cols-[8rem_1fr]">
                        <p className="font-mono text-[10px] text-slate-500">
                          <span className="text-slate-300">{t.name}</span> · {t.size}/{t.weight}/{t.line}
                        </p>
                        <div>
                          <p
                            className={`font-[system-ui] text-white ${t.name === 'Badge' ? 'tracking-wide uppercase' : ''}`}
                            style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: t.line }}
                          >
                            {t.sample}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500">{t.use}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Board>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {type.rules.map((r) => (
                    <li key={r} className="rounded-md border border-dashed border-ink/40 px-2.5 py-1 text-sm text-ink-soft">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Part>

          {/* spacing */}
          <Part id="ds-space" n="04" title="Spacing + layout" note={`a ${spacing.base} px grid`}>
            <div className="grid gap-8 lg:grid-cols-12">
              <ul className="space-y-2.5 lg:col-span-7">
                {spacing.scale.map((s) => (
                  <li key={s.token} className="grid grid-cols-[3.5rem_7.5rem_1fr] items-center gap-3 sm:grid-cols-[4rem_10rem_1fr]">
                    <span className="font-mono text-xs">{s.px} px</span>
                    <span className="flex items-center">
                      <span className="h-4 rounded-sm bg-indigo-500" style={{ width: s.px * 4 }} />
                    </span>
                    <span className="text-sm text-ink-soft">
                      <span className="mr-1.5 font-mono text-[10px]">{s.token}</span>
                      {s.use}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="lg:col-span-5">
                <ul className="grid grid-cols-2 gap-3">
                  {spacing.layout.map((l) => (
                    <li key={l.label} className="rounded-xl border-2 border-ink bg-paper p-4">
                      <p className="font-mono text-[10px] text-ink-soft">{l.label}</p>
                      <p className="mt-1 text-xl font-extrabold">{l.value}</p>
                    </li>
                  ))}
                </ul>
                {/* anatomy of the screen padding */}
                <div className="mt-4 rounded-2xl border-2 border-ink bg-slate-950 p-3">
                  <div className="relative rounded-xl border border-dashed border-indigo-400/60 p-5">
                    <span className="absolute top-1 left-1 font-mono text-[9px] text-indigo-300">20</span>
                    <div className="space-y-2 rounded-lg bg-white/5 p-3">
                      <span className="block h-2 w-1/3 rounded-full bg-white/70" />
                      <span className="block h-1.5 w-3/4 rounded-full bg-white/20" />
                      <span className="block h-1.5 w-1/2 rounded-full bg-white/20" />
                    </div>
                  </div>
                  <p className="mt-2 text-center font-mono text-[10px] text-slate-500">screen edge padding: 20 px</p>
                </div>
              </div>
            </div>
          </Part>

          {/* shape, icons, motion */}
          <Part id="ds-shape" n="05" title="Radius, icons + motion">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <p className="mb-4 font-bold">Corner radius</p>
                <ul className="grid grid-cols-3 gap-3">
                  {radius.map((r) => (
                    <li key={r.name} className="text-center">
                      <span
                        className="mx-auto block size-14 border-2 border-indigo-500 bg-indigo-500/15"
                        style={r.name === 'Sheet' ? { borderRadius: `${r.px}px ${r.px}px 0 0` } : { borderRadius: Math.min(r.px, 28) }}
                      />
                      <p className="mt-2 text-xs font-bold">{r.name}</p>
                      <p className="font-mono text-[10px] text-ink-soft">{r.px === 999 ? 'full' : `${r.px} px`}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-ink-soft">{r.use}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-4 font-bold">Iconography</p>
                <Board>
                  <div className="flex justify-around text-slate-300">
                    {[
                      'M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9',
                      'M4 5h16v11H9l-5 4z',
                      'M4 6h16v14H4zM4 10h16M8 3v5M16 3v5',
                      'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4 4.5-6 8-6s7 2 8 6',
                      'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z',
                    ].map((d, k) => (
                      <span key={d} className="relative">
                        <svg viewBox="0 0 24 24" className={`size-8 ${k === 0 ? 'text-indigo-400' : ''}`} fill="none" stroke="currentColor" strokeWidth={k === 0 ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d={d} />
                        </svg>
                      </span>
                    ))}
                  </div>
                </Board>
                <ul className="mt-4 space-y-1.5">
                  {icons.rules.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-ink-soft">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-4 font-bold">Motion</p>
                <ul className="space-y-3">
                  {motion.map((m) => (
                    <li key={m.name} className="rounded-xl border border-ink/15 bg-paper/70 p-3">
                      <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span className="text-sm font-bold">{m.name}</span>
                        <span className="font-mono text-[10px] text-marker">{m.value}</span>
                      </p>
                      <p className="mt-1 text-xs text-ink-soft">{m.use}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Part>

          {/* components */}
          <Part id="ds-components" n="06" title="Component library" note="try them, they work">
            <Components />
          </Part>

          {/* errors + feedback */}
          <Part id="ds-feedback" n="07" title="Error handling + feedback">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border-2 border-ink bg-paper p-5 sm:p-6">
                <p className="text-lg font-extrabold">{feedback.validation.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{feedback.validation.text}</p>
                <Board className="mt-4">
                  <ul className="space-y-2">
                    {feedback.validation.examples.map((e) => (
                      <li key={e} className="flex gap-2 text-xs text-rose-400">
                        <span aria-hidden>●</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </Board>
              </div>

              <div className="rounded-2xl border-2 border-ink bg-paper p-5 sm:p-6">
                <p className="text-lg font-extrabold">{feedback.writing.title}</p>
                <p className="mt-1 text-sm text-ink-soft">Say what happened in plain words, and what to do next.</p>
                <ul className="mt-4 space-y-3">
                  {feedback.writing.rules.map((r) => (
                    <li key={r.good} className="grid gap-2 sm:grid-cols-2">
                      <p className="rounded-lg border-2 border-dashed border-ink/25 px-3 py-2 text-sm text-ink-soft line-through decoration-marker">
                        {r.bad}
                      </p>
                      <p className="rounded-lg bg-note-green/60 px-3 py-2 text-sm">{r.good}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                {[feedback.empty, feedback.locked, feedback.fallback].map((f, k) => (
                  <div key={f.title} className={`sticky-note p-5 ${['bg-note-yellow rotate-1', 'bg-note-pink -rotate-1', 'bg-note-blue rotate-1'][k]}`}>
                    <span className="block text-2xl leading-tight font-bold">{f.title}</span>
                    <span className="mt-2 block font-sans text-sm leading-relaxed text-ink-soft">{f.text}</span>
                    {f.examples && (
                      <span className="mt-3 block space-y-1">
                        {f.examples.map((e) => (
                          <span key={e} className="block font-sans text-xs text-ink">
                            &ldquo;{e}&rdquo;
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                ))}
                <div className="sticky-note -rotate-1 bg-note-green p-5">
                  <span className="block text-2xl leading-tight font-bold">{feedback.access.title}</span>
                  <ul className="mt-2 space-y-1.5">
                    {feedback.access.items.map((a) => (
                      <li key={a} className="flex gap-2 font-sans text-xs leading-snug text-ink-soft">
                        <span aria-hidden>✓</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className="mt-6 flex items-center gap-1 font-hand text-xl font-bold text-marker">
              <CurvyArrow className="w-9 shrink-0 -scale-y-100 rotate-12" />
              documented from the prototype&apos;s own code and copy
            </p>
          </Part>
        </div>
      </div>
    </section>
  )
}
