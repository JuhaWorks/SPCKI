const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'app100_export.sql'), 'utf8');

const p1Start = content.indexOf('prompt --application/pages/page_00001');
const p2Start = content.indexOf('prompt --application/pages/page_00002');

if (p1Start !== -1 && p2Start !== -1) {
  console.log(content.substring(p1Start, p2Start));
} else {
  console.log('Not found, p1Start:', p1Start, 'p2Start:', p2Start);
}
