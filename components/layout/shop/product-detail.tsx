'use client'

import { useState } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './product-detail.module.css'
import cn from 'clsx'

export function ProductDetail() {
  const activeProductId = usePortfolioStore((state) => state.activeProductId)
  const setRoute = usePortfolioStore((state) => state.setRoute)
  const addToCart = usePortfolioStore((state) => state.addToCart)
  const cart = usePortfolioStore((state) => state.cart)

  const product = portfolioData.shop.find((p) => p.id === activeProductId)
  
  const [selectedSize, setSelectedSize] = useState<string>('')

  if (!product) return null

  // Default to first size if none selected
  const activeSize = selectedSize || product.sizes[0]

  const handleAddToCart = () => {
    if (!product.inStock) return
    addToCart(`${product.id}-${activeSize}`)
  }

  const isAlreadyInCart = cart.includes(`${product.id}-${activeSize}`)

  return (
    <div className={s.productPageOverlay}>
      {/* Back button */}
      <button
        type="button"
        className={s.backButton}
        onClick={() => setRoute('home')}
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
          <span className={s.year}>{product.year}</span>
          
          <p className={s.paperSpec}>
            Printed on: <span className={s.italic}>{product.paper}</span>
          </p>

          <hr className={s.divider} />

          {/* SIZES selection */}
          <div className={s.sizesSection}>
            <span className={s.sectionLabel}>SIZES (INCH)</span>
            <div className={s.sizesList}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={s.sizeOption}
                  onClick={() => setSelectedSize(size)}
                >
                  <span className={cn(s.radioCircle, ((selectedSize || product.sizes[0]) === size) && s.radioActive)} />
                  <span className={s.sizeText}>{size}</span>
                </button>
              ))}
            </div>
            <span className={s.customSizeNote}>(Contact me for custom sizes)</span>
          </div>

          <div className={s.purchaseRow}>
            <span className={s.price}>${product.price} USD</span>
            
            <button
              type="button"
              className={cn(
                s.actionButton,
                !product.inStock && s.outOfStock,
                isAlreadyInCart && s.inCart
              )}
              disabled={!product.inStock || isAlreadyInCart}
              onClick={handleAddToCart}
            >
              {!product.inStock 
                ? 'OUT OF STOCK' 
                : isAlreadyInCart 
                  ? 'ADDED TO CART' 
                  : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
