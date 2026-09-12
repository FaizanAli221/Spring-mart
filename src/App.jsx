import { useEffect, useState } from 'react'
import { CartProvider } from './context/CartContext'
import { FilterProvider, useFilters } from './context/FilterContext'
import { fetchCategories, fetchProducts } from './api/client'

import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import MenuDrawer from './components/MenuDrawer'
import Hero from './components/Hero'
import CategoryGrid from './components/CategoryGrid'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'

function StorePage() {
  const { activeCategory, searchQuery } = useFilters()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    fetchCategories().then((data) => {
      if (isMounted) setCategories(data)
    })
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetchProducts({ category: activeCategory, search: searchQuery }).then((data) => {
      if (isMounted) {
        setProducts(data)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [activeCategory, searchQuery])

  return (
    <div id="top" className="min-h-screen bg-cream flex flex-col">
      <AnnouncementBar />
      <Header />
      <SearchBar />
      <Hero />
      <CategoryGrid categories={categories} />

      <main id="shop" className="flex-1 px-4 md:px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-ink">
            {activeCategory === 'all' ? 'All products' : activeCategory}
          </h2>
          <span className="text-sm text-ink/50">{products.length} items</span>
        </div>
        <ProductGrid products={products} loading={loading} />
      </main>

      <Footer />
      <MenuDrawer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <FilterProvider>
      <CartProvider>
        <StorePage />
      </CartProvider>
    </FilterProvider>
  )
}
