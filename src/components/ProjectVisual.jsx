// Lo-fi wireframe thumbnails for the case-study cards, drawn like whiteboard sketches.
// Types: journey, phones, mobile, dashboard, web, code. Swap for real screenshots any time:
// <img src={...} className="h-full w-full object-cover" /> inside the card.
import { CurvyArrow } from './Doodles'
import JourneyDiagram from './JourneyDiagram'
import { sitesaathiScreens } from '../data/sitesaathi'
import { workiveScreens } from '../data/workive'

const screenSets = { workive: workiveScreens, sitesaathi: sitesaathiScreens }

const sheet = 'border-2 border-ink bg-paper'
const line = 'h-1.5 rounded-full bg-ink/20'

function ImgX({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-md border-2 border-ink/50 ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-ink/35" aria-hidden>
        <path d="M0 0 100 100M100 0 0 100" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

function Note({ children, className = '', arrowClass = '' }) {
  return (
    <div className={`absolute flex items-end gap-1 font-hand text-xl leading-none font-bold text-marker sm:text-2xl ${className}`}>
      <CurvyArrow className={`w-9 shrink-0 ${arrowClass}`} />
      <span className="-rotate-3 whitespace-nowrap">{children}</span>
    </div>
  )
}

// One patient's journey map (shared with the case-study page hero)
function Journey({ note }) {
  return (
    <div className="relative flex h-full items-end justify-center px-6 pt-12 sm:px-8">
      <div className={`${sheet} flex h-[84%] w-full max-w-lg flex-col rounded-t-xl border-b-0 transition-transform duration-500 group-hover:-translate-y-2`}>
        <div className="flex items-center justify-between border-b-2 border-ink px-3 py-2 font-mono text-[10px] text-ink-soft">
          <span>journey_map / patient_01</span>
          <span className="hidden sm:inline">5 states · 3 sites</span>
        </div>
        <JourneyDiagram className="min-h-0 w-full flex-1 px-3 pt-2 pb-9" />
      </div>
      <Note className="top-3 left-6" arrowClass="rotate-[200deg] -scale-x-100 order-last">
        {note}
      </Note>
    </div>
  )
}

// Two real app screenshots, tilted like printouts pinned to the board
function Phones({ note, project }) {
  const set = screenSets[project?.slug] ?? workiveScreens
  const [a, b] = project?.shots ?? ['schedule', 'home']
  return (
    <div className="relative flex h-full items-end justify-center gap-4 px-6 pt-12">
      {[
        [a, 'h-[86%] -rotate-3 group-hover:-translate-y-2'],
        [b, 'h-[74%] rotate-3 group-hover:-translate-y-4'],
      ].map(([key, cls]) => (
        <div key={key} className={`aspect-[600/1298] overflow-hidden rounded-t-[1.4rem] border-[5px] border-b-0 border-ink bg-ink transition-transform duration-500 ${cls}`}>
          <img src={set[key]} alt="" loading="lazy" className="size-full rounded-t-[1rem] object-cover object-top" />
        </div>
      ))}
      <Note className="top-3 left-6" arrowClass="rotate-[200deg] -scale-x-100 order-last">
        {note}
      </Note>
    </div>
  )
}

function Mobile({ note }) {
  return (
    <div className="relative flex h-full items-end justify-center gap-4 px-6 pt-10">
      <div className={`${sheet} h-[86%] w-[36%] max-w-40 -rotate-2 rounded-t-[1.4rem] border-b-0 p-3 transition-transform duration-500 group-hover:-translate-y-2`}>
        <div className="mx-auto mb-3 h-1.5 w-8 rounded-full bg-ink" />
        <div className={`${line} mb-3 w-1/2`} />
        <svg viewBox="0 0 40 40" className="mx-auto mb-3 w-1/2" aria-hidden>
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4" className="text-ink/15" />
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="70 101" strokeLinecap="round" transform="rotate(-90 20 20)" className="text-ink" />
        </svg>
        <div className="mb-3 flex justify-center gap-1.5">
          {[1, 1, 1, 0].map((on, k) => (
            <span key={k} className={`size-3.5 rounded-full border-2 border-ink ${on ? 'bg-note-yellow' : ''}`} />
          ))}
        </div>
        <div className={`${line} mb-1.5 w-full`} />
        <div className={`${line} w-3/4`} />
      </div>
      <div className={`${sheet} h-[70%] w-[36%] max-w-40 rotate-2 rounded-t-[1.4rem] border-b-0 p-3 transition-transform duration-500 group-hover:-translate-y-4`}>
        <div className="mx-auto mb-3 h-1.5 w-8 rounded-full bg-ink" />
        <ImgX className="mb-3 aspect-[4/3]" />
        <div className={`${line} mb-1.5 w-full`} />
        <div className={`${line} mb-3 w-2/3`} />
        <div className="h-6 rounded-md bg-ink" />
      </div>
      <Note className="top-4 left-4 sm:left-6" arrowClass="rotate-[200deg] -scale-x-100 order-last">
        {note}
      </Note>
    </div>
  )
}

function Dashboard({ note }) {
  return (
    <div className="relative flex h-full items-end pt-12 pl-8">
      <div className={`${sheet} relative flex h-[88%] w-full gap-3 rounded-tl-xl border-r-0 border-b-0 p-4 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2`}>
        {/* layout grid overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 left-4 grid grid-cols-6 gap-3 px-4 opacity-70">
          {Array.from({ length: 6 }).map((_, k) => (
            <span key={k} className="bg-marker/10" />
          ))}
        </div>
        <div className="relative hidden w-1/5 flex-col gap-2 sm:flex">
          <div className="mb-2 size-5 rounded-md bg-ink" />
          {[0, 1, 2, 3].map((k) => (
            <div key={k} className={`h-1.5 rounded-full ${k === 1 ? 'bg-ink/60' : 'bg-ink/20'}`} />
          ))}
        </div>
        <div className="relative flex flex-1 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((k) => (
              <div key={k} className="rounded-md border-2 border-ink/60 bg-paper p-2">
                <div className={`${line} mb-1.5 w-1/2`} />
                <div className="h-2.5 w-2/3 rounded-full bg-ink/80" />
              </div>
            ))}
          </div>
          <div className="relative flex-1 rounded-md border-2 border-ink/60 bg-paper">
            <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)]" aria-hidden>
              <path d="M0 64 30 52 55 58 85 34 112 40 140 18 170 26 200 8" fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" className="text-ink" />
              <path d="M0 70 30 66 55 68 85 56 112 60 140 46 170 52 200 40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="text-ink/40" />
            </svg>
          </div>
        </div>
      </div>
      <Note className="top-3 left-6" arrowClass="rotate-[200deg] -scale-x-100 order-last">
        {note}
      </Note>
    </div>
  )
}

function Web({ note }) {
  return (
    <div className="relative flex h-full items-end justify-center px-8 pt-12">
      <div className={`${sheet} h-[86%] w-full max-w-md overflow-hidden rounded-t-xl border-b-0 transition-transform duration-500 group-hover:-translate-y-2`}>
        <div className="flex items-center gap-1.5 border-b-2 border-ink px-3 py-2">
          {[0, 1, 2].map((k) => (
            <span key={k} className="size-2 rounded-full border-[1.5px] border-ink" />
          ))}
          <span className="ml-2 h-3 flex-1 rounded-sm border-[1.5px] border-ink/40" />
        </div>
        <div className="grid grid-cols-5 gap-3 p-4">
          <div className="col-span-3">
            <div className="mb-2 h-2.5 w-4/5 rounded-full bg-ink/80" />
            <div className={`${line} mb-1.5 w-full`} />
            <div className={`${line} mb-4 w-2/3`} />
            <div className="flex gap-2">
              <div className="h-6 flex-1 rounded-md border-2 border-ink/50" />
              <div className="h-6 w-12 rounded-md bg-ink" />
            </div>
          </div>
          <ImgX className="col-span-2 aspect-square" />
          {[0, 1, 2].map((k) => (
            <div key={k} className={`rounded-md border-2 border-ink/40 p-2 ${k === 2 ? 'hidden sm:block' : ''} ${k === 0 ? 'col-span-2' : k === 1 ? 'col-span-3 sm:col-span-2' : ''}`}>
              <div className={`${line} mb-1 w-2/3`} />
              <div className={`${line} w-1/2`} />
            </div>
          ))}
        </div>
      </div>
      <span className="absolute top-14 right-5 rounded-sm bg-figma px-1.5 py-0.5 font-mono text-[10px] text-white">AA · 4.5:1</span>
      <Note className="top-3 left-6" arrowClass="rotate-[200deg] -scale-x-100 order-last">
        {note}
      </Note>
    </div>
  )
}

function Code({ note }) {
  const rows = [
    ['w-1/4 bg-note-lilac', 'w-1/5 bg-note-yellow'],
    ['ml-4 w-1/5 bg-note-green', 'w-1/3 bg-cream/40'],
    ['ml-4 w-1/6 bg-note-green', 'w-1/4 bg-note-orange'],
    ['ml-8 w-2/5 bg-cream/40'],
    ['ml-4 w-1/4 bg-note-lilac'],
    ['w-1/6 bg-note-lilac'],
  ]
  return (
    <div className="relative h-full">
      {/* design frame */}
      <div className="absolute top-[16%] left-[7%] w-[40%] transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
        <p className="mb-1 font-mono text-[10px] text-figma">▢ Card / default</p>
        <div className="relative -rotate-2 border-[1.5px] border-figma bg-paper p-3">
          {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-right-1 -bottom-1'].map((pos) => (
            <span key={pos} className={`absolute size-2 border-[1.5px] border-figma bg-white ${pos}`} />
          ))}
          <ImgX className="mb-2 aspect-[2/1]" />
          <div className="mb-1.5 h-2 w-2/3 rounded-full bg-ink/70" />
          <div className={`${line} mb-3 w-1/2`} />
          <div className="h-5 rounded-md bg-ink" />
        </div>
      </div>
      {/* code editor */}
      <div className="absolute right-[6%] bottom-[10%] w-[50%] rotate-1 rounded-xl border-2 border-ink bg-ink p-3 shadow-hard transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1">
        <div className="mb-3 flex items-center gap-1.5">
          {[0, 1, 2].map((k) => (
            <span key={k} className="size-2 rounded-full bg-cream/30" />
          ))}
          <span className="ml-auto font-mono text-[9px] text-cream/50">Card.jsx</span>
        </div>
        <div className="space-y-2">
          {rows.map((row, k) => (
            <div key={k} className="flex gap-1.5">
              {row.map((cls) => (
                <span key={cls} className={`h-1.5 rounded-full ${cls}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Note className="top-[44%] left-[30%] sm:left-[34%]" arrowClass="-scale-y-100 rotate-[160deg]">
        {note}
      </Note>
    </div>
  )
}

const visuals = { journey: Journey, phones: Phones, mobile: Mobile, dashboard: Dashboard, web: Web, code: Code }

export default function ProjectVisual({ type, note, project }) {
  const Visual = visuals[type] ?? Web
  return <Visual note={note} project={project} />
}
