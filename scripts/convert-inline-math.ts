import fs from 'fs';
import path from 'path';

const dir = 'd:/WEBKETCAU/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let totalReplacements = 0;

for (const file of files) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  let fileReplacements = 0;

  // Regex 1: {'$...$'}
  const dollarRegex = /\{'\$([\s\S]*?)\$'\}/g;
  content = content.replace(dollarRegex, (_match, math) => {
    fileReplacements++;
    // escape internal quotes if needed or use template string/attr
    const cleanMath = math.replace(/"/g, '&quot;');
    return `<InlineMath math="${cleanMath}" />`;
  });

  // Regex 2: {'\(...\)'}
  const parenRegex = /\{'\\\\\(([\s\S]*?)\\\\\)'\}/g;
  content = content.replace(parenRegex, (_match, math) => {
    fileReplacements++;
    const cleanMath = math.replace(/"/g, '&quot;');
    return `<InlineMath math="${cleanMath}" />`;
  });

  if (fileReplacements > 0) {
    totalReplacements += fileReplacements;
    // Add import if not present
    if (!content.includes('InlineMath')) {
      // Find the first import line and insert after it
      content = `import { InlineMath } from '../components/InlineMath';\n` + content;
    }
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}: ${fileReplacements} replacements.`);
  }
}

console.log(`\nTotal inline math replaced: ${totalReplacements}`);
