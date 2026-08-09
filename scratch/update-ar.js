import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const publicDir = path.join(projectRoot, 'public');
const dataFilePath = path.join(projectRoot, 'lib', 'data', 'portfolioData.ts');

async function updateAspectRatios() {
  let content = fs.readFileSync(dataFilePath, 'utf8');
  
  const srcRegex = /"src":\s*"([^"]+)"/g;
  let match;
  const imageMap = new Map();

  while ((match = srcRegex.exec(content)) !== null) {
    const srcPath = match[1];
    const fullPath = path.join(publicDir, srcPath);
    if (fs.existsSync(fullPath)) {
      try {
        const metadata = await sharp(fullPath).metadata();
        if (metadata.width && metadata.height) {
          const ar = Number((metadata.width / metadata.height).toFixed(4));
          imageMap.set(srcPath, ar);
        }
      } catch (err) {
        console.error('Error reading', fullPath, err.message);
      }
    }
  }

  console.log('Found dimensions for', imageMap.size, 'images.');

  let updatedContent = content.replace(/\{\s*"src":\s*"([^"]+)",\s*"originalSrc":\s*"([^"]+)",\s*"placeholder":\s*"([^"]+)",\s*"aspectRatio":\s*[\d\.]+/g, (m, src, orig, ph) => {
    const realAr = imageMap.get(src) || 1.5;
    return `{\n\t\t\t\t"src": "${src}",\n\t\t\t\t"originalSrc": "${orig}",\n\t\t\t\t"placeholder": "${ph}",\n\t\t\t\t"aspectRatio": ${realAr}`;
  });

  fs.writeFileSync(dataFilePath, updatedContent, 'utf8');
  console.log('Successfully updated portfolioData.ts with REAL image aspect ratios!');
}

updateAspectRatios();
