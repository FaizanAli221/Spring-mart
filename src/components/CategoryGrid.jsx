import { useFilters } from '../context/FilterContext'

export default function CategoryGrid({ categories }) {
  const { activeCategory, setActiveCategory } = useFilters()

  const handleSelect = (name) => {
    setActiveCategory(activeCategory === name ? 'all' : name)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="px-4 md:px-6 py-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-ink/60">
          Shop by Department ({categories.length})
        </h3>
        {activeCategory !== 'all' && (
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs font-semibold text-maroon hover:underline"
          >
            Clear filter (View All)
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 md:gap-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.name)}
              className={`group flex flex-col items-center text-center rounded-xl p-2 transition-all bg-white border ${
                isActive
                  ? 'border-maroon ring-2 ring-maroon/20 shadow-sm'
                  : 'border-ink/10 hover:border-maroon/40 hover:shadow-sm'
              }`}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 bg-cream">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {cat.discountLabel && (
                  <span className="absolute top-1 left-1 bg-maroon text-white text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                    {cat.discountLabel}
                  </span>
                )}
              </div>
              <span className={`text-[11px] md:text-xs font-semibold leading-tight line-clamp-2 ${
                isActive ? 'text-maroon' : 'text-ink group-hover:text-maroon'
              }`}>
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
