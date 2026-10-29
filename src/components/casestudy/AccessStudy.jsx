import { Fragment, useEffect, useId, useState } from 'react'
import { accessStory as story, cast, cities, faces, groups, hcp, insurer, parties } from '../../data/accessStory'
import { CurvyArrow, StickyNote } from '../Doodles'
import Reveal from '../Reveal'
import Learned from './Learned'
import Outcome from './Outcome'
import SectionLabel from './SectionLabel'

// Case study 01: a specialty pharma platform, personified as one patient's story that became the team's domain KT
const groupOf = Object.fromEntries(groups.map((g) => [g.key, g]))
const groupFill = { run: 'var(--color-note-blue)', clear: 'var(--color-note-orange)', keep: 'var(--color-note-green)' }
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2']

// Story actors that aren't a module's main person. `chip` labels where they sit relative to the platform.
const extras = {
  hcp: { ...hcp, color: groupOf.run.color, chip: hcp.module.toLowerCase() },
  payer: { ...insurer, module: 'Insurer', who: '', icon: 'shield', color: 'bg-paper', chip: 'outside the platform' },
}

function actorOf(key) {
  if (extras[key]) return extras[key]
  const c = cast.find((m) => m.module === key)
  return { ...c, color: groupOf[c.group].color }
}
// the module an actor works in, for the ecosystem panel
const moduleOf = (key) => extras[key]?.module ?? key

// Everyone on the map: each module's people (the doctor beside Carla in the provider portal), plus the insurer
const person = (key, m, fill) => ({
  key,
  name: m.who || m.role,
  role: m.who ? m.role : '',
  org: m.org,
  city: m.city,
  party: m.party,
  icon: m.icon,
  face: faces[m.who],
  fill,
})
const mapPeople = [
  ...cast.flatMap((m) => [
    ...(m.module === hcp.module ? [person('hcp', hcp, groupFill[m.group])] : []),
    person(m.module, m, groupFill[m.group]),
  ]),
  person('payer', { ...insurer, icon: 'shield' }, 'var(--color-paper)'),
]

// ---- time ----
// Every event's `at` is local time with its UTC offset. Times are shown as written, wherever the reader is.
const tzOrder = ['PT', 'MT', 'CT', 'ET']
const tzNames = { PT: 'Pacific', MT: 'Mountain', CT: 'Central', ET: 'Eastern' }
const tzFill = { PT: 'var(--color-note-lilac)', MT: 'var(--color-note-blue)', CT: 'var(--color-note-yellow)', ET: 'var(--color-note-pink)' }
const tzStandard = { PT: -8, MT: -7, CT: -6, ET: -5 }
// US daylight saving in 2026, to the hour
const dst = [Date.UTC(2026, 2, 8, 9), Date.UTC(2026, 10, 1, 8)]
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const clock = (h, m) => `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`

function localTime(at) {
  const [y, mo, d, h, mi] = at.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+)/).slice(1).map(Number)
  return { date: `${weekdays[new Date(Date.UTC(y, mo - 1, d)).getUTCDay()]}, ${months[mo - 1]} ${d}`, time: clock(h, mi) }
}

// the same instant on each US time zone's clock
function clocksAt(ms) {
  const shift = ms >= dst[0] && ms < dst[1] ? 1 : 0
  return tzOrder.map((tz) => {
    const t = new Date(ms + (tzStandard[tz] + shift) * 3600e3)
    return { tz, time: clock(t.getUTCHours(), t.getUTCMinutes()), day: weekdays[t.getUTCDay()] }
  })
}

function elapsed(ms) {
  const min = Math.round(ms / 60000)
  if (min < 60) return `${min} min`
  const hr = Math.round(min / 60)
  if (hr < 24) return `${hr} hr`
  const days = Math.round(hr / 24)
  if (days < 14) return `${days} day${days > 1 ? 's' : ''}`
  return `${Math.round(days / 7)} weeks`
}

// ---- place ----
const short = (city) => city.split(',')[0]

// straight-line distance in miles
function miles(a, b) {
  const [p, q] = [cities[a], cities[b]]
  const rad = Math.PI / 180
  const h =
    Math.sin(((q.lat - p.lat) * rad) / 2) ** 2 +
    Math.cos(p.lat * rad) * Math.cos(q.lat * rad) * Math.sin(((q.lon - p.lon) * rad) / 2) ** 2
  return Math.round((2 * 3959 * Math.asin(Math.sqrt(h))) / 10) * 10
}

// Line drawings for each module, in the sketchy style of the rest of the site
const paths = {
  sliders: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="2" className="fill-paper" />
      <circle cx="15" cy="12" r="2" className="fill-paper" />
      <circle cx="7" cy="17" r="2" className="fill-paper" />
    </>
  ),
  form: (
    <>
      <rect x="5" y="3.5" width="14" height="17.5" rx="2" />
      <path d="M9.5 3.5v2h5v-2M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13l2-8h12l2 8v6H4z" />
      <path d="M4 13h5a3 3 0 006 0h5" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12l5.5-5" />
      <circle cx="15.5" cy="14.5" r="1" className="fill-current" />
    </>
  ),
  car: (
    <>
      <path d="M3 16.5v-4.5l2.2-5h13.6l2.2 5v4.5z" />
      <path d="M3 12h18" />
      <circle cx="7.5" cy="16.5" r="1.8" className="fill-paper" />
      <circle cx="16.5" cy="16.5" r="1.8" className="fill-paper" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M14.5 9.5c-.4-.9-1.3-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2c-1.2 0-2.1-.6-2.5-1.5M12 6.5v1.5M12 16v1.5" />
    </>
  ),
  snow: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5" />,
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.5 18.5h3M9.5 7.5h5M9.5 10.5h5M9.5 13.5h3" />
    </>
  ),
  pulse: <path d="M3 12h4l2-5 3 10 2-6 1.5 1H21" />,
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M7 15l4-4 3 3 5-6" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M8 20h8M5 7h14" />
      <path d="M5 7l-2.5 6a2.5 2.5 0 005 0zM19 7l-2.5 6a2.5 2.5 0 005 0z" />
    </>
  ),
  funnel: <path d="M3.5 4.5h17l-6.5 7.5v6l-4 2v-8z" />,
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11.5a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M5 3.5v5a4 4 0 0 0 8 0v-5M9 12.5v2.5a4.5 4.5 0 0 0 9 0v-2" />
      <circle cx="18" cy="11" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </>
  ),
}

