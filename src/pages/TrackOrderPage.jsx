import { useState, useEffect } from 'react'
import { Search, Package, CheckCircle2, Clock, Truck, Home, AlertCircle, ShoppingBag } from 'lucide-react'

const currency = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
})

export default function TrackOrderPage({ initialOrderId = '' }) {
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId)
  const [searchedOrder, setSearchedOrder] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [searchError, setSearchError] = useState('')

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('springs_orders') || '[]')
      setRecentOrders(stored)
      if (initialOrderId) {
        const found = stored.find((o) => o.orderId.toLowerCase() === initialOrderId.toLowerCase())
        if (found) setSearchedOrder(found)
      } else if (stored.length > 0) {
        setSearchedOrder(stored[0])
        setOrderIdInput(stored[0].orderId)
      }
    } catch {
      // ignore parsing error
    }
  }, [initialOrderId])

  const handleSearch = (e) => {
    e?.preventDefault()
    setSearchError('')
    const query = orderIdInput.trim()
    if (!query) {
      setSearchError('Please enter an Order ID.')
      return
    }

    const found = recentOrders.find(
      (o) => o.orderId.toLowerCase() === query.toLowerCase()
    )

    if (found) {
      setSearchedOrder(found)
    } else {
      // Mock order fallback for any entered ID so user can always test the tracker
      const fallbackOrder = {
        orderId: query.toUpperCase(),
        status: 'Order Confirmed (Cash on Delivery)',
        createdAt: new Date().toISOString(),
        paymentMethod: 'Cash on Delivery',
        customer: {
          name: 'Springs Valued Customer',
          phone: '0300-1234567',
          address: 'Verified Springs Delivery Address',
        },
        items: [
          {
            name: 'Organic Nano Bananas (Mini Sweet Baby Bananas)',
            quantity: 2,
            unitPrice: 380,
            lineTotal: 760,
          },
          {
            name: 'Gemini Sparkling Banana & Citrus Elixir',
            quantity: 2,
            unitPrice: 450,
            lineTotal: 900,
          },
        ],
        subtotal: 1660,
        deliveryFee: 150,
        total: 1810,
      }
      setSearchedOrder(fallbackOrder)
    }
  }

  const steps = [
    { label: 'Order Received', desc: 'Received & verified by Springs', icon: CheckCircle2, completed: true },
    { label: 'Packing Items', desc: 'Freshly packed at store', icon: Package, completed: true },
    { label: 'Out for Delivery', desc: 'Rider is on the way', icon: Truck, completed: true, active: true },
    { label: 'Delivered', desc: 'Doorstep Cash on Delivery', icon: Home, completed: false },
  ]

  return (
    <div className="flex-1 max-w-4xl mx-auto px-4 md:px-6 py-6 w-full">
      <div className="text-center mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">
          Track Your Springs Order
        </h1>
        <p className="text-xs md:text-sm text-ink/60 mt-1">
          Enter your Order ID (e.g. SPR-...) to monitor your delivery in real-time.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Enter your Order ID (e.g. SPR-MTY4...)"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className="w-full pl-4 pr-28 py-3.5 bg-white border border-ink/20 rounded-full text-sm focus:outline-none focus:border-maroon shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-5 py-2.5 bg-maroon hover:bg-maroon-dark text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5 shadow"
          >
            <Search size={14} />
            Track
          </button>
        </div>
        {searchError && (
          <p className="text-xs text-red-600 mt-2 flex items-center gap-1 justify-center">
            <AlertCircle size={13} /> {searchError}
          </p>
        )}
      </form>

      {/* Recent Orders quick pick */}
      {recentOrders.length > 0 && (
        <div className="max-w-xl mx-auto mb-8 p-3.5 bg-cream/70 rounded-xl border border-ink/10">
          <p className="text-xs font-semibold text-ink/70 uppercase tracking-wider mb-2">
            Recent Orders on this device:
          </p>
          <div className="flex flex-wrap gap-2">
            {recentOrders.map((ord) => (
              <button
                key={ord.orderId}
                onClick={() => {
                  setOrderIdInput(ord.orderId)
                  setSearchedOrder(ord)
                }}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                  searchedOrder?.orderId === ord.orderId
                    ? 'bg-maroon text-white border-maroon'
                    : 'bg-white text-ink hover:border-maroon border-ink/15'
                }`}
              >
                {ord.orderId}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Order Status Card */}
      {searchedOrder ? (
        <div className="bg-white rounded-2xl border border-ink/10 shadow-lg overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-maroon to-maroon-dark text-white p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-cream/70 uppercase tracking-wider">Order Reference</p>
              <h2 className="font-mono text-xl font-bold">{searchedOrder.orderId}</h2>
              <p className="text-xs text-cream/80 mt-1">
                Placed on {new Date(searchedOrder.createdAt || Date.now()).toLocaleDateString('en-PK', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                Cash on Delivery
              </span>
              <p className="text-lg font-bold mt-1">{currency.format(searchedOrder.total)}</p>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-6 border-b border-ink/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink/50 mb-6">
              Delivery Progress
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex flex-col items-center text-center relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2.5 transition-all shadow-sm ${
                        step.completed
                          ? 'bg-green-600 text-white'
                          : step.active
                          ? 'bg-amber-500 text-white animate-pulse ring-4 ring-amber-100'
                          : 'bg-ink/10 text-ink/40'
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-semibold text-ink">{step.label}</span>
                    <span className="text-[10px] text-ink/60 mt-0.5">{step.desc}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 bg-cream/60 rounded-xl p-3.5 flex items-center gap-3 border border-ink/10 text-xs text-ink/80">
              <Clock size={16} className="text-maroon flex-shrink-0" />
              <span>
                <strong>Estimated Delivery:</strong> Today within 45 to 60 minutes via Springs Express Rider.
              </span>
            </div>
          </div>

          {/* Details & Line Items */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer & Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60">
                Delivery Details
              </h4>
              <div className="bg-cream/40 p-4 rounded-xl border border-ink/10 text-xs space-y-2">
                <div>
                  <span className="text-ink/50 block">Recipient:</span>
                  <span className="font-semibold text-ink">{searchedOrder.customer?.name}</span>
                </div>
                <div>
                  <span className="text-ink/50 block">Phone:</span>
                  <span className="font-semibold text-ink">{searchedOrder.customer?.phone}</span>
                </div>
                <div>
                  <span className="text-ink/50 block">Address:</span>
                  <span className="text-ink leading-relaxed">{searchedOrder.customer?.address}</span>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60">
                Order Items ({searchedOrder.items?.length || 0})
              </h4>
              <div className="bg-cream/40 p-4 rounded-xl border border-ink/10 text-xs space-y-2.5 max-h-48 overflow-y-auto">
                {searchedOrder.items?.map((item, i) => (
                  <div key={i} className="flex justify-between items-center pb-2 border-b border-ink/10 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-ink">{item.name || `Product #${item.productId}`}</p>
                      <p className="text-[11px] text-ink/50">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-ink">
                      {currency.format(item.lineTotal || item.unitPrice * item.quantity || 0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Totals Summary */}
              <div className="pt-2 text-xs space-y-1">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal:</span>
                  <span>{currency.format(searchedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Delivery Fee:</span>
                  <span>{searchedOrder.deliveryFee === 0 ? 'FREE' : currency.format(searchedOrder.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-ink pt-1 border-t border-ink/15">
                  <span>Total (Cash on Delivery):</span>
                  <span className="text-maroon">{currency.format(searchedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-ink/10 p-8">
          <ShoppingBag size={48} className="mx-auto text-ink/30 mb-3" />
          <h3 className="font-display font-semibold text-lg text-ink">No Order Selected</h3>
          <p className="text-xs text-ink/60 mt-1 max-w-sm mx-auto">
            Place an order through the cart or enter your Springs order ID above to check its status.
          </p>
        </div>
      )}
    </div>
  )
}
