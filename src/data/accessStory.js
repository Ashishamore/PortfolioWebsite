// Case study 01: a specialty pharma platform, personified as one patient's story that became the team's domain KT.
// No product or client names, generic module names, no screenshots, invented IDs and settings.
// All people, places and times in the story are illustrative.

// The three module groups. `color` is the sticky-note colour used for that group everywhere.
export const groups = [
  { key: 'run', name: 'Run the case', color: 'bg-note-blue', dot: 'bg-[#5aa9dc]' },
  { key: 'clear', name: 'Clear the barriers', color: 'bg-note-orange', dot: 'bg-[#f0954a]' },
  { key: 'keep', name: 'Keep & prove', color: 'bg-note-green', dot: 'bg-[#6fbf5a]' },
]

// Where everyone sits. Real coordinates, so the maps and the distances between events are true to life.
// `tz` is the US time zone: PT, MT, CT or ET.
export const cities = {
  'San Francisco, CA': { tz: 'PT', lon: -122.42, lat: 37.77 },
  'Denver, CO': { tz: 'MT', lon: -104.99, lat: 39.74 },
  'Colorado Springs, CO': { tz: 'MT', lon: -104.82, lat: 38.83 },
  'Dallas, TX': { tz: 'CT', lon: -96.8, lat: 32.78 },
  'Kansas City, MO': { tz: 'CT', lon: -94.58, lat: 39.1 },
  'Memphis, TN': { tz: 'CT', lon: -90.05, lat: 35.15 },
  'Chicago, IL': { tz: 'CT', lon: -87.63, lat: 41.88 },
  'Miami, FL': { tz: 'ET', lon: -80.19, lat: 25.76 },
  'Raleigh, NC': { tz: 'ET', lon: -78.64, lat: 35.78 },
  'Princeton, NJ': { tz: 'ET', lon: -74.66, lat: 40.35 },
  'Hartford, CT': { tz: 'ET', lon: -72.68, lat: 41.76 },
  'Boston, MA': { tz: 'ET', lon: -71.06, lat: 42.36 },
}

// The six parties every specialty drug case touches, plus the platform team that runs the program
export const parties = ['Provider', 'Hub', 'Specialty pharmacy', 'Payer', 'Manufacturer', 'Patient']

// Twelve modules, one person (or team) on each. `who` is empty where the story has no named person.
// `city` keys into `cities`; `org` is a generic description of where they work; `party` is which of the six they belong to.
export const cast = [
  { module: 'Program setup', job: 'configure & control', group: 'run', who: 'Sofia', role: 'program admin', icon: 'sliders', city: 'San Francisco, CA', org: 'Platform team', party: 'Platform' },
  { module: 'Provider portal', job: 'provider intake', group: 'run', who: 'Carla', role: 'clinic office manager', icon: 'form', city: 'Denver, CO', org: 'Dermatology clinic', party: 'Provider' },
  { module: 'Case management', job: 'hub operations', group: 'run', who: 'Priya', role: 'hub coordinator', icon: 'inbox', city: 'Dallas, TX', org: 'Hub services', party: 'Hub' },
  { module: 'Payer intelligence', job: 'payer policy radar', group: 'clear', who: 'Devon', role: 'access analyst', icon: 'radar', city: 'Boston, MA', org: 'Market access team', party: 'Manufacturer' },
  { module: 'Field access', job: 'clear access barriers', group: 'clear', who: 'Amelia', role: 'field reimbursement manager', icon: 'car', city: 'Colorado Springs, CO', org: 'On the road, Rocky Mountain territory', party: 'Manufacturer' },
  { module: 'Financial assistance', job: 'find the funding', group: 'clear', who: 'Tomás', role: 'assistance specialist', icon: 'coin', city: 'Miami, FL', org: 'Patient assistance team', party: 'Hub' },
  { module: 'Pharmacy & logistics', job: 'pharmacy & cold chain', group: 'clear', who: 'Ana', role: 'specialty pharmacist', icon: 'snow', city: 'Memphis, TN', org: 'Specialty pharmacy and cold-chain hub', party: 'Specialty pharmacy' },
  { module: 'Patient portal', job: 'patient view', group: 'run', who: 'Maria', role: 'patient', icon: 'phone', city: 'Denver, CO', org: 'At home', party: 'Patient' },
  { module: 'Adherence', job: 'adherence outreach', group: 'keep', who: 'Grace', role: 'nurse', icon: 'pulse', city: 'Kansas City, MO', org: 'Nurse support center', party: 'Hub' },
  { module: 'Outcomes', job: 'clinical proof', group: 'keep', who: 'Nina', role: 'outcomes analyst', icon: 'chart', city: 'Raleigh, NC', org: 'Clinical outcomes team', party: 'Manufacturer' },
  { module: 'Finance', job: 'money truth', group: 'keep', who: 'Leo', role: 'revenue analyst', icon: 'scale', city: 'Chicago, IL', org: 'Program finance', party: 'Manufacturer' },
  { module: 'Analytics', job: 'the executive view', group: 'keep', who: 'Marcus', role: 'program director', icon: 'funnel', city: 'Princeton, NJ', org: 'Program leadership', party: 'Manufacturer' },
]

