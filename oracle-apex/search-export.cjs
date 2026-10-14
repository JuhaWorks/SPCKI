const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'app100_export.sql'), 'utf8');

function showSection(term, len = 600) {
  const pos = content.indexOf(term);
  if (pos !== -1) {
    console.log(`=== FOUND "${term}" at pos ${pos} ===`);
    console.log(content.substr(pos, len));
  } else {
    console.log(`=== NOT FOUND "${term}" ===`);
  }
}

showSection('create_page_button(');
showSection('create_page_plug(');
showSection('create_page_item(');