// `rest` lets it sit inside another SVG too (x, y, width, height)
function Sketch({ name, className = 'size-6', ...rest }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}

// A drawn head-and-shoulders portrait, outlined in ink like the rest of the doodles
const ink = { stroke: 'var(--color-ink)', strokeWidth: 1.5, strokeLinejoin: 'round' }
const backHair = {
  long: 'M18 30a14 15 0 0 1 28 0v19c-4 1-7 0-9-2h-10c-2 2-5 3-9 2z',
  bob: 'M18.5 29a13.5 14 0 0 1 27 0v10c-3 1.5-6 1.5-8 0h-11c-2 1.5-5 1.5-8 0z',
  ponytail: 'M41 19c7 1 10 8 8 19-3-2-5-6-7-10z',
}
const frontHair = {
  short: 'M20.5 26c-.5-8 4.5-13.5 11.5-13.5S44 18 43.5 26c-2-3.5-6.5-5.5-11.5-5.5S22.5 22.5 20.5 26z',
  bob: 'M20.5 27c.5-9 5.5-14 11.5-14s11 5 11.5 14c-5-1-9.5-4-11.5-8.5-2 4.5-6.5 7.5-11.5 8.5z',
  long: 'M20.5 28c.5-9 5.5-15 11.5-15s11 6 11.5 15c-4-2-7-5.5-8.5-9.5-3 4-8.5 7.5-14.5 9.5z',
  bun: 'M20.5 26c0-8 5-13 11.5-13s11.5 5 11.5 13c-3-3-7-5-11.5-5s-8.5 2-11.5 5z',
  ponytail: 'M20.5 26c0-8 5-13 11.5-13s11.5 5 11.5 13c-3-3-7-5-11.5-5s-8.5 2-11.5 5z',
}

// `round` clips it to a circle (for map pins); `rest` positions it inside another SVG
function Face({ face, className = '', round = false, ...rest }) {
  const { skin, hair, hairColor, shirt } = face
  const clip = useId()
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className} {...rest}>
      {round && (
        <clipPath id={clip}>
          <circle cx="32" cy="32" r="31" />
        </clipPath>
      )}
      <g clipPath={round ? `url(#${clip})` : undefined}>
      {backHair[hair] && <path d={backHair[hair]} fill={hairColor} {...ink} />}
      {hair === 'bun' && <circle cx="32" cy="11.5" r="5" fill={hairColor} {...ink} />}
      {/* neck, shoulders and the collar */}
      <path d="M27.5 36h9v9h-9z" fill={skin} {...ink} />
      <path d="M9 66c0-13 10-20 23-20s23 7 23 20z" fill={shirt} {...ink} />
      {face.scrubs ? (
        <path d="M26 46.5l6 7 6-7" fill="none" {...ink} />
      ) : (
        <path d="M26.5 46.5l5.5 5-3.5 3-3.5-7zM37.5 46.5l-5.5 5 3.5 3 3.5-7z" fill="#fffdf6" {...ink} />
      )}
      {face.tie && <path d="M32 50.5l-1.8 2 1.8 10 1.8-10z" fill="#ec5b3b" {...ink} />}
      {face.stethoscope && (
        <g fill="none" {...ink}>
          <path d="M25 47c-1 6 2 10 7 10s8-4 7-10" />
          <circle cx="39" cy="57" r="2" fill="#c9c2b8" />
        </g>
      )}
      {/* head */}
      <ellipse cx="21" cy="30" rx="2" ry="2.8" fill={skin} {...ink} />
      <ellipse cx="43" cy="30" rx="2" ry="2.8" fill={skin} {...ink} />
      <ellipse cx="32" cy="28.5" rx="11" ry="12.5" fill={skin} {...ink} />
      {face.beard && <path d="M21.5 31c0 7.5 4.5 10.5 10.5 10.5S42.5 38.5 42.5 31c-2 3.5-5.5 5.5-10.5 5.5S23.5 34.5 21.5 31z" fill={hairColor} {...ink} />}
      {hair === 'curly' ? (
        <g fill={hairColor} {...ink}>
          <circle cx="22.5" cy="23" r="4.5" />
          <circle cx="41.5" cy="23" r="4.5" />
          <circle cx="25" cy="17" r="5" />
          <circle cx="39" cy="17" r="5" />
          <circle cx="32" cy="14.5" r="5.5" />
        </g>
      ) : (
        <path d={frontHair[hair]} fill={hairColor} {...ink} />
      )}
      {/* eyes and a smile */}
      <circle cx="28" cy="29" r="1.3" fill="var(--color-ink)" />
      <circle cx="36" cy="29" r="1.3" fill="var(--color-ink)" />
      {/* on a beard the smile is drawn light, so it still shows */}
      <path d="M28.5 34.5c2 1.8 5 1.8 7 0" fill="none" {...ink} stroke={face.beard ? '#fffdf6' : ink.stroke} strokeLinecap="round" />
      {face.glasses && (
        <g fill="none" {...ink}>
          <circle cx="28" cy="29" r="3.3" />
          <circle cx="36" cy="29" r="3.3" />
          <path d="M31.3 29h1.4" />
        </g>
      )}
      </g>
    </svg>
  )
}

