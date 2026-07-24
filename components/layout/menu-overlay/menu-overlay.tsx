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

    if (menuOpen) {
      // --- MỞ MENU: Xổ trướng từ trên xuống ---
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(
        el,
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.6, ease: 'power3.inOut' }
      )
    } else {
      // --- ĐÓNG MENU: Rút cuộn ngược từ dưới lên trên ---
      gsap.to(el, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(el, { display: 'none' })
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
