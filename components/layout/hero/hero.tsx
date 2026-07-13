'use client'

import s from './hero.module.css'
import { Image } from '@/webgl/components/image'

export function Hero() {
  const coverImage = 'https://images.unsplash.com/photo-1541976844346-f18aeac57b06?q=80&w=1600'

  const handleScrollDown = () => {
    const nextEl = document.getElementById('monuments')
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero-section" className={s.hero}>
      {/* Background/Center WebGL Image */}
      <div className={s.imageWrapper}>
        <Image
          src={coverImage}
          alt="Guillaume Tomasi Portfolio Cover"
          className={s.coverImg}
          aspectRatio={1.5}
        />
      </div>

      {/* Floating Info Overlay */}
      <div className={s.overlay}>
        <div className={s.meta}>
          <span className={s.subtitle}>PHOTOGRAPHY PORTFOLIO</span>
          <h1 className={s.title}>Guillaume Tomasi</h1>
        </div>

        {/* Scroll down hint */}
        <button 
          type="button" 
          className={s.scrollDownBtn}
          onClick={handleScrollDown}
        >
          <span className={s.scrollText}>SCROLL DOWN</span>
          <div className={s.scrollLine} />
        </button>
      </div>
    </section>
  )
}
