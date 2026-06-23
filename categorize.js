const fs = require('fs');

const filePaths = ['data/projectData.ts', 'data/featuredProjectsData.ts'];

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add apkLink to interface
    if (!content.includes('apkLink?: string;')) {
        content = content.replace(/screenshots\?:\s*string\[\];/, "screenshots?: string[];\n  apkLink?: string;");
        content = content.replace(/mockupType:\s*string;/, "mockupType: string;\n    apkLink?: string;");
    }

    // 2. Intelligent Categorization based on Titles or Keywords
    // Split into chunks of projects to safely replace categories
    
    // We will do a simple string replace for now.
    // Gudgig, Ekovym -> Web Platforms
    // NoteNow, NotemeNow -> Mobile Apps
    // TxtXpert, QRGenie -> Algorithms & Utilities
    // Memory Game, Typechecky -> Games
    // Everything else UI-UX / Frontend -> Frontend Projects

    const titleToCategory = {
        'Gudgig': 'Web Platforms',
        'Ekovym': 'Web Platforms',
        'NoteNow': 'Mobile Apps',
        'NotemeNow': 'Mobile Apps',
        'SnapNews': 'Frontend Projects',
        'TxtXpert': 'Algorithms & Utilities',
        'CarBook': 'Frontend Projects',
        'QRGenie': 'Algorithms & Utilities',
        'Memory Game': 'Games',
        'Typechecky': 'Games',
        'Task Management App': 'Frontend Projects',
        'Anime Universe': 'Frontend Projects',
        'Cial Finance': 'Frontend Projects',
        'Nexus': 'Web Platforms',
    };

    // We can use a regex to match the title and then replace the category in the same block.
    // Since it's a bit complex in a flat regex, we will just globally replace the old categories with the new default,
    // and then we will manually fix them if needed, or we can use a more sophisticated match.

    // Let's iterate over each project block using regex
    const projectBlockRegex = /\{\s*"id":\s*"(feat-\d+|proj-\d+)",\s*"title":\s*"([^"]+)",[\s\S]*?\}/g;
    
    content = content.replace(projectBlockRegex, (match, id, title) => {
        let newCategory = 'Frontend Projects'; // default
        if (titleToCategory[title]) {
            newCategory = titleToCategory[title];
        }

        // Replace the category field
        let updatedBlock = match.replace(/"category":\s*"[^"]+"/, `"category": "${newCategory}"`);
        updatedBlock = updatedBlock.replace(/'category':\s*'[^']+'/, `'category': '${newCategory}'`);
        
        // Add apkLink if Mobile App
        if (newCategory === 'Mobile Apps' && !updatedBlock.includes('apkLink')) {
            updatedBlock = updatedBlock.replace(/"type":\s*"[^"]+"/, `"type": "mobile",\n    "apkLink": "#"`);
        }

        return updatedBlock;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed ${filePath}`);
}

filePaths.forEach(processFile);
