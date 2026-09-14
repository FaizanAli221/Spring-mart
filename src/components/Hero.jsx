import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

const slides = [
  {
    id: 'slide-1',
    tag: '⚡ 30-MIN EXPRESS DELIVERY',
    tagColor: 'bg-emerald-600',
    title: 'Farm-Fresh Produce & Daily Groceries',
    subtitle: 'Hand-inspected crisp fruits, garden vegetables, and daily household staples delivered in temperature-controlled bags.',
    ctaText: 'Shop Fresh Arrivals',
    ctaLink: '#shop',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'slide-2',
    tag: '🔥 UP TO 35% OFF THIS WEEK',
    tagColor: 'bg-red-600',
    title: 'Super Saver Deals & Family Pantry Haul',
    subtitle: 'Unbeatable prices on premium imported cooking oils, breakfast cereals, confectionery, and household care.',
    ctaText: 'Explore Super Deals',
    ctaLink: '#deals',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'slide-3',
    tag: '🥐 FRESHLY BAKED DAILY',
    tagColor: 'bg-amber-700',
    title: 'Artisan French Bakery & Pasture Dairy',
    subtitle: 'Stone-deck oven sourdough, golden butter croissants, aged cheeses, and pure grass-fed milk delivered fresh daily.',
    ctaText: 'Browse Gourmet Bakery',
    ctaLink: '#categories',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80',
  },
]

export default function Hero({ onExploreDeals = () => {} }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const slide = slides[currentSlide]

  return (
    <div className="px-4 md:px-6 pt-1 pb-3 max-w-6xl mx-auto w-full">
      <div
        className="relative rounded-2xl overflow-hidden shadow-md border border-ink/10 group bg-stone-900"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slide Image with smooth transition */}
        <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[390px]">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
            </div>
          ))}

          {/* Slide Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-5 sm:p-8 md:p-12 text-white max-w-2xl z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className={`${slide.tagColor} text-white font-bold text-[10px] md:text-xs uppercase px-3 py-1 rounded-full shadow-sm tracking-wider flex items-center gap-1.5`}>
                <Sparkles size={12} /> {slide.tag}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                <ShieldCheck size={12} /> Springs Quality Verified
              </span>
            </div>

            <h1 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm transition-all duration-300">
              {slide.title}
            </h1>

            <p className="text-white/85 text-xs sm:text-sm md:text-base mt-2 line-clamp-2 md:line-clamp-3 leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              <a
                href={slide.ctaLink}
                onClick={(e) => {
                  if (slide.ctaLink === '#deals') {
                    e.preventDefault()
                    onExploreDeals()
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white text-maroon font-bold px-5 py-2.5 text-xs sm:text-sm hover:bg-cream transition-all shadow-lg hover:shadow-xl hover:translate-x-0.5"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={15} />
              </a>
              <span className="text-[11px] sm:text-xs text-white/70 hidden sm:inline-block">
                Free delivery over Rs. 3,000
              </span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-white/20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 border border-white/20"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
