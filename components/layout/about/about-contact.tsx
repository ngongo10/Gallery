'use client'

import { portfolioData } from '@/lib/data/portfolioData'
import s from './about-contact.module.css'

export function AboutContact() {
  const { about } = portfolioData

  return (
    <div id="about-section" className={s.aboutPage}>
      <div className={s.content}>
        {/* Title */}
        <h1 className={s.pageTitle}>ABOUT & CONTACT</h1>

        {/* Bio Sections */}
        <div className={s.bioGrid}>
          <div className={s.bioCol}>
            {about.bioParagraphs[0] && <p className={s.bioText}>{about.bioParagraphs[0]}</p>}
          </div>
          <div className={s.bioCol}>
            {about.bioParagraphs[1] && <p className={s.bioText}>{about.bioParagraphs[1]}</p>}
          </div>
        </div>

        {/* Contact List */}
        <div className={s.section}>
          <h2 className={s.sectionTitle}>CONTACT</h2>
          <div className={s.list}>
            <div className={s.listItemRow}>
              <span className={s.itemLabel}>EMAIL</span>
              <a
                href={`mailto:${about.email}`}
                className={s.itemValue}
              >
                {about.email} <span className={s.arrow}>↗</span>
              </a>
            </div>

            <div className={s.listItemRow}>
              <span className={s.itemLabel}>INSTAGRAM</span>
              <a
                href={about.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={s.itemValue}
              >
                @ngothanhsinh136 <span className={s.arrow}>↗</span>
              </a>
            </div>

            <div className={s.listItemRow}>
              <span className={s.itemLabel}>CURRICULUM VITAE</span>
              <a
                href={about.cvUrl}
                className={s.itemValue}
              >
                DOWNLOAD CV <span className={s.arrow}>↗</span>
              </a>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
