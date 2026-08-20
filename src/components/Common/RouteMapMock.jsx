import React from 'react';
import { MapPin, Navigation, Compass, Store, User } from 'lucide-react';

export const RouteMapMock = ({ 
  pickupName = "Murugan Idli Shop", 
  customerName = "Kavitha R.", 
  currentPhase = "pickup", // "pickup" or "drop"
  distanceKm = 1.2,
  durationMins = 8
}) => {
  const isPickupPhase = currentPhase === 'pickup';

  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-900 border border-emerald-950/40 shadow-inner flex flex-col justify-between p-3 select-none">
      {/* SVG stylized map roads */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1E293B" strokeWidth="1" />
          </pattern>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84E21D" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Background road network */}
        <path d="M-20,40 Q100,20 200,80 T420,60" fill="none" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
        <path d="M40,160 Q120,90 220,120 T380,20" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        <path d="M160,-20 L160,180" fill="none" stroke="#1E293B" strokeWidth="10" />
        
        {/* Active Animated Route */}
        <path 
          d="M 45,115 C 90,110 140,50 200,65 S 290,120 330,75" 
          fill="none" 
          stroke="url(#routeGrad)" 
          strokeWidth="5" 
          strokeDasharray="6 4"
          className="animate-pulse"
        />
      </svg>

      {/* Top Map HUD overlay */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs text-white">
          <Navigation className="w-3.5 h-3.5 text-brand-lime animate-bounce" />
          <span className="font-semibold">{distanceKm} km</span>
          <span className="text-slate-400">•</span>
          <span className="text-brand-lime font-medium">~{durationMins} mins</span>
        </div>

        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-[11px] text-slate-200">
          <Compass className="w-3 h-3 text-emerald-400" />
          <span>GPS Live</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
      </div>

      {/* Map Pin Mockups */}
      <div className="relative z-10 flex items-center justify-between px-3">
        {/* Pickup Pin */}
        <div className={`flex flex-col items-center transition-transform ${isPickupPhase ? 'scale-110' : 'opacity-80'}`}>
          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Store className="w-4 h-4" />
          </div>
          <span className="mt-1 text-[10px] font-semibold text-white bg-black/75 px-2 py-0.5 rounded-md border border-white/10 max-w-[110px] truncate">
            {pickupName}
          </span>
        </div>

        {/* Moving Partner Bike Pin */}
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-7 h-7 rounded-full bg-brand-lime text-brand-darkest flex items-center justify-center font-bold shadow-action border-2 border-brand-darkest">
            🛵
          </div>
          <span className="text-[9px] font-bold text-brand-lime uppercase tracking-wider bg-brand-darkest/90 px-1.5 py-0.2 rounded mt-0.5">
            You
          </span>
        </div>

        {/* Dropoff Pin */}
        <div className={`flex flex-col items-center transition-transform ${!isPickupPhase ? 'scale-110' : 'opacity-80'}`}>
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <User className="w-4 h-4" />
          </div>
          <span className="mt-1 text-[10px] font-semibold text-white bg-black/75 px-2 py-0.5 rounded-md border border-white/10 max-w-[110px] truncate">
            {customerName}
          </span>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-10 bg-brand-forest/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[11px] text-white flex items-center justify-between">
        <span className="text-slate-300">
          Target: <strong className="text-brand-lime">{isPickupPhase ? "Merchant Pickup" : "Customer Drop"}</strong>
        </span>
        <span className="text-[10px] text-emerald-300">Turn-by-turn Navigation</span>
      </div>
    </div>
  );
};
