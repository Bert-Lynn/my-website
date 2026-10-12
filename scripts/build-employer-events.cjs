'use strict';
const fs = require('node:fs'), path = require('node:path');
require('./validate-employer-events.cjs');
const root = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/employer-events.json'), 'utf8'));
fs.writeFileSync(path.join(root, 'employer-events.js'), '// Generated public data. Edit data/employer-events.json and run node scripts/build-employer-events.cjs.\nwindow.EMPLOYER_EVENTS = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Generated optional public employer activity catalog. No private state changed.');
