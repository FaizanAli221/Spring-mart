import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function WishlistPage({ onSelectProduct = () => {}, onShopNow = () => {} }) {
  const { wishlistItems, clearWishlist } = useWishlist()
  const { addToCart, openCart } = useCart()

  const handleAddAllToCart = () => {
    wishlistItems.forEach((product) => {
      addToCart(product, 1)
    })
    openCart()
  }

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-6 w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-ink/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart size={20} className="text-red-500 fill-red-500" />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">
              My Saved Wishlist
            </h1>
          </div>
          <p className="text-xs md:text-sm text-ink/60">
            Keep track of items you love. They are saved on this device for your next grocery order.
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-ink/20 hover:border-red-500 text-xs font-semibold text-ink/60 hover:text-red-600 transition-colors"
            >
              <Trash2 size={13} />
              <span>Clear All</span>
            </button>
            <button
              onClick={handleAddAllToCart}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-maroon hover:bg-maroon-dark text-white text-xs font-semibold shadow transition-colors"
            >
              <ShoppingBag size={14} />
              <span>Add All to Cart ({wishlistItems.length})</span>
            </button>
          </div>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink/10 p-12 text-center shadow-sm max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-4">
            <Heart size={32} />
          </div>
          <h3 className="font-display font-semibold text-xl text-ink">Your Wishlist is Empty</h3>
          <p className="text-xs text-ink/60 mt-1 mb-6 leading-relaxed">
            Tap the heart icon on any product in the store to save it here for quick re-ordering later!
          </p>
          <button
            onClick={onShopNow}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon hover:bg-maroon-dark text-white text-xs md:text-sm font-semibold shadow transition-colors"
          >
            <span>Explore Fresh Groceries</span>
            <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  )
}
