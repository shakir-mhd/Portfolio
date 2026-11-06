export type Palette = { from: string; via: string; to: string; accent: string };

export type ProfileId = 'shakir' | 'cloud' | 'recruiter' | 'fullstack';

export type SectionId = 'hero' | 'services' | 'originals' | 'journey' | 'skills' | 'screenplay' | 'faqs' | 'contact';

export interface ViewerProfile {
  id: ProfileId;
  name: string;
  role: string;
  blurb: string;
  color: string;
  order: SectionId[];
}

export const viewerProfiles: ViewerProfile[] = [
  {
    id: 'shakir',
    name: 'General Overview',
    role: 'Full-Stack & Cloud',
    blurb: 'Comprehensive view — full background, technical stack, featured projects, and journey.',
    color: '#ea0044',
    order: ['services', 'originals', 'journey', 'skills', 'screenplay', 'faqs'],
  },
  {
    id: 'cloud',
    name: 'Cloud Architect',
    role: 'DevOps & Infra',
    blurb: 'Prioritizes AWS cloud architecture, containerization, scalable backends, and Route Rescue.',
    color: '#00f0ff',
    order: ['services', 'skills', 'originals', 'journey', 'screenplay', 'faqs'],
  },
  {
    id: 'recruiter',
    name: 'Tech Recruiter',
    role: 'Talent Scout',
    blurb: 'Fast tracks the Resume, verified SLTC credentials, GPA, and contact channels.',
    color: '#10b981',
    order: ['screenplay', 'originals', 'journey', 'services', 'skills', 'faqs'],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Lead',
    role: 'Product Engineer',
    blurb: 'Focuses on React/TypeScript, Mahapola LMS, Java, Android, and clean system architecture.',
    color: '#ff2a6d',
    order: ['originals', 'services', 'skills', 'journey', 'screenplay', 'faqs'],
  },
];

export const personalInfo = {
  fullName: 'Mohomed Shakir',
  displayName: 'Mohomed Shakir',
  firstName: 'SHAKIR',
  seriesTag: 'CLOUD & FULL-STACK DEVELOPER',
  originalLabel: 'MOHOMED SHAKIR • SYSTEMS & CLOUD',
  role: 'Cloud Engineer & Full-Stack Developer',
  tagline: ['Cloud Engineer', 'Full-Stack Developer', 'Systems Architecture'],
  location: 'Sri Lanka',
  email: 'shakirmohomed8685@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/shakir-mohomed-9912ab27b/',
    github: 'https://github.com/shakir-mhd',
    instagram: 'https://www.instagram.com/_shakir_skr_/',
  },
  resumePdf: '/assets/Mohomed_Shakir_Resume.pdf',
  statusText: 'Open for Internships & Projects',
  heroPreTitle: 'ARCHITECT & BUILD',
  heroMainWord: 'SYSTEMS',
  heroSubtitle: 'I engineer resilient cloud infrastructure, scalable backends, and modern web applications that turn complex problems into clean, reliable software.',
  aboutHeadline: 'Architecting resilient cloud systems & modern full-stack applications.',
  aboutBio: [
    'I am an aspiring Cloud Engineer and Full-Stack Developer currently reading for my BSc (Hons) in Cloud Computing at SLTC Research University, backed by foundational software development training through my NVQ Level 4 certification from VTA Padukka.',
    'My practical engineering background spans road-hazard spatial platforms like Route Rescue LK, institutional learning platforms developed during my on-the-job training at Mahapola Port & Maritime Academy, desktop database systems in Java/MySQL, and native Android mobile apps.',
    'As an active IEEE student member, I prioritize clean architectural patterns, automated deployment pipelines, and practical problem-solving that scales reliably.',
    'My core engineering focus is bridging infrastructure reliability with high-impact product engineering—deploying containerized microservices, scalable distributed architectures, and polished digital experiences that make sense.'
  ],
  stats: [
    { label: 'Degree Track', value: 'BSc Cloud Computing' },
    { label: 'Technical Grounding', value: 'NVQ Level 4' },
    { label: 'Key Projects', value: '4 Live & Active' },
    { label: 'Availability', value: 'Open for Internships' }
  ]
};

