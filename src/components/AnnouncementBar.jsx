import { useState } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="relative bg-maroon-dark text-cream text-xs sm:text-sm font-medium py-2 px-10 text-center">
      <span>Use voucher code <strong className="bg-white/20 text-white px-2 py-0.5 rounded font-mono font-bold tracking-wider">WELCOME10</strong> for 10% OFF your first order · 30-Min Cold-Chain Delivery across Bahria Town, DHA & Gulberg</span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  )
}
