import { create } from 'zustand'

export type RouteType = 'loader' | 'home' | 'detail' | 'shop' | 'product' | 'about'
export type CursorType = 'default' | 'view' | 'drag' | 'close' | 'pointer'

interface PortfolioState {
  currentRoute: RouteType
  prevRoute: RouteType | null
  menuOpen: boolean
  activeSeriesId: string // 'monuments' | 'chrysalises' | 'uncanny-spaces'
  activePhotoIndex: number
  activeProductId: string | null
  infoOpen: boolean
  cart: string[]
  cursorType: CursorType
  scrollPosition: number
  
  // Actions
  setRoute: (route: RouteType) => void
  toggleMenu: (open?: boolean) => void
  setActiveSeriesId: (id: string) => void
  setActivePhotoIndex: (index: number) => void
  setActiveProductId: (id: string | null) => void
  setInfoOpen: (open: boolean) => void
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  setCursorType: (type: CursorType) => void
  setScrollPosition: (pos: number) => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  currentRoute: 'home',
  prevRoute: null,
  menuOpen: false,
  activeSeriesId: 'osean',
  activePhotoIndex: 0,
  activeProductId: null,
  infoOpen: false,
  cart: [],
  cursorType: 'default',
  scrollPosition: 0,

  setRoute: (route) => set((state) => ({ 
    prevRoute: state.currentRoute,
    currentRoute: route,
    // Automatically close menus and statement when navigating
    menuOpen: false,
    infoOpen: false
  })),
  toggleMenu: (open) => set((state) => ({ menuOpen: open !== undefined ? open : !state.menuOpen })),
  setActiveSeriesId: (id) => set({ activeSeriesId: id }),
  setActivePhotoIndex: (index) => set({ activePhotoIndex: index }),
  setActiveProductId: (id) => set({ activeProductId: id }),
  setInfoOpen: (open) => set({ infoOpen: open }),
  addToCart: (id) => set((state) => ({ cart: [...state.cart, id] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item !== id) })),
  setCursorType: (type) => set({ cursorType: type }),
  setScrollPosition: (pos) => set({ scrollPosition: pos }),
}))
