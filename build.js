const fs = require('fs');
const path = require('path');

const distDir = './dist';

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}

fs.mkdirSync(distDir, { recursive: true });

const files = [
  'index.html',
  '叠檐侗韵.html',
  '粉墙黛瓦.html',
  '紫禁飞檐.html',
  '小黄.png',
  '小绿.png',
  '小红.png',
  '背景2.jpg'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    copyFile(file, path.join(distDir, file));
    console.log(`Copied: ${file}`);
  }
});

console.log('Build completed successfully!');
