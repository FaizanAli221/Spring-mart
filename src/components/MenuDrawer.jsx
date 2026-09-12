import { X, UtensilsCrossed, Croissant, Store, ChevronRight, Compass, Flame, Package, Info } from 'lucide-react'
import { useFilters } from '../context/FilterContext'
import { mockDrawerCategories } from '../data/mockData'

const quickAccess = [
  { label: 'Fresh Fruits', icon: UtensilsCrossed, category: 'Fresh Fruits & Veggies' },
  { label: 'Bakery', icon: Croissant, category: 'Bakery & Pastries' },
  { label: 'Stores', icon: Store, isPage: true, pageId: 'about' },
]

export default function MenuDrawer({ onNavigate = () => {} }) {
  const { isMenuOpen, closeMenu, setActiveCategory } = useFilters()

  if (!isMenuOpen) return null

  const handleCategoryClick = (name) => {
    onNavigate('home')
    setActiveCategory(name)
    closeMenu()
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePageClick = (pageId) => {
    onNavigate(pageId)
    closeMenu()
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <button
        aria-label="Close menu"
        onClick={closeMenu}
        className="absolute inset-0 bg-ink/50"
      />

      {/* Drawer panel */}
      <div className="relative w-[85%] max-w-sm bg-white h-full overflow-y-auto shadow-2xl animate-[slideIn_0.25s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10 sticky top-0 bg-white z-10">
          <h2 className="font-display font-semibold tracking-wide text-ink">Menu & Explore</h2>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-full bg-ink text-white hover:bg-ink/80 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Primary Pages Navigation */}
        <div className="p-4 space-y-1.5 border-b border-ink/10 bg-cream/30">
          <button
            onClick={() => handlePageClick('home')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-ink hover:bg-cream transition-colors"
          >
            <Compass size={18} className="text-maroon" />
            <span>Shop Home</span>
          </button>
          <button
            onClick={() => handlePageClick('deals')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-ink hover:bg-cream transition-colors"
          >
            <div className="flex items-center gap-3">
              <Flame size={18} className="text-red-600" />
              <span>Flash Deals & Savings</span>
            </div>
            <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">
              Hot
            </span>
          </button>
          <button
            onClick={() => handlePageClick('track')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-ink hover:bg-cream transition-colors"
          >
            <Package size={18} className="text-maroon" />
            <span>Track Order</span>
          </button>
          <button
            onClick={() => handlePageClick('about')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-ink hover:bg-cream transition-colors"
          >
            <Info size={18} className="text-maroon" />
            <span>About Us & Store Locations</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 px-5 py-4 border-b border-ink/10">
          {quickAccess.map(({ label, icon: Icon, isPage, pageId, category }) => (
            <button
              key={label}
              onClick={() => (isPage ? handlePageClick(pageId) : handleCategoryClick(category || label))}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-ink/15 py-4 hover:border-maroon hover:text-maroon transition-colors"
            >
              <Icon size={24} strokeWidth={1.5} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleCategoryClick('all')}
          className="w-full text-left px-5 py-3.5 bg-maroon text-white font-medium flex items-center justify-between"
        >
          <span>All Departments & Products</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-semibold">35 Items</span>
        </button>

        <nav className="divide-y divide-ink/10">
          {mockDrawerCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left text-maroon-dark hover:bg-cream transition-colors"
            >
              <span>{cat}</span>
              <ChevronRight size={16} className="text-ink/40" />
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
