import { Zap, ShieldCheck, Snowflake, CreditCard } from 'lucide-react'

export default function TrustBar() {
  const pillars = [
    {
      icon: Zap,
      title: '30-45 Min Express',
      subtitle: 'Free delivery above Rs. 3,000',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: ShieldCheck,
      title: '100% Genuine Brands',
      subtitle: 'Direct from authorized distributors',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: Snowflake,
      title: 'Cold-Chain Guaranteed',
      subtitle: 'Chilled delivery at 4°C for perishables',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: CreditCard,
      title: 'COD & Instant Cards',
      subtitle: 'Cash, Visa, Mastercard & Raast',
      color: 'text-purple-600 bg-purple-50',
    },
  ]

  return (
    <section className="px-4 md:px-6 py-3 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {pillars.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-ink/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <div className={`p-2.5 rounded-lg ${item.color} flex-shrink-0`}>
                <Icon size={18} strokeWidth={2.25} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-ink truncate">{item.title}</h4>
                <p className="text-[10px] text-ink/60 truncate mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
