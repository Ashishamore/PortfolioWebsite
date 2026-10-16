import { useEffect, useState } from 'react'
import { colorOf } from './casestudy/personaColors'

// Swimlane journey map for the case-study hero.
// Columns are stages (time), rows are personas. One patient's case travels across the lanes;
// a dotted detour shows denial -> appeal; dotted drops show data flowing to the manufacturer.

const W = 1100
const LABEL_W = 190
const HEAD_H = 70
const LANE_H = 72

// smooth S-curve between two points with horizontal tangents
const link = (a, b) => {
  const dx = (b.x - a.x) / 2
  return `C${a.x + dx} ${a.y} ${b.x - dx} ${b.y} ${b.x} ${b.y}`
}

function Pin({ px, py }) {
  // tip at (px, py)
  return (
    <g transform={`translate(${px} ${py})`}>
      <path
        d="M0 0s-12-13-12-23a12 12 0 0 1 24 0c0 10-12 23-12 23z"
        className="fill-paper stroke-ink"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cy="-23" r="4" className="fill-ink" />
    </g>
  )
}

export default function JourneyMap({ journey, className = '' }) {
  const { stages, lanes, path, detour } = journey
  const COL_W = (W - LABEL_W - 20) / stages.length
  const x = (at) => LABEL_W + COL_W / 2 + at * COL_W
  const laneY = Object.fromEntries(lanes.map((l, i) => [l.name, HEAD_H + LANE_H / 2 + i * LANE_H]))
  const H = HEAD_H + lanes.length * LANE_H + 16

  const pts = path.map((p) => ({ ...p, x: x(p.at), y: laneY[p.lane] }))
  const main = `M${pts[0].x} ${pts[0].y}` + pts.slice(1).map((p, i) => link(pts[i], p)).join('')

  // detour leaves one step and rejoins a later one, via the appeal
  const from = pts[detour.from]
  const to = pts[detour.to]
  const appeal = { x: x(detour.appeal.at), y: laneY[detour.appeal.lane] }
  const denied = { x: (from.x + appeal.x) / 2, y: (from.y + appeal.y) / 2 }
  const detourPath = `M${from.x} ${from.y}${link(from, appeal)}${link(appeal, to)}`

  const end = pts[pts.length - 1]
  const dataLane = lanes.find((l) => l.receivesData)?.name

  // the travelling patient dot is decoration, so skip it for people who prefer less motion
  const [motion, setMotion] = useState(false)
  useEffect(() => {
    setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-labelledby="journey-map-title">
      <title id="journey-map-title">
        One patient&apos;s case moving across {lanes.map((l) => l.name).join(', ')} through {stages.join(', ')}
      </title>

      {/* lanes */}
      {lanes.map((lane, i) => {
        const top = HEAD_H + i * LANE_H
        return (
          <g key={lane.name}>
            <rect
              x="0"
              y={top}
              width={W}
              height={LANE_H}
              fill={lane.main ? 'var(--color-note-pink)' : 'var(--color-ink)'}
              opacity={lane.main ? 0.35 : i % 2 ? 0.025 : 0}
            />
            <line x1="0" x2={W} y1={top} y2={top} className="stroke-ink/10" strokeWidth="1" />
            <rect
              x="22"
              y={top + LANE_H / 2 - 8}
              width="16"
              height="16"
              rx="3"
              fill={colorOf(lane.name).fill}
              className="stroke-ink"
              strokeWidth="1.5"
              transform={`rotate(-6 30 ${top + LANE_H / 2})`}
            />
            <text x="48" y={top + LANE_H / 2 + (lane.main ? -2 : 5)} className="fill-ink font-sans text-[15px] font-bold">
              {lane.name}
            </text>
            {lane.main && (
              <text x="48" y={top + LANE_H / 2 + 15} className="fill-marker font-mono text-[10px] font-medium">
                main user
              </text>
            )}
          </g>
        )
      })}

      {/* stage columns */}
      {stages.map((stage, k) => (
        <g key={stage}>
          {k > 0 && (
            <line
              x1={LABEL_W + k * COL_W}
              x2={LABEL_W + k * COL_W}
              y1={HEAD_H - 10}
              y2={H - 16}
              className="stroke-ink/15"
              strokeWidth="1.5"
              strokeDasharray="3 6"
            />
          )}
          <text x={x(k)} y="30" textAnchor="middle" className="fill-marker font-mono text-[11px] font-medium">
            {String(k + 1).padStart(2, '0')}
          </text>
          <text x={x(k)} y="50" textAnchor="middle" className="fill-ink font-sans text-[15px] font-bold">
            {stage}
          </text>
        </g>
      ))}
      <text x="22" y="46" className="fill-ink-soft font-hand text-[22px] font-bold">
        time →
      </text>

      {/* data dropping to the manufacturer from each milestone */}
      {dataLane &&
        pts
          .filter((p) => Number.isInteger(p.at) && p.lane !== dataLane)
          .map((p) => (
            <g key={`data-${p.at}`} className="journey-fade" style={{ animationDelay: '2.2s' }}>
              <line
                x1={p.x}
                x2={p.x}
                y1={p.y + 14}
                y2={laneY[dataLane] - 6}
                className="stroke-ink/30"
                strokeWidth="1.5"
                strokeDasharray="1 5"
                strokeLinecap="round"
              />
              <circle cx={p.x} cy={laneY[dataLane]} r="4" className="fill-ink/40" />
            </g>
          ))}
      {dataLane && (
        <g className="journey-fade" style={{ animationDelay: '2.4s' }}>
          {[10, 18, 13, 24].map((h, k) => (
            <rect
              key={k}
              x={end.x + 22 + k * 11}
              y={laneY[dataLane] + 12 - h}
              width="7"
              height={h}
              rx="1.5"
              className="fill-ink"
            />
          ))}
          <text x={end.x - 14} y={laneY[dataLane] + 6} textAnchor="end" className="fill-ink-soft font-hand text-[18px] font-bold">
            analytics
          </text>
        </g>
      )}

      {/* detour: denied -> appeal -> rejoin */}
      <g className="journey-fade" style={{ animationDelay: '1.6s' }}>
        <path d={detourPath} fill="none" className="stroke-ink" strokeWidth="2.5" strokeDasharray="6 7" strokeLinecap="round" />
        <circle cx={denied.x} cy={denied.y} r="11" className="fill-paper stroke-marker" strokeWidth="2.5" />
        <path
          d={`M${denied.x - 4.5} ${denied.y - 4.5}l9 9m0-9l-9 9`}
          className="stroke-marker"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text x={denied.x - 16} y={denied.y + 6} textAnchor="end" className="fill-marker font-hand text-[20px] font-bold">
          denied
        </text>
        <rect
          x={appeal.x - 11}
          y={appeal.y - 11}
          width="22"
          height="22"
          rx="5"
          className="fill-paper stroke-ink"
          strokeWidth="2.5"
        />
        <path
          d={`M${appeal.x - 5} ${appeal.y}l3.5 3.5 6.5-7`}
          fill="none"
          className="stroke-ink"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x={appeal.x} y={appeal.y - 18} textAnchor="middle" className="fill-ink font-hand text-[20px] font-bold">
          appeal
        </text>
      </g>

      {/* the case: one continuous path across the lanes, drawn in on load */}
      <path id="journey-case" d={main} pathLength="1" fill="none" className="journey-draw stroke-ink" strokeWidth="4" strokeLinecap="round" />

      {/* ongoing adherence after therapy starts */}
      <g className="journey-fade" style={{ animationDelay: '2s' }}>
        <path
          d={`M${end.x + 14} ${end.y}H${W - 28}`}
          fill="none"
          className="stroke-ink"
          strokeWidth="2.5"
          strokeDasharray="6 7"
          strokeLinecap="round"
        />
        <path d={`M${W - 36} ${end.y - 7}l8 7-8 7`} fill="none" className="stroke-ink" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x={W - 28} y={end.y + 27} textAnchor="end" className="fill-ink-soft font-hand text-[18px] font-bold">
          refills + adherence
        </text>
      </g>

      {/* steps: places are pins (geography), handoffs are small dots */}
      {pts.map((p, k) => (
        <g key={k} className="journey-pop" style={{ animationDelay: `${0.4 + (k / pts.length) * 1.4}s` }}>
          {p.place ? (
            <>
              <Pin px={p.x} py={p.y + 6} />
              <text x={p.x + 18} y={p.y - 14} className="fill-ink font-hand text-[19px] font-bold">
                {p.place}
              </text>
            </>
          ) : (
            <circle
              cx={p.x}
              cy={p.y}
              r={Number.isInteger(p.at) ? 10 : 6.5}
              fill={Number.isInteger(p.at) ? 'var(--color-paper)' : 'var(--color-ink)'}
              className="stroke-ink"
              strokeWidth="2.5"
            />
          )}
        </g>
      ))}

      {/* the patient, travelling along their case */}
      {motion && (
        <circle r="6" opacity="0" className="fill-marker stroke-paper" strokeWidth="2">
          <set attributeName="opacity" to="1" begin="2.2s" />
          <animateMotion dur="9s" begin="2.2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#journey-case" />
          </animateMotion>
        </circle>
      )}
    </svg>
  )
}