// People in the story who aren't the main person on a module, but are stops on the map.
// The prescribing doctor works in the provider portal alongside Carla.
export const hcp = { who: 'Dr. Ortiz', role: 'HCP, dermatologist', module: 'Provider portal', icon: 'stethoscope', city: 'Denver, CO', org: 'Dermatology clinic', party: 'Provider' }
export const insurer = { role: 'insurer', city: 'Hartford, CT', org: 'Health plan, pharmacy review', party: 'Payer' }

// Drawn faces for the named people (see `Face` on the draft page).
// `hair`: 'short' | 'bob' | 'long' | 'bun' | 'ponytail' | 'curly'
export const faces = {
  Sofia: { skin: '#f1c7a5', hair: 'bob', hairColor: '#5a3825', shirt: '#2f6bff', glasses: true },
  'Dr. Ortiz': { skin: '#c98e6b', hair: 'bob', hairColor: '#1a1a1a', shirt: '#fffdf6', stethoscope: true },
  Carla: { skin: '#d9a37c', hair: 'long', hairColor: '#2a1d17', shirt: '#ec5b3b' },
  Priya: { skin: '#a86b4a', hair: 'bun', hairColor: '#1a1a1a', shirt: '#dccff7' },
  Devon: { skin: '#6e4330', hair: 'short', hairColor: '#1a1a1a', shirt: '#ffe58a', beard: true },
  Amelia: { skin: '#f1c7a5', hair: 'ponytail', hairColor: '#a0662f', shirt: '#cbe8b8' },
  Tomás: { skin: '#d9a37c', hair: 'short', hairColor: '#2a1d17', shirt: '#bfe0f5', beard: true, glasses: true },
  Ana: { skin: '#e0ac85', hair: 'bun', hairColor: '#5a3825', shirt: '#9fd3c7', scrubs: true },
  Maria: { skin: '#e8b48f', hair: 'long', hairColor: '#4a2c1d', shirt: '#ffc6d3' },
  Leo: { skin: '#f1c7a5', hair: 'short', hairColor: '#8c5a2b', shirt: '#dccff7', glasses: true },
  Nina: { skin: '#c98e6b', hair: 'bob', hairColor: '#a0662f', shirt: '#ffe58a' },
  Grace: { skin: '#7a4a32', hair: 'curly', hairColor: '#1a1a1a', shirt: '#5fb3a8', scrubs: true },
  Marcus: { skin: '#a86b4a', hair: 'short', hairColor: '#c9c2b8', shirt: '#16232c', glasses: true, tie: true },
}

