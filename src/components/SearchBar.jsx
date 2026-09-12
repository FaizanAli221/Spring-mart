import { Search } from 'lucide-react'
import { useFilters } from '../context/FilterContext'

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilters()

  return (
    <div className="px-4 md:px-6 py-3">
      <div className="max-w-3xl mx-auto relative">
        <Search
          size={18}
          strokeWidth={2}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for items, brands, categories…"
          className="w-full rounded-full border border-maroon/30 bg-white pl-11 pr-4 py-3 text-sm placeholder:text-ink/40 focus:border-maroon transition-colors"
        />
      </div>
    </div>
  )
}
