import { useState, useEffect } from 'react'
import { Menu, ShoppingCart, Flame, Compass, Package, Info, Heart, Layers, History, HelpCircle, MapPin, Phone, ChevronDown, Zap } from 'lucide-react'
import { useFilters } from '../context/FilterContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import LocationModal from './LocationModal'

export default function Header({ currentPage = 'home', onNavigate = () => {} }) {
  const { openMenu } = useFilters()
  const { cartCount, openCart } = useCart()
  const { wishlistCount } = useWishlist()

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [deliveryLocation, setDeliveryLocation] = useState('Bahria Town (Phases 1-8)')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('springs_mart_delivery_location')
      if (saved) setDeliveryLocation(saved)
    } catch {
      // ignore
    }
  }, [])

  const handleSelectLocation = (area, city) => {
    const fullLoc = `${area}, ${city.split('/')[0].trim()}`
    setDeliveryLocation(fullLoc)
    try {
      localStorage.setItem('springs_mart_delivery_location', fullLoc)
    } catch {
      // ignore
    }
  }

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'categories', label: 'Departments', icon: Layers },
    { id: 'deals', label: 'Flash Deals', icon: Flame, badge: 'HOT' },
    { id: 'orders', label: 'My Orders', icon: History },
    { id: 'track', label: 'Track Order', icon: Package },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'about', label: 'Stores', icon: Info },
  ]

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-ink text-white text-[11px] py-1.5 px-4 md:px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Location Selector */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors group"
          >
            <MapPin size={13} className="text-emerald-400 group-hover:animate-bounce" />
            <span className="text-white/60 hidden sm:inline">Deliver to:</span>
            <span className="font-semibold underline decoration-white/40 underline-offset-2 truncate max-w-[200px] sm:max-w-[300px]">
              {deliveryLocation}
            </span>
            <ChevronDown size={12} className="text-white/60" />
          </button>

          {/* Value Perks & Helpline */}
          <div className="flex items-center gap-4 text-white/80">
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <Zap size={12} /> 30-Min Express Available
            </span>
            <span className="hidden lg:inline text-white/40">|</span>
            <span className="hidden lg:inline">
              🚚 Free Delivery over Rs. 3,000
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href="tel:051111777464"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white font-medium"
            >
              <Phone size={12} className="text-amber-400" />
              <span className="hidden sm:inline">Helpline:</span> 051-111-777-464
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-30 bg-white border-b border-ink/10 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-2.5 max-w-7xl mx-auto">
          {/* Left: Mobile menu button & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={openMenu}
              aria-label="Open menu"
              className="p-1.5 -ml-1.5 text-ink hover:text-maroon transition-colors md:hidden"
            >
              <Menu size={26} strokeWidth={1.75} />
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-start leading-none select-none text-left"
            >
              <span className="font-display text-2xl md:text-3xl font-semibold tracking-wide text-maroon">
                Springs
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-ink/50 mt-0.5">
                MINI MART · EST. 2015
              </span>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-cream/70 p-1 rounded-full border border-ink/10">
            {navLinks.map(({ id, label, icon: Icon, badge }) => {
              const isActive = currentPage === id
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-maroon text-white shadow-sm'
                      : 'text-ink/70 hover:text-maroon hover:bg-white/80'
                  }`}
                >
                  <Icon size={13} className={isActive ? 'text-white' : 'text-maroon'} />
                  <span>{label}</span>
                  {badge && (
                    <span
                      className={`text-[8px] px-1 py-0.2 rounded font-bold uppercase ${
                        isActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right: Wishlist & Cart Buttons */}
          <div className="flex items-center gap-1">
            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('wishlist')}
              aria-label="View Wishlist"
              className={`relative p-2 rounded-full transition-colors ${
                currentPage === 'wishlist'
                  ? 'text-red-600 bg-red-50'
                  : 'text-ink/70 hover:text-red-600 hover:bg-cream'
              }`}
            >
              <Heart size={21} strokeWidth={1.75} className={wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 rounded-full bg-red-600 text-white text-[9px] font-bold shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative p-2 rounded-full text-ink hover:text-maroon hover:bg-cream transition-colors"
            >
              <ShoppingCart size={22} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[17px] h-[17px] px-1 rounded-full bg-maroon text-white text-[9px] font-bold shadow-sm">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={deliveryLocation}
        onSelectLocation={handleSelectLocation}
      />
    </>
  )
}
