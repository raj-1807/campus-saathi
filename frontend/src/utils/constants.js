// ===== CAMPUS SAATHI — CONSTANTS =====

export const APP_NAME = 'Campus Saathi';
export const APP_TAGLINE = 'AI COMPANION';
export const APP_DESCRIPTION =
  'Ask questions about admissions, courses, facilities, events, and more — powered by AI.';

// Navigation — matches PDF reference
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Admission', href: '/admission' },
  { label: 'Training & Placement', href: '/placement' },
  { label: 'Complaints', href: '/complaints' },
  { label: 'Student Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Ask Campus Saathi', href: '/chat' },
];

// Chat
export const SUGGESTED_QUESTIONS = [
  'What is the admission process for B.Tech Computer Science?',
  'What are the placement stats?',
  'How do I register a complaint?',
  'What are the library timings?',
  'What scholarships are available?',
  'Tell me about upcoming events',
];

export const SYSTEM_PROMPT = `You are Campus Saathi, a friendly and knowledgeable AI assistant for college students. 
You help students find information about their campus — admissions, courses, faculty, facilities, events, notices, and more.

Guidelines:
- Be friendly, concise, and helpful
- If you have source documents, cite them
- If you don't know something, say so honestly
- Respond in the same language the student uses (Hindi or English)
- Use bullet points and formatting for clarity
- Keep responses focused and relevant`;

// Search categories
export const SEARCH_CATEGORIES = [
  { id: 'all', label: 'All', icon: 'LayoutGrid' },
  { id: 'admissions', label: 'Admissions', icon: 'GraduationCap' },
  { id: 'courses', label: 'Courses', icon: 'BookOpen' },
  { id: 'faculty', label: 'Faculty', icon: 'Users' },
  { id: 'facilities', label: 'Facilities', icon: 'Building2' },
  { id: 'events', label: 'Events', icon: 'Calendar' },
];

// Event categories — matches PDF
export const EVENT_CATEGORIES = [
  { id: 'all', label: 'All', color: 'var(--primary)' },
  { id: 'technical', label: 'Technical', color: 'hsl(224, 76%, 48%)' },
  { id: 'cultural', label: 'Cultural', color: 'hsl(280, 70%, 55%)' },
  { id: 'sports', label: 'Sports', color: 'hsl(145, 63%, 42%)' },
  { id: 'workshops', label: 'Workshops', color: 'hsl(38, 92%, 50%)' },
  { id: 'guest-lectures', label: 'Guest Lectures', color: 'hsl(350, 70%, 55%)' },
];

// Demo chat responses
export const DEMO_RESPONSES = [
  {
    text: `For B.Tech Computer Science (CSE), admissions are primarily based on your merit scores in the entrance exams and board qualifiers:

1. Fill out the online registration form through the Campus Admission Portal.
2. Submit your XII aggregate scorecard and upload valid JEE Mains scorecard documents.
3. Complete the physical document verification process during the allocated slot.
4. Seat allocation is determined during the online counselling rounds based on rank-wise cutoffs.`,
    sources: [
      { title: 'Admission Brochure 2024', category: 'admissions', relevance: 0.95 },
      { title: 'University Website', category: 'admissions', relevance: 0.88 },
      { title: 'UGC Guidelines', category: 'admissions', relevance: 0.82 },
    ],
  },
  {
    text: `You must present the original copies of the following documents during the physical verification:

• Class X and Class XII Marksheets and Passing Certificates
• JEE Mains Admit Card & Scorecard documentation
• Migration Certificate and Character Certificate from school
• Category Certificate (if applicable)
• Passport-size photographs (4 copies)
• Aadhaar Card`,
    sources: [
      { title: 'Admission Brochure 2024', category: 'admissions', relevance: 0.97 },
      { title: 'Document Checklist PDF', category: 'admissions', relevance: 0.92 },
    ],
  },
  {
    text: `## Placement Statistics 2024 📊

Our campus placement drive achieved outstanding results:

- **150+** Companies visited campus
- **₹45 LPA** Highest package (Google)
- **₹8.5 LPA** Average package
- **92%** Students placed

### Top Recruiters:
- Google, Microsoft, Amazon, TCS, Infosys, Wipro, Deloitte`,
    sources: [
      { title: 'Placement Report 2024', category: 'placements', relevance: 0.94 },
      { title: 'T&P Cell Website', category: 'placements', relevance: 0.89 },
    ],
  },
];

