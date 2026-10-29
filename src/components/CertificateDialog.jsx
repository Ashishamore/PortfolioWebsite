import { useEffect, useId, useRef } from 'react'
import certSmall from '../assets/hfi-cua-certificate-1200.jpg'
import certLarge from '../assets/hfi-cua-certificate-2000.jpg'
import { certification } from '../data/content'
import { ArrowUpRight, CloseIcon } from './Icons'

// The HFI certificate in a pop-up, opened from the hero badge.
// A native <dialog>: Escape closes it, focus stays inside while it's open, and it sits above everything.

const srcSet = `${certSmall} 1200w, ${certLarge} 2000w`
const sizes = '(min-width: 1100px) 1000px, 100vw'

// Start loading the certificate when someone points at or focuses the badge, so it's ready when it opens
export function preloadCertificate() {
  const img = new Image()
  img.sizes = sizes
  img.srcset = srcSet
}

export default function CertificateDialog({ open, onClose }) {
  const dialog = useRef(null)
  const closeButton = useRef(null)
  // a click only counts as "outside" if it also started outside, so a drag that ends on the backdrop doesn't close it
  const pressedOutside = useRef(false)
  const titleId = useId()

  // follow `open`, and lock the page scroll while the dialog is up
  useEffect(() => {
    const d = dialog.current
    if (!open) {
      if (d.open) d.close()
      return
    }
    if (!d.open) d.showModal()
    closeButton.current.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // every way out (close button, outside click, Escape) ends in the dialog's own close event
  const close = () => dialog.current.close()

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onPointerDown={(e) => (pressedOutside.current = e.target === e.currentTarget)}
      onClick={(e) => pressedOutside.current && e.target === e.currentTarget && close()}
      // as wide as the screen allows, but never taller than it: the certificate is 1.294 times as wide as it is tall.
      // That sizing keeps it on screen, so overflow can stay visible and the card's offset shadow isn't clipped.
      style={{ width: 'min(100vw - 2rem, 64rem, (100dvh - 10rem) * 1.294)' }}
      className="m-auto w-[calc(100vw-2rem)] animate-[fadeUp_0.35s_ease_both] overflow-visible border-0 bg-transparent p-0 backdrop:animate-[fadeIn_0.3s_ease_both] backdrop:bg-[rgb(22_35_44/0.72)] backdrop:backdrop-blur-sm"
    >
      <div className="rounded-2xl border-2 border-ink bg-paper p-3 text-ink shadow-[6px_6px_0_var(--color-marker)] sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id={titleId} className="min-w-0 truncate font-mono text-[11px] text-ink-soft sm:text-xs">
            certificate / {certification.title}
          </h2>
          <button
            ref={closeButton}
            type="button"
            onClick={close}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border-2 border-ink px-3.5 py-1.5 font-mono text-xs transition-colors hover:bg-ink hover:text-cream focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-figma"
          >
            <CloseIcon className="size-3.5" /> close
          </button>
        </div>

        <img
          src={certLarge}
          srcSet={srcSet}
          sizes={sizes}
          width="2000"
          height="1545"
          loading="lazy"
          decoding="async"
          alt={`${certification.title} certificate, awarded by Human Factors International on ${certification.issued}, certificate ${certification.detail}`}
          className="block h-auto w-full rounded-lg border border-ink/15 bg-cream"
        />

        <p className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 font-mono text-[11px] text-ink-soft">
          <span>
            {certification.detail} · {certification.issued}
          </span>
          <span className="flex flex-wrap gap-x-4 gap-y-1.5">
            <a href={certLarge} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 whitespace-nowrap underline underline-offset-4 hover:text-marker">
              full size <ArrowUpRight className="size-3" />
            </a>
            {/* noreferrer also means noopener, which browsers require before they'll highlight the name on HFI's page */}
            <a
              href={certification.verifyUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Verify with HFI: find Ashish More in HFI's directory of certified usability analysts"
              className="inline-flex items-center gap-1 whitespace-nowrap underline underline-offset-4 hover:text-marker"
            >
              verify with HFI <ArrowUpRight className="size-3" />
            </a>
          </span>
        </p>
      </div>
    </dialog>
  )
}