export const accessStory = {
  eyebrow: 'Enterprise B2B · Healthcare · 2025-26',
  // Rendered with the `highlight` word marked like a highlighter pen
  title: { before: "One patient's story that became the team's", highlight: 'domain KT', after: '.' },
  deck: "The team had spent two to three weeks trying to understand a new specialty pharma platform, and no one had the bird's-eye view. I personified the whole ecosystem as one patient's story, with real people, places and times, and walked them through it. In thirty minutes, everyone had it.",
  meta: [
    { label: 'Role', value: 'Senior UI/UX Designer' },
    { label: 'Team', value: 'Team of 30-35' },
    { label: 'Practice', value: 'Narrative design, AI persona interviews, domain KT' },
  ],
  endLine: 'Want the longer version, or to talk about a system like this?',
  caseId: 'CASE-0001',
  result: '2 weeks → 30 min',

  // [01] the cold open: why getting a specialty drug to a patient is hard
  hurdles: {
    lead: "A specialty drug is not a bottle you pick up at the corner pharmacy.",
    items: [
      { title: 'It costs more than a car', text: 'Every year. And it has to be handled with care and tracked every mile.' },
      { title: 'Prove she qualifies', text: 'Before a single dose, someone has to show an insurer the patient meets their rules.' },
      { title: 'Find the money', text: "Cover what insurance won't, so the price doesn't end the therapy." },
      { title: 'Keep it cold', text: 'Route it to a pharmacy licensed to dispense it, without ever breaking the cold chain.' },
      { title: 'Keep her on it', text: 'Nearly half of patients quietly fall off these therapies. Someone has to keep checking.' },
    ],
    punchline: 'Left to chance, the patient gives up somewhere in the maze.',
  },

  // [02] the problem I was actually solving
  problem: {
    text: [
      "When the project was new, the whole team was given time to understand it. For two to three weeks everyone read documents, explored modules and asked around, and still nobody had the bird's-eye view.",
      'The domain was the reason. Every case passes through six kinds of organisation: the provider, a hub, a specialty pharmacy, the payer, the manufacturer and the patient. The platform connects them with more than twenty modules, and each of us could only see a few.',
      'I could see what was missing. Not more detail, but one picture of how it all fits together. So I set out to make one.',
    ],
  },

  // [03] the approach: how the story was built
  approach: {
    statement: 'My approach was to personify the system. Instead of documenting it module by module, I gave every module a person, put every person in a real city and set every handoff on a timeline, so anyone could follow one patient through all of it.',
    // the three things every part of the story gets
    pillars: [
      { icon: 'person', title: 'A person', text: 'Every module becomes someone with a name, a face and a job.' },
      { icon: 'pin', title: 'A place', text: 'Every person sits in a real city, so handoffs have distance.' },
      { icon: 'clock', title: 'A time', text: 'Every event has a local date and time, so the story has an order.' },
    ],
    pillarsResult: 'A story anyone can follow',
    methods: ['Personas', 'User journey', 'Storyboard', 'Hypothetical task flow'],
    process: [
      {
        title: 'Interview the cast',
        text: 'I learned the domain by building it. With Claude, I created a persona for every role, each with a job, a city and a working day, then interviewed them about what they do, who they wait on and what goes wrong.',
      },
      {
        title: "Write one patient's story",
        text: "I threaded what they told me into a single case, Maria's, from the first appointment to week sixteen, following the four rules below.",
      },
      {
        title: 'Put it on the map and the clock',
        text: 'I gave every persona a city and every event a local time. That turned a list of handoffs into a story with distance and order, and became rule four.',
      },
      {
        title: 'Tell it, on the big screen',
        text: 'I told it to the whole team on the big screen in the innovation room, and now walk new joiners through it one to one.',
      },
    ],
    // an illustrative exchange in the style of the persona interviews (not a transcript)
    interview: [
      { who: 'me', text: 'Priya, what slows a case down the most?' },
      { who: 'Priya', text: "Enrollments that arrive missing something. I usually find out when the insurer denies it, days later." },
      { who: 'me', text: 'And who has the missing piece?' },
      { who: 'Priya', text: "Almost always the doctor's office. Which is why the field team's visits matter so much." },
    ],
    rules: [
      { title: 'One patient', text: "Maria's case is the only one in the story, from a dermatologist's office to week sixteen of therapy." },
      { title: 'One case ID', text: 'Created once, carried by every module. The golden thread that shows how the system connects.' },
      { title: 'A person for every module', text: 'A module is hard to remember. Sofia configuring a program, or Amelia driving to a clinic, is not.' },
      { title: 'Real places, real time', text: 'Everyone sits in a real city, and every event happens at a real local time, so the distance and time zones between handoffs are visible.' },
    ],
  },

  // [04] where everyone is
  geography: {
    lead: 'Twelve cities, four time zones. Only Maria and her clinic share a city; every other handoff crosses distance and the clock.',
    note: 'The platform is the only thing all of them have in common.',
  },

  // [05] the story, event by event. `actor` names a module in `cast` (or 'hcp' / 'payer'); `tone` marks turning points.
  // `at` is the local date and time with its UTC offset (US daylight saving starts Mar 8, 2026). `city` overrides the actor's
  // home city when the event happens somewhere else. Steps before the case is created carry no ID.
  acts: [
    {
      name: 'Act I',
      title: 'A case is born',
      steps: [
        {
          when: '7 weeks before',
          at: '2026-01-12T10:00-08:00',
          actor: 'Program setup',
          title: 'The stage is set',
          text: "In San Francisco, Sofia switches on a new program for a specialty eczema therapy. No code: she configures the portals, the enrollment form and a prior-auth deadline, and every part of the system now knows the program exists.",
        },
        {
          when: 'Day 0',
          at: '2026-03-02T09:15-07:00',
          actor: 'hcp',
          title: 'Maria sees her HCP',
          text: "Maria, 34, has had severe eczema for years and nothing has worked. Her HCP, Dr. Ortiz, prescribes a specialty therapy and asks Carla to enroll her. Usually, this is where a doctor loses sight of the case.",
        },
        {
          when: 'Day 0',
          at: '2026-03-02T11:40-07:00',
          actor: 'Provider portal',
          title: 'Just a form. Or so it seems',
          text: "Carla fills in the enrollment in the provider portal, attaches Dr. Ortiz's notes and Maria's consent, and uploads it. It feels like sending a form. Underneath, she has started a case.",
        },
        {
          when: 'Day 0',
          at: '2026-03-02T13:05-06:00',
          actor: 'Case management',
          title: 'The golden thread',
          text: "Twenty-five minutes later and 660 miles away, Priya approves the enrollment in Dallas. The case gets a single ID that every part of this story holds on to.",
          tone: 'start',
        },
      ],
    },
    {
      name: 'Act II',
      title: 'The walls',
      steps: [
        {
          when: 'Day 1',
          at: '2026-03-03T09:30-06:00',
          actor: 'Case management',
          title: 'Is it even covered?',
          text: "Priya checks Maria's benefits: covered, specialty tier, prior authorization required. The case is flagged as likely to hit barriers, and she submits the prior authorization that morning.",
        },
        {
          when: 'Day 3',
          at: '2026-03-05T10:20-05:00',
          actor: 'payer',
          title: 'We hit a wall',
          text: "The insurer in Hartford says no. A new rule asks for proof that Maria tried cheaper treatments first, and it isn't in the file.",
          tone: 'bad',
        },
        {
          when: 'Day 3',
          at: '2026-03-05T11:05-05:00',
          actor: 'Payer intelligence',
          title: 'Not bad luck. A pattern',
          text: "In Boston, Devon saw this coming: a policy-change alert for this insurer fired days ago. He links the denial to it and routes it to the field.",
        },
        {
          when: 'Day 4',
          at: '2026-03-06T08:00-07:00',
          city: 'Denver, CO',
          actor: 'Field access',
          title: 'Someone goes and pushes on it',
          text: "Amelia drives up from Colorado Springs to the clinic, where denials have spiked. She walks Carla through the appeal and finds the gap: prior-therapy records only Dr. Ortiz can sign off.",
        },
        {
          when: 'Day 4',
          at: '2026-03-06T12:30-07:00',
          actor: 'hcp',
          title: 'The HCP is in the loop',
          text: "This time Dr. Ortiz doesn't hear about it weeks later by fax: her portal shows exactly what's needed. She uploads the records with a letter of medical necessity. Five days later, approved.",
          tone: 'good',
        },
        {
          when: 'Day 10',
          at: '2026-03-12T11:30-04:00',
          actor: 'Financial assistance',
          title: "Approved isn't affordable",
          text: "Approved, but Maria's copay is about $1,200 a fill. In Miami, Tomás skips a foundation already flagged as out of funds and enrolls her in an open copay program. Her cost drops to $10.",
        },
        {
          when: 'Day 14',
          at: '2026-03-16T06:00-05:00',
          actor: 'Pharmacy & logistics',
          title: 'Cold. Intact. On time',
          text: "The prescription goes to an in-network pharmacy with the drug in stock and a cold chain. Before sunrise in Memphis, Ana dispenses it, temperature tracked all 900 miles to Denver.",
        },
      ],
    },
    {
      name: 'Act III',
      title: 'Keep & prove',
      steps: [
        {
          when: 'Day 15',
          at: '2026-03-17T19:30-06:00',
          actor: 'Patient portal',
          title: 'The maze stays invisible',
          text: "The package arrives cold, and Maria takes her first dose, 15 days after her appointment. She followed every step on her portal and never knew about Hartford, Boston or Miami. That was the point.",
          tone: 'first',
        },
        {
          when: 'Month close',
          at: '2026-03-31T17:00-05:00',
          actor: 'Finance',
          title: 'Every dollar balances',
          text: "At month close in Chicago, Leo finds the insurer paid Maria's first claim short of the agreed rate. The gap is flagged for recovery, the copay support is matched to budget, and the case balances.",
          visual: {
            kind: 'ledger',
            rows: [
              { item: "Claim, Maria's first fill", note: 'paid short of the agreed rate', status: 'flagged, recovered' },
              { item: 'Copay support', note: 'matched to the program budget', status: 'balanced' },
              { item: "Maria's case", note: 'every dollar in and out', status: 'balanced' },
            ],
          },
        },
        {
          when: 'Week 6',
          at: '2026-04-29T16:30-05:00',
          actor: 'Adherence',
          title: 'The quietest danger',
          text: "Maria misses a refill. In Kansas City, Grace, a nurse, calls: was it the cost, or a side effect? She sorts it out, and Maria is back on track.",
        },
        {
          when: 'Week 16',
          at: '2026-07-07T10:00-04:00',
          actor: 'Outcomes',
          title: 'Is it working?',
          text: "In Raleigh, Nina checks Maria against the target Sofia set at the start. At week sixteen she hits it: the therapy isn't just being taken, it's working.",
          tone: 'good',
        },
        {
          when: 'Program review',
          at: '2026-08-05T09:00-04:00',
          actor: 'Analytics',
          title: 'A line in a funnel',
          text: "In Princeton, Marcus sees Maria as one line in a funnel of thousands, and spots a cluster of denials from Hartford's new rule. Enrollment now asks for prior-therapy records up front, and Sofia changes the form in an afternoon. The next Maria never hits that wall.",
          visual: {
            kind: 'funnel',
            note: 'Illustrative numbers, per 1,000 referrals',
            stages: [
              { label: 'Referred', value: 1000 },
              { label: 'Benefits verified', value: 970 },
              { label: 'Approved, appeals included', value: 810 },
              { label: 'Funded', value: 785 },
              { label: 'Shipped, first dose', value: 760 },
              { label: 'On therapy at week 16', value: 640 },
            ],
          },
        },
      ],
    },
  ],

  finale: {
    lead: 'So look at what just happened.',
    text: 'Every one of them was working off the same case. The same patient. The same thread.',
    quote: 'Not twelve tools. One relay race, where the baton is the patient.',
    kicker: 'And nobody drops it.',
    // Maria's case, by the numbers (illustrative, like the rest of the story)
    stats: [
      { value: '15 days', label: 'From appointment to first dose', note: 'through a denial and an appeal' },
      { value: '$10', label: 'Her copay per fill', note: 'down from about $1,200' },
      { value: '96%', label: 'Days with medicine on hand', note: '80% or more counts as adherent' },
      { value: '13', label: 'People, in 12 cities', note: 'holding one case ID' },
    ],
  },

  // [05] putting the story in front of the team, as its domain KT
  kt: {
    lead: 'I told the story on the big screen in the innovation room, to the whole team. When it was over, everyone walked out knowing what they had been trying to piece together for weeks. It became our domain KT.',
    text: "New joiners get the same walkthrough one to one. Instead of a tour of screens, they follow Maria from a dermatologist's office to week sixteen, and by the end every component has a place, a person and a reason.",
    takeaways: [
      { title: 'The whole ecosystem', text: 'All twelve components, and how one case moves through them from enrollment to outcome.' },
      { title: 'The people behind it', text: 'The six parties in every case, who works each component, and who sits on the other side of each screen we design.' },
      { title: 'Why each part exists', text: 'Every component clears a specific hurdle. Knowing the hurdle explains the design.' },
    ],
  },

  // what people on the team said after the walkthrough.
  // PLACEHOLDER wording, written from Aashish's account: confirm each quote with the person before publishing.
  voices: {
    lead: 'What people on the team said',
    quotes: [
      { name: 'Omkar', text: "I'd spent weeks on my own screens without knowing where they fit. After that session, I finally saw the whole thing." },
      { name: 'Sumit', text: 'Thirty minutes did what two weeks of reading documents could not. I walked out with the full picture.' },
      { name: 'Akshay', text: "Following one patient made it click: who does what, in which order, and why every module exists." },
    ],
  },

  learned: {
    lessons: [
      {
        title: 'The hardest problem is shared comprehension',
        text: [
          "In complex enterprise systems, the hardest design problem often isn't the interface. It's shared comprehension.",
          "When a team can't see the whole, every local decision carries a risk of being locally right and globally wrong.",
        ],
        highlight: 'locally right and globally wrong',
        contrast: {
          left: { label: 'seen inside one module', text: 'locally right' },
          right: { label: 'seen across the journey', text: 'globally wrong' },
        },
      },
      {
        title: 'A metaphor carries what a spec cannot',
        text: [
          "A relay race, a baton, a golden thread. People forgot module names, but they remembered who carried Maria's case and where it went next.",
          'Metaphor-based storytelling turned weeks of trying into thirty minutes of knowing.',
        ],
        highlight: 'weeks of trying into thirty minutes of knowing',
        contrast: {
          left: { label: 'specification documents', text: 'describe a system' },
          right: { label: 'a story with a metaphor', text: 'gets remembered' },
        },
      },
      {
        title: 'Narrative is a design tool',
        text: [
          'Narrative is a design tool, not a presentation device.',
          'Writing the story forced every handoff into the open. Where I could not explain the next step, there was a gap in my own understanding.',
        ],
        highlight: 'a design tool, not a presentation device',
      },
      {
        title: 'AI personas made me fluent fast',
        text: [
          'Interviewing AI personas let me learn a new domain quickly, from every side at once.',
          "But fluency isn't understanding. Turning their answers into one story, set in real places and real time, is what made it make sense.",
        ],
        highlight: "fluency isn't understanding",
        contrast: {
          left: { label: 'AI personas', text: 'fast fluency' },
          right: { label: 'one story', text: 'real understanding' },
        },
      },
    ],
  },

  // [06] what changed for the team
  outcome: {
    lead: 'Thirty minutes in the innovation room did what two to three weeks of trying had not: the whole team understood the platform, end to end, the same way.',
    onboarding: {
      before: '2-3 weeks',
      beforeNote: 'The team spent trying to understand the platform on its own.',
      after: '30 minutes',
      afterNote: 'One walkthrough of the story.',
    },
    points: [
      { title: 'Everyone on one page', text: 'The whole team walked out with the same picture of the ecosystem and its components.' },
      { title: 'Faster for new members', text: 'New joiners see the project in its entirety on day one, then go deep on their own module.' },
    ],
    travelled: {
      title: 'The story travelled beyond the team',
      text: "Product managers still use it to explain how the platform fits together, and the marketing team adopted it for client-facing pitches, having found it explained the platform's value more clearly than the module-based framing had.",
      from: 'Domain KT',
      to: 'Product & marketing',
    },
  },
}
