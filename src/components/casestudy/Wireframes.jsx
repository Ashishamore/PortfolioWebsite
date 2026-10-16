import Reveal from '../Reveal'
import SectionLabel from './SectionLabel'

// Low-fidelity wireframes of the main screens: boxes, lines and crossed-out images, no colour or real content.
// Numbered red markers point to the notes under each frame.

/* ---------- sketch primitives ---------- */

const Line = ({ w = 'w-full', dark = false, className = '' }) => (
  <span className={`block h-1.5 rounded-full ${dark ? 'bg-ink/70' : 'bg-ink/20'} ${w} ${className}`} />
)
const Title = ({ w = 'w-1/2' }) => <span className={`block h-2.5 rounded-full bg-ink/80 ${w}`} />
const Circle = ({ size = 'size-6', fill = false }) => (
  <span className={`block shrink-0 rounded-full border-[1.5px] border-ink ${fill ? 'bg-ink/80' : ''} ${size}`} />
)
const Box = ({ className = '', dashed = false, children }) => (
  <div className={`rounded-md border-[1.5px] ${dashed ? 'border-dashed border-ink/40' : 'border-ink/60'} p-1.5 ${className}`}>{children}</div>
)
const Btn = ({ w = 'w-full', ghost = false, className = '' }) => (
  <span className={`block h-4 rounded ${ghost ? 'border-[1.5px] border-ink/60' : 'bg-ink/85'} ${w} ${className}`} />
)
const Pill = ({ w = 'w-8', dashed = false }) => (
  <span className={`block h-3 rounded-full border-[1.5px] ${dashed ? 'border-dashed border-ink/50' : 'border-ink/60'} ${w}`} />
)
function ImgX({ className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-md border-[1.5px] border-ink/50 ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full text-ink/30" aria-hidden>
        <path d="M0 0 100 100M100 0 0 100" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

// a red numbered marker pinned to the top-right of whatever it wraps
function Mark({ n, children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <span className="absolute -top-2 -right-2 z-10 grid size-4 place-items-center rounded-full bg-marker font-mono text-[9px] font-bold text-white ring-2 ring-paper">
        {n}
      </span>
    </div>
  )
}

// the phone outline with status bar and the 4-tab bottom bar
function Frame({ active, children }) {
  return (
    <div className="flex aspect-[9/16] flex-col overflow-hidden rounded-[1.4rem] border-2 border-ink bg-paper">
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <span className="h-1 w-5 rounded-full bg-ink/40" />
        <span className="h-2 w-10 rounded-full bg-ink" />
        <span className="h-1 w-6 rounded-full bg-ink/40" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-2.5 py-2">{children}</div>
      {active !== undefined && (
        <div className="flex justify-around border-t-[1.5px] border-ink/40 px-2 py-1.5">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="flex flex-col items-center gap-0.5">
              <span className={`size-3 rounded-[3px] border-[1.5px] ${k === active ? 'border-ink bg-ink' : 'border-ink/40'}`} />
              <span className={`h-0.5 w-4 rounded-full ${k === active ? 'bg-ink' : 'bg-ink/25'}`} />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const Back = ({ title = 'w-1/2' }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs leading-none font-bold">‹</span>
    <Title w={title} />
  </div>
)

/* ---------- the screens ---------- */

function HomeWF() {
  return (
    <Frame active={0}>
      <div className="flex items-center gap-2">
        <Circle size="size-7" />
        <div className="flex-1 space-y-1">
          <Line w="w-1/3" />
          <Title w="w-2/3" />
        </div>
        <span className="relative size-5 rounded-md border-[1.5px] border-ink/60">
          <span className="absolute -top-1 -right-1 size-2 rounded-full bg-ink" />
        </span>
      </div>
      <Box className="flex items-center gap-1.5">
        <Circle size="size-2.5" />
        <Line w="w-2/3" />
      </Box>
      <Line w="w-2/5" dark />
      <Mark n={1}>
        <Box className="flex items-center gap-1.5">
          <Circle size="size-5" />
          <div className="flex-1 space-y-1">
            <Line dark w="w-4/5" />
            <Line w="w-3/5" />
          </div>
          <Btn w="w-7" />
        </Box>
      </Mark>
      <Mark n={2}>
        <Box className="space-y-1.5">
          <Line w="w-1/2" className="mx-auto" />
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((k) => (
              <Box key={k} className="space-y-1 p-1">
                <Line w="w-2/3" />
                <Line dark w="w-1/2" />
              </Box>
            ))}
          </div>
        </Box>
      </Mark>
      <Line w="w-2/5" dark />
      <Mark n={3}>
        <div className="space-y-1.5">
          {[0, 1].map((k) => (
            <Box key={k} dashed className="flex items-center gap-1.5">
              <span className="h-6 w-0.5 rounded-full bg-ink/60" />
              <div className="flex-1 space-y-1">
                <Line dark w="w-3/4" />
                <Line w="w-1/2" />
              </div>
            </Box>
          ))}
        </div>
      </Mark>
    </Frame>
  )
}

function ScheduleWF() {
  return (
    <Frame active={2}>
      <div className="flex items-center justify-between">
        <Title w="w-2/5" />
        <Mark n={1}>
          <Btn w="w-12" />
        </Mark>
      </div>
      <Mark n={2}>
        <div className="flex justify-between">
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <span key={k} className="flex flex-col items-center gap-0.5">
              <Circle size="size-4" fill={k === 5} />
              <span className={`size-1 rounded-full ${[0, 5, 6].includes(k) ? 'bg-ink/70' : ''}`} />
            </span>
          ))}
        </div>
      </Mark>
      <div className="flex gap-1.5">
        <Pill w="w-14" dashed />
        <Pill w="w-10" dashed />
      </div>
      {[0, 1, 2].map((k) => (
        <div key={k} className="space-y-1.5 border-t-[1.5px] border-ink/20 pt-2">
          <div className="flex items-center justify-between">
            <Line dark w="w-1/3" />
            {k === 0 ? (
              <Mark n={3}>
                <Pill w="w-10" />
              </Mark>
            ) : (
              <Pill w="w-10" />
            )}
          </div>
          {k > 0 && (
            <div className="flex gap-2">
              <div className="w-1/4 space-y-1">
                <Line dark />
                <Line w="w-2/3" />
              </div>
              <div className="flex-1 space-y-1 border-l-2 border-ink/50 pl-2">
                <Line dark w="w-4/5" />
                <Line w="w-3/5" />
                <div className="flex -space-x-1">
                  <Circle size="size-3" />
                  <Circle size="size-3" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </Frame>
  )
}

function AssignmentWF() {
  return (
    <Frame>
      <Back title="w-2/3" />
      <Mark n={1}>
        <div className="flex border-b-[1.5px] border-ink/30">
          {[0, 1, 2].map((k) => (
            <span key={k} className={`flex flex-1 justify-center pb-1 ${k === 0 ? 'border-b-2 border-ink' : ''}`}>
              <Line w="w-1/2" dark={k === 0} />
            </span>
          ))}
        </div>
      </Mark>
      <Title w="w-3/4" />
      <Line w="w-1/2" />
      <Line w="w-2/5" />
      <Mark n={2}>
        <Box className="space-y-1.5">
          <div className="relative">
            <ImgX className="h-12" />
            {/* the pinned spot */}
            <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-full rounded-full rounded-br-none border-[1.5px] border-ink bg-paper rotate-45" />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <Btn />
            <Btn ghost />
          </div>
        </Box>
      </Mark>
      <Mark n={3}>
        <Box dashed className="space-y-1.5">
          <Line w="w-1/3" />
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-1.5">
              <Circle size="size-4" />
              <Line w="w-1/3" dark />
              <span className="ml-auto flex gap-0.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className={`size-2 rounded-[2px] border border-ink/60 ${d <= k ? 'bg-ink/70' : ''}`} />
                ))}
              </span>
            </div>
          ))}
        </Box>
      </Mark>
      <div className="mt-auto grid grid-cols-2 gap-1.5">
        <Btn />
        <Btn ghost />
      </div>
    </Frame>
  )
}

function CreateWF() {
  const Field = ({ w = 'w-1/3', tall = false }) => (
    <div className="space-y-1">
      <Line w={w} />
      <Box className={tall ? 'h-9' : 'h-5'} />
    </div>
  )
  return (
    <Frame active={2}>
      <Back />
      <Field />
      <Field w="w-1/4" />
      <Mark n={1}>
        <Field w="w-2/5" />
      </Mark>
      <Field w="w-1/4" tall />
      <div className="grid grid-cols-2 gap-1.5">
        <Field w="w-2/3" />
        <Field w="w-1/2" />
      </div>
      <Mark n={2}>
        <Box dashed className="flex items-center gap-1.5">
          <span className="text-[10px] leading-none font-bold">+</span>
          <Line w="w-1/2" />
        </Box>
      </Mark>
      <Mark n={3} className="mt-auto">
        <Btn className="h-5" />
      </Mark>
    </Frame>
  )
}

function MoneyWF() {
  return (
    <Frame>
      <Back />
      <Box className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold">‹</span>
          <Line w="w-1/3" dark />
          <span className="text-[10px] font-bold">›</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2].map((k) => (
            <Box key={k} className="space-y-1 p-1">
              <Line w="w-2/3" />
              <Line dark w="w-1/2" />
            </Box>
          ))}
        </div>
      </Box>
      <Mark n={1}>
        <Box className="space-y-1.5 bg-ink/5">
          <Line w="w-1/3" />
          <span className="block h-3.5 w-1/2 rounded bg-ink/80" />
          <Line w="w-4/5" />
        </Box>
      </Mark>
      <Mark n={2}>
        <div className="flex items-center gap-1.5 rounded-md border-[1.5px] border-marker/70 p-1.5">
          <span className="text-[10px] leading-none font-bold text-marker">!</span>
          <Line w="w-2/3" />
        </div>
      </Mark>
      <Mark n={3}>
        <div className="flex gap-1">
          <span className="block h-3 w-6 rounded-full bg-ink/80" />
          <Pill w="w-7" />
          <Pill w="w-9" />
          <Pill w="w-7" />
        </div>
      </Mark>
      {[0, 1].map((k) => (
        <Box key={k} className="space-y-1.5">
          <div className="flex justify-between">
            <Line dark w="w-1/2" />
            <Pill w="w-8" />
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[0, 1, 2].map((c) => (
              <Line key={c} />
            ))}
          </div>
        </Box>
      ))}
    </Frame>
  )
}

