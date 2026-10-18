import fs from 'fs';
import path from 'path';
import katex from 'katex';

const dir = 'd:/WEBKETCAU/src';
let count = 0;
let errors = 0;

function walk(currentDir: string) {
  for (const item of fs.readdirSync(currentDir)) {
    const full = path.join(currentDir, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      const regexes = [
        /latex="([^"]*)"/g,
        /latex=\{`([\s\S]*?)`\}/g,
        /latex=\{'([\s\S]*?)'\}/g,
        /latex=\{"([\s\S]*?)"\}/g,
      ];
      for (const regex of regexes) {
        let match;
        while ((match = regex.exec(content)) !== null) {
          count++;
          const raw = match[1];
          try {
            katex.renderToString(raw, { throwOnError: true, displayMode: true, strict: 'ignore' });
          } catch (err: any) {
            errors++;
            console.log(`ERROR_FILE: ${full}`);
            console.log(`ERROR_MSG: ${err.message}`);
            console.log(`ERROR_RAW: ${raw}\n`);
          }
        }
      }
    }
  }
}

walk(dir);
console.log(`TOTAL: ${count} formulas, ${errors} errors.`);
