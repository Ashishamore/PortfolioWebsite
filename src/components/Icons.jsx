const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function ArrowUpRight({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function ArrowDown({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  )
}

export function MenuIcon({ className = 'size-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  )
}

export function CloseIcon({ className = 'size-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function MailIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function CopyIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" />
    </svg>
  )
}

export function CheckIcon({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m5 12 5 5 9-10" />
    </svg>
  )
}

// Rosette seal with a tick, for certifications
export function SealIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M12 1.5l2.4 1.8 3-.2.9 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.9 2.9-3-.2L12 20l-2.4-1.8-3 .2-.9-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.9-2.9 3 .2z"
      />
      <path d="M8.3 10.9l2.5 2.5 4.9-4.9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
