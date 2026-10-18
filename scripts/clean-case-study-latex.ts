import fs from 'fs';

const filePath = 'd:/WEBKETCAU/src/pages/ProjectCaseStudyPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/\\text\{Nhịp biên\}/g, '\\text{(Nhip bien)}');
content = content.replace(/\\text\{Nhịp giữa\}/g, '\\text{(Nhip giua)}');
content = content.replace(/\\text\{Gối tựa trên dầm phụ\}/g, '\\text{(Goi tua)}');
content = content.replace(/\\text\{Gối tựa trên dầm chính\}/g, '\\text{(Goi tua)}');
content = content.replace(/\\text\{Ngàm đáy\}/g, '\\text{(Ngam day)}');

// Fix column template literals in FormulaBlock
content = content.replace(
  'latex={`e_0 = \\\\frac{M}{N} = \\\\frac{${colM} \\\\times 10^3}{${colN}} = ${e0.toFixed(1)}\\\\text{ mm}, \\\\quad e_a = \\\\max\\\\left(\\\\frac{h}{30}, 10\\\\right) = ${ea.toFixed(1)}\\\\text{ mm}`}',
  'latex="e_0 = \\\\frac{M}{N} = \\\\frac{145 \\\\times 10^3}{1250} = 116\\\\text{ mm}, \\\\quad e_a = \\\\max\\\\left(\\\\frac{h}{30}, 10\\\\right) = 13.3\\\\text{ mm}"'
);

content = content.replace(
  'latex={`e = \\\\eta \\\\cdot e_0 + \\\\left(\\\\frac{h}{2} - a\\\\right) = 1.05 \\\\times ${e0.toFixed(1)} + (${colH / 2} - 40) = ${e.toFixed(1)}\\\\text{ mm}`}',
  'latex="e = \\\\eta \\\\cdot e_0 + \\\\left(\\\\frac{h}{2} - a\\\\right) = 1.05 \\\\times 116 + (200 - 40) = 281.8\\\\text{ mm}"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned LaTeX in ProjectCaseStudyPage.tsx');
