import { useState, useEffect, useMemo } from 'react'
import { Flame, Clock, Tag, Sparkles } from 'lucide-react'
import ProductGrid from '../components/ProductGrid'

export default function DealsPage({ products, loading, onSelectProduct }) {
  const [minDiscount, setMinDiscount] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 })

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const discountedProducts = useMemo(() => {
    return products
      .filter((p) => (p.discountPercent || 0) >= minDiscount && (p.discountPercent || 0) > 0)
      .sort((a, b) => b.discountPercent - a.discountPercent)
  }, [products, minDiscount])

  const discountFilters = [
    { label: 'All Deals', value: 0 },
    { label: '25%+ OFF', value: 25 },
    { label: '20%+ OFF', value: 20 },
    { label: '10%+ OFF', value: 10 },
  ]

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-4 w-full">
      {/* Deals Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-6 shadow-md border border-ink/10 group">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80"
          alt="Springs Mini Mart Flash Deals & Weekly Super Savers"
          className="w-full h-52 sm:h-72 md:h-96 object-cover group-hover:scale-[1.01] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow animate-pulse">
              <Flame size={14} /> Flash Sale
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles size={13} /> Exclusive Springs Picks
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-bold leading-tight drop-shadow">
            Unbeatable Grocery Deals & Savings
          </h1>
          <p className="text-white/80 text-xs md:text-sm mt-1 max-w-xl">
            Save big on fresh farm produce, imported pantry staples, gourmet chocolates, artisan bakery, and household care.
          </p>

          {/* Countdown Clock */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
              <Clock size={15} className="text-amber-400" />
              <span>Ends in:</span>
              <span className="font-mono text-amber-300 font-bold tracking-wider">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m :{' '}
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-ink/10">
        <div className="flex items-center gap-2">
          <Tag size={18} className="text-maroon" />
          <span className="font-semibold text-sm text-ink">Filter by Discount:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {discountFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setMinDiscount(f.value)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors ${
                minDiscount === f.value
                  ? 'bg-maroon text-white shadow'
                  : 'bg-cream text-ink/70 hover:text-maroon border border-ink/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Deals Count */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-ink">
          Featured Deals ({discountedProducts.length} items)
        </h2>
        <span className="text-xs text-ink/50">All prices in PKR (Cash on Delivery)</span>
      </div>

      {/* Grid */}
      <ProductGrid
        products={discountedProducts}
        loading={loading}
        onSelect={onSelectProduct}
      />
    </div>
  )
}
