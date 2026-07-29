'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEventHandler } from 'react'
import s from './home-mosaic.module.css'
import cn from 'clsx'

import { dominantColorMap } from '@/components/layout/loader/loader'

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
  const [loaded, setLoaded] = useState(false)
  const [realAspectRatio, setRealAspectRatio] = useState(aspectRatio)
  const imgRef = useRef<HTMLImageElement>(null)

  // Lấy màu chủ đạo đã được tính sẵn 100% trong quá trình Loading
  const bgColor = dominantColorMap.get(src) || '#262626'

  useEffect(() => {
    // Check nếu ảnh HTML đã complete sẵn trong DOM (từ browser cache)
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [src])

  return (
    <div 
      ref={ref}
      className={cn(s.imageWrapper, className)}
      style={{ ...style, aspectRatio: realAspectRatio }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 1. SOLID COLOR BLOCK (Màu chủ đạo được nạp sẵn 100% từ màn hình Loading) */}
      {!isMasked && (
        <div 
          className={s.imagePlaceholder} 
          style={{ backgroundColor: bgColor, opacity: 1 }} 
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