function ProfileWF() {
  return (
    <Frame active={3}>
      <div className="flex items-center justify-between">
        <Title w="w-1/3" />
        <span className="flex gap-1">
          {[0, 1, 2].map((k) => (
            <span key={k} className="size-3.5 rounded-md border-[1.5px] border-ink/60" />
          ))}
        </span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <Circle size="size-11" />
        <Title w="w-2/5" />
        <Line w="w-1/2" />
      </div>
      <Mark n={1}>
        <Box className="grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="flex flex-col items-center gap-1">
              <Line dark w="w-1/2" />
              <Line w="w-3/4" />
            </span>
          ))}
        </Box>
      </Mark>
      <div className="flex gap-1">
        <Pill w="w-10" />
        <Pill w="w-8" />
        <Pill w="w-9" />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <ImgX className="h-7" />
        <ImgX className="h-7" />
      </div>
      <Mark n={2}>
        <Box className="space-y-1">
          <Line w="w-1/3" dark />
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: 21 }).map((_, k) => (
              <span key={k} className={`aspect-square rounded-[2px] border border-ink/40 ${[3, 4, 9, 15, 16].includes(k) ? 'bg-ink/70' : ''}`} />
            ))}
          </div>
        </Box>
      </Mark>
    </Frame>
  )
}

