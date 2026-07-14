'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './info-overlay.module.css'
import gsap from 'gsap'

export function InfoOverlay() {
  const infoOpen = usePortfolioStore((state) => state.infoOpen)
  const setInfoOpen = usePortfolioStore((state) => state.setInfoOpen)
  const activeSeriesId = usePortfolioStore((state) => state.activeSeriesId)
  const setCursorType = usePortfolioStore((state) => state.setCursorType)

  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const series = portfolioData.series.find((sr) => sr.id === activeSeriesId)
  const seriesIndex = portfolioData.series.findIndex((sr) => sr.id === activeSeriesId)

  // Format series number: 01, 02, 03...
  const seriesNumber = String(seriesIndex + 1).padStart(2, '0')

  // Split essay into two halves for two-column layout
  const essayWords = series?.essay.split(' ') ?? []
  const midpoint = Math.ceil(essayWords.length / 2)
  const essayCol1 = essayWords.slice(0, midpoint).join(' ')
  const essayCol2 = essayWords.slice(midpoint).join(' ')

  // GSAP enter/exit animations
  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    if (infoOpen) {
      // Enter animation
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(
        overlay,
        { y: '100%' },
        { y: '0%', duration: 0.35, ease: 'power3.out' }
      )
      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power2.out' }
      )
    } else {
      // Exit animation
      gsap.to(overlay, {
        y: '100%',
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' })
        },
      })
    }
  }, [infoOpen])

  if (!series) return null

  return (
    <div ref={overlayRef} className={s.overlay} style={{ display: 'none' }}>
      <div ref={contentRef} className={s.content}>
        <div className={s.seriesNumber}>{seriesNumber}</div>
        <h2 className={s.seriesTitle}>{series.title}</h2>
        <div className={s.year}>{series.year}</div>

        <div className={s.essayGrid}>
          <p className={s.essayText}>{essayCol1}</p>
          <p className={s.essayText}>{essayCol2}</p>
        </div>
      </div>

      {/* Close Button */}
      <button
        type="button"
        className={s.closeButton}
        onClick={() => setInfoOpen(false)}
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        CLOSE
      </button>
    </div>
  )
}
