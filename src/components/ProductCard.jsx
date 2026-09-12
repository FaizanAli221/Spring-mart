import { Plus, Minus, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const currency = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
})

export default function ProductCard({ product, onSelect }) {
  const { addToCart, updateQty, getQty } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const qty = getQty(product.id)
  const hasDiscount = product.discountPercent > 0
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="flex flex-col rounded-card border border-ink/10 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div
        onClick={() => onSelect && onSelect(product)}
        className="relative aspect-square bg-cream cursor-pointer group"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product)
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all shadow-sm ${
            wishlisted
              ? 'bg-white text-red-600'
              : 'bg-white/80 hover:bg-white text-ink/40 hover:text-red-500'
          }`}
        >
          <Heart size={14} className={wishlisted ? 'fill-red-600' : ''} />
        </button>

        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-maroon text-white text-[10px] font-bold px-1.5 py-1 rounded-md">
            {product.discountPercent}% OFF
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-semibold text-ink/70 bg-white px-2 py-1 rounded-md border border-ink/15">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3">
        <p className="text-[10px] uppercase tracking-wide text-maroon/70 font-medium mb-0.5">
          {product.category}
        </p>
        <h3
          onClick={() => onSelect && onSelect(product)}
          className="text-sm font-medium text-ink leading-snug line-clamp-2 mb-1 cursor-pointer hover:text-maroon transition-colors"
        >
          {product.name}
        </h3>
        <p className="text-xs text-ink/50 mb-2">{product.unit}</p>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-semibold text-ink">{currency.format(product.price)}</span>
            {hasDiscount && (
              <span className="text-xs text-ink/40 line-through">
                {currency.format(product.oldPrice)}
              </span>
            )}
          </div>

          {product.inStock &&
            (qty === 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="text-xs font-semibold text-maroon border border-maroon rounded-full px-3 py-1.5 hover:bg-maroon hover:text-white transition-colors whitespace-nowrap"
              >
                Add
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-maroon rounded-full text-white">
                <button
                  onClick={() => updateQty(product.id, qty - 1)}
                  aria-label="Decrease quantity"
                  className="p-1.5 hover:bg-maroon-dark rounded-full transition-colors"
                >
                  <Minus size={13} strokeWidth={2.5} />
                </button>
                <span className="text-xs font-semibold w-4 text-center">{qty}</span>
                <button
                  onClick={() => updateQty(product.id, qty + 1)}
                  aria-label="Increase quantity"
                  className="p-1.5 hover:bg-maroon-dark rounded-full transition-colors"
                >
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
