'use client'

import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './shop-grid.module.css'

export function ShopGrid() {
  const setRoute = usePortfolioStore((state) => state.setRoute)
  const setActiveProductId = usePortfolioStore((state) => state.setActiveProductId)

  const handleProductClick = (id: string) => {
    setActiveProductId(id)
    setRoute('product')
  }

  return (
    <div id="shop-section" className={s.shopPage}>
      <h1 className={s.pageTitle}>PRINTS SHOP</h1>
      <div className={s.grid}>
        {portfolioData.shop.map((product) => (
          <div
            key={product.id}
            className={s.card}
            onClick={() => handleProductClick(product.id)}
          >
            <div className={s.frame}>
              <div 
                className={s.imagePlaceholder} 
                style={{ backgroundColor: product.placeholder }} 
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.title}
                className={s.image}
                style={{ opacity: 0 }}
                onLoad={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              />
            </div>
            <div className={s.meta}>
              <h2 className={s.title}>{product.title}</h2>
              <span className={s.subtitle}>{product.type} — {product.price.toLocaleString('vi-VN')} VND</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
