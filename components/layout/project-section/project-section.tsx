'use client'

import { useEffect, useRef, useState } from 'react'
import type { Series } from '@/lib/data/portfolioData'
import { Image } from '@/webgl/components/image'
import s from './project-section.module.css'
import cn from 'clsx'
import gsap from 'gsap'

interface ProjectSectionProps {
  project: Series
  index: number
  totalProjects: number
}

export function ProjectSection({ project, index, totalProjects }: ProjectSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const indexStr = String(index + 1).padStart(2, '0')

  // Track active image in view for thumbnail rail
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    imageRefs.current.forEach((el, i) => {
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveImageIndex(i)
            }
          })
        },
        {
          rootMargin: '-30% 0px -30% 0px', // Center-focused intersection
          threshold: 0.1
        }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [project.images])

  // Fade-in collage images sequentially on enter
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const introImages = section.querySelectorAll(`.${s.collageItem}`)
    const title = section.querySelector(`.${s.title}`)

    gsap.fromTo(
      introImages,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo(
      title,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    )
  }, [])

  const handleThumbnailClick = (imgIdx: number) => {
    const targetEl = imageRefs.current[imgIdx]
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section ref={sectionRef} id={project.id} className={s.projectSection}>
      
      {/* 1. PROJECT INTRO SECTION */}
      <div className={s.introContainer}>
        {/* Project Counter */}
        <div className={s.counter}>
          <span className={s.counterIndex}>{indexStr}</span>
          <span className={s.counterTotal}>/ {totalProjects}</span>
        </div>

        {/* Serif Title */}
        <h2 className={s.title}>{project.title}</h2>

        {/* Collage Layout */}
        <div className={s.collageGrid}>
          {project.images.slice(0, 3).map((img, i) => (
            <div key={img.src} className={cn(s.collageItem, s[`collageItem${i + 1}`])}>
              <Image
                src={img.src}
                alt={`${project.title} collage ${i + 1}`}
                className={s.collageImg}
                aspectRatio={img.aspectRatio}
              />
            </div>
          ))}
          {/* Decorative Geometric Color Block */}
          <div 
            className={s.decorativeBlock} 
            style={{ backgroundColor: project.images[0]?.placeholder || '#e0e0ee' }}
          />
        </div>

        {/* Scroll Hint */}
        <div className={s.scrollHint}>
          <span className={s.hintText}>SCROLL TO EXPLORE</span>
          <div className={s.hintLine} />
        </div>
      </div>

      {/* 2. PROJECT DETAIL VIEW (Vertical Sequence) */}
      <div className={s.detailContainer}>
        <div className={s.imagesSequence}>
          {project.images.map((img, i) => (
            <div
              key={img.src}
              ref={(el) => {
                imageRefs.current[i] = el
              }}
              className={s.sequenceItem}
            >
              <div className={s.imageWrapper}>
                <Image
                  src={img.src}
                  alt={`${project.title} detail ${i + 1}`}
                  className={s.detailImg}
                  aspectRatio={img.aspectRatio}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right side Thumbnail Rail */}
        <div className={s.thumbnailRail}>
          {project.images.map((img, i) => {
            const isActive = i === activeImageIndex
            return (
              <button
                key={img.src}
                type="button"
                className={cn(s.thumbnailBtn, isActive && s.isActive)}
                onClick={() => handleThumbnailClick(i)}
              >
                <span className={s.dot} />
                <span className={s.railIndex}>{(i + 1).toString().padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
