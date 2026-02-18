
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
    id: "feat-1",
    title: "Ekovym",
    year: "2025",
    category: "Web-Platforms",
    description: "A high-performance workspace for modern developers with real-time collaboration. Ekovym redefines the coding environment with a browser-based IDE that feels native.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    accentColor: "#6366f1",
    githubLink: "https://github.com/mohitlakhara-ind/Ekovym-New",
    liveLink: "https://ekovym.vercel.app/",
    coverImage: "https://raw.githubusercontent.com/mohitlakhara-ind/Ekovym-New/main/public/cover.png",
    type: "web",
    stats: { commits: 142, stars: 28, topLanguage: "TypeScript", issues: 3 },
    features: [
      "Real-time Collaboration Engine",
      "Integrated Terminal Emulation",
      "Glassmorphism UI Design",
      "Cloud-based File System"
    ],
    codeSnippet: `// Interactive Terminal Emulation Hook
const useTerminal = (command: string) => {
  const [history, setHistory] = useState<string[]>([]);
  
  const execute = async (cmd: string) => {
    setHistory(prev => [...prev, \`$ \${cmd}\`]);
    try {
      const res = await processCommand(cmd);
      setHistory(prev => [...prev, res]);
    } catch (err) {
      setHistory(prev => [...prev, \`Error: \${err.message}\`]);
    }
  };

  return { history, execute };
};`
  },
  {
    id: "feat-2",
    title: "NotemeNow",
    year: "2024",
    category: "Mobile-Apps",
    description: "Minimalist note-taking with offline sync and markdown support. Designed for speed, it launches in under 500ms and syncs across devices instantly.",
    techStack: ["React", "Firebase", "PWA", "Vercel"],
    accentColor: "#f59e0b",
    githubLink: "https://github.com/mohitlakhara-ind/notes-app",
    liveLink: "https://notemenow.vercel.app",
    coverImage: "https://raw.githubusercontent.com/mohitlakhara-ind/notes-app/main/ss1.png",
    type: "mobile",
    stats: { commits: 89, stars: 15, topLanguage: "JavaScript", issues: 0 },
    features: [
      "Offline-First Architecture",
      "Markdown Rendering",
      "Cross-Device Sync",
      "PWA Installability"
    ],
    codeSnippet: `// Offline Sync Logic
useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "notes"), 
    (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      console.log("Source: ", source);
      setNotes(snapshot.docs.map(doc => doc.data()));
    },
    (error) => {
      console.error("Sync failed: ", error);
      loadFromLocalStorage();
    }
  );
  return () => unsubscribe();
}, []);`
  },
  {
    id: "feat-3",
    title: "SnapNews",
    year: "2024",
    category: "Web-Platforms",
    description: "Responsive news aggregator with advanced filtering and lazy loading. Keeps you updated without the clutter, using AI to categorize and summarize headlines.",
    techStack: ["Next.js", "NewsAPI", "Framer Motion"],
    accentColor: "#ef4444",
    githubLink: "https://github.com/mohitlakhara-ind/SnapNews",
    liveLink: "https://snap-news-phi.vercel.app/",
    coverImage: "https://raw.githubusercontent.com/mohitlakhara-ind/SnapNews/refs/heads/main/public/SnapNewsSS.png",
    type: "web",
    stats: { commits: 56, stars: 12, topLanguage: "TypeScript", issues: 1 },
    features: [
      "Advanced Category Filtering",
      "Infinite Scroll & Lazy Loading",
      "Responsive Grid Layout",
      "Dark Mode Support"
    ],
    codeSnippet: `// Dynamic Article Filtering
export const getFilteredNews = async (category: string, query: string) => {
  const params = new URLSearchParams({
    apiKey: process.env.NEWS_API_KEY,
    category,
    q: query,
    language: 'en'
  });
  
  const res = await fetch(\`https://newsapi.org/v2/top-headlines?\${params}\`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
};`
  },
  {
    id: "feat-4",
    title: "TxtXpert",
    year: "2023",
    category: "Algorithms",
    description: "Text processing utility for sentiment analysis and insight extraction. A developer tool for quick NLP tasks right in the browser.",
    techStack: ["JavaScript", "NLP.js", "Regex"],
    accentColor: "#10b981",
    githubLink: "https://github.com/mohitlakhara-ind/Txt-Xpert",
    liveLink: "https://codepen.io/mohitlakhara-ind/full/mdNjKee",
    coverImage: "https://raw.githubusercontent.com/mohitlakhara-ind/Txt-Xpert/refs/heads/main/TxtXpert%20(3).png",
    type: "web",
    stats: { commits: 34, stars: 8, topLanguage: "JavaScript", issues: 0 },
    features: [
      "Sentiment Analysis Algo",
      "Readability Scoring",
      "Keyword Extraction",
      "Regex Testing Sandbox"
    ],
    codeSnippet: `// Sentiment Analysis Core
function analyzeSentiment(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  let score = 0;
  words.forEach(word => {
    if (positiveList.includes(word)) score += 1;
    if (negativeList.includes(word)) score -= 1;
  });
  return {
    score,
    verdict: score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral'
  };
}`
  },
  {
    id: "feat-5",
    title: "CarBook",
    year: "2023",
    category: "UI-UX",
    description: "Rental experience template with dynamic booking interfaces. Focuses on the user journey from browsing to checkout with micro-interactions.",
    techStack: ["HTML5", "SASS", "Bootstrap", "JS"],
    accentColor: "#8b5cf6",
    githubLink: "https://github.com/mohitlakhara-ind/CarBook",
    liveLink: "https://mohitlakhara-ind.github.io/CarBook/",
    coverImage: "https://raw.githubusercontent.com/mohitlakhara-ind/CarBook/refs/heads/main/images/CarSS%20(5).jpeg",
    type: "web",
    stats: { commits: 45, stars: 10, topLanguage: "CSS", issues: 2 },
    features: [
      "Dynamic Booking Calendar",
      "Interactive Vehicle 360",
      "Payment Gateway Mockup",
      "Responsive Dashboard"
    ],
    codeSnippet: `/* Kinetic Hover Effect */
.car-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  
  .card-img {
    filter: grayscale(0%);
    transform: scale(1.1);
  }
  
  .book-btn {
    opacity: 1;
    transform: translateY(0);
  }
}`
  }
];
