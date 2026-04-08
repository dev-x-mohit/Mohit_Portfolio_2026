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
  type: 'web' | 'mobile';
  features: string[];
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    "id": "feat-7",
    "title": "Gudgig",
    "year": "2026",
    "category": "Freelance Fullstack",
    "summary": "A freelance full-stack job portal and freelancer marketplace with bidding, real-time notifications, admin analytics, and production deployment across Hostinger and a VPS.",
    "description": "# Gudgig: Full-Stack Job Portal & Freelancer Marketplace\n\n## Executive Summary\nGudgig is a production-grade freelancer marketplace and lead-based job portal built for real-world hiring, bidding, and gig discovery workflows. The platform enables users to browse gigs, unlock contact details, place bids, save jobs, manage profiles, track payments, and receive real-time updates. It includes separate experiences for public users, authenticated freelancers, clients, and administrators, making it a complete marketplace system rather than a simple listings site.\n\n---\n\n## Marketplace Flows & User Experience\n\nThe platform was designed around multi-role workflows. Freelancers can explore leads, place bids, manage saved gigs, and maintain their profiles, while gig seekers can publish opportunities and manage responses. The admin side includes controls for users, gigs, bids, payment logs, fee configuration, announcements, notifications, and platform analytics.\n\n### Real-Time Interaction\nGudgig uses authenticated Socket.IO connections for live notifications and platform events. Push notifications are also integrated through Web Push so users stay informed about bids, updates, and account activity beyond the active session.\n\n### Conversion-Oriented Lead Unlocking\nA core business workflow is the contact-details unlock flow for leads and gigs. This allows the platform to support monetized lead access alongside traditional bidding and job application patterns.\n\n---\n\n## Full-Stack Architecture\n\nThe frontend is built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Radix UI**, **Framer Motion**, and **Chart.js** for dashboard analytics. The backend runs as a separate **Node.js** and **Express.js** API with **MongoDB**, **Mongoose**, **JWT authentication**, **Redis**, **Cloudinary**, **Nodemailer**, **Twilio**, and **Socket.IO**.\n\n### Core Platform Modules\nThe system includes job and gig listings, bid management, saved jobs and gigs, payment tracking, testimonials, announcements, support flows, metrics endpoints, cron-based automations, caching, and error monitoring. Payment handling is integrated with **Razorpay**, with backend support prepared for **Stripe** and **PayPal**.\n\n### Operational Reliability\nTo support production usage, the platform includes health monitoring, metrics endpoints, scheduled cron jobs, caching layers, and error tracking. These pieces help keep both the user-facing marketplace and the admin dashboard stable under active use.\n\n---\n\n## Deployment & Hosting\n\nGudgig was deployed with a split hosting architecture. The **frontend is hosted on Hostinger**, while the **backend is deployed on a VPS**. Production routing is managed through **Nginx**, and server deployment and maintenance are handled over **SSH**. The project also includes **Docker** and **Docker Compose** configuration for container-based deployment workflows.\n\n---\n\n## My Role\n\nThis was delivered as a freelance full-stack project. I handled the platform architecture, responsive frontend development, dashboard and admin workflows, backend APIs, authentication, database models, real-time notifications, analytics modules, payment flows, and production deployment. I also configured the frontend on Hostinger and deployed the backend to a VPS with Nginx and SSH-based server operations.",
    "techStack": [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO"
    ],
    "accentColor": "#14B8A6",
    "githubLink": "",
    "liveLink": "https://gudgig.com",
    "coverImage": "/projects/Gudgig-home.webp",
    "type": "web",
    "stats": {
      "commits": 120,
      "stars": 0,
      "topLanguage": "TypeScript",
      "issues": 0
    },
    "features": [
      "Gig and Job Bidding Flow",
      "Admin Dashboard and Analytics",
      "Real-time Socket.IO Notifications",
      "Hostinger Frontend with VPS Backend Deployment"
    ],
    "screenshots": [
      "/projects/Gudgig-home.webp",
      "/projects/Gudgig-mid.webp",
      "/projects/Gudgig-deep.webp"
    ],
    "codeSnippet": "// Authenticated notification bootstrap\nconst socket = io(API_BASE_URL, {\n  auth: { token: accessToken }\n});\n\nsocket.on('notification:new', (payload) => {\n  setNotifications(prev => [payload, ...prev]);\n});"
  },
  {
    "id": "feat-1",
    "title": "Ekovym",
    "year": "2025",
    "category": "Fullstack",
    "summary": "A high-performance, browser-based IDE and social ecosystem designed for seamless cloud development and collaboration.",
    "description": "# Ekovym: The Future of Browser-Based Software Development\n\n## Executive Summary\nEkovym is an ambitious, high-performance web application designed to bridge the gap between local development environments and the cloud. It is not merely a \"coding playground\"; it is a full-featured, browser-based Integrated Development Environment (IDE) and social ecosystem. Built on the core pillars of Speed, Collaboration, and Accessibility, Ekovym empowers developers to write, test, and share code from any device with a modern web browser. By integrating a virtualized file system, high-fidelity terminal emulation, and a rich social networking layer, Ekovym redefines what is possible in a web-native productivity suite. 🚀\n\n---\n\n## The Browser as an OS: Architectural Overview\n\nThe primary challenge in building Ekovym was overcoming the inherent limitations of the browser environment. To create a \"native feel,\" we had to architect several low-level subsystems that typically reside within an operating system.\n\n### Virtual File System (VFS)\nAt the heart of Ekovym is a custom-built Virtual File System. This VFS provides a hierarchical data structure for project files, synchronized in real-time with a cloud backend. We utilized an \"Offline-First\" approach using IndexedDB for local persistence, ensuring that developers can continue coding even during network intermittent connectivity. Changes are queued and intelligently merged with the master server once the connection is restored, utilizing a sophisticated state-reconciliation algorithm.\n\n### Multi-Tab Code Orchestration\nThe editor supports a robust multi-tab interface, allowing developers to manage complex project structures. Each file is treated as a stream, with the editor only loading necessary chunks into memory. This \"Lazy Loading\" strategy is critical for maintaining high performance when opening large codebases or working on low-memory mobile devices.\n\n---\n\n## High-Fidelity Terminal Emulation\n\nOne of Ekovym's most technically impressive features is its integrated terminal. We implemented a custom terminal emulator that supports a subset of standard Unix commands and interactive Node.js execution.\n\n### Pseudo-Terminal (PTY) Integration\nWhile the terminal runs in the browser, the underlying execution logic is handled by a sandboxed server environment. We use WebSockets to create a persistent, low-latency bridge between the user's terminal UI and the remote shell. This allows for real-time output streaming, ANSI color support, and interactive command execution that feels indistinguishable from a local terminal.\n\n### Client-Side Command Simulation\nFor common operations like `ls`, `cd`, and `cat`, Ekovym performs client-side simulation directly against the VFS. This provides instantaneous feedback for file navigation, reducing the round-trip latency to the server and making the environment feel significantly more responsive.\n\n---\n\n## The Social Layer: Connecting Cultures, Celebrating Unity\n\nEkovym recognizes that modern software development is a social endeavor. Beyond its technical capabilities, the platform features a comprehensive social networking system.\n\n### Global Content Feed\nDevelopers can post snippets of their work, share technical insights, and follow trending global topics. The social feed is designed for high-density information disposal, supporting multi-media posts including images, videos, and interactive \"Live Code Snippets\" that other users can fork and run immediately within their own workspace.\n\n### Real-Time Interaction & Messaging\nEkovym includes a dedicated messaging layer for real-time collaboration and networking. Whether discussing a bug or planning a partnership, the platform facilitates seamless communication within the same environment where the work is happening. This integration of \"Social\" and \"Code\" eliminates the friction of switching between different tools.\n\n---\n\n## Performance Engineering & Optimization\n\nBuilding a responsive IDE in the browser requires meticulous performance engineering.\n\n### Optimized Caching & PWA Support\nEkovym is a fully compliant Progressive Web App (PWA). We utilize advanced Service Worker strategies to cache all application assets and common project dependencies. The result is a sub-second initial load time and a robust offline experience.\n\n### Motion Design & Fluidity\nLeveraging **Framer Motion**, the Ekovym UI features subtle micro-animations that provide tactile feedback for every interaction. From the sliding sidebar panels to the fade-in terminal results, every transition is calculated to enhance the user's focus rather than distract from it. The UI feels alive, responsive, and premium.\n\n---\n\n## Security & Sandboxing\n\nSecurity is the cornerstone of Ekovym. To allow for remote code execution while protecting the underlying infrastructure, we implemented a multi-layered security model. All user code runs in isolated, ephemeral Docker containers. These containers are restricted at the kernel level, ensuring that users cannot access the host system or interfere with other users' processes. On the client side, we utilize rigorous Content Security Policies (CSP) to prevent XSS and other common web-based attacks.\n\n---\n\n## Future Vision: The Ekovym Network\n\nEkovym is just the beginning of a larger vision for a decentralized development network. Our roadmap includes:\n- **Ekovym Marketplace**: A curated store for plugins, themes, and pre-configured environment blueprints.\n- **Collaborative Debugging**: The ability to share a \"Live Debugging Link\" where collaborators can step through your code in real-time.\n- **AI Code Synthesis**: Deeper integration of LLMs to provide real-time code completion, bug detection, and automated unit test generation.\n\nIn conclusion, Ekovym represents a paradigm shift in the world of productivity tools. It is a testament to the power of modern web technologies to create complex, native-quality experiences that were once thought impossible. It is a home for the next generation of global developers.",
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
    "category": "Fullstack",
    "summary": "A privacy-focused, local-first PWA note-taking app with real-time Firebase synchronization and offline capabilities.",
    "description": "# NotmeNow: Engineered for Privacy, Optimized for Speed\n\n## Executive Summary\nNotmeNow is a next-generation Progressive Web App (PWA) designed for the modern knowledge worker who demands absolute privacy and instantaneous data access. In an age of cloud-dependency, NotmeNow flips the script by prioritizing a \"Local-First, Cloud-Synced\" architecture. Built with **React** and **Firebase**, it delivers a seamless note-taking experience that works across all devices, online or offline. By leveraging advanced Markdown rendering and high-performance local caching, NotmeNow ensures that your ideas are captured with the speed of thought and the security of professional-grade encryption.\n\n---\n\n## The Offline-First Architecture\n\nThe defining technical achievement of NotmeNow is its robust offline capability. Unlike standard web apps that fail without a connection, NotmeNow is engineered to be fully functional in the absence of a network.\n\n### Local-First Persistence\nWe utilize **IndexedDB** as the primary data store on the user's device. When a user creates or edits a note, the change is instantly persisted to the local database before any network request is even attempted. This eliminates latency and ensures that data is never lost due to a dropped connection. The UI responds with sub-millisecond speed, providing a \"native\" feel that traditional web apps cannot match.\n\n### Intelligent Conflict Resolution\nWhen the application regains network access, it initiates a complex synchronization process with **Firebase Realtime Database**. We implemented a custom conflict resolution strategy that utilizes vector clocks and timestamps to merge changes from multiple devices. If a user edits the same note on their phone and laptop simultaneously, NotmeNow intelligently resolves the differences, ensuring data integrity without manual intervention.\n\n---\n\n## Rich Content Orchestration: The Markdown Engine\n\nNotmeNow is more than just a text editor; it is a platform for structured documentation.\n\n### Advanced Markdown Rendering\nAt the heart of the editor is a high-performance Markdown engine. It supports the full GitHub-Flavored Markdown (GFM) specification, including task lists, tables, and auto-linked URLs. We've optimized the rendering pipeline to ensure that even extremely long documents (over 10,000 words) can be scrolled and edited without frame drops.\n\n### Real-Time Preview & Syntax Highlighting\nThe editor provides a side-by-side or togglable preview mode that renders formatting in real-time. By utilizing custom CSS modules and optimized React components, we ensured that the preview remains perfectly synchronized with the source text. Special attention was paid to typography and spacing, creating a professional-grade documentation environment.\n\n---\n\n## User Experience & Productivity Features\n\nNotmeNow is built for speed and focus. The UI is intentionally minimalist, removing distractions to allow for deep work.\n\n### Progressive Web App (PWA) Capabilities\nAs a PWA, NotmeNow can be \"installed\" on mobile and desktop devices, appearing in the app drawer and taskbar with its own icon. We utilized **Service Workers** for aggressive asset caching, ensuring that the app shell loads instantly even on legacy network speeds. This creates a friction-less transition between web and standalone usage.\n\n### Secure Synchronization\nPrivacy is built into the architecture. All data transmitted to Firebase is encrypted using modern TLS standards. For users demanding even higher security, we've designed the architecture to support end-to-end encryption (E2EE), where keys never leave the user's device. Your notes are not just yours; they are protected.\n\n---\n\n## Performance Metrics & Technical Specs\n\n- **Initial Load Time**: Under 800ms on 4G networks.\n- **Data Footprint**: Optimized SQLite-like local storage with periodic compaction.\n- **Sync Latency**: Real-time push notifications ensure sync happens in under 200ms across active devices.\n- **Framework**: React 18+ with Hooks-based state orchestration.\n\nIn summary, NotmeNow is a testament to the power of modern web technologies to create tools that are reliable, private, and exceptionally fast. It is for those who value their thoughts and the speed at which they capture them.",
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
    "category": "Frontend Web",
    "summary": "A state-of-the-art news aggregator featuring SSR, infinite scrolling, and intelligent category filtering for global headlines.",
    "description": "# SnapNews: Delivering Global Intelligence in Real-Time\n\n## Executive Summary\nSnapNews is a state-of-the-art news aggregation platform engineered for the high-velocity world of digital information. Built with **Next.js** and powered by the **NewsAPI**, it provides a centralized hub for global headlines, breaking news, and deep-dive reporting. In an era of informational overload, SnapNews offers clarity through sophisticated filtering, intelligent category sorting, and a high-performance masonry layout. By prioritizing Server-Side Rendering (SSR) and seamless infinite scrolling, SnapNews delivers a premium, newspaper-grade reading experience that adapts to any device, from high-resolution desktops to mobile handsets. 📰\n\n---\n\n## The Next.js Advantage: Performance & SEO\n\nThe choice of **Next.js** was critical for SnapNews. As a news platform, both initial load speed and Search Engine Optimization (SEO) are paramount.\n\n### Server-Side Rendering (SSR)\nBy utilizing SSR, SnapNews pre-renders the initial news feed on the server. This means that when a user lands on the site, they are greeted with content almost instantly, significantly reducing the Time to Interactive (TTI). This architecture also ensures that search engine crawlers can easily index the latest headlines, maximizing the platform's visibility and reach.\n\n### Optimized Data Fetching\nSnapNews implements a sophisticated data-fetching layer that interacts with the NewsAPI. We utilized **SWR (Stale-While-Revalidate)** to manage server state and client-side caching. This ensures that the news feed is always fresh while providing instantaneous feedback during navigation. Users never see a \"blank\" screen; they see the last cached news while the updated headlines load silently in the background.\n\n---\n\n## Intelligent Content Discovery\n\nNews is only valuable if it is relevant. SnapNews features several layers of intelligent content orchestration.\n\n### Infinite Scroll & Pagination\nTo handle thousands of potentially available articles, we implemented a robust infinite scroll mechanism. As the user reaches the bottom of their feed, a background request is triggered to fetch the next \"page\" of news. We utilized intersection observers for high-performance scroll detection, ensuring that the new content is injected into the DOM without any layout shifts or visual stutter.\n\n### Dynamic Category Filtering\nSnapNews allows users to pivot between General, Technology, Business, Science, and Health categories with a single click. The platform dynamically re-routes and re-fetches content based on these filters, providing a tailored news experience. We also implemented a custom search engine that allows users to query millions of news articles from the past five years.\n\n---\n\n## UI/UX: The Digital Newspaper Experience\n\nThe design of SnapNews is a modern homage to traditional journalism.\n\n### Responsive Masonry Grid\nWe utilized a CSS Grid-based masonry layout to present news cards of varying heights. This creates a visually dynamic and engaging \"scancode\" that encourages exploration. Each card features metadata such as the source name, publication time, and author, providing essential context at a glance.\n\n### Visual Impact & Readability\nPhotography is central to the news experience. SnapNews prioritizes high-impact visuals, utilizing the `next/image` component for automatic image optimization and lazy loading. This ensures that the platform remains fast and responsive even when loading hundreds of high-resolution article thumbnails. The typography is tuned for maximum readability, ensuring that the user can focus on the story.\n\n---\n\n## Technical Specifications & Stack\n\n- **Framework**: Next.js 14+ (App Router)\n- **API**: RESTful integration with NewsAPI.org\n- **Styling**: Tailwind CSS for rapid, scalable UI development\n- **Deployment**: Optimized for Vercel for global edge delivery\n- **Animations**: Framer Motion for subtle, non-distracting transitions\n\nSnapNews is more than an aggregator; it is an intelligent lens through which to view the world. It combines the reliability of traditional news with the power and speed of modern web architecture.",
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
    "category": "Frontend Web",
    "summary": "A purely client-side text analysis suite featuring sentiment scoring, readability auditing, and a regex debugging sandbox.",
    "description": "# TxtXpert: The Developer's Swiss-Army Knife for Text Analysis\n\n## Executive Summary\nTxtXpert is a high-performance, purely client-side suite for advanced text manipulation and linguistic auditing. Engineered for developers, content creators, and data analysts, it provides a powerful toolkit for real-time sentiment analysis, exact readability scoring, and complex pattern debugging. In an era where data privacy is paramount, TxtXpert processes all information directly within the user's browser, ensuring that sensitive text never touches a remote server. Built with a focus on low-latency JavaScript and leveraging the powerful **NLP.js** library, TxtXpert is the definitive tool for those who treat text as data. 🔍\n\n---\n\n## Real-Time Linguistic Intelligence\n\nThe core of TxtXpert is its ability to extract meaningful data from raw text instantly.\n\n### Sentiment Analysis Engine\nUtilizing a custom-trained model from the **NLP.js** library, TxtXpert provides a granular sentiment score for any input block. It doesn't just categorize text as \"good\" or \"bad\"; it provides a probability-based score that accounts for nuance and tone. This is invaluable for auditing customer feedback, refining marketing copy, or analyzing public data in real-time.\n\n### Readability Scoring (Flesch-Kincaid)\nFor content creators, TxtXpert implements the industry-standard Flesch-Kincaid readability algorithm. It calculates exact syllable-to-word and word-to-sentence ratios to provide a grade-level score and a readability index. This allows writers to tailor their content for specific audiences, from academic researchers to a general consumer base, with scientific precision.\n\n---\n\n## The Regex Sandbox: Debugging at the Speed of Light\n\nOne of the most powerful features for developers is the integrated Regular Expression (Regex) sandbox.\n\n### Live Highlighting & Group Capture\nAs you write a regex pattern, TxtXpert highlights matches in your test string in real-time. We've implemented a custom rendering layer that visualizes capture groups and identifies syntax errors on the fly. This prevents the \"guess-and-check\" cycle common in regex development, providing an interactive environment that makes matching logic intuitive.\n\n### Flag Support & Performance\nThe sandbox supports all standard JavaScript regex flags (global, multiline, case-insensitive, etc.). We utilized optimized string operations and regex engines to ensure that even complex patterns running against massive text blocks remain responsive. Whether you are extracting emails from a log file or validating a complex input form, the TxtXpert sandbox is your primary debugger.\n\n---\n\n## Architecture & Privacy-First Design\n\nTxtXpert is built on the philosophy that your data is your own.\n\n### Purely Client-Side Processing\nUnlike traditional NLP APIs that require you to upload your text to the cloud, TxtXpert initializes its models and logic entirely within the user's local browser environment. This \"Local-First\" approach eliminates privacy concerns and ensures that text analysis remains fast regardless of network conditions.\n\n### Modular JS Architecture\nThe application is structured into several high-performance modules, each dedicated to a specific type of analysis (Sentiment, Readability, Keyword Extraction, Regex). This modularity allows for easy expansion as new NLP algorithms and features are added. The UI is built with a focus on density—providing maximum information with minimum clutter, mirroring the aesthetic of a professional IDE.\n\n---\n\n## Technical Specifications\n\n- **Engine**: NLP.js for sentiment and keyword extraction.\n- **Algorithms**: Flesch-Kincaid Readability, custom Regex parser.\n- **Language**: Pure, high-performance TypeScript/JavaScript.\n- **Optimization**: Web-Worker ready for offloading heavy text processing.\n\nTxtXpert represents a new standard in text manipulation tools—one where performance, privacy, and power are delivered in a single, high-fidelity browser application. It is the professional's choice for deep-dive text auditing.",
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
    "summary": "An elite automotive rental template with interactive 360° previews, a custom booking calendar, and modular SASS architecture.",
    "description": "# CarBook: Elevating the Automotive Rental UI/UX Standard\n\n## Executive Summary\nCarBook is an elite, high-performance UI/UX template engineered for the competitive world of automotive rentals. Built with **SASS**, **HTML5**, and the **Bootstrap 5** framework, it provides a pixel-perfect, mobile-first interface designed to maximize conversion and build brand authority. In a market where trust and transparency are paramount, CarBook delivers a seamless user journey through interactive 360° vehicle previews, a custom booking calendar, and high-fidelity automotive listings. This project is a masterclass in modular CSS architecture and conversion-driven design. 🏎️\n\n---\n\n## Design Philosophy: Power Meets Precision\n\nThe aesthetic of CarBook is a reflection of the automotive world itself—sleek, powerful, and impeccably detailed.\n\n### Modern Typography & Spacing\nWe utilized a combination of bold, sans-serif headings for a high-impact feel and clean, readable body text for essential vehicle specs. The layout emphasizes ample whitespace and structured grids, ensuring that the user can compare technical specifications without cognitive overload. The use of **SASS variables** and **mixins** allowed us to create a cohesive theme that is both visually stunning and technically consistent.\n\n### 360° Vehicle Previews & Multimedia\nTo reduce the bridge between the digital and physical experience, CarBook features interactive vehicle previews. Users can explore car interiors and exteriors through high-resolution image galleries and smooth transition animations. This level of visual detail is critical for high-ticket service industries like car rentals, where the vehicle is the star of the show.\n\n---\n\n## Technical Architecture & Scalability\n\nWhile the focus of CarBook is on design, its underlying architecture is built for professional-grade scalability.\n\n### Modular CSS with SASS\nWe moved away from ad-hoc styling in favor of a strictly modular SASS structure. Each component—from the vehicle search bar to the pricing cards—is self-contained within its own `.scss` file. This allows for rapid iteration and ensures that style changes in one area do not cause regressions elsewhere. Our custom grid system, extending the power of Bootstrap, ensures that CarBook looks equally impressive on a 4K monitor and a small mobile handset.\n\n### Performance & SEO Optimization\nIn an industry where every millisecond counts toward a lost lead, CarBook is optimized for speed. We utilized aggressive image lazy-loading and minimized CSS payloads to achieve near-instantaneous page loads. The HTML structure is semantically perfect, using **Microdata** and **Schema.org** tags to help search engines understand vehicle inventory, pricing, and availability—crucial for local SEO dominance.\n\n---\n\n## The Conversion Funnel: From Search to Booking\n\nCarBook isn't just about looking good; it's about facilitating business.\n\n### Custom Interactive Booking Calendar\nWe developed a custom JavaScript-based calendar integration that allows for intuitive date and time selection. This module includes real-time validation to prevent date overlaps and provides a streamlined interface for selecting pickup and drop-off locations. The focus is on reducing \"click-friction,\" guiding the user toward the booking confirmation with minimal effort.\n\n### Advanced Vehicle Filtering\nThe search experience is empowered by a sophisticated filter system. Users can sort inventory by vehicle type (Sedan, SUV, Luxury), fuel type, transmission, and price point. The filter UI is designed for mobile-first usage, ensuring that users can find their perfect car while on the go.\n\n---\n\n## Future Roadmap & Integration\n\nCarBook is built to be the frontend for a full-scale rental enterprise. Future roadmap items include:\n- **API-Driven Fleet Management**: Connecting the UI to a real-time fleet database for live availability status.\n- **Payment Gateway Integration**: Pre-styled modules for Stripe and PayPal to handle secure transactions.\n- **Customer Dashboard**: A secure portal for users to manage their bookings, view rental agreements, and update their profiles.\n\nCarBook sets a new benchmark for automotive industry web design—it is where high-octane aesthetics meet low-friction functionality.",
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
    "category": "Frontend Web",
    "summary": "A secure, client-side utility for creating highly customizable and branded QR codes with high-fidelity styling options.",
    "description": "# QRGenie: Instant, Private, and High-Fidelity Identity Creation\n\n## Executive Summary\nQRGenie is a professional-grade, purely client-side utility designed for the rapid generation of highly customizable QR codes. In an era where digital sharing and touchless interactions are standard, QRGenie provides a frictionless bridge between the physical and digital worlds. Built with a focus on low-latency JavaScript and privacy-first architecture, it allows creators to generate, style, and download QR codes for URLs, Wi-Fi credentials, and business cards without ever sending their data to a remote server. 🧞‍♂️\n\n---\n\n## Privacy-First Architecture\n\nThe most critical technical achievement of QRGenie is its commitment to data sovereignty. Unlike many popular QR generation services that process your data on their servers, QRGenie performs 100% of its computation within the user's browser. We utilize a high-performance JavaScript implementation of the QR code algorithm that creates the matrix and renders the result locally. This ensures that sensitive information—such as private Wi-Fi passwords or personal contact details—is never exposed to the network, providing absolute peace of mind.\n\n---\n\n## High-Fidelity Customization & Branding\n\nQRGenie recognizes that in marketing, a QR code is more than just data—it is a brand touchpoint. We've moved beyond the traditional black-and-white grid. QRGenie allows for complex linear and radial color gradients, as well as customizable \"quiet zones\" and border radii for the QR modules (the individual dots). This allows users to create codes that perfectly align with their brand identity or project aesthetic. \n\nUsers can also embed their brand logo directly into the center of the QR code. To ensure the code remains scannable, we utilize the highest level of QR-coded error correction (Level H), which allows for up to 30% of the code to be obscured or damaged while still functioning perfectly. This technical compensation allows for creative freedom without sacrificing utility.\n\n---\n\n## Diversity of Data Types & Export\n\nQRGenie is built for a wide variety of use cases across multiple industries, including URL sharing, Wi-Fi credentials, and VCARDs. We utilized the High-performance HTML5 Canvas for real-time visualization and support export formats like PNG for digital use and SVG for high-resolution print applications. It is the perfect blend of technical utility and creative expression.",
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
    "category": "Frontend Game",
    "summary": "An interactive brain-training game featuring complex state logic, smooth 3D flip animations, and dynamic difficulty scaling.",
    "description": "# Memory Game: A Masterclass in Interactive State & Animation Logic\n\n## Executive Summary\nThis Memory Game is more than just a casual digital pastime; it is a highly-tuned exercise in complex UI state management and performance-optimized animation. Built with **JavaScript**, **HTML5**, and high-density **CSS3 Animations**, the game serves as a demonstration of how micro-interactions and smooth feedback loops can transform a simple mechanic into an engaging user experience. Featuring a dynamic difficulty scaling system, a precise performance timer, and themeable emoji sets, this project represents a deep-dive into the \"Game Logic\" side of frontend development. 🧠\n\n---\n\n## The Core Logic: State Orchestration\n\nBuilding a reliable memory game requires a robust system for tracking the game's state across multiple asynchronous events. The game begins with a sophisticated deck generation algorithm that ensures every session is unique. We utilized the **Fisher-Yates (Knuth) Shuffle** for unbiased randomization, guaranteeing that every card pair is distributed fairly across the board. \n\nWhen a user flips a card, the application enters a state-lock mode. We implemented a multi-stage logic pipeline that handles selection storage, comparison logic, and action execution (marking pairs or flipping back). This ensures that users cannot \"overshot\" the logic by clicking cards too rapidly, maintaining the integrity of the game's rules.\n\n---\n\n## Animation & Micro-Interactions\n\nThe \"feel\" of the game is determined by the quality of its transitions. We utilized CSS3 `transform` and `transition` properties with `backface-visibility: hidden` to create a realistic 3D flip effect. This hardware-accelerated approach ensures that the animations remain fluid and responsive, even on low-powered mobile devices. \n\nSuccess is celebrated with high-impact visual feedback. When a match is found, cards pulse with a success color, and completing the entire board triggers a custom animation sequence and a detailed performance breakdown. These feedback loops are essential for \"Gamification,\" encouraging multiple play sessions through achievement-based rewards. It is a showcase of technical precision and artistic flair in the world of web-based gaming.",
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
    "category": "Frontend Game",
    "summary": "A professional-grade typing speed diagnostic tool with real-time WPM calculation and byte-level accuracy tracking.",
    "description": "# Typechecky: Precision Engineering for the Fast-Typing Era\n\n## Executive Summary\nTypechecky is a professional-grade typing speed diagnostic and training platform designed for developers, data entry professionals, and anyone looking to master the art of rapid input. In an era where digital communication speed is a direct proxy for productivity, Typechecky provides a high-fidelity environment for measuring and improving typing proficiency. Built with **JavaScript** and a focus on sub-millisecond event tracking, it offers real-time **Words Per Minute (WPM)** calculation, byte-level accuracy analysis, and instantaneous visual feedback. ⌨️\n\n---\n\n## High-Resolution Performance Tracking\n\nThe core of Typechecky is its ability to extract precise metrics from high-speed user input. We developed a sophisticated algorithm that calculates typing speed in real-time. Unlike simple counters, the Typechecky engine utilizes a time-sliding window to provide a dynamic WPM score that reflects the user's current velocity. \n\nAccuracy is tracked at a byte-level, comparing every single keystroke against the target text. We implemented a \"Mistake-Log\" system that identifies specific characters or patterns that the user frequently misses. This data-driven approach allows for targeted practice, helping users overcome stubborn typing bottlenecks.\n\n---\n\n## UI/UX: The \"Flow-State\" Environment\n\nFor a typing tool to be effective, the interface must fade into the background. Typechecky utilizes a high-contrast, typography-focused layout that minimizes ocular strain and reduces peripheral distractions. This \"Zen-Mode\" UI is critical for helping users enter a \"Flow State,\" where the connection between the mind and the keyboard becomes intuitive and seamless. \n\nFeedback is provided through a high-performance rendering layer. Correct characters satisfy the target text with a \"success\" highlight, while errors are marked instantly in a distinct \"caution\" tone. By utilizing low-latency CSS transitions, we ensure that the visual feedback keeps pace with even the world's fastest typists without any perceptible lag. Typechecky represents the pinnacle of typing diagnostic tools.",
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
    "category": "Frontend Web",
    "summary": "A streamlined, mobile-first productivity dashboard with local persistence and high-performance DOM reconciliation.",
    "description": "# Task Management App: Orchestrating Productivity with Precision\n\n## Executive Summary\nThis Task Management App is a high-performance productivity dashboard designed for the modern professional who requires zero-friction workflow orchestration. Built with a \"Mobile-First\" philosophy and utilizing **HTML5**, **CSS3**, and **Vanilla JavaScript**, it provides a streamlined environment for task prioritization, categorization, and tracking. In a world of complex and enterprise-bloated software, this application returns to the fundamentals of productivity: speed, clarity, and reliability. ✅\n\n---\n\n## Technical Architecture & State Mastery\n\nThe core challenge in a task management system is maintaining a consistent state across user sessions without the overhead of a dedicated backend server. We implemented a robust data persistence layer using the browser's **LocalStorage API**. This ensures that every task creation, move, or deletion is instantly mirrored in the local data store. We utilized a JSON-based schema for task objects, including metadata for priority levels and category tags.\n\nTo maintain high performance as the task list grows, we utilized an efficient DOM reconciliation strategy. Instead of complete re-renders, the application identifies specific delta changes in the task state and updates only the affected DOM nodes. This minimizes layout thrashing and ensures that interactions—like dragging a task between columns—remain buttery smooth at 60fps.\n\n---\n\n## Design & UI/UX Orchestration\n\nThe UI is designed to minimize cognitive load and maximize focus, mirroring the aesthetic of a professional IDE environment. We implemented a color-coded priority system that allows users to instantly identify high-impact tasks. Through a combination of CSS Custom Properties (Variables) and dynamic class binding, the UI adapts its visual weight based on the task's importance. \n\nOn mobile devices, the application utilizes touch-swipe gestures for task management. We integrated high-performance CSS transitions to provide tactile feedback for every swipe and tap. These micro-animations are not just decorative; they serve as functional indicators of state change, guiding the user through their workflow with intuitive visual cues.",
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
    "summary": "A high-density discovery hub for anime enthusiasts featuring masonry layouts and interactive content discovery.",
    "description": "# Anime Universe: A High-Density Discovery Hub for Otakus\n\n## Executive Summary\nAnime Universe is a media-rich community portal designed for the high-velocity world of anime enthusiasts. Built with a focus on deep content discovery and visual impact, it provides a centralized reservoir for show listings, news feeds, and community discussions. In an age of informational saturation, Anime Universe offers clarity through sophisticated UI components and seamless navigation. By leveraging advanced CSS Grid and Flexbox layouts, the platform delivers a premium browsing experience that adapts to any device. 🌌\n\n---\n\n## Visual Engineering & Responsive Layouts\n\nThe defining technical achievement of Anime Universe is its robust masonry grid implementation. We utilized **CSS Grid** to create a dynamic, multi-column layout that elegantly handles content cards of varying heights. This creates a visually engaging \"wall of content\" that encourages exploration and reduces bounce rates. \n\nMicro-interactions are handled with high-performance CSS transitions. We implemented sophisticated hover states for anime covers, including scale-up effects and metadata overlays that provide instant context without requiring a page navigate. This \"Scan-First\" design philosophy ensures that users can find their favorite shows with minimal friction.\n\n---\n\n## Performance & Interaction Logic\n\nBehind its visual flair, Anime Universe is optimized for speed. We utilized aggressive image lazy-loading and optimized asset delivery to ensure that even a feed of hundreds of thumbnails remains fast and responsive. The category sorting engine is implemented in Vanilla JavaScript, allowing users to pivot between genres and seasonal releases instantaneously. Anime Universe is more than just a template; it is a high-performance gateway to the anime world.",
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
    "summary": "A premium financial services landing page designed for corporate consulting and wealth management with executive minimalism.",
    "description": "# Cial Finance: Professional-Grade Digital Presence for High-Stakes Firms\n\n## Executive Summary\nCial Finance is a premium financial services landing page engineered for corporate consulting, wealth management, and investment firms. In an industry where trust and technical authority are the primary currencies, Cial Finance delivers a high-fidelity web presence that prioritizes clarity and brand credibility. Built with modern HTML5 and CSS3 standards, it features professional-grade UI components and an SEO-optimized architecture designed to capture high-value leads. 📈\n\n---\n\n## Corporate Design & Technical Density\n\nThe interface is rooted in \"Executive Minimalism,\" utilizing a high-contrast color palette and structured grids to present complex financial data without overwhelming the user. We implemented modular service sections that allow for a hierarchical breakdown of corporate offerings, from wealth advisory to market analysis. Each section is optimized with metadata and schema tags to ensure maximum visibility for financial search queries.\n\n---\n\n## Interaction & Conversion Strategy\n\nCial Finance features a multi-step lead capture system that guides potential clients through a streamlined inquiry process. We utilized high-performance script delivery to ensure that interactive elements—such as service charts and professional team showcases—load in under a second. The platform also includes comprehensive client testimonial modules and FAQ sections, providing the social validation and technical clarity necessary for financial decision-making. It is the definitive digital foundation for the modern financial professional.",
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
    "summary": "A visual-first digital café experience featuring artisanal branding, interactive menus, and smooth transition animations.",
    "description": "# Coffee Master: Brewing the Perfect Digital Café Experience\n\n## Executive Summary\nCoffee Master is a premium web template designed for the artisanal coffee industry. It provides a visual-first interface that successfully translates the sensory experience of a high-end café into a digital storefront. Built with high-resolution photography and smooth transition animations, Coffee Master focuses on building an emotional connection with the user through storytelling and interactive discovery. ☕\n\n---\n\n## Aesthetic & Visual Storytelling\n\nThe design utilizes a warm, coffee-inspired color palette and elegant serif typography to create a sense of craftsmanship. We implemented a responsive high-fidelity gallery that showcases the café's interior and barista skills, utilizing hardware-accelerated CSS for a buttery-smooth scrolling experience. The interactive menu is designed for rapid navigation, allowing users to explore roasts and food pairings with ease.\n\n---\n\n## Technical Implementation & Versatility\n\nBeyond its visual charm, Coffee Master is a robust technical foundation. It features integrated blog modules for content marketing and a conversion-oriented reservation system mockup. The code is structured for modularity, allowing café owners to easily pivot content and themes for seasonal offerings. Optimized for mobile devices, the template ensures that local customers can find and explore the café while on the go.",
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
    "category": "UI-UX",
    "summary": "A sophisticated fashion storefront showcasing high-conversion UX architecture and premium minimalist design.",
    "description": "# Famms: A Masterclass in Modern E-Commerce UX Architecture\n\n## Executive Summary\nFamms is a sophisticated, high-conversion e-commerce storefront designed to showcase the intersection of high-fashion aesthetics and technical performance. In a digital marketplace where user attention is the most valuable currency, Famms delivers an immersive shopping experience that prioritizes visual impact and seamless navigation. Built with a focus on modular CSS and high-performance JavaScript, the platform serves as a benchmark for modern retail web design. From its dynamic product discovery engines to its streamlined checkout flows, Famms is engineered to turn casual visitors into loyal customers. 🛍️\n\n---\n\n## Design Philosophy: High-Impact Visual Storytelling\n\nThe visual identity of Famms is rooted in \"Premium Minimalism.\" The interface utilizes ample white space, bold typography, and a high-contrast color palette to create a layout that feels sophisticated and uncluttered. The landing page features high-resolution hero sections that utilize advanced CSS-based masking and parallax effects. By utilizing **SASS** for styling, we were able to create a highly maintainable theme system that allows for rapid visual pivots.\n\n---\n\n## Technical Architecture & Performance\n\nUnder the hood, Famms is optimized for the speed and reliability that modern consumers demand. The styling is built using a modular SASS architecture, combining the speed of utility classes with the power of pre-processor features like mixins and variables. Every user action—from adding an item to the cart to filtering a product list—is handled with optimized JavaScript. \n\nWe prioritized micro-interactions, such as \"Zoom-on-Hover\" for product images and fluid transition animations, to provide tactile feedback that enhances the premium feel of the site. By utilizing hardware-accelerated CSS transitions, we ensured that these animations remain smooth even on lower-powered mobile devices. Famms is a comprehensive solution for the future of digital fashion retail.",
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
    "summary": "A technical dashboard for e-sports intelligence featuring tournament brackets, news feeds, and community modules.",
    "description": "# Game Warrior: The Professional's Dashboard for E-Sports Intelligence\n\n## Executive Summary\nGame Warrior is a comprehensive e-sports news and gaming community portal designed for the high-velocity world of competitive gaming. In an industry where information density and real-time updates are critical, Game Warrior delivers a high-performance interface that prioritizes speed and engagement. Featuring specialized modules for tournament tracking and live news delivery, it is the definitive foundation for modern gaming organizations. 🎮\n\n---\n\n## Information Density & Interactive Modules\n\nThe defining feature of Game Warrior is its ability to handle complex, multi-modal data. We implemented specialized tournament bracket tracking UI that allows users to follow competition progress in real-time. The e-sports news feed utilizes a masonry layout for high-density information disposal, ensuring that breaking updates always command attention. \n\nInteractive tab-switching and content filtering are handled with optimized JavaScript, allowing users to pivot between game reviews, blogs, and forum discussions instantaneously. The layout is optimized with specialized gaming iconography and high-contrast color schemes, creating a familiar and engaging environment for the gaming community.",
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
    "category": "UI-UX",
    "summary": "An educational landing page for technology training featuring granular course catalogs and conversion-driven UI.",
    "description": "# Coder School: Engineering the Next Generation of Digital Pioneers\n\n## Executive Summary\nCoder School is a comprehensive educational landing page designed for the rapidly growing world of technology training. In an era where digital literacy is the most valuable skill, Coder School provides a high-fidelity portal that bridge the gap between aspiring students and professional educators. Built with a focus on clear information hierarchy and conversion-driven UI components, it is the definitive template for modern coding bootcamps and virtual academies. 🎓\n\n---\n\n## Educational UX & Information Architecture\n\nThe interface is rooted in \"Clarity-First\" design. We implemented a robust course catalog that allows for granular filtering by technology, level, and intensity. The virtual classroom UI mockups provide a glimpse into the learning experience, utilizing professional-grade icons and structured layouts to build trust and authority.\n\n---\n\n## Conversion & Lead Generation\n\nCoder School features a streamlined registration system designed to maximize student enrollment. From the multi-step form to the interactive FAQ sections, every element is tuned to reduce friction and build credibility. Built on a mobile-first Bootstrap architecture, the template ensures that prospective students can explore courses and register from any device with ease.",
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
    "summary": "A professional foundation for wealth architecture featuring investment calculators and high-impact service showcases.",
    "description": "# Growing Finance: A Professional Foundation for Wealth Architecture\n\n## Executive Summary\nGrowing Finance is a sophisticated financial services landing page engineered for wealth management, tax consulting, and high-frequency investment firms. In an industry where professional authority is paramount, Growing Finance delivers a high-fidelity web presence that prioritizes clarity and client trust. 📈\n\n---\n\n## Technical Density & Trust Signals\n\nThe interface focuses on high-impact service showcases and professional team profiles. We implemented an interactive investment calculator UI that allows users to simulate growth scenarios in real-time, providing immediate value and engagement. The platform also includes dedicated modules for client testimonials and case studies, providing the \"Social Proof\" necessary for high-stakes financial decision-making.\n\n---\n\n## Performance & Accessibility\n\nBuilt with modern CSS and a focus on sub-second load times, Growing Finance ensures that financial clients experience zero friction. The typography is tuned for maximum readability, ensuring that complex financial advice is presented in a clear and professional manner. It is the definitive digital companion for firms looking to conquer the modern financial landscape.",
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
    "summary": "A modern portfolio template for software firms featuring filterable project grids and high-fidelity agency branding.",
    "description": "# Hightech Agency: The Digital Mirror for Innovation-First Teams\n\n## Executive Summary\nHightech Agency is a modern, high-fidelity portfolio template designed for software firms, creative agencies, and technical consultancies. In a competitive digital landscape, Hightech Agency provides an authoritative platform for showcasing project-level excellence and technical capabilities. 💻\n\n---\n\n## Portfolio Engineering & Discovery\n\nThe heart of the template is a high-performance, filterable project grid. Users can pivot between categories—such as Web Development, App Design, and Digital Marketing—instantaneously. Each project card features advanced hover micro-animations that provide a premium, \"alive\" feel. The team showcase modules utilize professional photography and clean layouts to humanize the agency and build credibility.\n\n---\n\n## Responsive Mastery & Brand Impact\n\nBuilt with a focus on visual impact and technical precision, Hightech Agency ensures that your work is presented perfectly across all devices. The design emphasizes ample white space and bold typography, creating a layout that feels sophisticated and technical without being overwhelming. It is the perfect digital foundation for teams looking to make a lasting impact.",
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
    "category": "UI-UX",
    "summary": "A luxury e-commerce experience for high-end apparel featuring interactive product zoom and premium retail UX.",
    "description": "# Karl Fashion: A Luxury Digital Experience for High-End Apparel\n\n## Executive Summary\nKarl Fashion is an elite, multi-category e-commerce solution designed for the world of luxury retail. In an industry where aesthetics and brand image are the primary drivers of success, Karl Fashion delivers a high-impact visual experience that prioritizes product storytelling and high-conversion UI. 👔\n\n---\n\n## Visual Storytelling & UX Precision\n\nThe interface utilizes large-scale hero sections and responsive product grids to highlight garment detail. We implemented advanced interactive zoom-on-hover effects that allow users to explore textures and craftsmanship without requiring complex navigation. The shopping cart mockup is streamlined for zero friction, ensuring that the path to purchase remains clear and premium.\n\n---\n\n## E-Commerce Innovation\n\nBeyond its visual flair, Karl Fashion is built for high-performance retail. It features dynamic category navigation and intelligent product discovery engines that help users find their perfect look with ease. Optimized for mobile devices, the template ensures that the luxury shopping experience remains consistent from desktop to handset.",
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
    "category": "UI-UX",
    "summary": "A typography-first journalism platform optimized for readability, deep content exploration, and SEO dominance.",
    "description": "# Meranda Blog: High-Fidelity Journalism for Digital Storytellers\n\n## Executive Summary\nMeranda Blog is a versatile, high-performance blogging engine designed for professional journalists, magazines, and independent authors. In an era of informational velocity, Meranda provides a sanctuary of clarity and readability, prioritizing the author's voice above all else. ✍️\n\n---\n\n## Typography-First Design\n\nThe layout is engineered for maximum readability, utilizing a typography-driven approach that minimizes ocular strain. We implemented a sticky sidebar for persistent navigation and an intelligent 'Related Posts' engine that encourages deep content exploration. This design philosophy reduces bounce rates and increases user engagement by guiding readers through a meaningful content journey.\n\n---\n\n## Technical Authority & Discovery\n\nBuilt for speed and SEO dominance, Meranda Blog ensures that every story reaches its intended audience. The minimalist aesthetic and clean design create a distraction-free environment for both authors and readers. It is more than just a template; it is a professional tool for the next generation of digital thinkers.",
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
    "summary": "An authoritative fintech and consulting portal featuring crypto ticker mockups and global reach visualization.",
    "description": "# Mexant Business: Technical Authority for the Fintech Era\n\n## Executive Summary\nMexant Business is an authoritative web solution for modern fintech, consulting, and cryptocurrency services. In an industry defined by technical complexity and high-stakes data, Mexant provides a reliable and transparent interface that builds brand credibility and technical trust. 💼\n\n---\n\n## Fintech Infrastructure & Visualization\n\nThe interface features high-visibility crypto ticker mockups and complex modular service grids. We implemented interactive SVG map integrations and professional document showcase modules, providing the necessary tools for global firms to communicate their reach and expertise. Built with Bootstrap 5, the platform ensures industry-leading responsiveness and technical depth.\n\n---\n\n## Corporate Branding & Scalability\n\nThe design focuses on corporate authority, utilizing a technical color palette and structured grids to present financial offerings with precision. Mexant Business is designed to grow with your firm, providing a scalable digital foundation that adapts to the fast-moving world of international finance.",
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
    "summary": "An elite digital portfolio for design pioneers featuring grand-scale galleries and technical design precision.",
    "description": "# Mosaic Architecture: Digital Grandeur for Design Pioneers\n\n## Executive Summary\nMosaic Architecture is an elite digital portfolio designed for high-end architecture and interior design firms. In an industry where visual impact is the primary proxy for project excellence, Mosaic provides a premium platform for showcasing grand-scale visual storytelling and technical precision. 🏛️\n\n---\n\n## Project-Level Precision & Storytelling\n\nThe heart of the template is a series of complex project galleries with integrated light-box support. We utilized advanced CSS grid systems to showcase architectural plans and high-resolution renders with pixel-perfect accuracy. Smooth testimonial sliders and professional architect profiles provide the \"Social Proof\" and technical authority necessary for high-value client acquisition.\n\n---\n\n## Aesthetic Harmony & Fluidity\n\nBy prioritizing clean lines and sophisticated transitions, the platform mirrors the aesthetic values of high-end architecture. The UI feels alive and responsive, guiding users through a curated journey of design excellence. Mosaic Architecture is the definitive choice for firms looking to dominate the digital design space.",
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
    "category": "Frontend Web",
    "summary": "A high-velocity intelligence hub for digital publishers featuring breaking news tickers and multi-modal reporting.",
    "description": "# NewsBox: High-Velocity Intelligence for Digital Publishers\n\n## Executive Summary\nNewsBox is a feature-rich, high-performance news template designed for digital publishers, magazines, and newspaper brands. In a world of infinite informational flow, NewsBox provides a structured and engaging sanctuary for breaking news, media-rich reporting, and community-driven blogs. 🗞️\n\n---\n\n## Information Density & Multi-Modal Reporting\n\nThe interface utilizes breaking news tickers and integrated video galleries to deliver a modern, multi-media storytelling experience. We implemented category-indexed layouts and dynamic tab switching, ensuring that users can find the latest updates across multiple channels instantaneously. The site is optimized for high-volume traffic and sub-second load times, meeting the demands of modern digital journalism.\n\n---\n\n## Hierarchy & Readability\n\nWith its clean, modern typography and strong visual hierarchy, NewsBox ensures that your stories command attention. The design is tuned for maximum readability across all devices, ensuring that the user's focus remains on the content. It is a powerful and scalable solution for the future of global publishing.",
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
    "summary": "A data-driven agency landing page featuring influencer campaign metrics and conversion-engineered funnel UI.",
    "description": "# Nubis Marketing: Data-Driven Impact for Creative Agencies\n\n## Executive Summary\nNubis Marketing is a high-performance landing page engineered for influencer marketing, digital branding, and creative agencies. In a data-driven agency landscape, Nubis provides an authoritative platform for showcasing campaign results, matchmaking algorithms, and technical expertise. 📈\n\n---\n\n## Conversion Engineering & Agency UX\n\nThe interface features professional influencer profile cards and interactive service pricing tables. We implemented complex hero animations and campaign metric visualizations to provide immediate technical proof and brand impact. The conversion funnel is streamlined, guiding prospective clients into a professional inquiry system with zero friction.\n\n---\n\n## Modern Visual Identity & Scalability\n\nBuilt with a focus on modern agency aesthetics, Nubis Marketing ensures that your firm stands out from the competition. The design is mobile-optimized and technically robust, providing a scalable digital foundation for an agency looking to dominate its market.",
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
    "category": "Frontend Web",
    "summary": "A professional broadcasting hub featuring integrated audio players, episode management, and listener engagement tools.",
    "description": "# Podcast Pro: The High-Fidelity Hub for Digital Broadcasting\n\n## Executive Summary\nPodcast Pro is a feature-rich, professional platform template designed for podcasters, broadcasters, and audio creators. In the golden age of audio content, Podcast Pro provides a high-fidelity digital home for managing episodes, engaging with listeners, and building a subscription-based brand. 🎙️\n\n---\n\n## Audio Engagement & Content Management\n\nThe interface features an integrated audio player UI that provides a seamless listening experience directly on the site. We implemented sophisticated episode management modules and categorical filtering, ensuring that users can find and enjoy back-catalog content with ease. The streamlined subscription forms and social integration modules allow creators to build and maintain a loyal audience.\n\n---\n\n## Technical Simplicity & Visual Depth\n\nBuilt with Bootstrap and custom CSS, Podcast Pro delivers industry-leading responsiveness and style. The design emphasizes high-impact cover art and clean layouts, creating a professional environment for audio storytelling. It is the definitive tool for the modern digital broadcaster.",
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
    "category": "UI-UX",
    "summary": "A high-octane footwear retail template featuring quick-view modals and mobile-optimized purchase paths.",
    "description": "# Shooe Store: High-Octane Retail for Footwear Pioneers\n\n## Executive Summary\nShooe Store is a robust, high-impact footwear e-commerce storefront designed for modern retail domination. In a competitive market where visual discovery and zero-friction purchase paths are critical, Shooe Store provides a premium experience that prioritizes product impact and technical performance. 👟\n\n---\n\n## Retail UX & Product Discovery\n\nThe interface features quick-view modals and granular filtering for size, color, and price. We implemented high-performance image lazy-loading and mobile-optimized shopping cart experiences to ensure that users can find and purchase their perfect pair with ease. The bold typography and high-contrast color schemes create a unique and engaging brand feel that builds shopper loyalty.\n\n---\n\n## Conversion Optimization & Performance\n\nBuilt for high-volume retail success, Shooe Store ensures that every click leads to a faster path to conversion. The architecture is technically optimized and fully responsive, ensuring a consistent brand experience from desktop to mobile. It is a masterclass in modern retail UI design.",
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
  },
  {
    "id": "feat-6",
    "title": "Nexus",
    "year": "2026",
    "category": "Fullstack",
    "summary": "A next-generation collaborative mind-mapping platform powered by React 19, React Flow, and Gemini AI integration.",
    "description": "# Nexus: Visual Mind Mapping & Intelligent Collaboration\n\n## Executive Summary\nNexus is a next-generation collaborative platform engineered to transform the way teams brainstorm, architect, and visualize complex ideas. In an era where digital noise often obscures clarity, Nexus provides a high-performance, infinite canvas where abstract thoughts are crystallized into structured visual intelligence. Built with a cutting-edge technological stack including **React 19**, **React Flow**, and **Tailwind CSS v4**, the platform is designed for fluid, zero-latency interaction. At its core, Nexus is not just a diagramming tool; it is an AI-augmented brainstorming partner that leverages the power of **Gemini AI** to expand concepts and discover hidden connections. 🧠\n\n---\n\n## Technical Architecture & Core Philosophies\n\nThe architecture of Nexus is rooted in the \"Canvas-First\" philosophy. Unlike traditional hierarchical document editors, Nexus treats the entire viewport as a non-linear workspace. This required a robust state management system that could handle thousands of interactive nodes without compromising on frame rates.\n\n### The React 19 Foundation\nBy utilizing the latest features of **React 19**, Nexus takes advantage of improved concurrent rendering and more efficient reconciliation. The use of `Transitions` and `useDeferredValue` ensures that high-impact visual updates—such as node dragging or AI expansion animations—remain buttery smooth even under heavy loads.\n\n### Tailwind v4: Performance and Aesthetics\nThe integration of **Tailwind CSS v4** allows for a high degree of visual polish with minimal CSS bloat. Every element in Nexus, from the glassmorphism panels to the neon-accented connection lines, is styled using Tailwind's powerful utility-first approach. This not only ensures a premium, modern aesthetic but also contributes to the rapid initial load times and overall UI responsiveness.\n\n---\n\n## Real-Time Synchronization Engine\n\nCollaboration is the lifeblood of Nexus. To achieve an experience that feels truly \"live,\" we implemented a dedicated synchronization engine powered by **Socket.io**.\n\n### Bi-directional Communication\nWhen a user moves a node or edits a concept, the change is instantly broadcast to all participating collaborators. We utilize a conflict-resolution strategy that prioritizes the latest interaction while maintaining a log of all modifications. This ensures that a team of ten can work on the same mind map simultaneously without overwriting each other's work or experiencing \"ghost\" nodes.\n\n### Delta-Based Updates\nTo optimize bandwidth, Nexus transmits only the \"deltas\" of a change. For example, moving a node only broadcasts the new coordinates, rather than the entire state of the node. This data-efficiency is crucial for maintaining the \"infinite\" feel of the canvas, even on slower network connections.\n\n---\n\n## Visual Intelligence: AI-Augmented Brainstorming\n\nThe most distinctive feature of Nexus is its integration with **Gemini AI**. We believe that the role of AI in creative work is to assist and amplify, not replace.\n\n### Intelligent Node Generation\nWhen a user hits a creative block, they can invoke the **Command Palette** to ask Nexus for help. The underlying Gemini integration analyzes the current context of the mind map—understanding the relationships between existing nodes—and generates relevant suggestions for expansion. If you are mapping out a software architecture, the AI might suggest missing edge cases or security layers you hadn't considered.\n\n### Semantic Clustering\nBeyond just adding nodes, the AI helps in organizing thoughts. Nexus can automatically cluster related nodes based on their semantic meaning, helping users find structure in a chaotic brainstorming session. This \"Visual Intelligence\" layer turns a simple mind map into a powerful knowledge graph.\n\n---\n\n## Infinite Canvas Logic with React Flow\n\nThe heavy lifting of rendering and managing the node-and-edge system is handled by **React Flow**. However, we have heavily customized the integration to support the unique needs of Nexus.\n\n### Custom Node Types\nEvery node in Nexus is a custom React component, allowing for rich content embedding—from markdown notes and code snippets to interactive checklists. These nodes are designed to be highly responsive, adapting their detail level based on the user's zoom factor to maintain visual clarity.\n\n### Dynamic Edge Routing\nConnections in Nexus are more than just lines; they represent the flow of logic. We implemented custom edge routing algorithms that ensure connection lines never overlap awkwardly with nodes, maintaining a clean and professional look regardless of the map's complexity.\n\n---\n\n## State Management & Performance Optimization\n\nManaging an infinite canvas requires a sophisticated approach to state. We utilize a combination of **Zustand** for global application state and local React state for transient interactions like hover effects.\n\n### Spatial Indexing\nTo ensure performance scales linearly with the number of nodes, we implement spatial indexing. Nexus only renders nodes that are currently within or near the viewer's viewport. As the user pans and zooms, the engine rapidly \"wakes up\" and \"hibernates\" nodes, keeping memory usage stable and GPU performance high.\n\n### Throttling & Debouncing\nHigh-frequency events, especially during real-time collaboration, are throttled at the network layer to prevent congestion. Visual updates are synchronized with the browser's requestAnimationFrame to ensure that the canvas always moves at a fluid 60fps.\n\n---\n\n## Security & Privacy\n\nIn a collaborative environment, security is paramount. Nexus implements **JWT-based authentication** and secure WebSockets (WSS) to ensure that your ideas remain your own. Every canvas is private by default, with granular permissions for team sharing. Data is encrypted both in transit and at rest, meeting the high standards required by corporate architectural planning.",
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
      "stars": 5,
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
