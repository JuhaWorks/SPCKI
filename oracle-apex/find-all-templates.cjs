const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'app100_export.sql'), 'utf8');

const regex = /create_plug_template\(\s*p_id=>wwv_flow_api\.id\((\d+)\)[\s\S]*?p_page_plug_template_name=>'([^']+)'/g;

let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Region Template: ${match[1]} - ${match[2]}`);
}

const btnRegex = /create_button_templates\(\s*p_id=>wwv_flow_api\.id\((\d+)\)[\s\S]*?p_template_name=>'([^']+)'/g;
while ((match = btnRegex.exec(content)) !== null) {
  console.log(`Button Template: ${match[1]} - ${match[2]}`);
}

const fieldRegex = /create_field_template\(\s*p_id=>wwv_flow_api\.id\((\d+)\)[\s\S]*?p_template_name=>'([^']+)'/g;
while ((match = fieldRegex.exec(content)) !== null) {
  console.log(`Field Template: ${match[1]} - ${match[2]}`);
}
