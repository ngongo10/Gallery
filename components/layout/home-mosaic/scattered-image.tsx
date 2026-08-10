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
  onMouseMove?: MouseEventHandler<HTMLDivElement> | undefined
  onMouseLeave?: MouseEventHandler<HTMLDivElement> | undefined
  className?: string | undefined
  style?: CSSProperties | undefined
}

export function ScatteredImage({ 
  ref,
  src, 
  isMasked, 
  onClick, 
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  className,
  style
}: ScatteredImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Lấy màu chủ đạo đã được tính sẵn trong quá trình Loading (dùng cho background placeholder)
  const bgColor = dominantColorMap.get(src) || '#262626'

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [src])

  return (
    <div 
      ref={ref}
      className={cn(s.imageWrapper, className, isMasked && s.isMaskedLayer)}
      style={{ ...style, backgroundColor: bgColor }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Hiển thị hình ảnh thật ở CẢ HÀI LAYER (Base Layer và Masked Layer kính lúp) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        ref={imgRef}
        src={src} 
        alt="" 
        decoding="async"
        className={cn(s.image, loaded && s.loaded, s.colorImg)} 
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
