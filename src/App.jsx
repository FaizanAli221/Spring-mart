import { useEffect, useState } from 'react'
import { CartProvider } from './context/CartContext'
import { FilterProvider, useFilters } from './context/FilterContext'
import { WishlistProvider } from './context/WishlistContext'
import { fetchCategories, fetchProducts } from './api/client'

import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import MenuDrawer from './components/MenuDrawer'
import CartDrawer from './components/CartDrawer'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'
import ProductDetailModal from './components/ProductDetailModal'

import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import DealsPage from './pages/DealsPage'
import OrdersPage from './pages/OrdersPage'
import TrackOrderPage from './pages/TrackOrderPage'
import WishlistPage from './pages/WishlistPage'
import HelpContactPage from './pages/HelpContactPage'
import AboutPage from './pages/AboutPage'

const VALID_PAGES = ['home', 'categories', 'deals', 'orders', 'track', 'wishlist', 'help', 'about']

function StoreApp() {
  const { activeCategory, setActiveCategory, searchQuery } = useFilters()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Navigation State: 'home' | 'categories' | 'deals' | 'orders' | 'track' | 'wishlist' | 'help' | 'about'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    if (VALID_PAGES.includes(hash)) return hash
    return 'home'
  })

  // Modal & Tracking state
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [trackedOrderId, setTrackedOrderId] = useState('')

  // Hash syncing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (VALID_PAGES.includes(hash)) {
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

  const handleSelectDepartment = (categoryName) => {
    setActiveCategory(categoryName)
    navigateTo('home')
    setTimeout(() => {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
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

      {currentPage === 'categories' && (
        <CategoriesPage
          categories={categories}
          products={products}
          onSelectCategory={handleSelectDepartment}
          onSelectProduct={setSelectedProduct}
        />
      )}

      {currentPage === 'deals' && (
        <DealsPage
          products={products}
          loading={loading}
          onSelectProduct={setSelectedProduct}
        />
      )}

      {currentPage === 'orders' && (
        <OrdersPage
          onTrackOrder={(id) => navigateTo('track', id)}
          onShopNow={() => navigateTo('home')}
        />
      )}

      {currentPage === 'track' && (
        <TrackOrderPage initialOrderId={trackedOrderId} />
      )}

      {currentPage === 'wishlist' && (
        <WishlistPage
          onSelectProduct={setSelectedProduct}
          onShopNow={() => navigateTo('home')}
        />
      )}

      {currentPage === 'help' && <HelpContactPage />}

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
        <WishlistProvider>
          <StoreApp />
        </WishlistProvider>
      </CartProvider>
    </FilterProvider>
  )
}
