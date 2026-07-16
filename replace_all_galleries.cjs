const fs = require('fs');
const path = require('path');

const IMAGES_ROOT = path.join(__dirname, 'public', 'images');
const SERIES_METADATA = {
  osean: {
    title: 'OCEAN',
    year: '2026',
    essay: 'A deep dive into the calm and turbulent moods of the sea. These images explore the vastness of the ocean, highlighting the interplay of light and water.',
  },
  portrait: {
    title: 'PORTRAIT',
    year: '2026',
    essay: 'Intimate and expressive portraiture capturing human emotion and character. This series emphasizes subtle lighting and raw authenticity.',
  },
  'white-moonlight': {
    title: 'WHITE MOONLIGHT',
    year: '2026',
    essay: 'Ethereal, high-key photography inspired by the concept of White Moonlight. The visual narrative revolves around pure, nostalgic, and dreamy aesthetics.',
  },
  'grass': {
    title: 'GRASS',
    year: '2026',
    essay: 'Resilient and simple creations of nature. This series captures the quiet, calming, and lush green atmosphere of grass dancing under sunbeams.',
  },
  'men-studio': {
    title: 'MEN STUDIO',
    year: '2026',
    essay: 'A series of bold, minimal, and classic men portraits taken inside a controlled studio lighting setup.',
  },
  'mysterious-light': {
    title: 'MYSTERIOUS LIGHT',
    year: '2026',
    essay: 'Chasing the dramatic interplay of deep shadows and single sharp beams of light to construct a mysterious visual poetry.',
  },
  'Graduation Photography': {
    title: 'GRADUATION',
    year: '2026',
    essay: 'Capturing unforgettable milestones, youthfulness, and hopeful eyes looking forward to the future on graduation day.',
  },
};

function slugToTitle(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function listSeriesFolders() {
  try {
    return fs.readdirSync(IMAGES_ROOT, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch (error) {
    console.error(`Could not read image root: ${IMAGES_ROOT}`);
    return [];
  }
}

function getImages(dirName) {
  const dirPath = path.join(IMAGES_ROOT, dirName);
  let files = [];

  try {
    files = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);
  } catch (error) {
    console.error(`Could not read folder: ${dirPath}`);
    return [];
  }

  return files
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort()
    .map((file, index) => ({
      src: `/images/${dirName}/${file}`,
      placeholder: '#202020',
      aspectRatio: index % 2 === 0 ? 1.5 : 0.75,
    }));
}

function buildSeries() {
  const folders = listSeriesFolders();
  return folders.map((folderName) => {
    const meta = SERIES_METADATA[folderName] || {
      title: slugToTitle(folderName).toUpperCase(),
      year: '2026',
      essay: `A curated gallery of images from ${slugToTitle(folderName)}.`,
    };

    return {
      id: folderName,
      title: meta.title,
      year: meta.year,
      essay: meta.essay,
      images: getImages(folderName),
    };
  });
}

const series = buildSeries();
const seriesJson = JSON.stringify(series, null, 8).slice(1, -1);
let content = fs.readFileSync('lib/data/portfolioData.ts', 'utf8');
const startIdx = content.indexOf('series: [');
const endIdx = content.indexOf('shop: [');

if (startIdx !== -1 && endIdx !== -1) {
  const newSeries = `series: [\n${seriesJson}\n  ],\n  `;
  content = content.substring(0, startIdx) + newSeries + content.substring(endIdx);
  fs.writeFileSync('lib/data/portfolioData.ts', content, 'utf8');
  console.log('Successfully regenerated portfolio series for folders:', listSeriesFolders().join(', '));
} else {
  console.error('Could not find series/shop boundary in lib/data/portfolioData.ts');
}
