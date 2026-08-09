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
  const prevRoute = usePortfolioStore((state) => state.prevRoute)
  const infoOpen = usePortfolioStore((state) => state.infoOpen)

  const enableLenis = currentRoute === 'detail' || currentRoute === 'shop' || currentRoute === 'product' || currentRoute === 'about'

  // Khi prevRoute='home' và currentRoute='detail': Genie Effect đang chạy
  // → HomeMosaic phải ở Z-index cao hơn SeriesDetail để che đậy trong suốt animation
  const genieInProgress = prevRoute === 'home' && currentRoute === 'detail'
  const homeVisible = currentRoute === 'home' || genieInProgress

  return (
    <Wrapper lenis={enableLenis}>
      {currentRoute === 'loader' && <Loader />}

      {/* HomeMosaic: z-index cao nhất khi Genie đang chạy để che SeriesDetail đang mount bên dưới */}
      {currentRoute !== 'loader' && (
        <div style={{
          visibility: homeVisible ? 'visible' : 'hidden',
          pointerEvents: homeVisible ? 'auto' : 'none',
          position: 'fixed',
          inset: 0,
          zIndex: genieInProgress ? 9999 : 0,
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
