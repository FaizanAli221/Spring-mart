import { useState, useEffect } from 'react'
import { Package, Clock, CheckCircle2, RotateCcw, ArrowRight, ShoppingBag, ExternalLink } from 'lucide-react'
import { useCart } from '../context/CartContext'

const currency = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
})

export default function OrdersPage({ onTrackOrder = () => {}, onShopNow = () => {} }) {
  const [orders, setOrders] = useState([])
  const { addToCart, openCart } = useCart()
  const [reorderedId, setReorderedId] = useState(null)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('springs_orders') || '[]')
      setOrders(stored)
    } catch {
      setOrders([])
    }
  }, [])

  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return

    order.items.forEach((item) => {
      const productObj = {
        id: item.productId || `item-${Date.now()}`,
        name: item.name,
        price: item.unitPrice || item.price || 0,
        unit: item.unit || '1 unit',
        image: item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
        category: 'Re-ordered',
      }
      addToCart(productObj, item.quantity || 1)
    })

    setReorderedId(order.orderId)
    setTimeout(() => {
      setReorderedId(null)
      openCart()
    }, 1000)
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto px-4 md:px-6 py-6 w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-ink/10">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">
            My Order History
          </h1>
          <p className="text-xs md:text-sm text-ink/60 mt-1">
            Review past orders, track active deliveries, or re-order your favorite grocery baskets.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cream border border-ink/10 text-ink/70">
          {orders.length} Total Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-ink/10 p-10 text-center shadow-sm">
          <ShoppingBag size={52} className="mx-auto text-ink/20 mb-3" />
          <h3 className="font-display font-semibold text-xl text-ink">No Orders Yet</h3>
          <p className="text-xs text-ink/60 mt-1 max-w-md mx-auto">
            You haven't placed any orders yet. Add fresh fruits, bakery items, or pantry staples to your cart and checkout with Cash on Delivery!
          </p>
          <button
            onClick={onShopNow}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon hover:bg-maroon-dark text-white text-xs md:text-sm font-semibold shadow transition-colors"
          >
            <span>Start Shopping</span>
            <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((ord) => (
            <div
              key={ord.orderId}
              className="bg-white rounded-2xl border border-ink/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-cream/40 px-5 py-4 border-b border-ink/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-maroon" />
                  <span className="font-mono font-bold text-sm text-ink">{ord.orderId}</span>
                  <span className="text-ink/40">·</span>
                  <span className="text-ink/60 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(ord.createdAt || Date.now()).toLocaleDateString('en-PK', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full font-semibold">
                    <CheckCircle2 size={12} /> {ord.status || 'Confirmed'}
                  </span>
                  <span className="font-bold text-sm text-maroon">
                    {currency.format(ord.total)}
                  </span>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xs">
                  <div>
                    <span className="text-ink/50 block font-medium mb-0.5">Delivery Address</span>
                    <p className="text-ink font-medium leading-relaxed">
                      {ord.customer?.address || 'Verified Address'}
                    </p>
                    <p className="text-ink/60 mt-0.5">{ord.customer?.phone}</p>
                  </div>
                  <div>
                    <span className="text-ink/50 block font-medium mb-0.5">Payment Method</span>
                    <p className="text-ink font-medium">{ord.paymentMethod || 'Cash on Delivery'}</p>
                    <span className="text-ink/60">Pay when delivered to doorstep</span>
                  </div>
                  <div>
                    <span className="text-ink/50 block font-medium mb-0.5">Items Summary</span>
                    <p className="text-ink font-medium">
                      {ord.items?.length || 0} Products
                    </p>
                    <span className="text-ink/60">
                      Subtotal {currency.format(ord.subtotal)} + Fee {ord.deliveryFee === 0 ? 'FREE' : currency.format(ord.deliveryFee)}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="bg-cream/20 rounded-xl p-3 border border-ink/5 mb-4 max-h-36 overflow-y-auto divide-y divide-ink/5 text-xs">
                  {ord.items?.map((item, idx) => (
                    <div key={idx} className="py-1.5 flex justify-between items-center first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink/70">{item.quantity}x</span>
                        <span className="font-medium text-ink">{item.name}</span>
                      </div>
                      <span className="font-medium text-ink/80">
                        {currency.format(item.lineTotal || (item.unitPrice || 0) * (item.quantity || 1))}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-ink/10">
                  <button
                    onClick={() => onTrackOrder(ord.orderId)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-ink/20 hover:border-maroon text-xs font-semibold text-ink hover:text-maroon transition-colors"
                  >
                    <span>Track Live</span>
                    <ExternalLink size={13} />
                  </button>

                  <button
                    onClick={() => handleReorder(ord)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-maroon hover:bg-maroon-dark text-white text-xs font-semibold shadow transition-colors"
                  >
                    <RotateCcw size={13} />
                    <span>{reorderedId === ord.orderId ? 'Re-added to Cart!' : 'Re-order Basket'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
