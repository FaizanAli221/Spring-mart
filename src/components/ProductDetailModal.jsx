import { useState, useEffect } from 'react'
import { X, Plus, Minus, Check, ShoppingBag, ShieldCheck, Truck, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'

const currency = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
})

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart, updateQty, getQty, openCart } = useCart()
  const [selectedQty, setSelectedQty] = useState(1)
  const [addedAnimation, setAddedAnimation] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!product) return null

  const currentCartQty = getQty(product.id)
  const hasDiscount = product.discountPercent > 0
  const savings = hasDiscount ? product.oldPrice - product.price : 0

  const handleAdd = () => {
    addToCart(product, selectedQty)
    setAddedAnimation(true)
    setTimeout(() => setAddedAnimation(false), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close modal background"
      />

      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-[scaleUp_0.2s_ease-out]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-ink shadow-md transition-colors"
        >
          <X size={20} />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-cream flex items-center justify-center min-h-[260px] md:min-h-[360px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[380px]"
          />
          {hasDiscount && (
            <span className="absolute top-4 left-4 bg-maroon text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.featured && (
            <span className="absolute bottom-4 left-4 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
              <Sparkles size={13} /> Exclusive
            </span>
          )}
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 p-6 flex flex-col overflow-y-auto">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-maroon">
              {product.category}
            </span>
            <h2 className="font-display text-xl font-bold text-ink mt-1 leading-snug">
              {product.name}
            </h2>
            <p className="text-xs text-ink/60 mt-0.5">{product.unit}</p>
          </div>

          <div className="flex items-baseline gap-2.5 my-3">
            <span className="text-2xl font-bold text-ink">
              {currency.format(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-ink/40 line-through">
                {currency.format(product.oldPrice)}
              </span>
            )}
            {savings > 0 && (
              <span className="text-xs text-emerald-700 bg-emerald-50 font-medium px-2 py-0.5 rounded-full">
                Save {currency.format(savings)}
              </span>
            )}
          </div>

          <p className="text-sm text-ink/70 leading-relaxed mb-4">
            {product.description ||
              `Premium quality ${product.name}, hand-selected for freshness and guaranteed satisfaction from Springs Mini Mart.`}
          </p>

          <div className="space-y-2 py-3 border-y border-ink/10 text-xs text-ink/70 mb-5">
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-maroon flex-shrink-0" />
              <span>Fast same-day delivery across Karachi, Lahore & Islamabad</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-maroon flex-shrink-0" />
              <span>100% Freshness & Quality Guaranteed</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-auto pt-2">
            {product.inStock ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-ink uppercase tracking-wider">
                    Quantity:
                  </span>
                  <div className="flex items-center gap-2 bg-cream border border-ink/15 rounded-full px-2 py-1">
                    <button
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      aria-label="Decrease"
                      className="p-1 hover:text-maroon transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{selectedQty}</span>
                    <button
                      onClick={() => setSelectedQty(selectedQty + 1)}
                      aria-label="Increase"
                      className="p-1 hover:text-maroon transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3 px-4 font-semibold text-sm transition-all shadow ${
                      addedAnimation
                        ? 'bg-green-600 text-white'
                        : 'bg-maroon hover:bg-maroon-dark text-white'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check size={16} strokeWidth={3} />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        Add to Cart ({currency.format(product.price * selectedQty)})
                      </>
                    )}
                  </button>
                  {currentCartQty > 0 && (
                    <button
                      onClick={() => {
                        onClose()
                        openCart()
                      }}
                      className="px-4 py-3 rounded-full border border-ink/20 hover:border-maroon text-ink hover:text-maroon text-xs font-semibold transition-colors"
                    >
                      View Cart ({currentCartQty})
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-ink/5 rounded-xl text-center text-sm font-medium text-ink/60">
                Currently Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
