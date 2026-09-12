import SearchBar from '../components/SearchBar'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import ProductGrid from '../components/ProductGrid'
import { useFilters } from '../context/FilterContext'

export default function HomePage({
  categories = [],
  products = [],
  loading = false,
  onSelectProduct = () => {},
  onNavigate = () => {},
}) {
  const { activeCategory } = useFilters()

  return (
    <>
      <SearchBar />
      <Hero onExploreDeals={() => onNavigate('deals')} />
      <CategoryGrid categories={categories} />

      <main id="shop" className="flex-1 px-4 md:px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              {activeCategory === 'all' ? 'All Products' : activeCategory}
            </h2>
            <p className="text-xs text-ink/50 mt-0.5">
              Organic selections, fresh imports & daily essentials
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cream border border-ink/10 text-ink/70">
            {products.length} items
          </span>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
          onSelect={onSelectProduct}
        />
      </main>
    </>
  )
}
