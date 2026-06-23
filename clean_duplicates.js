const fs = require('fs');

function cleanProjectData(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    let matchIndex = content.search(/\s*\{\s*"id":\s*"feat-8",/);
    if (matchIndex !== -1) {
        let newContent = content.substring(0, matchIndex);
        newContent = newContent.replace(/,\s*$/, '\n];\n');
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log("Cleaned " + filePath);
    } else {
        console.log("feat-8 not found in " + filePath);
    }
}

cleanProjectData('data/projectData.ts');
cleanProjectData('data/featuredProjectsData.ts');
