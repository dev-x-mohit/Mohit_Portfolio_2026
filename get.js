const cp = require('child_process');
const data = cp.execSync('git show 47e504d:data/projectData.ts').toString();
const lines = data.split('\n');
let start = -1;
let end = -1;
for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('"title": "Splitwiser"')) {
    start = i;
    break;
  }
}
if (start !== -1) {
  while(start > 0 && !lines[start].includes('{')) start--;
  let braces = 0;
  for(let i=start; i<lines.length; i++){
    if(lines[i].includes('{')) braces++;
    if(lines[i].includes('}')) braces--;
    if(braces === 0) {
      end = i;
      break;
    }
  }
  const fs = require('fs');
  fs.writeFileSync('splitwiser.json', lines.slice(start, end+1).join('\n'));
}
