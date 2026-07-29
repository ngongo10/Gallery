'use client'

import { useEffect } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './loader.module.css'

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
      if (container) {
        container.style.transition = 'opacity 0.5s ease'
        container.style.opacity = '0'
        setTimeout(() => {
          setRoute('home')
        }, 500)
      } else {
        setRoute('home')
      }
    }

    if (total === 0) {
      finishLoading()
      return
    }

    allImages.forEach((src) => {
      const img = new window.Image()
      img.onload = img.onerror = () => {
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
