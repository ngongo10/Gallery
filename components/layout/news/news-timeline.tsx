'use client'

import { useState } from 'react'
import s from './news-timeline.module.css'
import cn from 'clsx'

interface NewsItem {
  id: string
  year: string
  date: string
  title: string
  category: string
  summary: string
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    year: '2026',
    date: 'June 12',
    title: 'Solo Exhibition at Musée de l’Elysée, Lausanne',
    category: 'EXHIBITION',
    summary: 'Guillaume Tomasi presents his latest series "Chrysalises" in a comprehensive solo exhibition. The show investigates the concept of biological and physiological transformation.'
  },
  {
    id: 'news-2',
    year: '2025',
    date: 'November 04',
    title: 'Monuments Photobook Release by Void',
    category: 'PUBLICATION',
    summary: 'The long-awaited monograph "Monuments" is now published. Co-designed with Void, the book collects 48 plates of post-industrial structures captured across Europe and North America.'
  },
  {
    id: 'news-3',
    year: '2025',
    date: 'April 20',
    title: 'Group Show: Uncanny Landscapes at Berlin Galerie',
    category: 'EXHIBITION',
    summary: 'A curated selection of prints from "Uncanny Spaces" will be displayed in Berlin, alongside works by contemporary European landscape photographers.'
  },
  {
    id: 'news-4',
    year: '2024',
    date: 'October 15',
    title: 'Winner of the Grand Prix de la Découverte',
    category: 'AWARD',
    summary: 'Tomasi has been awarded the prestigious prize for his experimental architectural photography, recognized for its painterly composition and structural weight.'
  }
]

export function NewsTimeline() {
  const [selectedYear, setSelectedYear] = useState<string>('ALL')

  const years = ['ALL', '2026', '2025', '2024']

  const filteredNews = selectedYear === 'ALL' 
    ? NEWS_ITEMS 
    : NEWS_ITEMS.filter(item => item.year === selectedYear)

  return (
    <div id="news-section" className={s.newsPage}>
      <div className={s.headerRow}>
        <h1 className={s.pageTitle}>NEWS TIMELINE</h1>
        
        {/* Year navigation */}
        <div className={s.yearNav}>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              className={cn(s.yearBtn, selectedYear === year && s.isActive)}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className={s.timeline}>
        {filteredNews.map((item) => (
          <div key={item.id} className={s.timelineItem}>
            <div className={s.itemMeta}>
              <span className={s.date}>{item.date}, {item.year}</span>
              <span className={s.category}>{item.category}</span>
            </div>
            
            <div className={s.itemContent}>
              <h2 className={s.title}>{item.title}</h2>
              <p className={s.summary}>{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
