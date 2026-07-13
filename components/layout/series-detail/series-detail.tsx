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

  // GSAP entrance animation: images fade in from below as they enter viewport
  useEffect(() => {
    if (!series) return

    const elements = imageRefs.current.filter(Boolean) as HTMLDivElement[]

    // Set initial state (higher starting Y offset for other images)
    gsap.set(elements, { y: 120, opacity: 0 })
    
    // The very first image starts below the screen boundary (y: window.innerHeight)
    if (elements[0]) {
      gsap.set(elements[0], { y: window.innerHeight, opacity: 1 })
    }

    // Instantly animate the first image to sweep up from the bottom of the screen
    if (elements[0]) {
      gsap.to(elements[0], {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power4.out',
        delay: 0.05
      })
    }

    // Stagger the remaining initial visible images (index 1 and 2)
    const remainingBatch = elements.slice(1, 3)
    const scrollBatch = elements.slice(3)

    if (remainingBatch.length > 0) {
      gsap.to(remainingBatch, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.25,
      })
    }

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

  // Handle leaving page animation (slide down)
  useEffect(() => {
    const handleLeave = () => {
      const elements = imageRefs.current.filter(Boolean) as HTMLDivElement[]
      gsap.killTweensOf(elements)
      gsap.to(elements, {
        y: window.innerHeight,
        opacity: 0,
        duration: 1.0,
        stagger: {
          amount: 0.3,
          from: 'start'
        },
        ease: 'power4.in',
        onComplete: () => {
          setRoute('home')
        }
      })
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

      {/* Thumbnail Rail (Right Side) */}
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
            >
              {isActive && <div className={s.activeDot} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={`${series.title} thumbnail ${i + 1}`}
                className={s.thumbnail}
              />
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
