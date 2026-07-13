'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './project-statement.module.css'
import gsap from 'gsap'

export function ProjectStatement() {
  const activeSeriesId = usePortfolioStore((state) => state.activeSeriesId)
  const infoOpen = usePortfolioStore((state) => state.infoOpen)
  const setInfoOpen = usePortfolioStore((state) => state.setInfoOpen)
  const setCursorType = usePortfolioStore((state) => state.setCursorType)

  const containerRef = useRef<HTMLDivElement>(null)
  
  const series = portfolioData.series.find((s) => s.id === activeSeriesId)
  const indexStr = String(portfolioData.series.findIndex((s) => s.id === activeSeriesId) + 1).padStart(2, '0')

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (infoOpen) {
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(el, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: 'power3.out' })
    } else {
      gsap.to(el, {
        yPercent: 100,
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(el, { display: 'none' })
        }
      })
    }
  }, [infoOpen])

  if (!series) return null

  return (
    <div 
      ref={containerRef} 
      className={s.statementOverlay}
      style={{ display: 'none' }}
    >
      <div className={s.contentGrid}>
        {/* Left Column */}
        <div className={s.leftCol}>
          <span className={s.index}>{indexStr}</span>
          <h2 className={s.title}>{series.title}</h2>
          <span className={s.year}>{series.year}</span>
        </div>

        {/* Right Column */}
        <div className={s.rightCol}>
          <p className={s.essay}>{series.essay}</p>
        </div>
      </div>

      <button
        type="button"
        className={s.closeButton}
        onClick={() => {
          setInfoOpen(false)
          setCursorType('default')
        }}
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        CLOSE
      </button>
    </div>
  )
}
