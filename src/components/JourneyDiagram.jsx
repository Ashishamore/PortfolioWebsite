// One patient's path through the system: a main journey line with stops, location pins for
// geography, and a dotted denial -> appeal detour that drops away and rejoins the main path.
// Without `stages` it's the compact thumbnail (grey label bars); with `stages` each stop gets a name.

const ink = {
  className: 'stroke-ink',
  fill: 'none',
  strokeWidth: 2.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Location pin, tip at (0, 0)
function Pin({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M0 0s-11-12-11-21a11 11 0 0 1 22 0c0 9-11 21-11 21z"
        className="fill-paper stroke-ink"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <circle cy="-21" r="3.5" className="fill-ink" />
    </g>
  )
}

export default function JourneyDiagram({ stages, className = '' }) {
  const labelled = Boolean(stages)
  const gap = labelled ? 160 : 80
  const xs = [0, 1, 2, 3, 4].map((k) => 40 + k * gap)
  const end = xs[4]

  // detour leaves just after stop 1 and rejoins just before stop 3
  const out = xs[1] + gap / 4
  const back = xs[3] - gap / 4
  const denied = out + 36
  const appeal = back - 36

  // labelled: pin, then the stage name, then the stop. Compact: pins sit right on top of the stops.
  const pinTip = labelled ? 74 : 98
  const pinned = [2, 3, 4]

  return (
    <svg
      viewBox={labelled ? `-30 30 ${end + 100} 200` : `14 52 ${end + 12} 172`}
      className={className}
      aria-hidden
    >
      {/* the patient */}
      <circle cx={xs[0]} cy={pinTip - 28} r="8" {...ink} />
      <path d={`M${xs[0] - 14} ${pinTip + 2}c2-11 8-16 14-16s12 5 14 16`} {...ink} />

      {/* places along the way */}
      {pinned.map((k) => (
        <g key={k}>
          <Pin x={xs[k]} y={labelled ? pinTip : k === 3 ? pinTip - 10 : pinTip} />
          <path
            d={`M${xs[k]} ${(labelled ? pinTip : k === 3 ? pinTip - 10 : pinTip) + 4}V${labelled ? 88 : 108}`}
            {...ink}
            strokeDasharray="2 4"
          />
        </g>
      ))}

      {/* detour: denial -> appeal */}
      <path
        d={`M${out} 121c0 40 12 64 30 64H${back - 30}c18 0 30-24 30-64`}
        {...ink}
        strokeDasharray="5 6"
      />
      <circle cx={denied} cy="185" r="9" className="fill-paper stroke-marker" strokeWidth="2.25" />
      <path
        d={`M${denied - 4} 181l8 8m0-8l-8 8`}
        className="stroke-marker"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <rect x={appeal - 9} y="176" width="18" height="18" rx="4" className="fill-paper stroke-ink" strokeWidth="2.25" />
      <path d={`M${appeal - 4.5} 185l3 3 6-6`} {...ink} />
      <text x={denied} y="215" textAnchor="middle" className={`fill-marker font-hand font-bold ${labelled ? 'text-[26px] sm:text-[17px]' : 'text-[17px]'}`}>
        denied
      </text>
      <text x={appeal} y="215" textAnchor="middle" className={`fill-ink font-hand font-bold ${labelled ? 'text-[26px] sm:text-[17px]' : 'text-[17px]'}`}>
        appeal
      </text>

      {/* main journey */}
      <path d={`M${xs[0] - 12} 120H${end + 12}`} {...ink} />
      {xs.map((x, k) => (
        <circle
          key={x}
          cx={x}
          cy="120"
          r="9"
          className={k === 0 ? 'fill-ink stroke-ink' : k === 4 ? 'fill-note-green stroke-ink' : 'fill-paper stroke-ink'}
          strokeWidth="2.25"
        />
      ))}

      {/* stage names are bigger in viewBox units on phones, where the whole diagram is scaled down to fit */}
      {labelled
        ? stages.map((name, k) => (
            <text
              key={name}
              x={xs[k]}
              y="102"
              textAnchor="middle"
              className="fill-ink-soft font-mono text-[22px] font-medium sm:text-[12px]"
            >
              {name}
            </text>
          ))
        : [0, 2, 4].map((k) => (
            <rect key={k} x={xs[k] - 18} y="140" width="36" height="5" rx="2.5" className="fill-ink/20" />
          ))}
    </svg>
  )
}
