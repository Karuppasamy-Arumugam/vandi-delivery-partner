import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, ShieldCheck, User } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';

export const CallModal = () => {
  const { callModal, closeCallModal } = useDelivery();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callStatus, setCallStatus] = useState('Connecting...');

  useEffect(() => {
    if (!callModal.isOpen) {
      setCallDuration(0);
      setCallStatus('Connecting...');
      return;
    }

    const connectTimer = setTimeout(() => {
      setCallStatus('Connected (Vandi Number Masking Active)');
    }, 1200);

    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(connectTimer);
      clearInterval(interval);
    };
  }, [callModal.isOpen]);

  if (!callModal.isOpen) return null;

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-label="Active Call">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-6 text-white text-center shadow-2xl flex flex-col items-center">
        
        {/* Number masking badge */}
        <div className="flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-lime" />
          <span>Number Masked for Privacy</span>
        </div>

        {/* Avatar */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-brand-deep/80 border-2 border-brand-lime flex items-center justify-center text-3xl shadow-lg">
            <User className="w-12 h-12 text-brand-lime" />
          </div>
          <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-brand-accent border-2 border-slate-900 flex items-center justify-center">
            <Phone className="w-3 h-3 text-brand-darkest" />
          </span>
        </div>

        {/* Contact Info */}
        <h3 className="text-xl font-bold text-white mb-1">{callModal.name}</h3>
        <p className="text-xs text-brand-lime font-medium uppercase tracking-wider mb-1">
          {callModal.role || "Recipient"} • Order #{callModal.orderId}
        </p>
        <p className="text-xs text-slate-400 font-mono mb-4">{callModal.phone}</p>

        {/* Status / Timer */}
        <div className="text-sm font-semibold text-slate-300 bg-slate-800/80 px-4 py-1.5 rounded-full mb-8">
          {callStatus === 'Connecting...' ? (
            <span className="animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Calling {callModal.name}...
            </span>
          ) : (
            <span className="text-brand-lime flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping"></span>
              {formatDuration(callDuration)}
            </span>
          )}
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-6 mb-8 w-full">
          {/* Mute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            aria-label={isMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Speaker */}
          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isSpeaker ? 'bg-brand-deep text-brand-lime border border-brand-lime/40' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            aria-label={isSpeaker ? "Speaker On" : "Speaker Off"}
          >
            {isSpeaker ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={closeCallModal}
          className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-red-600/30"
          aria-label="End Call"
        >
          <PhoneOff className="w-5 h-5" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};
