const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'app100_export.sql'), 'utf8');

const regex = /create_template\(\s*p_id=>wwv_flow_api\.id\((\d+)\)[\s\S]*?p_name=>'([^']+)'[\s\S]*?p_theme_class_id=>(\d+)/g;

let match;
const templates = [];
while ((match = regex.exec(content)) !== null) {
  templates.push({ id: match[1], name: match[2], themeClass: match[3] });
}

console.log('Templates found:', templates.length);
templates.forEach(t => console.log(`${t.id}: ${t.name} (Class: ${t.themeClass})`));
