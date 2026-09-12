import ProductCard from './ProductCard'
import { PackageSearch } from 'lucide-react'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-card border border-ink/10 overflow-hidden animate-pulse">
            <div className="aspect-square bg-ink/10" />
            <div className="p-3 space-y-2">
              <div className="h-2.5 bg-ink/10 rounded w-1/2" />
              <div className="h-3 bg-ink/10 rounded w-full" />
              <div className="h-3 bg-ink/10 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 text-ink/50">
        <PackageSearch size={40} strokeWidth={1.5} className="mb-3" />
        <p className="font-medium text-ink">No products match your search</p>
        <p className="text-sm mt-1">Try a different keyword or browse another category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