// ---- the map ----
// A hand-drawn outline of the lower 48, in a simple equirectangular projection, with the four time zones as bands.
const MAP_W = 900
const MAP_H = 500
const mapX = (lon) => 30 + (lon + 125) * 14.24
const mapY = (lat) => 40 + (49.5 - lat) * 18
const coast = [
  [-124.7, 48.4], [-124.1, 46.2], [-124, 43], [-124.2, 40.4], [-122.5, 37.8], [-120.6, 34.6], [-118.4, 34], [-117.1, 32.5],
  [-114.7, 32.7], [-111.1, 31.3], [-108.2, 31.3], [-106.5, 31.8], [-104.5, 29.6], [-103, 29], [-101.4, 29.8], [-99.5, 27.5],
  [-97.4, 25.9], [-97.4, 27.8], [-94.8, 29.3], [-93.8, 29.7], [-91, 29.2], [-89.4, 28.9], [-89.6, 30.2], [-88, 30.6],
  [-86.5, 30.4], [-85, 29.6], [-84, 30], [-82.8, 28], [-81.8, 26.1], [-81.1, 25.1], [-80.3, 25.2], [-80, 26.6], [-80.6, 28.4],
  [-81.4, 30.6], [-80.9, 32], [-79, 33.5], [-77.9, 34], [-75.5, 35.3], [-76, 37], [-75, 38.5], [-74, 40], [-73.9, 40.6],
  [-72, 41], [-70, 41.6], [-70.6, 42.6], [-70.2, 43.7], [-67, 44.8], [-67.8, 47.1], [-69.2, 47.4], [-71.5, 45], [-74.9, 45],
  [-76.5, 44.2], [-79, 43.3], [-82.5, 42.5], [-82.4, 45.5], [-84.5, 46.5], [-89.5, 48], [-95.2, 49], [-123, 49],
]
const outline = `M${coast.map(([lon, lat]) => `${mapX(lon).toFixed(1)} ${mapY(lat).toFixed(1)}`).join('L')}Z`
// rough time-zone edges, as longitudes
const tzEdges = [-125, -114.5, -101.5, -86.2, -66]

// Colorado Springs sits right under Denver, so its pin is moved down a touch
const nudges = { 'Colorado Springs, CO': [6, 18] }
function cityXY(city) {
  const [dx, dy] = nudges[city] ?? [0, 0]
  return [mapX(cities[city].lon) + dx, mapY(cities[city].lat) + dy]
}
// label placement where the default (to the right) would collide
const labelAt = {
  'Denver, CO': { anchor: 'middle', dx: 0, dy: -40 },
  'Colorado Springs, CO': { anchor: 'middle', dx: 0, dy: 34 },
  'Hartford, CT': { anchor: 'end', dx: -4, dy: -36 },
  'Princeton, NJ': { anchor: 'end', dx: -22, dy: 0 },
  'Miami, FL': { anchor: 'end', dx: -22, dy: 0 },
}
const peopleByCity = Object.entries(
  mapPeople.reduce((acc, p) => ({ ...acc, [p.city]: [...(acc[p.city] ?? []), p] }), {}),
)
const spread = (k, n, r) => (k - (n - 1) / 2) * r * 1.8

function PersonPin({ p, x, y, r, plain = false }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={p.fill} />
      {!plain &&
        (p.face ? (
          <Face face={p.face} round x={x - r} y={y - r} width={2 * r} height={2 * r} />
        ) : (
          <Sketch name={p.icon} className="text-ink" x={x - r * 0.62} y={y - r * 0.62} width={r * 1.24} height={r * 1.24} />
        ))}
      <circle cx={x} cy={y} r={r} fill="none" stroke="var(--color-ink)" strokeWidth={plain ? 2.5 : 2} />
    </g>
  )
}

// `labels` draws the full map; without it, a compact map that follows the story (active pin + the case's trail)
function USMap({ className = '', labels = true, activeKey, activeCity, trail = [] }) {
  const clip = useId()
  const r = labels ? 15 : 10
  const points = trail.map(cityXY)
  const trailD = points.reduce((d, [x, y], k) => {
    if (!k) return `M${x} ${y}`
    const [px, py] = points[k - 1]
    const lift = Math.max(30, Math.hypot(x - px, y - py) * 0.3)
    return `${d}Q${(x + px) / 2} ${Math.min(y, py) - lift} ${x} ${y}`
  }, '')
  const active = activeCity && peopleByCity.find(([city]) => city === activeCity)
  const activePerson = active && (active[1].find((p) => p.key === activeKey) ?? active[1][0])

  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={className} role="img" aria-label="Map of the United States with everyone in the story pinned to their city, across four time zones">
      <clipPath id={clip}>
        <path d={outline} />
      </clipPath>
      {/* time-zone bands, inside the outline */}
      <g clipPath={`url(#${clip})`}>
        {tzOrder.map((tz, k) => (
          <rect key={tz} x={mapX(tzEdges[k])} y="0" width={mapX(tzEdges[k + 1]) - mapX(tzEdges[k])} height={MAP_H} fill={tzFill[tz]} opacity="0.5" />
        ))}
        {tzEdges.slice(1, -1).map((lon) => (
          <line key={lon} x1={mapX(lon)} x2={mapX(lon)} y1="0" y2={MAP_H} stroke="var(--color-ink)" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="6 7" />
        ))}
      </g>
      <path d={outline} fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
      {tzOrder.map((tz, k) => (
        <text
          key={tz}
          x={(mapX(tzEdges[k]) + mapX(tzEdges[k + 1])) / 2}
          y={labels ? 24 : 30}
          textAnchor="middle"
          className="fill-ink-soft font-mono font-medium"
          fontSize={labels ? 13 : 30}
        >
          {labels ? `${tzNames[tz].toUpperCase()} TIME` : tz}
        </text>
      ))}

      {/* the path the case has travelled so far */}
      {points.length > 1 && (
        <path d={trailD} fill="none" stroke="var(--color-marker)" strokeWidth={labels ? 3 : 6} strokeDasharray={labels ? '2 8' : '2 13'} strokeLinecap="round" />
      )}

      {peopleByCity.map(([city, people]) => {
        const [x, y] = cityXY(city)
        const side = labelAt[city] ?? { anchor: 'start', dx: 22 + spread(people.length - 1, people.length, r), dy: 0 }
        return (
          <g key={city}>
            {people.map((p, k) => (
              <PersonPin key={p.key} p={p} x={x + spread(k, people.length, r)} y={y} r={r} plain={!labels} />
            ))}
            {labels && (
              <text x={x + side.dx} y={y + side.dy} textAnchor={side.anchor}>
                <tspan className="fill-ink font-sans font-bold" fontSize="15" dy="0">
                  {short(city)}
                </tspan>
                <tspan className="fill-ink-soft font-mono" fontSize="11" x={x + side.dx} dy="15">
                  {people.map((p) => p.name).join(' + ')}
                </tspan>
              </text>
            )}
          </g>
        )
      })}

      {/* where the story is now */}
      {activePerson && (
        <g>
          <circle
            cx={cityXY(activeCity)[0]}
            cy={cityXY(activeCity)[1]}
            r="40"
            fill="none"
            stroke="var(--color-marker)"
            strokeWidth="5"
            className="animate-ping"
            style={{ transformOrigin: `${cityXY(activeCity)[0]}px ${cityXY(activeCity)[1]}px` }}
          />
          <PersonPin p={activePerson} x={cityXY(activeCity)[0]} y={cityXY(activeCity)[1]} r={34} />
        </g>
      )}
    </svg>
  )
}

