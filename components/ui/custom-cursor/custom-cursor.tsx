'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { useDeviceDetection } from '@/lib/hooks/use-device-detection'
import s from './custom-cursor.module.css'
import cn from 'clsx'

export function CustomCursor() {
  const { isTouchOnly } = useDeviceDetection()
  const cursorType = usePortfolioStore((state) => state.cursorType)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isTouchOnly) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Position cursor at center initially
    gsap.set(cursor, { xPercent: -50, yPercent: -50 })

    const quickX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' })
    const quickY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMouseMove = (e: MouseEvent) => {
      quickX(e.clientX)
      quickY(e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [isTouchOnly])

  if (isTouchOnly) return null

  const getLabel = () => {
    switch (cursorType) {
      case 'view':
        return 'VIEW'
      case 'drag':
        return 'DRAG'
      case 'close':
        return 'CLOSE'
      default:
        return ''
    }
  }

  const label = getLabel()

  return (
    <div
      ref={cursorRef}
      className={cn(
        s.cursor,
        cursorType === 'default' && s.isDefault,
        cursorType === 'pointer' && s.isPointer,
        cursorType === 'view' && s.isView,
        cursorType === 'drag' && s.isDrag,
        cursorType === 'close' && s.isClose
      )}
    >
      {label && <span className={s.label}>{label}</span>}
    </div>
  )
}
