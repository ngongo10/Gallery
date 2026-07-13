'use client'

import { usePortfolioStore } from '@/lib/store/portfolioStore'
import s from './header.module.css'
import cn from 'clsx'

export function Header() {
  const menuOpen = usePortfolioStore((state) => state.menuOpen)
  const toggleMenu = usePortfolioStore((state) => state.toggleMenu)
  const setRoute = usePortfolioStore((state) => state.setRoute)
  const setCursorType = usePortfolioStore((state) => state.setCursorType)

  // Dark text on light pages (loader, home, detail), white text when menu overlay is open
  const isDark = menuOpen

  const currentRoute = usePortfolioStore((state) => state.currentRoute)

  const handleLogoClick = () => {
    if (currentRoute === 'detail') {
      window.dispatchEvent(new Event('leave-detail-page'))
    } else {
      setRoute('home')
    }
  }

  return (
    <header
      className={cn(s.header, isDark ? s.isDark : s.isLight)}
    >
      <button
        type="button"
        className={s.logo}
        onClick={handleLogoClick}
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        JUBI SATAKA
      </button>

      <button
        type="button"
        className={s.menuToggle}
        onClick={() => toggleMenu()}
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        {menuOpen ? 'CLOSE' : 'MENU'}
      </button>
    </header>
  )
}
