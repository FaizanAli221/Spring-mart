import { Menu, ShoppingCart } from 'lucide-react'
import { useFilters } from '../context/FilterContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { openMenu } = useFilters()
  const { cartCount, openCart } = useCart()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-ink/10">
      <div className="flex items-center justify-between px-4 md:px-6 py-3.5 max-w-6xl mx-auto">
        <button
          onClick={openMenu}
          aria-label="Open menu"
          className="p-1.5 -ml-1.5 text-ink hover:text-maroon transition-colors"
        >
          <Menu size={26} strokeWidth={1.75} />
        </button>

        <a href="#top" className="flex flex-col items-center leading-none select-none">
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-wide text-maroon">
            Springs
          </span>
          <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-ink/50 mt-0.5">
            MINI MART · EST. 2015
          </span>
        </a>

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
