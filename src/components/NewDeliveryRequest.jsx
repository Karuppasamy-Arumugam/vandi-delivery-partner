import React, { useState } from 'react';
import { 
  Utensils, ShoppingBag, Pill, Package, FileText, 
  MapPin, Clock, ArrowRight, CheckCircle2, XCircle, 
  Sparkles, Flame, ChevronRight, AlertCircle, RefreshCw, Eye
} from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';
import { CATEGORY_CONFIG } from '../data/sampleTasks';

export const NewDeliveryRequest = () => {
  const { 
    currentRequest, 
    requestTimeLeft, 
    isOnline, 
    acceptDeliveryRequest, 
    declineDeliveryRequest,
    toggleOnline
  } = useDelivery();

  const [showItemDetails, setShowItemDetails] = useState(false);

  if (!currentRequest) {
    return (
      <section className="px-4 pb-6" aria-label="Incoming Orders">
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-card">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-brand-deep mx-auto flex items-center justify-center mb-3">
            <RefreshCw className="w-7 h-7 animate-spin text-brand-deep" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Searching for nearby orders...</h3>
          <p className="text-xs text-slate-500 mt-1">
            Staying in high-demand zones like Anna Nagar and T. Nagar increases order frequency.
          </p>
        </div>
      </section>
    );
  }

  const categoryMeta = CATEGORY_CONFIG[currentRequest.category] || CATEGORY_CONFIG["Food"];

  // Helper icon for category
  const renderCategoryIcon = () => {
    switch (currentRequest.category) {
      case 'Food': return <Utensils className="w-4 h-4" />;
      case 'Groceries': return <ShoppingBag className="w-4 h-4" />;
      case 'Medicine': return <Pill className="w-4 h-4" />;
      case 'Parcel': return <Package className="w-4 h-4" />;
      case 'Documents': return <FileText className="w-4 h-4" />;
      case 'Retail products': return <ShoppingBag className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <section className="px-4 pb-4 animate-fade-in" aria-label="New Delivery Request">
      <div className="bg-white rounded-3xl border-2 border-brand-lime/70 shadow-floating overflow-hidden relative">
        
        {/* Top Announcement Bar with Timer */}
        <div className="bg-gradient-to-r from-brand-forest via-brand-deep to-emerald-900 text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-lime"></span>
            </span>
            <span className="font-black text-xs uppercase tracking-wider text-brand-lime">
              New Delivery Request
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs font-mono font-bold text-emerald-200">
              #{currentRequest.id}
            </span>
          </div>

          {/* Countdown timer */}
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full text-xs font-mono font-bold border border-white/10">
            <Clock className="w-3.5 h-3.5 text-brand-lime" />
            <span className={requestTimeLeft <= 10 ? 'text-amber-400 font-black animate-pulse' : 'text-white'}>
              {requestTimeLeft}s
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          
          {/* Category Pill & Partner Earnings Big Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${categoryMeta.color}`}>
                  {renderCategoryIcon()}
                  <span>{currentRequest.category}</span>
                </span>
                {currentRequest.urgent && (
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-md uppercase">
                    Urgent
                  </span>
                )}
                {currentRequest.surgePay > 0 && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                    <Flame className="w-3 h-3 text-amber-600" /> Surge
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {currentRequest.itemCount} {currentRequest.itemCount === 1 ? 'item' : 'items'} • {currentRequest.paymentMode}
              </p>
            </div>

            {/* Estimated Pay */}
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Estimated Payout</span>
              <span className="text-2xl sm:text-3xl font-black text-brand-deep">
                ₹{currentRequest.partnerPay}
              </span>
            </div>
          </div>

          {/* Pickup and Dropoff Journey Chain */}
          <div className="relative pl-6 space-y-4 my-4 before:content-[''] before:absolute before:left-[11px] before:top-[14px] before:bottom-[14px] before:w-[2px] before:bg-slate-300">
            
            {/* Pickup Point */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <span className="text-[9px] font-bold">P</span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {currentRequest.pickupBusiness}
                  </h4>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                    {currentRequest.pickupDistanceKm} km away
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {currentRequest.pickupAddress}
                </p>
              </div>
            </div>

            {/* Dropoff Point */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <span className="text-[9px] font-bold">D</span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                    {currentRequest.customerName}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Drop-off
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {currentRequest.customerAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar: Total Distance, Duration, Pay Breakdown */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 rounded-2xl p-2.5 my-4 text-center">
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase block">Total Trip</span>
              <span className="text-xs font-bold text-slate-800">{currentRequest.totalDistanceKm} km</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase block">Est. Time</span>
              <span className="text-xs font-bold text-slate-800">~{currentRequest.estimatedDurationMins} mins</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase block">Base + Bonus</span>
              <span className="text-xs font-bold text-brand-deep">₹{currentRequest.basePay} + ₹{currentRequest.surgePay + currentRequest.distancePay}</span>
            </div>
          </div>

          {/* Item details toggle */}
          <div className="mb-4">
            <button
              onClick={() => setShowItemDetails(!showItemDetails)}
              className="text-xs font-bold text-slate-600 hover:text-brand-deep flex items-center gap-1 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showItemDetails ? "Hide Item Breakdown" : `View ${currentRequest.itemCount} Items (${currentRequest.category})`}</span>
            </button>

            {showItemDetails && (
              <div className="mt-2 p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1.5 text-xs text-slate-700 animate-fade-in">
                {currentRequest.orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="font-medium">{item.qty}x {item.name}</span>
                    {item.price > 0 && <span className="font-mono text-slate-500">₹{item.price}</span>}
                  </div>
                ))}
                {currentRequest.customerNotes && (
                  <p className="pt-2 border-t border-emerald-100 text-[11px] text-amber-800 font-medium">
                    Note: "{currentRequest.customerNotes}"
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Offline Guard Message */}
          {!isOnline ? (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-900 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Task Acceptance Disabled (Offline)</span>
              </div>
              <p className="text-[11px] text-amber-700">
                You must switch your status to Online before accepting deliveries.
              </p>
              <button
                onClick={toggleOnline}
                className="px-4 py-2 bg-brand-deep text-brand-lime font-bold text-xs rounded-xl shadow-sm hover:bg-brand-forest transition-colors"
              >
                Go Online to Accept
              </button>
            </div>
          ) : (
            /* Action Buttons: Decline & Accept (Lime Green) */
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Decline Button */}
              <button
                onClick={() => declineDeliveryRequest("Partner skipped")}
                className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold rounded-2xl text-sm flex items-center justify-center gap-1.5 transition-all"
                aria-label="Decline Delivery Task"
              >
                <XCircle className="w-4 h-4 text-slate-500" />
                <span>Decline</span>
              </button>

              {/* Accept Button (Vibrant Lime Green) */}
              <button
                onClick={() => acceptDeliveryRequest(currentRequest)}
                className="py-3.5 px-4 bg-brand-lime hover:bg-brand-limeHover active:scale-[0.98] text-brand-darkest font-black rounded-2xl text-sm flex items-center justify-center gap-1.5 shadow-action transition-all"
                aria-label="Accept Delivery Task"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-darkest" />
                <span>Accept (₹{currentRequest.partnerPay})</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
