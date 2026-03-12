import puppeteer from 'puppeteer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Pages to capture
const PAGES = [
    {
        id: 'home',
        path: '/',
        label: 'Home',
        publicId: 'portfolio/og-home',
    },
    {
        id: 'about',
        path: '/about',
        label: 'About',
        publicId: 'portfolio/og-about',
    },
    {
        id: 'projects',
        path: '/projects',
        label: 'Projects',
        publicId: 'portfolio/og-projects',
    },
    {
        id: 'contact',
        path: '/contact',
        label: 'Contact',
        publicId: 'portfolio/og-contact',
    },
];

const BASE_URL = 'https://mohitlakhara.vercel.app';
const VIEWPORT = { width: 1200, height: 630 };

async function uploadToCloudinary(filePath, publicId) {
    console.log(`  ☁  Uploading to Cloudinary (${publicId})...`);
    const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: true,
        format: 'webp',
        transformation: [{ width: 1200, height: 630, crop: 'fill' }],
    });
    return result.secure_url;
}

async function capture() {
    console.log('\n🚀 Starting Puppeteer screenshot + Cloudinary upload...\n');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const results = {};

    for (const pg of PAGES) {
        const url = `${BASE_URL}${pg.path}`;
        const outputPath = path.join(
            __dirname, '..', 'public', 'images', `og-${pg.id}.webp`
        );

        console.log(`📸 [${pg.label}] Navigating to ${url}`);
        const page = await browser.newPage();
        await page.setViewport(VIEWPORT);
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

        // Extra wait for animations/fonts to settle
        await new Promise(r => setTimeout(r, 4000));

        await page.screenshot({ path: outputPath, type: 'webp', quality: 90 });
        await page.close();
        console.log(`  ✅ Screenshot saved: ${outputPath}`);

        // Upload to Cloudinary
        const cloudUrl = await uploadToCloudinary(outputPath, pg.publicId);
        results[pg.id] = cloudUrl;
        console.log(`  🔗 Cloudinary URL: ${cloudUrl}\n`);
    }

    await browser.close();

    // Save URLs to JSON for use in metadata
    const outputJson = path.join(__dirname, 'og-urls.json');
    writeFileSync(outputJson, JSON.stringify(results, null, 2));
    console.log(`\n✨ All done! URLs saved to ${outputJson}`);
    console.log(JSON.stringify(results, null, 2));
}

capture().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