const screens = { home: HomeWF, schedule: ScheduleWF, assignment: AssignmentWF, create: CreateWF, money: MoneyWF, profile: ProfileWF }

export default function Wireframes({ wireframes, index = '06' }) {
  return (
    <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index}>lo-fi_wireframes</SectionLabel>
            <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">Low-fidelity wireframes</h2>
          </Reveal>
          <Reveal className="lg:col-span-8 lg:pt-8">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{wireframes.lead}</p>
          </Reveal>
        </div>

        <div className="relative mt-14 rounded-2xl border-2 border-dashed border-ink/25 bg-dots px-4 pt-12 pb-8 sm:px-8 lg:mt-16">
          <p className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">
            wireframes / {wireframes.screens.length} screens · greyscale, no content
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
            {wireframes.screens.map((s, k) => {
              const Screen = screens[s.key]
              return (
                <Reveal as="li" key={s.key} delay={(k % 3) * 90}>
                  <p className="mb-2 flex items-baseline justify-between font-mono text-[10px] text-ink-soft sm:text-[11px]">
                    <span>
                      wf_{String(k + 1).padStart(2, '0')} / {s.title.toLowerCase()}
                    </span>
                  </p>
                  <div className={`mx-auto max-w-[15rem] ${['-rotate-1', 'rotate-1', '-rotate-[0.5deg]'][k % 3]}`}>
                    <Screen />
                  </div>
                  <h3 className="mt-4 text-lg font-bold sm:text-xl">{s.title}</h3>
                  <ol className="mt-2 space-y-1.5">
                    {s.notes.map((note, n) => (
                      <li key={note} className="flex gap-2 text-sm leading-snug text-ink-soft">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-marker font-mono text-[9px] font-bold text-white">
                          {n + 1}
                        </span>
                        {note}
                      </li>
                    ))}
                  </ol>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
