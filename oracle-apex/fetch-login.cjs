const http = require('http');
const fs = require('fs');

http.get('http://202.84.45.58:8999/bkb/solar_cook/r/spcki-monitoring-platform/login', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    fs.writeFileSync('login_page.html', body);
    console.log('Saved login_page.html, length:', body.length);
    
    // Look for '); }' or similar
    const lines = body.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes("');") || line.includes("'); }") || line.includes("': }") || line.includes("'}")) {
        console.log(`Line ${idx + 1}: ${line}`);
      }
    });

    // Check first 30 lines of body
    console.log('\n--- First 30 lines of page ---');
    lines.slice(0, 30).forEach((l, i) => console.log(`${i+1}: ${l}`));
  });
}).on('error', console.error);
