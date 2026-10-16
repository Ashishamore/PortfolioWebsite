// Case study 02: Workive!, a coordination app for freelance photography crews.
// Drawn from the prototype itself (Portfolio-Project-1) and its commit notes.
import assignment from '../assets/workive/assignment.jpg'
import chat from '../assets/workive/chat.jpg'
import create from '../assets/workive/create.jpg'
import home from '../assets/workive/home.jpg'
import money from '../assets/workive/money.jpg'
import notifications from '../assets/workive/notifications.jpg'
import profile from '../assets/workive/profile.jpg'
import schedule from '../assets/workive/schedule.jpg'
import weddingPoster from '../assets/workive/wedding-days-poster.jpg'
import weddingVideo from '../assets/workive/wedding-days.mp4'

export const workiveScreens = { home, schedule, assignment, money, profile, chat, create, notifications }

export const workive = {
  eyebrow: 'Personal product · Mobile app · 2026',
  title: { before: 'Workive!: one place to', highlight: 'staff', after: 'a photo shoot' },
  deck: "Born from my college days shooting weddings: a working prototype for photographers and videographers who staff each other's shoots, with assignments, crew availability, money and chat in one app.",
  meta: [
    { label: 'Role', value: 'Product designer + front-end, solo' },
    { label: 'Platform', value: 'Mobile web prototype' },
    { label: 'Built with', value: 'React, TypeScript, Tailwind CSS, AI-assisted development' },
  ],
  // the live app in the hero starts from this screenshot until someone taps it
  heroPoster: 'home',
  // suggestions beside the live app
  tryThis: [
    'Answer the waiting invite on Home',
    'Open Schedule and change a day to Available',
    'Tap a shoot, then its Money tab',
    'Create a new assignment',
  ],

  // [01] where the idea came from, in Aashish's own experience
  origin: {
    video: weddingVideo,
    poster: weddingPoster,
    videoCaption: 'A clip from one of those weddings: me with the camera, beside the videographer.',
    text: [
      'In college, I paid my fees by shooting weddings.',
      "No one covers a big Indian wedding alone. We teamed up with other photographers and videographers to complete every assignment, and each shoot was a small, temporary crew.",
      'On peak muhurat dates, when half the city gets married on the same day, skilled photographers were in short supply. Everyone was already booked, and finding help meant calling around until someone said yes.',
    ],
    moment: {
      label: 'the moment it clicked',
      title: 'The day my drone met a coconut tree',
      text: [
        'We were on a pre-wedding shoot on a beach in Goa when my drone crashed into a coconut tree.',
        'I was shooting at that location for the first time, and I needed someone with a drone, nearby, right away. There was no way to find one.',
      ],
      punchline: 'That gap is what Workive! is built to close.',
    },
    name: {
      title: 'Why "Workive!"',
      parts: ['Work', 'Hive'],
      text: 'Bees gather where there is honey. Put the work in one place, and freelancers, the bees, gather around the hive.',
    },
    insider:
      "I knew these problems from the inside, down to the micro ones: who's free on a muhurat date, who brings which gear, where exactly to meet on an unfamiliar location, and who has paid whom. The platform is designed around that understanding of the domain.",
  },

  context: {
    text: [
      "Photographers and videographers staff each other's shoots all the time: a second shooter for a wedding, a drone operator for a pre-wedding, a candid photographer for the reception. One person runs the assignment and brings a crew onto it.",
      "That one shoot raises a lot of small questions: who's free that week, who said yes, which days each person works, where exactly to show up, and who has paid whom. Workive! puts all of it on the assignment.",
    ],
    // the jobs the app has to do, one sticky note each
    jobs: [
      { title: 'Find people', text: 'Find someone free nearby, by city, speciality and level, even at short notice.' },
      { title: 'Book a crew', text: 'Invite people onto an assignment; it reaches their calendar once they accept.' },
      { title: 'Plan the days', text: 'Shifts per crew member, call times and a pinned location for each shoot.' },
      { title: 'Track the money', text: 'Client budget, crew fees, payments and expenses per assignment.' },
      { title: 'Build trust', text: 'Teammates rate each other after a shoot they actually worked on together.' },
    ],
  },

  // Proto-personas: built from domain experience, to be validated with interviews.
  // `tech` scores are 1 to 5.
  personas: {
    lead: 'Two people sit at either end of most shoots: the photographer who builds the crew, and the event manager who hires them.',
    note: 'Proto-personas, built from my own time shooting weddings and working with crews. Names and businesses are illustrative.',
    people: [
      {
        name: 'Meera Jadhav',
        initials: 'MJ',
        age: 27,
        role: 'Wedding photographer and studio founder',
        business: 'Runs a small wedding studio with 2 full-time shooters',
        city: 'Pune, Maharashtra',
        color: 'bg-note-pink',
        icon: 'camera',
        quote: 'On a big muhurat date, my calendar is full by noon and I still need three more people by evening.',
        bio: "Meera turned a college side hustle into a studio. She shoots weddings and pre-weddings across Maharashtra and builds a fresh crew of freelancers for almost every booking. Her name is on the final album, so she cares who's holding the second camera.",
        goals: [
          'Staff every shoot, even on peak muhurat dates',
          'Work with freelancers whose quality she can trust',
          "Know exactly what she owes each crew member, and what the client still owes her",
          'Grow the studio on reputation, not discounts',
        ],
        frustrations: [
          'Calling 15 people to find one free second shooter',
          'A new freelancer turns up without the right lens, or not at all',
          "Fees agreed on a call, then remembered differently a month later",
          'Shoot details lost in three WhatsApp groups',
        ],
        tools: ['WhatsApp', 'Instagram', 'Google Calendar', 'Notes app', 'UPI'],
        tech: [
          { label: 'Phone-first', value: 5 },
          { label: 'Comfort with new apps', value: 4 },
          { label: 'Patience for setup', value: 2 },
        ],
        scenario: {
          title: 'Three weddings, one muhurat date',
          text: 'In December, three couples book her for the same day. She needs two extra photographers and a candid shooter, in two cities, within a week.',
        },
        workive: [
          'Search by city, speciality and level, with ratings from real teammates',
          'Invite people onto each wedding; it reaches their calendar only once they accept',
          "Per-person shifts, so a two-day crew member isn't booked for all three",
          'Crew fees agreed by both sides, client payments tracked per shoot',
        ],
      },
      {
        name: 'Kunal Patil',
        initials: 'KP',
        age: 29,
        role: 'Event manager',
        business: 'Plans weddings and corporate events for a planning company',
        city: 'Mumbai, Maharashtra',
        color: 'bg-note-blue',
        icon: 'clipboard',
        quote: "I can plan a 400-guest wedding in Udaipur. What I can't plan for is the drone guy cancelling the night before.",
        bio: "Kunal runs four to six events a month, many of them destination weddings in cities he doesn't know well. He hires photographers, videographers and drone operators for each one, and the client expects him to have a backup for everything.",
        goals: [
          'Find reliable photo and video crews in any city, fast',
          'One place for call times, venues and who is where, each day',
          'Clear vendor budgets and payments for every event',
          'Never tell a client "we have no photographer"',
        ],
        frustrations: [
          "No trusted contacts in a new destination city",
          'Last-minute dropouts with no quick way to replace them',
          'Venue pins and timings resent again and again in chats',
          'Vendor payments tracked across sheets, chats and memory',
        ],
        tools: ['WhatsApp', 'Google Sheets', 'Google Calendar', 'Trello', 'Phone calls'],
        tech: [
          { label: 'Phone-first', value: 5 },
          { label: 'Comfort with new apps', value: 4 },
          { label: 'Patience for setup', value: 3 },
        ],
        scenario: {
          title: 'A destination wedding in Goa',
          text: "Two days before a beach wedding, the drone operator he booked drops out. He has never worked in Goa and needs someone local who is free on those exact dates.",
        },
        workive: [
          "Find drone operators and photographers in Goa who are free on the wedding dates",
          'A pinned Maps location, Directions and call times for every crew member',
          'Night-before call-time reminders so nobody is late',
          'Budget, expenses and payments per event, with late payments flagged',
        ],
      },
    ],
    // how the two personas connect on the platform
    link: 'Kunal hires Meera for the wedding. Meera staffs her crew on Workive. Both see the same shoot, from their side.',
  },

  // How Workive compares with the tools crews use today.
  // In `matrix`, each row scores the tools in `tools` order: 2 = built for it, 1 = partly / with workarounds, 0 = no.
  competition: {
    lead: "Crews already juggle a calendar, a booking link, a task board and a WhatsApp group. Each one is good at its own job. None of them was built for the job a wedding crew actually has.",
    tools: [
      { name: 'Workive!', kind: 'Crew network for shoots', builtFor: 'Finding freelancers, booking them onto a shoot and settling up afterwards.', us: true },
      { name: 'Google Calendar', kind: 'Personal calendar', builtFor: "Your own time, and events you share with people you already know." },
      { name: 'Calendly', kind: 'Booking link', builtFor: 'Letting clients pick a free slot in your calendar.' },
      { name: 'Setmore', kind: 'Appointment booking', builtFor: "Customers booking a business's staff and services." },
      { name: 'Trello', kind: 'Task board', builtFor: "Moving cards through a team's to-do lists." },
      { name: 'monday.com', kind: 'Work management', builtFor: "An organisation's projects, workflows and dashboards." },
      { name: 'WhatsApp groups', kind: 'Messaging', builtFor: 'Talking. In practice, where most shoots get organised today.' },
      { name: 'HoneyBook', kind: 'Client management', builtFor: 'A creative business managing its own clients, contracts and invoices.' },
    ],
    matrix: [
      { need: 'Find a free photographer or drone operator nearby, at short notice', scores: [2, 0, 0, 0, 0, 0, 1, 0] },
      { need: 'See availability across independent freelancers, not just your own team', scores: [2, 1, 1, 1, 0, 1, 0, 0] },
      { need: "Book a crew onto a multi-day shoot, with each person's own days", scores: [2, 1, 0, 0, 1, 1, 0, 0] },
      { need: 'On your calendar only once you accept the invite', scores: [2, 1, 0, 0, 0, 0, 0, 0] },
      { need: 'Profiles with specialities, level, day rate and portfolio', scores: [2, 0, 0, 0, 0, 0, 0, 0] },
      { need: 'Per-shoot money: client budget, crew fees and payments both sides confirm', scores: [2, 0, 1, 1, 0, 1, 0, 1] },
      { need: 'Chat that lives on the shoot it belongs to', scores: [2, 0, 0, 0, 1, 1, 1, 1] },
      { need: 'Ratings only from people who worked the shoot with you', scores: [2, 0, 0, 0, 0, 0, 0, 0] },
    ],
    // the positioning map: x = own team -> open network of freelancers, y = general purpose -> built for shoots (0 to 100)
    map: [
      { name: 'Trello', x: 10, y: 8 },
      { name: 'Google Calendar', x: 38, y: 14 },
      { name: 'Calendly', x: 22, y: 26 },
      { name: 'Setmore', x: 12, y: 37 },
      { name: 'monday.com', x: 31, y: 46 },
      { name: 'HoneyBook', x: 16, y: 64 },
      { name: 'WhatsApp groups', x: 72, y: 16 },
      { name: 'Workive!', x: 82, y: 84, us: true },
    ],
    different: [
      { title: 'It finds the people', text: 'Every other tool assumes you already have your team. Workive starts one step earlier, with who is free, nearby and good at the shot you need.' },
      { title: 'It speaks shoot, not task', text: 'Call times, multi-day shifts, crew roles, a pinned venue and the night-before reminder, instead of cards, slots and generic events.' },
      { title: 'It settles the money', text: 'Client budget, crew fees agreed by both sides and payments the other person confirms. The part a calendar or a board never touches.' },
      { title: 'It builds trust', text: 'Ratings come only from people who actually worked the shoot together, so a profile means something to a stranger.' },
    ],
    note: "Workive doesn't try to replace your calendar. Shoots export to Google Calendar and any .ics calendar, so it adds the crew layer on top of the tools people already use.",
  },

  // Information architecture, mapped from the prototype's real routes and links.
  // Each tab lists the screens and sections inside it. `kind`: 'screen' | 'section' | 'overlay'.
  // `to` names a shared screen the item opens (see `shared`).
  ia: {
    lead: 'Four tabs in the bottom bar, one job each. Everything a shoot needs hangs off the assignment, and every tab can reach it.',
    tabs: [
      {
        name: 'Home',
        icon: 'home',
        job: 'What needs me today?',
        items: [
          { name: 'Find a photographer', kind: 'overlay', note: 'search people, assignments and places', to: 'Photographer profile' },
          { name: 'Waiting for your answer', kind: 'section', note: 'invites to accept or decline', to: 'Assignment' },
          {
            name: 'Money dashboard',
            kind: 'section',
            note: 'earned, owed to you, you owe',
            children: [{ name: 'Money', kind: 'screen', note: 'open · payment due · closed · late', to: 'Assignment' }],
          },
          { name: 'Upcoming assignments', kind: 'section', to: 'Assignment' },
          { name: 'Recent chats', kind: 'section', to: 'Chat thread' },
          { name: 'Notifications', kind: 'screen', note: 'call times, payments, reviews to leave' },
        ],
      },
      {
        name: 'Chat',
        icon: 'chat',
        job: 'Who do I need to talk to?',
        items: [
          { name: 'Filters', kind: 'section', note: 'all · unread · events · people' },
          { name: 'Chat thread', kind: 'screen', note: 'one per person or per shoot', to: 'Photographer profile' },
          { name: 'Event chats', kind: 'section', note: 'a thread for each shoot', to: 'Assignment' },
        ],
      },
      {
        name: 'Schedule',
        icon: 'schedule',
        job: 'Where am I, and when?',
        items: [
          { name: 'Week strip + day list', kind: 'section', note: 'availability per day', to: 'Assignment' },
          { name: 'Export', kind: 'overlay', note: '.ics or Google Calendar, with reminders' },
          {
            name: 'New assignment',
            kind: 'screen',
            note: 'name, location, Maps link, dates, call time',
            children: [{ name: 'Client details', kind: 'section', note: 'optional' }],
          },
        ],
      },
      {
        name: 'Profile',
        icon: 'profile',
        job: 'How do others see me?',
        items: [
          { name: 'Availability calendar', kind: 'section', note: 'set each day available or not' },
          { name: 'Portfolio + reviews', kind: 'section', note: 'links, posts, ratings from teammates' },
          { name: 'Edit profile', kind: 'screen' },
          {
            name: 'Menu',
            kind: 'screen',
            children: [
              { name: 'Saved, liked and following', kind: 'screen' },
              { name: 'Activity log', kind: 'screen' },
              { name: 'Get verified', kind: 'screen' },
              { name: 'Notification + privacy settings', kind: 'screen' },
            ],
          },
        ],
      },
    ],
    // screens many paths lead to
    shared: [
      {
        name: 'Assignment',
        from: ['Home', 'Schedule', 'Chat', 'Money'],
        tabs: ['Details: dates, call time, pinned location, client', "Crew + each person's shifts", 'Money: budget, fees, payments, expenses', 'Chats'],
      },
      {
        name: 'Photographer profile',
        from: ['Search', 'Chat', 'Assignment crew'],
        tabs: ['Specialities, level, day rate', 'Portfolio and reviews', 'Message', 'Add to an assignment'],
      },
    ],
  },

  // Low-fidelity wireframes: the structure of each main screen, before colour and content.
  // `notes` match the numbered markers on each frame, in order.
  wireframes: {
    lead: 'The main screens stripped back to structure: what goes where and what comes first, before colour, content or polish.',
    screens: [
      {
        key: 'home',
        title: 'Home',
        notes: ['Invites first: answer them before anything else', 'Money at a glance: earned, owed to you, you owe', 'Next shoots, one tap from the assignment'],
      },
      {
        key: 'schedule',
        title: 'Schedule',
        notes: ['New assignments start here, from a date', 'Week strip, with dots on busy days', 'Each day carries its own availability'],
      },
      {
        key: 'assignment',
        title: 'Assignment',
        notes: ['Details, Money and Chats as tabs', 'A pinned map with Directions and Share', "Crew, with each person's own days"],
      },
      {
        key: 'create',
        title: 'New assignment',
        notes: ['Optional Maps link beside the written location', 'Client details stay optional, tucked away', 'Create first, then bring people onto it'],
      },
      {
        key: 'money',
        title: 'Money',
        notes: ['Profit to date, the number that matters most', 'Late payments called out before the list', 'Filters: open, payment due, closed, late'],
      },
      {
        key: 'profile',
        title: 'Profile',
        notes: ['Trust signals up top: shoots, hires, followers, rating', 'An availability calendar others can read'],
      },
    ],
  },

  // [02] the app, screen by screen
  screens: [
    { key: 'home', title: 'Home', text: "What needs an answer, this month's money and the next shoots, all on one screen." },
    { key: 'schedule', title: 'Schedule', text: 'A week strip and day list. Each day carries its availability, so a busy day is visible before anyone asks.' },
    { key: 'assignment', title: 'Assignment', text: 'Dates, call time, pinned location, client and crew, with Details, Money and Chat tabs.' },
    { key: 'money', title: 'Money', text: 'What you earned, are owed and owe, with profit to date and late payments flagged.' },
    { key: 'create', title: 'New assignment', text: 'Set it up first, then bring people onto it. Client details stay optional.' },
    { key: 'chat', title: 'Chats', text: 'People and events in one inbox, so shoot talk stays attached to the shoot.' },
    { key: 'profile', title: 'Profile', text: 'Specialisations, level, day rate, portfolio links and an availability calendar.' },
    { key: 'notifications', title: 'Notifications', text: 'Call-time reminders, payments to confirm, overdue clients and reviews to leave.' },
  ],

  // [03] decisions, each from a real problem in the prototype
  decisions: [
    {
      title: 'Shifts per person, not per shoot',
      problem: 'Not everyone works the full run of a multi-day shoot.',
      decision: 'Each crew member has their own days, filled in as invites are accepted, so a partial crew no longer looks like a partial assignment.',
      screen: 'assignment',
    },
    {
      title: "It's on your calendar only once you say yes",
      problem: 'An invite is a question, not a booking.',
      decision: 'Assignments are Draft or Published, and a shoot reaches a crew member\'s calendar only after they accept.',
      screen: 'schedule',
    },
    {
      title: 'The calendar you read is the calendar you edit',
      problem: 'Your own profile calendar only reported a day; changing it meant a trip to another tab.',
      decision: 'Tapping a day now opens the status picker right there. Days you have accepted work on stay locked, and the sheet says why, because touch screens never show tooltips.',
      screen: 'profile',
    },
    {
      title: 'A pinned map link beats a typed address',
      problem: 'A written location is enough for a city, not for one entrance of a large venue.',
      decision: 'An assignment can carry a Google Maps link. It powers the preview, Directions and Share, and fills an empty location without overwriting what was typed.',
      screen: 'create',
    },
    {
      title: 'Money both sides agree on',
      problem: 'Fees and payments between freelancers are easy to remember differently.',
      decision: 'Crew fees are agreed by both sides, a payment counts once the other party confirms it, and late payments are flagged on Home and Money.',
      screen: 'money',
    },
    {
      title: 'Reviews only from real teammates',
      problem: 'Ratings matter only if the reviewer actually worked with you.',
      decision: 'After a shoot, teammates rate each other, and each review carries the assignment it came from.',
      screen: 'notifications',
    },
  ],

  // [04] where it stands
  status: {
    lead: 'Workive! is a working, clickable prototype that runs in the browser, built screen by screen as the design took shape.',
    points: [
      { label: 'Now', text: 'A working prototype covering home, schedule, assignments, money, chat, profiles and settings. Try it at the top of this page.' },
      { label: 'Kept', text: 'A snapshot of everything explored, saved as the reference for the next build.' },
      { label: 'Next', text: 'Taking it to Android and iOS.' },
    ],
  },

  endLine: 'Want a walkthrough of the prototype, or to talk about a product like this?',
}
