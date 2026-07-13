const fs = require('fs');
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
      images: [
        { src: "/images/osean/1108237420831272260.jpg", placeholder: "#2d3a4b", aspectRatio: 0.75 },
        { src: "/images/osean/1108237420831272345.jpg", placeholder: "#42576b", aspectRatio: 1.5 },
        { src: "/images/osean/1108237420831272412.jpg", placeholder: "#202c38", aspectRatio: 1.5 },
        { src: "/images/osean/1108237420831272424.jpg", placeholder: "#1b2530", aspectRatio: 0.75 },
        { src: "/images/osean/1108237420831272428.jpg", placeholder: "#42566c", aspectRatio: 1.5 },
        { src: "/images/osean/1108237420831272440.jpg", placeholder: "#334659", aspectRatio: 1.4 }
      ]
    },
    {
      id: "portrait",
      title: "PORTRAIT",
      year: "2026",
      essay: "Intimate and expressive portraiture capturing human emotion and character. This series emphasizes subtle lighting and raw authenticity.",
      images: [
        { src: "/images/portrait/0505276dcaa53a08facc7774d01224f7.jpg", placeholder: "#5c4f45", aspectRatio: 0.75 },
        { src: "/images/portrait/0742c8a7a057634bf6e15c3f920ece9b.jpg", placeholder: "#453b34", aspectRatio: 1.5 },
        { src: "/images/portrait/0fb42351c4ddf68288e31b205d3661ef.jpg", placeholder: "#6b5c51", aspectRatio: 0.75 },
        { src: "/images/portrait/0ff1699a8f2d4b4298150e87f8abbe6f.jpg", placeholder: "#332c27", aspectRatio: 1.5 },
        { src: "/images/portrait/1560ffb7fb7c892fe2e556bb14dcfcc9.jpg", placeholder: "#51463e", aspectRatio: 0.75 },
        { src: "/images/portrait/17b910e23b73b5e9608dbbb08585ed46.jpg", placeholder: "#453a32", aspectRatio: 1.4 }
      ]
    },
    {
      id: "white-moonlight",
      title: "WHITE MOONLIGHT",
      year: "2026",
      essay: "Ethereal, high-key photography inspired by the concept of 'White Moonlight'. The visual narrative revolves around pure, nostalgic, and dreamy aesthetics.",
      images: [
        { src: "/images/white-moonlight/0a4eca0e235c474c7ba22f5e24714d85.jpg", placeholder: "#e0e0e0", aspectRatio: 0.75 },
        { src: "/images/white-moonlight/1a796e0dd260fa3867658dfa19461d1d.jpg", placeholder: "#d1d1d1", aspectRatio: 1.5 },
        { src: "/images/white-moonlight/1ad84b9ab4a1e2ab17c7aab37fcff0a5.jpg", placeholder: "#bfbfbf", aspectRatio: 0.75 },
        { src: "/images/white-moonlight/1b2e945ffa23f7894ab00477d215a186.jpg", placeholder: "#e6e6e6", aspectRatio: 1.5 },
        { src: "/images/white-moonlight/1fe9747ba4bdd57114872a81f3e0148f.jpg", placeholder: "#cccccc", aspectRatio: 0.75 },
        { src: "/images/white-moonlight/3eb002f7a2c129e37447f1056f87481d.jpg", placeholder: "#d9d9d9", aspectRatio: 1.4 }
      ]
    }
  ],
  `;
  
  content = content.substring(0, startIdx) + newSeries + content.substring(endIdx);
  fs.writeFileSync('lib/data/portfolioData.ts', content, 'utf8');
  console.log("Successfully replaced galleries.");
} else {
  console.log("Could not find start/end indices.");
}
