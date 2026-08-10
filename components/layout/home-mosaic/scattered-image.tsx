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
  aspectRatio,
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

  const validAr = aspectRatio && aspectRatio > 0 ? aspectRatio : 1.5

  return (
    <div 
      ref={ref}
      className={cn(s.imageWrapper, className, isMasked && s.isMaskedLayer)}
      style={{ ...style, aspectRatio: String(validAr), backgroundColor: bgColor }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Layer 1 (Layer bên ngoài): Hiện mảng khối màu đại diện che đi theo đúng kích thước vốn có của ảnh */}
      {!isMasked && (
        <div 
          className={s.imagePlaceholder} 
          style={{ backgroundColor: bgColor, opacity: 1 }} 
        />
      )}

      {/* Layer 2 (Layer bên trong kính lúp): Hiện ra ảnh thật 100% kích thước tự nhiên vốn có */}
      {isMasked && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img 
          ref={imgRef}
          src={src} 
          alt="" 
          decoding="async"
          className={cn(s.image, loaded && s.loaded, s.colorImg)} 
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}
