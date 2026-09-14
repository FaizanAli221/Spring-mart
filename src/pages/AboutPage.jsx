import { MapPin, Phone, Clock, Mail, ShieldCheck, HeartHandshake, Leaf, MessageCircle } from 'lucide-react'

const stores = [
  {
    city: 'Karachi',
    branch: 'DHA Phase 5 Flagship',
    address: 'Plot 24-C, 4th Commercial Lane, Zamzama & DHA Phase 5, Karachi',
    phone: '021-3587-4647',
    timings: '8:00 AM – 1:00 AM (7 Days a Week)',
    features: ['Gourmet Bakery', 'Fresh Organic Fruits & Veggies', 'Imported Confectionery', 'Express Delivery Hub'],
  },
  {
    city: 'Lahore',
    branch: 'Gulberg III Boutique',
    address: 'Block K, Main Boulevard, Gulberg III, Lahore',
    phone: '042-3575-4647',
    timings: '8:30 AM – 12:30 AM (7 Days a Week)',
    features: ['Chilled Beverages & Imported Juices', 'Artisan Coffee Bar', 'Personal Shopper Service'],
  },
  {
    city: 'Islamabad',
    branch: 'F-7 Markaz Concept Store',
    address: 'Shop 12-14, Block B, F-7 Markaz, Jinnah Super, Islamabad',
    phone: '051-2650-4647',
    timings: '9:00 AM – Midnight',
    features: ['Fresh Produce Department', 'Pantry Essentials', 'Doorstep Express Dispatch'],
  },
]

export default function AboutPage() {
  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-6 w-full">
      {/* Brand Hero */}
      <div className="bg-gradient-to-br from-maroon to-maroon-dark text-white rounded-2xl p-6 md:p-10 shadow-lg mb-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <span className="inline-block bg-white/20 text-cream text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Since 2015 · Karachi, Lahore, Islamabad
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Discover. Taste. Elevate.
          </h1>
          <p className="text-white/85 text-sm md:text-base mt-3 leading-relaxed">
            Springs Mini Mart is Pakistan’s premier boutique neighborhood supermarket. Sourcing farm-fresh produce, gourmet artisanal bakery, imported delicacies, and essential household brands with guaranteed 30-minute express delivery.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href="https://wa.me/923177774647"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors shadow"
            >
              <MessageCircle size={17} fill="white" strokeWidth={0} />
              Chat on WhatsApp
            </a>
            <a
              href="tel:03177774647"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors border border-white/20"
            >
              <Phone size={15} />
              0317-777-4647
            </a>
          </div>
        </div>

        <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2 border-white/20">
          <img
            src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80"
            alt="Springs Mini Mart Flagship Supermarket Store"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-xl border border-ink/10 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
            <Leaf size={24} />
          </div>
          <h3 className="font-display font-semibold text-ink text-base">Organic & Fresh First</h3>
          <p className="text-xs text-ink/60 mt-1 leading-relaxed">
            Direct farmer partnerships ensure peak freshness, pesticide-free fruits, and honest nutrition.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ink/10 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-maroon/10 text-maroon flex items-center justify-center mb-3">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-display font-semibold text-ink text-base">Uncompromised Quality</h3>
          <p className="text-xs text-ink/60 mt-1 leading-relaxed">
            Every item is hand-screened before stocking and temperature-controlled right up to your doorstep.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ink/10 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <HeartHandshake size={24} />
          </div>
          <h3 className="font-display font-semibold text-ink text-base">Community Trust</h3>
          <p className="text-xs text-ink/60 mt-1 leading-relaxed">
            Convenient Cash-on-Delivery, 100% replacement guarantee, and dedicated 24/7 customer support.
          </p>
        </div>
      </div>

      {/* Store Locations */}
      <div className="mb-10">
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-ink">Our Store Locations</h2>
          <p className="text-xs md:text-sm text-ink/60 mt-0.5">
            Visit us in store or order online for 45-minute neighborhood delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stores.map((store) => (
            <div
              key={store.city}
              className="bg-white rounded-2xl border border-ink/10 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ink/10">
                <span className="font-display text-lg font-bold text-maroon">{store.city}</span>
                <span className="text-[10px] bg-cream border border-ink/10 px-2 py-0.5 rounded font-semibold text-ink/70">
                  Open Today
                </span>
              </div>

              <div className="space-y-2.5 py-4 text-xs text-ink/70 flex-1">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-maroon flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink block">{store.branch}</strong>
                    <span>{store.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-maroon flex-shrink-0" />
                  <span>{store.timings}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={15} className="text-maroon flex-shrink-0" />
                  <a href={`tel:${store.phone.replace(/[^0-9]/g, '')}`} className="hover:text-maroon font-medium">
                    {store.phone}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-ink/10">
                <p className="text-[10px] font-bold text-ink/50 uppercase tracking-wider mb-2">Highlights</p>
                <div className="flex flex-wrap gap-1">
                  {store.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] bg-cream/70 text-ink/70 px-2 py-0.5 rounded-full"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
