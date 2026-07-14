'use client'

import { useEffect } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import s from './loader.module.css'

export function Loader() {
  const setRoute = usePortfolioStore((state) => state.setRoute)


  useEffect(() => {
    let currentProgress = 0;
    const bar = document.getElementById('loader-bar');
    const text = document.getElementById('loader-text');
    const container = document.getElementById('loader-container');

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        if (container) {
          container.style.transition = 'opacity 0.5s ease';
          container.style.opacity = '0';
          setTimeout(() => {
            setRoute('home');
          }, 500);
        } else {
          setRoute('home');
        }
      }
      
      if (bar) bar.style.width = `${currentProgress}%`;
      if (text) text.innerText = `${currentProgress}%`;
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [setRoute]);

  return (
    <div id="loader-container" className={s.loader}>
      <div className={s.content}>
        <h1 className={s.title}>JUBI SATAKA</h1>
        <div className={s.progressBarWrapper}>
          <div 
            id="loader-bar"
            className={s.progressBar} 
            style={{ width: '0%' }} 
          />
        </div>
        <span id="loader-text" className={s.progressText}>0%</span>
      </div>
    </div>
  )
}
