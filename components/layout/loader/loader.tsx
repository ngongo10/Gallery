'use client'

import { useEffect } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './loader.module.css'

// Cache màu chủ đạo (dominant color) toàn cục
export const dominantColorMap = new Map<string, string>()

function extractDominantColor(img: HTMLImageElement): string {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return '#262626'
    canvas.width = 10
    canvas.height = 10
    ctx.drawImage(img, 0, 0, 10, 10)
    const data = ctx.getImageData(0, 0, 10, 10).data
    let r = 0, g = 0, b = 0, count = 0
    for (let i = 0; i < data.length; i += 4) {
      r += data[i] ?? 0
      g += data[i + 1] ?? 0
      b += data[i + 2] ?? 0
      count++
    }
    if (count === 0) return '#262626'
    return `rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`
  } catch {
    return '#262626'
  }
}

export function Loader() {
  const setRoute = usePortfolioStore((state) => state.setRoute)

  useEffect(() => {
    const bar = document.getElementById('loader-bar')
    const text = document.getElementById('loader-text')
    const container = document.getElementById('loader-container')

    // Thu thập tất cả đường dẫn ảnh trong portfolioData
    const allImages = Array.from(
      new Set(
        portfolioData.series.flatMap((s) => s.images.map((img) => img.src))
      )
    )

    let loaded = 0
    const total = allImages.length

    const updateProgress = (targetPercent: number) => {
      if (bar) bar.style.width = `${targetPercent}%`
      if (text) text.innerText = `${targetPercent}%`
    }

    const finishLoading = () => {
      updateProgress(100)
      // Kích hoạt 'home' ngay lập tức để intro animation khởi chạy liền
      setRoute('home')
      if (container) {
        container.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        container.style.opacity = '0'
        container.style.pointerEvents = 'none'
      }
    }

    if (total === 0) {
      finishLoading()
      return
    }

    // Preload từng ảnh VÀ tính toán luôn màu chủ đạo (Dominant Color) trong màn hình Loading
    allImages.forEach((src) => {
      const img = new window.Image()
      img.crossOrigin = 'Anonymous'
      img.onload = img.onerror = () => {
        // Tính toán màu chủ đạo ngay trong quá trình Loading
        if (img.naturalWidth && !dominantColorMap.has(src)) {
          const color = extractDominantColor(img)
          dominantColorMap.set(src, color)
        }
        loaded++
        const percent = Math.floor((loaded / total) * 100)
        updateProgress(percent)
        if (loaded >= total) {
          finishLoading()
        }
      }
      img.src = src
    })
  }, [setRoute])

  return (
    <div id="loader-container" className={s.loader}>
      <div className={s.content}>
        <h1 className={s.title}>JUBI SATAKA</h1>
        <div className={s.progressBarWrapper}>
          <div 
            id="loader-bar"
            className={s.progressBar} 
            style={{ width: '0%' }} 
          />
        </div>
        <span id="loader-text" className={s.progressText}>0%</span>
      </div>
    </div>
  )
}
