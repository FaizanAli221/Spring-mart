import { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { createOrder } from '../api/client'

const currency = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
})

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQty, removeFromCart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState('cart') // 'cart' | 'checkout' | 'success'
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState(null)
  const [orderError, setOrderError] = useState('')

  if (!isCartOpen) return null

  const handleClose = () => {
    closeCart()
    if (step === 'success') {
      setStep('cart')
      setOrderResult(null)
    }
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault()
    setOrderError('')
    setIsSubmitting(true)

    try {
      const payload = {
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
        },
        items: items.map(({ product, qty }) => ({
          productId: product.id,
          quantity: qty,
        })),
        totalAmount: cartTotal,
      }

      const result = await createOrder(payload)
      setOrderResult(result)
      clearCart()
      setStep('success')
    } catch (err) {
      setOrderError(err.message || 'Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close cart" onClick={handleClose} className="absolute inset-0 bg-ink/50" />

      <div className="relative w-[90%] max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10">
          <div className="flex items-center gap-2">
            {step === 'checkout' && (
              <button
                onClick={() => setStep('cart')}
                aria-label="Back to cart"
                className="p-1 hover:text-maroon transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <h2 className="font-display font-semibold text-lg text-ink">
              {step === 'cart' && 'Your cart'}
              {step === 'checkout' && 'Checkout (COD)'}
              {step === 'success' && 'Order Confirmed'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close cart"
            className="p-2 rounded-full bg-ink text-white hover:bg-ink/80 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {step === 'success' && orderResult ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
            <CheckCircle2 size={54} className="text-green-600 mb-3" />
            <h3 className="font-display font-semibold text-xl text-ink">Thank You!</h3>
            <p className="text-sm text-ink/70 mt-1">Your order has been sent to our backend.</p>

            <div className="w-full bg-cream rounded-xl p-4 my-6 text-left space-y-2 border border-ink/10 text-sm">
              <div className="flex justify-between font-medium">
                <span className="text-ink/60">Order ID:</span>
                <span className="font-mono text-ink font-semibold">{orderResult.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Payment:</span>
                <span className="text-ink">{orderResult.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Subtotal:</span>
                <span className="text-ink">{currency.format(orderResult.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Delivery Fee:</span>
                <span className="text-ink">{orderResult.deliveryFee === 0 ? 'FREE' : currency.format(orderResult.deliveryFee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-ink/15 font-semibold text-base text-ink">
                <span>Total:</span>
                <span className="text-maroon">{currency.format(orderResult.total)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full rounded-full bg-maroon text-white font-semibold py-3 hover:bg-maroon-dark transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : step === 'checkout' ? (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between p-5 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-cream/60 p-3 rounded-lg border border-ink/10 text-xs text-ink/70">
                Cash on Delivery: Please provide your delivery details below.
              </div>

              {orderError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {orderError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-ink/20 rounded-lg focus:outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03001234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-ink/20 rounded-lg focus:outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Street, house number, area, city..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-ink/20 rounded-lg focus:outline-none focus:border-maroon"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-ink/10 space-y-3 mt-4">
              <div className="flex items-center justify-between font-semibold text-ink">
                <span>Subtotal ({items.length} items)</span>
                <span>{currency.format(cartTotal)}</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-maroon text-white font-semibold py-3 hover:bg-maroon-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Confirm Order (Cash on Delivery)'
                )}
              </button>
            </div>
          </form>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 text-ink/50">
            <ShoppingBag size={40} strokeWidth={1.5} className="mb-3" />
            <p className="font-medium text-ink">Your cart is empty</p>
            <p className="text-sm mt-1">Add items to see them here.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto divide-y divide-ink/10">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3 px-5 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-ink line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-ink/50 mt-0.5">{product.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-cream border border-ink/15 rounded-full">
                        <button
                          onClick={() => updateQty(product.id, qty - 1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 hover:text-maroon transition-colors"
                        >
                          <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">{qty}</span>
                        <button
                          onClick={() => updateQty(product.id, qty + 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 hover:text-maroon transition-colors"
                        >
                          <Plus size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-ink">
                        {currency.format(product.price * qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="text-ink/30 hover:text-maroon transition-colors self-start"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-ink/10 px-5 py-4 space-y-3">
              <div className="flex items-center justify-between font-semibold text-ink">
                <span>Subtotal</span>
                <span>{currency.format(cartTotal)}</span>
              </div>
              <button
                onClick={() => setStep('checkout')}
                className="w-full rounded-full bg-maroon text-white font-semibold py-3 hover:bg-maroon-dark transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
