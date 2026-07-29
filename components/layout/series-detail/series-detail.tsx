'use client'

import { useEffect, useRef, useState } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './series-detail.module.css'
import gsap from 'gsap'
import cn from 'clsx'

export function SeriesDetail() {
  const activeSeriesId = usePortfolioStore((state) => state.activeSeriesId)
  const activePhotoIndex = usePortfolioStore((state) => state.activePhotoIndex)
  const setActivePhotoIndex = usePortfolioStore((state) => state.setActivePhotoIndex)
  const setInfoOpen = usePortfolioStore((state) => state.setInfoOpen)
  const setCursorType = usePortfolioStore((state) => state.setCursorType)
  const setRoute = usePortfolioStore((state) => state.setRoute)

  const series = portfolioData.series.find((sr) => sr.id === activeSeriesId)

  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageColumnRef = useRef<HTMLDivElement>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  // IntersectionObserver scroll-spy: detect which image is in viewport
  useEffect(() => {
    if (!series) return

    const observers: IntersectionObserver[] = []

    imageRefs.current.forEach((el, index) => {
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActivePhotoIndex(index)
            }
          })
        },
        { threshold: 0.5 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [series, setActivePhotoIndex])

  // GSAP entrance animation nhẹ nhàng, không dùng y: window.innerHeight gây lag
  useEffect(() => {
    if (!series) return

    const elements = imageRefs.current.filter(Boolean) as HTMLDivElement[]

    // Trạng thái ban đầu nhẹ nhàng
    gsap.set(elements, { y: 40, opacity: 0 })
    
    // Animate xuất hiện các ảnh đầu tiên
    gsap.to(elements.slice(0, 3), {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    })

    const scrollBatch = elements.slice(3)
    const observers: IntersectionObserver[] = []

    scrollBatch.forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'power3.out',
              })
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.05 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [series])

  // Handle leaving page (chuyển thẳng về home, không chạy animation trượt ảnh)
  useEffect(() => {
    const handleLeave = () => {
      setRoute('home')
    }

    window.addEventListener('leave-detail-page', handleLeave)
    return () => {
      window.removeEventListener('leave-detail-page', handleLeave)
    }
  }, [setRoute])

  // Scroll to thumbnail on click
  function handleThumbnailClick(index: number) {
    const target = imageRefs.current[index]
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Track loaded images for placeholder crossfade
  function handleImageLoad(index: number) {
    setLoadedImages((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  if (!series) return null

  return (
    <div className={s.detailPage}>
      {/* Gallery Container */}
      <div className={s.galleryContainer}>
        {/* Image Column */}
        <div ref={imageColumnRef} className={s.imageColumn}>
          {series.images.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => {
                imageRefs.current[i] = el
              }}
              className={s.imageWrapper}
              onMouseEnter={() => setCursorType('drag')}
              onMouseLeave={() => setCursorType('default')}
            >
              {/* Color placeholder */}
              <div
                className={s.imagePlaceholder}
                style={{
                  backgroundColor: photo.placeholder,
                  opacity: loadedImages.has(i) ? 0 : 1,
                  aspectRatio: photo.aspectRatio,
                  width: photo.aspectRatio > 1 ? '100%' : 'auto',
                  height: photo.aspectRatio > 1 ? 'auto' : '100%',
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={`${series.title} ${i + 1}`}
                className={s.galleryImage}
                style={{
                  aspectRatio: photo.aspectRatio,
                  opacity: loadedImages.has(i) ? 1 : 0,
                }}
                onLoad={() => handleImageLoad(i)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Thumbnail Rail & Dot Indicator (Guillaume Tomasi Design) */}
      <div className={s.thumbnailRail}>
        {series.images.map((photo, i) => {
          const isActive = i === activePhotoIndex
          return (
            <button
              key={photo.src}
              type="button"
              className={cn(s.thumbnailWrapper, isActive && s.isActive)}
              onClick={() => handleThumbnailClick(i)}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              aria-label={`Jump to photo ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={`${series.title} thumbnail ${i + 1}`}
                className={s.thumbnail}
              />
              {/* Chấm tròn đen/trắng nẩy bên cạnh bức ảnh đang active */}
              {isActive && <div className={s.activeDot} />}
            </button>
          )
        })}
      </div>

      {/* Bottom UI */}
      <div className={s.bottomUI}>
        <button
          type="button"
          className={s.infoButton}
          onClick={() => {
            setInfoOpen(true)
            setCursorType('default')
          }}
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
        >
          INFOS
        </button>

        <span className={s.photoCounter}>
          {activePhotoIndex + 1} OF {series.images.length}
        </span>
      </div>
    </div>
  )
}
