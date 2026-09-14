import { Sparkles } from 'lucide-react'
import { useFilters } from '../context/FilterContext'

const brands = [
  { name: 'Nestlé', category: 'Dairy & Coffee', badge: 'Official' },
  { name: 'Shan Foods', category: 'Spices & Recipe Mixes', badge: 'Top Seller' },
  { name: 'Olpers', category: 'Pure Milk & Cream', badge: 'Fresh Daily' },
  { name: 'Lurpak', category: 'Danish Butter & Dairy', badge: 'Imported' },
  { name: 'Coca-Cola', category: 'Chilled Beverages', badge: 'Original' },
  { name: 'Barilla', category: 'Italian Pasta & Sauces', badge: 'Gourmet' },
  { name: 'Ferrero', category: 'Chocolates & Hazelnut', badge: 'Luxury' },
  { name: 'National Foods', category: 'Pickles & Condiments', badge: 'Pantry' },
  { name: 'Dawn Bread', category: 'Artisan & Sliced Breads', badge: 'Fresh' },
  { name: 'Dettol', category: 'Hygiene & Cleaners', badge: 'Certified' },
]

export default function BrandShowcase() {
  const { setSearchQuery } = useFilters()

  const handleBrandClick = (brandName) => {
    setSearchQuery(brandName)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="px-4 md:px-6 py-4 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-maroon/10 text-maroon">
            <Sparkles size={14} />
          </span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-ink/70">
            Trusted Partner Brands (100% Genuine)
          </h3>
        </div>
        <span className="text-[11px] text-ink/50 hidden sm:inline-block">
          Direct Authorized Import & Supply
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {brands.map((b) => (
          <button
            key={b.name}
            onClick={() => handleBrandClick(b.name)}
            className="group flex flex-col items-start p-3 rounded-xl bg-white border border-ink/10 hover:border-maroon/40 hover:shadow-sm transition-all text-left"
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="font-display font-bold text-sm text-ink group-hover:text-maroon transition-colors">
                {b.name}
              </span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-cream text-maroon uppercase">
                {b.badge}
              </span>
            </div>
            <span className="text-[10px] text-ink/50 group-hover:text-ink/70 transition-colors">
              {b.category}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
