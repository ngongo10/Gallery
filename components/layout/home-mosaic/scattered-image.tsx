'use client'

import React, { useEffect, useRef, useState, forwardRef } from 'react'
import s from './home-mosaic.module.css'
import cn from 'clsx'

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
  src: string
  aspectRatio: number
  isMasked: boolean
  onClick?: (() => void) | undefined
  onMouseEnter?: (() => void) | undefined
  onMouseLeave?: (() => void) | undefined
  className?: string | undefined
  style?: React.CSSProperties | undefined
}

export const ScatteredImage = forwardRef<HTMLDivElement, ScatteredImageProps>(({ 
  src, 
  aspectRatio, 
  isMasked, 
  onClick, 
  onMouseEnter, 
  onMouseLeave,
  className,
  style
}, ref) => {
  const [dominantColor, setDominantColor] = useState<string>('transparent')
  const [loaded, setLoaded] = useState(false)
  const [realAspectRatio, setRealAspectRatio] = useState(aspectRatio)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = src
    img.onload = () => {
      if (!isMasked) {
        const color = getDominantColor(img)
        setDominantColor(color)
      }
      if (img.naturalWidth && img.naturalHeight) {
        setRealAspectRatio(img.naturalWidth / img.naturalHeight)
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
            className={cn(s.image, loaded && s.loaded, s.colorImg)} 
            onLoad={() => setLoaded(true)}
          />
        </>
      )}
    </div>
  )
})

ScatteredImage.displayName = 'ScatteredImage'
