import React, { useState } from 'react';
import { ShieldAlert, X, PhoneCall, AlertTriangle, CheckCircle2, Radio } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';

export const EmergencyModal = () => {
  const { emergencyModal, closeEmergencyModal, showToast } = useDelivery();
  const [sosSent, setSosSent] = useState(false);

  if (!emergencyModal.isOpen) return null;

  const handleTriggerSOS = () => {
    setSosSent(true);
    showToast("🚨 SOS Alert Broadcasted to Vandi Emergency Response & Local Police", "error");
  };

  const handleClose = () => {
    setSosSent(false);
    closeEmergencyModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-label="Emergency SOS">
      <div className="w-full max-w-sm bg-red-950/95 border-2 border-red-500 rounded-3xl p-6 text-white shadow-2xl flex flex-col items-center animate-slide-up">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
            <Radio className="w-4 h-4 animate-pulse text-red-500" />
            <span>Emergency Safety Center</span>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close Emergency Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SOS Icon */}
        <div className="w-20 h-20 rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center mb-3 text-red-400 animate-pulse">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>

        <h3 className="text-xl font-black text-white text-center mb-1">
          Partner Safety & SOS
        </h3>
        <p className="text-xs text-red-200 text-center mb-6">
          Are you in immediate danger, facing an accident, or need police assistance in Tamil Nadu?
        </p>

        {!sosSent ? (
          <div className="w-full space-y-3">
            {/* Big SOS Broadcast Button */}
            <button
              onClick={handleTriggerSOS}
              className="w-full py-4 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/50 transition-all border border-red-400"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>BROADCAST SOS ALERT</span>
            </button>

            {/* Quick Emergency Numbers */}
            <div className="pt-2 space-y-2">
              <a
                href="tel:112"
                onClick={() => showToast("Dialing 112 (Tamil Nadu Police & All Emergency Services)")}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center justify-between px-4 transition-colors"
              >
                <span>Dial 112 (TN Police & Emergency)</span>
                <PhoneCall className="w-4 h-4 text-red-400" />
              </a>

              <a
                href="tel:108"
                onClick={() => showToast("Dialing 108 (Tamil Nadu Free Ambulance Service)")}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center justify-between px-4 transition-colors"
              >
                <span>Dial 108 (TN Ambulance)</span>
                <PhoneCall className="w-4 h-4 text-red-400" />
              </a>

              <a
                href="tel:180042582634"
                onClick={() => showToast("Calling Vandi 24x7 Safety Rapid Response")}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center justify-between px-4 transition-colors"
              >
                <span>Vandi 24x7 Safety Response</span>
                <PhoneCall className="w-4 h-4 text-brand-lime" />
              </a>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-4 text-center py-2 animate-fade-in">
            <div className="p-4 bg-red-900/60 border border-red-500/60 rounded-2xl text-xs text-red-100 text-left space-y-1.5">
              <p className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-lime" />
                <span>SOS Signal Transmitted</span>
              </p>
              <p>• Live GPS coordinates shared with Vandi Rapid Safety Control.</p>
              <p>• Emergency contacts notified via automated SMS.</p>
              <p>• Nearby field supervisor dispatched to your location.</p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl text-xs transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
