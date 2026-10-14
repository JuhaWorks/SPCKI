const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'app100_export.sql'), 'utf8');

const p2Start = content.indexOf('prompt --application/pages/page_00002');
const p3Start = content.indexOf('prompt --application/pages/page_00003');

if (p2Start !== -1 && p3Start !== -1) {
  console.log(content.substring(p2Start, p3Start));
}
