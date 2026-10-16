// "[01] context" style label above each case-study section heading
export default function SectionLabel({ index, children }) {
  return (
    <p className="font-mono text-xs tracking-wide text-ink-soft">
      <span className="text-marker">[{index}]</span> {children}
    </p>
  )
}
