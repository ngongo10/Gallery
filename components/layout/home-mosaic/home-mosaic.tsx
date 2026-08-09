'use client'

import { useEffect, useRef, useState } from 'react'
import { usePortfolioStore } from '@/lib/store/portfolioStore'
import { portfolioData } from '@/lib/data/portfolioData'
import s from './home-mosaic.module.css'
import gsap from 'gsap'
import cn from 'clsx'
import { ScatteredImage } from './scattered-image'

const ALL_IMAGES = portfolioData.series.flatMap(s => s.images.slice(0, 8).map(img => ({ ...img, seriesId: s.id })))

const CHAPTER_Z_SPACING = 5000

// Trình tạo số giả ngẫu nhiên (Pseudo-random) ổn định dựa trên seed
// Đảm bảo mỗi lần load lại các ảnh không bị nhảy vị trí, tránh lỗi Hydration
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Simple string hash
function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}

// Module-level tracking arrays for Collision Detection (reset per series)
// Tất cả tính toán dùng canvas ảo lớn hơn để đảm bảo các ảnh có đủ diện tích rải rác không chạm nhau
const VIRTUAL_W = 2800;
const VIRTUAL_H = 1600;
// Nới rộng vùng đặt ảnh ra xa hơn
const TABLE_X = VIRTUAL_W * 0.44; // ±1232px
const TABLE_Y = VIRTUAL_H * 0.44; // ±704px
const GAP = 220; // Khoảng cách an toàn tối thiểu (~3cm trên màn hình)


// --- PHASE 1: Tính toán trước vị trí cho TỪNG ALBUM ---
// Đảm bảo mỗi album có đúng 1 bộ vị trí không đè nhau
type BoxEntry = { x: number; y: number; w: number; h: number };
const SERIES_POSITIONS = new Map<string, BoxEntry[]>();

for (const series of portfolioData.series) {
  const placed: BoxEntry[] = [];
  const images = series.images.slice(0, 8);

  for (let idx = 0; idx < images.length; idx++) {
    const img = images[idx]!;
    // Seed riêng biệt cho mỗi ảnh dựa trên series.id + index để tránh trùng
    const seed = hashString(series.id + '::' + idx);
    // Tăng biên độ ngẫu nhiên từ 160px đến 420px để có ảnh to ảnh nhỏ rõ rệt
    const w_px = 160 + pseudoRandom(seed) * 260;
    const h_px = w_px / (img.aspectRatio || 1.5);
    // Tốc độ đàn hồi ngẫu nhiên cho từng ảnh để tạo hiệu ứng delay trôi nổi khác nhau khi cuộn
    const _lagSpeed = 0.05 + pseudoRandom(seed + 99) * 0.10;
    void _lagSpeed; // reserved for future parallax use

    let bestX = 0;
    let bestY = 0;
    let found = false;

    for (let attempt = 0; attempt < 1000 && !found; attempt++) {
      // Mỗi lần thử dùng seed khác để tạo vị trí hoàn toàn khác nhau
      const testX = -TABLE_X + pseudoRandom(seed + attempt * 13 + 99) * TABLE_X * 2;
      const testY = -TABLE_Y + pseudoRandom(seed + attempt * 17 + 199) * TABLE_Y * 2;

      let collides = false;
      for (const box of placed) {
        const l1 = testX - w_px / 2 - GAP;
        const r1 = testX + w_px / 2 + GAP;
        const t1 = testY - h_px / 2 - GAP;
        const b1 = testY + h_px / 2 + GAP;
        const l2 = box.x - box.w / 2;
        const r2 = box.x + box.w / 2;
        const t2 = box.y - box.h / 2;
        const b2 = box.y + box.h / 2;
        if (!(l1 > r2 || r1 < l2 || t1 > b2 || b1 < t2)) {
          collides = true;
          break;
        }
      }

      if (!collides) {
        bestX = testX;
        bestY = testY;
        found = true;
      }
    }

    // Nếu vẫn không tìm được sau 1000 lần (rất hiếm), đặt ở góc xa
    if (!found) {
      bestX = -TABLE_X + (idx % 3) * (TABLE_X * 2 / 3) + pseudoRandom(seed + 9999) * 80;
      bestY = -TABLE_Y + Math.floor(idx / 3) * (TABLE_Y * 2 / 3) + pseudoRandom(seed + 8888) * 80;
    }

    placed.push({ x: bestX, y: bestY, w: w_px, h: h_px });
  }

  SERIES_POSITIONS.set(series.id, placed);
}

