'use client'

import { useEffect, useState } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import s from './loader.module.css'
import gsap from 'gsap'

export function Loader() {
  const setRoute = usePortfolioStore((state) => state.setRoute)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress 0 -> 100
    const obj = { value: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out loader page
        gsap.to(`.${s.loader}`, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            setRoute('home')
          }
        })
      }
    })

    tl.to(obj, {
      value: 100,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        setProgress(Math.floor(obj.value))
      }
    })

    return () => {
      tl.kill()
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
