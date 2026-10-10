'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
require('./validate-career-data.cjs');
const catalogs=[['data/internships.json','internship-data.js','INTERNSHIP_DATA'],['data/career-curriculum.json','career-curriculum.js','CAREER_CURRICULUM'],['data/learning-modules.json','learning-modules.js','LEARNING_MODULES'],['data/project-outline.json','project-outline.js','PROJECT_OUTLINE']];
for(const [input,output,name] of catalogs){const data=JSON.parse(fs.readFileSync(path.join(root,input),'utf8'));fs.writeFileSync(path.join(root,output),'// Generated public data. Edit '+input+' and run node scripts/build-career-data.cjs.\nwindow.'+name+' = '+JSON.stringify(data,null,2)+';\n');}
console.log('Generated public curriculum and internship catalogs.');
