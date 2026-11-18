export const profile = {
  name: 'Monish Ratan Seelam',
  shortName: 'Monish',
  monogram: 'MR',
  role: 'AI & Data Science Engineer',
  tagline: 'I build AI systems that see, retrieve, and verify.',
  location: 'Vijayawada, India',
  timezone: 'Asia/Kolkata',
  email: 'monish03905@gmail.com',
  phone: '+91 94404 94599',
  phoneHref: '+919440494599',
  resume: '/resume.pdf',
  availability: 'Open to AI/ML & software internships',
  links: {
    github: 'https://github.com/Monish03905',
    linkedin: 'https://www.linkedin.com/in/monish-ratan-259695247/',
    leetcode: 'https://leetcode.com/u/KL2400080018/',
    codechef: 'https://www.codechef.com/users/monish_ratan',
    hackerrank: 'https://www.hackerrank.com/profile/KL2400080018',
  },
  intro:
    "I'm an AI & Data Science undergraduate at KL University who learns by building: an LLM gateway that routes by cost, a multilingual RAG pipeline, an autonomous code-repair engine, a studio that writes and renders its own films, and full-stack apps that are live today.",
  introSecond:
    "I like turning ideas into working, testable software — and I led the VEDA Student Body as its President along the way. I'm looking for an AI/ML or software engineering internship where I can keep shipping.",
};

export const stats = [
  { value: '8.34', suffix: '/10', label: "CGPA · B.Tech AI&DS" },
  { value: '9,754', suffix: '', label: 'chunks indexed in FAISS' },
  { value: '6-DOF', suffix: '', label: 'gesture-flown drone' },
  { value: '3', suffix: '', label: 'live deployed apps' },
  { value: '5', suffix: '', label: 'cloud & AI certifications' },
];

export const pillars = [
  {
    key: 'see',
    kicker: '01 / Perception',
    title: 'See',
    body: 'Cameras, landmarks, gestures. I turn raw pixels into real-time control — MediaPipe and OpenCV pipelines running at 30+ FPS with 90–95% gesture accuracy.',
    proof: '3D Drone Simulator · Hand-Tracking AR UI · Air Draw Canvas',
    accent: 'vision',
  },
  {
    key: 'retrieve',
    kicker: '02 / Retrieval',
    title: 'Retrieve',
    body: 'Embeddings, vector search, grounding. AURA indexes 9,754 chunks as 384-dim vectors in FAISS and shows the exact passage behind every answer.',
    proof: 'AURA RAG · multilingual · FastAPI',
    accent: 'retrieval',
  },
  {
    key: 'verify',
    kicker: '03 / Verification',
    title: 'Verify',
    body: "AI that proves its work. DeVision runs fixes through see → understand → fix → test → verify, with diffs, build logs, and cost metrics attached.",
    proof: 'DeVision A.I. · OpsGuard gates',
    accent: 'verify',
  },
];

