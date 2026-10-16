import { colorOf } from './personaColors'

// Where everyone in Maria's story sits: a hand-drawn map of the eastern US, split by time zone,
// with the hub in Dallas connected to everyone else.

const W = 800
const H = 430
// simple equirectangular projection of the eastern US
const px = (lon) => 40 + (lon + 100) * 24
const py = (lat) => 30 + (44.5 - lat) * 28

// label placement per city: which side of the pin, and a nudge
const labelSide = {
  'Hartford, CT': { anchor: 'end', dx: -20, dy: -6 },
  'Cincinnati, OH': { anchor: 'start', dx: 18, dy: 30 },
  'Chicago, IL': { anchor: 'start', dx: 20, dy: -10 },
  'Columbus, OH': { anchor: 'start', dx: 24, dy: 2 },
  'Memphis, TN': { anchor: 'start', dx: 20, dy: 4 },
  'Dallas, TX': { anchor: 'start', dx: 20, dy: 4 },
}

export default function CastMap({ cast, className = '' }) {
  // group the cast by city so Columbus shows Maria and her doctor together
  const cities = []
  for (const c of cast) {
    let city = cities.find((x) => x.city === c.city)
    if (!city) cities.push((city = { city: c.city, tz: c.tz, x: px(c.lon), y: py(c.lat), people: [] }))
    city.people.push(c)
  }
  const hub = cities.find((c) => c.people.some((p) => p.persona === 'Hub'))
  const tzX = [px(-86.6), px(-85.2)]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-labelledby="cast-map-title">
      <title id="cast-map-title">
        Map of the cast: {cities.map((c) => `${c.people.map((p) => p.persona).join(' and ')} in ${c.city}`).join('; ')}
      </title>

      {/* time zones */}
      <path d={`M0 0H${tzX[0]}L${tzX[1]} ${H}H0z`} className="fill-note-blue/25" />
      <path
        d={`M${tzX[0]} 0C${tzX[0] + 6} ${H * 0.35} ${tzX[1] - 8} ${H * 0.6} ${tzX[1]} ${H}`}
        fill="none"
        className="stroke-ink/30"
        strokeWidth="2"
        strokeDasharray="6 7"
      />
      <text x={tzX[0] - 16} y="30" textAnchor="end" className="fill-ink-soft font-mono text-[13px] font-medium">
        CENTRAL TIME
      </text>
      <text x={tzX[0] + 16} y="30" className="fill-ink-soft font-mono text-[13px] font-medium">
        EASTERN TIME
      </text>

      {/* the hub connects everyone */}
      {hub &&
        cities
          .filter((c) => c !== hub)
          .map((c) => {
            const mx = (hub.x + c.x) / 2
            const my = Math.min(hub.y, c.y) - 40
            return (
              <path
                key={c.city}
                d={`M${hub.x} ${hub.y}Q${mx} ${my} ${c.x} ${c.y}`}
                fill="none"
                className="stroke-ink/45"
                strokeWidth="2"
                strokeDasharray="2 6"
                strokeLinecap="round"
              />
            )
          })}

      {/* cities */}
      {cities.map((c) => {
        const side = labelSide[c.city] ?? { anchor: 'start', dx: 20, dy: 4 }
        return (
          <g key={c.city}>
            {c.people.map((p, k) => (
              <circle
                key={p.persona + k}
                cx={c.x + k * 14}
                cy={c.y}
                r="12"
                fill={colorOf(p.persona).fill}
                className="stroke-ink"
                strokeWidth="2.5"
              />
            ))}
            <text
              x={c.x + side.dx + (side.anchor === 'start' ? (c.people.length - 1) * 14 : 0)}
              y={c.y + side.dy}
              textAnchor={side.anchor}
              className="fill-ink font-sans text-[26px] font-bold sm:text-[17px]"
            >
              {c.city}
            </text>
            <text
              x={c.x + side.dx + (side.anchor === 'start' ? (c.people.length - 1) * 14 : 0)}
              y={c.y + side.dy + 18}
              textAnchor={side.anchor}
              className="hidden fill-ink-soft font-mono text-[12px] sm:block"
            >
              {c.people.map((p) => (p.persona === 'Manufacturer' && c.tz === 'ET' ? 'Manufacturer (field)' : p.persona)).join(' + ')}
            </text>
          </g>
        )
      })}

      {/* annotations */}
      {hub && (
        <text x={hub.x - 30} y={hub.y + 52} className="fill-marker font-hand text-[30px] font-bold sm:text-[21px]">
          every handoff runs through here
        </text>
      )}
    </svg>
  )
}
