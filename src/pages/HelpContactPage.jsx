import { useState } from 'react'
import { Phone, Mail, MessageCircle, Truck, ShieldCheck, Clock, HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react'

const faqs = [
  {
    q: 'How does Cash on Delivery (COD) work?',
    a: 'You do not need to pay anything online. When our delivery rider arrives with your fresh groceries, you can inspect the package and pay the exact order amount in cash.',
  },
  {
    q: 'What are your delivery hours and delivery zones?',
    a: 'We deliver 7 days a week from 8:00 AM to Midnight in Karachi (DHA, Clifton, PECHS, Gulshan), Lahore (Gulberg, DHA, Cantt, Model Town), and Islamabad (F & E sectors, Blue Area). Most orders arrive within 45 to 60 minutes.',
  },
  {
    q: 'What are your delivery charges?',
    a: 'We charge a flat delivery fee of PKR 150 for orders below PKR 3,000. All orders of PKR 3,000 or more receive 100% FREE express delivery!',
  },
  {
    q: 'What if an item is damaged or out of stock?',
    a: 'We have a 100% freshness guarantee. If any item does not meet your quality expectations, you can refuse it on delivery or message our WhatsApp support for an instant replacement or cash adjustment.',
  },
  {
    q: 'How can I track my live order status?',
    a: 'Simply click the "Track Order" page in the navigation bar and enter your Order ID (e.g. SPR-MTY4...). You can follow the 4-stage progress from packing to doorstep delivery.',
  },
]

export default function HelpContactPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [formData, setFormData] = useState({ name: '', contact: '', type: 'General Inquiry', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', contact: '', type: 'General Inquiry', message: '' })
    }, 2000)
  }

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 md:px-6 py-6 w-full">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 bg-maroon/10 text-maroon text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <HelpCircle size={13} /> 24/7 Customer Care
        </span>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-ink">
          Help, Support & Delivery Info
        </h1>
        <p className="text-xs md:text-sm text-ink/60 mt-2">
          Need assistance with an order, product inquiry, or delivery time? Our team is always here to assist you.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <a
          href="https://wa.me/923177774647"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-5 rounded-2xl border border-ink/10 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <MessageCircle size={24} fill="#25D366" strokeWidth={0} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-ink">WhatsApp Live Chat</h3>
            <p className="text-xs text-ink/60 mt-0.5">Instant rider & order support</p>
            <span className="text-xs font-bold text-[#25D366] mt-1 inline-block">0317-777-4647 →</span>
          </div>
        </a>

        <a
          href="tel:03177774647"
          className="bg-white p-5 rounded-2xl border border-ink/10 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-full bg-maroon/10 text-maroon flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Phone size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-ink">Phone Helpline</h3>
            <p className="text-xs text-ink/60 mt-0.5">8:00 AM – Midnight Daily</p>
            <span className="text-xs font-bold text-maroon mt-1 inline-block">Call 0317-777-4647 →</span>
          </div>
        </a>

        <a
          href="mailto:help@springsminimart.com"
          className="bg-white p-5 rounded-2xl border border-ink/10 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Mail size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-ink">Email Support</h3>
            <p className="text-xs text-ink/60 mt-0.5">Inquiries & partnerships</p>
            <span className="text-xs font-bold text-amber-700 mt-1 inline-block">help@springsminimart.com →</span>
          </div>
        </a>
      </div>

      {/* Delivery Highlights */}
      <div className="bg-cream/70 rounded-2xl border border-ink/10 p-6 md:p-8 mb-10">
        <h2 className="font-display text-xl font-bold text-ink mb-4 flex items-center gap-2">
          <Truck size={20} className="text-maroon" /> Express Delivery Policy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-ink/80 leading-relaxed">
          <div className="bg-white p-4 rounded-xl border border-ink/10">
            <h4 className="font-bold text-sm text-ink mb-1">Fee & Thresholds</h4>
            <p>
              Orders under PKR 3,000: <strong>PKR 150 Flat Fee</strong>.
              <br />
              Orders PKR 3,000 & above: <strong className="text-emerald-700">100% FREE Delivery</strong>.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-ink/10">
            <h4 className="font-bold text-sm text-ink mb-1">Cold-Chain Transit</h4>
            <p>
              Milk, butter, and bakery items are packed in insulated temperature-controlled pouches so they arrive chilled and oven-fresh.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-ink/10">
            <h4 className="font-bold text-sm text-ink mb-1">Inspection on Arrival</h4>
            <p>
              Feel free to inspect your fruits, vegetables, and seal dates right in front of the rider before handing over cash payment.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs and Contact Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* FAQs */}
        <div>
          <h2 className="font-display text-xl font-bold text-ink mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-ink/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-ink hover:text-maroon transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-ink/70 leading-relaxed border-t border-ink/5 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Inquiry Form */}
        <div className="bg-white rounded-2xl border border-ink/10 p-6 md:p-8 shadow-sm">
          <h2 className="font-display text-xl font-bold text-ink mb-1">
            Send Customer Inquiry
          </h2>
          <p className="text-xs text-ink/60 mb-5">
            Fill in your details below and our customer support supervisor will get in touch.
          </p>

          {submitted ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center text-green-800 space-y-2">
              <CheckCircle2 size={36} className="mx-auto text-green-600" />
              <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
              <p className="text-xs text-green-700">
                Thank you. A representative will contact you shortly via phone or WhatsApp.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs font-semibold text-green-800 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-ink/70 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Khan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-cream/30 border border-ink/20 rounded-lg focus:outline-none focus:border-maroon text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-ink/70 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300-1234567"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-cream/30 border border-ink/20 rounded-lg focus:outline-none focus:border-maroon text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-ink/70 mb-1">
                  Inquiry Category
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-cream/30 border border-ink/20 rounded-lg focus:outline-none focus:border-maroon text-sm"
                >
                  <option>Order Status / Late Delivery</option>
                  <option>Product Quality or Replacement</option>
                  <option>Bulk / Corporate Grocery Order</option>
                  <option>General Feedback / Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-ink/70 mb-1">
                  Message / Order Details *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-cream/30 border border-ink/20 rounded-lg focus:outline-none focus:border-maroon text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-maroon hover:bg-maroon-dark text-white font-semibold flex items-center justify-center gap-2 shadow transition-colors"
              >
                <Send size={15} />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
