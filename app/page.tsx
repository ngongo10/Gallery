'use client'

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

  // Disable Lenis on home (wheel-driven), enable on scrollable content views
  const enableLenis = currentRoute === 'detail' || currentRoute === 'shop' || currentRoute === 'product' || currentRoute === 'about'

  return (
    <Wrapper lenis={enableLenis}>
      {currentRoute === 'loader' && <Loader />}

      {/* HomeMosaic luôn ở trong DOM sau khi đã load, chỉ ẩn bằng CSS */}
      {/* Tránh unmount/remount gây lag khi quay về home */}
      {currentRoute !== 'loader' && (
        <div style={{ display: currentRoute === 'home' ? 'block' : 'none' }}>
          <HomeMosaic />
        </div>
      )}

      {currentRoute === 'detail' && <SeriesDetail />}
      {currentRoute === 'shop' && <ShopGrid />}
      {currentRoute === 'product' && <ProductDetail />}
      {currentRoute === 'about' && <AboutContact />}
      
      {/* Overlays render independently of route */}
      {infoOpen && <InfoOverlay />}
      <MenuOverlay />
    </Wrapper>
  )
}

