// Preflight check. Run: node scripts/check-setup.mjs
import { existsSync } from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failed = false;
const ok = (m) => console.log('  OK    ' + m);
const warn = (m) => console.log('  WARN  ' + m);
const bad = (m) => { console.log('  FAIL  ' + m); failed = true; };
console.log('\nUpNorth.org setup check\nFolder: ' + root + '\n');
existsSync(path.join(root, 'package.json')) ? ok('package.json found') : bad('package.json not found. Extract the WHOLE zip, then run this from inside the upnorth folder.');
const [maj, min] = process.versions.node.split('.').map(Number);
maj > 18 || (maj === 18 && min >= 17) ? ok('Node ' + process.version) : bad('Node ' + process.version + ' is too old. Install Node 20 LTS from https://nodejs.org');
for (const d of ['app', 'data', 'components', 'lib', 'public/images']) existsSync(path.join(root, d)) ? ok(d + '/ found') : bad(d + '/ is missing. The zip was not fully extracted.');
existsSync(path.join(root, 'node_modules')) ? ok('packages installed') : warn('packages not installed yet (setup will run npm install)');
existsSync(path.join(root, '.env.local')) ? ok('.env.local found') : warn('.env.local missing. That is fine: the site runs in demo mode.');
await new Promise((resolve) => {
  const req = https.get('https://fonts.googleapis.com/css2?family=Fraunces', { timeout: 4000 }, (res) => { res.resume(); ok('Google Fonts reachable'); resolve(); });
  req.on('error', () => { warn('Cannot reach Google Fonts. The site downloads its fonts at build time, so it needs internet.'); resolve(); });
  req.on('timeout', () => req.destroy());
});
console.log(failed ? '\nFix the FAIL lines above, then try again.\n' : '\nAll good.\n');
process.exit(failed ? 1 : 0);
