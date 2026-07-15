const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size'); // Wait, image-size might not be installed, we can just use random aspects or alternate like before.

function getImages(dirName) {
  const dirPath = path.join(__dirname, 'public', 'images', dirName);
  let files = [];
  try {
    files = fs.readdirSync(dirPath);
  } catch (e) {
    return [];
  }
  
  return files.filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.jpeg')).map(f => {
    const ar = Math.random() > 0.5 ? 1.5 : 0.75; // Or we can use alternate
    return {
      src: `/images/${dirName}/${f}`,
      placeholder: '#304020', // greenish placeholder
      aspectRatio: ar
    };
  });
}

const grassImages = getImages('grass');

let content = fs.readFileSync('lib/data/portfolioData.ts', 'utf8');

const newSeriesObj = {
  id: "grass",
  title: "GRASS",
  year: "2026",
  essay: "A vibrant exploration of nature's simplest yet most resilient creation. These images capture the delicate textures, dynamic movements, and refreshing hues of grass in various environments.",
  images: grassImages
};

// We will insert this into portfolioData.ts right before the end of the series array.
const insertPos = content.lastIndexOf('    }\n  ],\n  shop: [');

if (insertPos !== -1) {
  // It matches '    }\n  ],\n  shop: ['
  // We need to add a comma after the last object.
  // Wait, let's just do a regex replace to be safe.
  
  const endSeriesStr = '    }\n  ],\n  shop: [';
  const newStr = '    },\n    ' + JSON.stringify(newSeriesObj, null, 6).replace(/\n/g, '\n    ') + '\n  ],\n  shop: [';
  
  content = content.replace(endSeriesStr, newStr);
  fs.writeFileSync('lib/data/portfolioData.ts', content, 'utf8');
  console.log("Successfully added grass gallery.");
} else {
  // Try another match
  const match2 = '    }\n  ],\n  shop:';
  if (content.includes(match2)) {
    content = content.replace(match2, '    },\n    ' + JSON.stringify(newSeriesObj, null, 4).replace(/\n/g, '\n    ') + '\n  ],\n  shop:');
    fs.writeFileSync('lib/data/portfolioData.ts', content, 'utf8');
    console.log("Successfully added grass gallery (match 2).");
  } else {
      console.log("Could not find insertion point.");
  }
}
