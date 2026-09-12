export default function Hero() {
  return (
    <div className="px-4 md:px-6 pt-1 pb-4 max-w-6xl mx-auto">
      <div className="relative rounded-card overflow-hidden h-52 md:h-72">
        <img
          src="https://picsum.photos/seed/springs-bakery-hero/1200/500"
          alt="Freshly baked pastries, sandwiches, and a chocolate cake laid out on a table"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-center px-6 md:px-10 max-w-sm">
          <p className="text-cream/80 text-xs tracking-[0.2em] mb-1">SPRINGS BAKERY</p>
          <h1 className="font-display text-3xl md:text-4xl text-white font-medium leading-tight mb-4">
            Baked with love, every morning
          </h1>
          <a
            href="#shop"
            className="inline-flex w-fit items-center rounded-full bg-cream text-maroon-dark px-5 py-2.5 text-sm font-semibold hover:bg-white transition-colors"
          >
            Shop the bakery
          </a>
        </div>
      </div>
    </div>
  )
}
