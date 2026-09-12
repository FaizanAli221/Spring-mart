export default function Hero() {
  return (
    <div className="px-4 md:px-6 pt-1 pb-4 max-w-6xl mx-auto">
      <div className="relative rounded-card overflow-hidden shadow-sm border border-ink/10 group">
        <img
          src="/images/gemini-banana-hero.jpg"
          alt="Springs Mini Mart - Organic Nano Bananas & Gemini Sparkling Banana"
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between w-full gap-2">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full bg-maroon text-white text-xs font-semibold tracking-wider uppercase mb-1">
                Featured Exclusive
              </span>
              <p className="text-white font-display text-lg md:text-2xl font-semibold drop-shadow-sm">
                Fresh Organic Nano Bananas & Gemini Sparkling Banana
              </p>
            </div>
            <a
              href="#shop"
              className="inline-flex items-center rounded-full bg-white text-maroon font-semibold px-4 py-2 text-xs md:text-sm hover:bg-cream transition-colors shadow"
            >
              Shop Fresh Arrivals
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
