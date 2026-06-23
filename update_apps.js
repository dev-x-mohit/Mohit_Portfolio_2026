const fs = require('fs');

const soloflow = `  {
    "id": "feat-10",
    "title": "Soloflow",
    "year": "2026",
    "category": "Mobile Apps",
    "summary": "An AI-powered freelancer client portal and billing SaaS with Razorpay integration and GPT-4o proposal generation.",
    "description": "# Soloflow 🧾\\n\\n> **AI-Powered Freelancer Client Portal & Billing SaaS**\\n\\nA production-ready SaaS application for freelancers to manage clients, projects, time logs, and invoices — with Razorpay payment integration and GPT-4o AI proposal generation.\\n\\n## ✨ Features\\n- **Client Management** — Add, edit, and track clients with full contact details\\n- **Project Tracking** — Create projects per client with status, hourly rate, and fixed budget\\n- **Time Logging** — Log billable hours, mark as invoiced automatically\\n- **Invoice Generation** — Build professional invoices with line items, tax, discounts\\n- **Razorpay Payments** — Payment links embedded in invoices\\n- **AI Proposal Writer** — GPT-4o drafts proposals with 3 tone modes\\n\\n## 🛠️ Tech Stack\\nNext.js 15, Prisma, PostgreSQL, NextAuth v5, Razorpay, OpenAI GPT-4o, Tailwind CSS v4, Recharts.",
    "techStack": [
      "Next.js 15",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Razorpay",
      "OpenAI API"
    ],
    "accentColor": "#000000",
    "githubLink": "https://github.com/mohitlakhara-ind/soloflow",
    "liveLink": "https://soloflow-invoice.vercel.app",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1781679012/portfolio_projects/soloflow/dashboard_dark.png",
    "type": "mobile",
    "apkLink": "#",
    "stats": {
      "commits": 85,
      "stars": 12,
      "topLanguage": "TypeScript",
      "issues": 0
    },
    "features": [
      "AI Proposal Generation",
      "Razorpay Payments",
      "Time Tracking",
      "Client Portal"
    ],
    "codeSnippet": "// AI Proposal Generation\\nconst response = await openai.chat.completions.create({\\n  model: \\"gpt-4o\\",\\n  messages: [{ role: \\"user\\", content: prompt }],\\n  stream: true,\\n});"
  }`;

const splitwiser = `  {
    "id": "feat-9",
    "title": "Splitwiser",
    "year": "2026",
    "category": "Mobile Apps",
    "summary": "AI-powered multi-platform expense splitter with receipt OCR, Splitwise OAuth migration, and graph-based debt simplification.",
    "description": "# Splitwiser: AI Expense Splitter & Multi-Platform Finance Ecosystem\\n\\n## Executive Summary\\nSplitwiser is a modern, cross-platform expense splitting ecosystem consisting of a dark-themed React Native/Expo mobile application, a React 19 web frontend, and a Node.js/Express API. It integrates an AI-powered OCR bill scanner to instantly parse receipt details, a secure Splitwise OAuth import tool to migrate existing groups and balances, and a graph-based debt simplification algorithm to settle group debts in the minimum possible transactions.\\n\\n## Core Capabilities\\n- **OCR Bill Scanner**: Real-time receipt parsing powered by OCR.space API to extract merchant, line items, and totals.\\n- **Splitwise OAuth Import**: Seamless data migration enabling users to authenticate with Splitwise, fetch active groups, select specific groups, and sync their balances directly into Splitwiser.\\n- **Debt Simplification**: Transactional graph minimization using custom heuristics to reduce the total transfers required to settle debts.\\n- **Multi-Platform UI**: Beautiful glassmorphic UI styled with Tailwind CSS v4 on the web client, and Poppins typography on the mobile app.\\n- **WhatsApp Settlement Nudge**: Custom native share sheet integration to draft and format payment summaries with direct UPI links.",
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
    "liveLink": "https://web-gz8lisyvm-mohitlakhara-inds-projects.vercel.app",
    "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612374/portfolio_projects/cover_feat-2.png",
    "type": "mobile",
    "apkLink": "#",
    "stats": {
      "commits": 62,
      "stars": 8,
      "topLanguage": "TypeScript",
      "issues": 1
    },
    "features": [
      "React 19 Web App & Expo Mobile",
      "Splitwise OAuth Data Import",
      "OCR Receipt Auto-Parsing",
      "Debt Minimization Graph"
    ],
    "codeSnippet": "// Express API route for receipt OCR parsing\\nrouter.post('/ocr', upload.single('file'), async (req, res) => {\\n  const result = await ocrService.parseReceipt(req.file.buffer);\\n  res.json({ merchant: result.merchant, total: result.total, items: result.items });\\n});"
  }`;

