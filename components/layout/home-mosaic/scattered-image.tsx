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
      style={{ ...style, position: 'relative' }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Ảnh ẩn (visibility:hidden) để container có chiều cao tự nhiên theo kích thước gốc của ảnh ở CẢ 2 LAYER */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        ref={imgRef}
        src={src} 
        alt="" 
        decoding="async"
        className={cn(s.image, loaded && s.loaded)}
        style={{ visibility: isMasked ? 'visible' : 'hidden' }}
        onLoad={() => setLoaded(true)}
      />

      {/* Layer 1: Khối màu chủ đạo phủ lên trên ảnh ẩn (chỉ hiện bên ngoài kính lúp) */}
      {!isMasked && (
        <div 
          className={s.imagePlaceholder} 
          style={{ backgroundColor: bgColor }}
        />
      )}
    </div>
  )
}
