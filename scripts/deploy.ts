import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Đang chuẩn bị build & deploy lên GitHub Pages...');

// 1. Build
execSync('npm run build', { stdio: 'inherit' });

const distDir = path.resolve('dist');

// 2. Tạo .nojekyll
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

// 3. Tạo 404.html từ index.html
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));

// 4. Git init trong dist và push lên gh-pages
try {
  execSync('git init -b gh-pages', { cwd: distDir, stdio: 'pipe' });
  execSync('git add -A', { cwd: distDir, stdio: 'pipe' });
  execSync('git commit -m "deploy: update GitHub Pages build"', { cwd: distDir, stdio: 'pipe' });
  execSync('git push -f https://github.com/tronglong195-ops/webketcau.git gh-pages', {
    cwd: distDir,
    stdio: 'inherit'
  });
  console.log('\n✅ Deploy thành công lên nhánh gh-pages!');
  console.log('🌐 Truy cập tại: https://tronglong195-ops.github.io/webketcau/');
} catch (error) {
  console.error('❌ Lỗi khi deploy:', error);
  process.exit(1);
}
