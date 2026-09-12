import { X, UtensilsCrossed, Croissant, Store, ChevronRight } from 'lucide-react'
import { useFilters } from '../context/FilterContext'
import { mockDrawerCategories } from '../data/mockData'

const quickAccess = [
  { label: 'Cafe', icon: UtensilsCrossed },
  { label: 'Bakery', icon: Croissant },
  { label: 'Stores', icon: Store },
]

export default function MenuDrawer() {
  const { isMenuOpen, closeMenu, setActiveCategory } = useFilters()

  if (!isMenuOpen) return null

  const handleCategoryClick = (name) => {
    setActiveCategory(name)
    closeMenu()
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
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
          <h2 className="font-display font-semibold tracking-wide text-ink">Menu</h2>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="p-2 rounded-full bg-ink text-white hover:bg-ink/80 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 px-5 py-4 border-b border-ink/10">
          {quickAccess.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => handleCategoryClick(label)}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-ink/15 py-4 hover:border-maroon hover:text-maroon transition-colors"
            >
              <Icon size={24} strokeWidth={1.5} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleCategoryClick('Home & Beyond')}
          className="w-full text-left px-5 py-3.5 bg-maroon text-white font-medium border-b border-white/10"
        >
          Home & Beyond
        </button>
        <button
          onClick={() => handleCategoryClick('all')}
          className="w-full text-left px-5 py-3.5 bg-maroon text-white font-medium"
        >
          Trending Products
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
