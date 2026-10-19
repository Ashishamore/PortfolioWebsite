import { mariaJourney } from './mariaJourney'
import { sitesaathi } from './sitesaathi'
import { workive } from './workive'

// All copy for the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Aashish More',
  fullName: 'Aashish Ashok More',
  firstName: 'Aashish',
  initials: 'am',
  role: 'Senior UX Designer',
  tagline: 'UI/UX + Front-End',
  location: 'Pune, India',
  availability: 'Open to new opportunities',
  email: 'ashishashokmore@gmail.com',
  resumeUrl: 'https://drive.google.com/drive/folders/1av_ZYGAA4sl9OELJFe0IYiLGI6TSq2-W?usp=sharing', // Google Drive folder; visitors download from there
  // Add your real profile URLs here; leave the list empty to hide the links
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashishmore/' },
    { label: 'Behance', href: 'https://www.behance.net/ashishmore' },
  ],
}

// Headline credential, shown in the hero and in the About credentials list
export const certification = { title: 'HFI Certified Usability Analyst (CUA™)', detail: 'No. 2024-9188' }

export const hero = {
  // Rendered as: Turning research into [interfaces] people ~enjoy~ using.
  headline: { start: 'Turning research into', selected: 'interfaces', middle: 'people', scribbled: 'enjoy', end: 'using.' },
  intro:
    'a Senior UX Designer with 6+ years in product design. I start with research, design end to end in Figma and work closely with engineers, so ideas reach real users without losing their UX quality.',
}

// Decorations around the hero photo
export const heroNotes = {
  sticky: 'HMW make complex flows feel effortless?',
  pointer: "that's me!",
  aside: 'research first, always',
  palette: ['#16232c', '#f3e9ae', '#ffc6d3', '#bfe0f5', '#ec5b3b'],
}

export const ticker = [
  'User research',
  'Wireframes',
  'Usability testing',
  'Design systems',
  'Prototyping',
  'Front-end code',
  'Accessibility',
  'AI-assisted dev',
  'Heuristic evaluation',
]

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// `visual` picks the illustration on the card ('phones' uses `shots`): 'journey' | 'phones' | 'mobile' | 'dashboard' | 'web' | 'code'
// `frame` overrides the Figma-style label above the card (defaults to a slug of the client's second half).
// `slug` links the card to its own case-study page (see `caseStudies` below).
// Otherwise set `link` to an external case study or Behance post when you have one.
export const projects = [
  {
    title: 'Making a 20+ module platform legible',
    slug: 'specialty-pharma',
    client: 'Specialty Pharma · Patient Access',
    frame: 'specialty-pharma',
    year: '2025-26',
    summary:
      "Mapped a multi-tenant specialty drug access platform as one patient's journey across time and geography, turning a system nobody could hold in their head into a story a team of 35 could.",
    tags: ['Service design', 'Journey mapping', 'Enterprise UX'],
    result: '2 weeks → 30 min onboarding',
    visual: 'journey',
    tint: 'bg-note-green',
    note: 'one patient = the whole system',
  },
  {
    title: 'Workive!: one place to staff a photo shoot',
    slug: 'workive',
    client: 'Personal product · Mobile app',
    frame: 'workive',
    year: '2026',
    summary:
      "Born from my college days shooting weddings: a working prototype for photographers and videographers who staff each other's shoots, with assignments, crew availability, money and chat in one app.",
    tags: ['Product design', 'Mobile UX', 'Prototyping in code'],
    result: 'Try it right here',
    visual: 'phones',
    tint: 'bg-note-orange',
    note: 'designed + built',
  },
  {
    title: 'SiteSaathi: every site, worker and rupee in one app',
    slug: 'sitesaathi',
    client: 'Construction SaaS · Work in progress',
    frame: 'sitesaathi',
    year: '2026',
    summary:
      'A project management platform for contractors who take on contracts, deploy labour and get the work done. 101 problems mapped, 19 modules, 10 roles.',
    tags: ['Product design', 'Field research', 'Multilingual UX'],
    result: 'Work in progress · try it',
    visual: 'phones',
    shots: ['ownerHome', 'worker'],
    tint: 'bg-note-lilac',
    note: 'built for the site',
  },
]

