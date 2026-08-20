import React, { useState } from 'react';
import { 
  User, Star, ShieldCheck, Bike, MapPin, 
  Phone, Award, ShieldAlert, RotateCcw, 
  ChevronRight, ExternalLink, HelpCircle, FileCheck, CheckCircle2 
} from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';
import { ZoneSelectModal } from './Modals/ZoneSelectModal';

export const ProfileView = () => {
  const { 
    partnerProfile, 
    currentZone, 
    completedTasks, 
    triggerEmergency, 
    triggerSupport, 
    resetPrototypeData,
    showToast 
  } = useDelivery();

  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);

  // Total lifetime deliveries = baseline (1,482) + prototype completed tasks
  const totalDeliveries = 1482 + completedTasks.length;

  return (
    <div className="p-4 space-y-4 pb-24 animate-fade-in" aria-label="Partner Profile">
      
      {/* Profile Card Top Banner */}
      <div className="bg-gradient-to-br from-brand-forest via-brand-deep to-emerald-950 rounded-3xl p-5 border border-emerald-700/60 text-white shadow-card relative overflow-hidden">
        <div className="relative z-10 flex items-start gap-4">
          
          {/* Avatar with Tamil Vandi badge */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-brand-lime flex items-center justify-center text-3xl font-black text-brand-lime shadow-md">
              <span>வ</span>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-brand-lime text-brand-darkest text-[9px] font-black px-1.5 py-0.5 rounded-full border border-brand-darkest">
              TN-PRO
            </span>
          </div>

          {/* Partner Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white truncate tracking-tight">
                {partnerProfile.name}
              </h2>
            </div>
            <p className="text-xs text-emerald-200/80 font-mono mt-0.5">ID: {partnerProfile.id}</p>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{partnerProfile.rating}</span>
                <span className="text-[10px] text-amber-200/70">({partnerProfile.ratingCount})</span>
              </div>

              <span className="text-[11px] font-bold text-brand-lime bg-emerald-950/90 border border-emerald-600/50 px-2.5 py-0.5 rounded-full">
                {partnerProfile.tier}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-emerald-800/80 text-center">
          <div>
            <span className="text-[10px] text-emerald-300 font-semibold uppercase block">Career Runs</span>
            <span className="text-base font-black text-white">{totalDeliveries}</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-300 font-semibold uppercase block">Acceptance</span>
            <span className="text-base font-black text-brand-lime">{partnerProfile.acceptanceRate}</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-300 font-semibold uppercase block">On-Time</span>
            <span className="text-base font-black text-white">{partnerProfile.onTimeRate}</span>
          </div>
        </div>
      </div>

      {/* Vehicle & Operational Info Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card space-y-3">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
          <Bike className="w-4 h-4 text-brand-deep" />
          <span>Vehicle & Zone Details</span>
        </h3>

        <div className="space-y-2 text-xs">
          {/* Vehicle info */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase block">Registered Vehicle</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{partnerProfile.vehicleType}</p>
            </div>
            <span className="font-mono font-bold text-xs bg-slate-200/80 text-slate-800 px-2 py-1 rounded-md">
              {partnerProfile.vehicleReg}
            </span>
          </div>

          {/* Operating Zone */}
          <div 
            onClick={() => setIsZoneModalOpen(true)}
            className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl flex items-center justify-between cursor-pointer hover:bg-emerald-100/50 transition-colors"
          >
            <div>
              <span className="text-[10px] font-semibold text-emerald-800 uppercase block">Operating Zone (Tamil Nadu)</span>
              <p className="font-bold text-brand-deep text-sm mt-0.5">{currentZone.name}</p>
            </div>
            <span className="text-xs font-bold text-brand-deep flex items-center gap-0.5">
              <span>Change</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* KYC & Verification Status Badges */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-deep" />
            <span>Verification & KYC Status</span>
          </h3>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            100% Verified
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: 'Aadhaar Identity', detail: '•••• •••• 9210' },
            { label: 'Tamil Nadu DL', detail: 'TN-09-2018-004821' },
            { label: 'Vehicle RC Book', detail: 'Active & Insured' },
            { label: 'Police Background', detail: 'Clear Record' }
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">{item.label}</p>
                <p className="text-[10px] text-slate-500 font-mono">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency & Safety Support Section */}
      <div className="bg-red-50/70 border border-red-200 rounded-3xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <h3 className="font-extrabold text-red-950 text-sm">Emergency & Partner Safety</h3>
          </div>
          <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-md uppercase">
            24x7 Active
          </span>
        </div>

        <p className="text-xs text-red-800 leading-relaxed">
          In case of accidents, road hazards, or medical emergency during deliveries anywhere in Tamil Nadu, tap below for instant 112 dispatch.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={triggerEmergency}
            className="py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Launch SOS Alert</span>
          </button>

          <button
            onClick={() => triggerSupport()}
            className="py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-brand-deep" />
            <span>Partner Help Center</span>
          </button>
        </div>
      </div>

      {/* App Reset & Prototype Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-800 text-xs">Reset Prototype Demo Data</h4>
            <p className="text-[11px] text-slate-500">Restore demo tasks, completed queue, and default earnings</p>
          </div>
          <button
            onClick={resetPrototypeData}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
            title="Reset LocalStorage State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center pt-2 pb-4 text-slate-400 space-y-1 text-xs">
        <p className="font-bold text-slate-300">Vandi Delivery Partner App • v2.4.0</p>
        <p className="text-[11px] text-slate-400">“Deliver more. Earn better.” • Made for Tamil Nadu</p>
      </div>

      {/* Zone Select Modal */}
      <ZoneSelectModal
        isOpen={isZoneModalOpen}
        onClose={() => setIsZoneModalOpen(false)}
      />
    </div>
  );
};
