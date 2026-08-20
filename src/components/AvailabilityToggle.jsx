import React from 'react';
import { Power, Radio, AlertCircle, Sparkles, CheckCircle2, ShieldOff } from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';

export const AvailabilityToggle = () => {
  const { isOnline, toggleOnline, activeTask } = useDelivery();

  return (
    <section className="p-4" aria-label="Partner Availability">
      <div className={`p-4 rounded-2xl border transition-all shadow-sm ${
        isOnline 
          ? 'bg-gradient-to-r from-emerald-900/90 via-brand-forest to-emerald-950 text-white border-emerald-700/60' 
          : 'bg-slate-900/90 text-slate-200 border-slate-700/80'
      }`}>
        
        {/* Toggle Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Pulsating Radar or Offline Icon */}
            <div className={`relative w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all ${
              isOnline 
                ? 'bg-brand-lime text-brand-darkest shadow-action animate-radar' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              {isOnline ? (
                <Radio className="w-5 h-5" />
              ) : (
                <ShieldOff className="w-5 h-5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide">
                  {isOnline ? "YOU ARE ONLINE" : "YOU ARE OFFLINE"}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${
                  isOnline ? 'bg-brand-lime animate-ping' : 'bg-slate-500'
                }`} />
              </div>
              <p className="text-xs text-slate-300">
                {isOnline 
                  ? (activeTask ? "Active order in progress" : "Ready for incoming orders nearby") 
                  : "Dispatch paused • No orders assigned"}
              </p>
            </div>
          </div>

          {/* Switch Toggle */}
          <button
            onClick={toggleOnline}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-forest ${
              isOnline ? 'bg-brand-lime' : 'bg-slate-700'
            }`}
            role="switch"
            aria-checked={isOnline}
            aria-label={isOnline ? "Switch to Offline Mode" : "Switch to Online Mode"}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                isOnline ? 'translate-x-9 bg-brand-darkest' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Informative Explanation banner when Offline */}
        {!isOnline && (
          <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-start gap-2.5 text-xs text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-amber-200">
                New delivery tasks are currently locked because you are offline.
              </p>
              <p className="text-[11px] text-amber-300/80 mt-0.5">
                Turn your status to <strong>Online</strong> to start receiving high-paying food, grocery, and medicine deliveries across your zone.
              </p>
              <button
                onClick={toggleOnline}
                className="mt-2 px-3 py-1.5 bg-brand-lime text-brand-darkest font-bold text-xs rounded-lg shadow-sm hover:bg-brand-limeHover transition-colors inline-flex items-center gap-1.5"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Go Online Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
