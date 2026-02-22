export interface Project {
  id: string;
  title: string;
  year: string;
  category: 'Mobile-Apps' | 'Web-Platforms' | 'UI-UX' | 'Algorithms';
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
  type: 'web' | 'mobile';
  features: string[];
}

export const projects: Project[] = [
  {
    "id": "feat-1",
    "title": "Ekovym",
    "year": "2025",
    "category": "Web-Platforms",
    "description": "A high-performance workspace for modern developers with real-time collaboration. Ekovym redefines the coding environment with a browser-based IDE that feels native.",
    "techStack": [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Framer Motion"
    ],
    "accentColor": "#6366f1",
    "githubLink": "https://github.com/mohitlakhara-ind/Ekovym-New",
    "liveLink": "https://ekovym.vercel.app/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612364/portfolio_projects/cover_feat-1.png",
    "type": "web",
    "stats": {
      "commits": 142,
      "stars": 28,
      "topLanguage": "TypeScript",
      "issues": 3
    },
    "features": [
      "Real-time Collaboration Engine",
      "Integrated Terminal Emulation",
      "Glassmorphism UI Design",
      "Cloud-based File System"
    ],
    "codeSnippet": "// Interactive Terminal Emulation Hook\nconst useTerminal = (command: string) => {\n  const [history, setHistory] = useState<string[]>([]);\n  \n  const execute = async (cmd: string) => {\n    setHistory(prev => [...prev, `$ ${cmd}`]);\n    try {\n      const res = await processCommand(cmd);\n      setHistory(prev => [...prev, res]);\n    } catch (err) {\n      setHistory(prev => [...prev, `Error: ${err.message}`]);\n    }\n  };\n\n  return { history, execute };\n};"
  },
  {
    "id": "feat-2",
    "title": "NotemeNow",
    "year": "2024",
    "category": "Mobile-Apps",
    "description": "This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules....",
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
    "type": "mobile",
    "stats": {
      "commits": 89,
      "stars": 15,
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
    "category": "Web-Platforms",
    "description": "This project was bootstrapped with Create React Apphttps://github.com/facebook/create-react-app....",
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
      "stars": 12,
      "topLanguage": "TypeScript",
      "issues": 1
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
    "category": "Algorithms",
    "description": "This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules....",
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
      "stars": 8,
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
    "category": "UI-UX",
    "description": "Rental experience template with dynamic booking interfaces. Focuses on the user journey from browsing to checkout with micro-interactions.",
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
      "stars": 10,
      "topLanguage": "CSS",
      "issues": 2
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
    "category": "Web-Platforms",
    "description": "QRGenie is an interactive web application that allows users to generate customizable QR codes directly from their browser. It provides options to inpu...",
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
      "stars": 3,
      "topLanguage": "JavaScript",
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
    "category": "Algorithms",
    "description": "Interactive card-matching game with customizable emoji sizes, levels, and themes.",
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
      "stars": 4,
      "topLanguage": "JavaScript",
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
    "category": "Algorithms",
    "description": "<h1>Typecheckyy: Typing Speed Test</h1>...",
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
      "stars": 5,
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
    "category": "Web-Platforms",
    "description": "Stylish task management app with features for adding, deleting, and filtering tasks by priority.",
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
      "stars": 2,
      "topLanguage": "JavaScript",
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
    "category": "UI-UX",
    "description": "Anime Universe - Anime Comics & Shows Blog Listing.",
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
      "stars": 6,
      "topLanguage": "CSS",
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
    "category": "UI-UX",
    "description": "Cial-Finance is a demo website designed for financial clients, providing them with an intuitive and user-friendly platform to explore financial servic...",
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
      "stars": 3,
      "topLanguage": "HTML",
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
    "category": "UI-UX",
    "description": "��\u0000 \u0000c\u0000o\u0000f\u0000f\u0000e\u0000e\u0000-\u0000m\u0000a\u0000s\u0000t\u0000e\u0000r\u0000\r\u0000...",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/coffee-master",
    "liveLink": "https://mohitlakhara-ind.github.io/coffee-master/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612455/portfolio_projects/cover_proj-10.png",
    "type": "web",
    "stats": {
      "commits": 30,
      "stars": 7,
      "topLanguage": "CSS",
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
    "category": "Web-Platforms",
    "description": "��\u0000 \u0000F\u0000a\u0000m\u0000m\u0000s\u0000-\u0000t\u0000e\u0000m\u0000p\u0000\r\u0000...",
    "techStack": [
      "HTML",
      "CSS",
      "SCSS",
      "JavaScript"
    ],
    "accentColor": "#3B82F6",
    "githubLink": "https://github.com/mohitlakhara-ind/Famms-temp",
    "liveLink": "https://mohitlakhara-ind.github.io/Famms-temp/",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612466/portfolio_projects/cover_proj-12.png",
    "type": "web",
    "stats": {
      "commits": 40,
      "stars": 8,
      "topLanguage": "SCSS",
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
    "category": "UI-UX",
    "description": "Gaming website template with sections for news, reviews, recent games, tournaments, and blogs.",
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
      "stars": 9,
      "topLanguage": "CSS",
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
    "category": "Web-Platforms",
    "description": "��\u0000 \u0000g\u0000r\u0000a\u0000d\u0000-\u0000s\u0000c\u0000h\u0000o\u0000o\u0000l\u0000-\u0000t\u0000e\u0000m\u0000p\u0000\r\u0000...",
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
      "stars": 4,
      "topLanguage": "HTML",
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
    "category": "UI-UX",
    "description": "��\u0000 \u0000g\u0000r\u0000o\u0000w\u0000i\u0000n\u0000g\u0000-\u0000t\u0000e\u0000m\u0000p\u0000\r\u0000...",
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
      "stars": 2,
      "topLanguage": "CSS",
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
    "category": "UI-UX",
    "description": "��\u0000 \u0000H\u0000i\u0000g\u0000h\u0000t\u0000e\u0000c\u0000h\u0000-\u0000t\u0000e\u0000m\u0000p\u0000l\u0000a\u0000t\u0000e\u0000\r\u0000...",
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
      "stars": 3,
      "topLanguage": "CSS",
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
    "category": "Web-Platforms",
    "description": "Stylish e-commerce template for fashion stores with categories for men, women, and children.",
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
      "stars": 5,
      "topLanguage": "CSS",
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
    "category": "Web-Platforms",
    "description": "Stylish blogging template for personal blogs, magazines, and news websites with a clean layout and responsive design.",
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
      "stars": 4,
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
    "category": "UI-UX",
    "description": "Professional template for business solutions and crypto investments, built with Bootstrap 5.",
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
      "stars": 3,
      "topLanguage": "CSS",
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
    "category": "UI-UX",
    "description": "Professional template for architectural and design services with sections for projects, services, and team members.",
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
      "stars": 2,
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
    "category": "Web-Platforms",
    "description": "Stylish news and blog template for online platforms with multiple categories.",
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
      "stars": 3,
      "topLanguage": "CSS",
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
    "category": "UI-UX",
    "description": "Landing page template for influencer marketing agencies with services like product analysis and influencer matchmaking.",
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
      "stars": 2,
      "topLanguage": "CSS",
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
    "category": "Web-Platforms",
    "description": "��\u0000 \u0000p\u0000o\u0000d\u0000c\u0000a\u0000s\u0000t\u0000-\u0000t\u0000e\u0000m\u0000p\u0000l\u0000a\u0000t\u0000e\u0000\r\u0000...",
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
      "stars": 4,
      "topLanguage": "CSS",
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
    "category": "Web-Platforms",
    "description": "Stylish e-commerce template for footwear brands with sections for home, shop, blog, and contact.",
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
      "stars": 5,
      "topLanguage": "CSS",
      "issues": 0
    },
    "features": [
      "Product Quick View",
      "Filter by Size",
      "Cart Dropdown"
    ],
    "codeSnippet": "// Quick View Modal"
  }
];
