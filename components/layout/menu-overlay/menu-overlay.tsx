'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './menu-overlay.module.css'
import gsap from 'gsap'

export function MenuOverlay() {
  const menuOpen = usePortfolioStore((state) => state.menuOpen)
  const setRoute = usePortfolioStore((state) => state.setRoute)
  const setActiveSeriesId = usePortfolioStore((state) => state.setActiveSeriesId)

  const overlayRef = useRef<HTMLDivElement>(null)

  // Open/Close transition
  useEffect(() => {
    const el = overlayRef.current
    if (!el) return

    // Tập hợp tất cả các thẻ nội dung chữ bên trong Menu
    const items = el.querySelectorAll(`.${s.navItem}, .${s.subNavItem}, .${s.languageSelector}`)

    if (menuOpen) {
      // --- MỞ MENU: Tấm rèm đen trượt từ trên xuống ---
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(
        el,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.6, ease: 'power3.inOut' }
      )
      // Chữ trôi nẩy ra sau rèm đen
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05, delay: 0.25 }
      )
    } else {
      // --- ĐÓNG MENU: Kéo nguyên tấm rèm đen + chữ trượt vút ngược lên đỉnh trên ---
      gsap.to(items, {
        opacity: 0,
        y: -30,
        duration: 0.25,
        ease: 'power2.in',
        stagger: { each: 0.03, from: 'end' }
      })

      // Tấm rèm đen trượt kéo vút ngược lên đỉnh trên
      gsap.to(el, {
        yPercent: -100,
        duration: 0.55,
        delay: 0.05,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(el, { display: 'none' })
          gsap.set(items, { opacity: 0, y: 30 })
        }
      })
    }
  }, [menuOpen])


  const handleSeriesClick = (id: string) => {
    setActiveSeriesId(id)
    setRoute('detail')
  }

  const handleNavigation = (route: 'home' | 'shop' | 'about') => {
    setRoute(route)
  }

  return (
    <div 
      ref={overlayRef} 
      className={s.menuOverlay}
      style={{ display: 'none' }}
    >
      <div className={s.contentGrid}>
        {/* Left Column: Projects list */}
        <div className={s.leftCol}>
          <nav className={s.nav}>
            {portfolioData.series.map((item) => {
              return (
                <button
                  key={item.id}
                  type="button"
                  className={s.navItem}
                  onClick={() => handleSeriesClick(item.id)}
                >
                  {item.title}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Right Column: General navigation */}
        <div className={s.rightCol}>
          <nav className={s.subNav}>
            <button
              type="button"
              className={s.subNavItem}
              onClick={() => handleNavigation('shop')}
            >
              SHOP
            </button>

            <button
              type="button"
              className={s.subNavItem}
              onClick={() => handleNavigation('about')}
            >
              ABOUT / CONTACT
            </button>
          </nav>

          <div className={s.languageSelector}>
            <span className={s.activeLang}>EN</span>
            <span className={s.langSeparator}>/</span>
            <span className={s.inactiveLang}>VN</span>
          </div>
        </div>
      </div>
    </div>
  )
}
