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
  const imgRef = useRef<HTMLImageElement>(null)

  const bgColor = dominantColorMap.get(src) || '#1a1a1a'
  const validAr = aspectRatio && aspectRatio > 0 ? aspectRatio : 1.5

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true)
    }
  }, [src])

  return (
    <div
      ref={ref}
      className={cn(s.imageWrapper, className)}
      style={{
        ...style,
        // CSS aspect-ratio điều khiển HEIGHT dựa trên WIDTH đã set ở parent
        aspectRatio: String(validAr),
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Layer 1: Khối màu solid (chỉ hiện ở base layer - lớp ngoài kính lúp) */}
      {!isMasked && (
        <div
          className={s.placeholder}
          style={{ backgroundColor: bgColor }}
        />
      )}

      {/* Layer 2: Ảnh thật (chỉ hiện ở masked layer - bên trong kính lúp) */}
      {isMasked && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={src}
          alt=""
          decoding="async"
          className={cn(s.photo, loaded && s.photoLoaded)}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}
