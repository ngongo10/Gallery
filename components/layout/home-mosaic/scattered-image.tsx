'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEventHandler } from 'react'
import s from './home-mosaic.module.css'
import cn from 'clsx'

// Cache dominant color theo src — tồn tại trong suốt vòng đời trang
// Khi quay về home, màu đã tính rồi nên không phải canvas lại
const dominantColorCache = new Map<string, string>()

function getDominantColor(img: HTMLImageElement): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return 'transparent'
  
  canvas.width = 10
  canvas.height = 10
  ctx.drawImage(img, 0, 0, 10, 10)
  
  const data = ctx.getImageData(0, 0, 10, 10).data
  let r = 0, g = 0, b = 0, count = 0
  
  for (let i = 0; i < data.length; i += 4) {
    r += data[i] ?? 0
    g += data[i+1] ?? 0
    b += data[i+2] ?? 0
    count++
  }
  
  if (count === 0) return 'transparent'
  return `rgb(${Math.round(r/count)}, ${Math.round(g/count)}, ${Math.round(b/count)})`
}

interface ScatteredImageProps {
  ref?: React.Ref<HTMLDivElement>
  src: string
  aspectRatio: number
  isMasked: boolean
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
  onMouseEnter?: MouseEventHandler<HTMLDivElement> | undefined
  onMouseLeave?: MouseEventHandler<HTMLDivElement> | undefined
  className?: string | undefined
  style?: CSSProperties | undefined
}

export function ScatteredImage({ 
  ref,
  src, 
  aspectRatio, 
  isMasked, 
  onClick, 
  onMouseEnter, 
  onMouseLeave,
  className,
  style
}: ScatteredImageProps) {
  const [dominantColor, setDominantColor] = useState<string>('transparent')
  const [loaded, setLoaded] = useState(false)
  const [realAspectRatio, setRealAspectRatio] = useState(aspectRatio)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Nếu đã cache rồi thì dùng luôn, không tính lại
    if (dominantColorCache.has(src)) {
      if (!isMasked) setDominantColor(dominantColorCache.get(src)!)
      return
    }

    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = src
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setRealAspectRatio(img.naturalWidth / img.naturalHeight)
      }
      if (!isMasked) {
        const runWhenIdle = (cb: () => void) => {
          if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            window.requestIdleCallback(cb, { timeout: 2000 })
          } else {
            setTimeout(cb, 300)
          }
        }
        runWhenIdle(() => {
          const color = getDominantColor(img)
          dominantColorCache.set(src, color) // Lưu vào cache
          setDominantColor(color)
        })
      }
    }
  }, [src, isMasked])

  return (
    <div 
      ref={ref}
      className={cn(s.imageWrapper, className)}
      style={{ ...style, aspectRatio: realAspectRatio }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 1. SOLID COLOR BLOCK (Base layer covers 100% of image) */}
      {!isMasked && (
        <div 
          className={s.imagePlaceholder} 
          style={{ backgroundColor: dominantColor, opacity: 1 }} 
        />
      )}
      
      {/* 2. ACTUAL IMAGE (Only visible in Masked layer) */}
      {isMasked && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            ref={imgRef}
            src={src} 
            alt="" 
            decoding="async"
            className={cn(s.image, loaded && s.loaded, s.colorImg)} 
            onLoad={() => setLoaded(true)}
          />
        </>
      )}
    </div>
  )
}
