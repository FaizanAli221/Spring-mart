import { useEffect, useState } from 'react'
import { CartProvider } from './context/CartContext'
import { FilterProvider, useFilters } from './context/FilterContext'
import { fetchCategories, fetchProducts } from './api/client'

import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import MenuDrawer from './components/MenuDrawer'
import CartDrawer from './components/CartDrawer'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'
import ProductDetailModal from './components/ProductDetailModal'

import HomePage from './pages/HomePage'
import DealsPage from './pages/DealsPage'
import TrackOrderPage from './pages/TrackOrderPage'
import AboutPage from './pages/AboutPage'

function StoreApp() {
  const { activeCategory, searchQuery } = useFilters()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Navigation State: 'home' | 'deals' | 'track' | 'about'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    if (['home', 'deals', 'track', 'about'].includes(hash)) return hash
    return 'home'
  })

  // Modal & Tracking state
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [trackedOrderId, setTrackedOrderId] = useState('')

  // Hash syncing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (['home', 'deals', 'track', 'about'].includes(hash)) {
        setCurrentPage(hash)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (pageId, param = '') => {
    setCurrentPage(pageId)
    window.location.hash = pageId
    if (pageId === 'track' && param) {
      setTrackedOrderId(param)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Data fetching
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
    <div id="top" className="min-h-screen bg-cream flex flex-col font-sans text-ink">
      <AnnouncementBar />
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Pages View */}
      {currentPage === 'home' && (
        <HomePage
          categories={categories}
          products={products}
          loading={loading}
          onSelectProduct={setSelectedProduct}
          onNavigate={navigateTo}
        />
      )}

      {currentPage === 'deals' && (
        <DealsPage
          products={products}
          loading={loading}
          onSelectProduct={setSelectedProduct}
        />
      )}

      {currentPage === 'track' && (
        <TrackOrderPage initialOrderId={trackedOrderId} />
      )}

      {currentPage === 'about' && <AboutPage />}

      <Footer onNavigate={navigateTo} />
      <MenuDrawer onNavigate={navigateTo} />
      <CartDrawer onTrackOrder={(id) => navigateTo('track', id)} />
      <WhatsAppButton />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <FilterProvider>
      <CartProvider>
        <StoreApp />
      </CartProvider>
    </FilterProvider>
  )
}
