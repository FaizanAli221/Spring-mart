import { useFilters } from '../context/FilterContext'

export default function CategoryGrid({ categories }) {
  const { activeCategory, setActiveCategory } = useFilters()

  const handleSelect = (name) => {
    setActiveCategory(activeCategory === name ? 'all' : name)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="px-4 md:px-6 py-3 max-w-6xl mx-auto">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.name)}
              className={`group flex flex-col items-center text-center rounded-card p-2.5 transition-colors ${
                isActive ? 'bg-maroon/5 ring-1 ring-maroon/40' : 'hover:bg-ink/5'
              }`}
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-1.5 left-1.5 bg-maroon text-white text-[9px] font-bold leading-tight px-1.5 py-1 rounded-md">
                  {cat.discountLabel}
                </span>
              </div>
              <span className="text-xs md:text-sm font-medium text-ink tracking-wide uppercase">
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
