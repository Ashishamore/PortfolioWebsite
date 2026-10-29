import { about } from '../data/content'
import { toolIcons } from '../data/toolIcons'
import { Sparkle } from './Doodles'
import Reveal from './Reveal'

// The tools I use, as logo tiles on a board, grouped by what they're for.
// Logos sit in ink so the board stays calm, and take their brand colour on hover.

function ToolLogo({ icon, className = '' }) {
  if (icon.path)
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className}>
        <path d={icon.path} fill="currentColor" />
      </svg>
    )
  // an app tile with two letters, the way Adobe's apps look
  if (icon.mono)
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className}>
        <rect x="1.5" y="2.5" width="21" height="19" rx="4.5" fill="currentColor" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-paper)" style={{ fontFamily: 'var(--font-sans)' }}>
          {icon.mono}
        </text>
      </svg>
    )
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      {icon.glyph === 'heart' && <path d="M12 21.2s-9-5.4-9-11.7A5.1 5.1 0 0 1 12 6.4a5.1 5.1 0 0 1 9 3.1c0 6.3-9 11.7-9 11.7z" fill="currentColor" />}
      {icon.glyph === 'sticky' && (
        <>
          <path d="M3 3h18v12.5L14.5 22H3z" fill="currentColor" />
          <path d="M14.5 22v-6.5H21" fill="none" stroke="var(--color-paper)" strokeWidth="1.6" strokeLinejoin="round" />
        </>
      )}
      {icon.glyph === 'code' && (
        <>
          <rect x="1.5" y="2.5" width="21" height="19" rx="3.5" fill="currentColor" />
          <path d="M9.5 8.5 6 12l3.5 3.5M14.5 8.5 18 12l-3.5 3.5" fill="none" stroke="var(--color-paper)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  )
}

export default function Toolkit() {
  const count = about.toolkit.reduce((n, g) => n + g.tools.length, 0)
  return (
    <Reveal delay={100} className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-20 lg:px-8">
      <p className="mb-6 font-mono text-xs text-ink-soft">
        <span className="text-marker">[⌘]</span> toolkit
      </p>
      <div className="relative rounded-2xl border-2 border-dashed border-ink/35 bg-paper/60 p-5 sm:p-8">
        <p className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">toolkit.fig / {count} tools</p>
        {/* Phones: the groups stack. From tablet width up: one grid of eight equal columns, each group spanning one
            column per tool, so the groups pack into two full rows (5 + 3, then 2 + 6) and every logo lines up. */}
        <div className="space-y-8 md:grid md:grid-cols-8 md:gap-x-4 md:gap-y-10 md:space-y-0 lg:gap-x-6">
          {about.toolkit.map((group) => (
            <div key={group.group} className="md:col-span-(--span) md:grid md:grid-cols-subgrid" style={{ '--span': group.tools.length }}>
              {/* the label, with a dashed rule running over the group's tools */}
              <p className="mb-4 flex items-center gap-3 md:col-span-full">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-ink px-2 py-1 font-mono text-[11px] tracking-wide text-cream uppercase">
                  {group.group.startsWith('AI') && <Sparkle className="size-3 text-note-yellow" />}
                  {group.group} · {group.tools.length}
                </span>
                <span aria-hidden className="hidden h-0 flex-1 border-t-2 border-dashed border-ink/15 md:block" />
              </p>
              <ul className="flex flex-wrap gap-y-5 max-md:gap-x-2 sm:max-md:gap-x-3 md:col-span-full md:grid md:grid-cols-subgrid">
                {group.tools.map((name) => (
                  // --brand: the colour the logo takes on hover
                  <li key={name} className="group w-[4.5rem] text-center sm:w-20 md:w-auto" style={{ '--brand': `#${toolIcons[name].hex}` }}>
                    <span className="mx-auto grid size-14 place-items-center rounded-xl border-2 border-ink bg-paper shadow-[2px_2px_0_var(--color-ink)] transition-transform duration-200 group-hover:-translate-y-0.5 sm:size-16">
                      <ToolLogo icon={toolIcons[name]} className="size-7 text-ink transition-colors duration-200 group-hover:text-(--brand) sm:size-8" />
                    </span>
                    <span className="mt-2 block text-xs leading-tight font-medium">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