export const socialLinks = {
  github: 'https://github.com/shakir-mhd',
  linkedin: 'https://www.linkedin.com/in/shakir-mohomed-9912ab27b/',
  instagram: 'https://www.instagram.com/_shakir_skr_/',
  email: 'shakirmohomed8685@gmail.com',
  cal: 'mailto:shakirmohomed8685@gmail.com?subject=Meeting%20Request%20-%20Mohomed%20Shakir'
};

export const partnerLogos = [
  { name: 'Amazon Web Services', tag: 'Cloud Infrastructure' },
  { name: 'Docker', tag: 'Containerization' },
  { name: 'Kubernetes', tag: 'Orchestration' },
  { name: 'React', tag: 'Frontend Library' },
  { name: 'TypeScript', tag: 'Type-Safe Code' },
  { name: 'Node.js', tag: 'Backend Runtime' },
  { name: 'MySQL', tag: 'Relational DB' },
  { name: 'Linux', tag: 'System OS' },
  { name: 'Vercel', tag: 'Edge Deployment' },
  { name: 'Git & GitHub', tag: 'Version Control' }
];

export const editorialQuote = {
  quote: "Shakir's engineering mindset is structured and detail-driven. He prioritizes architectural clarity and reliable fundamentals before writing code, ensuring every component has a purpose.",
  author: 'Academic & Project Review',
  role: 'Software Engineering Evaluation',
  organization: 'SLTC Research University'
};

export const cyclingWords = ['create', 'deploy', 'engineer', 'scale', 'build'];

export const sectionMeta: Record<SectionId, { card: string; meta: string; palette: Palette }> = {
  hero: { card: 'OVERVIEW', meta: 'Systems & Engineering Overview', palette: { from: '#140308', via: '#590a1c', to: '#07070a', accent: '#ea0044' } },
  services: { card: 'DISCIPLINES', meta: 'Cloud & Full-Stack Stack', palette: { from: '#02131d', via: '#063f5c', to: '#07070a', accent: '#00f0ff' } },
  originals: { card: 'PROJECTS', meta: '4 Live Production Systems', palette: { from: '#1a060d', via: '#730d25', to: '#07070a', accent: '#ea0044' } },
  journey: { card: 'EXPERIENCE', meta: 'Milestones & Education', palette: { from: '#120220', via: '#46087a', to: '#07070a', accent: '#b98bff' } },
  skills: { card: 'TECH STACK', meta: 'Technology Universe & Evidence', palette: { from: '#021810', via: '#095738', to: '#07070a', accent: '#10b981' } },
  screenplay: { card: 'RESUME', meta: 'Curriculum Vitae & Credentials', palette: { from: '#1c1202', via: '#694107', to: '#07070a', accent: '#ffb547' } },
  faqs: { card: 'INTEL & FAQS', meta: 'Direct Answers to Inquiries', palette: { from: '#140e1c', via: '#3e245c', to: '#07070a', accent: '#d946ef' } },
  contact: { card: 'CONNECT', meta: 'Let’s Build Together', palette: { from: '#140308', via: '#590a1c', to: '#07070a', accent: '#ea0044' } },
};

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  poster: string;
  build: string[];
  features: string[];
  metrics: Metric[];
  github?: string;
  demo?: string;
  statusBadge: string;
  palette: Palette;
}

