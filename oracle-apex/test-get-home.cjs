const http = require('http');

const url = 'http://202.84.45.58:8999/bkb/solar_cook/r/spcki-monitoring-platform/home';

http.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers location:', res.headers.location);
    if (res.headers.location) {
      console.log('Redirected to:', res.headers.location);
    }
  });
}).on('error', err => console.error(err.message));