export const about = {
  heading: 'Where design systems, usability craft and shipped code meet.',
  paragraphs: [
    "I'm a Senior UX Designer based in Pune. I design product interfaces end-to-end in Figma and ship them as working front-end code, using AI-assisted development to close the gap between design and development.",
    "I hold an MFA in Advertising Design and I'm an HFI Certified Usability Analyst. I've led design teams and owned UX for healthcare SaaS, and before that I spent five years freelancing on branding, digital and print.",
  ],
  skillGroups: [
    {
      label: 'Build',
      items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Ionic', 'Storybook', 'Git', 'AI-assisted dev', 'Shopify'],
    },
    {
      label: 'Design',
      items: ['Design systems', 'Component libraries', 'Design tokens', 'Wireframing', 'Prototyping', 'Information architecture'],
    },
    {
      label: 'UX',
      items: ['UX research & personas', 'Usability testing', 'Heuristic evaluation', 'Accessibility', 'Design sprints'],
    },
    {
      label: 'Lead',
      items: ['Team mentoring', 'Stakeholder communication', 'Design storytelling', 'JIRA', 'Confluence'],
    },
  ],
  tools: ['Figma', 'Adobe XD', 'Miro', 'Storybook', 'Claude Code', 'Cursor', 'Copilot', 'Git'],
  credentials: [
    certification,
    { title: 'HFI Certified Service Design Thinker', detail: 'Nov 2024' },
    { title: 'MFA, Advertising Design', detail: 'Govt. School of Art, Dr. B.A.M.U. · 2016' },
    { title: 'BFA, Advertising Design', detail: 'Govt. School of Art, Dr. B.A.M.U. · 2014' },
  ],
}

export const experience = [
  {
    period: 'Nov 2025 - Present',
    role: 'Senior UX Designer',
    company: 'Neutrino Tech Systems',
    points: [
      'Design product interfaces end-to-end in Figma, then ship them as production-ready front-end code using AI-assisted development.',
      'Review AI-generated UI for structure, spacing, states and accessibility before it reaches production.',
      'Work directly with engineers to ship interface changes faster, without hand-off review cycles.',
    ],
  },
  {
    period: 'May 2022 - Aug 2025',
    role: 'Lead UX Designer',
    company: 'CompuMatrice Media Pvt. Ltd.',
    points: [
      'Boosted user engagement by gamifying and quantifying user journeys, backed by usage data and testing.',
      'Led end-to-end UX for B2B and B2C healthcare SaaS products across every release.',
      'Cut development time and improved team efficiency by aligning UI with Bootstrap and Ionic components.',
      'Ran UX sprints, launched multiple platforms on tight timelines and mentored a team of designers.',
    ],
  },
  {
    period: 'Oct 2021 - May 2022',
    role: 'Lead Creative Designer',
    company: 'IT Craft Technologies Pvt. Ltd.',
    points: [
      'Designed UI for COVID-19 public health portals alongside print and campaign media.',
      'Led a team of 4 designers across digital and print under tight deadlines.',
      'Directed campaigns for Tirumala Oil, MP Tourism and Omkar Mahotsav.',
    ],
  },
  {
    period: 'Sept 2016 - June 2021',
    role: 'Freelance Designer',
    company: 'Self-employed',
    points: ['Delivered branding, digital and print projects for independent clients across sectors.'],
  },
]