export const featuredProjects: Project[] = [
  {
    id: 'mahapola-lms',
    title: 'Mahapola LMS',
    year: '2026',
    genre: 'Institutional Enterprise Software • PHP • MySQL',
    logline: 'Institutional learning platform developed during on-the-job training at Mahapola Port & Maritime Academy, digitizing course material, student records, and grading.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML5 / CSS3', 'Institutional OJT'],
    poster: '/assets/projects/mahapola-lms-poster.png',
    build: [
      'Engineered comprehensive course delivery, trainee attendance logs, and academic progress modules for maritime trainees.',
      'Designed relational database schemas in MySQL with strict role-based access control for instructors and cadets.',
      'Created streamlined responsive dashboards for staff and administrators to monitor training metrics.'
    ],
    features: [
      'Digital course material distribution & curriculum management',
      'Trainee attendance, exam grades & certification logs',
      'Role-based access permissions (Instructors, Trainees, Admins)',
      'Optimized MySQL queries for instant data retrieval'
    ],
    metrics: [
      { value: '500+', label: 'Trainees Enrolled' },
      { value: '100%', label: 'Digital Records' },
      { value: 'OJT', label: 'Maritime Academy' },
      { value: 'Zero', label: 'Paper Bottlenecks' }
    ],
    statusBadge: 'In Development (OJT)',
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' }
  },
  {
    id: 'route-rescue-lk',
    title: 'Route Rescue LK',
    year: '2026',
    genre: 'Full-Stack Web • Spatial Mapping • Geolocation',
    logline: 'Emergency road hazard & motorist assistance web platform connecting drivers across Sri Lanka with live hazard alerts, roadside mechanics, and route visualization.',
    stack: ['React', 'TypeScript', 'Leaflet / Maps', 'Geolocation', 'Vercel CI/CD'],
    poster: '/assets/projects/route-rescue-poster.png',
    build: [
      'Architected live spatial reporting engine with Leaflet map markers, user geolocation radius queries, and emergency mechanic dispatch.',
      'Engineered responsive, mobile-first emergency workflows for drivers needing immediate breakdown support.',
      'Deployed automated CI/CD deployment pipelines on Vercel edge networks for high availability.'
    ],
    features: [
      'Live road hazard spatial incident reporting',
      'Interactive GPS-enabled Leaflet routing & hazard markers',
      'Nearby roadside mechanic and emergency service discovery',
      'Real-time status updates with responsive mobile UX'
    ],
    metrics: [
      { value: 'Live', label: 'Production Platform' },
      { value: 'Real-Time', label: 'Spatial Geo-Alerts' },
      { value: 'Island-wide', label: 'Coverage in Sri Lanka' },
      { value: '99.9%', label: 'Edge Availability' }
    ],
    github: 'https://github.com/shakir-mhd/RouteRescue-LK',
    demo: 'https://route-rescue-lk.vercel.app/',
    statusBadge: 'Live Production',
    palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ea0044' }
  },
  {
    id: 'hotel-the-blue-moon',
    title: 'Hotel The Blue Moon',
    year: '2025',
    genre: 'Hospitality Web • Custom CSS • CMS',
    logline: 'Luxury beach resort web presence and reservation inquiry channels with dynamic amenity showcases and room gallery.',
    stack: ['WordPress', 'Responsive UI', 'Custom CSS', 'PHP Scripting', 'Vercel'],
    poster: '/assets/projects/hotel-blue-moon-poster.png',
    build: [
      'Developed high-conversion room showcase and interactive guest booking inquiry system.',
      'Engineered bespoke CSS styles with fluid typography and dark editorial imagery.',
      'Optimized media assets delivering rapid page load speeds on mobile networks.'
    ],
    features: [
      'Immersive room & suite photo presentations',
      'Streamlined reservation inquiry channels',
      'Location highlights & amenity showcase',
      'Mobile-first responsive layout'
    ],
    metrics: [
      { value: 'Live', label: 'Production Showcase' },
      { value: '98%', label: 'Mobile Performance' },
      { value: 'Fast', label: 'Inquiry Turnaround' },
      { value: '100%', label: 'Custom Styled' }
    ],
    github: 'https://github.com/shakir-mhd/Hotel-The-Blue-Moon-Web',
    demo: 'https://hotel-the-blue-moon-web.vercel.app/',
    statusBadge: 'Live Production',
    palette: { from: '#02162a', via: '#09437a', to: '#040b12', accent: '#00f0ff' }
  },
  {
    id: 'hotel-app',
    title: 'Hotel Companion App',
    year: '2025',
    genre: 'Mobile Android • Java • Material Design',
    logline: 'Native Android guest services application enabling in-room amenity orders, dining requests, and stay information on mobile devices.',
    stack: ['Android SDK', 'Java', 'Material Design', 'REST APIs', 'Mobile UX'],
    poster: '/assets/projects/hotel-app-poster.png',
    build: [
      'Engineered native Android UI with XML layouts, room catalog browsing, and service request handling.',
      'Implemented clean separation of concerns with asynchronous network workers and local persistence.',
      'Designed Material Design components adhering to modern Android UI conventions.'
    ],
    features: [
      'In-room dining & amenity catalog browsing',
      'Instant service request submission for guests',
      'Digital stay concierge and local area tips',
      'Native Android performance and smooth transitions'
    ],
    metrics: [
      { value: 'Android', label: 'Native Architecture' },
      { value: '100%', label: 'Material Design' },
      { value: 'Instant', label: 'Amenity Ordering' },
      { value: 'Clean', label: 'Java Codebase' }
    ],
    github: 'https://github.com/shakir-mhd/Hotel-The-Blue-Moon-App',
    statusBadge: 'Android App',
    palette: { from: '#160228', via: '#510c85', to: '#0a0314', accent: '#b98bff' }
  }
];

