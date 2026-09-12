import { useState } from 'react'
import { Plus, Minus, Instagram, MessageCircle } from 'lucide-react'
import { popularSearches } from '../data/mockData'
import { useFilters } from '../context/FilterContext'

const sections = [
  {
    title: 'About Springs',
    content:
      'Springs Mini Mart is a one-stop online grocery store aiming to meet all your shopping needs smartly, with fast delivery and secure payment.',
  },
  {
    title: 'Customer Service',
    content: 'Order tracking, returns & refunds, delivery information, and help center.',
  },
  {
    title: 'Information',
    content: 'Terms & conditions, privacy policy, and careers at Springs.',
  },
]

function AccordionItem({ title, content }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-ink/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-maroon-dark tracking-wide">{title}</span>
        {open ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      {open && <p className="pb-4 text-sm text-ink/60 leading-relaxed">{content}</p>}
    </div>
  )
}

export default function Footer() {
  const { setSearchQuery } = useFilters()

  return (
    <footer className="bg-white border-t border-ink/10 mt-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <p className="font-display text-lg text-maroon-dark tracking-wide mb-4">
          Discover. Taste. Elevate.
        </p>
        <div className="text-sm text-ink/70 space-y-1 mb-6">
          <p>
            Call us at:{' '}
            <a href="tel:03177774647" className="text-maroon hover:underline">
              0317-777-4647
            </a>
          </p>
          <p>
            Email:{' '}
            <a href="mailto:help@springsminimart.com" className="text-maroon hover:underline">
              help@springsminimart.com
            </a>
          </p>
        </div>

        <div>
          {sections.map((s) => (
            <AccordionItem key={s.title} {...s} />
          ))}
        </div>

        <div className="flex items-center gap-3 my-6">
          <a
            href="https://wa.me/923177774647"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white"
          >
            <MessageCircle size={18} fill="white" strokeWidth={0} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-ink text-white"
          >
            <Instagram size={18} />
          </a>
        </div>

        <div>
          <h3 className="font-display font-semibold text-ink mb-3">Popular Searches</h3>
          <div className="flex flex-wrap gap-x-1 gap-y-2 text-sm text-ink/60">
            {popularSearches.map((term, i) => (
              <span key={term}>
                <button
                  onClick={() => {
                    setSearchQuery(term)
                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="hover:text-maroon transition-colors"
                >
                  {term}
                </button>
                {i < popularSearches.length - 1 && <span className="mx-1.5 text-ink/25">|</span>}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-ink/40 mt-8">
          © {new Date().getFullYear()} Springs Mini Mart. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
