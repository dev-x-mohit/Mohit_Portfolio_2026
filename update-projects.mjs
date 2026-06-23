import fs from 'fs';

const filePath = './data/projectData.ts';
let fileContent = fs.readFileSync(filePath, 'utf8');

const prefixRegex = /(export const projects:\s*Project\[\]\s*=\s*)(\[[\s\S]*\]);/m;
const match = fileContent.match(prefixRegex);
if (!match) throw new Error("Could not find projects array");

const projectsJsonStr = match[2];
let projects;
try {
    projects = eval('(' + projectsJsonStr + ')');
} catch(e) {
    console.error("Failed to eval projects array", e);
    process.exit(1);
}

async function fetchRepoData(repoName) {
    if(!repoName) return null;
    const res = await fetch(`https://api.github.com/repos/mohitlakhara-ind/${repoName}`);
    if(!res.ok) return null;
    const data = await res.json();
    
    const readmeRes = await fetch(`https://api.github.com/repos/mohitlakhara-ind/${repoName}/readme`);
    let readmeText = '';
    if(readmeRes.ok) {
        const readmeData = await readmeRes.json();
        readmeText = Buffer.from(readmeData.content, 'base64').toString('utf8');
    }
    
    return { data, readmeText };
}

async function processProjects() {
    let validProjects = [];
    
    for (let p of projects) {
        if(p.githubLink && p.githubLink.includes('github.com')) {
            const urlParts = p.githubLink.split('/');
            const repoName = urlParts[urlParts.length - 1];
            console.log("Fetching: " + repoName);
            
            const repoInfo = await fetchRepoData(repoName);
            if(repoInfo) {
                p.stats = {
                    commits: p.stats?.commits || 0, // Github doesn't give total commits in repo endpoint
                    stars: repoInfo.data.stargazers_count,
                    topLanguage: repoInfo.data.language || 'Unknown',
                    issues: repoInfo.data.open_issues_count
                };
                
                let text = repoInfo.readmeText;
                if(!text || text.trim() === '') {
                    text = repoInfo.data.description || p.summary || '';
                }
                
                if(text.length > 1000) {
                    text = text.substring(0, 1000) + '...';
                }
                p.description = text;
                
                validProjects.push(p);
            } else {
                console.log("Not found (FAKE): " + repoName);
                // User said "no fake thing should be there". We drop it or keep it?
                // Dropping it.
            }
        } else {
            console.log("No valid github link for: " + p.title + ", dropping it.");
        }
    }
    
    const newProjectsStr = JSON.stringify(validProjects, null, 2);
    const newFileContent = fileContent.replace(prefixRegex, `$1${newProjectsStr};`);
    fs.writeFileSync(filePath, newFileContent);
    console.log("Done updating projectData.ts");
}

processProjects();
