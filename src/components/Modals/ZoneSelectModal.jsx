import React from 'react';
import { MapPin, X, Check, Flame, Navigation } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';
import { OPERATING_ZONES } from '../../data/zones';

export const ZoneSelectModal = ({ isOpen, onClose }) => {
  const { partnerProfile, changeOperatingZone } = useDelivery();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="Select Operating Zone">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slide-up">
        
        {/* Header */}
        <div className="bg-brand-deep text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-lime text-brand-darkest flex items-center justify-center font-bold">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">Select Operating Zone</h3>
              <p className="text-xs text-brand-lime font-medium">Tamil Nadu Delivery Clusters</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close Zone Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Zones */}
        <div className="p-4 overflow-y-auto space-y-2.5">
          {OPERATING_ZONES.map((zone) => {
            const isSelected = partnerProfile.zoneId === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  changeOperatingZone(zone.id);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-brand-emerald bg-emerald-50/70 ring-1 ring-brand-emerald shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{zone.shortName}</span>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600" />
                      {zone.activeOrdersSurge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">{zone.name}</p>
                  
                  <div className="flex flex-wrap gap-1 pt-1">
                    {zone.popularHubs.slice(0, 3).map((hub, idx) => (
                      <span key={idx} className="text-[10px] text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-1 pl-2">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-brand-emerald text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-300"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
