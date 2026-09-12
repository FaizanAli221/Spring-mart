import { createContext, useContext, useState } from 'react'

const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setMenuOpen] = useState(false)

  const value = {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isMenuOpen,
    openMenu: () => setMenuOpen(true),
    closeMenu: () => setMenuOpen(false),
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used within a FilterProvider')
  return ctx
}
