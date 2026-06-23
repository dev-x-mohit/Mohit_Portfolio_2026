const fs = require('fs');

const path1 = 'data/projectData.ts';
const path2 = 'data/featuredProjectsData.ts';

function updateCategories(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Mappings
    content = content.replace(/"category":\s*"Frontend Web"/g, '"category": "Frontend"');
    content = content.replace(/"category":\s*"Frontend Game"/g, '"category": "Frontend"');
    content = content.replace(/"category":\s*"Regex"/g, '"category": "Algorithms & Utils"');
    content = content.replace(/"category":\s*"Freelance Fullstack"/g, '"category": "Fullstack"');
    
    // In case single quotes are used
    content = content.replace(/'category':\s*'Frontend Web'/g, "'category': 'Frontend'");
    content = content.replace(/'category':\s*'Frontend Game'/g, "'category': 'Frontend'");
    content = content.replace(/'category':\s*'Regex'/g, "'category': 'Algorithms & Utils'");
    content = content.replace(/'category':\s*'Freelance Fullstack'/g, "'category': 'Fullstack'");

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

updateCategories(path1);
updateCategories(path2);
