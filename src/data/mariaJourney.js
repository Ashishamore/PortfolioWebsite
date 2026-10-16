// "Maria's Access Journey": the composite narrative behind the specialty pharma case study.
// Condensed from the source document. All people, organizations and figures are illustrative.

export const mariaJourney = {
  disclaimer:
    'A composite narrative built to explain how a specialty drug access program works end to end. All people, organizations and figures are illustrative.',

  patient: {
    name: 'Maria Alvarez',
    initials: 'MA',
    facts: ['47', 'Rheumatoid arthritis', 'Prefers Spanish', 'Columbus, OH'],
    therapy: 'Adalimumab, a biologic she injects herself every two weeks',
  },

  // Map positions are real longitude / latitude
  cast: [
    { persona: 'Patient', who: 'Maria Alvarez', org: 'At home', city: 'Columbus, OH', tz: 'ET', lon: -83.0, lat: 39.96 },
    { persona: 'Provider', who: 'Dr. Ellen Park + coordinator Priya Shah', org: 'Riverside Rheumatology', city: 'Columbus, OH', tz: 'ET', lon: -83.0, lat: 39.96 },
    { persona: 'Hub', who: 'Jordan Reyes, case manager + nurse team', org: 'Lumen Hub Services', city: 'Dallas, TX', tz: 'CT', lon: -96.8, lat: 32.78 },
    { persona: 'Payer', who: 'Pharmacy review team', org: 'Harborline Health Plan', city: 'Hartford, CT', tz: 'ET', lon: -72.68, lat: 41.76 },
    { persona: 'Specialty Pharmacy', who: 'Ana Morales, pharmacist', org: 'Crestview Specialty Pharmacy', city: 'Memphis, TN', tz: 'CT', lon: -90.05, lat: 35.15 },
    { persona: 'Manufacturer', who: 'Program + finance teams', org: 'Apexa Biologics HQ', city: 'Chicago, IL', tz: 'CT', lon: -87.63, lat: 41.88 },
    { persona: 'Manufacturer', who: 'Sam Whitaker, field reimbursement manager', org: 'Apexa Biologics, field', city: 'Cincinnati, OH', tz: 'ET', lon: -84.51, lat: 39.1 },
  ],
  castNote: 'Only Maria and her doctor are in the same city. Every handoff between the others runs through the platform.',

  // The story, chapter by chapter. `tone` marks the turning points: 'bad' (denied) or 'good' (approved, first dose)
  chapters: [
    {
      label: 'Prologue',
      day: '7 wks before',
      title: 'The program goes live',
      status: 'program live',
      moments: [
        {
          when: 'Mon, Jan 12, 2026',
          persona: 'Platform',
          city: 'Platform',
          text: 'Apexa Biologics hires Lumen Hub Services to run its RA access program. The platform team sets up the journey (enroll, verify, authorize, appeal, afford, initiate, adhere) and turns on SMART on FHIR for clinic EHRs, X12 270/271 eligibility, electronic prior auth and the specialty pharmacy network.',
        },
      ],
    },
    {
      label: 'Ch 1',
      day: 'Day 0',
      title: 'Diagnosis and enrollment',
      status: 'opened',
      moments: [
        {
          when: 'Mon, Mar 2, 2026 · 9:40 AM ET',
          persona: 'Provider',
          city: 'Columbus',
          text: "After 14 weeks, methotrexate hasn't controlled Maria's rheumatoid arthritis, so Dr. Park prescribes adalimumab. Priya opens the enrollment form inside the EHR, already pre-filled, and Maria signs consent on a tablet before she leaves.",
        },
        {
          when: '9:12 AM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: "Thirty-two minutes later the enrollment reaches Jordan's queue. Extraction has read the insurance card and flagged one low-confidence digit of the member ID. Jordan checks it against the image and opens case 1042.",
        },
        {
          when: '7:30 PM ET',
          persona: 'Patient',
          city: 'Home',
          text: 'Maria creates her patient portal account and chooses text messages in Spanish.',
        },
      ],
    },
    {
      label: 'Ch 2',
      day: 'Day 1',
      title: 'Benefits verification',
      status: 'benefits verified',
      moments: [
        {
          when: 'Tue, Mar 3 · 8:05 AM CT',
          persona: 'Hub',
          city: 'Dallas → Hartford',
          text: 'An eligibility check goes to Harborline and returns in seconds: coverage active, specialty tier, prior auth required under a step-therapy rule, 20% coinsurance after a $2,500 deductible. The case scores 72/100 for access friction and 81/100 for financial risk.',
        },
        {
          when: '12:30 PM ET',
          persona: 'Patient',
          city: 'Columbus',
          text: 'Maria gets a text in Spanish explaining what happens next, and what it could cost before any help.',
        },
      ],
    },
    {
      label: 'Ch 3',
      day: 'Days 2-8',
      title: 'Prior authorization',
      status: 'PA denied',
      tone: 'bad',
      moments: [
        {
          when: 'Wed, Mar 4 · 10:20 AM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: "A readiness check against the payer's policy finds two gaps: a recent TB screening and documentation of the methotrexate trial. Jordan sends the clinic a document request.",
        },
        {
          when: '2:15 PM ET',
          persona: 'Provider',
          city: 'Columbus',
          text: 'Priya uploads the negative TB test and the latest progress note in the provider portal. No fax, no phone tag.',
        },
        {
          when: 'Thu, Mar 5 · 9:00 AM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: 'The system drafts the authorization and estimates a 38% chance of denial. Jordan reviews the suggested draft, edits it and submits it electronically.',
        },
        {
          when: 'Tue, Mar 10 · 11:40 AM ET',
          persona: 'Payer',
          city: 'Hartford',
          tone: 'bad',
          text: "Denied. The policy needs 12 weeks of methotrexate at a documented dose, and the note shows when Maria started but not her dose. The decision lands on case 1042 within minutes.",
        },
      ],
    },
    {
      label: 'Ch 4',
      day: 'Days 8-14',
      title: 'Appeal',
      status: 'approved on appeal',
      tone: 'good',
      moments: [
        {
          when: 'Tue, Mar 10 · 11:15 AM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: "The fix is already in Maria's record: methotrexate 20 mg weekly since Nov 24, 2025, which is 14 weeks. The appeal and a letter of medical necessity are drafted, and Dr. Park gets a task to sign.",
        },
        {
          when: 'Wed, Mar 11 · 8:30 AM ET',
          persona: 'Manufacturer',
          city: 'Cincinnati → Columbus',
          text: "Sam, Apexa's field reimbursement manager, sees Harborline step-therapy denials rising across Ohio. The view is aggregated and de-identified, so Sam never sees Maria's name, and drives to the clinic to show how Harborline wants dose and duration documented.",
        },
        {
          when: '1:10 PM ET',
          persona: 'Provider',
          city: 'Columbus',
          text: 'Dr. Park signs the letter between patients. In Dallas, Jordan submits the appeal at 2:40 PM CT.',
        },
        {
          when: 'Mon, Mar 16 · 10:05 AM ET',
          persona: 'Payer',
          city: 'Hartford',
          tone: 'good',
          text: 'Approved on appeal, valid until March 15, 2027. A reauthorization task is scheduled for 45 days before that date.',
        },
      ],
    },
    {
      label: 'Ch 5',
      day: 'Day 14',
      title: 'Paying for it',
      status: 'copay card: $5',
      moments: [
        {
          when: 'Mon, Mar 16 · 11:30 AM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: "A financial risk score of 81 means cost could make Maria stop treatment. She's screened against every assistance route, and with commercial insurance the manufacturer's copay program is the best match.",
        },
        {
          when: '6:45 PM ET',
          persona: 'Patient',
          city: 'Home',
          text: 'Maria reads the copay terms in Spanish and signs in the portal. The card is issued immediately, and her cost per fill drops from about $1,200 to $5.',
        },
      ],
    },
    {
      label: 'Ch 6',
      day: 'Days 15-18',
      title: 'Pharmacy, delivery and first dose',
      status: 'on therapy',
      tone: 'good',
      moments: [
        {
          when: 'Tue, Mar 17 · 8:50 AM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: "In-network pharmacies are ranked for the case. Crestview in Memphis scores 94: drug in stock, Spanish-speaking pharmacists and overnight refrigerated delivery. The referral carries the whole case, so Crestview doesn't repeat the insurance check.",
        },
        {
          when: 'Wed, Mar 18 · 10:00 AM CT',
          persona: 'Specialty Pharmacy',
          city: 'Memphis',
          text: 'Ana calls Maria in Spanish, confirms a Friday delivery and books a nurse video session for the first injection. The claim runs with the copay card applied: Maria owes $5.',
        },
        {
          when: 'Thu, Mar 19 · 4:30 PM CT',
          persona: 'Specialty Pharmacy',
          city: 'Memphis',
          text: 'Two pens, a 28-day supply, ship overnight in an insulated box. A temperature logger keeps watch: 2 to 8 °C.',
        },
        {
          when: 'Fri, Mar 20 · 10:35 AM ET',
          persona: 'Patient',
          city: 'Home',
          tone: 'good',
          text: 'The box arrives in range. At 2:00 PM, with a nurse on video, Maria gives herself the first dose: 18 days after the prescription.',
        },
      ],
    },
    {
      label: 'Ch 7',
      day: 'Day 19+',
      title: 'Staying on therapy',
      status: 'adherent',
      moments: [
        {
          when: 'Wed, Apr 1 · 10:00 AM CT',
          persona: 'Manufacturer',
          city: 'Chicago',
          text: "Apexa's finance team finds 14 claims, including Maria's first fill, paid below the contracted rate. They move to a recovery queue and are corrected three weeks later.",
        },
        {
          when: 'Wed, Apr 15 · 9:00 AM ET',
          persona: 'Patient',
          city: 'Columbus',
          tone: 'bad',
          text: "Maria doesn't answer her refill reminder. Her last injection site turned red and itchy, and she's nervous. Her risk score jumps from 34 to 71 and opens an outreach task.",
        },
        {
          when: '1:20 PM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: 'A nurse calls in Spanish, explains that mild site reactions are common and shows her how to rotate sites. Maria confirms her refill, and it ships the next day.',
        },
        {
          when: 'Mon, Jun 1 · 2:00 PM CT',
          persona: 'Manufacturer',
          city: 'Chicago',
          text: 'The quarterly review shows step-therapy denials concentrated in Ohio, the same pattern that sent Sam to clinics. Maria appears only as one de-identified member of an adherence cohort.',
        },
        {
          when: 'Tue, Dec 1 · 9:00 AM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: 'Copay enrollment runs by calendar year. Maria confirms her 2027 insurance in the portal, and her card carries over without a break.',
        },
      ],
    },
    {
      label: 'Ch 8',
      day: 'Days 333-344',
      title: 'Reauthorization',
      status: 'reauthorized',
      tone: 'good',
      moments: [
        {
          when: 'Fri, Jan 29, 2027 · 7:00 AM CT',
          persona: 'Hub',
          city: 'Dallas',
          text: 'The reauthorization task scheduled back in March opens on its own, 45 days before expiry. Harborline wants proof the drug is working, so the hub requests a current progress note.',
        },
        {
          when: 'Tue, Feb 2 · 11:00 AM ET',
          persona: 'Provider',
          city: 'Columbus',
          text: "Priya uploads Dr. Park's note: Maria's disease activity score (DAS28) is down from 5.6 (high) to 2.9 (low). Jordan submits the next morning.",
        },
        {
          when: 'Tue, Feb 9 · 10:30 AM ET',
          persona: 'Payer',
          city: 'Hartford',
          tone: 'good',
          text: 'Approved through March 15, 2028. Coverage never lapses.',
        },
      ],
    },
    {
      label: 'Epilogue',
      day: 'Day 365',
      title: 'One year on',
      status: 'year one done',
      tone: 'good',
      moments: [
        {
          when: 'Tue, Mar 2, 2027',
          persona: 'Patient',
          city: 'Columbus',
          tone: 'good',
          text: "A year after that first appointment, Maria is gardening and typing without pain. Her journey continues: her copay card renews each December, and her next reauthorization opens in January 2028.",
        },
      ],
    },
  ],

  numbers: [
    { value: '18 days', label: 'Prescription to first dose', note: 'including a denial and an appeal' },
    { value: '$5', label: "Maria's cost per fill", note: 'down from about $1,200' },
    { value: '0', label: 'Days without coverage', note: 'reauthorized before expiry' },
    { value: '98%', label: 'Days with medicine on hand', note: '80% or more counts as adherent' },
  ],

  routes: [
    { if: 'The first authorization is approved', then: 'The case skips the appeal and goes straight to financial assistance. Maria starts about six days sooner.' },
    { if: 'Maria has no insurance, or too little', then: "She's matched to the manufacturer's patient assistance program, which supplies the drug free." },
    { if: 'Maria is on Medicare', then: "Manufacturer copay cards aren't permitted for Medicare patients, so she's routed to a charitable foundation grant instead." },
    { if: 'The clinic faxes the enrollment', then: 'The fax is read into the same intake queue, and the rest of the journey is unchanged.' },
  ],
}