// --- PHASE 2: Map ALL_IMAGES sang TUNNEL_LAYOUT dùng vị trí đã tính ---
const TUNNEL_LAYOUT = ALL_IMAGES.map((img) => {
  const seriesIndex = portfolioData.series.findIndex(s => s.id === img.seriesId);
  const series = portfolioData.series[seriesIndex];
  const indexInSeries = series ? series.images.findIndex(x => x.src === img.src) : 0;
  const z = -(seriesIndex * CHAPTER_Z_SPACING);

  // Tính toán lagSpeed ngẫu nhiên cho từng ảnh để tạo hiệu ứng delay đàn hồi khi cuộn
  const baseSeed = hashString(img.src);
  const lagSpeed = 0.05 + pseudoRandom(baseSeed + 99) * 0.10;

  const positions = SERIES_POSITIONS.get(img.seriesId) ?? [];
  const pos = positions[indexInSeries] ?? { x: 0, y: 0, w: 250, h: 167 };

  // Chuyển từ pixel ảo sang % để handleResize quy đổi ra pixel thật
  const x = (pos.x / VIRTUAL_W) * 100;
  const y = (pos.y / VIRTUAL_H) * 100;
  const width = (pos.w / VIRTUAL_W) * 100;

  // Giữ đúng aspect ratio gốc của ảnh (yêu cầu 3)
  const ar = img.aspectRatio && img.aspectRatio > 0 ? img.aspectRatio : 1.5;

  return { x, y, z, width, ar, seriesIndex, lagSpeed };
})