export interface ServiceStackItem {
  id: string;
  title: string;
  subtitle: string;
  icon: 'Cloud' | 'Code2' | 'Database' | 'Layers';
  description: string;
  pills: string[];
  highlight: boolean;
}

export const servicesData: ServiceStackItem[] = [
  {
    id: 'service-cloud',
    title: 'Cloud Architecture & DevOps',
    subtitle: 'Scalable Infrastructure & Continuous Pipelines',
    icon: 'Cloud',
    description:
      'Designing and deploying resilient cloud environments on AWS, setting up automated CI/CD pipelines, containerizing services with Docker, and ensuring continuous high availability.',
    pills: ['AWS Services', 'Docker & Containers', 'CI/CD Pipelines', 'Linux Administration', 'Vercel Edge'],
    highlight: false,
  },
  {
    id: 'service-web',
    title: 'Full-Stack Web Engineering',
    subtitle: 'High-Performance Modern Applications',
    icon: 'Code2',
    description:
      'Building performant, accessible web platforms using React, TypeScript, and modern styling. From interactive spatial mapping in Route Rescue LK to enterprise administrative dashboards.',
    pills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Leaflet Maps', 'State Management'],
    highlight: true,
  },
  {
    id: 'service-db',
    title: 'Database & Backend Design',
    subtitle: 'Relational Schemas & Robust APIs',
    icon: 'Database',
    description:
      'Architecting normalized relational database models with MySQL and PostgreSQL, writing optimized queries, and constructing secure RESTful APIs with Node.js and PHP.',
    pills: ['MySQL & PostgreSQL', 'Node.js & Express', 'PHP Backends', 'Relational Schemas', 'API Security'],
    highlight: false,
  },
  {
    id: 'service-systems',
    title: 'Systems Integration & Mobile',
    subtitle: 'Cross-Platform Software Solutions',
    icon: 'Layers',
    description:
      'Integrating distributed enterprise tools, institutional LMS platforms, and native Android applications in Java. Bridging desktop database software with client-facing mobile apps.',
    pills: ['Android SDK (Java)', 'Desktop Java & JDBC', 'Institutional LMS', 'System Migration', 'OAuth & RBAC'],
    highlight: true,
  },
];

