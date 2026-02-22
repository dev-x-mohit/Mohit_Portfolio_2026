import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { projects } from '../data/projectData';

// Load environment variables from .env
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PROJECT_DATA_PATH = path.join(__dirname, '../data/projectData.ts');

/**
 * Uploads a local file to Cloudinary and returns the secure URL
 */
async function uploadToCloudinary(filePath: string, publicId: string): Promise<string> {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'portfolio_projects',
            public_id: publicId,
            overwrite: true,
            resource_type: "image"
        });
        return result.secure_url;
    } catch (e: any) {
        console.error(`Cloudinary upload failed for ${publicId}:`, e.message);
        return "";
    }
}

/**
 * Fetches the README from GitHub and extracts a quick summary
 */
async function fetchGithubDetails(githubUrl: string): Promise<{ description?: string, features?: string[] }> {
    try {
        const urlObj = new URL(githubUrl);
        const pathSegments = urlObj.pathname.split('/').filter(Boolean);
        if (pathSegments.length < 2) return {};

        const [owner, repo] = pathSegments;
        let readmeContent = "";

        // Try main branch first, then master
        for (const branch of ['main', 'master']) {
            const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
            const res = await fetch(rawUrl);
            if (res.ok) {
                readmeContent = await res.text();
                break;
            }
        }

        if (!readmeContent) return {};

        // Hacky extraction for demonstration (extract first paragraph after title)
        const lines = readmeContent.split('\n').map(l => l.trim()).filter(Boolean);
        let description = "";

        // Find the first non-heading paragraph
        const descLineIndex = lines.findIndex(l => !l.startsWith('#') && !l.startsWith('!') && l.length > 20);
        if (descLineIndex !== -1) {
            description = lines[descLineIndex].replace(/[\[\]\(\)]/g, '').substring(0, 150) + "...";
        }

        return { description };
    } catch (e) {
        console.error("Failed to fetch Github details for " + githubUrl);
        return {};
    }
}

async function run() {
    console.log("Starting automated project generation...");

    // Check missing creds
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_CLOUD_API_KEY) {
        throw new Error("Missing Cloudinary credentials in .env file! Please save the .env file.");
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const updatedProjects = [...projects];

    for (let i = 0; i < updatedProjects.length; i++) {
        const proj = updatedProjects[i];
        console.log(`\nProcessing [${i + 1}/${updatedProjects.length}]: ${proj.title}...`);

        // 1. Snapshot Live Link
        if (proj.liveLink && proj.liveLink.startsWith("http")) {
            console.log(`  Taking screenshot of ${proj.liveLink}`);
            try {
                // Ensure page loads
                await page.goto(proj.liveLink, { waitUntil: 'networkidle2', timeout: 30000 });
                // Optional: Wait an extra second for animations
                await new Promise(resolve => setTimeout(resolve, 2000));

                const tempPath = path.join(__dirname, `temp_${proj.id}.png`);
                await page.screenshot({ path: tempPath });

                // 2. Upload to Cloudinary
                console.log(`  Uploading screenshot to Cloudinary...`);
                const cdnUrl = await uploadToCloudinary(tempPath, `cover_${proj.id}`);
                if (cdnUrl) {
                    proj.coverImage = cdnUrl;
                    console.log(`  Upload successful: ${cdnUrl}`);
                }

                // Cleanup local temp file
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

            } catch (err: any) {
                console.log(`  Failed to screenshot ${proj.liveLink}: ${err.message}`);
            }
        }

        // 3. GitHub Fetch logic
        if (proj.githubLink) {
            console.log(`  Fetching details from GitHub...`);
            const details = await fetchGithubDetails(proj.githubLink);
            if (details.description && details.description.length > 20) {
                proj.description = details.description;
                console.log(`  Updated description!`);
            }
        }
    }

    await browser.close();

    // 4. Update data/projectData.ts file
    console.log("\nRe-writing projectData.ts with new CDN links and descriptions...");

    // We rewrite the file entirely to inject the new array
    const fileContent = `export interface Project {
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

export const projects: Project[] = ${JSON.stringify(updatedProjects, null, 2)};
`;

    fs.writeFileSync(PROJECT_DATA_PATH, fileContent, "utf8");
    console.log("Done! projectData.ts updated successfully.");
}

run().catch(err => {
    console.error("Automation error:", err);
    process.exit(1);
});
