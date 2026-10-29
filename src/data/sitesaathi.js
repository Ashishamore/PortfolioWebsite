// Case study 03: SiteSaathi, a project management platform for contractors. Work in progress.
// Drawn from the prototype (contractors app), its README and "Contractor Platform: Problems & Feature Map".
import clientApprovals from '../assets/sitesaathi/client-approvals.jpg'
import clientHome from '../assets/sitesaathi/client-home.jpg'
import insights from '../assets/sitesaathi/insights.jpg'
import login from '../assets/sitesaathi/login.jpg'
import more from '../assets/sitesaathi/more.jpg'
import ownerHome from '../assets/sitesaathi/owner-home.jpg'
import quotes from '../assets/sitesaathi/quotes.jpg'
import siteDetail from '../assets/sitesaathi/site-detail.jpg'
import sites from '../assets/sitesaathi/sites.jpg'
import tasks from '../assets/sitesaathi/tasks.jpg'
import worker from '../assets/sitesaathi/worker.jpg'
import workforce from '../assets/sitesaathi/workforce.jpg'

export const sitesaathiScreens = { login, ownerHome, sites, siteDetail, tasks, quotes, insights, more, workforce, worker, clientApprovals, clientHome }

export const sitesaathi = {
  eyebrow: 'Construction SaaS · Mobile + web · 2026 · Work in progress',
  title: { before: 'Stop losing money in the', highlight: 'gaps', after: 'between sites' },
  deck: 'A project management platform for contractors who take on contracts, deploy labour and get the work done. One app for every site, worker, rupee and client.',
  meta: [
    { label: 'Role', value: 'Product designer, solo' },
    { label: 'Status', value: 'Work in progress' },
    { label: 'Prototype', value: 'Working prototype, built with AI-assisted tools' },
  ],
  app: 'sitesaathi-app',
  poster: 'login',
  tryThis: [
    'Tap a persona to sign in: no password needed',
    'As Rajesh (owner), read the Home briefing',
    'As Ramesh (worker), hear today\'s work in Marathi',
    'As Anil (client), approve extra work with the OTP',
  ],

  // [01] where it stands today
  progress: {
    lead: "SiteSaathi is a working prototype, still being shaped. Here's what's done, what's being worked on, and what comes next.",
    columns: [
      {
        label: 'Done',
        tone: 'done',
        items: [
          'Problem research: 101 problems across 17 areas',
          'Feature map: 19 modules, each tied to the problems it solves',
          'Working prototype with 10 roles and role-based access',
          'Voice notes in Marathi, Hindi and English',
          'Super admin web console',
        ],
      },
      {
        label: 'In progress',
        tone: 'doing',
        items: ['Visual polish and consistency across all modules', 'Simplifying the worker app for first-time phone users', 'Tightening flows that take more than three taps'],
      },
      {
        label: 'Next',
        tone: 'next',
        items: ['Testing with contractors on live sites', 'Offline-first for basements and upper floors', 'Real WhatsApp, OTP and UPI in place of the simulated ones'],
      },
    ],
    stats: [
      { value: '101', label: 'problems mapped' },
      { value: '19', label: 'modules designed' },
      { value: '10', label: 'roles, one app' },
      { value: '3', label: 'languages, by voice' },
    ],
  },

  // [02] the problem
  problem: {
    lead: 'Contractors juggling several sites lose money and trust in the same places: forgotten discussions, untracked workers and expenses, unwritten terms and slow payments.',
    note: 'Examples follow Indian site practice: weekly wages and advances (uchal), UPI and GST, housing society rules, and workers who speak Marathi or Hindi.',
    areas: [
      { id: 'A', name: 'Memory across sites', count: 6 },
      { id: 'B', name: 'Workers and labour', count: 9 },
      { id: 'C', name: 'Language and literacy', count: 4 },
      { id: 'D', name: 'Tasks and scheduling', count: 9 },
      { id: 'E', name: 'Clients and approvals', count: 7 },
      { id: 'F', name: 'Emergencies', count: 4 },
      { id: 'G', name: 'Contracts and quotes', count: 6 },
      { id: 'H', name: 'Billing and cash flow', count: 6 },
      { id: 'I', name: 'Expenses and profit', count: 9 },
      { id: 'J', name: 'Materials and vendors', count: 8 },
      { id: 'K', name: 'Tools and equipment', count: 2 },
      { id: 'L', name: 'Drawings and photos', count: 5 },
      { id: 'M', name: 'Quality and handover', count: 6 },
      { id: 'N', name: 'Sub-contractors', count: 5 },
      { id: 'O', name: 'Site rules and safety', count: 4 },
      { id: 'P', name: 'Growing the business', count: 5 },
      { id: 'Q', name: 'Barriers to any app', count: 6 },
    ],
    // a few problems in the contractor's own words
    voices: [
      { id: 'A3', text: '"Shift the switchboard 2 ft left," said on Sunday, never reaches the electrician.' },
      { id: 'B4', text: '₹2,000 given mid-week is missed at the weekly payment.' },
      { id: 'E1', text: '"While you\'re here, can you also…" Unpaid work, and fights at the final bill.' },
      { id: 'Q1', text: 'Contractors are moving, on calls, often with dusty hands. Apps that need typing go unused.' },
    ],
  },

  // [03] who uses it
  roles: {
    lead: 'One platform, ten roles. The team works with the contractor in private; the client sees only shared updates, approvals, bills and the emergency line.',
    side: [
      {
        label: 'Contractor team',
        people: [
          { role: 'Owner', who: 'Rajesh Patil', sees: 'Briefing, risks, quotes, billing, profit' },
          { role: 'Manager', who: 'Sneha Patil', sees: 'What the owner allows' },
          { role: 'Supervisor', who: 'Sunil Jadhav', sees: 'Attendance, tasks, petty cash, material requests' },
          { role: 'Accountant', who: 'Priya Deshmukh', sees: 'Invoices, payment proofs, vendor ledger' },
          { role: 'Worker', who: 'Ramesh Pawar', sees: "Today's work read aloud, wages, advances" },
        ],
      },
      {
        label: 'Outside the team',
        people: [
          { role: 'Client', who: 'Anil Kulkarni', sees: 'Approvals, bills, progress, emergency button' },
          { role: 'Architect', who: 'Ar. Meera Shah', sees: 'Drawings, revisions, selections' },
          { role: 'Sub-contractor', who: 'Imran Shaikh', sees: 'Work orders paid on measured quantity' },
          { role: 'Vendor', who: 'Ganesh Hardware', sees: 'Orders to confirm and dispatch, dues' },
          { role: 'Super admin', who: 'Kavya Iyer', sees: 'Organisations, plans, modules, audit' },
        ],
      },
    ],
  },

  // [04] the app, screen by screen
  screens: [
    { key: 'ownerHome', title: 'Owner home', text: 'A briefing that leads with what needs attention: delays, overdue money, sites at risk.' },
    { key: 'sites', title: 'All sites', text: 'Every site on one screen: progress, money due, open issues and status.' },
    { key: 'siteDetail', title: 'Site hub', text: 'One card per site, with the team, money, rules and emergency info in one place.' },
    { key: 'tasks', title: 'Tasks', text: "Today's focus, overdue and blocked work, follow-ups, across every site." },
    { key: 'workforce', title: 'Workforce', text: 'Who is on which site today, attendance with a group photo, gangs and safety.' },
    { key: 'worker', title: 'Worker app', text: "In the worker's language, with big icon tiles: today's work, done with a photo, materials, problems." },
    { key: 'quotes', title: 'Quotes', text: 'Quotes from a rate library, sent as a link and accepted by the client with an OTP.' },
    { key: 'insights', title: 'Profit + business', text: 'Live profit per site after overheads, budget against actual.' },
    { key: 'clientApprovals', title: 'Client approvals', text: 'Extra work and choices approved in the app, so "I never approved this" has an answer.' },
    { key: 'clientHome', title: 'Client home', text: 'Progress, decisions waiting on the client, money due, and an emergency button.' },
  ],

  // [05] decisions, each tied to problem IDs from the feature map
  decisions: [
    { title: 'Speak, don\'t type', problem: 'Q1 · A1 · A3', text: 'Ten seconds of speaking in Marathi, Hindi or English becomes notes, decisions and tasks, with translations for the workers.', screen: 'ownerHome' },
    { title: 'A worker app with no reading', problem: 'C1 · C4', text: "Big icon tiles, today's work read aloud in the worker's language, and \"done\" proven with a photo.", screen: 'worker' },
    { title: 'Two rooms for every site', problem: 'E4', text: 'A private team space and a separate client space, so margins and mistakes never leak into the client\'s view.', screen: 'clientHome' },
    { title: 'Extra work needs a yes', problem: 'E1 · E2', text: 'Change orders carry a price and are approved by the client with an OTP before work starts.', screen: 'clientApprovals' },
    { title: 'Money only for those who should see it', problem: 'Q6', text: 'Contract values and margins are hidden by role. The owner fine-tunes what each role can see.', screen: 'insights' },
    { title: 'Meet people where they already are', problem: 'Q4', text: 'Orders, reminders and receipts go out on WhatsApp, so vendors and clients don\'t need yet another app.', screen: 'quotes' },
  ],

  modules: [
    'Site hub', 'Voice site diary + visit mode', 'Tasks, deadlines + daily focus', 'Team calendar + timeline', 'Workforce: attendance, wages + advances',
    'Worker app: language, voice + WhatsApp', 'Internal + client spaces', 'Client requests + emergency line', 'Quotes, contracts + change orders',
    'Billing, collections + cash flow', 'Expenses + petty cash', 'Site profit + business dashboard', 'Materials, vendors, stock + tools',
    'Drawings, photos + progress reports', 'Quality, snags, handover + warranty', 'Sub-contractors + trade coordination', 'Leads, portfolio + growth',
    'AI assistant', 'Foundations',
  ],
  // the first release, covering the pains every contractor shares
  firstRelease: [1, 2, 3, 5, 11, 12],

  endLine: 'Want a walkthrough of SiteSaathi, or to talk about a product like this?',
}