export function HomeMosaic() {
  const activeSeriesId = usePortfolioStore((state) => state.activeSeriesId)
  const setActiveSeriesId = usePortfolioStore((state) => state.setActiveSeriesId)
  const setRoute = usePortfolioStore((state) => state.setRoute)
  const currentRoute = usePortfolioStore((state) => state.currentRoute)
  const prevRoute = usePortfolioStore((state) => state.prevRoute)

  const activeIndex = portfolioData.series.findIndex((ser) => ser.id === activeSeriesId)
  const activeSeries = portfolioData.series.find(s => s.id === activeSeriesId)
  
  const [displayTitle, setDisplayTitle] = useState(activeSeries?.title || 'PORTFOLIO')
  const scrambleIntervalRef = useRef<number | null>(null)

  // Sync displayTitle with activeSeries title changes
  useEffect(() => {
    setDisplayTitle(activeSeries?.title || 'PORTFOLIO')
  }, [activeSeries?.title])

  const triggerScramble = (overrideText?: string) => {
    if (scrambleIntervalRef.current) {
      cancelAnimationFrame(scrambleIntervalRef.current)
    }

    const originalText = overrideText || activeSeries?.title || 'PORTFOLIO'
    const glyphs = '0123456789@!#$%&?*+=-_[]{}<>/\\|'
    let frame = 0
    const queue: { to: string; start: number; end: number; char: string | undefined }[] = []

    for (let i = 0; i < originalText.length; i++) {
      const to = originalText[i]!
      // Adjust start/end frames to span around 45 to 60 frames (~1 second at 60fps)
      const start = Math.floor(Math.random() * 15)
      const end = start + Math.floor(Math.random() * 30) + 15
      queue.push({ to, start, end, char: undefined })
    }

    const update = () => {
      let output = ''
      let complete = 0

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i]!
        if (frame >= item.end) {
          complete++
          output += item.to
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.3) {
            item.char = glyphs[Math.floor(Math.random() * glyphs.length)]
          }
          output += item.char
        } else {
          output += ' '
        }
      }

      setDisplayTitle(output)

      if (complete === queue.length) {
        return
      }

      frame++
      scrambleIntervalRef.current = requestAnimationFrame(update)
    }

    update()
  }
  

  const isTransitioningRef = useRef(false)
  const isLeavingPageRef = useRef(false)
  // RAF tự dừng khi home bị ẩn (route khác), tiết kiệm CPU
  const isHomeVisibleRef = useRef(true)
  const activeSeriesIdRef = useRef(activeSeriesId)
  const currentChapterRef = useRef(activeIndex >= 0 ? activeIndex : 0)
  
  const baseCameraRef = useRef<HTMLDivElement>(null)
  const maskedCameraRef = useRef<HTMLDivElement>(null)
  const pageWrapperRef = useRef<HTMLDivElement>(null)
  
  const clipRectRef = useRef<SVGRectElement>(null)
  const glitchCursorRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const baseImagesRef = useRef<(HTMLDivElement | null)[]>([])
  const maskedImagesRef = useRef<(HTMLDivElement | null)[]>([])
  const lastImageVisibleRef = useRef<boolean[]>(Array(ALL_IMAGES.length).fill(false))

  const layoutPxRef = useRef<{ x: number; y: number; z: number; width: number; currentCamZ?: number; frozenRelativeZ?: number }[]>(
    typeof window !== 'undefined' ? TUNNEL_LAYOUT.map((layout) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const isDesktop = w > 800
      const spreadMultiplierX = isDesktop ? 1.0 : 0.6
      const spreadMultiplierY = isDesktop ? 1.0 : 0.6
      const initialZ = activeIndex >= 0 ? activeIndex * CHAPTER_Z_SPACING : 0
      return {
        x: ((layout.x * spreadMultiplierX) / 100) * w,
        y: ((layout.y * spreadMultiplierY) / 100) * h,
        z: layout.z,
        width: (layout.width / 100) * w,
        currentCamZ: initialZ
      }
    }) : []
  )
  const cameraZRef = useRef({ z: activeIndex >= 0 ? activeIndex * CHAPTER_Z_SPACING : 0 })
  const maskSizeRef = useRef({ size: 450 })

  // Transition animation state — RAF ticker đọc từ đây, GSAP animate vào đây
  const transitionStateRef = useRef({ tx: 0, ty: 0, scale: 1, opacity: 1 })

  // Sync RAF start với intro animation
  const rafStartedRef = useRef(false)
  const introCallbackRef = useRef<(() => void) | null>(null)
  // Ref để share hàm recompute layout giữa các useEffect (resize + reset home)
  const recomputeLayoutRef = useRef<(() => void) | null>(null)

  // Lerp state
  const lerpState = useRef({
    mouseX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    mouseY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    maskX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    maskY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    camX: 0,
    camY: 0,
  })

  // Sync isHomeVisibleRef theo currentRoute — không cần re-render
  useEffect(() => {
    isHomeVisibleRef.current = currentRoute === 'home'

    if (currentRoute === 'home') {
      // Kill tất cả tween đang chạy
      gsap.killTweensOf(transitionStateRef.current)
      gsap.killTweensOf(lerpState.current)
      gsap.killTweensOf(maskSizeRef.current)
      gsap.killTweensOf(cameraZRef.current)
      layoutPxRef.current.forEach((px) => { if (px) gsap.killTweensOf(px) })

      // Bật RAF ngay
      isLeavingPageRef.current = false

      // ── Hard reset transitionState về 0 ngay lập tức ──
      // KHÔNG dùng GSAP animate ts — dễ bị xung đột với RAF
      const ts = transitionStateRef.current
      ts.tx = 0
      ts.ty = 0
      ts.scale = 1
      ts.opacity = 1

      // Xóa hết inline style của camera containers để tránh state cũ
      if (baseCameraRef.current) {
        baseCameraRef.current.style.cssText = ''
      }
      if (maskedCameraRef.current) {
        maskedCameraRef.current.style.cssText = ''
      }

      // Reset lerpState
      const w = window.innerWidth
      const h = window.innerHeight
      lerpState.current.mouseX = w / 2
      lerpState.current.mouseY = h / 2
      lerpState.current.maskX = w / 2
      lerpState.current.maskY = h / 2
      lerpState.current.camX = 0
      lerpState.current.camY = 0

      // Reset layoutPx & cameraZ
      const isDesktop = w > 800
      const spreadMultiplierX = isDesktop ? 1.0 : 0.6
      const spreadMultiplierY = isDesktop ? 1.0 : 0.6
      const targetZ = currentChapterRef.current * CHAPTER_Z_SPACING
      cameraZRef.current.z = targetZ
      TUNNEL_LAYOUT.forEach((layout, i) => {
        const px = layoutPxRef.current[i]
        if (!px) return
        px.x = ((layout.x * spreadMultiplierX) / 100) * w
        px.y = ((layout.y * spreadMultiplierY) / 100) * h
        px.width = (layout.width / 100) * w
        px.currentCamZ = targetZ
        delete px.frozenRelativeZ
      })
      if (recomputeLayoutRef.current) recomputeLayoutRef.current()

      // Reset image wrappers
      const allWrappers = [
        ...baseImagesRef.current.filter(Boolean),
        ...maskedImagesRef.current.filter(Boolean)
      ]
      gsap.killTweensOf(allWrappers)
      allWrappers.forEach((el) => {
        if (el) {
          el.style.opacity = ''
          el.style.visibility = ''
          el.style.display = ''
          el.style.transform = ''
        }
      })

      // Mở kính lúp
      maskSizeRef.current.size = 450

      // Reset title
      if (titleRef.current) {
        gsap.killTweensOf(titleRef.current)
        gsap.set(titleRef.current, { opacity: 0, y: 20 })
        gsap.to(titleRef.current, { opacity: 0.7, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' })
      }

      // Đứng yên vị trí chuẩn ngay lập tức khi về Home
      if (pageWrapperRef.current) {
        gsap.killTweensOf(pageWrapperRef.current)
        gsap.set(pageWrapperRef.current, { y: 0, opacity: 1 })
      }

      // YÊU CẦU 1: Khi vừa từ Loader sang Home, bắt đầu từ màn trắng tiến ra như cuộn Z-depth
      if (prevRoute === 'loader') {
        const targetZ = currentChapterRef.current * CHAPTER_Z_SPACING
        cameraZRef.current.z = targetZ - 3500
        layoutPxRef.current.forEach((px) => {
          if (px) px.currentCamZ = targetZ - 3500
        })
        gsap.to(cameraZRef.current, { z: targetZ, duration: 1.8, ease: 'power3.out' })
      }

      window.dispatchEvent(new Event('resize'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoute, prevRoute])


  // Setup GSAP Ticker for Lerp Parallax and Cursor Mask
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      lerpState.current.mouseX = e.clientX
      lerpState.current.mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    // --- Touch hold + drag để di kính lúp trên mobile ---
    let touchHoldTimer: ReturnType<typeof setTimeout> | null = null
    let isDraggingLens = false
    let touchStartPosX = 0
    let touchStartPosY = 0

    const onTouchStartLens = (e: TouchEvent) => {
      if (!e.touches[0]) return
      touchStartPosX = e.touches[0].clientX
      touchStartPosY = e.touches[0].clientY
      isDraggingLens = false
      if (touchHoldTimer) clearTimeout(touchHoldTimer)
      touchHoldTimer = setTimeout(() => {
        isDraggingLens = true
        lerpState.current.mouseX = touchStartPosX
        lerpState.current.mouseY = touchStartPosY
      }, 300)
    }

    const onTouchMoveLens = (e: TouchEvent) => {
      if (!e.touches[0]) return
      const dx = Math.abs(e.touches[0].clientX - touchStartPosX)
      const dy = Math.abs(e.touches[0].clientY - touchStartPosY)
      // Nếu di ngón quá sớm (trước 300ms) → hủy, là swipe thường
      if (!isDraggingLens && (dx > 10 || dy > 10)) {
        if (touchHoldTimer) clearTimeout(touchHoldTimer)
        return
      }
      if (isDraggingLens) {
        lerpState.current.mouseX = e.touches[0].clientX
        lerpState.current.mouseY = e.touches[0].clientY
      }
    }

    const onTouchEndLens = () => {
      if (touchHoldTimer) clearTimeout(touchHoldTimer)
      isDraggingLens = false
      // Kính lúp từ từ quay về giữa màn hình
      lerpState.current.mouseX = window.innerWidth / 2
      lerpState.current.mouseY = window.innerHeight / 2
    }

    window.addEventListener('touchstart', onTouchStartLens, { passive: true })
    window.addEventListener('touchmove', onTouchMoveLens, { passive: true })
    window.addEventListener('touchend', onTouchEndLens, { passive: true })
    // --- Kết thúc touch hold + drag ---

    const ticker = () => {
      // Khị đang transition: vẫn cần chạy ticker để render GSAP animation
      // Chỉ skip phần scroll depth update
      const isLeaving = isLeavingPageRef.current
      const state = lerpState.current
      const cw = window.innerWidth / 2
      const ch = window.innerHeight / 2

      // 1. Lerp mask & cursor
      state.maskX += (state.mouseX - state.maskX) * 0.15
      state.maskY += (state.mouseY - state.maskY) * 0.15

      // Calculate Tilt Rotation based on mouse X (max 15 degrees)
      const rotation = ((state.mouseX / window.innerWidth) - 0.5) * 30

      if (clipRectRef.current) {
        const size = maskSizeRef.current.size
        clipRectRef.current.setAttribute('width', String(size))
        clipRectRef.current.setAttribute('height', String(size))
        clipRectRef.current.setAttribute('x', String(state.maskX - size / 2))
        clipRectRef.current.setAttribute('y', String(state.maskY - size / 2))
        clipRectRef.current.setAttribute('transform', `rotate(${rotation}, ${state.maskX}, ${state.maskY})`)
      }

      if (glitchCursorRef.current) {
        glitchCursorRef.current.style.transform = `translate(${state.maskX}px, ${state.maskY}px) translate(-50%, -50%) rotate(${rotation}deg)`
      }

      // 2. Parallax camera (moves opposite to mouse)
      const targetCamX = (cw - state.mouseX) * 0.4
      const targetCamY = (ch - state.mouseY) * 0.4
      
      state.camX += (targetCamX - state.camX) * 0.08
      state.camY += (targetCamY - state.camY) * 0.08

      // 3. Apply Camera transform: parallax + transition offset kết hợp
      const ts = transitionStateRef.current
      const finalX = state.camX + ts.tx
      const finalY = state.camY + ts.ty
      const transform = `translate3d(${finalX}px, ${finalY}px, 0px) scale(${ts.scale})`
      if (baseCameraRef.current) {
        baseCameraRef.current.style.transform = transform
        baseCameraRef.current.style.opacity = String(ts.opacity)
      }
      if (maskedCameraRef.current) {
        maskedCameraRef.current.style.transform = transform
        maskedCameraRef.current.style.opacity = String(ts.opacity)
      }

      // 4. Update image positions
      if (!isLeaving) {
        // Normal mode: full depth calculation
        const targetCamZ = cameraZRef.current.z
        const LOOP_DEPTH = portfolioData.series.length * CHAPTER_Z_SPACING

        TUNNEL_LAYOUT.forEach((layout, i) => {
          const px = layoutPxRef.current[i]
          if (!px) return

          const baseChapterZ = -(layout.seriesIndex * CHAPTER_Z_SPACING)
          const offset = Math.round((-targetCamZ - baseChapterZ) / LOOP_DEPTH) * LOOP_DEPTH
          const absoluteZ = baseChapterZ + offset
          
          if (px.currentCamZ === undefined) px.currentCamZ = targetCamZ
          px.currentCamZ += (targetCamZ - px.currentCamZ) * (layout.lagSpeed || 0.1)

          const relativeZ = absoluteZ + px.currentCamZ
          
          let depthOpacity = 0
          // Siết chặt vùng hiển thị: Chỉ render các ảnh ở khoảng nhìn thấy rõ (-3000px tới 1200px)
          if (relativeZ >= -3000 && relativeZ <= 1200) {
            if (relativeZ < -1500) {
              depthOpacity = (relativeZ - (-3000)) / 1500
            } else if (relativeZ > 400) {
              depthOpacity = (1200 - relativeZ) / 800
            } else {
              depthOpacity = 1
            }
          }

          const isVisible = depthOpacity > 0.01
          // 2D Projection Formula: focal length = 1000px
          const FOCAL = 1000
          const scale2d = Math.max(0.001, FOCAL / (FOCAL - relativeZ))
          const projX = px.x * scale2d
          const projY = px.y * scale2d

          const imgTransform = `translate(${projX}px, ${projY}px) scale(${scale2d}) translate(-50%, -50%)`

          const baseEl = baseImagesRef.current[i]
          const maskedEl = maskedImagesRef.current[i]

          if (baseEl) {
            baseEl.style.transform = imgTransform
            baseEl.style.opacity = String(depthOpacity)
          }

          if (maskedEl) {
            maskedEl.style.transform = imgTransform
            maskedEl.style.opacity = isVisible ? String(depthOpacity) : '0'
          }

          if (lastImageVisibleRef.current[i] !== isVisible) {
            if (baseEl) {
              baseEl.style.visibility = isVisible ? 'visible' : 'hidden'
            }
            if (maskedEl) {
              maskedEl.style.visibility = isVisible ? 'visible' : 'hidden'
            }
            lastImageVisibleRef.current[i] = isVisible
          }
        })
        // Khi isLeaving=true: GSAP Genie Effect toàn quyền điều khiển transform/opacity
        // RAF loop không được override để tránh xung đột 60fps vs GSAP
      }
    }

    let rafId: number
    let startDelayTimer: ReturnType<typeof setTimeout> | null = null
    const tick = () => {
      // Tạm dừng RAF khi home bị ẩn — tiết kiệm CPU khi ở route khác
      if (isHomeVisibleRef.current) {
        ticker()
      }
      rafId = requestAnimationFrame(tick)
    }

    // Trì hoãn RAF loop cho đến khi browser xử lý xong hydration + decode ảnh
    // Tránh jank 5-10fps ở frame đầu tiên khi mới load trang
    const startLoop = () => {
      // Double RAF: đảm bảo layout đã commit xong trước frame đầu tiên
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          rafId = requestAnimationFrame(tick)
          // RAF đã thực sự chạy → đánh dấu ready và gọi intro nếu đang chờ
          rafStartedRef.current = true
          if (introCallbackRef.current) {
            introCallbackRef.current()
            introCallbackRef.current = null
          }
        })
      })
    }

    if (document.readyState === 'complete') {
      startDelayTimer = setTimeout(startLoop, 100)
    } else {
      window.addEventListener('load', () => {
        startDelayTimer = setTimeout(startLoop, 100)
      }, { once: true })
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchstart', onTouchStartLens)
      window.removeEventListener('touchmove', onTouchMoveLens)
      window.removeEventListener('touchend', onTouchEndLens)
      if (touchHoldTimer) clearTimeout(touchHoldTimer)
      if (startDelayTimer) clearTimeout(startDelayTimer)
      cancelAnimationFrame(rafId)
    }
  }, [])





  // Listen to resize to calculate coordinates in absolute pixels
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const isDesktop = w > 800
      const spreadMultiplierX = isDesktop ? 1.0 : 0.6
      const spreadMultiplierY = isDesktop ? 1.0 : 0.6
      const currentZ = cameraZRef.current.z
      
      layoutPxRef.current = TUNNEL_LAYOUT.map((layout, i) => {
        const existing = layoutPxRef.current[i]
        return {
          x: ((layout.x * spreadMultiplierX) / 100) * w,
          y: ((layout.y * spreadMultiplierY) / 100) * h,
          z: layout.z,
          width: (layout.width / 100) * w,
          currentCamZ: existing && existing.currentCamZ !== undefined ? existing.currentCamZ : currentZ
        }
      })
    }
    
    // Expose ra ngoài để useEffect[currentRoute] có thể gọi khi reset home
    recomputeLayoutRef.current = handleResize

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ── Preload images → queue intro Z-tunnel animation ──
  // onAllLoaded chạy khi preload xong; nếu RAF chưa sẵn, lưu vào queue
  useEffect(() => {
    lerpState.current.mouseX = window.innerWidth / 2
    lerpState.current.mouseY = window.innerHeight / 2
    lerpState.current.maskX = window.innerWidth / 2
    lerpState.current.maskY = window.innerHeight / 2

    const runIntroAnimation = () => {
      // Đặt ngay camera ở vị trí chuẩn, không chạy hiệu ứng lùi xa 3000px gây giật lag
      const targetZ = cameraZRef.current.z
      layoutPxRef.current.forEach((px) => {
        if (px) px.currentCamZ = targetZ
      })
    }

    const onAllLoaded = () => {
      if (rafStartedRef.current) {
        // RAF đã chạy → trigger ngay
        runIntroAnimation()
      } else {
        // RAF chưa sẵn → queue lại
        introCallbackRef.current = runIntroAnimation
      }
    }

    const srcToLoad = Array.from(
      new Set(ALL_IMAGES.map((img) => img.src))
    ).slice(0, 30)

    if (srcToLoad.length === 0) { onAllLoaded(); return }

    let loadedCount = 0
    srcToLoad.forEach((src) => {
      const img = new window.Image()
      img.onload = img.onerror = () => {
        loadedCount++
        if (loadedCount >= srcToLoad.length) onAllLoaded()
      }
      img.src = src
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle Scrolling, Swiping, and Auto-Scroll
  useEffect(() => {
    let lastScrollTime = 0
    const WHEEL_THROTTLE_MS = 300 // Cuộn nhanh ngay lập tức 300ms
    let autoScrollTimer: ReturnType<typeof setInterval> | null = null
    let mouseMoveTimer: ReturnType<typeof setTimeout> | null = null
    let isMouseMoving = false
    // Phát hiện thiết bị có chuột hay không (desktop vs mobile)
    const isTouchDevice = () => !window.matchMedia('(pointer: fine)').matches

    const changeChapter = (direction: 1 | -1) => {
      const now = Date.now()
      // Tăng khoảng cách giữa các lần nhận cuộn chuột để đảm bảo animation chạy xong khoan thai
      if (now - lastScrollTime < WHEEL_THROTTLE_MS) return
      lastScrollTime = now

      if (isTransitioningRef.current) return
      isTransitioningRef.current = true

      currentChapterRef.current += direction
      
      const wrappedIndex = (((currentChapterRef.current % portfolioData.series.length) + portfolioData.series.length) % portfolioData.series.length)
      const nextSeries = portfolioData.series[wrappedIndex]
      if (!nextSeries) {
        isTransitioningRef.current = false
        return
      }
      
      const targetZ = currentChapterRef.current * CHAPTER_Z_SPACING

      // Chuỗi GSAP Timeline chạy TUẦN TỰ LẦN LƯỢT (Sequence)
      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioningRef.current = false
        }
      })

      // 1. Thu nhỏ ô vuông kính lúp trước
      tl.to(maskSizeRef.current, {
        size: 0,
        duration: 0.45,
        ease: 'power2.inOut'
      })

      // 2. SAU KHI thu xong -> Camera mới nhẹ nhàng lướt sang Chapter mới
      tl.to(cameraZRef.current, {
        z: targetZ,
        duration: 1.6,
        ease: 'power3.inOut'
      })

      // 3. SAU KHI camera dừng -> Nở kính lúp trở lại mượt mà
      tl.to(maskSizeRef.current, {
        size: 450,
        duration: 0.75,
        ease: 'power2.out'
      })

      // Đổi tiêu đề chữ chạy song song nhịp nhàng với camera
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.35,
          onComplete: () => {
            if (nextSeries) {
              activeSeriesIdRef.current = nextSeries.id
              setActiveSeriesId(nextSeries.id)
              triggerScramble(nextSeries.title)
            }
            if (titleRef.current) {
              gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
              )
            }
          }
        })
      }

      resetAutoScroll()
    }

    const resetAutoScroll = () => {
      if (autoScrollTimer) clearInterval(autoScrollTimer)
      autoScrollTimer = setInterval(() => {
        // QUAN TRỌNG: Chỉ chạy auto-scroll đổi Album khi thực sự ở trang Home
        if (isHomeVisibleRef.current && !isLeavingPageRef.current && document.visibilityState === 'visible') {
          // Trên desktop: chỉ auto-scroll khi chuột đứng yên
          // Trên mobile (touch device): luôn auto-scroll
          if (isTouchDevice() || !isMouseMoving) {
            changeChapter(1)
          }
        }
      }, 10000)
    }

    const handleMouseMove = () => {
      isMouseMoving = true
      // Reset sau 2 giây không di chuyển chuột
      if (mouseMoveTimer) clearTimeout(mouseMoveTimer)
      mouseMoveTimer = setTimeout(() => {
        isMouseMoving = false
      }, 2000)
    }

    // Start auto scroll
    resetAutoScroll()

    const handleWheel = (e: WheelEvent) => {
      // KHÓA CUỘN: Chỉ xử lý cuộn đổi Album khi đang thực sự ở trang Home
      if (!isHomeVisibleRef.current) return
      if (Math.abs(e.deltaY) <= 30) return
      const direction = e.deltaY > 0 ? 1 : -1
      changeChapter(direction)
    }

    // Touch support
    let touchStartX = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!isHomeVisibleRef.current) return
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isHomeVisibleRef.current) return
      if (e.changedTouches && e.changedTouches[0]) {
        const touchEndX = e.changedTouches[0].clientX
        const dx = touchEndX - touchStartX
        
        // Swipe threshold
        if (Math.abs(dx) > 40) {
          const direction = dx < 0 ? 1 : -1 // Swipe left -> next (+1), swipe right -> prev (-1)
          changeChapter(direction)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    // Clear timer when leaving page or unmounting
    return () => {
      if (autoScrollTimer) clearInterval(autoScrollTimer)
      if (mouseMoveTimer) clearTimeout(mouseMoveTimer)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [activeIndex, setActiveSeriesId])

  const handleTransitionOut = () => {
    if (isLeavingPageRef.current) return
    isLeavingPageRef.current = true

    // Thu nhỏ kính lúp + ẩn tiêu đề (KHÔNG thay đổi hệ thống kính lúp gốc)
    gsap.to(maskSizeRef.current, { size: 0, duration: 0.25, ease: 'power2.inOut' })
    if (titleRef.current) {
      gsap.to(titleRef.current, { opacity: 0, y: -20, duration: 0.22, ease: 'power2.in' })
    }

    // YÊU CẦU 2: Genie Effect — từng ảnh đơn lẻ hút lần lượt về MIDPOINT OF BOTTOM EDGE
    type VisibleCard = { el: HTMLDivElement; cx: number; cy: number }
    const visibleCards: VisibleCard[] = []

    // Choose visible cards based on real layout + computed opacity, not
    // only inline `visibility` which may be stale after recent refactors.
    baseImagesRef.current.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Prefer inline style opacity but fall back to computed style
      const inlineOpacity = parseFloat(el.style.opacity || '')
      const computedOpacity = inlineOpacity || parseFloat(getComputedStyle(el).opacity || '0')
      const opacity = Number.isFinite(inlineOpacity) && inlineOpacity > 0 ? inlineOpacity : computedOpacity

      const inViewport = rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight && rect.right >= 0 && rect.left <= window.innerWidth

      if (opacity > 0.05 && inViewport) {
        visibleCards.push({ el, cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 })
      }
    })

    if (visibleCards.length === 0) {
      setRoute('detail')
      return
    }

    // Điểm hút: chính giữa mép dưới màn hình
    const targetX = window.innerWidth / 2
    const targetY = window.innerHeight

    // Sắp xếp từ xa nhất đến gần điểm hút
    visibleCards.sort((a, b) =>
      Math.hypot(b.cx - targetX, b.cy - targetY) - Math.hypot(a.cx - targetX, a.cy - targetY)
    )

    visibleCards.forEach((card, order) => {
      const delay = order * 0.06
      const deltaX = targetX - card.cx
      const deltaY = targetY - card.cy
      gsap.timeline()
        .to(card.el, { scale: 1.08, duration: 0.1, ease: 'power2.out', delay, overwrite: 'auto' })
        .to(card.el, { x: `+=${deltaX}`, y: `+=${deltaY}`, scale: 0, opacity: 0, duration: 0.4, ease: 'power3.in' })
    })

    const totalDuration = (visibleCards.length - 1) * 0.06 + 0.55
    gsap.delayedCall(totalDuration, () => setRoute('detail'))
  }

  const handleImageClick = () => {
    handleTransitionOut()
  }

  // No scale animation on hover — cursor frame is purely visual for previewing
  const handleMouseEnter = (_i: number) => { /* intentionally empty */ }
  const handleMouseLeave = (_i: number) => { /* intentionally empty */ }

  const renderImages = (isMasked: boolean) => {
    return ALL_IMAGES.map((img, i) => {
      const layout = TUNNEL_LAYOUT[i]!
      return (
        <ScatteredImage
          key={`${img.seriesId}-${i}-${isMasked ? 'mask' : 'base'}`}
          ref={(el) => {
            if (isMasked) {
              maskedImagesRef.current[i] = el
            } else {
              baseImagesRef.current[i] = el
            }
          }}
          src={img.src}
          aspectRatio={img.aspectRatio}
          isMasked={isMasked}
          className={s.imageWrapper}
          style={{
            width: `${layout.width}vw`,
            '--entrance-delay': `${(i % 12) * 0.08}s`
          } as React.CSSProperties}
          onClick={handleImageClick}
          onMouseEnter={!isMasked ? () => handleMouseEnter(i) : undefined}
          onMouseLeave={!isMasked ? () => handleMouseLeave(i) : undefined}
        />
      )
    })
  }


  return (
    <>
      <div ref={pageWrapperRef} className={s.pageWrapper}>
        <svg style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <filter id="soft-blur">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <mask id="cursor-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
              <rect width="100%" height="100%" fill="black" />
              <rect ref={clipRectRef} width="450" height="450" fill="white" filter="url(#soft-blur)" />
            </mask>
          </defs>
        </svg>

        <div className={cn(s.mosaicPage, s.layerBase)}>
          <div ref={baseCameraRef} className={s.cameraContainer}>
            {renderImages(false)}
          </div>
        </div>

        <div className={cn(s.mosaicPage, s.maskedPage)}>
          <div ref={maskedCameraRef} className={s.cameraContainer}>
            {renderImages(true)}
          </div>
        </div>

        {/* Glitch Square Cursor - Invisible frame wrapper */}
        <div ref={glitchCursorRef} className={s.glitchCursor} />

        {/* UI Overlay */}
        <div className={s.floatingUI}>
          <div 
            className={s.titleContainer} 
            onClick={handleTransitionOut}
          >
            <h1 
              ref={titleRef} 
              className={s.title}
              style={{ fontFamily: "'BorelLocal', 'Borel', cursive" }}
            >
              {displayTitle}
            </h1>
          </div>

          <div className={s.bottomCenter}>
            <span className={s.scrollText}>
              <span className={s.desktopText}>SCROLL TO EXPLORE CHAPTERS</span>
              <span className={s.mobileText}>VUỐT TRÁI, VUỐT PHẢI</span>
            </span>
          </div>
          <div className={s.bottomRight}>
            <span className={s.counter}>
              {activeIndex + 1} OF {portfolioData.series.length}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
