import { accessStory } from './accessStory'
import { sitesaathi } from './sitesaathi'
import { workive } from './workive'

// All copy for the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Aashish More',
  fullName: 'Aashish Ashok More',
  firstName: 'Aashish',
  initials: 'am',
  role: 'Senior UX Designer',
  tagline: 'Senior UX Designer',
  location: 'Pune, India',
  availability: 'Open to new opportunities',
  email: 'ashishashokmore@gmail.com',
  // WhatsApp, offered under "Let's talk" and on the contact board. `number` is in international format
  // without the +; `message` is pre-typed in the chat, so it's clear where the contact came from.
  whatsapp: {
    number: '918275386672',
    display: '+91 82753 86672',
    message: 'Hi Aashish, I came across your portfolio and would like to connect.',
  },
  resumeUrl: 'https://drive.google.com/drive/folders/1av_ZYGAA4sl9OELJFe0IYiLGI6TSq2-W?usp=sharing', // Google Drive folder; visitors download from there
  // Add your real profile URLs here; leave the list empty to hide the links
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aashishmore/' },
    { label: 'Behance', href: 'https://www.behance.net/ashishmore' },
  ],
}

// WhatsApp click-to-chat link: the app on phones, WhatsApp Web on desktop
export const whatsappUrl = `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(profile.whatsapp.message)}`

// Headline credential, shown in the hero and in the About credentials list
// Clicking the hero badge opens the certificate itself (see CertificateDialog)
export const certification = {
  title: 'HFI Certified Usability Analyst (CUA™)',
  detail: 'No. 2024-9188',
  year: 'Nov 2024',
  kind: 'Certification',
  issued: '1 Nov 2024',
  // HFI's public directory of certified analysts, at the "A" page that lists "Ashish More".
  // #11210 is the anchor HFI puts just before the name; the :~:text part makes current browsers scroll the name
  // to the middle of the screen and highlight it. Browsers without text-fragment support open the top of the page.
  verifyUrl:
    'https://humanfactors.com/hfi_new/certification/cua_directorylist_byname.asp?listview=lastname&alphabet=A#11210:~:text=Ashish%20More',
}

export const hero = {
  // Rendered as: Turning research into [interfaces] people ~enjoy~ using.
  headline: { start: 'Turning research into', selected: 'interfaces', middle: 'people', scribbled: 'enjoy', end: 'using.' },
  intro:
    'a Senior UX Designer with 10 years in design, the last 5 in UI/UX. I start with research, design end to end in Figma, and use AI to learn new domains fast and turn designs into working prototypes, so ideas reach real users with their UX quality intact.',
  // "AI-enabled UX design": how AI shows up in the work, each linked to the case study that proves it
  ai: {
    label: 'AI-enabled UX design',
    proofs: [
      { label: 'AI persona interviews', to: '/work/specialty-pharma' },
      { label: 'AI-built prototypes', to: '/work/workive' },
    ],
  },
}

// Notes around the hero. `palette` is the swatch card on the contact board.
export const heroNotes = {
  pointer: "that's me!",
  aside: 'research first, AI-enabled',
  palette: ['#16232c', '#f3e9ae', '#ffc6d3', '#bfe0f5', '#ec5b3b'],
}

export const ticker = [
  'User research',
  'Wireframes',
  'Usability testing',
  'Design systems',
  'AI-enabled UX',
  'Prototyping',
  'Service design',
  'Accessibility',
  'Journey mapping',
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
    title: "One patient's story, the whole platform",
    slug: 'specialty-pharma',
    client: 'Specialty Pharma · Patient Access',
    frame: 'specialty-pharma',
    year: '2025-26',
    summary:
      "Personified a 20+ module specialty drug access platform as one patient's story, with real people, places and times. It became the team's domain KT: weeks of confusion turned into a thirty-minute walkthrough.",
    tags: ['Storytelling', 'Service design', 'Domain KT'],
    result: '2 weeks → 30 min',
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
    note: 'designed + prototyped',
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
  heading: 'Where research, design systems and usability craft meet.',
  paragraphs: [
    "I'm a Senior UX Designer based in Pune. I design complex product interfaces end to end, from research and journey mapping to Figma prototypes, and work closely with engineers so what ships matches what was designed.",
    "I hold an MFA in Advertising Design and I'm an HFI Certified Usability Analyst. I've led design teams and owned UX for healthcare SaaS, and before that I spent five years freelancing on branding, digital and print.",
  ],
  // `wide` clusters run the full width of the board
  skillGroups: [
    {
      label: 'Design',
      wide: true,
      items: ['Design systems', 'Component libraries', 'Design tokens', 'Wireframing', 'Prototyping', 'Information architecture'],
    },
    {
      label: 'UX',
      items: ['UX research & personas', 'Usability testing', 'Heuristic evaluation', 'Accessibility', 'Design sprints'],
    },
    {
      label: 'Lead',
      items: ['Team mentoring', 'Stakeholder communication', 'Design storytelling'],
    },
  ],
  // The toolkit board: the tools I use, grouped by what they're for. Each name needs a logo in toolIcons.js.
  // On wide screens the groups sit in rows of eight tools, in this order: 5 + 3, then 2 + 6.
  toolkit: [
    { group: 'Design & prototyping', tools: ['Figma', 'FigJam', 'Adobe XD', 'Photoshop', 'Illustrator'] },
    { group: 'Research & testing', tools: ['Maze', 'Hotjar', 'Miro'] },
    { group: 'AI tools', tools: ['Claude', 'Lovable'] },
    { group: 'Build & handoff', tools: ['VS Code', 'HTML', 'CSS', 'Storybook', 'Jira', 'Confluence'] },
  ],
  // Oldest first: the About section lays them out as a timeline
  credentials: [
    { title: 'BFA, Advertising Design', detail: 'Govt. School of Art, Dr. B.A.M.U.', year: '2014', kind: 'Degree' },
    { title: 'MFA, Advertising Design', detail: 'Govt. School of Art, Dr. B.A.M.U.', year: '2016', kind: 'Degree' },
    certification,
    { title: 'HFI Certified Service Design Thinker', detail: 'Human Factors International', year: 'Nov 2024', kind: 'Certification' },
  ],
}

export const experience = [
  {
    period: 'Nov 2025 - Present',
    role: 'Senior UX Designer',
    company: 'Neutrino Tech Systems',
    points: [
      'Own end-to-end UX for a multi-tenant specialty pharma platform: enrollment, benefits verification, prior authorization, appeals, financial assistance, pharmacy fulfilment and adherence, across several user groups.',
      "Mapped the whole service as one patient's journey, giving a 30+ person team a shared model of the system and cutting new-member onboarding from about two weeks to a 30-minute walkthrough.",
      'Review UI builds for structure, spacing, states and accessibility before release, and work closely with engineers so they match the design.',
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
  'specialty-pharma': accessStory,
  workive,
  sitesaathi,
}
