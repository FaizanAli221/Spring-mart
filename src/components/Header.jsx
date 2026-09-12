import { Menu, ShoppingCart, Flame, Compass, Package, Info } from 'lucide-react'
import { useFilters } from '../context/FilterContext'
import { useCart } from '../context/CartContext'

export default function Header({ currentPage = 'home', onNavigate = () => {} }) {
  const { openMenu } = useFilters()
  const { cartCount, openCart } = useCart()

  const navLinks = [
    { id: 'home', label: 'Shop Home', icon: Compass },
    { id: 'deals', label: 'Flash Deals', icon: Flame, badge: 'HOT' },
    { id: 'track', label: 'Track Order', icon: Package },
    { id: 'about', label: 'About & Stores', icon: Info },
  ]

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-ink/10 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-6xl mx-auto">
        {/* Left: Mobile menu button */}
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
        <nav className="hidden md:flex items-center gap-1 bg-cream/70 p-1 rounded-full border border-ink/10">
          {navLinks.map(({ id, label, icon: Icon, badge }) => {
            const isActive = currentPage === id
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-maroon text-white shadow-sm'
                    : 'text-ink/70 hover:text-maroon hover:bg-white/80'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-maroon'} />
                <span>{label}</span>
                {badge && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase ${
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

        {/* Right: Cart Button */}
        <button
          onClick={openCart}
          aria-label="Open cart"
          className="relative p-1.5 -mr-1.5 text-ink hover:text-maroon transition-colors"
        >
          <ShoppingCart size={24} strokeWidth={1.75} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-maroon text-white text-[10px] font-semibold">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
