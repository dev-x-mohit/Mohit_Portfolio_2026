const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

require('dotenv').config({ path: path.join(__dirname, '.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const filesToUpload = [
  { file: 'banner.png', public_id: 'portfolio_projects/optikit/banner' },
  { file: 'modules_tab.png', public_id: 'portfolio_projects/optikit/modules_tab' },
  { file: 'playground_tab.png', public_id: 'portfolio_projects/optikit/playground_tab' },
  { file: 'overview_full.png', public_id: 'portfolio_projects/optikit/overview_full' }
];

async function uploadAll() {
  console.log("Starting Cloudinary uploads for OptiKit screenshots...");
  const results = {};

  for (const item of filesToUpload) {
    const filePath = path.join(__dirname, 'public', 'portfolio_projects', 'optikit', item.file);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    try {
      console.log(`Uploading ${item.file} -> ${item.public_id}...`);
      const res = await cloudinary.uploader.upload(filePath, {
        public_id: item.public_id,
        overwrite: true,
        invalidate: true,
        resource_type: 'image'
      });
      console.log(`✅ Uploaded ${item.file}:`, res.secure_url);
      results[item.file] = res.secure_url;
    } catch (err) {
      console.error(`❌ Error uploading ${item.file}:`, err.message);
    }
  }

  console.log("\n--- Cloudinary Upload Summary ---");
  console.log(JSON.stringify(results, null, 2));
}

uploadAll();