export const toolsList = [
  'AWS', 'Docker', 'React', 'TypeScript', 'Node.js', 'MySQL', 'Linux', 'Vercel', 'PHP', 'Git'
];

export interface JourneySeason {
  season: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  status: string;
  description: string;
  episodes: string[];
}

export const journeySeasons: JourneySeason[] = [
  {
    season: 'MILESTONE 01',
    period: '2025 – 2026',
    title: 'NVQ Level 4 in Software Development',
    organization: 'Vocational Training Authority (VTA)',
    location: 'Padukka, Sri Lanka',
    status: 'Completed Certification',
    description:
      'Completed rigorous national vocational grounding in core programming fundamentals, object-oriented principles with Java, relational database modeling with MySQL, and desktop application development.',
    episodes: [
      'Object-Oriented Programming & Principles in Java',
      'Relational Database Modeling with MySQL & JDBC',
      'Capstone Desktop Booking & Billing System'
    ]
  },
  {
    season: 'MILESTONE 02',
    period: '2024 – Present',
    title: 'BSc (Hons) in Cloud Computing',
    organization: 'SLTC Research University',
    location: 'Padukka, Sri Lanka',
    status: 'In Progress (Degree Track)',
    description:
      'Advancing theoretical and practical knowledge in distributed cloud systems, virtualized network infrastructure, AWS architectures, container orchestration, and active IEEE student community engagement.',
    episodes: [
      'Distributed Cloud Infrastructure & Virtual Networks',
      'AWS Scalability, Serverless Deployments & DevOps',
      'IEEE Technical Leadership & Collaborative Projects'
    ]
  },
  {
    season: 'MILESTONE 03',
    period: '2026 – Present',
    title: 'On-The-Job Training & Enterprise LMS',
    organization: 'Mahapola Port & Maritime Academy',
    location: 'Colombo, Sri Lanka',
    status: 'Active Field Experience',
    description:
      'Assigned to institutional software development at Mahapola Port & Maritime Academy. Architecting the digital LMS ecosystem, managing trainee databases, and collaborating on production deployment workflows.',
    episodes: [
      'Maritime LMS Architecture & Database Schema Design',
      'Trainee Examination & Academic Progress Engine',
      'Institutional Security & Role-Based Access Control (RBAC)'
    ]
  }
];

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: { name: string; mono: string; note?: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Cloud & Infrastructure',
    subtitle: 'Distributed networks & automated deployments',
    skills: [
      { name: 'AWS Cloud', mono: 'AWS', note: 'Primary' },
      { name: 'Docker', mono: 'DKR' },
      { name: 'Linux OS', mono: 'LNX' },
      { name: 'Vercel CI/CD', mono: 'VCL' },
      { name: 'Serverless', mono: 'SVR' },
      { name: 'Git & GitHub', mono: 'GIT' }
    ]
  },
  {
    title: 'Full-Stack & Languages',
    subtitle: 'Modern web architectures and UI libraries',
    skills: [
      { name: 'React', mono: 'RCT', note: 'Primary' },
      { name: 'TypeScript', mono: 'TS' },
      { name: 'Node.js', mono: 'ND' },
      { name: 'PHP', mono: 'PHP' },
      { name: 'Tailwind CSS', mono: 'CSS' },
      { name: 'Leaflet Maps', mono: 'MAP' }
    ]
  },
  {
    title: 'Databases & Mobile',
    subtitle: 'Relational data stores & native Android',
    skills: [
      { name: 'MySQL', mono: 'SQL', note: 'Primary' },
      { name: 'PostgreSQL', mono: 'PG' },
      { name: 'Java Desktop', mono: 'JV' },
      { name: 'Android SDK', mono: 'AND' },
      { name: 'JDBC', mono: 'DBC' }
    ]
  }
];