// Demo events — matches PDF reference
export const DEMO_EVENTS = [
  {
    id: 1,
    title: 'TechFest 2025 — Annual Technical Festival',
    description: 'Join over 5,000 students for hackathons, robowars, coding challenges, and keynotes from industry veterans. Registrations are open globally.',
    date: '2025-10-24',
    endDate: '2025-10-26',
    time: '9:00 AM',
    location: 'Campus Main Auditorium & Labs',
    category: 'technical',
    isFlagship: true,
    image: null,
  },
  {
    id: 2,
    title: 'Code Sprint Hackathon',
    description: 'A 24-hour coding marathon to solve real-world campus sustainability challenges.',
    date: '2025-10-12',
    time: '10:00 AM',
    location: 'Lab 3',
    category: 'technical',
    image: null,
  },
  {
    id: 3,
    title: "Rhythms '25 Dance Battle",
    description: 'Inter-departmental street and classical dance face-off. Guest judges performing.',
    date: '2025-10-15',
    time: '5:30 PM',
    location: 'Open Theater',
    category: 'cultural',
    image: null,
  },
  {
    id: 4,
    title: 'Annual Cricket Cup',
    description: 'Final match of the departmental leagues. Come support your local department team!',
    date: '2025-10-18',
    time: '9:00 AM',
    location: 'Sports Ground',
    category: 'sports',
    image: null,
  },
  {
    id: 5,
    title: 'Generative AI Workshop',
    description: 'Hands-on masterclass on building custom prompt templates and local RAG search.',
    date: '2025-10-20',
    time: '2:00 PM',
    location: 'Seminar Hall B',
    category: 'workshops',
    image: null,
  },
  {
    id: 6,
    title: 'Future of Clean Energy',
    description: 'Keynote address by Dr. Aris Thorne on global solar-grid orchestration techniques.',
    date: '2025-10-22',
    time: '11:30 AM',
    location: 'Auditorium 2',
    category: 'guest-lectures',
    image: null,
  },
  {
    id: 7,
    title: 'Symphony Fusion Concert',
    description: 'A serene evening of classical fusion and light orchestration to mark autumn break.',
    date: '2025-10-28',
    time: '6:00 PM',
    location: 'Central Lawn',
    category: 'cultural',
    image: null,
  },
];

// Registered events (for sidebar)
export const REGISTERED_EVENTS = [
  { title: 'Code Sprint Hackathon', date: 'Oct 12, 10:00 AM', status: 'Approved' },
  { title: 'Generative AI Workshop', date: 'Oct 20, 2:00 PM', status: 'Pending' },
];

// Admission data
export const ADMISSION_DATA = {
  overview: {
    title: 'Admission Overview',
    content: `The university offers admissions to various undergraduate and postgraduate programs through a merit-based selection process. Admissions are conducted through centralized counseling based on entrance exam scores (JEE Main / University Entrance Test) and board qualifiers.`,
    steps: [
      'Register online through the Campus Admission Portal',
      'Submit XII aggregate scorecard and entrance exam scores',
      'Attend document verification during allocated slot',
      'Seat allocation through online counselling rounds',
    ],
  },
  importantDates: [
    { date: 'Mar 15', label: 'Application Opens' },
    { date: 'May 30', label: 'Application Deadline' },
    { date: 'Jun 10', label: 'Entrance Exam' },
    { date: 'Jun 25', label: 'Counselling Begins' },
    { date: 'Jul 15', label: 'Classes Start' },
  ],
  relatedQueries: [
    'What documents are needed for admission?',
    'What is the fee structure for B.Tech?',
    'How to check admission status?',
    'Scholarship options for merit students',
    'Hostel allocation process',
  ],
};

