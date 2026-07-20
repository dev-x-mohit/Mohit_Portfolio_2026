export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  description: string;
  techStack: string[];
  accentColor: string;
  githubLink: string;
  liveLink: string;
  coverImage: string;
  codeSnippet: string;

  stats: {
    commits: number;
    stars: number;
    topLanguage: string;
    issues: number;
  };
  type: 'web' | 'mobile' | 'both';
  features: string[];
  screenshots?: string[];
  apkLink?: string;
  status?: string;

  // Structured dev insight fields
  learned?: string[];       // Key skills / concepts learned
  challenges?: string[];    // Problems faced and how solved
  techEvolution?: string[]; // Tech decisions, pivots, or changes made
}


export const projects: Project[] = [
  {
    "id": "feat-1",
    "title": "Ekovym",
    "description": "A developer-focused platform designed to streamline workflows with a strong emphasis on modern UI/UX and collaborative modules.",
    "techStack": [
      "React.js",
      "TailwindCSS",
      "Node.js",
      "MongoDB"
    ],
    "category": "Web Platforms",
    "status": "In Progress",
    "githubLink": "https://github.com/dev-x-mohit/ekovym",
    "liveLink": "https://ekovym.vercel.app/",
    "year": "2026",
    "features": [
      "Modern UI/UX",
      "High Performance"
    ],
    "stats": {
      "stars": 1,
      "issues": 0,
      "commits": 10,
      "topLanguage": "JavaScript"
    },
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228682/portfolio_assets/mockup-ekovym-desktop.png",
    "accentColor": "#A8791D",
    "summary": "A developer-focused platform designed to streamlin...",
    "codeSnippet": "// Ekovym: Real-time Workspace Sync\nimport { useEffect, useState } from 'react';\nimport { io } from 'socket.io-client';\n\nexport function useWorkspaceSync(workspaceId) {\n  const [data, setData] = useState(null);\n\n  useEffect(() => {\n    const socket = io('https://api.ekovym.com');\n    socket.emit('join_workspace', workspaceId);\n    \n    socket.on('workspace_update', (newData) => {\n      setData(newData);\n    });\n\n    return () => socket.disconnect();\n  }, [workspaceId]);\n\n  return data;\n}",
    "type": "web",
    "learned": [
      "Advanced state management for complex productivity workflows",
      "Implementing real-time collaborative features",
      "Optimizing MongoDB aggregation pipelines for large datasets"
    ],
    "challenges": [
      "Handling real-time synchronization across multiple clients without race conditions.",
      "Designing a highly modular UI that users can customize extensively."
    ],
    "techEvolution": [
      "Started with standard React state, but migrated to Context API and Redux for scalable state management.",
      "Switched from REST to WebSockets for live collaboration modules."
    ]
  },
  {
    "id": "feat-10",
    "title": "Soloflow",
    "year": "2026",
    "category": "Web Platforms",
    "summary": "Freelancer billing portal and client SaaS leveraging GPT-4o proposal generation, automated time tracking, and secure webhooks-driven Razorpay settlements.",
    "description": "# Soloflow\n\n> **An AI-powered freelancer client portal and billing SaaS with Razorpay integration and GPT-4o proposal generation.**\n\nA production-ready SaaS application for freelancers to manage clients, projects, time logs, and invoices — with Razorpay payment integration and GPT-4o AI proposal generation.\n\n---\n\n## ✨ Key Highlights\n- **AI Proposal Generation**\n- **Razorpay Payments**\n- **Time Tracking**\n- **Client Portal**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **Next.js 15, Prisma, PostgreSQL, NextAuth, Razorpay, OpenAI API**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "Next.js 15",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Razorpay",
      "OpenAI API"
    ],
    "accentColor": "#10B981",
    "githubLink": "https://github.com/dev-x-mohit/soloflow",
    "liveLink": "https://soloflow-invoice.vercel.app",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1781679012/portfolio_projects/soloflow/dashboard_dark.png",
    "type": "web",
    "stats": {
      "commits": 85,
      "stars": 1,
      "topLanguage": "TypeScript",
      "issues": 0
    },
    "features": [
      "AI Proposal Generation",
      "Razorpay Integration",
      "Automated Time Logs",
      "Client Collaboration"
    ],
    "codeSnippet": "// AI Proposal Generation\nconst response = await openai.chat.completions.create({\n  model: \"gpt-4o\",\n  messages: [{ role: \"user\", content: prompt }],\n  stream: true,\n});",
    "learned": [
      "Streaming AI responses with OpenAI SDK and handling partial JSON",
      "Prisma ORM with PostgreSQL relations and optimistic UI updates",
      "NextAuth session management with role-based access control",
      "Razorpay webhook signature verification for secure payments"
    ],
    "challenges": [
      "Razorpay webhook delivery failures in dev — solved with ngrok tunneling",
      "Race condition in time-log auto-save — fixed with debounced mutation queuing",
      "AI proposal sometimes hallucinated client names — added context clamping in prompt",
      "PostgreSQL connection pool exhaustion under load — tuned Prisma pool config"
    ],
    "techEvolution": [
      "Switched from tRPC to Next.js Server Actions for simpler data mutations",
      "Moved from SQLite (dev) → PostgreSQL (prod) mid-project for scale",
      "Replaced manual JWT auth with NextAuth to reduce boilerplate by 60%",
      "Added streaming UI after initial batch-response felt too slow"
    ]
  },
  {
    "id": "feat-9",
    "title": "Splitwiser",
    "year": "2026",
    "category": "Web & Mobile Apps",
    "summary": "Multi-platform expense splitter leveraging graph-based debt optimization, OCR receipt extraction, and AI-assisted expense categorization.",
    "description": "# Splitwiser\n\n> **AI-powered multi-platform expense splitter with receipt OCR, Splitwise OAuth migration, and graph-based debt simplification.**\n\nA modern, dark-themed expense splitting app with AI-powered bill scanning, expense analytics, and one-tap settlement reminders. Built for friend groups, roommates, and travel squads.\n\n---\n\n## ✨ Key Highlights\n- **React 19 Web App & Expo Mobile**\n- **Splitwise OAuth Data Import**\n- **OCR Receipt Auto-Parsing**\n- **Debt Minimization Graph**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **React Native, React 19, Tailwind CSS v4, Vite, Node.js, Express, MongoDB, Firebase Auth, Splitwise API**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "React Native",
      "React 19",
      "Tailwind CSS v4",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase Auth",
      "Splitwise API"
    ],
    "accentColor": "#7C3AED",
    "githubLink": "https://github.com/dev-x-mohit/splitsmart",
    "liveLink": "https://splitwiser-expense.vercel.app/",
    "coverImage": "/portfolio_projects/splitwiser/web_01_landing.png",
    "type": "both",
    "apkLink": "https://splitwiser-expense.vercel.app/splitsmart.apk",
    "stats": {
      "commits": 62,
      "stars": 1,
      "topLanguage": "TypeScript",
      "issues": 0
    },
    "features": [
      "OCR Receipt Parsing",
      "Graph-Based Debt Reduction",
      "OAuth Data Migration",
      "Cross-Platform Sync"
    ],
    "screenshots": [
      "/portfolio_projects/splitwiser/web_01_landing.png",
      "/portfolio_projects/splitwiser/web_03_dashboard.png",
      "/portfolio_projects/splitwiser/app_02_home.png",
      "/portfolio_projects/splitwiser/app_03_groups.png",
      "/portfolio_projects/splitwiser/web_05_groups.png"
    ],
    "codeSnippet": "// Express API route for receipt OCR parsing\nrouter.post('/ocr', upload.single('file'), async (req, res) => {\n  const result = await ocrService.parseReceipt(req.file.buffer);\n  res.json({ merchant: result.merchant, total: result.total, items: result.items });\n});",
    "learned": [
      "Cross-platform development targeting web (React 19) and mobile (Expo) simultaneously",
      "Graph-based debt minimization using greedy algorithm to reduce transactions",
      "Splitwise OAuth 2.0 flow and migrating external user data into own schema",
      "Tesseract.js OCR tuning for receipt image quality and noise reduction"
    ],
    "challenges": [
      "Keeping React Native and React web state in sync over a shared API layer",
      "OCR accuracy dropped on low-res photos — added preprocessing pipeline",
      "Splitwise API rate limits during batch import — implemented exponential backoff",
      "Expo build size bloat — used metro bundler tree-shaking to cut 30% APK size"
    ],
    "techEvolution": [
      "Started with React Native Web but switched to a separate Vite/React 19 web app for performance",
      "Replaced local Tesseract with server-side OCR for better accuracy on mobile uploads",
      "Migrated state from Context API to Zustand after prop drilling became unmanageable",
      "Added Firebase Auth after initial custom JWT had session refresh bugs on mobile"
    ]
  },
  {
    "id": "feat-6",
    "title": "Nexus",
    "year": "2026",
    "category": "Web Platforms",
    "summary": "Collaborative canvas enabling real-time node-based visual intelligence with Socket.io state sync and Gemini AI-assisted expansion.",
    "description": "# Nexus\n\n> **A next-generation collaborative mind-mapping platform powered by React 19, React Flow, and Gemini AI integration.**\n\n| 🧠 **Infinite Canvas** | Powered by **React Flow**, providing a limitless workspace for node-based architecture. |\n\n---\n\n## ✨ Key Highlights\n- **Infinite Visual Canvas**\n- **Real-time Collaboration**\n- **AI Idea Expansion**\n- **Command Palette Control**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **React 19, React Flow, Tailwind v4, Socket.io, Gemini AI**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "React 19",
      "React Flow",
      "Tailwind v4",
      "Socket.io",
      "Gemini AI"
    ],
    "accentColor": "#8B5CF6",
    "githubLink": "https://github.com/dev-x-mohit/nexus",
    "liveLink": "https://nexus-visuals.vercel.app/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1773763966/portfolio_projects/Nexus.png",
    "type": "web",
    "stats": {
      "commits": 28,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Collaborative Infinite Canvas",
      "Real-Time State Sync",
      "AI-Assisted Idea Expansion",
      "Command Palette Control"
    ],
    "codeSnippet": "// AI Collaborative Brainstorming Core\nconst handleAiChat = async (prompt) => {\n  setIsAiThinking(true);\n  try {\n    const res = await axios.post(`${API_BASE_URL}/ai/chat`, {\n      prompt,\n      mapContext: { nodes, edges },\n      graphId: id\n    });\n    const aiResponse = { role: 'model', content: res.data.text };\n    setAiMessages(prev => [...prev, aiResponse]);\n    if (res.data.suggestions) applyAiSuggestions(res.data.suggestions);\n  } finally {\n    setIsAiThinking(false);\n  }\n};",
    "learned": [
      "React Flow custom node types, handles, and edge rendering for visual graph UIs",
      "Socket.io room management for scoped real-time collaboration without data leaks",
      "Gemini AI API with context injection — passing graph state as structured prompt context",
      "Command palette pattern (⌘K) built with downshift for keyboard-first UX"
    ],
    "challenges": [
      "Real-time cursor sync causing 60+ socket events/sec — throttled to 30fps with rAF",
      "AI node suggestions conflicting with manual edits in the same session — added optimistic lock",
      "React Flow re-rendering entire graph on every node move — memoized nodes and edges arrays"
    ],
    "techEvolution": [
      "Switched from Gemini 1.0 to Gemini 1.5 Flash mid-project for 4x faster response time",
      "Replaced Zustand with React Flow's internal state for node/edge management",
      "Added Tailwind v4 (alpha) to evaluate the new CSS-first config approach vs v3"
    ]
  },
  {
    "id": "feat-11",
    "title": "Stitch",
    "year": "2026",
    "category": "Mobile Apps",
    "summary": "Premium luxury real estate mobile app with offline demo mode, interactive FinTech mortgage calculator, and Indian property listings across Jodhpur & Jaipur.",
    "description": "# Stitch\n\n> **A premium, full-stack Real Estate mobile app with offline demo mode, luxury UI, and an interactive mortgage calculator.**\n\nA redesigned real estate platform featuring curated property listings, category-based search, agent booking, and a live EMI calculator — all rendered with a Midnight & Amber Gold luxury design system.\n\n---\n\n## ✨ Key Highlights\n- **Offline Demo Mode**\n- **FinTech Mortgage Calculator**\n- **Indian Property Listings**\n- **Glassmorphic Tab Bar**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **React Native, Expo SDK 52, TypeScript, NativeWind, Appwrite, React Native Reanimated**, engineered for premium aesthetics and seamless UX.\n",
    "techStack": [
      "React Native",
      "Expo SDK 52",
      "TypeScript",
      "NativeWind",
      "Appwrite",
      "React Native Reanimated"
    ],
    "accentColor": "#D97706",
    "githubLink": "https://github.com/dev-x-mohit/stitch",
    "liveLink": "",
    "coverImage": "/portfolio_projects/stitch/banner.png",
    "type": "mobile",
    "stats": {
      "commits": 48,
      "stars": 1,
      "topLanguage": "TypeScript",
      "issues": 0
    },
    "features": [
      "Offline Demo Mode",
      "Mortgage EMI Calculator",
      "Favorites Management",
      "Booking System"
    ],
    "screenshots": [
      "/portfolio_projects/stitch/banner.png"
    ],
    "codeSnippet": "// Offline demo mode — auto-fallback\nconst isMockMode = !process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;\nconst [user, setUser] = useState<MockUser | null>(\n  isMockMode ? mockUser : null\n);",
    "learned": [
      "Expo Router v4 file-based navigation with nested tab and stack layouts",
      "NativeWind v4 integration with custom Tailwind theme tokens for luxury design",
      "expo-blur BlurView for frosted glassmorphic floating tab bar",
      "Appwrite SDK with React Native for auth, database, and file storage"
    ],
    "challenges": [
      "BlurView rendering differences between iOS, Android, and web — used fallback solid bg for web",
      "Custom font loading order caused FOUT on first launch — fixed with SplashScreen.preventAutoHideAsync",
      "NativeWind dynamic class generation for active tab indicator — used inline style fallback",
      "Mortgage calculator precision — used toFixed(2) and Math.pow for accurate amortization"
    ],
    "techEvolution": [
      "Started with default Expo template teal theme — pivoted to Midnight & Amber Gold luxury design",
      "Replaced all custom PNG icons with @expo/vector-icons for scalability and clarity",
      "Switched from Rubik to Plus Jakarta Sans for a more premium geometric feel",
      "Added full offline mock data layer after realizing portfolio reviewers won't have Appwrite credentials"
    ]
  },
  {
    "id": "proj-9",
    "title": "Cial Finance",
    "year": "2026",
    "category": "Frontend Projects",
    "summary": "A premium financial services landing page designed for corporate consulting and wealth management with executive minimalism.",
    "description": "# Cial Finance\n\n> **A premium financial services landing page designed for corporate consulting and wealth management with executive minimalism.**\n\nCial-Finance is a demo website designed for financial clients, providing them with an intuitive and user-friendly platform to explore financial services, investment plans, and other related offerings. The website focuses on delivering a professional and modern design with a seamless user experience.\n\n---\n\n## ✨ Key Highlights\n- **Professional UI**\n- **Responsive Design**\n- **Contact Form**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/dev-x-mohit/Cial-finance",
    "liveLink": "https://dev-x-mohit.github.io/Cial-finance/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612445/portfolio_projects/cover_proj-9.png",
    "type": "web",
    "stats": {
      "commits": 22,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Professional UI",
      "Responsive Design",
      "Contact Form"
    ],
    "codeSnippet": "// Smooth Scroll",
    "learned": [
      "CSS transitions and transforms for polished hover micro-interactions",
      "Semantic HTML structure for financial content (tables, figures, definitions)",
      "Contact form validation with inline error messaging using pure JS"
    ],
    "challenges": [
      "Client wanted both dark and light sections on the same page — used CSS custom properties to scope themes per section",
      "Form submission without backend — integrated Formspree for static form handling"
    ],
    "techEvolution": [
      "Started with Bootstrap grid, later hand-rolled layout for tighter visual control",
      "Added animated number counters for stats section after seeing it in competitor sites"
    ]
  },
  {
    "id": "proj-17",
    "title": "Karl Fashion",
    "year": "2026",
    "category": "Frontend Projects",
    "summary": "A luxury e-commerce experience for high-end apparel featuring interactive product zoom and premium retail UX.",
    "description": "# Karl Fashion\n\n> **A luxury e-commerce experience for high-end apparel featuring interactive product zoom and premium retail UX.**\n\nA luxury e-commerce experience for high-end apparel featuring interactive product zoom and premium retail UX.\n\n---\n\n## ✨ Key Highlights\n- **Category Navigation**\n- **Product Zoom**\n- **Shopping Cart Mockup**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/dev-x-mohit/karl",
    "liveLink": "https://dev-x-mohit.github.io/karl/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612513/portfolio_projects/cover_proj-17.png",
    "type": "web",
    "stats": {
      "commits": 25,
      "stars": 1,
      "topLanguage": "HTML",
      "issues": 0
    },
    "features": [
      "Category Navigation",
      "Product Zoom",
      "Shopping Cart Mockup"
    ],
    "codeSnippet": "// Product Zoom",
    "learned": [
      "CSS cursor and transform-origin for magnifying glass zoom effect on hover",
      "Shopping cart state management without a framework using module pattern",
      "CSS scroll snap for horizontal product category navigation"
    ],
    "challenges": [
      "Zoom effect showing outside product image bounds — fixed with overflow:hidden on wrapper",
      "Cart total not updating on quantity change — bug from stale closure in event listener"
    ],
    "techEvolution": [
      "Originally used a jQuery plugin for zoom — replaced with 20 lines of vanilla CSS/JS",
      "Added category navigation after feedback that all products mixed together was overwhelming"
    ]
  },
  {
    "id": "proj-18",
    "title": "Meranda Blog",
    "year": "2026",
    "category": "Frontend Projects",
    "summary": "A typography-first journalism platform optimized for readability, deep content exploration, and SEO dominance.",
    "description": "# Meranda Blog\n\n> **A typography-first journalism platform optimized for readability, deep content exploration, and SEO dominance.**\n\nA typography-first journalism platform optimized for readability, deep content exploration, and SEO dominance.\n\n---\n\n## ✨ Key Highlights\n- **Blog Layout**\n- **Related Posts**\n- **Comment Section UI**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/dev-x-mohit/meranda-master",
    "liveLink": "https://dev-x-mohit.github.io/meranda-master/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612519/portfolio_projects/cover_proj-18.png",
    "type": "web",
    "stats": {
      "commits": 20,
      "stars": 1,
      "topLanguage": "HTML",
      "issues": 0
    },
    "features": [
      "Blog Layout",
      "Related Posts",
      "Comment Section UI"
    ],
    "codeSnippet": "// Sticky Sidebar",
    "learned": [
      "CSS columns property for newspaper-style multi-column text layout",
      "Reading time estimation algorithm (words / 200 WPM)",
      "Sticky sidebar with scroll-aware active state using IntersectionObserver"
    ],
    "challenges": [
      "Sticky sidebar overlapping footer on short articles — added max-height with overflow-y",
      "Related posts section loading all post images — added lazy attribute for off-screen images"
    ],
    "techEvolution": [
      "Added reading time estimator after noticing all popular blogs have it",
      "Switched from absolute to sticky positioning for sidebar after scroll tracking got too complex"
    ]
  },
  {
    "id": "feat-2",
    "title": "NotemeNow",
    "year": "2025",
    "category": "Web Platforms",
    "summary": "A privacy-focused, local-first PWA note-taking app with real-time Firebase synchronization and offline capabilities.",
    "description": "# NotemeNow\n\n> **A privacy-focused, local-first PWA note-taking app with real-time Firebase synchronization and offline capabilities.**\n\nThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.\n\n---\n\n## ✨ Key Highlights\n- **Offline-First Architecture**\n- **Markdown Rendering**\n- **Cross-Device Sync**\n- **PWA Installability**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **React, Firebase, PWA, Vercel**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "React",
      "Firebase",
      "PWA",
      "Vercel"
    ],
    "accentColor": "#f59e0b",
    "githubLink": "https://github.com/dev-x-mohit/notes-app",
    "liveLink": "https://notemenow.vercel.app",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612374/portfolio_projects/cover_feat-2.png",
    "type": "web",
    "stats": {
      "commits": 89,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Offline-First Architecture",
      "Markdown Rendering",
      "Cross-Device Sync",
      "PWA Installability"
    ],
    "codeSnippet": "// Offline Sync Logic\nuseEffect(() => {\n  const unsubscribe = onSnapshot(collection(db, \"notes\"), \n    (snapshot) => {\n      const source = snapshot.metadata.hasPendingWrites ? \"Local\" : \"Server\";\n      console.log(\"Source: \", source);\n      setNotes(snapshot.docs.map(doc => doc.data()));\n    },\n    (error) => {\n      console.error(\"Sync failed: \", error);\n      loadFromLocalStorage();\n    }\n  );\n  return () => unsubscribe();\n}, []);",
    "learned": [
      "Firebase Firestore real-time listeners and snapshot metadata for pending writes",
      "PWA service workers — caching strategies (cache-first vs network-first)",
      "Conflict resolution when offline edits collide with server state",
      "Markdown rendering in React with sanitization to prevent XSS"
    ],
    "challenges": [
      "Offline edits conflicting with server writes on reconnect — used last-write-wins with timestamps",
      "Service worker cache invalidation after deployment — added cache versioning",
      "Firestore security rules too permissive in early builds — tightened with UID-based rules"
    ],
    "techEvolution": [
      "Switched from localStorage-only to Firebase for cross-device sync",
      "Added PWA manifest and service worker after users requested offline access",
      "Replaced custom markdown parser with marked.js for spec-compliant rendering"
    ]
  },
  {
    "id": "proj-22",
    "title": "Nubis Marketing",
    "year": "2025",
    "category": "Frontend Projects",
    "summary": "A data-driven agency landing page featuring influencer campaign metrics and conversion-engineered funnel UI.",
    "description": "# Nubis Marketing\n\n> **A data-driven agency landing page featuring influencer campaign metrics and conversion-engineered funnel UI.**\n\nA data-driven agency landing page featuring influencer campaign metrics and conversion-engineered funnel UI.\n\n---\n\n## ✨ Key Highlights\n- **Influencer Cards**\n- **Service Pricing**\n- **Hero Animation**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/dev-x-mohit/nubis",
    "liveLink": "https://dev-x-mohit.github.io/nubis/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612559/portfolio_projects/cover_proj-22.png",
    "type": "web",
    "stats": {
      "commits": 16,
      "stars": 1,
      "topLanguage": "HTML",
      "issues": 0
    },
    "features": [
      "Influencer Cards",
      "Service Pricing",
      "Hero Animation"
    ],
    "codeSnippet": "// Hero Parallax",
    "learned": [
      "CSS parallax scrolling using translateZ and perspective on the scroll container",
      "Pricing table with highlighted plan using CSS border and scale transform",
      "Intersection Observer for staggered card entrance animations"
    ],
    "challenges": [
      "Parallax effect causing horizontal scrollbar on some browsers — fixed with overflow-x:hidden on body",
      "Staggered animations all firing together — added nth-child delay via CSS custom property"
    ],
    "techEvolution": [
      "Added CSS parallax hero after initial static hero got negative feedback for looking dated",
      "Introduced animation-delay with nth-child selectors after all cards animating at once looked wrong"
    ]
  },
  {
    "id": "feat-3",
    "title": "SnapNews",
    "year": "2025",
    "category": "Frontend Projects",
    "summary": "A state-of-the-art news aggregator featuring SSR, infinite scrolling, and intelligent category filtering for global headlines.",
    "description": "# SnapNews\n\n> **A state-of-the-art news aggregator featuring SSR, infinite scrolling, and intelligent category filtering for global headlines.**\n\nThis project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\n\n---\n\n## ✨ Key Highlights\n- **Advanced Category Filtering**\n- **Infinite Scroll & Lazy Loading**\n- **Responsive Grid Layout**\n- **Dark Mode Support**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **Next.js, NewsAPI, Framer Motion**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "Next.js",
      "NewsAPI",
      "Framer Motion"
    ],
    "accentColor": "#ef4444",
    "githubLink": "https://github.com/dev-x-mohit/SnapNews",
    "liveLink": "https://snap-news-phi.vercel.app/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio_projects/cover_feat-3.png",
    "type": "web",
    "stats": {
      "commits": 56,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Advanced Category Filtering",
      "Infinite Scroll & Lazy Loading",
      "Responsive Grid Layout",
      "Dark Mode Support"
    ],
    "codeSnippet": "// Dynamic Article Filtering\nexport const getFilteredNews = async (category: string, query: string) => {\n  const params = new URLSearchParams({\n    apiKey: process.env.NEWS_API_KEY,\n    category,\n    q: query,\n    language: 'en'\n  });\n  \n  const res = await fetch(`https://newsapi.org/v2/top-headlines?${params}`);\n  if (!res.ok) throw new Error('Failed to fetch news');\n  return res.json();\n};",
    "learned": [
      "Next.js SSR with getServerSideProps for SEO-ready news pages",
      "Third-party REST API integration with rate limit handling",
      "Infinite scroll using IntersectionObserver without external libraries",
      "URL-based filter state to make searches shareable via link"
    ],
    "challenges": [
      "NewsAPI blocks browser requests in production — had to proxy via Next.js API routes",
      "Infinite scroll causing duplicate articles on rapid scroll — fixed with request deduplication",
      "Category filter and search query conflicting — added query param priority logic"
    ],
    "techEvolution": [
      "Replaced client-side fetch with Next.js API routes to hide API key and bypass CORS",
      "Added Framer Motion animations after initial page felt too static",
      "Upgraded from Pages Router to App Router partway through development"
    ]
  },
  {
    "id": "feat-5",
    "title": "CarBook",
    "year": "2025",
    "category": "Frontend Projects",
    "summary": "An elite automotive rental template with interactive 360° previews, a custom booking calendar, and modular SASS architecture.",
    "description": "# CarBook\n\n> **An elite automotive rental template with interactive 360° previews, a custom booking calendar, and modular SASS architecture.**\n\nAn elite automotive rental template with interactive 360° previews, a custom booking calendar, and modular SASS architecture.\n\n---\n\n## ✨ Key Highlights\n- **Dynamic Booking Calendar**\n- **Interactive Vehicle 360**\n- **Payment Gateway Mockup**\n- **Responsive Dashboard**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML5, SASS, Bootstrap, JS**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML5",
      "SASS",
      "Bootstrap",
      "JS"
    ],
    "accentColor": "#8b5cf6",
    "githubLink": "https://github.com/dev-x-mohit/CarBook",
    "liveLink": "https://dev-x-mohit.github.io/CarBook/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612402/portfolio_projects/cover_feat-5.png",
    "type": "web",
    "stats": {
      "commits": 45,
      "stars": 1,
      "topLanguage": "CSS",
      "issues": 0
    },
    "features": [
      "Dynamic Booking Calendar",
      "Interactive Vehicle 360",
      "Payment Gateway Mockup",
      "Responsive Dashboard"
    ],
    "codeSnippet": "/* Kinetic Hover Effect */\n.car-card:hover {\n  transform: translateY(-5px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(0,0,0,0.2);\n  \n  .card-img {\n    filter: grayscale(0%);\n    transform: scale(1.1);\n  }\n  \n  .book-btn {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}",
    "learned": [
      "SASS partials and modular CSS architecture for large stylesheet management",
      "CSS custom properties for runtime theming without JavaScript",
      "Pure CSS booking calendar without a date-picker library",
      "Bootstrap grid override patterns with custom SASS variables"
    ],
    "challenges": [
      "CSS specificity wars when overriding Bootstrap defaults — switched to SASS `!default` variables",
      "360° preview on mobile had touch drift issues — fixed with Hammer.js touch events",
      "Payment mockup needed to feel real without backend — used CSS transitions to simulate flow"
    ],
    "techEvolution": [
      "Moved from plain CSS to SASS after stylesheet grew beyond 800 lines",
      "Replaced Bootstrap JS components with custom CSS animations for smaller footprint",
      "Added CSS Grid for vehicle gallery after Flexbox couldn't achieve the masonry layout"
    ]
  },
  {
    "id": "proj-4",
    "title": "QRGenie",
    "year": "2025",
    "category": "Algorithms & Utilities",
    "summary": "A secure, client-side utility for creating highly customizable and branded QR codes with high-fidelity styling options.",
    "description": "# QRGenie\n\n> **A secure, client-side utility for creating highly customizable and branded QR codes with high-fidelity styling options.**\n\nQRGenie is an interactive web application that allows users to generate customizable QR codes directly from their browser. It provides options to input text or URLs, customize foreground and background colors, and download the generated QR code.\n\n---\n\n## ✨ Key Highlights\n- **Custom QR Generation**\n- **Color Customization**\n- **Instant Download**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS3, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS3",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/dev-x-mohit/QrGenie",
    "liveLink": "https://codepen.io/dev-x-mohit/full/XWLLNgz",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612409/portfolio_projects/cover_proj-4.png",
    "type": "web",
    "stats": {
      "commits": 12,
      "stars": 1,
      "topLanguage": "TypeScript",
      "issues": 0
    },
    "features": [
      "Custom QR Generation",
      "Color Customization",
      "Instant Download"
    ],
    "codeSnippet": "// QR Generation Logic",
    "learned": [
      "Canvas API for rendering and exporting QR codes as downloadable images",
      "qrcode.js library internals — error correction levels and module sizing",
      "Blob URL creation for in-browser file downloads without server"
    ],
    "challenges": [
      "Generated QR codes not scannable on some readers — increased quiet zone margin",
      "Download button triggered CORS errors on some browsers — switched to data URLs"
    ],
    "techEvolution": [
      "Started with a third-party QR API, replaced with client-side generation for privacy",
      "Added color customization after user feedback that default black was boring"
    ]
  },
  {
    "id": "feat-4",
    "title": "TxtXpert",
    "year": "2024",
    "category": "Algorithms & Utilities",
    "summary": "A purely client-side text analysis suite featuring sentiment scoring, readability auditing, and a regex debugging sandbox.",
    "description": "# TxtXpert\n\n> **A purely client-side text analysis suite featuring sentiment scoring, readability auditing, and a regex debugging sandbox.**\n\nThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.\n\n---\n\n## ✨ Key Highlights\n- **Sentiment Analysis Algo**\n- **Readability Scoring**\n- **Keyword Extraction**\n- **Regex Testing Sandbox**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **JavaScript, NLP.js, Regex**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "JavaScript",
      "NLP.js",
      "Regex"
    ],
    "accentColor": "#10b981",
    "githubLink": "https://github.com/dev-x-mohit/Txt-Xpert",
    "liveLink": "https://codepen.io/dev-x-mohit/full/mdNjKee",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio_projects/cover_feat-4.png",
    "type": "web",
    "stats": {
      "commits": 34,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Sentiment Analysis Algo",
      "Readability Scoring",
      "Keyword Extraction",
      "Regex Testing Sandbox"
    ],
    "codeSnippet": "// Sentiment Analysis Core\nfunction analyzeSentiment(text) {\n  const words = text.toLowerCase().match(/\bw+\b/g);\n  let score = 0;\n  words.forEach(word => {\n    if (positiveList.includes(word)) score += 1;\n    if (negativeList.includes(word)) score -= 1;\n  });\n  return {\n    score,\n    verdict: score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral'\n  };\n}",
    "learned": [
      "NLP fundamentals — tokenization, stemming, and lexicon-based sentiment scoring",
      "Regex patterns for complex text extraction and word boundary detection",
      "Flesch-Kincaid readability algorithm implementation from scratch",
      "Real-time DOM manipulation without React for performance-critical text analysis"
    ],
    "challenges": [
      "Sentiment scoring inaccurate for negations (e.g. 'not bad') — added bigram context window",
      "Performance lag on large text blocks — moved analysis to Web Worker",
      "Regex catastrophic backtracking on malformed input — rewrote patterns with possessive quantifiers"
    ],
    "techEvolution": [
      "Started with a simple word count tool, evolved into a full NLP suite",
      "Dropped NLP.js dependency in favour of hand-tuned lexicon for smaller bundle size",
      "Added Web Worker offloading after UI froze on 10k+ word inputs"
    ]
  },
  {
    "id": "proj-6",
    "title": "Typechecky",
    "year": "2024",
    "category": "Games",
    "summary": "A professional-grade typing speed diagnostic tool with real-time WPM calculation and byte-level accuracy tracking.",
    "description": "# Typechecky\n\n> **A professional-grade typing speed diagnostic tool with real-time WPM calculation and byte-level accuracy tracking.**\n\nWelcome to the Typing Speed Test! This web application allows you to test and improve your typing speed and accuracy with different levels of difficulty. It's an engaging way to practice typing by using stories at various difficulty levels, with customizable themes and more!\n\n---\n\n## ✨ Key Highlights\n- **WPM Calculation**\n- **Accuracy Tracking**\n- **Real-time Feedback**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/dev-x-mohit/Typecheckyy",
    "liveLink": "https://codepen.io/dev-x-mohit/full/BagvRZx",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612420/portfolio_projects/cover_proj-6.png",
    "type": "web",
    "stats": {
      "commits": 20,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "WPM Calculation",
      "Accuracy Tracking",
      "Real-time Feedback"
    ],
    "codeSnippet": "// WPM Calculation",
    "learned": [
      "Real-time keydown event handling and caret position tracking",
      "WPM formula — gross vs net WPM with accuracy penalty calculation",
      "Highlighted word-by-word error detection using char-level diff"
    ],
    "challenges": [
      "Copy-paste cheating — disabled clipboard events in test mode",
      "Different OSes reporting different key codes for special chars — normalized with e.key"
    ],
    "techEvolution": [
      "Added multiple difficulty levels after initial single-paragraph mode felt too limited",
      "Introduced custom themes after the default white background caused eye strain feedback"
    ]
  },
  {
    "id": "feat-12",
    "title": "OptiKit",
    "year": "2026",
    "category": "Algorithms & Utilities",
    "summary": "A zero-dependency, ultra-lightweight, and fully tree-shakeable JavaScript/TypeScript utility library featuring 17 hand-optimized core modules.",
    "description": "# OptiKit\n\n> **A zero-dependency, ultra-lightweight, and fully tree-shakeable JavaScript/TypeScript utility library.**\n\nAn isomorphic utility package built with TypeScript, featuring 17 core modules, complete ES Module/CommonJS build pipelines, and 100% unit testing coverage.\n\n---\n\n## ✨ Key Highlights\n- **100% Tree-Shakeable** (Declared side-effects free)\n- **Zero External Dependencies**\n- **17 Core Utility Modules**\n- **Full CJS / ESM support**\n",
    "techStack": [
      "TypeScript",
      "TSup",
      "Vitest",
      "NPM"
    ],
    "accentColor": "#A855F7",
    "githubLink": "https://github.com/dev-x-mohit/opti-kit",
    "liveLink": "https://opti-kit-showcase.vercel.app",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1784563747/portfolio_projects/optikit/banner.png",
    "type": "web",
    "stats": {
      "commits": 12,
      "stars": 3,
      "issues": 0,
      "topLanguage": "TypeScript"
    },
    "features": [
      "Tree-shaking",
      "Isomorphic SafeStorage",
      "Event Bus (EventEmitter)",
      "FNV-1a Hashing"
    ],
    "screenshots": [
      "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1784563747/portfolio_projects/optikit/banner.png",
      "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1784563748/portfolio_projects/optikit/modules_tab.png",
      "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1784563749/portfolio_projects/optikit/playground_tab.png",
      "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1784563750/portfolio_projects/optikit/overview_full.png"
    ],
    "codeSnippet": "// OptiKit: Custom Isomorphic safeStorage\nexport const safeStorage = {\n  getItem(key: string) {\n    if (typeof window === 'undefined') return null;\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : null;\n    } catch { return null; }\n  }\n};",
    "learned": [
      "Designing clean API boundaries for standalone distribution",
      "Optimizing bundler configurations for simultaneous CJS/ESM compilation",
      "Setting up comprehensive unit test suites with Vitest"
    ],
    "challenges": [
      "Ensuring isomorphic code compatibility preventing crash triggers under Server-Side Rendering (SSR) environments.",
      "Configuring typing export condition precedence so consumers resolve typings first."
    ],
    "techEvolution": [
      "Developed hand-crafted utilities to replace heavy lodash/ramda function bundles.",
      "Used TSup (esbuild-based compiler) to optimize final bundle sizes down to 38KB."
    ]
  }
];