// Full case-study pages, keyed by the project's `slug` (URL: /work/<slug>)
export const caseStudies = {
  'specialty-pharma': {
    eyebrow: 'Enterprise B2B · Healthcare · 2025-26',
    // Rendered with the `highlight` word marked like a highlighter pen
    title: { before: 'Making a specialty pharma platform', highlight: 'legible', after: 'to the people building it' },
    deck: "Cut new-member onboarding from two weeks to a thirty-minute walkthrough by turning a multi-module platform into one patient's journey.",
    meta: [
      { label: 'Role', value: 'Senior UI/UX Designer' },
      { label: 'Team', value: 'Team of 30-35' },
      { label: 'Practice', value: 'Narrative design, service design, journey mapping' },
    ],
    // Hero swimlane map, following the program journey in "Maria's Access Journey".
    // Stages are the columns (time), lanes are personas. `path` is the case moving through the lanes:
    // `at` is the stage index (0.5 = between stages), `place` turns a step into a location pin.
    // `detour` (the denial and appeal) leaves path step `from`, goes via the appeal and rejoins at step `to`;
    // the straight line between them is the route when the first authorization is approved.
    journeyMap: {
      stages: ['Enroll', 'Verify', 'Authorize', 'Afford', 'Initiate', 'Adhere'],
      lanes: [
        { name: 'Provider' },
        { name: 'Hub', main: true },
        { name: 'Payer' },
        { name: 'Specialty Pharmacy' },
        { name: 'Patient' },
        { name: 'Manufacturer', receivesData: true },
      ],
      path: [
        { lane: 'Provider', at: 0, place: 'Columbus' },
        { lane: 'Hub', at: 0.55, place: 'Dallas' },
        { lane: 'Payer', at: 1, place: 'Hartford' },
        { lane: 'Payer', at: 1.6 },
        { lane: 'Payer', at: 2.4 },
        { lane: 'Hub', at: 2.85 },
        { lane: 'Patient', at: 3.6 },
        { lane: 'Specialty Pharmacy', at: 4, place: 'Memphis' },
        { lane: 'Patient', at: 4.55, place: 'home' },
        { lane: 'Patient', at: 5 },
      ],
      detour: { from: 3, to: 4, appeal: { lane: 'Hub', at: 2 } },
    },
    context: {
      text: [
        "A multi-tenant platform for specialty drug patient access, covering the full journey from a physician's prescription through to therapy start and ongoing adherence.",
        'It spans several distinct user groups, each with different permissions and views of the same case.',
      ],
      // `main: true` marks the platform's primary user
      personas: [
        { name: 'Provider', role: 'Doctor or hospital that prescribes and enrolls the patient' },
        { name: 'Hub', role: "Case managers who run the patient's case", main: true },
        { name: 'Specialty Pharmacy', role: 'Dispenses and ships the drug' },
        { name: 'Payer', role: 'Insurance company that covers or denies the drug' },
        { name: 'Manufacturer', role: 'Pharma company that funds the program and wants analytics' },
        { name: 'Patient', role: 'The person receiving therapy' },
        { name: 'Platform', role: 'Internal operator and admin' },
      ],
    },
    approach: {
      statement:
        "Rather than documenting the system module by module, I mapped it as one patient's journey, anchored to real time and real places.",
      // left side of the "before / after" sketch: how the platform was described before
      modules: ['intake', 'consent', 'eligibility', 'prior auth', 'appeals', 'copay', 'SP triage', 'shipping', 'claims', 'adherence', 'reauth', 'analytics'],
      story: mariaJourney,
    },
    outcome: {
      lead: 'The team converged on a single shared understanding of the journey.',
      onboarding: {
        before: '2-3 weeks',
        beforeNote: 'For a new member to understand how the platform fits together.',
        after: '30 minutes',
        afterNote: 'One presentation walkthrough of the journey.',
      },
      points: [
        {
          title: 'One shared understanding',
          text: 'Everyone on the team now holds the same picture of how the platform works, end to end.',
        },
        {
          title: 'A common reference point',
          text: 'Cross-team conversations start from the journey instead of being rebuilt each time.',
        },
      ],
      travelled: {
        title: 'The narrative travelled beyond its original purpose',
        text: "The marketing team adopted it for client-facing pitches, having found it explained the platform's value more clearly than the module-based framing had.",
        from: 'Team onboarding',
        to: 'Client pitches',
      },
    },
    // `highlight` is marked with a highlighter in the text; `contrast` is the small before/after pair under it
    endLine: 'Want the longer version, or to talk about a system like this?',
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
          title: 'Narrative is a design tool',
          text: [
            'I also learned that narrative is a design tool, not a presentation device.',
            'Specification documents describe a system. A story makes people able to hold it in their heads.',
          ],
          highlight: 'narrative is a design tool, not a presentation device',
          contrast: {
            left: { label: 'specification documents', text: 'describe a system' },
            right: { label: 'a story', text: 'lets people hold it in their heads' },
          },
        },
      ],
    },
  },
  workive,
  sitesaathi,
}
