import { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CheckCircle2, Loader2, Tag, Truck, Clock, CreditCard, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { createOrder } from '../api/client'

const currency = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
})

const FREE_DELIVERY_THRESHOLD = 3000
const STANDARD_DELIVERY_FEE = 150

export default function CartDrawer({ onTrackOrder }) {
  const { items, isCartOpen, closeCart, updateQty, removeFromCart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState('cart') // 'cart' | 'checkout' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: '',
    deliverySlot: 'express',
    paymentMethod: 'Cash on Delivery (COD)',
  })
  const [promoCode, setPromoCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [promoMessage, setPromoMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState(null)
  const [orderError, setOrderError] = useState('')

  if (!isCartOpen) return null

  // Delivery fee calculation
  const deliveryFee = cartTotal >= FREE_DELIVERY_THRESHOLD || items.length === 0 ? 0 : STANDARD_DELIVERY_FEE
  const discountAmount = Math.round(cartTotal * appliedDiscount)
  const netTotal = Math.max(0, cartTotal - discountAmount + deliveryFee)
  const progressPercent = Math.min(100, Math.round((cartTotal / FREE_DELIVERY_THRESHOLD) * 100))

  const handleClose = () => {
    closeCart()
    if (step === 'success') {
      setStep('cart')
      setOrderResult(null)
    }
  }

  const handleApplyPromo = (e) => {
    e.preventDefault()
    const code = promoCode.trim().toUpperCase()
    if (!code) return

    if (code === 'WELCOME10') {
      setAppliedDiscount(0.10)
      setPromoMessage({ type: 'success', text: '10% Welcome Discount applied!' })
    } else if (code === 'SPRINGS500') {
      if (cartTotal >= 2500) {
        setAppliedDiscount(500 / cartTotal)
        setPromoMessage({ type: 'success', text: 'Rs. 500 Springs discount applied!' })
      } else {
        setPromoMessage({ type: 'error', text: 'SPRINGS500 requires minimum cart of Rs. 2,500' })
      }
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try WELCOME10' })
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
          address: `${formData.address.trim()}${formData.instructions ? ` (Note: ${formData.instructions.trim()})` : ''}`,
        },
        deliverySlot: formData.deliverySlot,
        paymentMethod: formData.paymentMethod,
        items: items.map(({ product, qty }) => ({
          productId: product.id,
          quantity: qty,
        })),
        totalAmount: netTotal,
      }

      const result = await createOrder(payload)
      setOrderResult({
        ...result,
        paymentMethod: formData.paymentMethod,
        subtotal: cartTotal,
        deliveryFee,
        discount: discountAmount,
        total: netTotal,
      })
      clearCart()

      // Save order to localStorage for instant order tracking
      try {
        const prev = JSON.parse(localStorage.getItem('springs_orders') || '[]')
        const updated = [{
          ...result,
          paymentMethod: formData.paymentMethod,
          subtotal: cartTotal,
          deliveryFee,
          discount: discountAmount,
          total: netTotal,
        }, ...prev.filter((o) => o.orderId !== result.orderId)].slice(0, 10)
        localStorage.setItem('springs_orders', JSON.stringify(updated))
      } catch {
        // ignore storage errors
      }

      setStep('success')
    } catch (err) {
      setOrderError(err.message || 'Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close cart" onClick={handleClose} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />

      <div className="relative w-[92%] max-w-md bg-white h-full flex flex-col shadow-2xl">
        {/* Header */}
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
              {step === 'cart' && 'Your Grocery Basket'}
              {step === 'checkout' && 'Express Checkout'}
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

        {/* Free Delivery Bar */}
        {step === 'cart' && items.length > 0 && (
          <div className="bg-cream/70 px-5 py-2.5 border-b border-ink/10">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-ink">
                <Truck size={14} className={progressPercent === 100 ? 'text-emerald-600' : 'text-maroon'} />
                {progressPercent === 100 ? (
                  <span className="text-emerald-700">🎉 FREE Express Delivery Unlocked!</span>
                ) : (
                  <span>
                    Add <strong>{currency.format(FREE_DELIVERY_THRESHOLD - cartTotal)}</strong> for <strong>FREE Delivery</strong>
                  </span>
                )}
              </span>
              <span className="font-bold text-ink/60">{progressPercent}%</span>
            </div>
            <div className="w-full bg-ink/10 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  progressPercent === 100 ? 'bg-emerald-600' : 'bg-maroon'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Views */}
        {step === 'success' && orderResult ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 size={42} strokeWidth={2.5} />
            </div>
            <h3 className="font-display font-semibold text-2xl text-ink">Order Confirmed!</h3>
            <p className="text-xs sm:text-sm text-ink/70 mt-1 max-w-xs">
              Thank you for shopping with Springs Mini Mart. Our express delivery team is preparing your basket.
            </p>

            <div className="w-full bg-cream/70 rounded-2xl p-4 my-5 text-left space-y-2.5 border border-ink/10 text-xs sm:text-sm">
              <div className="flex justify-between font-medium">
                <span className="text-ink/60">Order Reference:</span>
                <span className="font-mono text-ink font-bold">{orderResult.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Payment Method:</span>
                <span className="text-ink font-semibold">{orderResult.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">Subtotal:</span>
                <span className="text-ink">{currency.format(orderResult.subtotal)}</span>
              </div>
              {orderResult.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Voucher Discount:</span>
                  <span>- {currency.format(orderResult.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-ink/60">Delivery Fee:</span>
                <span className="text-ink font-semibold">
                  {orderResult.deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    currency.format(orderResult.deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-ink/15 font-bold text-base text-ink">
                <span>Total Payable:</span>
                <span className="text-maroon">{currency.format(orderResult.total)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => {
                  const id = orderResult.orderId
                  handleClose()
                  onTrackOrder && onTrackOrder(id)
                }}
                className="w-full rounded-full bg-maroon text-white font-bold py-3 hover:bg-maroon-dark transition-all text-xs sm:text-sm shadow-md"
              >
                Track Live Delivery Status
              </button>
              <button
                onClick={handleClose}
                className="w-full rounded-full border border-ink/20 hover:border-maroon text-ink font-semibold py-2.5 transition-colors text-xs"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : step === 'checkout' ? (
          <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between p-5 overflow-y-auto">
            <div className="space-y-4">
              {orderError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {orderError}
                </div>
              )}

              {/* Delivery Slot */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock size={13} className="text-maroon" /> Choose Delivery Slot
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: 'express', label: '⚡ Instant Express (30 - 45 mins)', desc: 'Priority cold-chain motorbike rider' },
                    { id: 'evening', label: '🕒 Today Evening (6:00 PM - 8:00 PM)', desc: 'Scheduled evening home drop' },
                    { id: 'tomorrow', label: '☀️ Tomorrow Morning (9:00 AM - 12:00 PM)', desc: 'Fresh morning delivery' },
                  ].map((slot) => (
                    <label
                      key={slot.id}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        formData.deliverySlot === slot.id
                          ? 'border-maroon bg-maroon/5 ring-1 ring-maroon/20'
                          : 'border-ink/10 hover:border-ink/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliverySlot"
                        value={slot.id}
                        checked={formData.deliverySlot === slot.id}
                        onChange={(e) => setFormData({ ...formData, deliverySlot: e.target.value })}
                        className="mt-0.5 accent-maroon"
                      />
                      <div>
                        <span className="text-xs font-semibold text-ink block">{slot.label}</span>
                        <span className="text-[10px] text-ink/60 block">{slot.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mahmood"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-ink/20 rounded-xl focus:outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-ink/20 rounded-xl focus:outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Apartment #, Street, Phase / Block, City..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-ink/20 rounded-xl focus:outline-none focus:border-maroon"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/70 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave with guard / Ring bell twice"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-ink/20 rounded-xl focus:outline-none focus:border-maroon"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CreditCard size={13} className="text-maroon" /> Payment Method
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'Cash on Delivery (COD)', label: '💵 Cash on Delivery (COD)' },
                    { id: 'Card on Delivery', label: '💳 Credit / Debit Card (Rider POS Machine)' },
                    { id: 'Raast / Digital Pay', label: '📱 Raast Instant QR / JazzCash / EasyPaisa' },
                  ].map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                        formData.paymentMethod === m.id
                          ? 'border-maroon bg-maroon/5 font-semibold text-maroon'
                          : 'border-ink/10 hover:border-ink/20 text-ink/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={formData.paymentMethod === m.id}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="accent-maroon"
                      />
                      <span>{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Total breakdown & Submit */}
            <div className="pt-4 border-t border-ink/10 space-y-2 mt-4">
              <div className="flex items-center justify-between text-xs text-ink/70">
                <span>Subtotal ({items.length} items):</span>
                <span>{currency.format(cartTotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-700 font-medium">
                  <span>Discount:</span>
                  <span>- {currency.format(discountAmount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-ink/70">
                <span>Delivery:</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700 uppercase">FREE</strong> : currency.format(deliveryFee)}</span>
              </div>
              <div className="flex items-center justify-between font-bold text-sm sm:text-base text-ink pt-1 border-t border-ink/10">
                <span>Net Total:</span>
                <span className="text-maroon">{currency.format(netTotal)}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-maroon text-white font-bold py-3 hover:bg-maroon-dark transition-all text-xs sm:text-sm disabled:opacity-50 shadow-md mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Confirming Order...
                  </>
                ) : (
                  `Place Order · ${currency.format(netTotal)}`
                )}
              </button>
            </div>
          </form>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 text-ink/50">
            <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mb-3">
              <ShoppingBag size={32} strokeWidth={1.5} className="text-ink/40" />
            </div>
            <p className="font-semibold text-base text-ink">Your basket is empty</p>
            <p className="text-xs mt-1 text-ink/60">Discover fresh fruits, bakery, and pantry staples.</p>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-ink/10">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3 px-5 py-3.5 hover:bg-cream/20 transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-ink/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-ink line-clamp-1">{product.name}</h3>
                    <p className="text-[11px] text-ink/50 mt-0.5">{product.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-cream border border-ink/15 rounded-full px-1">
                        <button
                          onClick={() => updateQty(product.id, qty - 1)}
                          aria-label="Decrease quantity"
                          className="p-1 hover:text-maroon transition-colors"
                        >
                          <Minus size={12} strokeWidth={2.5} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{qty}</span>
                        <button
                          onClick={() => updateQty(product.id, qty + 1)}
                          aria-label="Increase quantity"
                          className="p-1 hover:text-maroon transition-colors"
                        >
                          <Plus size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-ink">
                        {currency.format(product.price * qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="text-ink/30 hover:text-red-600 transition-colors self-start p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Voucher & Subtotal Footer */}
            <div className="border-t border-ink/10 px-5 py-3.5 space-y-2.5 bg-white">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs uppercase font-medium border border-ink/20 rounded-lg focus:outline-none focus:border-maroon"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-maroon transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] font-medium ${promoMessage.type === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Subtotal Calculation */}
              <div className="space-y-1 text-xs text-ink/70 pt-1">
                <div className="flex items-center justify-between">
                  <span>Basket Subtotal:</span>
                  <span className="font-semibold text-ink">{currency.format(cartTotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>Voucher Savings:</span>
                    <span>- {currency.format(discountAmount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Express Delivery:</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">FREE</span>
                    ) : (
                      currency.format(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between font-bold text-base text-ink pt-1.5 border-t border-ink/10">
                  <span>Estimated Total:</span>
                  <span className="text-maroon">{currency.format(netTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => setStep('checkout')}
                className="w-full rounded-full bg-maroon text-white font-bold py-3 hover:bg-maroon-dark transition-all text-xs sm:text-sm shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
