export type ProjectCategory = 'All' | 'Frontend UI' | 'Full-Stack' | 'Interactive Web';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  duration: string;
  role: string;
  featuredSpan: boolean;
  summary: string;
  challenge: string;
  solution: string;
  keyHighlights: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  liveUrl: string;
  repoUrl: string;
  artworkVariant: 'swiss-design-system' | 'editorial-commerce' | 'spatial-canvas' | 'acoustic-synth' | 'markdown-studio';
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  type: 'Experience' | 'Education' | 'Certification';
  description: string;
  achievements: string[];
  technologies: string[];
}

export const PORTFOLIO_METRICS = [
  {
    value: '14',
    unit: 'Projects Shipped',
    context: 'Production web apps & open-source UI systems Since 2024',
  },
  {
    value: '99.2%',
    unit: 'Lighthouse Score',
    context: 'Average accessibility & performance across client builds',
  },
  {
    value: '1,280+',
    unit: 'Git Commits',
    context: 'Consistent contributions in React, TypeScript & Tailwind CSS',
  },
  {
    value: '< 140ms',
    unit: 'Interaction Budget',
    context: 'Hardware-accelerated Framer Motion UI state transitions',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'krono-design-system',
    index: '01',
    title: 'Krono — Architectural UI Component System',
    subtitle: 'Accessible monochrome primitives for high-density web applications',
    category: 'Frontend UI',
    year: '2026',
    duration: '8 Weeks',
    role: 'Lead Frontend Developer',
    featuredSpan: true,
    summary:
      'A zero-dependency React 19 + TypeScript component library engineered around strict Swiss typographic grids, keyboard-first navigation, and fluid Framer Motion layout primitives.',
    challenge:
      'Many junior developer projects rely heavily on uncustomized component libraries that suffer from inconsistent focus management, bloated bundle sizes, and jarring layout shifts when switching between light and dark themes.',
    solution:
      'Built 28 accessible UI primitives from scratch using semantic HTML, WAI-ARIA patterns, CSS custom properties for instant monochrome theme switching, and shared layoutId transitions in Framer Motion.',
    keyHighlights: [
      'Full keyboard roving-tabindex support across menus, modals, and segmented tabs',
      'Sub-14KB gzipped core bundle with tree-shakable ESM exports',
      'Automated WCAG AA contrast verification across Light (#FAFAFA) and Dark (#050505) tokens',
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Storybook'],
    metrics: [
      { label: 'Core Bundle Size', value: '13.4 KB' },
      { label: 'Accessibility Score', value: '100 / 100' },
      { label: 'Reusable Primitives', value: '28 Modules' },
    ],
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    artworkVariant: 'swiss-design-system',
  },
  {
    id: 'atelier-noir-commerce',
    index: '02',
    title: 'Atelier Noir — Minimalist Editorial Storefront',
    subtitle: 'Headless e-commerce experience with instant filter transitions',
    category: 'Full-Stack',
    year: '2026',
    duration: '6 Weeks',
    role: 'Full-Stack Web Developer',
    featuredSpan: false,
    summary:
      'An editorial digital flagship store for independent print monographs and architectural objects, featuring optimistic cart updates, URL-synced multi-facet filtering, and rapid checkout.',
    challenge:
      'Traditional e-commerce templates clutter the viewport with promotional popups and slow full-page reloads during catalog filtering, distracting from high-contrast product photography.',
    solution:
      'Architected a client-cached catalog engine with React, Express API routes, and Framer Motion layout animations so filtering by material or edition settles in under 150ms without layout jump.',
    keyHighlights: [
      'Optimistic cart state drawer with persistent localStorage & server validation',
      'Editorial lookbook reader mode with keyboard arrow navigation',
      'Dynamic OpenGraph metadata and structured JSON-LD product schema',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
    metrics: [
      { label: 'Filter Latency', value: '42 ms' },
      { label: 'First Contentful Paint', value: '0.6 s' },
      { label: 'Checkout Conversion Lift', value: '+34%' },
    ],
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    artworkVariant: 'editorial-commerce',
  },
  {
    id: 'forma-spatial-canvas',
    index: '03',
    title: 'Forma — Infinite Whiteboard & Wireframe Canvas',
    subtitle: 'Multiplayer-ready vector sketching tool for frontend architecture',
    category: 'Interactive Web',
    year: '2025',
    duration: '5 Weeks',
    role: 'Frontend Engineer',
    featuredSpan: false,
    summary:
      'A high-frame-rate HTML5 Canvas & React workspace enabling developers to sketch component hierarchies, snap grid connectors, and export clean JSX boilerplate.',
    challenge:
      'Rendering hundreds of draggable nodes in standard DOM containers caused severe frame drops on mid-range laptops during rapid pan and zoom gestures.',
    solution:
      'Decoupled viewport matrix transformations using requestAnimationFrame and spatial quadtree culling, keeping only visible nodes mounted in the interactive overlay layer.',
    keyHighlights: [
      'Smooth 60fps zoom and pan across 500+ concurrent diagram nodes',
      'One-click export to SVG, PNG, or structured React component tree',
      'Snap-to-grid alignment guides with tabular coordinate readout',
    ],
    techStack: ['React', 'TypeScript', 'HTML5 Canvas', 'Framer Motion', 'Vite'],
    metrics: [
      { label: 'Frame Rate @ 500 Nodes', value: '60 FPS' },
      { label: 'Canvas Zoom Range', value: '10% – 400%' },
      { label: 'Export Formats', value: 'SVG · PNG · JSX' },
    ],
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    artworkVariant: 'spatial-canvas',
  },
  {
    id: 'pulse-web-synthesizer',
    index: '04',
    title: 'Pulse — Web Audio API Harmonic Visualizer',
    subtitle: 'Real-time frequency spectrum analyzer & ambient loop workstation',
    category: 'Interactive Web',
    year: '2025',
    duration: '4 Weeks',
    role: 'Creative Web Developer',
    featuredSpan: false,
    summary:
      'An interactive browser-based audio synthesizer and FFT frequency visualizer inspired by Dieter Rams hardware interfaces, built with the native Web Audio API.',
    challenge:
      'Synchronizing real-time audio oscillator parameters with React state without triggering excessive component re-renders every audio frame.',
    solution:
      'Bridged Web Audio AudioWorklet nodes directly to a high-DPI monochrome oscilloscope canvas while isolating React state strictly to tactile knob and preset controls.',
    keyHighlights: [
      '4-voice polyphonic synth engine with custom ADSR envelope generator',
      'Real-time 60fps monochrome FFT spectrum and waveform visualizer',
      'Shareable URL hash presets for saving custom ambient patches',
    ],
    techStack: ['Web Audio API', 'React', 'TypeScript', 'Canvas 2D', 'Tailwind CSS'],
    metrics: [
      { label: 'Audio Buffer Latency', value: '8.2 ms' },
      { label: 'Oscillator Voices', value: '4 Polyphonic' },
      { label: 'Built-in Presets', value: '12 Patches' },
    ],
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    artworkVariant: 'acoustic-synth',
  },
  {
    id: 'folio-markdown-monograph',
    index: '05',
    title: 'Folio — Distraction-Free Technical Writing Studio',
    subtitle: 'Split-pane Markdown editor with live typographic preview & outline',
    category: 'Full-Stack',
    year: '2025',
    duration: '5 Weeks',
    role: 'Junior Web Developer',
    featuredSpan: true,
    summary:
      'A minimalist writing environment designed for engineering blogs and documentation, featuring synchronized scroll-linking, syntax-highlighted code blocks, and instant static HTML export.',
    challenge:
      'Writers needed a distraction-free workspace that accurately previewed print-grade editorial typography alongside technical code blocks and live reading-time metrics.',
    solution:
      'Implemented an AST-based Markdown parser with synchronized scroll-percentage mapping, keyboard shortcut command palette, and local-first IndexedDB auto-recovery.',
    keyHighlights: [
      'Zero-latency split view with proportional scroll synchronization',
      'Live reading time, word count, and heading hierarchy outline inspector',
      'Instant export to clean semantic HTML, Markdown, or PDF print stylesheet',
    ],
    techStack: ['React', 'TypeScript', 'IndexedDB', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Parser Throughput', value: '12,000 w/s' },
      { label: 'Offline Persistence', value: '100% Local' },
      { label: 'Keyboard Shortcuts', value: '18 Commands' },
    ],
    liveUrl: 'https://github.com',
    repoUrl: 'https://github.com',
    artworkVariant: 'markdown-studio',
  },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'exp-1',
    period: '2026 — Present',
    role: 'Junior Frontend Web Developer',
    organization: 'Monolith Digital Studio',
    location: 'Jakarta · Hybrid',
    type: 'Experience',
    description:
      'Engineering responsive web interfaces, interactive marketing experiences, and reusable React + TypeScript component libraries for design-forward clients.',
    achievements: [
      'Reduced average client landing page bundle weight by 38% by migrating legacy scripts to modular Vite + React 19 builds.',
      'Implemented fluid Framer Motion page transitions and WCAG AA dark/light theme systems across 6 production launches.',
      'Collaborated directly with UI/UX designers in Figma to translate strict grid systems into pixel-accurate Tailwind CSS.',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Git'],
  },
  {
    id: 'exp-2',
    period: '2025 — 2026',
    role: 'Web Development Intern',
    organization: 'Kreasi Labs Technology',
    location: 'Bandung · On-site',
    type: 'Experience',
    description:
      'Supported the core product engineering team in building internal analytics dashboards, REST API integrations, and automated UI testing workflows.',
    achievements: [
      'Built 15+ responsive dashboard views with tabular data filtering, pagination, and CSV export functionality.',
      'Refactored form validation logic using custom React hooks, cutting support tickets related to input errors by 25%.',
      'Participated in daily agile code reviews, sprint planning, and pair-programming sessions with senior engineers.',
    ],
    technologies: ['React', 'JavaScript (ES2022)', 'REST APIs', 'Node.js', 'CSS Grid'],
  },
  {
    id: 'edu-1',
    period: '2022 — 2026',
    role: 'B.Sc. in Informatics & Computer Science',
    organization: 'Institut Teknologi & Sains',
    location: 'Indonesia',
    type: 'Education',
    description:
      'Focused on Web Engineering, Human-Computer Interaction (HCI), Data Structures, and Software Architecture. Active lead in the Campus Web Developer Guild.',
    achievements: [
      'Graduated with Honors (GPA 3.84 / 4.00); Capstone thesis on High-Performance Web Animations & Accessibility.',
      'Mentored 40+ first-year students in semantic HTML5, modern CSS architecture, and React fundamentals.',
    ],
    technologies: ['Algorithms', 'Web Architecture', 'UI/UX Engineering', 'Database Systems'],
  },
];

export const SKILL_GROUPS = [
  {
    category: 'Frontend Architecture',
    items: ['React 19', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 Semantic DOM', 'Vite & Next.js'],
  },
  {
    category: 'Styling & Motion Design',
    items: ['Tailwind CSS', 'Framer Motion', 'CSS Grid & Flexbox', 'Responsive Design', 'Dark/Light Theme Systems'],
  },
  {
    category: 'Backend & Tooling',
    items: ['Node.js & Express', 'RESTful APIs', 'Git & GitHub Workflows', 'Performance Optimization', 'WCAG Accessibility'],
  },
];

export const VIBE_NOTES = [
  {
    index: '01',
    context: 'Deep Focus Architecture',
    note: 'Late-night component refactoring and TypeScript state modeling sessions powered by atmospheric rhythms and crisp production.',
  },
  {
    index: '02',
    context: 'Motion & Timing Polish',
    note: 'Tuning cubic-bezier spring curves and Framer Motion staggered reveals to match the cadence and tempo of my favorite tracks.',
  },
  {
    index: '03',
    context: 'Minimalist Monochrome Flow',
    note: 'Music shapes how I pace visual whitespace—alternating dense technical problem-solving with calm, breathable studio intervals.',
  },
];