// Placement data
export const PLACEMENT_DATA = {
  stats: [
    { value: '150+', label: 'Companies', icon: 'Building2' },
    { value: '₹45 LPA', label: 'Highest Package', icon: 'TrendingUp' },
    { value: '₹8.5 LPA', label: 'Average Package', icon: 'BarChart3' },
    { value: '92%', label: 'Students Placed', icon: 'Users' },
  ],
  companies: [
    { company: 'Google', role: 'SDE-1', package: '₹45 LPA', placed: 4, batch: '2024' },
    { company: 'Microsoft', role: 'SDE', package: '₹42 LPA', placed: 6, batch: '2024' },
    { company: 'Amazon', role: 'SDE-1', package: '₹36 LPA', placed: 12, batch: '2024' },
    { company: 'Adobe', role: 'MTS', package: '₹32 LPA', placed: 3, batch: '2024' },
    { company: 'Goldman Sachs', role: 'Analyst', package: '₹28 LPA', placed: 5, batch: '2024' },
    { company: 'Deloitte', role: 'Consultant', package: '₹18 LPA', placed: 15, batch: '2024' },
    { company: 'TCS', role: 'Systems Engineer', package: '₹7 LPA', placed: 45, batch: '2024' },
    { company: 'Infosys', role: 'SE', package: '₹6.5 LPA', placed: 38, batch: '2024' },
  ],
  upcomingDrives: [
    { company: 'Flipkart', date: 'Oct 15', role: 'SDE Intern', eligible: 'CSE, IT' },
    { company: 'Oracle', date: 'Oct 18', role: 'Application Developer', eligible: 'All branches' },
    { company: 'Samsung', date: 'Oct 22', role: 'R&D Engineer', eligible: 'CSE, ECE' },
  ],
  resources: [
    { title: 'Resume Building Guide', type: 'PDF' },
    { title: 'Aptitude Practice Tests', type: 'Online' },
    { title: 'Interview Tips & Mock Sessions', type: 'Video' },
    { title: 'Company-wise Previous Papers', type: 'PDF' },
  ],
};

// Complaints data
export const COMPLAINTS_DATA = {
  categories: ['Infrastructure', 'Academic', 'Hostel', 'IT Services', 'Transport', 'Other'],
  submitted: [
    { id: '#CS-2024-0145', subject: 'Wi-Fi connectivity issue in Block C', category: 'IT Services', status: 'Resolved', date: 'Oct 05' },
    { id: '#CS-2024-0132', subject: 'Water leakage in Hostel Room 302', category: 'Hostel', status: 'In Review', date: 'Oct 03' },
    { id: '#CS-2024-0128', subject: 'Lab equipment not working — Physics Lab', category: 'Infrastructure', status: 'Escalated', date: 'Oct 01' },
    { id: '#CS-2024-0115', subject: 'Bus route timing change request', category: 'Transport', status: 'Submitted', date: 'Sep 28' },
  ],
  activeComplaint: {
    id: '#CS-2024-0132',
    subject: 'Water leakage in Hostel Room 302',
    timeline: [
      { step: 'Complaint Submitted', date: 'Oct 03, 2024', status: 'done' },
      { step: 'Assigned to Maintenance', date: 'Oct 04, 2024', status: 'done' },
      { step: 'Under Review', date: 'Oct 05, 2024', status: 'current' },
      { step: 'Resolution', date: 'Pending', status: 'pending' },
    ],
  },
};

// Student Services data
export const SERVICES_DATA = {
  portals: [
    { title: 'Fee Payment', icon: 'CreditCard', status: 'Paid', statusColor: 'success', link: '#' },
    { title: 'Scholarship Portal', icon: 'Award', status: 'Eligible', statusColor: 'info', link: '#' },
    { title: 'Hostel Management', icon: 'Home', status: 'Allocated', statusColor: 'success', link: '#' },
    { title: 'Library Services', icon: 'BookOpen', status: '2 Books Issued', statusColor: 'warning', link: '#' },
    { title: 'Campus Transport', icon: 'Bus', status: 'Route Active', statusColor: 'info', link: '#' },
    { title: 'ID Card Services', icon: 'BadgeCheck', status: 'Due for Renewal', statusColor: 'error', link: '#' },
  ],
  deadlines: [
    { date: 'Oct 05', label: 'Autumn Fee Submission', color: 'error' },
    { date: 'Oct 10', label: 'Scholarship Form Last Date', color: 'warning' },
    { date: 'Oct 12', label: 'Hostel Reallocation Window', color: 'info' },
    { date: 'Oct 15', label: 'Book Return - Central Library', color: 'success' },
  ],
  quickActions: [
    { label: 'Download Fee Receipt', icon: 'Download' },
    { label: 'Apply for Scholarship', icon: 'FileEdit' },
    { label: 'Book Hostel Room', icon: 'Home' },
    { label: 'Request ID Card', icon: 'BadgeCheck' },
  ],
};

