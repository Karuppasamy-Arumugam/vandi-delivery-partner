import React, { useState } from 'react';
import { MapPin, ShieldAlert, ChevronDown, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';
import { ZoneSelectModal } from './Modals/ZoneSelectModal';

export const Header = () => {
  const { partnerProfile, currentZone, isOnline, setActiveTab, triggerEmergency } = useDelivery();
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);

  // Format today's date in Tamil Nadu / Indian locale style
  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  return (
    <>
      <header className="bg-brand-deep text-white border-b border-emerald-900/50 px-4 pt-3.5 pb-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Brand + Vanakkam Greeting & Date */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveTab('profile')}
              className="relative cursor-pointer group"
              title="View Partner Profile"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-forest to-brand-deep border-2 border-brand-lime flex items-center justify-center font-bold text-white shadow-sm overflow-hidden group-hover:ring-2 group-hover:ring-brand-lime transition-all">
                <span className="text-sm tracking-tighter font-black text-brand-lime">வ</span>
              </div>
              {/* Online Indicator Dot on Avatar */}
              <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-brand-deep ${
                isOnline ? 'bg-brand-lime ring-1 ring-white/50 animate-pulse' : 'bg-slate-400'
              }`} />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1">
                  <span>Vanakkam, {partnerProfile.name.split(' ')[0]}</span>
                  <span className="text-brand-lime text-xs">✨</span>
                </h1>
              </div>
              <p className="text-[11px] text-emerald-200/80 font-medium">{todayFormatted}</p>
            </div>
          </div>

          {/* Right: Operating Zone Selector & Emergency SOS */}
          <div className="flex items-center gap-2">
            {/* Zone Selector Button */}
            <button
              onClick={() => setIsZoneModalOpen(true)}
              className="flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/40 text-xs px-2.5 py-1.5 rounded-xl transition-colors shadow-sm"
              aria-label="Change Operating Zone"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-lime flex-shrink-0" />
              <span className="font-semibold text-emerald-100 max-w-[90px] sm:max-w-[120px] truncate">
                {currentZone.shortName}
              </span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>

            {/* Quick SOS Trigger */}
            <button
              onClick={triggerEmergency}
              className="w-9 h-9 rounded-xl bg-red-600/90 hover:bg-red-600 active:scale-95 text-white flex items-center justify-center shadow-sm border border-red-400/40 transition-transform"
              title="Emergency SOS Assistance"
              aria-label="Emergency SOS"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Zone Select Modal */}
      <ZoneSelectModal
        isOpen={isZoneModalOpen}
        onClose={() => setIsZoneModalOpen(false)}
      />
    </>
  );
};
