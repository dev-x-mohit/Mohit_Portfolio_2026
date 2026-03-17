
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
}

export const featuredProjects: FeaturedProject[] = [
    {
        "id": "feat-6",
        "title": "Nexus",
        "subtitle": "Intelligent Visual Mapping",
        "description": "A premium collaborative platform for transforming complex thoughts into structured visual intelligence. Features an infinite canvas, real-time sync, and AI-powered node generation.",
        "techStack": ["React 19", "React Flow", "Tailwind CSS v4", "Socket.io"],
        "category": "Fullstack",
        "status": "Active",
        "accentColor": "#8B5CF6",
        "parallaxStrength": 0.2,
        "githubLink": "https://github.com/mohitlakhara-ind/nexus",
        "liveLink": "https://nexus-visuals.vercel.app/",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1773763966/portfolio_projects/Nexus.png",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-1",
        "title": "Ekovym",
        "subtitle": "Developer Productivity Suite",
        "description": "A developer-focused platform designed to streamline workflows with a strong emphasis on modern UI/UX and collaborative modules.",
        "techStack": ["React.js", "TailwindCSS", "Node.js", "MongoDB"],
        "category": "Fullstack",
        "status": "In Progress",
        "accentColor": "#8A2BE2",
        "parallaxStrength": 0.15,
        "githubLink": "https://github.com/mohitlakhara-ind/ekovym",
        "liveLink": "",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612364/portfolio_projects/cover_feat-1.png",
        "mockupType": "Desktop"
    },
    {
        "id": "feat-2",
        "title": "NoteNow",
        "subtitle": "Cloud-Synced Markdown Editor",
        "description": "A minimal, intuitive note-taking app featuring real-time synchronization, Firebase integration, and PWA capabilities.",
        "techStack": ["React.js", "Firebase", "Markdown", "PWA"],
        "category": "Fullstack",
        "status": "Active",
        "accentColor": "#FF00FF",
        "parallaxStrength": 0.25,
        "githubLink": "https://github.com/mohitlakhara-ind/notes-app",
        "liveLink": "https://notemenow.vercel.app",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612374/portfolio_projects/cover_feat-2.png",
        "mockupType": "Mobile Focused"
    },
    {
        "id": "feat-3",
        "title": "SnapNews",
        "subtitle": "Real-time Intelligence Feed",
        "description": "Delivering headlines via NewsAPI with advanced filtering, lazy loading, and custom-built responsive UI components.",
        "techStack": ["React.js", "NewsAPI", "CSS3", "JavaScript"],
        "category": "Frontend Web",
        "status": "Completed",
        "accentColor": "#00FF41",
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
        "category": "Frontend Web",
        "status": "Active",
        "accentColor": "#007BFF",
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
        "category": "UI-UX",
        "status": "Active",
        "accentColor": "#FFD700",
        "parallaxStrength": 0.3,
        "githubLink": "https://github.com/mohitlakhara-ind/CarBook",
        "liveLink": "https://mohitlakhara-ind.github.io/CarBook/",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612402/portfolio_projects/cover_feat-5.png",
        "mockupType": "Desktop"
    }
];