function updateProjectData(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/"title":\s*"NoteNow",[\s\S]*?"category":\s*"Mobile Apps",/, '"title": "NoteNow",\n    "year": "2024",\n    "category": "Web Platforms",');
    content = content.replace(/"title":\s*"NotemeNow",[\s\S]*?"category":\s*"Mobile Apps",/, '"title": "NotemeNow",\n    "year": "2024",\n    "category": "Web Platforms",');
    
    let notemeNowBlock = content.match(/\{\s*"id":\s*"(feat-2|proj-1)",\s*"title":\s*"Note[m]?eNow"[\s\S]*?\}/);
    if (notemeNowBlock) {
        let block = notemeNowBlock[0];
        block = block.replace(/"type":\s*"mobile",/, '"type": "web",');
        block = block.replace(/\s*"apkLink":\s*"[^"]*",?/, '');
        content = content.replace(notemeNowBlock[0], block);
    }

    if (filePath.includes('projectData.ts')) {
        content = content.replace(/export const projects: Project\[\] = \[/, "export const projects: Project[] = [\\n" + soloflow + ",\\n" + splitwiser + ",");
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

updateProjectData('data/projectData.ts');

let featContent = fs.readFileSync('data/featuredProjectsData.ts', 'utf8');

featContent = featContent.replace(/"title":\s*"NoteNow",[\s\S]*?"category":\s*"Mobile Apps",/, '"title": "NoteNow",\n        "subtitle": "Cloud-Synced Markdown Editor",\n        "description": "A minimal, intuitive note-taking app featuring real-time synchronization, Firebase integration, and PWA capabilities.",\n        "techStack": ["React.js", "Firebase", "Markdown", "PWA"],\n        "category": "Web Platforms",');
featContent = featContent.replace(/"title":\s*"NotemeNow",[\s\S]*?"category":\s*"Mobile Apps",/, '"title": "NotemeNow",\n        "subtitle": "Cloud-Synced Markdown Editor",\n        "description": "A minimal, intuitive note-taking app featuring real-time synchronization, Firebase integration, and PWA capabilities.",\n        "techStack": ["React.js", "Firebase", "Markdown", "PWA"],\n        "category": "Web Platforms",');

let featNotemeNowBlock = featContent.match(/\{\s*"id":\s*"feat-2",\s*"title":\s*"Note[m]?eNow"[\s\S]*?\}/);
if (featNotemeNowBlock) {
    let block = featNotemeNowBlock[0];
    block = block.replace(/\s*"apkLink":\s*"[^"]*",?/, '');
    featContent = featContent.replace(featNotemeNowBlock[0], block);
}

const soloflowFeat = `    {
        "id": "feat-10",
        "title": "Soloflow",
        "subtitle": "AI Billing SaaS",
        "description": "A production-ready SaaS application for freelancers to manage clients, projects, time logs, and invoices — with Razorpay payment integration and GPT-4o AI proposal generation.",
        "techStack": ["Next.js", "Prisma", "NextAuth", "Razorpay"],
        "category": "Mobile Apps",
        "status": "Active",
        "accentColor": "#000000",
        "parallaxStrength": 0.2,
        "githubLink": "https://github.com/mohitlakhara-ind/soloflow",
        "liveLink": "https://soloflow-invoice.vercel.app",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1781679012/portfolio_projects/soloflow/dashboard_dark.png",
        "mockupType": "Desktop",
        "apkLink": "#"
    }`;

const splitwiserFeat = `    {
        "id": "feat-9",
        "title": "Splitwiser",
        "subtitle": "Expense Splitter",
        "description": "AI-powered multi-platform expense splitter with receipt OCR, Splitwise OAuth migration, and graph-based debt simplification.",
        "techStack": ["React Native", "Express", "Tailwind", "OCR"],
        "category": "Mobile Apps",
        "status": "Active",
        "accentColor": "#7C3AED",
        "parallaxStrength": 0.2,
        "githubLink": "https://github.com/mohitlakhara-ind/splitsmart",
        "liveLink": "https://web-gz8lisyvm-mohitlakhara-inds-projects.vercel.app",
        "coverImage": "https://res.cloudinary.com/dhjkbcdfm/image/upload/v1771612374/portfolio_projects/cover_feat-2.png",
        "mockupType": "Desktop",
        "apkLink": "#"
    }`;

featContent = featContent.replace(/export const featuredProjects: FeaturedProject\[\] = \[/, "export const featuredProjects: FeaturedProject[] = [\\n" + soloflowFeat + ",\\n" + splitwiserFeat + ",");
fs.writeFileSync('data/featuredProjectsData.ts', featContent, 'utf8');

console.log("Done");
