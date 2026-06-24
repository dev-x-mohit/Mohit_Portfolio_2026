
export interface FeaturedProject {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    techStack: string[];
    category: string;
    status: string;
    accentColor: string;
    parallaxStrength: number;
    githubLink: string;
    liveLink: string;
    coverImage: string;
    mockupType: string;
    apkLink?: string;
    mobileImage?: string;
}

export const featuredProjects: FeaturedProject[] = [
    {
        "id": "feat-10",
        "title": "Soloflow",
        "subtitle": "AI Billing SaaS",
        "description": "A production-ready SaaS application for freelancers to manage clients, projects, time logs, and invoices — with Razorpay payment integration and GPT-4o AI proposal generation.",
        "techStack": ["Next.js", "Prisma", "NextAuth", "Razorpay"],
        "category": "Web Platforms",
        "status": "Active",
        "accentColor": "#C89A3C",
        "parallaxStrength": 0.2,
        "githubLink": "https://github.com/mohitlakhara-ind/soloflow",
        "liveLink": "https://soloflow-invoice.vercel.app",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1781679012/portfolio_projects/soloflow/dashboard_dark.png",
        "mobileImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228407/portfolio_assets/mockup-soloflow-mobile.webp",
        "mockupType": "Desktop",
        "apkLink": "#"
    },
    {
        "id": "feat-9",
        "title": "Splitwiser",
        "subtitle": "Expense Splitter",
        "description": "AI-powered multi-platform expense splitter with receipt OCR, Splitwise OAuth migration, and graph-based debt simplification.",
        "techStack": ["React Native", "Express", "Tailwind", "OCR"],
        "category": "Mobile Apps",
        "status": "Active",
        "accentColor": "#B8C1CC",
        "parallaxStrength": 0.2,
        "githubLink": "https://github.com/mohitlakhara-ind/splitsmart",
        "liveLink": "https://web-gz8lisyvm-mohitlakhara-inds-projects.vercel.app",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228409/portfolio_assets/mockup-splitwiser-desktop.png",
        "mobileImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228409/portfolio_assets/mockup-splitwiser-app.png",
        "mockupType": "Desktop",
        "apkLink": "#"
    },
    {
        "id": "feat-6",
        "title": "Nexus",
        "subtitle": "Intelligent Visual Mapping",
        "description": "A premium collaborative platform for transforming complex thoughts into structured visual intelligence. Features an infinite canvas, real-time sync, and AI-powered node generation.",
        "techStack": ["React 19", "React Flow", "Tailwind CSS v4", "Socket.io"],
        "category": "Web Platforms",
        "status": "Active",
        "accentColor": "#CD7F32",
        "parallaxStrength": 0.2,
        "githubLink": "https://github.com/mohitlakhara-ind/nexus",
        "liveLink": "https://nexus-visuals.vercel.app/",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1773763966/portfolio_projects/Nexus.png",
        "mobileImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228410/portfolio_assets/mockup-nexus-mobile.webp",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-1",
        "title": "Ekovym",
        "subtitle": "Developer Productivity Suite",
        "description": "A developer-focused platform designed to streamline workflows with a strong emphasis on modern UI/UX and collaborative modules.",
        "techStack": ["React.js", "TailwindCSS", "Node.js", "MongoDB"],
        "category": "Web Platforms",
        "status": "In Progress",
        "accentColor": "#A8791D",
        "parallaxStrength": 0.15,
        "githubLink": "https://github.com/mohitlakhara-ind/ekovym",
        "liveLink": "https://ekovym.vercel.app/",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228682/portfolio_assets/mockup-ekovym-desktop.png",
        "mobileImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228683/portfolio_assets/mockup-ekovym-mobile.png",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-2",
        "title": "NoteNow",
        "subtitle": "Cloud-Synced Markdown Editor",
        "description": "A minimal, intuitive note-taking app featuring real-time synchronization, Firebase integration, and PWA capabilities.",
        "techStack": ["React.js", "Firebase", "Markdown", "PWA"],
        "category": "Web Platforms",
        "status": "Active",
        "accentColor": "#E1C17A",
        "parallaxStrength": 0.25,
        "githubLink": "https://github.com/mohitlakhara-ind/notes-app",
        "liveLink": "https://notemenow.vercel.app",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612374/portfolio_projects/cover_feat-2.png",
        "mobileImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228413/portfolio_assets/mockup-notenow-mobile.webp",
        "mockupType": "Mobile Focused"
    },
    {
        "id": "feat-3",
        "title": "SnapNews",
        "subtitle": "Real-time Intelligence Feed",
        "description": "Delivering headlines via NewsAPI with advanced filtering, lazy loading, and custom-built responsive UI components.",
        "techStack": ["React.js", "NewsAPI", "CSS3", "JavaScript"],
        "category": "Frontend Projects",
        "status": "Completed",
        "accentColor": "#E5E4E2",
        "parallaxStrength": 0.1,
        "githubLink": "https://github.com/mohitlakhara-ind/Snap_News",
        "liveLink": "",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio_projects/cover_feat-3.png",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-4",
        "title": "TxtXpert",
        "subtitle": "Comprehensive Text Tool",
        "description": "A versatile text transformation engine for manipulation, extraction, and analysis with a focus on real-time performance.",
        "techStack": ["React.js", "Bootstrap", "JavaScript"],
        "category": "Algorithms & Utilities",
        "status": "Active",
        "accentColor": "#5AEBB1",
        "parallaxStrength": 0.2,
        "githubLink": "https://github.com/mohitlakhara-ind/Txt-Xpert/",
        "liveLink": "https://codepen.io/mohitlakhara-ind/full/mdNjKee",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/portfolio_projects/cover_feat-4.png",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-5",
        "title": "CarBook",
        "subtitle": "Premium Car Rental UI",
        "description": "A comprehensive rental experience template with payment gateway simulation and a dynamic booking system.",
        "techStack": ["HTML5", "SCSS", "JavaScript", "UI/UX"],
        "category": "Frontend Projects",
        "status": "Active",
        "accentColor": "#B87333",
        "parallaxStrength": 0.3,
        "githubLink": "https://github.com/mohitlakhara-ind/CarBook",
        "liveLink": "https://mohitlakhara-ind.github.io/CarBook/",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612402/portfolio_projects/cover_feat-5.png",
        "mobileImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1782228414/portfolio_assets/mockup-carbook-mobile.webp",
        "mockupType": "Desktop"
    }
];
