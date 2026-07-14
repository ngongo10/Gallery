'use client'

import { useEffect, useState } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import s from './loader.module.css'
import gsap from 'gsap'

export function Loader() {
  const setRoute = usePortfolioStore((state) => state.setRoute)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        
        // Tránh bị đè hiệu ứng, dùng fade out chuẩn và chuyển route
        const loaderEl = document.querySelector(`.${s.loader}`)
        if (loaderEl) {
          gsap.to(loaderEl, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              setRoute('home')
            }
          })
        } else {
          setRoute('home')
        }
      }
      setProgress(currentProgress)
    }, 80)

    return () => {
      clearInterval(interval)
    }
  }, [setRoute])

  return (
    <div className={s.loader}>
      <div className={s.content}>
        <h1 className={s.title}>JUBI SATAKA</h1>
        <div className={s.progressBarWrapper}>
          <div 
            className={s.progressBar} 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <span className={s.progressText}>{progress}%</span>
      </div>
    </div>
  )
}