function SectionHead({ index, label, title, children }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-4">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="mt-4 text-4xl leading-[1.02] font-extrabold tracking-[-0.02em] sm:text-5xl">{title}</h2>
      </Reveal>
      {children && <Reveal className="space-y-5 lg:col-span-8 lg:pt-8">{children}</Reveal>}
    </div>
  )
}

// Hero visual: the twelve modules as stations on one line, with the case ID running along it like a baton
function RelayStrip() {
  return (
    <figure className="relative">
      <p className="mb-3 flex items-center gap-1 font-hand text-2xl font-bold text-marker sm:absolute sm:-top-12 sm:right-6 sm:mb-0 sm:text-3xl">
        twelve modules, one case
        <CurvyArrow draw className="w-10 shrink-0 rotate-[200deg] -scale-x-100 sm:w-12" />
      </p>

      <div className="overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-hard">
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink px-4 py-2.5 font-mono text-[11px] text-ink-soft sm:px-5">
          <span>relay / {story.caseId.toLowerCase()}</span>
          <span className="font-hand text-base font-bold text-marker md:hidden">drag to explore →</span>
          <span className="hidden items-center gap-5 md:flex">
            {groups.map((g) => (
              <span key={g.key} className="flex items-center gap-2">
                <span className={`size-3 rounded-full border-2 border-ink ${g.color}`} /> {g.name.toLowerCase()}
              </span>
            ))}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[900px] px-6 pt-8 pb-10 lg:px-10">
            {/* stations are w-16 and spread edge to edge, so the first and last centres sit 2rem in */}
            <style>{'@keyframes baton { from { left: 2rem } to { left: calc(100% - 2rem) } }'}</style>
            <ol className="relative flex justify-between pt-9">
              {/* the case ID runs above the stations; its dot runs along the track through their centres */}
              <span
                aria-hidden
                className="absolute top-0 -translate-x-1/2 rounded-md border-2 border-ink bg-marker px-2 py-0.5 font-mono text-[10px] font-medium whitespace-nowrap text-white shadow-[2px_2px_0_var(--color-ink)] [animation:baton_16s_linear_infinite]"
              >
                {story.caseId} ↓
              </span>
              <span aria-hidden className="absolute top-[5.125rem] right-8 left-8 h-[3px] -translate-y-1/2 rounded-full bg-ink" />
              <span
                aria-hidden
                className="absolute top-[5.125rem] z-10 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-marker [animation:baton_16s_linear_infinite]"
              />
              {cast.map((m, k) => (
                <li key={m.module} className="flex w-16 flex-col items-center text-center">
                  <span className="h-4 font-mono text-[10px] leading-4 text-ink-soft">{String(k + 1).padStart(2, '0')}</span>
                  <span
                    className={`relative mt-1.5 grid size-12 place-items-center rounded-full border-2 border-ink ${groupOf[m.group].color}`}
                  >
                    <Sketch name={m.icon} className="size-6" />
                  </span>
                  <span className={`mt-3 text-sm leading-tight ${m.who ? 'font-bold' : 'text-ink-soft italic'}`}>{m.who || m.role}</span>
                  <span className="mt-1 font-mono text-[10px] leading-tight text-ink-soft">{m.module.toLowerCase()}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <StickyNote
        tape
        rotate="rotate-3"
        className="relative -mt-6 ml-auto w-fit px-4 py-3 text-2xl font-bold sm:absolute sm:right-8 sm:-bottom-8 sm:mt-0 sm:text-3xl"
      >
        {story.result}
      </StickyNote>
      <figcaption className="sr-only">
        The twelve modules of the platform as stations on one line, with a single case ID passed along all of them.
      </figcaption>
    </figure>
  )
}

const stamps = {
  start: { text: 'case created', className: 'border-ink text-ink' },
  bad: { text: 'denied', className: 'border-marker text-marker' },
  good: { text: 'cleared', className: 'border-emerald-700 text-emerald-700' },
  first: { text: 'first dose', className: 'border-emerald-700 text-emerald-700' },
}

// Number the steps across the acts, and note when the case exists, when each component first appears,
// where and when each event happens, and the time and distance since the one before
const introducedAt = {}
const timeline = (() => {
  let n = 0
  let hasCase = false
  let prev = null
  return story.acts.map((act) => ({
    ...act,
    steps: act.steps.map((step) => {
      n += 1
      if (step.tone === 'start') hasCase = true
      const isModule = cast.some((m) => m.module === step.actor)
      const isNew = isModule && !(step.actor in introducedAt)
      if (isNew) introducedAt[step.actor] = n
      const city = step.city ?? actorOf(step.actor).city
      const ms = Date.parse(step.at)
      const hop = prev && { gap: elapsed(ms - prev.ms), from: prev.city, to: city, miles: miles(prev.city, city) }
      prev = { ms, city }
      return { ...step, n, hasCase, isModule, isNew, known: Object.keys(introducedAt).length, city, ms, local: localTime(step.at), hop }
    }),
  }))
})()
const allSteps = timeline.flatMap((act) => act.steps)
const stepCount = allSteps.length

// Between two events: how much time passed, and how far the case travelled
function Hop({ hop }) {
  return (
    <li aria-hidden className="relative pl-14 sm:pl-20">
      <span className="absolute top-1/2 left-5 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream ring-2 ring-ink sm:left-6" />
      <p className="inline-flex flex-wrap items-center gap-x-2 rounded-full border-2 border-dashed border-ink/25 bg-cream px-3 py-1 font-mono text-[11px] text-ink-soft">
        <span className="font-medium text-ink">+{hop.gap}</span>
        <span>·</span>
        {hop.from === hop.to ? (
          <span>same city, {short(hop.to)}</span>
        ) : (
          <span>
            {short(hop.from)} → {short(hop.to)}, {hop.miles.toLocaleString('en-US')} mi
          </span>
        )}
      </p>
    </li>
  )
}

// Finance's month close, drawn as a small ledger
function Ledger({ rows }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border-2 border-ink/20">
      <p className="border-b-2 border-ink/10 bg-cream px-4 py-1.5 font-mono text-[10px] text-ink-soft">month_close / reconciliation</p>
      <ul className="divide-y divide-dashed divide-ink/15">
        {rows.map((r) => {
          const flagged = r.status.startsWith('flagged')
          return (
            <li key={r.item} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5 text-sm">
              <span>
                <span className="font-semibold">{r.item}</span>
                <span className="text-ink-soft">, {r.note}</span>
              </span>
              <span
                className={`rounded-sm px-1.5 py-0.5 font-mono text-[11px] ${flagged ? 'bg-note-pink text-marker' : 'bg-note-green text-emerald-800'}`}
              >
                {flagged ? '⚑' : '✓'} {r.status}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Analytics: the whole program as a funnel, with Maria as one of the lines that made it through
function Funnel({ stages, note }) {
  const top = stages[0].value
  return (
    <div className="mt-5 rounded-xl border-2 border-ink/20 p-4">
      <p className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-ink-soft">
        <span>program_funnel / all cases</span>
        <span>{note}</span>
      </p>
      <ol className="mt-3 space-y-1.5">
        {stages.map((s) => (
          <li key={s.label} className="grid grid-cols-[minmax(0,9.5rem)_1fr] items-center gap-3 text-xs sm:grid-cols-[11rem_1fr]">
            <span className="truncate text-ink-soft">{s.label}</span>
            <span className="relative h-5 rounded-sm bg-ink/5">
              <span className="absolute inset-y-0 left-0 flex items-center justify-end rounded-sm bg-note-blue pr-1.5 font-mono text-[10px]" style={{ width: `${(s.value / top) * 100}%` }}>
                {s.value.toLocaleString('en-US')}
              </span>
              {/* Maria, one of the lines that made it */}
              <span aria-hidden className="absolute top-1/2 left-1.5 size-2.5 -translate-y-1/2 rounded-full border-2 border-ink bg-marker" />
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
        <span className="size-2.5 rounded-full border-2 border-ink bg-marker" /> Maria, in every stage
      </p>
    </div>
  )
}

// One event on the timeline
function Step({ step }) {
  const actor = actorOf(step.actor)
  const stamp = stamps[step.tone]
  const tz = cities[step.city].tz
  return (
    <li data-step={step.n} className="relative pl-14 sm:pl-20">
      {/* the node on the line */}
      <span
        className={`absolute top-0 left-0 grid size-10 place-items-center rounded-full border-2 border-ink sm:size-12 ${
          step.tone === 'bad' ? 'bg-note-pink' : actor.color
        }`}
      >
        <Sketch name={actor.icon} className="size-5 sm:size-6" />
      </span>

      <p className="flex flex-wrap items-baseline gap-x-3 pt-1.5 sm:pt-2.5">
        <span className="font-mono text-[11px] text-ink-soft">event_{String(step.n).padStart(2, '0')}</span>
        <span className="font-hand text-2xl leading-none font-bold text-marker">{step.when}</span>
      </p>
      {/* where and when, in local time */}
      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="inline-flex items-center gap-1 font-semibold">
          <svg aria-hidden viewBox="0 0 24 24" className="size-4 text-marker" fill="currentColor">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          {step.city}
        </span>
        <span className="font-mono text-[12px] text-ink-soft">
          {step.local.date} · {step.local.time}{' '}
          <span className="rounded-sm px-1 py-px text-ink" style={{ background: tzFill[tz] }}>
            {tz}
          </span>
        </span>
      </p>

      <article className="relative mt-3 rounded-2xl border-2 border-ink bg-paper p-5 shadow-hard sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          {/* who acts: their face when they have one */}
          <p className="flex items-center gap-3 text-sm">
            {faces[actor.who] && (
              <span className={`size-11 shrink-0 overflow-hidden rounded-full border-2 border-ink ${actor.color}`}>
                <Face face={faces[actor.who]} className="size-full" />
              </span>
            )}
            <span>
              <span className="font-bold">{actor.who || actor.role}</span>
              {actor.who && <span className="text-ink-soft">, {actor.role}</span>}
            </span>
          </p>
          {step.hasCase ? (
            <span className="rounded-sm bg-ink px-1.5 py-0.5 font-mono text-[10px] text-cream">{story.caseId}</span>
          ) : (
            <span className="rounded-sm border border-dashed border-ink/40 px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
              no case yet
            </span>
          )}
        </div>

        <h4 className="mt-3 text-2xl leading-tight font-extrabold tracking-tight">{step.title}</h4>
        <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
        {step.visual?.kind === 'ledger' && <Ledger rows={step.visual.rows} />}
        {step.visual?.kind === 'funnel' && <Funnel {...step.visual} />}

        <p className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[11px]">
          {step.isNew && (
            <span className="rounded-sm bg-marker px-1.5 py-0.5 text-white">
              new component · {String(step.known).padStart(2, '0')}/{cast.length}
            </span>
          )}
          <span className="rounded-sm border border-ink/25 px-1.5 py-0.5 text-ink-soft">
            {actor.chip ?? actor.module.toLowerCase()}
          </span>
        </p>

        {stamp && (
          <span
            className={`absolute -top-3 right-5 -rotate-6 rounded-md border-[3px] bg-paper px-2 py-0.5 font-mono text-xs font-bold tracking-widest uppercase ${stamp.className}`}
          >
            {stamp.text}
          </span>
        )}
      </article>
    </li>
  )
}

// Beside the timeline: where the case is and what time it is everywhere, then the ecosystem filling in
// as the story introduces each component
function EcosystemPanel({ active }) {
  const known = cast.filter((m) => introducedAt[m.module] <= active).length
  const current = allSteps.find((s) => s.n === active) ?? allSteps[0]
  const trail = allSteps.filter((s) => s.n <= current.n).map((s) => s.city)
  return (
    <div className="sticky top-24 overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-hard">
      <p className="flex items-center justify-between gap-3 border-b-2 border-ink px-4 py-2 font-mono text-[11px] text-ink-soft">
        <span>where &amp; when / event_{String(current.n).padStart(2, '0')}</span>
        <span className="text-ink">{short(current.city)}</span>
      </p>
      <div className="border-b-2 border-ink bg-dots">
        <USMap labels={false} activeKey={current.actor} activeCity={current.city} trail={trail} className="w-full" />
      </div>
      {/* the same moment on every clock */}
      <ul className="grid grid-cols-4 border-b-2 border-ink text-center">
        {clocksAt(current.ms).map((c) => {
          const here = c.tz === cities[current.city].tz
          return (
            <li key={c.tz} className={`px-1 py-1.5 ${here ? 'font-bold' : 'text-ink-soft'}`} style={here ? { background: tzFill[c.tz] } : undefined}>
              <span className="block font-mono text-[10px]">{c.tz}</span>
              <span className="block text-[13px] leading-tight">{c.time}</span>
            </li>
          )
        })}
      </ul>

      <p className="flex items-center justify-between gap-3 px-4 pt-3 font-mono text-[11px] text-ink-soft">
        <span>ecosystem / what the team knows</span>
        <span className="text-ink">
          {known}/{cast.length}
        </span>
      </p>
      <div className="px-4 pt-2">
        <div aria-hidden className="grid grid-cols-12 gap-1">
          {cast.map((m, k) => (
            <span key={m.module} className={`h-1.5 rounded-full ${k < known ? 'bg-marker' : 'bg-ink/10'}`} />
          ))}
        </div>
      </div>
      <div className="space-y-2.5 px-4 py-3">
        {groups.map((g) => (
          <div key={g.key}>
            <p className="font-mono text-[10px] tracking-wide text-ink-soft uppercase">{g.name}</p>
            <ul className="mt-1 space-y-0.5">
              {cast
                .filter((m) => m.group === g.key)
                .map((m) => {
                  const isKnown = introducedAt[m.module] <= active
                  const isNow = moduleOf(current.actor) === m.module
                  return (
                    <li
                      key={m.module}
                      className={`flex items-center gap-2.5 rounded-lg px-1.5 py-0.5 text-[13px] transition-colors duration-300 ${
                        isNow ? 'bg-note-yellow/70' : ''
                      } ${isKnown ? 'text-ink' : 'text-ink/30'}`}
                    >
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ${
                          isKnown ? `border-ink ${g.color}` : 'border-ink/15 bg-transparent'
                        }`}
                      >
                        <Sketch name={m.icon} className="size-3.5" />
                      </span>
                      <span className={isKnown ? 'font-semibold' : ''}>{m.module}</span>
                      {isNow && <span className="ml-auto font-hand text-lg leading-none font-bold text-marker">now</span>}
                    </li>
                  )
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// The story as a timeline of events, with the ecosystem panel following along on wide screens
function StoryTimeline() {
  const [active, setActive] = useState(1)

  // the step crossing the middle of the screen is the active one
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.step)))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('[data-step]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
      <ol className="relative space-y-10 lg:col-span-8">
        {/* the line every event hangs on */}
        <span aria-hidden className="absolute top-4 bottom-4 left-5 w-[3px] -translate-x-1/2 rounded-full bg-ink sm:left-6" />
        {timeline.map((act) => (
          <li key={act.name}>
            <div className="relative mb-8 pl-14 sm:pl-20">
              <span
                aria-hidden
                className="absolute top-1/2 left-5 size-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-ink bg-marker sm:left-6"
              />
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-hand text-3xl font-bold text-marker">{act.name}</span>
                <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">{act.title}</span>
              </p>
            </div>
            <ol className="space-y-6">
              {act.steps.map((step) => (
                <Fragment key={step.n}>
                  {step.hop && <Hop hop={step.hop} />}
                  <Step step={step} />
                </Fragment>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <aside className="hidden lg:col-span-4 lg:block">
        <EcosystemPanel active={active} />
      </aside>
    </div>
  )
}

// Card thumbnail: the whole case on the map, its trail through every city, Maria at home in Denver
export function AccessThumb({ className = '' }) {
  return (
    <USMap
      labels={false}
      activeKey="Patient portal"
      activeCity="Denver, CO"
      trail={allSteps.map((s) => s.city)}
      className={className}
    />
  )
}

// Hero visual: the twelve modules as one relay line
export function AccessVisual() {
  return <RelayStrip />
}

export default function AccessStudy() {
  return (
    <>
      {/* 01 Cold open */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="01" label="cold_open" title="Why this is hard">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{story.hurdles.lead}</p>
          </SectionHead>

          <Reveal className="mt-14 lg:mt-16">
            <div className="relative rounded-2xl border-2 border-dashed border-ink/25 px-5 pt-14 pb-8 sm:px-8 sm:pb-10">
              <p className="absolute -top-3 left-5 bg-cream px-2 font-mono text-[11px] text-ink-soft">
                before_the_first_dose / {story.hurdles.items.length} hurdles
              </p>
              <ol className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {story.hurdles.items.map((h, k) => (
                  <li key={h.title} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)]">
                    <StickyNote color="bg-note-yellow" rotate={tilts[k % 5]} className="flex h-full min-h-48 flex-col p-4 sm:p-5">
                      <span className="font-mono text-[10px] font-medium tracking-wide text-ink/60">hurdle_{String(k + 1).padStart(2, '0')}</span>
                      <span className="mt-auto pt-6 text-2xl leading-tight font-bold">{h.title}</span>
                      <span className="mt-2 font-sans text-[13px] leading-snug text-ink-soft">{h.text}</span>
                    </StickyNote>
                  </li>
                ))}
              </ol>
              <p className="mt-10 text-center font-hand text-3xl leading-tight font-bold text-marker sm:text-4xl">
                {story.hurdles.punchline}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 The real problem */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="02" label="the_real_problem" title="Weeks of trying, no big picture">
            {story.problem.text.map((para, k) => (
              <p
                key={k}
                className={k === 0 ? 'text-xl leading-snug sm:text-2xl lg:text-[1.75rem]' : 'text-lg leading-relaxed text-ink-soft sm:text-xl'}
              >
                {para}
              </p>
            ))}
          </SectionHead>

          <ul className="mt-14 grid gap-5 sm:grid-cols-3 lg:mt-16">
            {[
              { value: '20+', label: 'modules' },
              { value: '35', label: 'people, each owning a piece' },
              { value: '2-3 wks', label: "the team spent without a bird's-eye view" },
            ].map((s, k) => (
              <Reveal as="li" key={s.label} delay={k * 100}>
                <div className="rounded-2xl border-2 border-ink bg-paper p-6 shadow-hard">
                  <span className="block text-5xl font-extrabold tracking-tight">{s.value}</span>
                  <span className="mt-2 block text-ink-soft">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 Approach */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="03" label="approach" title="How I built the story">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{story.approach.statement}</p>
            <ul className="flex flex-wrap gap-2">
              {story.approach.methods.map((m) => (
                <li key={m} className="rounded-full border-2 border-ink/25 px-3 py-1 font-mono text-xs">
                  {m.toLowerCase()}
                </li>
              ))}
            </ul>
          </SectionHead>

          {/* the approach in one line: person + place + time */}
          <Reveal className="mt-14 lg:mt-16">
            <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
              {story.approach.pillars.map((pillar, k) => (
                <Fragment key={pillar.title}>
                  {k > 0 && (
                    <li aria-hidden className="text-center font-hand text-4xl font-bold text-marker">
                      +
                    </li>
                  )}
                  <li className="flex flex-1 items-start gap-4 rounded-2xl border-2 border-ink bg-paper p-5 shadow-hard">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-note-yellow">
                      <Sketch name={pillar.icon} className="size-6" />
                    </span>
                    <span>
                      <span className="block text-xl font-extrabold tracking-tight">{pillar.title}</span>
                      <span className="mt-1 block text-sm leading-snug text-ink-soft">{pillar.text}</span>
                    </span>
                  </li>
                </Fragment>
              ))}
              <li aria-hidden className="text-center font-hand text-4xl font-bold text-marker">
                =
              </li>
              <li className="sticky-note -rotate-2 bg-note-green p-5 lg:max-w-[13rem]">
                <span className="block font-hand text-3xl leading-tight font-bold">{story.approach.pillarsResult}</span>
              </li>
            </ol>
          </Reveal>

          {/* the process, step by step */}
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {story.approach.process.map((step, k) => (
              <Reveal as="li" key={step.title} delay={k * 100} className="relative">
                <p className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full border-2 border-ink bg-note-yellow font-mono text-sm font-bold">
                    {k + 1}
                  </span>
                  <span aria-hidden className="h-0.5 flex-1 border-t-2 border-dashed border-ink/25" />
                </p>
                <h3 className="mt-4 text-xl font-extrabold tracking-tight">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
              </Reveal>
            ))}
          </ol>

          {/* a sample of the persona interviews */}
          <Reveal className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <p className="font-hand text-3xl leading-tight font-bold text-marker">How I learned the domain: by interviewing the cast.</p>
              <p className="mt-2 text-sm text-ink-soft">An illustrative exchange, in the style of the AI persona interviews.</p>
            </div>
            <div className="rounded-2xl border-2 border-ink bg-paper shadow-hard lg:col-span-8">
              <p className="border-b-2 border-ink px-4 py-2 font-mono text-[11px] text-ink-soft">persona_interview / priya, hub coordinator</p>
              <ul className="space-y-3 p-4 sm:p-5">
                {story.approach.interview.map((line, k) => {
                  const mine = line.who === 'me'
                  return (
                    <li key={k} className={`flex items-end gap-2.5 ${mine ? 'justify-end' : ''}`}>
                      {!mine && (
                        <span className="size-8 shrink-0 overflow-hidden rounded-full border-2 border-ink bg-note-blue">
                          <Face face={faces[line.who]} className="size-full" />
                        </span>
                      )}
                      <span
                        className={`max-w-[85%] rounded-2xl px-4 py-2 text-[15px] leading-snug ${
                          mine ? 'rounded-br-sm bg-ink text-cream' : 'rounded-bl-sm border-2 border-ink/15 bg-cream'
                        }`}
                      >
                        {line.text}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-20 mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Four rules the story follows</h3>
          </Reveal>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {story.approach.rules.map((r, k) => (
              <Reveal as="li" key={r.title} delay={k * 100}>
                <article className="h-full rounded-2xl border-2 border-ink bg-paper p-6 shadow-hard">
                  <p className="font-hand text-4xl leading-none font-bold text-marker">rule {k + 1}</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{r.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{r.text}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 Where everyone is */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="04" label="where_everyone_is" title="One case, twelve cities">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{story.geography.lead}</p>
            <p className="font-hand text-2xl font-bold text-marker">{story.geography.note}</p>
          </SectionHead>

          <div className="mt-14 space-y-12 lg:mt-16">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-hard">
                <p className="flex items-center justify-between gap-4 border-b-2 border-ink px-4 py-2.5 font-mono text-[11px] text-ink-soft sm:px-5">
                  <span>
                    the_cast / {new Set(mapPeople.map((p) => p.city)).size} cities · {tzOrder.length} time zones
                  </span>
                  <span className="font-hand text-base font-bold text-marker md:hidden">drag to explore →</span>
                </p>
                <div className="overflow-x-auto bg-dots">
                  <USMap className="mx-auto w-full max-w-5xl min-w-[680px]" />
                </div>
                <div className="flex flex-wrap items-center gap-2 border-t-2 border-ink px-4 py-3 sm:px-5">
                  <span className="mr-1 font-mono text-[11px] text-ink-soft">all six parties are in the story:</span>
                  {parties.map((party) => (
                    <span key={party} className="rounded-full border-2 border-ink/20 px-2.5 py-0.5 text-xs">
                      <span className="font-semibold">{party}</span>{' '}
                      <span className="text-ink-soft">
                        {mapPeople
                          .filter((p) => p.party === party)
                          .map((p) => p.name)
                          .join(', ')}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* the same cast, as a list by time zone */}
            <Reveal delay={100} className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {tzOrder.map((tz) => (
                <div key={tz}>
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-ink-soft uppercase">
                    <span className="size-3 rounded-sm border-2 border-ink" style={{ background: tzFill[tz] }} />
                    {tzNames[tz]} time · {tz}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {mapPeople
                      .filter((p) => cities[p.city].tz === tz)
                      .map((p) => (
                        <li key={p.key} className="flex items-center gap-3">
                          <span className="size-9 shrink-0 overflow-hidden rounded-full border-2 border-ink" style={{ background: p.fill }}>
                            {p.face ? (
                              <Face face={p.face} className="size-full" />
                            ) : (
                              <Sketch name={p.icon} className="m-auto mt-[5px] size-5" />
                            )}
                          </span>
                          <span className="text-sm leading-tight">
                            <span className="font-bold">{p.name}</span>
                            {p.role && <span className="text-ink-soft">, {p.role}</span>}
                            <span className="block text-ink-soft">
                              {short(p.city)} · {p.org}
                            </span>
                            <span className="mt-1 inline-block rounded-sm border border-ink/25 px-1 font-mono text-[10px] text-ink-soft">
                              {p.party.toLowerCase()}
                            </span>
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 The story, event by event */}
      <section id="story" className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="05" label="the_story" title="Maria's case, event by event">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">
              {stepCount} events, in the order they happen. Follow the case across cities and time zones, and watch each
              one bring in a new part of the ecosystem until the team has met all {cast.length}.
            </p>
            <p className="text-sm text-ink-soft">
              A composite story. Every person, place, time and number in it is illustrative. Times are local to where each event
              happens.
            </p>
          </SectionHead>

          <StoryTimeline />
        </div>
      </section>

      {/* the finale: everyone was holding the same case */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28">
        <div aria-hidden className="absolute inset-0 bg-dots-light" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-4xl">
            <p className="font-hand text-3xl font-bold text-note-yellow">{story.finale.lead}</p>
            <p className="mt-4 text-xl leading-snug text-cream/80 sm:text-2xl">{story.finale.text}</p>
          </Reveal>

          <Reveal as="ul" className="mt-12 grid gap-px overflow-hidden rounded-2xl border-2 border-cream/20 bg-cream/20 sm:grid-cols-2 lg:grid-cols-4">
            {story.finale.stats.map((s) => (
              <li key={s.label} className="bg-ink p-5 sm:p-6">
                <span className="block text-4xl font-extrabold tracking-tight text-note-yellow sm:text-5xl">{s.value}</span>
                <span className="mt-2 block font-semibold">{s.label}</span>
                <span className="mt-1 block text-sm text-cream/60">{s.note}</span>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-14 max-w-5xl">
            <p className="text-4xl leading-[1.05] font-extrabold tracking-[-0.02em] sm:text-6xl">{story.finale.quote}</p>
            <p className="mt-6 font-hand text-4xl font-bold text-note-yellow sm:text-5xl">{story.finale.kicker}</p>
          </Reveal>
        </div>
      </section>

      {/* 06 Domain KT: the story in front of the team */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead index="06" label="domain_kt" title="One story, in front of the whole team">
            <p className="text-xl leading-snug sm:text-2xl lg:text-[1.75rem]">{story.kt.lead}</p>
            <p className="text-lg leading-relaxed text-ink-soft sm:text-xl">{story.kt.text}</p>
          </SectionHead>

          <ol className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">
            {story.kt.takeaways.map((t, k) => (
              <Reveal as="li" key={t.title} delay={k * 100}>
                <StickyNote color={['bg-note-yellow', 'bg-note-blue', 'bg-note-green'][k]} rotate={tilts[k]} className="h-full p-6">
                  <span className="block font-mono text-[10px] font-medium text-ink/60">the team now knows</span>
                  <span className="mt-3 block text-3xl leading-tight font-bold">{t.title}</span>
                  <span className="mt-2 block font-sans text-base leading-relaxed text-ink-soft">{t.text}</span>
                </StickyNote>
              </Reveal>
            ))}
          </ol>

        </div>
      </section>

      {/* 07 Outcome and 08 What I learned */}
      <Outcome outcome={story.outcome} index="07" />
      {/* what the team said */}
      <section className="border-t-2 border-dashed border-ink/15 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-hand text-3xl font-bold text-marker">{story.voices.lead}</p>
          </Reveal>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {story.voices.quotes.map((q, k) => (
              <Reveal as="li" key={q.name} delay={k * 100}>
                <StickyNote color={['bg-note-yellow', 'bg-note-blue', 'bg-note-green'][k]} rotate={tilts[k]} className="flex h-full flex-col p-6">
                  <span aria-hidden className="font-hand text-6xl leading-none text-ink/30">&ldquo;</span>
                  <blockquote className="-mt-4 font-sans text-lg leading-relaxed">{q.text}</blockquote>
                  <span className="mt-auto flex items-center gap-3 pt-6">
                    <span className="grid size-10 place-items-center rounded-full border-2 border-ink bg-paper font-bold">{q.name[0]}</span>
                    <span className="font-sans font-bold">{q.name}</span>
                  </span>
                </StickyNote>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Learned learned={story.learned} index="08" />
    </>
  )
}
