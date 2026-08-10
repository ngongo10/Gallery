import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'

const imagesDir = path.join(process.cwd(), 'public', 'images')
const outputFile = path.join(process.cwd(), 'lib', 'data', 'portfolioData.ts')

function scanImages() {
  if (!fs.existsSync(imagesDir)) {
    console.error('Directory public/images does not exist!')
    return
  }

  const folders = fs.readdirSync(imagesDir).filter((file) => {
    return fs.statSync(path.join(imagesDir, file)).isDirectory()
  })

  const seriesList = []

  for (const folder of folders) {
    const folderPath = path.join(imagesDir, folder)
    const files = fs.readdirSync(folderPath).filter((file) => {
      return /\.(jpg|jpeg|png|webp)$/i.test(file)
    })

    if (files.length === 0) continue

    const images = files.map((file) => {
      const filePath = path.join(folderPath, file)
      let aspectRatio = 1.5

      try {
        const dimensions = sizeOf(filePath)
        if (dimensions.width && dimensions.height) {
          aspectRatio = Number((dimensions.width / dimensions.height).toFixed(2))
        }
      } catch (e) {
        // Fallback default
      }

      const encodedFolder = encodeURIComponent(folder)
      const encodedFile = encodeURIComponent(file)

      return {
        src: `/images/${encodedFolder}/${encodedFile}`,
        placeholder: '#202020',
        aspectRatio,
      }
    })

    seriesList.push({
      id: folder,
      title: folder.toUpperCase(),
      year: '2026',
      essay: `Series photography collection: ${folder}`,
      images,
    })
  }

  const shop = [
    {
      id: 'print-01',
      title: 'MONUMENTS NO. 4',
      year: '2024',
      type: 'ARCHIVAL PIGMENT PRINT',
      paper: 'Hahnemühle Photo Rag 308gsm',
      price: 450,
      image: seriesList[0]?.images[0]?.src || '',
      placeholder: '#202020',
      sizes: ['16 x 20 in (Edition of 10)', '24 x 30 in (Edition of 5)'],
      inStock: true,
    },
    {
      id: 'print-02',
      title: 'CHRYSALISES NO. 2',
      year: '2023',
      type: 'SILVER GELATIN PRINT',
      paper: 'Foma Fomabrom Variant 111',
      price: 600,
      image: seriesList[0]?.images[1]?.src || seriesList[0]?.images[0]?.src || '',
      placeholder: '#202020',
      sizes: ['20 x 24 in (Edition of 7)'],
      inStock: true,
    },
  ]

  const about = {
    bioParagraphs: [
      'Ngo Thanh Sinh is a contemporary photographer based in Vietnam, focusing on portraiture, cosplay art, and editorial storytelling.',
      'His work explores identity, atmosphere, and visual harmony through meticulously framed moments.',
    ],
    email: 'contact@ngothanhsinh.com',
    instagram: '@ngothanhsinh',
    cvUrl: '#',
    sideProjects: [{ title: 'Personal Portfolio', url: '#' }],
  }

  const fileContent = `export interface Photo {
  originalSrc?: string;
  src: string;
  placeholder: string;
  aspectRatio: number;
  shotNumber?: string;
  shotType?: string;
  description?: string;
  hasEmbeddedSidebar?: boolean;
}

export interface Series {
  id: string;
  title: string;
  year: string;
  essay: string;
  images: Photo[];
}

export interface PrintProduct {
  id: string;
  title: string;
  year: string;
  type: string;
  paper: string;
  price: number;
  image: string;
  placeholder: string;
  sizes: string[];
  inStock: boolean;
}

export interface PortfolioData {
  series: Series[];
  shop: PrintProduct[];
  about: {
    bioParagraphs: string[];
    email: string;
    instagram: string;
    cvUrl: string;
    sideProjects: { title: string; url: string }[];
  };
}

export const portfolioData: PortfolioData = ${JSON.stringify({ series: seriesList, shop, about }, null, 2)};
`

  fs.writeFileSync(outputFile, fileContent, 'utf-8')
  console.log(`✅ [sync-images] Successfully synced ${seriesList.length} album folders to portfolioData.ts`)
}

scanImages()
