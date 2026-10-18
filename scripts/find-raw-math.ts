import fs from 'fs';
import path from 'path';

const dir = 'd:/WEBKETCAU/src';
const filesMap = new Map<string, number>();

function walk(d: string) {
  for (const f of fs.readdirSync(d)) {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.tsx')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/\{'(\$|\\\\\()[\s\S]*?(\$|\\\\\))'\}/g);
      if (matches && matches.length > 0) {
        filesMap.set(full, matches.length);
      }
    }
  }
}
walk(dir);
console.log('Files with raw inline math strings:');
let total = 0;
filesMap.forEach((cnt, f) => {
  console.log(` - ${f}: ${cnt} occurrences`);
  total += cnt;
});
console.log(`Total occurrences: ${total}`);
