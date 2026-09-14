import { useState, useEffect } from 'react'
import { MapPin, X, Check, Navigation, Clock } from 'lucide-react'

const cityZones = {
  'Islamabad / Rawalpindi': [
    'Bahria Town (Phases 1-8)',
    'DHA Phase 2 & Expressway',
    'F-6 & F-7 Super Market',
    'F-8 & F-10 Markaz',
    'E-11 & D-12',
    'Chaklala Scheme III & Saddar',
  ],
  'Lahore': [
    'Gulberg III (Main Boulevard)',
    'DHA Phases 1 - 6',
    'Model Town & Garden Town',
    'Cantt & Cavalry Ground',
    'Johar Town & Wapda Town',
  ],
  'Karachi': [
    'DHA Phases 1 - 8 & Zamzama',
    'Clifton (Blocks 1 - 9)',
    'PECHS & Tariq Road',
    'Bahria Town Karachi',
    'Gulshan-e-Iqbal',
  ],
}

export default function LocationModal({ isOpen, onClose, currentLocation, onSelectLocation }) {
  const [selectedCity, setSelectedCity] = useState('Islamabad / Rawalpindi')
  const [selectedArea, setSelectedArea] = useState(currentLocation || 'Bahria Town (Phases 1-8)')

  useEffect(() => {
    if (currentLocation) {
      // Find which city contains this area
      for (const [city, areas] of Object.entries(cityZones)) {
        if (areas.some((a) => currentLocation.includes(a) || a.includes(currentLocation))) {
          setSelectedCity(city)
          setSelectedArea(currentLocation)
          break
        }
      }
    }
  }, [currentLocation, isOpen])

  if (!isOpen) return null

  const handleSave = () => {
    onSelectLocation(selectedArea, selectedCity)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-ink/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/10 bg-cream/40">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-full bg-maroon/10 text-maroon">
              <MapPin size={18} />
            </span>
            <div>
              <h3 className="font-display font-bold text-base text-ink">Choose Delivery Location</h3>
              <p className="text-xs text-ink/60">Find store availability & 30-min express dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full hover:bg-ink/10 text-ink/70 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* City Selector Tabs */}
          <label className="text-xs font-bold text-ink/70 uppercase tracking-wider block mb-2">
            Select Your City
          </label>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {Object.keys(cityZones).map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSelectedCity(city)
                  setSelectedArea(cityZones[city][0])
                }}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                  selectedCity === city
                    ? 'bg-maroon text-white border-maroon shadow-sm'
                    : 'bg-cream/40 border-ink/10 text-ink hover:border-maroon/40'
                }`}
              >
                {city.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Area Selector */}
          <label className="text-xs font-bold text-ink/70 uppercase tracking-wider block mb-2">
            Select Delivery Area in {selectedCity}
          </label>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {cityZones[selectedCity].map((area) => {
              const isSelected = selectedArea === area
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => setSelectedArea(area)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-maroon bg-maroon/5 text-maroon font-semibold'
                      : 'border-ink/10 hover:border-ink/20 text-ink/80 hover:bg-cream/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Navigation size={15} className={isSelected ? 'text-maroon' : 'text-ink/40'} />
                    <span className="text-xs sm:text-sm">{area}</span>
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-maroon text-white flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Delivery ETA Badge */}
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-800">
            <Clock size={16} className="flex-shrink-0 text-emerald-600" />
            <p className="text-xs">
              <strong>Express Available:</strong> Orders to <strong>{selectedArea}</strong> arrive within <strong>30–45 minutes</strong> via refrigerated dispatch.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-cream/40 border-t border-ink/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-ink/70 hover:text-ink transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 rounded-full bg-maroon text-white text-xs font-bold hover:bg-maroon-dark shadow-md transition-colors"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  )
}
