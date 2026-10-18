import fs from 'fs';
import path from 'path';

const dir = 'd:/WEBKETCAU/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('<InlineMath') && !content.includes("from '../components/InlineMath'")) {
    content = "import { InlineMath } from '../components/InlineMath';\n" + content;
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Added import to ' + file);
  }
}
console.log('Done checking and fixing imports.');
