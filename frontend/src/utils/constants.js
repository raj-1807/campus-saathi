// ===== CAMPUS SAATHI — CONSTANTS =====

export const APP_NAME = 'Campus Saathi';
export const APP_TAGLINE = 'Your AI Campus Companion';
export const APP_DESCRIPTION =
  'Ask questions about admissions, courses, facilities, events, and more — powered by AI.';

// Navigation
export const NAV_LINKS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Chat', href: '/chat', icon: 'MessageCircle' },
  { label: 'Search', href: '/search', icon: 'Search' },
  { label: 'Events', href: '/events', icon: 'Calendar' },
];

// Chat
export const SUGGESTED_QUESTIONS = [
  'What are the admission criteria?',
  'Tell me about the library timings',
  'What courses are available in Computer Science?',
  'How do I apply for a hostel room?',
  'What are the upcoming cultural events?',
  'Where is the placement cell?',
  'What scholarships are available?',
  'Tell me about the sports facilities',
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

// Event categories
export const EVENT_CATEGORIES = [
  { id: 'all', label: 'All', color: 'var(--primary)' },
  { id: 'academic', label: 'Academic', color: 'hsl(210, 92%, 55%)' },
  { id: 'cultural', label: 'Cultural', color: 'hsl(280, 70%, 55%)' },
  { id: 'sports', label: 'Sports', color: 'hsl(145, 63%, 42%)' },
  { id: 'notice', label: 'Notice', color: 'hsl(38, 92%, 50%)' },
  { id: 'workshop', label: 'Workshop', color: 'hsl(350, 70%, 55%)' },
];

// Demo responses for when API keys aren't configured
export const DEMO_RESPONSES = [
  {
    text: `## Library Timings 📚

The campus library is open during the following hours:

- **Monday to Friday:** 8:00 AM – 10:00 PM
- **Saturday:** 9:00 AM – 6:00 PM  
- **Sunday:** 10:00 AM – 4:00 PM

### Special Notes:
- During exam season, the library extends hours until **midnight**
- The digital library section is accessible 24/7 with student ID
- Book issuing counter closes 30 minutes before closing time`,
    sources: [
      { title: 'Library Guidelines 2025', category: 'facilities', relevance: 0.95 },
      { title: 'Student Handbook', category: 'general', relevance: 0.82 },
    ],
  },
  {
    text: `## Admission Criteria 🎓

### Undergraduate Programs:
1. **Eligibility:** 10+2 from a recognized board with minimum **60%** aggregate
2. **Entrance Exam:** Score in JEE Main / University Entrance Test
3. **Counseling:** Merit-based seat allocation through online counseling

### Documents Required:
- 10th & 12th marksheets
- Transfer certificate
- Character certificate
- Passport-size photographs (4)
- Aadhaar card copy
- Category certificate (if applicable)

### Important Dates:
- Application opens: **March 15, 2026**
- Last date: **May 30, 2026**
- Counseling: **June 15–30, 2026**`,
    sources: [
      { title: 'Admission Brochure 2026', category: 'admissions', relevance: 0.97 },
      { title: 'University Website FAQ', category: 'admissions', relevance: 0.88 },
    ],
  },
  {
    text: `## Computer Science Courses 💻

### Core Courses:
- **CS101** — Introduction to Programming (C/Python)
- **CS201** — Data Structures & Algorithms
- **CS301** — Database Management Systems
- **CS302** — Operating Systems
- **CS401** — Computer Networks
- **CS402** — Software Engineering

### Electives:
- Machine Learning & AI
- Cloud Computing
- Cybersecurity
- Mobile App Development
- Blockchain Technology

### Labs:
All CS courses include **3-hour weekly lab sessions** with hands-on projects. The department has **4 computer labs** with 60 workstations each.`,
    sources: [
      { title: 'Course Catalog 2025-26', category: 'courses', relevance: 0.94 },
      { title: 'CS Department Page', category: 'courses', relevance: 0.89 },
    ],
  },
];

// Demo search results
export const DEMO_SEARCH_RESULTS = [
  {
    id: 1,
    title: 'Admission Process & Requirements',
    content: 'Complete guide to the admission process including eligibility criteria, entrance exams, counseling process, and required documents for undergraduate and postgraduate programs.',
    category: 'admissions',
    relevance: 0.95,
    source: 'Admission Brochure 2026',
  },
  {
    id: 2,
    title: 'Campus Library Services',
    content: 'Information about library timings, digital resources, book issuing policies, reading rooms, and special services during examination periods.',
    category: 'facilities',
    relevance: 0.91,
    source: 'Library Guidelines',
  },
  {
    id: 3,
    title: 'Computer Science Curriculum',
    content: 'Detailed curriculum for B.Tech Computer Science including core courses, electives, lab requirements, and project work across all 8 semesters.',
    category: 'courses',
    relevance: 0.88,
    source: 'Course Catalog 2025-26',
  },
  {
    id: 4,
    title: 'Hostel Accommodation Guide',
    content: 'Step-by-step guide for hostel room allocation, fees, rules and regulations, mess facilities, and complaint resolution process.',
    category: 'facilities',
    relevance: 0.85,
    source: 'Student Handbook',
  },
  {
    id: 5,
    title: 'Scholarship Opportunities',
    content: 'List of available scholarships including merit-based, need-based, and government scholarships with eligibility criteria and application deadlines.',
    category: 'admissions',
    relevance: 0.82,
    source: 'Financial Aid Office',
  },
  {
    id: 6,
    title: 'Faculty Directory — CS Department',
    content: 'Complete list of Computer Science faculty members with their qualifications, research interests, office hours, and contact information.',
    category: 'faculty',
    relevance: 0.78,
    source: 'CS Department Page',
  },
];

// Demo events
export const DEMO_EVENTS = [
  {
    id: 1,
    title: 'TechFest 2026',
    description: 'Annual technical festival featuring hackathons, coding contests, robotics challenges, and tech talks by industry leaders.',
    date: '2026-09-15',
    time: '9:00 AM',
    location: 'Main Auditorium',
    category: 'cultural',
  },
  {
    id: 2,
    title: 'Orientation Day for New Students',
    description: 'Welcome program for freshers including campus tour, department introductions, and mentorship program details.',
    date: '2026-08-20',
    time: '10:00 AM',
    location: 'Convention Hall',
    category: 'academic',
  },
  {
    id: 3,
    title: 'Inter-College Cricket Tournament',
    description: 'Annual cricket tournament with teams from 16 colleges. Matches held over 5 days at the campus sports ground.',
    date: '2026-09-05',
    time: '8:00 AM',
    location: 'Sports Ground',
    category: 'sports',
  },
  {
    id: 4,
    title: 'AI/ML Workshop Series',
    description: 'Three-day hands-on workshop on Machine Learning and AI using Python, TensorFlow, and real-world datasets.',
    date: '2026-08-25',
    time: '2:00 PM',
    location: 'CS Lab 3',
    category: 'workshop',
  },
  {
    id: 5,
    title: 'Mid-Semester Exam Schedule Released',
    description: 'Mid-semester examination schedule for all departments has been published. Check the portal for your subject-wise timetable.',
    date: '2026-09-01',
    time: '',
    location: '',
    category: 'notice',
  },
  {
    id: 6,
    title: 'Annual Cultural Night — Rang Tarang',
    description: 'A night of music, dance, drama, and art. Featuring performances by student clubs and a special guest band.',
    date: '2026-10-10',
    time: '6:00 PM',
    location: 'Open Air Theatre',
    category: 'cultural',
  },
  {
    id: 7,
    title: 'Campus Placement Drive — TCS',
    description: 'TCS recruitment drive for final year B.Tech and MCA students. Pre-placement talk followed by online test.',
    date: '2026-09-20',
    time: '9:30 AM',
    location: 'Placement Cell',
    category: 'academic',
  },
  {
    id: 8,
    title: 'Hostel Fee Payment Deadline',
    description: 'Last date to pay hostel fees for the odd semester without late fee charges. Pay online through the student portal.',
    date: '2026-08-31',
    time: '',
    location: '',
    category: 'notice',
  },
];

// Stats for landing page
export const LANDING_STATS = [
  { value: '1,000+', label: 'Questions Answered', icon: 'MessageCircle' },
  { value: '50+', label: 'Documents Indexed', icon: 'FileText' },
  { value: '24/7', label: 'Available', icon: 'Clock' },
  { value: '2', label: 'Languages', icon: 'Globe' },
];
