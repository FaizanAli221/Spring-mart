import { useState } from 'react'
import { Layers, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

export default function CategoriesPage({
  categories = [],
  products = [],
  onSelectCategory = () => {},
  onSelectProduct = () => {},
}) {
  const [searchFilter, setSearchFilter] = useState('')

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchFilter.trim().toLowerCase())
  )

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 md:px-6 py-6 w-full">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 bg-maroon/10 text-maroon text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <Layers size={13} /> 7 Specialized Departments
        </span>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-ink">
          Explore Grocery Departments
        </h1>
        <p className="text-xs md:text-sm text-ink/60 mt-2">
          Discover handpicked organic produce, daily farm essentials, bakery favorites, and international pantry imports.
        </p>

        {/* Search inside departments */}
        <div className="mt-5 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-ink/20 rounded-full text-xs md:text-sm focus:outline-none focus:border-maroon shadow-sm"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="space-y-6">
        {filteredCategories.map((cat) => {
          const catProducts = products.filter(
            (p) => p.category.toLowerCase() === cat.name.toLowerCase()
          )

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-ink/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Department Banner & Overview */}
                <div className="lg:w-1/3 relative min-h-[180px] lg:min-h-full bg-cream flex flex-col justify-end p-6 text-white overflow-hidden group">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  <div className="relative z-10">
                    {cat.discountLabel && (
                      <span className="inline-block bg-maroon text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mb-2">
                        {cat.discountLabel}
                      </span>
                    )}
                    <h2 className="font-display text-xl md:text-2xl font-bold leading-tight">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-white/80 mt-1">
                      {catProducts.length} Premium Verified Items
                    </p>

                    <button
                      onClick={() => onSelectCategory(cat.name)}
                      className="mt-4 inline-flex items-center gap-1.5 bg-white hover:bg-cream text-maroon text-xs font-semibold px-4 py-2 rounded-full shadow transition-colors"
                    >
                      <span>Shop Department</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Items in this Department */}
                <div className="lg:w-2/3 p-4 md:p-6 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-ink/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink/60 flex items-center gap-1">
                      <Sparkles size={13} className="text-maroon" /> Featured In This Aisle
                    </span>
                    <button
                      onClick={() => onSelectCategory(cat.name)}
                      className="text-xs font-semibold text-maroon hover:underline"
                    >
                      View all {catProducts.length} items →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {catProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => onSelectProduct(prod)}
                        className="group flex flex-col rounded-xl border border-ink/10 p-2 cursor-pointer hover:border-maroon/40 hover:shadow-sm transition-all bg-cream/30"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-2 bg-white">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {prod.discountPercent > 0 && (
                            <span className="absolute top-1 left-1 bg-maroon text-white text-[8px] font-bold px-1 py-0.5 rounded">
                              {prod.discountPercent}%
                            </span>
                          )}
                        </div>
                        <h4 className="text-[11px] font-medium text-ink line-clamp-2 leading-tight group-hover:text-maroon transition-colors">
                          {prod.name}
                        </h4>
                        <div className="mt-auto pt-1 flex items-baseline justify-between text-[11px]">
                          <span className="font-bold text-ink">Rs {prod.price}</span>
                          <span className="text-[9px] text-ink/40">{prod.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
