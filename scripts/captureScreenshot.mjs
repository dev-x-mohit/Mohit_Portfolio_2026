import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
    console.log('Starting Puppeteer...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to a standard desktop size for OpenGraph images
    await page.setViewport({ width: 1200, height: 630 });

    // We'll capture the live prod URL, or the local build if needed.
    // Using the canonical URL for the screenshot:
    const targetUrl = 'https://mohitlakhara.vercel.app';
    console.log(`Navigating to ${targetUrl}...`);

    // Wait until network is idle to ensure animations/fonts load
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 60000 });

    // Wait an extra 3 seconds for any GSAP/Framer Motion entrance animations to settle
    console.log('Waiting for enter animations to finish...');
    await new Promise(r => setTimeout(r, 3000));

    const outputPath = path.join(__dirname, '..', 'public', 'images', 'og-image-v4.webp');

    console.log(`Capturing screenshot to ${outputPath}...`);
    await page.screenshot({
        path: outputPath,
        type: 'webp',
        quality: 90
    });

    await browser.close();
    console.log('Capture complete!');
}

capture().catch(err => {
    console.error('Error capturing screenshot:', err);
    process.exit(1);
});
