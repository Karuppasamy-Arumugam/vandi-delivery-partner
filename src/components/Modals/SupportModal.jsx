import React, { useState } from 'react';
import { Headphones, X, CheckCircle2, MessageSquare, AlertCircle, ArrowRight, PhoneCall, Shield } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';

const SUPPORT_ISSUES = [
  {
    id: "cust_unreachable",
    title: "Customer is Unreachable",
    desc: "Tried calling 3 times with no answer at the doorstep",
    resolution: "We have triggered an automated Tamil/English IVR call to customer. Wait timer started (5 mins). If no response, cancellation credit of ₹45 will be issued."
  },
  {
    id: "store_delay",
    title: "Merchant Preparation Delayed",
    desc: "Food or item is taking longer than 15 mins to prepare",
    resolution: "Partner delay compensation timer initiated (₹2/min after 10 mins). Merchant notification sent."
  },
  {
    id: "address_wrong",
    title: "Delivery Address Incorrect",
    desc: "Customer location on map is far from actual house",
    resolution: "Distance recalculation enabled. Additional ₹25 distance surcharge will be added upon delivery."
  },
  {
    id: "weather_breakdown",
    title: "Heavy Rain / Vehicle Breakdown",
    desc: "Unable to continue ride safely due to weather or bike issue",
    resolution: "Safety first! Order reassignment initiated without partner acceptance penalty. Vandi roadside assistance alerted."
  },
  {
    id: "otp_issue",
    title: "OTP Verification Issue",
    desc: "Customer did not receive OTP SMS or battery dead",
    resolution: "Manual override activated. Partner selfie at doorstep enables manual delivery completion."
  }
];

export const SupportModal = () => {
  const { supportModal, closeSupportModal, showToast } = useDelivery();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [resolutionMessage, setResolutionMessage] = useState(null);
  const [isResolving, setIsResolving] = useState(false);

  if (!supportModal.isOpen) return null;

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setIsResolving(true);

    setTimeout(() => {
      setIsResolving(false);
      setResolutionMessage(issue.resolution);
      showToast(`Support Ticket #TN-${Math.floor(1000 + Math.random() * 9000)} resolved.`);
    }, 900);
  };

  const handleReset = () => {
    setSelectedIssue(null);
    setResolutionMessage(null);
    setIsResolving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="Partner Support">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slide-up">
        
        {/* Header */}
        <div className="bg-brand-deep text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-lime text-brand-darkest flex items-center justify-center font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Vandi Partner Support 24/7</h3>
              <p className="text-xs text-brand-lime font-medium">Tamil Nadu Partner Helpline • Quick Resolution</p>
            </div>
          </div>
          <button
            onClick={closeSupportModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close Support Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {supportModal.orderId && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Related to Current Order:</span>
              <span className="font-bold text-brand-deep font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">
                #{supportModal.orderId}
              </span>
            </div>
          )}

          {!resolutionMessage ? (
            <>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Your Issue for Instant Resolution
                </h4>
                <div className="space-y-2">
                  {SUPPORT_ISSUES.map((issue) => (
                    <button
                      key={issue.id}
                      onClick={() => handleSelectIssue(issue)}
                      disabled={isResolving}
                      className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-brand-emerald bg-slate-50/50 hover:bg-emerald-50/40 transition-all flex items-center justify-between group active:scale-[0.99]"
                    >
                      <div className="pr-2">
                        <p className="font-semibold text-slate-800 text-sm group-hover:text-brand-deep">
                          {issue.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{issue.desc}</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white border border-slate-200 group-hover:bg-brand-lime group-hover:border-brand-lime flex items-center justify-center text-slate-400 group-hover:text-brand-darkest transition-colors flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Call Captain Support */}
              <div className="pt-2">
                <div className="p-3.5 bg-slate-900 rounded-2xl text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-brand-lime">Need Live Voice Support?</p>
                    <p className="text-[11px] text-slate-300">Toll Free: 1800-425-VANDI (Tamil & English)</p>
                  </div>
                  <a
                    href="tel:180042582634"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast("Connecting to Vandi Captain Dispatch Line (1800-425-82634)");
                    }}
                    className="px-3 py-1.5 bg-brand-lime text-brand-darkest font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Team</span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4 py-2 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-emerald mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-brand-deep" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Resolution Applied</h4>
                <p className="text-xs text-slate-500 mt-1">Issue: {selectedIssue?.title}</p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left text-xs text-emerald-950 leading-relaxed font-medium">
                {resolutionMessage}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Choose Another Issue
                </button>
                <button
                  onClick={closeSupportModal}
                  className="flex-1 py-3 bg-brand-deep hover:bg-brand-forest text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                >
                  Done / Return to Ride
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