export const projects = [
  {
    id: 'switchyard',
    index: '01',
    title: 'Switchyard',
    subtitle: 'LLM Gateway & Routing Cockpit',
    category: 'AI & Retrieval',
    year: '2026',
    state: 'Open source',
    summary:
      'A gateway that sits between your app and every model you use — picking the cheapest tier that still passes, and issuing a signed receipt for every call.',
    problem:
      'One model for everything is either too expensive or too weak. Teams hard-code routing rules and have no ledger proving what each call actually cost.',
    approach: [
      'Built a three-tier router — prime, yardmaster, thrift — that grades each request and falls back across providers, with exact-match caching and an HMAC-chained receipt on every response.',
      'Ran a 36-task exam across 9 categories: the router held 94.4% of prime’s pass rate on 74.8% of its spend, a 25.2% saving.',
      'Shipped a six-page React cockpit for live traffic, spend, route mix and p95 latency, backed by 92 tests, 22 live smoke checks and Ruff + Docker CI gates.',
    ],
    highlights: [
      '94.4% of prime’s pass rate at 74.8% of prime’s spend',
      'HMAC-chained cost ledger on SQLite or Postgres',
      '92 tests · 22 live smoke checks · CI image job',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'PostgreSQL', 'Docker'],
    links: { github: 'https://github.com/Monish03905/switchyard-llm-gateway' },
  },
  {
    id: 'ghostlight',
    index: '02',
    title: 'Ghostlight Studio',
    subtitle: 'Autonomous Faceless Film Studio',
    category: 'AI & Retrieval',
    year: '2026',
    state: 'Open source',
    summary:
      'A studio that never sleeps: it researches, writes, narrates, scores, paints and renders short films on each channel’s own airtime — and holds them at a quality gate before anything publishes.',
    problem:
      'Running a YouTube channel is a treadmill of research, scripting, voice-over and editing. Automating it usually means template videos everyone spots in three seconds.',
    approach: [
      'Built a nine-stage pipeline — research → write → narrate → score → paint → render → inspect → publish → learn — on a scheduler that fires each channel’s airtimes with a 45-minute catch-up window.',
      'Narrated with Piper neural TTS, scored the film procedurally and painted every frame in code: no stock footage, no two stories alike.',
      'Dressed the control room as a four-mood theatre (night, daylight, twilight, ember) and made it an installable PWA whose cache never touches the API.',
    ],
    highlights: [
      'Nine-stage autonomous film pipeline',
      'Hard quality gate before any upload',
      'Multi-channel network with review or auto publish',
    ],
    stack: ['Python', 'FastAPI', 'FFmpeg', 'Piper TTS', 'SQLite', 'PWA'],
    links: { github: 'https://github.com/Monish03905/GHOSTLIGHT_STUDIO' },
  },
  {
    id: 'aura',
    index: '03',
    title: 'AURA',
    subtitle: 'Adaptive Universal RAG Assistant',
    category: 'AI & Retrieval',
    year: '2026',
    state: 'Local-first',
    summary:
      'An offline-first, multilingual assistant that lets you talk to your own documents — and inspect the evidence behind every answer.',
    problem:
      'Language models hallucinate when the answer is not in their weights, and most chat-with-docs tools hide retrieval behind a black box.',
    approach: [
      'Built the full retrieval loop: ingestion → chunking → multilingual embeddings → FAISS search → grounded generation.',
      'Indexed 9,754 chunks as 384-dim MiniLM-L12-v2 vectors and served the pipeline through a FastAPI endpoint with a local LLM.',
      'Surfaced every retrieved passage and stage timing in the UI, so each answer can be audited instead of trusted.',
    ],
    highlights: [
      '9,754 chunks · 384-dim MiniLM-L12-v2 embeddings',
      'Multilingual recall across PDF, DOCX, Markdown, CSV, JSON & logs',
      'Fully offline-first — files never leave the machine',
    ],
    stack: ['Python', 'FastAPI', 'FAISS', 'Sentence Transformers', 'Hugging Face'],
    links: { github: 'https://github.com/Monish03905/Aure-RAG' },
  },
  {
    id: 'devision',
    index: '04',
    title: 'DeVision A.I.',
    subtitle: 'Autonomous Code Repair & Verification',
    category: 'AI & Retrieval',
    year: '2026',
    state: 'Live demo',
    summary:
      "A repair engine that doesn't just suggest fixes — it proves them through a five-stage see → understand → fix → test → verify loop.",
    problem:
      'AI coding assistants stop at “here is a patch”. Nobody shows whether it builds, passes tests, or costs more to run.',
    approach: [
      'Designed a five-stage agent loop with project-context retrieval so every fix is grounded in the actual codebase.',
      'Paired side-by-side diffs with live build logs and CPU / memory / runtime / cost metrics.',
      'Wrapped the loop in CI-style gates — a fix is only presented once verification passes.',
    ],
    highlights: [
      'See → Understand → Fix → Test → Verify',
      'Side-by-side diffs with live build logs',
      'Per-fix CPU, memory, runtime & cost metrics',
    ],
    stack: ['TypeScript', 'React', 'Vite', 'LLM orchestration', 'CI/CD'],
    links: {
      github: 'https://github.com/Monish03905/DEVISION-A.I.-SOFTWARE-',
      demo: 'https://jocular-douhua-96704b.netlify.app/',
    },
  },
  {
    id: 'opsguard',
    index: '05',
    title: 'OpsGuard',
    subtitle: 'Incident Response & Operations Control',
    category: 'Full-stack',
    year: '2026',
    state: 'Live demo',
    summary:
      'An operations console that unifies service monitoring, SLA tracking, incident management, and playbook-driven response.',
    problem:
      'Incidents get lost between dashboards, chat threads, and docs — and SLA breaches are discovered after the fact.',
    approach: [
      'Modelled services, incidents, and SLAs in PostgreSQL through Supabase with row-level security.',
      'Built real-time SLA countdowns and playbook-driven response flows in React and TypeScript.',
      'Gated deploys with lint, test, build, and security checks in GitHub Actions before shipping to Vercel.',
    ],
    highlights: [
      'Real-time SLA monitoring & breach alerts',
      'Playbook-driven incident response',
      'Lint · test · build · security gates in CI',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vite', 'GitHub Actions'],
    links: {
      github: 'https://github.com/Monish03905/OpsGuard',
      demo: 'https://opsguard-j7ygzrnec-monish3905.vercel.app/',
    },
  },
  {
    id: 'drone',
    index: '06',
    title: 'Gesture-Flown Drone',
    subtitle: 'Computer Vision × OpenGL Simulator',
    category: 'Vision',
    year: '2026',
    state: 'Open source',
    summary:
      'Fly a simulated quadcopter with your bare hands: six degrees of freedom, a live OpenGL scene, and a gesture map read from a webcam.',
    problem:
      'Gesture demos usually stop at drawing landmarks on a frame. I wanted control that feels physical — latency, hover lock, emergency stop.',
    approach: [
      'Mapped gestures with MediaPipe and OpenCV: palm up to take off, tilt to yaw and pitch, push/pull to translate, pinch for emergency stop.',
      'Rendered the aircraft in PyOpenGL with animated propellers, telemetry, radar and compass overlays.',
      'Tuned the pipeline to 30+ FPS on live webcam input with 90–95% gesture accuracy.',
    ],
    highlights: [
      '6-DOF flight with hover-lock and emergency stop',
      '30+ FPS real-time inference on webcam',
      'OpenGL scene with live telemetry & radar',
    ],
    stack: ['Python', 'OpenCV', 'MediaPipe', 'PyOpenGL'],
    links: { github: 'https://github.com/Monish03905/3D-Drone-Simulator' },
  },
  {
    id: 'wellness',
    index: '07',
    title: 'Wellness Tracker',
    subtitle: 'Student Health & Wellness Platform',
    category: 'Full-stack',
    year: '2025',
    state: 'Live app',
    summary:
      'A full-stack health platform where students track wellness metrics, plan nutrition, find anonymous peer support, and trigger an SOS.',
    problem:
      'Student wellbeing data is scattered across notes and apps, and asking for help is the hardest step.',
    approach: [
      'Built dashboards, nutrition planning, anonymous peer support, and an emergency SOS flow on a REST API.',
      'Java + Spring Boot + Hibernate services over MySQL, with a React + TypeScript client.',
      'Documented the build as a featured LinkedIn article.',
    ],
    highlights: [
      'Anonymous peer support & SOS flow',
      'REST + Hibernate data layer on MySQL',
      'Live on Netlify · featured LinkedIn write-up',
    ],
    stack: ['React', 'TypeScript', 'Spring Boot', 'Hibernate', 'MySQL'],
    links: {
      demo: 'https://wellnes-tracker.netlify.app/',
      github: 'https://github.com/RaghuVardhan30/Wellness-Tracker',
      article:
        'https://www.linkedin.com/pulse/building-student-health-wellness-tracking-system-using-monish-ratan-malnc',
    },
  },
  {
    id: 's3',
    index: '08',
    title: 'S3 Batch Retagging',
    subtitle: 'Manifest-Driven Cloud Automation',
    category: 'Cloud',
    year: '2026',
    state: 'Lab',
    summary:
      'A safe, manifest-driven AWS Batch Operations workflow that retags millions of S3 objects and archives them under a lifecycle rule.',
    problem:
      'Retagging a large bucket by hand is slow and error-prone — and expensive when IAM or lifecycle policy is wrong.',
    approach: [
      'Generated a manifest and executed a managed S3 Batch Operations job under least-privilege IAM roles.',
      'Produced completion reports and applied a 30-day Standard-IA lifecycle rule to control storage cost.',
      'Documented a safe 20-object demo path before any large run.',
    ],
    highlights: [
      'Managed batch job across millions of objects',
      'Least-privilege IAM + completion reports',
      '30-day Standard-IA lifecycle for cost control',
    ],
    stack: ['AWS S3', 'IAM', 'Python', 'PowerShell'],
    links: { github: 'https://github.com/Monish03905/S3-Batch-Project' },
  },
];

export const experiments = [
  {
    name: 'JARVIS',
    note: 'Voice-first OS assistant with a local LLM brain and skills for files, apps, calls and media. Work in progress.',
    tags: ['Python', 'FastAPI', 'Ollama', 'Edge TTS'],
    link: 'https://github.com/Monish03905/jarvis-voice-assistant',
  },
  {
    name: 'ResQ',
    note: 'Local-first incident coordination with optional on-device pose landmarks from responder video.',
    tags: ['TypeScript', 'SQLite', 'Pose landmarks'],
    link: 'https://github.com/Monish03905/ResQ',
  },
  {
    name: 'VoxFlow Studio',
    note: 'Voice-native command center that turns speech into PRDs, tickets, and architecture maps.',
    tags: ['JavaScript', 'Web Audio', 'React 19'],
    link: 'https://github.com/Monish03905/Task-Wispr-Flow',
  },
  {
    name: 'Hand-Tracking AR UI',
    note: 'Futuristic AR HUD — radial gauges and pinch controls drawn on your hand in real time.',
    tags: ['Python', 'MediaPipe', 'OpenCV'],
    link: 'https://github.com/Monish03905/Hand-Tracking-AR-UI',
  },
  {
    name: 'Air Draw Canvas',
    note: 'Paint in mid-air: point to draw, fist to pause, open palm to clear the canvas.',
    tags: ['Python', 'OpenCV'],
    link: 'https://github.com/Monish03905/air-draw-canvas',
  },
  {
    name: 'Webcam Fruit Ninja',
    note: 'A motion-controlled arcade game played entirely through a webcam.',
    tags: ['Python', 'Computer vision'],
    link: 'https://github.com/Monish03905/Webcam-Fruit-Ninja-project',
  },
  {
    name: 'Virtual Air Drum Piano',
    note: 'Gesture-triggered percussion and keys with zero hardware — just hands and air.',
    tags: ['Python', 'Audio'],
    link: 'https://github.com/Monish03905/Virtual-Air-Drum-Piano',
  },
  {
    name: 'Tribal Handicrafts Hub',
    note: 'An e-commerce storefront connecting tribal artisans with buyers beyond their district.',
    tags: ['Full-stack', 'E-commerce'],
    link: 'https://github.com/Monish03905/FEDF-Project',
  },
];

export const skillGroups = [
  {
    title: 'AI & Machine Learning',
    note: 'Retrieval, embeddings, and real-time inference',
    accent: 'retrieval',
    items: [
      { name: 'RAG pipelines', level: 4 },
      { name: 'FAISS / vector search', level: 4 },
      { name: 'Sentence Transformers', level: 4 },
      { name: 'Hugging Face', level: 3 },
      { name: 'OpenCV', level: 4 },
      { name: 'MediaPipe', level: 4 },
      { name: 'Agent & prompt workflows', level: 4 },
    ],
  },
  {
    title: 'Languages',
    note: 'The tools I reach for first',
    accent: 'vision',
    items: [
      { name: 'Python', level: 4 },
      { name: 'Java', level: 4 },
      { name: 'TypeScript', level: 3 },
      { name: 'JavaScript', level: 3 },
      { name: 'SQL', level: 3 },
      { name: 'C++ / C', level: 2 },
    ],
  },
  {
    title: 'Build',
    note: 'From API contract to shipped interface',
    accent: 'verify',
    items: [
      { name: 'Spring Boot', level: 4 },
      { name: 'FastAPI', level: 3 },
      { name: 'React', level: 4 },
      { name: 'Vite', level: 3 },
      { name: 'Node.js', level: 3 },
      { name: 'REST / Hibernate', level: 4 },
    ],
  },
  {
    title: 'Data',
    note: 'Storage that survives real usage',
    accent: 'cloud',
    items: [
      { name: 'MySQL', level: 4 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'Supabase', level: 3 },
      { name: 'FAISS indexes', level: 4 },
    ],
  },
  {
    title: 'Cloud & Ops',
    note: 'Deploy, observe, and keep it cheap',
    accent: 'cloud',
    items: [
      { name: 'AWS · S3, IAM, EC2, Lambda', level: 3 },
      { name: 'Google Cloud', level: 3 },
      { name: 'CI/CD & GitHub Actions', level: 3 },
      { name: 'Git & Linux', level: 4 },
    ],
  },
];

export const timeline = [
  {
    year: '2024',
    period: '2024 → 2028',
    tag: 'Education',
    title: 'B.Tech · Artificial Intelligence & Data Science',
    org: 'KL University, Vijayawada',
    body: "Core coursework in machine learning, data structures, DBMS, and software engineering — paired with a project shipping every semester. Currently 8.34/10 CGPA.",
    accent: true,
  },
  {
    year: '2025',
    period: '2025 → 2026',
    tag: 'Leadership',
    title: 'President · VEDA Student Body',
    org: 'KL University',
    body: "Elected to lead the student body: technical events, workshops, and cross-functional teams across departments. Earned the Dean's Recognition for event management.",
  },
  {
    year: '2026',
    period: 'Jun → Aug 2026',
    tag: 'Internship',
    title: 'Generative AI Virtual Intern',
    org: 'AICTE & EduSkills · with Google Cloud',
    body: 'Eight-week cohort on generative AI foundations and cloud deployment, closing with a verified capstone certificate.',
    link: 'https://certificate.eduskillsfoundation.org/verify/49fc9cd3e211b0ba673f/49fc9cd3e211b0ba673f',
  },
  {
    year: '2026',
    period: '2026 → now',
    tag: 'Craft',
    title: 'Shipping AI systems end-to-end',
    org: 'Independent',
    body: 'Switchyard, Ghostlight, AURA, DeVision, OpsGuard, a gesture-flown drone — routing, rendering, retrieval, verification, and the write-ups that explain them.',
    link: 'https://github.com/Monish03905',
  },
];

export const education = [
  {
    period: '2024 — 2028',
    degree: 'B.Tech · Artificial Intelligence & Data Science',
    school: 'KL University',
    place: 'Vijayawada, Andhra Pradesh',
    score: '8.34 / 10 CGPA',
    note: 'Expected May 2028',
  },
  {
    period: '2020 — 2023',
    degree: 'Intermediate · MPC',
    school: 'Andhra Loyola College',
    place: 'Vijayawada, Andhra Pradesh',
    score: 'Mathematics, Physics, Chemistry',
  },
  {
    period: '2019 — 2020',
    degree: 'Secondary School · Class X',
    school: 'Sri Chaitanya School',
    place: 'Andhra Pradesh',
    score: '9.0 / 10 CGPA',
  },
];

export const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    note: 'Cloud fundamentals, billing, security, and architecture',
    file: '/certs/aws-cloud-practitioner.pdf',
    accent: 'cloud',
  },
  {
    name: 'Oracle Certified AI Foundations Associate',
    issuer: 'Oracle',
    note: 'AI foundations, ML lifecycle, and generative AI concepts',
    file: '/certs/oracle-ai-foundations.pdf',
    accent: 'retrieval',
  },
  {
    name: 'Oracle Agentic AI Foundations Associate',
    issuer: 'Oracle',
    note: 'Agentic systems, tool use, and orchestration patterns',
    file: null,
    accent: 'verify',
  },
  {
    name: 'Oracle Fusion AI Agent Studio Foundations',
    issuer: 'Oracle',
    note: 'Building and deploying AI agents in Fusion applications',
    file: '/certs/oracle-fusion-agent-studio.pdf',
    accent: 'verify',
  },
  {
    name: 'RPA Essentials',
    issuer: 'Automation Anywhere',
    note: 'Robotic process automation and bot design',
    file: '/certs/rpa-essentials.pdf',
    accent: 'vision',
  },
  {
    name: 'Generative AI Virtual Internship',
    issuer: 'AICTE & EduSkills · Google Cloud',
    note: '8-week program · verified capstone certificate',
    file: 'https://certificate.eduskillsfoundation.org/verify/49fc9cd3e211b0ba673f/49fc9cd3e211b0ba673f',
    accent: 'retrieval',
    external: true,
  },
];

export const facts = [
  { k: 'Based in', v: 'Vijayawada, India' },
  { k: 'Studying', v: 'B.Tech AI & DS · KL University' },
  { k: 'Graduating', v: 'May 2028' },
  { k: 'CGPA', v: '8.34 / 10' },
  { k: 'Focus', v: 'Retrieval · Computer vision · Full-stack' },
  { k: 'Currently', v: 'Building Switchyard, Ghostlight and JARVIS' },
];

export const currently = [
  'Tuning AURA’s multilingual embeddings for low-resource languages',
  'Exploring agentic verification loops beyond code',
  'Open-sourcing gesture + vision experiments on GitHub',
];
