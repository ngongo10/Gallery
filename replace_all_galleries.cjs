const fs = require('fs');
const path = require('path');

// Helper to get all images in a dir
function getImages(dirName) {
  const dirPath = path.join(__dirname, 'public', 'images', dirName);
  let files = [];
  try {
    files = fs.readdirSync(dirPath);
  } catch (e) {
    return [];
  }
  
  return files.filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.jpeg')).map(f => {
    // Alternate aspect ratios slightly for visual variety
    const ar = Math.random() > 0.5 ? 1.5 : 0.75;
    return {
      src: `/images/${dirName}/${f}`,
      placeholder: '#202020',
      aspectRatio: ar
    };
  });
}

const oseanImages = getImages('osean');
const portraitImages = getImages('portrait');
const whiteMoonlightImages = getImages('white-moonlight');

let content = fs.readFileSync('lib/data/portfolioData.ts', 'utf8');
const startIdx = content.indexOf('series: [');
const endIdx = content.indexOf('shop: [');

if (startIdx !== -1 && endIdx !== -1) {
  const newSeries = `series: [
    {
      id: "osean",
      title: "OCEAN",
      year: "2026",
      essay: "A deep dive into the calm and turbulent moods of the sea. These images explore the vastness of the ocean, highlighting the interplay of light and water.",
      images: ${JSON.stringify(oseanImages, null, 8)}
    },
    {
      id: "portrait",
      title: "PORTRAIT",
      year: "2026",
      essay: "Intimate and expressive portraiture capturing human emotion and character. This series emphasizes subtle lighting and raw authenticity.",
      images: ${JSON.stringify(portraitImages, null, 8)}
    },
    {
      id: "white-moonlight",
      title: "WHITE MOONLIGHT",
      year: "2026",
      essay: "Ethereal, high-key photography inspired by the concept of 'White Moonlight'. The visual narrative revolves around pure, nostalgic, and dreamy aesthetics.",
      images: ${JSON.stringify(whiteMoonlightImages, null, 8)}
    }
  ],\n  `;
  
  content = content.substring(0, startIdx) + newSeries + content.substring(endIdx);
  fs.writeFileSync('lib/data/portfolioData.ts', content, 'utf8');
  console.log("Successfully replaced galleries with ALL images.");
} else {
  console.log("Could not find start/end indices.");
}
