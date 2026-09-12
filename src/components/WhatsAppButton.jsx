import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '923177774647' // Format: country code + number, no symbols

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 left-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  )
}
