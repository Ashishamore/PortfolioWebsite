// The Workive! design system, documented from the prototype's own code (Tailwind classes, ui.tsx, page copy).
// Colours are Tailwind's palette; Tailwind v4 defines them in OKLCH, so hex values are shown for reference.

export const designSystem = {
  lead: "Workive! is used on location, often outdoors and in a hurry. The system is built for that: a calm dark base, one colour for action, and status colours that always mean the same thing.",

  principles: [
    { title: 'Glanceable on a shoot', text: 'Dark surfaces, high-contrast text and short labels, readable in a second between frames.' },
    { title: 'One colour for action', text: 'Indigo is reserved for what you can tap or what is selected. Nothing decorative uses it.' },
    { title: 'Status has meaning', text: 'Green, amber and rose always mean available or settled, waiting, and late or declined.' },
  ],

  colors: {
    primary: {
      label: 'Primary · indigo',
      note: 'Buttons, active tabs, selected chips, toggles, focus rings and links.',
      swatches: [
        { name: 'Primary', token: 'indigo-500', hex: '#6366F1', use: 'Primary buttons, active chips, toggles on' },
        { name: 'Primary hover', token: 'indigo-400', hex: '#818CF8', use: 'Hover, active tab icon, focus ring' },
        { name: 'Primary soft', token: 'indigo-300', hex: '#A5B4FC', use: 'Text on tinted indigo, occupied days' },
      ],
    },
    secondary: {
      label: 'Secondary · amber',
      note: 'The one warm highlight: what needs your answer, ratings and money you owe.',
      swatches: [
        { name: 'Secondary', token: 'amber-400', hex: '#FBBF24', use: 'Answer button, star ratings, "you owe"' },
        { name: 'Secondary soft', token: 'amber-300', hex: '#FCD34D', use: 'Text on tinted amber, Expert badge' },
      ],
    },
    neutrals: {
      label: 'Neutrals · slate',
      note: 'The dark base and its text layers. Most screens use only these and the primary.',
      swatches: [
        { name: 'Background', token: 'slate-950', hex: '#020617', use: 'App background' },
        { name: 'Raised', token: 'slate-900', hex: '#0F172A', use: 'Bottom sheets, menus, dialogs' },
        { name: 'Divider', token: 'slate-700', hex: '#334155', use: 'Strong separators' },
        { name: 'Text muted', token: 'slate-500', hex: '#64748B', use: 'Hints, timestamps, placeholders' },
        { name: 'Text secondary', token: 'slate-400', hex: '#94A3B8', use: 'Supporting text, inactive tabs' },
        { name: 'Text body', token: 'slate-300', hex: '#CBD5E1', use: 'Body copy on dark' },
        { name: 'Text primary', token: 'white', hex: '#FFFFFF', use: 'Titles, values, primary text' },
      ],
    },
    semantic: {
      label: 'Semantic',
      note: 'Each status keeps its colour on every screen: day pills, invites, money and errors.',
      swatches: [
        { name: 'Success', token: 'emerald-500 / 300', hex: '#10B981', use: 'Available, accepted, profit, settled' },
        { name: 'Warning', token: 'amber-500 / 300', hex: '#F59E0B', use: 'Response awaited, payment due' },
        { name: 'Danger', token: 'rose-500 / 400', hex: '#F43F5E', use: 'Declined, late payment, delete, errors' },
        { name: 'Info', token: 'sky-500 / 300', hex: '#0EA5E9', use: 'Informational tags, Intermediate level' },
      ],
    },
    surfaces: {
      label: 'Surfaces + overlays',
      note: 'Depth comes from translucent white on the dark base, not from shadows.',
      swatches: [
        { name: 'Card', token: 'white / 5%', hex: 'rgba(255,255,255,0.05)', use: 'Cards, inputs, secondary buttons' },
        { name: 'Card hover', token: 'white / 10%', hex: 'rgba(255,255,255,0.10)', use: 'Hover and pressed states' },
        { name: 'Border', token: 'white / 10%', hex: 'rgba(255,255,255,0.10)', use: 'Card and input outlines' },
        { name: 'Scrim', token: 'black / 60% + blur', hex: 'rgba(0,0,0,0.60)', use: 'Behind sheets and dialogs' },
      ],
    },
  },

  type: {
    family: 'System UI stack',
    stack: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    why: 'Uses the phone\'s own font: SF Pro on iPhone, Roboto on Android. It loads instantly, renders sharply at small sizes and feels native.',
    scale: [
      { name: 'Display', size: 24, weight: 600, line: '1.25', sample: '₹22,000', use: 'A fee or payment in focus' },
      { name: 'Title', size: 20, weight: 600, line: '1.3', sample: 'Schedule', use: 'Screen titles, profit to date' },
      { name: 'Heading', size: 14, weight: 600, line: '1.4', sample: 'Waiting for your answer', use: 'Section headings, card titles' },
      { name: 'Body', size: 12, weight: 400, line: '1.6', sample: 'Sending the drone footage tonight once it finishes exporting.', use: 'Most text, form labels' },
      { name: 'Caption', size: 11, weight: 500, line: '1.5', sample: 'Devansh Kapoor · Oct 25 · 2 days', use: 'Secondary lines, meta' },
      { name: 'Micro', size: 10, weight: 500, line: '1.4', sample: 'Earned counts once a shoot is over.', use: 'Hints, timestamps' },
      { name: 'Badge', size: 9, weight: 600, line: '1', sample: 'RESPONSE AWAITED', use: 'Status badges, uppercase + tracked' },
    ],
    weights: [
      { name: 'Regular', value: 400, use: 'Body copy' },
      { name: 'Medium', value: 500, use: 'Chips, captions, meta' },
      { name: 'Semibold', value: 600, use: 'Headings, buttons, values (the default emphasis)' },
      { name: 'Bold', value: 700, use: 'Rare: badge counts' },
    ],
    rules: ['Sentence case everywhere, except status badges', 'Money always in ₹ with Indian grouping: ₹1,50,000', 'Numbers in titles stay short: ₹1.1L, ₹33k'],
  },

  spacing: {
    base: 4,
    scale: [
      { token: '1', px: 4, use: 'Icon to label' },
      { token: '1.5', px: 6, use: 'Chip gaps, tight rows' },
      { token: '2', px: 8, use: 'Default gap between items' },
      { token: '2.5', px: 10, use: 'Button and input padding (vertical)' },
      { token: '3', px: 12, use: 'Card padding, list gaps' },
      { token: '4', px: 16, use: 'Section padding (vertical)' },
      { token: '5', px: 20, use: 'Screen edge padding' },
      { token: '6', px: 24, use: 'Space between sections in a sheet' },
    ],
    layout: [
      { label: 'Screen edges', value: '20 px' },
      { label: 'Section rhythm', value: '16 px top + bottom' },
      { label: 'Design width', value: '390 × 844' },
      { label: 'Bottom bar', value: '4 tabs, fixed' },
    ],
  },

  radius: [
    { name: 'Small', token: 'rounded-md', px: 6, use: 'Map previews, small tags' },
    { name: 'Default', token: 'rounded-lg', px: 8, use: 'Icon buttons, menus' },
    { name: 'Card', token: 'rounded-xl', px: 12, use: 'Cards, inputs, buttons' },
    { name: 'Large', token: 'rounded-2xl', px: 16, use: 'Feature cards, dashboards' },
    { name: 'Sheet', token: 'rounded-t-3xl', px: 24, use: 'Bottom sheets (top corners)' },
    { name: 'Pill', token: 'rounded-full', px: 999, use: 'Chips, badges, avatars, toggles' },
  ],

  motion: [
    { name: 'Overlay fade', value: '200 ms · ease-out', use: 'Scrims and overlays appearing' },
    { name: 'Search rise', value: '340 ms · cubic-bezier(0.22, 1, 0.36, 1)', use: 'The search bar moving from Home to the top' },
    { name: 'Content rise', value: '280 ms · ease-out · 120 ms delay', use: 'Results arriving after the search bar' },
    { name: 'Reduced motion', value: '1 ms', use: 'All of the above, when the phone asks for less motion' },
  ],

  icons: {
    rules: ['24 × 24 grid, outline style', '1.8 px stroke, round caps and joins', 'Active tab icons thicken to 2.2 px', 'Always paired with a label, or an aria-label when alone'],
  },

  // Error handling and feedback, with real copy from the prototype
  feedback: {
    validation: {
      title: 'Inline validation',
      text: 'Checked when you submit, shown in rose under the form, one message at a time, saying what to do next.',
      examples: [
        'Assignment name and location are required.',
        'Duration must be at least 1 day.',
        'Pick a call time for the shoot.',
        'The client budget must be an amount in ₹.',
        'That link is already on your profile.',
        'That photo could not be opened. Try another one.',
      ],
    },
    writing: {
      title: 'How errors are written',
      rules: [
        { bad: 'Invalid input', good: 'Duration must be at least 1 day.' },
        { bad: 'Error: field required', good: 'Pick a call time for the shoot.' },
        { bad: 'Upload failed', good: 'That photo could not be opened. Try another one.' },
      ],
    },
    confirm: {
      title: 'Destructive actions confirm first',
      heading: 'Delete this assignment?',
      body: '"Kapoor Wedding, Udaipur" and its group chat will be removed for everyone on it. This cannot be undone.',
    },
    empty: {
      title: 'Empty states',
      text: 'Never a blank screen. A short line says why it is empty, and what will fill it.',
      examples: ['Nothing new right now.', 'No chats match that search.', 'Nothing coming up. It shows here once you have a shoot ahead.'],
    },
    locked: {
      title: 'Locked states explain themselves',
      text: 'A day you accepted work on cannot be changed to Available. The reason is written in the sheet, because touch screens never show tooltips.',
    },
    fallback: {
      title: 'Graceful fallbacks',
      text: 'A short Maps link can\'t be read until Google opens it, so the preview falls back to the written location. Non-Maps links are refused as they are typed.',
    },
    access: {
      title: 'Accessibility',
      items: [
        'Icon-only buttons carry an aria-label',
        'Unread counts are read out, not just shown as a badge',
        'Visible focus rings in indigo-400',
        'Animations shrink to 1 ms with reduced motion',
        'Status never relies on colour alone: every pill has a word',
      ],
    },
  },
}