// Admin dashboard data
export const ADMIN_DATA = {
  kpis: [
    { label: 'Total Queries Today', value: '1,248', change: '↑ 12%', changeColor: 'success' },
    { label: 'Active Users', value: '542', badge: 'Live', badgeColor: 'info' },
    { label: 'Avg Response Time', value: '1.2s', badge: 'Optimal', badgeColor: 'success' },
    { label: 'Resolution Rate', value: '94.6%', change: '↑ 2.4%', changeColor: 'success' },
    { label: 'Pending Complaints', value: '18', badge: 'Requires action', badgeColor: 'warning' },
  ],
  topQueries: [
    { rank: 1, query: 'How do I apply for post-matric scholarships?', category: 'Scholarships', count: 342 },
    { rank: 2, query: 'What is the CGPA cutoff for Microsoft SDE drive?', category: 'Placements', count: 289 },
    { rank: 3, query: 'Where is the physical document verification desk?', category: 'Admissions', count: 210 },
    { rank: 4, query: 'Hostel C Wing hot water issue status.', category: 'Complaints', count: 185 },
    { rank: 5, query: 'How to renew library book subscription online?', category: 'Services', count: 144 },
    { rank: 6, query: 'Refund policy for cancellation of admission.', category: 'Admissions', count: 128 },
    { rank: 7, query: 'Eligibility for IBM placement drive.', category: 'Placements', count: 98 },
    { rank: 8, query: 'Wi-Fi downtime in central computer center.', category: 'Complaints', count: 84 },
  ],
  complaints: [
    { id: '#CS-9082', title: 'Water logging in Hostels Wing C basement area.', severity: 'HIGH', time: '2 hrs ago' },
    { id: '#CS-9041', title: 'Central library book catalog sync failure.', severity: 'MEDIUM', time: '5 hrs ago' },
    { id: '#CS-8999', title: 'Hostel D elevator non-functional for past 2 days.', severity: 'HIGH', time: '1 day ago' },
  ],
  moduleUsage: [
    { module: 'Admissions', percent: 35, color: 'hsl(224, 76%, 48%)' },
    { module: 'Placements', percent: 25, color: 'hsl(145, 63%, 42%)' },
    { module: 'Complaints', percent: 20, color: 'hsl(38, 92%, 50%)' },
    { module: 'Services', percent: 15, color: 'hsl(220, 10%, 70%)' },
    { module: 'Other', percent: 5, color: 'hsl(220, 10%, 85%)' },
  ],
};

// Chat history (demo)
export const CHAT_HISTORY = [
  { group: 'TODAY', items: [
    { id: 1, title: 'B.Tech CSE Admission Criteria', active: true },
    { id: 2, title: 'Microsoft Placement Process' },
  ]},
  { group: 'YESTERDAY', items: [
    { id: 3, title: 'Hostel Wi-Fi Issue Status' },
    { id: 4, title: 'Scholarship Registration Link' },
  ]},
  { group: 'LAST 7 DAYS', items: [
    { id: 5, title: 'Library Dues Verification' },
    { id: 6, title: 'NOC Document Checklist' },
  ]},
];

// Landing page announcements
export const ANNOUNCEMENTS = [
  {
    date: 'Oct 10',
    title: 'Mid-Semester Exam Schedule Released',
    desc: 'Check the exam portal for subject-wise timetable and seating arrangements.',
    category: 'Academic',
  },
  {
    date: 'Oct 08',
    title: 'TechFest 2025 Registrations Open',
    desc: 'Register now for hackathons, coding challenges, and workshops.',
    category: 'Events',
  },
  {
    date: 'Oct 05',
    title: 'Scholarship Application Deadline Extended',
    desc: 'Last date to apply for merit-based scholarships has been extended to Oct 20.',
    category: 'Notice',
  },
];

// Stats for landing page
export const LANDING_STATS = [
  { value: '1,000+', label: 'Questions Answered', icon: 'MessageCircle' },
  { value: '50+', label: 'Documents Indexed', icon: 'FileText' },
  { value: '24/7', label: 'Available', icon: 'Clock' },
  { value: '2', label: 'Languages', icon: 'Globe' },
];

// Demo search results
export const DEMO_SEARCH_RESULTS = [
  {
    id: 1,
    title: 'Admission Process & Requirements',
    content: 'Complete guide to the admission process including eligibility criteria, entrance exams, counseling process, and required documents.',
    category: 'admissions',
    relevance: 0.95,
    source: 'Admission Brochure 2024',
  },
  {
    id: 2,
    title: 'Campus Library Services',
    content: 'Information about library timings, digital resources, book issuing policies, and reading rooms.',
    category: 'facilities',
    relevance: 0.91,
    source: 'Library Guidelines',
  },
  {
    id: 3,
    title: 'Computer Science Curriculum',
    content: 'Detailed curriculum for B.Tech Computer Science including core courses, electives, and lab requirements.',
    category: 'courses',
    relevance: 0.88,
    source: 'Course Catalog 2025-26',
  },
];
