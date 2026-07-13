'use client'

import { useEffect, useRef } from 'react'
import s from './chromatic-cursor.module.css'

/**
 * ChromaticCursor — a circular cursor ring with RGB chromatic aberration.
 *
 * Three rings (R/G/B) lerp at different speeds creating a chromatic split
 * as the cursor moves. When still, all three converge to the same point.
 */
export function ChromaticCursor() {
  const rRef = useRef<HTMLDivElement>(null)
  const gRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // R/G/B channels lerp at different speeds
    const channels = [
      { ref: rRef, x: mouseX, y: mouseY, lag: 0.06 },  // red  — slowest, trails furthest
      { ref: gRef, x: mouseX, y: mouseY, lag: 0.10 },  // green — middle
      { ref: bRef, x: mouseX, y: mouseY, lag: 0.16 },  // blue  — fastest, near cursor
    ]

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    let rafId: number
    const tick = () => {
      for (const ch of channels) {
        ch.x += (mouseX - ch.x) * ch.lag
        ch.y += (mouseY - ch.y) * ch.lag
        if (ch.ref.current) {
          ch.ref.current.style.transform =
            `translate(${ch.x}px, ${ch.y}px) translate(-50%, -50%)`
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className={s.root} aria-hidden="true">
      <div ref={rRef} className={s.ringR} />
      <div ref={gRef} className={s.ringG} />
      <div ref={bRef} className={s.ringB} />
    </div>
  )
}
