'use client'

import { useEffect, useState } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { Loader } from '@/components/layout/loader/loader'
import { HomeMosaic } from '@/components/layout/home-mosaic/home-mosaic'
import { SeriesDetail } from '@/components/layout/series-detail/series-detail'
import { ShopGrid } from '@/components/layout/shop/shop-grid'
import { ProductDetail } from '@/components/layout/shop/product-detail'
import { AboutContact } from '@/components/layout/about/about-contact'
import { InfoOverlay } from '@/components/layout/info-overlay/info-overlay'
import { MenuOverlay } from '@/components/layout/menu-overlay/menu-overlay'
import { Wrapper } from '@/components/layout/wrapper'

export default function Page() {
  const currentRoute = usePortfolioStore((state) => state.currentRoute)
  const infoOpen = usePortfolioStore((state) => state.infoOpen)
  // isLeaving: true khi HomeMosaic đang chạy animation rời đi, giữ visible cho đến khi xong
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const onStartLeave = () => setIsLeaving(true)
    const onFinishLeave = () => setIsLeaving(false)
    window.addEventListener('home-transition-start', onStartLeave)
    window.addEventListener('home-transition-done', onFinishLeave)
    return () => {
      window.removeEventListener('home-transition-start', onStartLeave)
      window.removeEventListener('home-transition-done', onFinishLeave)
    }
  }, [])

  const enableLenis = currentRoute === 'detail' || currentRoute === 'shop' || currentRoute === 'product' || currentRoute === 'about'

  // HomeMosaic phải hiển thị khi: đang ở home, hoặc đang trong animation chưa xong
  const showHomeMosaic = currentRoute !== 'loader'
  const homeMosaicVisible = currentRoute === 'home' || isLeaving

  return (
    <Wrapper lenis={enableLenis}>
      {currentRoute === 'loader' && <Loader />}

      {showHomeMosaic && (
        <div style={{
          visibility: homeMosaicVisible ? 'visible' : 'hidden',
          pointerEvents: homeMosaicVisible && currentRoute === 'home' ? 'auto' : 'none',
          position: 'fixed',
          inset: 0,
          zIndex: isLeaving ? 10 : 0,
        }}>
          <HomeMosaic />
        </div>
      )}

      {currentRoute === 'detail' && <SeriesDetail />}
      {currentRoute === 'shop' && <ShopGrid />}
      {currentRoute === 'product' && <ProductDetail />}
      {currentRoute === 'about' && <AboutContact />}

      {infoOpen && <InfoOverlay />}
      <MenuOverlay />
    </Wrapper>
  )
}
