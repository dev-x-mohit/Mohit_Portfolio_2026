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
}

export const projects: Project[] = [
  {
    "id": "feat-10",
    "title": "Soloflow",
    "year": "2026",
    "category": "Web Platforms",
    "summary": "An AI-powered freelancer client portal and billing SaaS with Razorpay integration and GPT-4o proposal generation.",
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
      "Razorpay Payments",
      "Time Tracking",
      "Client Portal"
    ],
    "codeSnippet": "// AI Proposal Generation\nconst response = await openai.chat.completions.create({\n  model: \"gpt-4o\",\n  messages: [{ role: \"user\", content: prompt }],\n  stream: true,\n});"
  },
  {
    "id": "feat-9",
    "title": "Splitwiser",
    "year": "2026",
    "category": "Web & Mobile Apps",
    "summary": "AI-powered multi-platform expense splitter with receipt OCR, Splitwise OAuth migration, and graph-based debt simplification.",
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
      "React 19 Web App & Expo Mobile",
      "Splitwise OAuth Data Import",
      "OCR Receipt Auto-Parsing",
      "Debt Minimization Graph"
    ],
    "screenshots": [
      "/portfolio_projects/splitwiser/web_01_landing.png",
      "/portfolio_projects/splitwiser/web_03_dashboard.png",
      "/portfolio_projects/splitwiser/app_02_home.png",
      "/portfolio_projects/splitwiser/app_03_groups.png",
      "/portfolio_projects/splitwiser/web_05_groups.png"
    ],
    "codeSnippet": "// Express API route for receipt OCR parsing\nrouter.post('/ocr', upload.single('file'), async (req, res) => {\n  const result = await ocrService.parseReceipt(req.file.buffer);\n  res.json({ merchant: result.merchant, total: result.total, items: result.items });\n});"
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
    "codeSnippet": "// Offline Sync Logic\nuseEffect(() => {\n  const unsubscribe = onSnapshot(collection(db, \"notes\"), \n    (snapshot) => {\n      const source = snapshot.metadata.hasPendingWrites ? \"Local\" : \"Server\";\n      console.log(\"Source: \", source);\n      setNotes(snapshot.docs.map(doc => doc.data()));\n    },\n    (error) => {\n      console.error(\"Sync failed: \", error);\n      loadFromLocalStorage();\n    }\n  );\n  return () => unsubscribe();\n}, []);"
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
    "codeSnippet": "// Dynamic Article Filtering\nexport const getFilteredNews = async (category: string, query: string) => {\n  const params = new URLSearchParams({\n    apiKey: process.env.NEWS_API_KEY,\n    category,\n    q: query,\n    language: 'en'\n  });\n  \n  const res = await fetch(`https://newsapi.org/v2/top-headlines?${params}`);\n  if (!res.ok) throw new Error('Failed to fetch news');\n  return res.json();\n};"
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
    "codeSnippet": "// Sentiment Analysis Core\nfunction analyzeSentiment(text) {\n  const words = text.toLowerCase().match(/\bw+\b/g);\n  let score = 0;\n  words.forEach(word => {\n    if (positiveList.includes(word)) score += 1;\n    if (negativeList.includes(word)) score -= 1;\n  });\n  return {\n    score,\n    verdict: score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral'\n  };\n}"
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
    "codeSnippet": "/* Kinetic Hover Effect */\n.car-card:hover {\n  transform: translateY(-5px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(0,0,0,0.2);\n  \n  .card-img {\n    filter: grayscale(0%);\n    transform: scale(1.1);\n  }\n  \n  .book-btn {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}"
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
    "codeSnippet": "// QR Generation Logic"
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
    "codeSnippet": "// Card Matching Logic"
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
    "codeSnippet": "// WPM Calculation"
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
    "codeSnippet": "// Task Filtering"
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
    "codeSnippet": "// Grid Layout"
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
    "codeSnippet": "// Smooth Scroll"
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
    "codeSnippet": "// Menu Interaction"
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
    "codeSnippet": "// Carousel Logic"
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
    "codeSnippet": "// Tab Switching"
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
    "codeSnippet": "// Form Validation"
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
    "codeSnippet": "// Smooth Scroll"
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
    "codeSnippet": "// Gallery Filter"
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
    "codeSnippet": "// Product Zoom"
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
    "codeSnippet": "// Sticky Sidebar"
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
    "codeSnippet": "// Map Integration"
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
    "codeSnippet": "// Slider Logic"
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
    "codeSnippet": "// Ticker Animation"
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
    "codeSnippet": "// Hero Parallax"
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
    "codeSnippet": "// Audio Player"
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
    "codeSnippet": "// Quick View Modal"
  },
  {
    "id": "feat-6",
    "title": "Nexus",
    "year": "2026",
    "category": "Web Platforms",
    "summary": "A next-generation collaborative mind-mapping platform powered by React 19, React Flow, and Gemini AI integration.",
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
      "Infinite Visual Canvas",
      "Real-time Collaboration",
      "AI Idea Expansion",
      "Command Palette Control"
    ],
    "codeSnippet": "// AI Collaborative Brainstorming Core\nconst handleAiChat = async (prompt) => {\n  setIsAiThinking(true);\n  try {\n    const res = await axios.post(`${API_BASE_URL}/ai/chat`, {\n      prompt,\n      mapContext: { nodes, edges },\n      graphId: id\n    });\n    const aiResponse = { role: 'model', content: res.data.text };\n    setAiMessages(prev => [...prev, aiResponse]);\n    if (res.data.suggestions) applyAiSuggestions(res.data.suggestions);\n  } finally {\n    setIsAiThinking(false);\n  }\n};"
  }
];
