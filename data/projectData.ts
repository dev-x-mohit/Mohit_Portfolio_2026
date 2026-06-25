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

  // Structured dev insight fields
  learned?: string[];       // Key skills / concepts learned
  challenges?: string[];    // Problems faced and how solved
  techEvolution?: string[]; // Tech decisions, pivots, or changes made
}


export const projects: Project[] = [
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
    "githubLink": "https://github.com/mohitlakhara-ind/stitch",
    "liveLink": "",
    "coverImage": "/portfolio_projects/stitch/banner.png",
    "type": "mobile",
    "stats": {
      "commits": 48,
      "stars": 0,
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
    "githubLink": "https://github.com/mohitlakhara-ind/soloflow",
    "liveLink": "https://soloflow-invoice.vercel.app",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1781679012/portfolio_projects/soloflow/dashboard_dark.png",
    "type": "web",
    "stats": {
      "commits": 85,
      "stars": 0,
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
    "githubLink": "https://github.com/mohitlakhara-ind/splitsmart",
    "liveLink": "https://splitwiser-expense.vercel.app/",
    "coverImage": "/portfolio_projects/splitwiser/web_01_landing.png",
    "type": "both",
    "apkLink": "https://splitwiser-expense.vercel.app/splitsmart.apk",
    "stats": {
      "commits": 62,
      "stars": 0,
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
    "id": "feat-2",
    "title": "NotemeNow",
    "year": "2024",
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
    "githubLink": "https://github.com/mohitlakhara-ind/notes-app",
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
    "id": "feat-3",
    "title": "SnapNews",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A state-of-the-art news aggregator featuring SSR, infinite scrolling, and intelligent category filtering for global headlines.",
    "description": "# SnapNews\n\n> **A state-of-the-art news aggregator featuring SSR, infinite scrolling, and intelligent category filtering for global headlines.**\n\nThis project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\n\n---\n\n## ✨ Key Highlights\n- **Advanced Category Filtering**\n- **Infinite Scroll & Lazy Loading**\n- **Responsive Grid Layout**\n- **Dark Mode Support**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **Next.js, NewsAPI, Framer Motion**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "Next.js",
      "NewsAPI",
      "Framer Motion"
    ],
    "accentColor": "#ef4444",
    "githubLink": "https://github.com/mohitlakhara-ind/SnapNews",
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
    "id": "feat-4",
    "title": "TxtXpert",
    "year": "2023",
    "category": "Algorithms & Utilities",
    "summary": "A purely client-side text analysis suite featuring sentiment scoring, readability auditing, and a regex debugging sandbox.",
    "description": "# TxtXpert\n\n> **A purely client-side text analysis suite featuring sentiment scoring, readability auditing, and a regex debugging sandbox.**\n\nThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.\n\n---\n\n## ✨ Key Highlights\n- **Sentiment Analysis Algo**\n- **Readability Scoring**\n- **Keyword Extraction**\n- **Regex Testing Sandbox**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **JavaScript, NLP.js, Regex**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "JavaScript",
      "NLP.js",
      "Regex"
    ],
    "accentColor": "#10b981",
    "githubLink": "https://github.com/mohitlakhara-ind/Txt-Xpert",
    "liveLink": "https://codepen.io/mohitlakhara-ind/full/mdNjKee",
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
    "id": "feat-5",
    "title": "CarBook",
    "year": "2023",
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
    "githubLink": "https://github.com/mohitlakhara-ind/CarBook",
    "liveLink": "https://mohitlakhara-ind.github.io/CarBook/",
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
    "year": "2023",
    "category": "Algorithms & Utilities",
    "summary": "A secure, client-side utility for creating highly customizable and branded QR codes with high-fidelity styling options.",
    "description": "# QRGenie\n\n> **A secure, client-side utility for creating highly customizable and branded QR codes with high-fidelity styling options.**\n\nQRGenie is an interactive web application that allows users to generate customizable QR codes directly from their browser. It provides options to input text or URLs, customize foreground and background colors, and download the generated QR code.\n\n---\n\n## ✨ Key Highlights\n- **Custom QR Generation**\n- **Color Customization**\n- **Instant Download**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS3, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS3",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/QrGenie",
    "liveLink": "https://codepen.io/mohitlakhara-ind/full/XWLLNgz",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612409/portfolio_projects/cover_proj-4.png",
    "type": "web",
    "stats": {
      "commits": 12,
      "stars": 1,
      "topLanguage": "Unknown",
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
    "id": "proj-5",
    "title": "Memory Game",
    "year": "2023",
    "category": "Games",
    "summary": "An interactive brain-training game featuring complex state logic, smooth 3D flip animations, and dynamic difficulty scaling.",
    "description": "# Memory Game\n\n> **An interactive brain-training game featuring complex state logic, smooth 3D flip animations, and dynamic difficulty scaling.**\n\nAn interactive brain-training game featuring complex state logic, smooth 3D flip animations, and dynamic difficulty scaling.\n\n---\n\n## ✨ Key Highlights\n- **Level System**\n- **Timer Integration**\n- **Responsive Design**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/memorygame",
    "liveLink": "https://codepen.io/mohitlakhara-ind/full/abgPWVd",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612414/portfolio_projects/cover_proj-5.png",
    "type": "web",
    "stats": {
      "commits": 15,
      "stars": 1,
      "topLanguage": "Unknown",
      "issues": 0
    },
    "features": [
      "Level System",
      "Timer Integration",
      "Responsive Design"
    ],
    "codeSnippet": "// Card Matching Logic",
    "learned": [
      "JavaScript state machine for managing card flip, match, and reset phases",
      "CSS 3D transforms — perspective, rotateY, backface-visibility for card flips",
      "setTimeout-based animation sequencing without external animation libraries"
    ],
    "challenges": [
      "Double-click exploit allowing players to flip a third card — added a flip-lock flag",
      "Cards rendering in same order each game — fixed with Fisher-Yates shuffle"
    ],
    "techEvolution": [
      "First version had no difficulty levels — added card count scaling based on player score",
      "Replaced setTimeout with CSS animation events for more reliable timing"
    ]
  },
  {
    "id": "proj-6",
    "title": "Typechecky",
    "year": "2023",
    "category": "Games",
    "summary": "A professional-grade typing speed diagnostic tool with real-time WPM calculation and byte-level accuracy tracking.",
    "description": "# Typechecky\n\n> **A professional-grade typing speed diagnostic tool with real-time WPM calculation and byte-level accuracy tracking.**\n\nWelcome to the Typing Speed Test! This web application allows you to test and improve your typing speed and accuracy with different levels of difficulty. It's an engaging way to practice typing by using stories at various difficulty levels, with customizable themes and more!\n\n---\n\n## ✨ Key Highlights\n- **WPM Calculation**\n- **Accuracy Tracking**\n- **Real-time Feedback**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/Typecheckyy",
    "liveLink": "https://codepen.io/mohitlakhara-ind/full/BagvRZx",
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
    "id": "proj-7",
    "title": "Task Management App",
    "year": "2023",
    "category": "Frontend Projects",
    "summary": "A streamlined, mobile-first productivity dashboard with local persistence and high-performance DOM reconciliation.",
    "description": "# Task Management App\n\n> **A streamlined, mobile-first productivity dashboard with local persistence and high-performance DOM reconciliation.**\n\nA streamlined, mobile-first productivity dashboard with local persistence and high-performance DOM reconciliation.\n\n---\n\n## ✨ Key Highlights\n- **Task Filtering**\n- **Priority Management**\n- **LocalStorage Sync**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML5, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML5",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/project1",
    "liveLink": "https://codepen.io/mohitlakhara-ind/full/eYwbVga",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612424/portfolio_projects/cover_proj-7.png",
    "type": "web",
    "stats": {
      "commits": 18,
      "stars": 1,
      "topLanguage": "Unknown",
      "issues": 0
    },
    "features": [
      "Task Filtering",
      "Priority Management",
      "LocalStorage Sync"
    ],
    "codeSnippet": "// Task Filtering",
    "learned": [
      "localStorage as a lightweight persistence layer for client-side apps",
      "DOM reconciliation by hand — rendering only changed tasks for performance",
      "Drag-and-drop reordering using the HTML5 Drag API"
    ],
    "challenges": [
      "localStorage quota exceeded with large task lists — added size guard with LRU eviction",
      "Drag-and-drop felt janky on mobile — added touch event fallback"
    ],
    "techEvolution": [
      "First built in vanilla JS, refactored to use ES6 modules for cleaner structure",
      "Added priority sorting after realizing alphabetical order was not useful"
    ]
  },
  {
    "id": "proj-8",
    "title": "Anime Universe",
    "year": "2023",
    "category": "Frontend Projects",
    "summary": "A high-density discovery hub for anime enthusiasts featuring masonry layouts and interactive content discovery.",
    "description": "# Anime Universe\n\n> **A high-density discovery hub for anime enthusiasts featuring masonry layouts and interactive content discovery.**\n\n\u0000#\u0000 \u0000A\u0000n\u0000i\u0000m\u0000e\u0000 \u0000U\u0000n\u0000i\u0000v\u0000e\u0000r\u0000s\u0000e\u0000 \u0000-\u0000 \u0000A\u0000n\u0000i\u0000m\u0000e\u0000 \u0000C\u0000o\u0000m\u0000i\u0000c\u0000s\u0000 \u0000&\u0000 \u0000S\u0000h\u0000o\u0000w\u0000s\u0000 \u0000B\u0000l\u0000o\u0000g\u0000 \u0000L\u0000i\u0000s\u0000t\u0000i\u0000n\u0000g\u0000\r\u0000\n\n---\n\n## ✨ Key Highlights\n- **Responsive Grid**\n- **Hover Effects**\n- **Category Sorting**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/Anime-template",
    "liveLink": "https://mohitlakhara-ind.github.io/Anime-template/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612434/portfolio_projects/cover_proj-8.png",
    "type": "web",
    "stats": {
      "commits": 25,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Responsive Grid",
      "Hover Effects",
      "Category Sorting"
    ],
    "codeSnippet": "// Grid Layout",
    "learned": [
      "CSS Grid auto-fill and minmax for responsive masonry-like layouts",
      "Lazy image loading with IntersectionObserver for performance on media-heavy pages",
      "Category-based filtering using CSS class toggling without re-rendering DOM"
    ],
    "challenges": [
      "Image aspect ratios causing grid row height inconsistencies — fixed with object-fit",
      "Filter animation felt abrupt — added CSS transition with display:none workaround"
    ],
    "techEvolution": [
      "Replaced static HTML cards with JS-rendered template literals for easier content updates",
      "Added dark mode toggle after getting feedback the white background was too bright"
    ]
  },
  {
    "id": "proj-9",
    "title": "Cial Finance",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A premium financial services landing page designed for corporate consulting and wealth management with executive minimalism.",
    "description": "# Cial Finance\n\n> **A premium financial services landing page designed for corporate consulting and wealth management with executive minimalism.**\n\nCial-Finance is a demo website designed for financial clients, providing them with an intuitive and user-friendly platform to explore financial services, investment plans, and other related offerings. The website focuses on delivering a professional and modern design with a seamless user experience.\n\n---\n\n## ✨ Key Highlights\n- **Professional UI**\n- **Responsive Design**\n- **Contact Form**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/Cial-finance",
    "liveLink": "https://mohitlakhara-ind.github.io/Cial-finance/",
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
    "id": "proj-10",
    "title": "Coffee Master",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A visual-first digital café experience featuring artisanal branding, interactive menus, and smooth transition animations.",
    "description": "# Coffee Master\n\n> **A visual-first digital café experience featuring artisanal branding, interactive menus, and smooth transition animations.**\n\nA visual-first digital café experience featuring artisanal branding, interactive menus, and smooth transition animations.\n\n---\n\n## ✨ Key Highlights\n- **Interactive Menu**\n- **Gallery Section**\n- **Blog integration**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/coffee-master",
    "liveLink": "https://mohitlakhara-ind.github.io/coffee-master/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1773761879/portfolio_projects/cover_proj-10.png",
    "type": "web",
    "stats": {
      "commits": 30,
      "stars": 1,
      "topLanguage": "SCSS",
      "issues": 0
    },
    "features": [
      "Interactive Menu",
      "Gallery Section",
      "Blog integration"
    ],
    "codeSnippet": "// Menu Interaction",
    "learned": [
      "SCSS mixin patterns for consistent spacing and typography scales",
      "CSS sticky positioning for the menu bar without JavaScript",
      "Smooth section transitions using scroll-behavior and anchor links"
    ],
    "challenges": [
      "Sticky nav covering anchor targets — fixed with scroll-margin-top",
      "Gallery images loading slowly — added progressive loading with blur-up technique"
    ],
    "techEvolution": [
      "Added a blog section mid-project after client requested content marketing capability",
      "Switched from JPG to WebP for gallery images reducing load time by 40%"
    ]
  },
  {
    "id": "proj-12",
    "title": "Famms Ecommerce",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A sophisticated fashion storefront showcasing high-conversion UX architecture and premium minimalist design.",
    "description": "# Famms Ecommerce\n\n> **A sophisticated fashion storefront showcasing high-conversion UX architecture and premium minimalist design.**\n\nA sophisticated fashion storefront showcasing high-conversion UX architecture and premium minimalist design.\n\n---\n\n## ✨ Key Highlights\n- **Product Carousel**\n- **Cart UI**\n- **Newsletter Signup**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, SCSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "SCSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/Famms-temp",
    "liveLink": "https://mohitlakhara-ind.github.io/Famms-temp/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1773764371/portfolio_projects/Famms.png",
    "type": "web",
    "stats": {
      "commits": 40,
      "stars": 1,
      "topLanguage": "HTML",
      "issues": 0
    },
    "features": [
      "Product Carousel",
      "Cart UI",
      "Newsletter Signup"
    ],
    "codeSnippet": "// Carousel Logic",
    "learned": [
      "Touch-swipe carousel built from scratch using pointer events",
      "CSS clip-path and mask for editorial product card shapes",
      "Newsletter form integration with Mailchimp embed API"
    ],
    "challenges": [
      "Carousel autoplay conflicting with manual swipe — paused on touch start",
      "SCSS nesting got too deep causing specificity issues — flattened to BEM convention"
    ],
    "techEvolution": [
      "Replaced slick.js carousel with custom CSS scroll snap for zero JS dependency",
      "Added SCSS architecture split (variables, mixins, components) after single-file approach got messy"
    ]
  },
  {
    "id": "proj-13",
    "title": "Game Warrior",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A technical dashboard for e-sports intelligence featuring tournament brackets, news feeds, and community modules.",
    "description": "# Game Warrior\n\n> **A technical dashboard for e-sports intelligence featuring tournament brackets, news feeds, and community modules.**\n\nA technical dashboard for e-sports intelligence featuring tournament brackets, news feeds, and community modules.\n\n---\n\n## ✨ Key Highlights\n- **Tournament Brackets**\n- **Review Section**\n- **Blog Layout**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/game-warrior-temp",
    "liveLink": "https://mohitlakhara-ind.github.io/game-warrior-temp/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612475/portfolio_projects/cover_proj-13.png",
    "type": "web",
    "stats": {
      "commits": 35,
      "stars": 1,
      "topLanguage": "HTML",
      "issues": 0
    },
    "features": [
      "Tournament Brackets",
      "Review Section",
      "Blog Layout"
    ],
    "codeSnippet": "// Tab Switching",
    "learned": [
      "Bracket tree data structure rendered as nested HTML for tournament display",
      "CSS grid for complex asymmetric dashboard layouts",
      "Tab switching UI pattern with ARIA roles for accessibility"
    ],
    "challenges": [
      "Tournament bracket lines connecting winners were tricky to draw in pure CSS — used pseudo-elements",
      "Responsive layout for brackets broke on mobile — switched to horizontal scroll for small screens"
    ],
    "techEvolution": [
      "Added news feed section after initial static version lacked dynamic content feel",
      "Introduced CSS custom properties for the dark esports theme after inline styles became unmaintainable"
    ]
  },
  {
    "id": "proj-14",
    "title": "Coder School",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "An educational landing page for technology training featuring granular course catalogs and conversion-driven UI.",
    "description": "# Coder School\n\n> **An educational landing page for technology training featuring granular course catalogs and conversion-driven UI.**\n\nAn educational landing page for technology training featuring granular course catalogs and conversion-driven UI.\n\n---\n\n## ✨ Key Highlights\n- **Course Catalog**\n- **Registration Form**\n- **Virtual Classroom UI**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, Bootstrap**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "Bootstrap"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/grad-school-temp",
    "liveLink": "https://mohitlakhara-ind.github.io/grad-school-temp/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612484/portfolio_projects/cover_proj-14.png",
    "type": "web",
    "stats": {
      "commits": 20,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Course Catalog",
      "Registration Form",
      "Virtual Classroom UI"
    ],
    "codeSnippet": "// Form Validation",
    "learned": [
      "Bootstrap 5 component system — cards, accordions, modals without custom JS",
      "HTML5 constraint validation API for native form error messages",
      "CSS counter and pseudo-elements for step-indicator UI"
    ],
    "challenges": [
      "Bootstrap accordion conflicting with custom styles — used CSS specificity override",
      "Course catalog with many items caused long page scroll — added sticky filter sidebar"
    ],
    "techEvolution": [
      "Originally planned React but chose pure HTML/Bootstrap to meet quick deadline",
      "Added registration form validation after initial version had no client-side checks"
    ]
  },
  {
    "id": "proj-15",
    "title": "Growing Finance",
    "year": "2025",
    "category": "Frontend Projects",
    "summary": "A professional foundation for wealth architecture featuring investment calculators and high-impact service showcases.",
    "description": "# Growing Finance\n\n> **A professional foundation for wealth architecture featuring investment calculators and high-impact service showcases.**\n\nA professional foundation for wealth architecture featuring investment calculators and high-impact service showcases.\n\n---\n\n## ✨ Key Highlights\n- **Service Showcase**\n- **Client Testimonials**\n- **Investment Calculator UI**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/growing-temp",
    "liveLink": "https://mohitlakhara-ind.github.io/growing-temp/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612494/portfolio_projects/cover_proj-15.png",
    "type": "web",
    "stats": {
      "commits": 15,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Service Showcase",
      "Client Testimonials",
      "Investment Calculator UI"
    ],
    "codeSnippet": "// Smooth Scroll",
    "learned": [
      "CSS counter animations triggered by IntersectionObserver for stats sections",
      "Investment calculator logic built with vanilla JS event-driven architecture",
      "Responsive hero section using viewport units and clamp() for fluid typography"
    ],
    "challenges": [
      "Calculator results not updating on slider input in real time — switched from change to input event",
      "Hero image causing layout shift on load — added explicit aspect-ratio CSS"
    ],
    "techEvolution": [
      "Added investment calculator after initial landing page felt too brochure-like",
      "Switched from fixed px font sizes to clamp() for better scaling across screen sizes"
    ]
  },
  {
    "id": "proj-16",
    "title": "Hightech Agency",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A modern portfolio template for software firms featuring filterable project grids and high-fidelity agency branding.",
    "description": "# Hightech Agency\n\n> **A modern portfolio template for software firms featuring filterable project grids and high-fidelity agency branding.**\n\nA modern portfolio template for software firms featuring filterable project grids and high-fidelity agency branding.\n\n---\n\n## ✨ Key Highlights\n- **Portfolio Grid**\n- **Service Icons**\n- **Team Section**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/Hightech-template",
    "liveLink": "https://mohitlakhara-ind.github.io/Hightech-template/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612503/portfolio_projects/cover_proj-16.png",
    "type": "web",
    "stats": {
      "commits": 18,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Portfolio Grid",
      "Service Icons",
      "Team Section"
    ],
    "codeSnippet": "// Gallery Filter",
    "learned": [
      "Isotope.js-style filter animations using CSS transition + display toggle",
      "CSS custom property theming for white-label template approach",
      "Team section with hover-reveal bio using CSS overflow and max-height transition"
    ],
    "challenges": [
      "Filter transition leaving ghost elements — fixed with position absolute during animation",
      "Team photos different aspect ratios — enforced consistent crop with CSS object-position"
    ],
    "techEvolution": [
      "Removed jQuery dependency mid-project in favour of vanilla JS querySelector",
      "Refactored inline SVG icons to an icon sprite for smaller HTTP footprint"
    ]
  },
  {
    "id": "proj-17",
    "title": "Karl Fashion",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A luxury e-commerce experience for high-end apparel featuring interactive product zoom and premium retail UX.",
    "description": "# Karl Fashion\n\n> **A luxury e-commerce experience for high-end apparel featuring interactive product zoom and premium retail UX.**\n\nA luxury e-commerce experience for high-end apparel featuring interactive product zoom and premium retail UX.\n\n---\n\n## ✨ Key Highlights\n- **Category Navigation**\n- **Product Zoom**\n- **Shopping Cart Mockup**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/karl",
    "liveLink": "https://mohitlakhara-ind.github.io/karl/",
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
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A typography-first journalism platform optimized for readability, deep content exploration, and SEO dominance.",
    "description": "# Meranda Blog\n\n> **A typography-first journalism platform optimized for readability, deep content exploration, and SEO dominance.**\n\nA typography-first journalism platform optimized for readability, deep content exploration, and SEO dominance.\n\n---\n\n## ✨ Key Highlights\n- **Blog Layout**\n- **Related Posts**\n- **Comment Section UI**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/meranda-master",
    "liveLink": "https://mohitlakhara-ind.github.io/meranda-master/",
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
    "id": "proj-19",
    "title": "Mexant Business",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "An authoritative fintech and consulting portal featuring crypto ticker mockups and global reach visualization.",
    "description": "# Mexant Business\n\n> **An authoritative fintech and consulting portal featuring crypto ticker mockups and global reach visualization.**\n\nAn authoritative fintech and consulting portal featuring crypto ticker mockups and global reach visualization.\n\n---\n\n## ✨ Key Highlights\n- **Crypto Ticker Mockup**\n- **Service Cards**\n- **Contact Map**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, Bootstrap 5, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "Bootstrap 5",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/mexant-temp",
    "liveLink": "https://mohitlakhara-ind.github.io/mexant-temp/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612531/portfolio_projects/cover_proj-19.png",
    "type": "web",
    "stats": {
      "commits": 22,
      "stars": 1,
      "topLanguage": "JavaScript",
      "issues": 0
    },
    "features": [
      "Crypto Ticker Mockup",
      "Service Cards",
      "Contact Map"
    ],
    "codeSnippet": "// Map Integration",
    "learned": [
      "Bootstrap 5 navbar with responsive collapse and custom color overrides",
      "CSS ticker animation using marquee-style CSS keyframe for news-style scrolling",
      "Leaflet.js map embed for office location display without Google Maps API key"
    ],
    "challenges": [
      "Crypto ticker causing reflow on every animation frame — fixed with CSS transform instead of left property",
      "Leaflet map z-index conflicting with sticky navbar — set explicit z-index layers"
    ],
    "techEvolution": [
      "Replaced Google Maps embed with Leaflet for zero API key requirement",
      "Added Bootstrap 5 after Bootstrap 4 components caused compatibility issues"
    ]
  },
  {
    "id": "proj-20",
    "title": "Mosaic Architecture",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "An elite digital portfolio for design pioneers featuring grand-scale galleries and technical design precision.",
    "description": "# Mosaic Architecture\n\n> **An elite digital portfolio for design pioneers featuring grand-scale galleries and technical design precision.**\n\nAn elite digital portfolio for design pioneers featuring grand-scale galleries and technical design precision.\n\n---\n\n## ✨ Key Highlights\n- **Project Gallery**\n- **Architect Profiles**\n- **Testimonial Slider**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/mosaic-temp",
    "liveLink": "https://mohitlakhara-ind.github.io/mosaic-temp/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612540/portfolio_projects/cover_proj-20.png",
    "type": "web",
    "stats": {
      "commits": 15,
      "stars": 1,
      "topLanguage": "CSS",
      "issues": 0
    },
    "features": [
      "Project Gallery",
      "Architect Profiles",
      "Testimonial Slider"
    ],
    "codeSnippet": "// Slider Logic",
    "learned": [
      "CSS masonry grid simulation using CSS columns and break-inside:avoid",
      "Testimonial slider auto-play with pause-on-hover using CSS animation-play-state",
      "Lazy loading architect profile images with IntersectionObserver"
    ],
    "challenges": [
      "Masonry layout breaking on Safari — fell back to CSS Grid with row span hacks",
      "Slider dots not syncing with auto-play timing — rewrote with setInterval + active class toggle"
    ],
    "techEvolution": [
      "Switched from Slick.js to custom CSS scroll snap after jQuery dependency felt heavy",
      "Added CSS custom properties for the stone/neutral color palette after client rebranding"
    ]
  },
  {
    "id": "proj-21",
    "title": "NewsBox",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A high-velocity intelligence hub for digital publishers featuring breaking news tickers and multi-modal reporting.",
    "description": "# NewsBox\n\n> **A high-velocity intelligence hub for digital publishers featuring breaking news tickers and multi-modal reporting.**\n\nA high-velocity intelligence hub for digital publishers featuring breaking news tickers and multi-modal reporting.\n\n---\n\n## ✨ Key Highlights\n- **Breaking News Ticker**\n- **Video Gallery**\n- **Category Tabs**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/newsbox-temp",
    "liveLink": "https://mohitlakhara-ind.github.io/newsbox-temp/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612550/portfolio_projects/cover_proj-21.png",
    "type": "web",
    "stats": {
      "commits": 18,
      "stars": 1,
      "topLanguage": "HTML",
      "issues": 0
    },
    "features": [
      "Breaking News Ticker",
      "Video Gallery",
      "Category Tabs"
    ],
    "codeSnippet": "// Ticker Animation",
    "learned": [
      "Breaking news ticker using CSS keyframe animation with seamless loop",
      "CSS grid and flexbox hybrid layout for news magazine multi-column design",
      "Video gallery with custom controls using the HTML5 Video API"
    ],
    "challenges": [
      "Ticker animation flickering at the loop point — fixed by doubling the content and adjusting translateX distance",
      "Video autoplay blocked by browsers — added muted + playsinline attributes"
    ],
    "techEvolution": [
      "Replaced jQuery tabs with CSS-only radio button hack for zero-JS tab switching",
      "Added video gallery section as second phase after initial text-only version"
    ]
  },
  {
    "id": "proj-22",
    "title": "Nubis Marketing",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A data-driven agency landing page featuring influencer campaign metrics and conversion-engineered funnel UI.",
    "description": "# Nubis Marketing\n\n> **A data-driven agency landing page featuring influencer campaign metrics and conversion-engineered funnel UI.**\n\nA data-driven agency landing page featuring influencer campaign metrics and conversion-engineered funnel UI.\n\n---\n\n## ✨ Key Highlights\n- **Influencer Cards**\n- **Service Pricing**\n- **Hero Animation**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/nubis",
    "liveLink": "https://mohitlakhara-ind.github.io/nubis/",
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
    "id": "proj-23",
    "title": "Podcast Pro",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A professional broadcasting hub featuring integrated audio players, episode management, and listener engagement tools.",
    "description": "# Podcast Pro\n\n> **A professional broadcasting hub featuring integrated audio players, episode management, and listener engagement tools.**\n\nA professional broadcasting hub featuring integrated audio players, episode management, and listener engagement tools.\n\n---\n\n## ✨ Key Highlights\n- **Audio Player UI**\n- **Episode List**\n- **Subscription Form**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, Bootstrap, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "Bootstrap",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/podcast-template",
    "liveLink": "https://mohitlakhara-ind.github.io/podcast-template/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612564/portfolio_projects/cover_proj-23.png",
    "type": "web",
    "stats": {
      "commits": 20,
      "stars": 1,
      "topLanguage": "HTML",
      "issues": 0
    },
    "features": [
      "Audio Player UI",
      "Episode List",
      "Subscription Form"
    ],
    "codeSnippet": "// Audio Player",
    "learned": [
      "HTML5 Audio API — play, pause, seek, and duration tracking with custom UI",
      "CSS progress bar synced to audio currentTime with requestAnimationFrame",
      "Episode list with expandable show notes using CSS max-height transition"
    ],
    "challenges": [
      "Audio progress bar jerking due to re-render on every tick — debounced state updates with rAF",
      "Mobile Safari blocking audio autoplay — added explicit user gesture listener"
    ],
    "techEvolution": [
      "Replaced browser default audio controls with fully custom UI for brand consistency",
      "Added subscription form after realising audience retention was a missing feature"
    ]
  },
  {
    "id": "proj-24",
    "title": "Shooe Store",
    "year": "2024",
    "category": "Frontend Projects",
    "summary": "A high-octane footwear retail template featuring quick-view modals and mobile-optimized purchase paths.",
    "description": "# Shooe Store\n\n> **A high-octane footwear retail template featuring quick-view modals and mobile-optimized purchase paths.**\n\nA high-octane footwear retail template featuring quick-view modals and mobile-optimized purchase paths.\n\n---\n\n## ✨ Key Highlights\n- **Product Quick View**\n- **Filter by Size**\n- **Cart Dropdown**\n\n### 🛠️ Architecture & Tech Stack\nBuilt leveraging **HTML, CSS, JavaScript**, engineered for high performance and responsive user experience.\n",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/shooe-website-template",
    "liveLink": "https://mohitlakhara-ind.github.io/shooe-website-template/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612572/portfolio_projects/cover_proj-24.png",
    "type": "web",
    "stats": {
      "commits": 30,
      "stars": 1,
      "topLanguage": "HTML",
      "issues": 0
    },
    "features": [
      "Product Quick View",
      "Filter by Size",
      "Cart Dropdown"
    ],
    "codeSnippet": "// Quick View Modal",
    "learned": [
      "CSS focus-trap for modal accessibility — keeping keyboard focus within overlay",
      "Size filter with data attributes for pure-CSS conditional visibility",
      "Cart dropdown state managed with a single checkbox hack (no JS)"
    ],
    "challenges": [
      "Quick view modal not accessible via keyboard — added tabindex and focus management",
      "Cart dropdown closing on any click including inside — fixed with stopPropagation on inner elements"
    ],
    "techEvolution": [
      "Replaced JavaScript modal with CSS :target pseudo-class approach for simplicity",
      "Added size filter after getting user feedback that browsing all products at once was overwhelming"
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
    "githubLink": "https://github.com/mohitlakhara-ind/nexus",
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
  }
];
