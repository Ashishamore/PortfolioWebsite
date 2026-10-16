// One sticky-note colour per persona, used everywhere on the case-study page
// so a persona reads the same in the journey map, the persona notes and the story.
export const personaColors = {
  Provider: { bg: 'bg-note-yellow', fill: 'var(--color-note-yellow)' },
  Hub: { bg: 'bg-note-pink', fill: 'var(--color-note-pink)' },
  'Specialty Pharmacy': { bg: 'bg-note-blue', fill: 'var(--color-note-blue)' },
  Payer: { bg: 'bg-note-green', fill: 'var(--color-note-green)' },
  Manufacturer: { bg: 'bg-note-lilac', fill: 'var(--color-note-lilac)' },
  Patient: { bg: 'bg-note-orange', fill: 'var(--color-note-orange)' },
  Platform: { bg: 'bg-paper', fill: 'var(--color-paper)' },
}

export const colorOf = (persona) => personaColors[persona] ?? personaColors.Platform