export const skillEvidence: Record<string, string> = {
  'AWS Cloud': 'SLTC Cloud Computing degree track & cloud lab architectures',
  'Docker': 'Containerized backend environments and microservice setups',
  'Linux OS': 'Server configuration, shell scripting, and system management',
  'Vercel CI/CD': 'Production deployments for Route Rescue LK and Hotel The Blue Moon',
  'React': 'Core front-end framework for Route Rescue LK and web applications',
  'TypeScript': 'Strict type-safe platform architecture for Route Rescue LK',
  'Node.js': 'RESTful API endpoints and backend microservices',
  'PHP': 'Core backend logic and controllers for Mahapola Maritime LMS',
  'MySQL': 'Database modeling for Mahapola LMS and Java Hotel Desktop System',
  'Leaflet Maps': 'Spatial road hazard mapping and emergency driver geolocation',
  'Android SDK': 'Hotel Companion mobile application with Material Design',
  'Java Desktop': 'Hotel Booking and billing system built with Swing & JDBC'
};

export const introSlides = [
  {
    kicker: 'OVERVIEW 01 • INTRODUCTION',
    title: 'MOHOMED SHAKIR',
    sub: 'Cloud Engineer & Full-Stack Developer',
    stat: 'SLTC • VTA NVQ 4',
    body: 'Reading BSc (Hons) in Cloud Computing at SLTC Research University. Bridging modern front-end experiences with reliable, scalable cloud infrastructure.',
  },
  {
    kicker: 'PROJECT 02 • LIVE PLATFORM',
    title: 'ROUTE RESCUE LK',
    sub: 'Emergency Road Hazard & Motorist Assistance',
    stat: 'Live Production Platform',
    body: 'Engineered a live spatial web application connecting motorists across Sri Lanka with real-time hazard alerts and emergency roadside support.',
  },
  {
    kicker: 'ENTERPRISE 03 • ACADEMIC OJT',
    title: 'MAHAPOLA LMS',
    sub: 'Maritime Academy Learning Management System',
    stat: 'Institutional Field OJT',
    body: 'Developed an enterprise learning management system during on-the-job training at Mahapola Port & Maritime Academy, managing trainee records and courses.',
  },
  {
    kicker: 'CONNECT 04 • COLLABORATION',
    title: 'LET’S BUILD',
    sub: 'Available for Opportunities',
    stat: 'Open for Internships',
    body: 'Seeking software engineering and cloud infrastructure internships, collaborative freelance projects, and technical roles. Let’s create something extraordinary.',
  },
];

export const faqsData = [
  {
    q: 'How do we get started?',
    a: 'We start with a quick discussion where you share your idea, infrastructure goals, and what you need. From there, I suggest the right cloud architecture or full-stack approach and next steps.'
  },
  {
    q: 'What is your primary area of technical specialization?',
    a: 'My core focus is at the intersection of Cloud Computing and Full-Stack Web Development. I architect cloud infrastructure using AWS, Docker, and Linux while building performant web applications in React, TypeScript, Node.js, and PHP.'
  },
  {
    q: 'Can you work across both frontend and backend systems?',
    a: 'Yes! My experience spans modern front-end engineering with React and TypeScript, backend REST API development in Node.js and PHP, relational database modeling in MySQL, and automated CI/CD deployments on Vercel and AWS.'
  },
  {
    q: 'How long does a typical project take to complete?',
    a: 'Timelines vary by scope. Small to medium web applications or cloud setups typically take 1 to 3 weeks, while comprehensive enterprise architectures take 4 to 8 weeks with milestone reviews.'
  },
  {
    q: 'What kind of roles and contract work are you currently seeking?',
    a: 'I am open to software engineering internships, cloud infrastructure / DevOps contracts, and independent full-stack consulting projects where I can build reliable, scalable software.'
  },
  {
    q: 'Do you provide ongoing maintenance and deployment support?',
    a: 'Yes. Every project includes architectural documentation, CI/CD pipeline automation, and handover support to ensure your cloud environments run reliably in production.'
  }
];
