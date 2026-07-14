'use client'

import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './product-detail.module.css'
import cn from 'clsx'

export function ProductDetail() {
  const activeProductId = usePortfolioStore((state) => state.activeProductId)
  const setRoute = usePortfolioStore((state) => state.setRoute)

  const product = portfolioData.shop.find((p) => p.id === activeProductId)
  
  if (!product) return null
  
  const handleContact = () => {
    window.location.href = `mailto:${portfolioData.about.email}?subject=Interested in ${product.title}`
  }

  return (
    <div className={s.productPageOverlay}>
      {/* Back button */}
      <button
        type="button"
        className={s.backButton}
        onClick={() => setRoute('shop')}
      >
        ← CLOSE
      </button>

      <div className={s.content}>
        {/* Left column: Image Frame */}
        <div className={s.leftCol}>
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
        </div>

        {/* Right column: Info & Specs */}
        <div className={s.rightCol}>
          <span className={s.category}>{product.type}</span>
          <h1 className={s.title}>{product.title}</h1>
          
          <hr className={s.divider} />

          <div className={s.purchaseRow}>
            <span className={s.price}>{product.price.toLocaleString('vi-VN')} VND</span>
            
            <button
              type="button"
              className={cn(s.actionButton)}
              onClick={handleContact}
            >
              LIÊN HỆ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
