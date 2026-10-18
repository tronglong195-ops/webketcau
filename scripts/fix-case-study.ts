import fs from 'fs';

const filePath = 'd:/WEBKETCAU/src/pages/ProjectCaseStudyPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix StandardBanner
content = content.replace(
  '<StandardBanner standard="TCXDVN 356:2005" newStandard="TCVN 5574:2018" chapterName="Dự Án Thực Tế" />',
  '<StandardBanner volume="tap1" />'
);

// Fix FormulaBlock
let count = 1;
content = content.replace(/<FormulaBlock\s+formula=([\s\S]*?)\s+citation=([\s\S]*?)\s*\/>/g, (_m, f, c) => {
  const num = `"(DA.${count++})"`;
  return `<FormulaBlock\n                    number=${num}\n                    source=${c}\n                    latex=${f}\n                  />`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Updated ProjectCaseStudyPage.tsx with ${count - 1} formula blocks fixed.`);
