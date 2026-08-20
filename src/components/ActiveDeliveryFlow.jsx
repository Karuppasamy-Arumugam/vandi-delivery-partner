import React, { useState } from 'react';
import { 
  Navigation, CheckCircle2, Phone, Headphones, 
  MapPin, ShieldCheck, ArrowRight, CheckSquare, 
  Square, AlertCircle, Sparkles, Key, DollarSign, Store, User
} from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';
import { RouteMapMock } from './Common/RouteMapMock';
import { CATEGORY_CONFIG } from '../data/sampleTasks';

export const ActiveDeliveryFlow = () => {
  const { 
    activeTask, 
    activeStep, 
    advanceDeliveryStep, 
    completeDeliveryFlow, 
    triggerCall, 
    triggerSupport,
    showToast 
  } = useDelivery();

  // Step 2 checklist state
  const [verifiedItems, setVerifiedItems] = useState({});
  const [storeOtpInput, setStoreOtpInput] = useState('');
  const [customerOtpInput, setCustomerOtpInput] = useState('');
  const [cashCollected, setCashCollected] = useState(false);

  if (!activeTask) return null;

  const categoryMeta = CATEGORY_CONFIG[activeTask.category] || CATEGORY_CONFIG["Food"];

  // Toggle item verification
  const toggleItemCheck = (idx) => {
    setVerifiedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Helper step indices
  const stepsList = [
    { key: 'NAV_PICKUP', label: '1. Reach Store', icon: Store },
    { key: 'CONFIRM_PICKUP', label: '2. Verify Pickup', icon: CheckSquare },
    { key: 'NAV_DROP', label: '3. Ride to Drop', icon: Navigation },
    { key: 'CONFIRM_DROP', label: '4. Complete', icon: CheckCircle2 }
  ];

  const currentStepIdx = stepsList.findIndex(s => s.key === activeStep);

  // Handle Step 2 confirmation
  const handleConfirmPickup = () => {
    if (activeTask.pickupOtp && storeOtpInput.trim() !== activeTask.pickupOtp && storeOtpInput.trim() !== '1234') {
      showToast(`Invalid OTP. Merchant PIN is ${activeTask.pickupOtp} (or use 1234)`, 'error');
      return;
    }
    advanceDeliveryStep();
  };

  // Handle Step 4 completion
  const handleFinalCompletion = () => {
    if (activeTask.paymentMode === 'Cash on Delivery' && !cashCollected) {
      showToast(`Please confirm cash collection of ₹${activeTask.codAmount || activeTask.orderTotal}`, 'error');
      return;
    }
    completeDeliveryFlow();
  };

  return (
    <section className="px-4 pb-6 animate-fade-in" aria-label="Active Delivery Workflow">
      <div className="bg-white rounded-3xl border-2 border-brand-emerald shadow-card overflow-hidden">
        
        {/* Active Flow Header */}
        <div className="bg-brand-deep text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-ping" />
              <span className="font-extrabold text-xs tracking-wider uppercase text-brand-lime">
                Active Delivery in Progress
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-200">
              #{activeTask.id}
            </span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-1 pt-1">
            {stepsList.map((step, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <div key={step.key} className="space-y-1">
                  <div className={`h-1.5 rounded-full transition-all ${
                    isPast || isCurrent ? 'bg-brand-lime' : 'bg-emerald-900'
                  }`} />
                  <p className={`text-[10px] font-semibold truncate ${
                    isCurrent ? 'text-brand-lime font-bold' : isPast ? 'text-emerald-200' : 'text-emerald-500'
                  }`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-Specific Interactive Views */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* STEP 1: NAVIGATE TO PICKUP */}
          {activeStep === 'NAV_PICKUP' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Route visualizer */}
              <RouteMapMock
                pickupName={activeTask.pickupBusiness}
                customerName={activeTask.customerName}
                currentPhase="pickup"
                distanceKm={activeTask.pickupDistanceKm}
                durationMins={Math.ceil(activeTask.pickupDistanceKm * 4)}
              />

              {/* Merchant Pickup Card */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Pickup Merchant</span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {activeTask.pickupBusiness}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">{activeTask.pickupAddress}</p>
                    {activeTask.pickupLandmark && (
                      <p className="text-[11px] text-amber-800 font-semibold mt-1">
                        Landmark: {activeTask.pickupLandmark}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-black text-brand-deep bg-white px-2.5 py-1 rounded-xl border border-amber-200 shadow-sm">
                    {activeTask.pickupDistanceKm} km
                  </span>
                </div>

                {activeTask.pickupInstructions && (
                  <div className="mt-3 pt-2.5 border-t border-amber-200/60 text-xs text-amber-900 font-medium">
                    📌 Instructions: {activeTask.pickupInstructions}
                  </div>
                )}
              </div>

              {/* Action Bar: Call Merchant, Support, Arrived */}
              <div className="flex gap-2">
                <button
                  onClick={() => triggerCall(activeTask.pickupBusiness, "Merchant", activeTask.pickupPhone, activeTask.id)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-deep" />
                  <span>Call Store</span>
                </button>

                <button
                  onClick={() => triggerSupport(activeTask.id)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Headphones className="w-4 h-4 text-brand-deep" />
                  <span>Get Help</span>
                </button>
              </div>

              {/* Primary Advancement CTA */}
              <button
                onClick={advanceDeliveryStep}
                className="w-full py-4 bg-brand-lime hover:bg-brand-limeHover active:scale-[0.99] text-brand-darkest font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-action transition-all"
              >
                <span>I Have Arrived at Merchant</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 2: CONFIRM PICKUP */}
          {activeStep === 'CONFIRM_PICKUP' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Verify Order Package</h3>
                  <p className="text-xs text-slate-500">Check items with {activeTask.pickupBusiness}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${categoryMeta.color}`}>
                  {activeTask.category}
                </span>
              </div>

              {/* Item Checklist */}
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Checklist ({activeTask.orderItems.length} items)
                </span>
                {activeTask.orderItems.map((item, idx) => {
                  const isChecked = !!verifiedItems[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleItemCheck(idx)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isChecked ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs font-semibold">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                        <span>{item.qty}x {item.name}</span>
                      </div>
                      {item.price > 0 && (
                        <span className="text-xs font-mono text-slate-500">₹{item.price}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Store 4-Digit OTP Input */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-brand-emerald" />
                    <span>Enter Merchant Pickup OTP</span>
                  </label>
                  <button
                    onClick={() => setStoreOtpInput(activeTask.pickupOtp || "4821")}
                    className="text-[11px] font-bold text-brand-deep underline"
                  >
                    Auto-fill ({activeTask.pickupOtp || "4821"})
                  </button>
                </div>
                
                <input
                  type="text"
                  maxLength={4}
                  value={storeOtpInput}
                  onChange={(e) => setStoreOtpInput(e.target.value)}
                  placeholder="Enter 4-digit code"
                  className="w-full text-center text-xl font-mono font-bold tracking-widest py-2.5 bg-white border border-emerald-300 rounded-xl focus:ring-2 focus:ring-brand-emerald/30 outline-none"
                />
              </div>

              {/* Confirm Pickup CTA */}
              <button
                onClick={handleConfirmPickup}
                className="w-full py-4 bg-brand-lime hover:bg-brand-limeHover active:scale-[0.99] text-brand-darkest font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-action transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-darkest" />
                <span>Confirm Pickup & Start Ride</span>
              </button>
            </div>
          )}

          {/* STEP 3: NAVIGATE TO DROP */}
          {activeStep === 'NAV_DROP' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Route visualizer for Drop phase */}
              <RouteMapMock
                pickupName={activeTask.pickupBusiness}
                customerName={activeTask.customerName}
                currentPhase="drop"
                distanceKm={activeTask.dropDistanceKm || 3.8}
                durationMins={Math.ceil((activeTask.dropDistanceKm || 3.8) * 4)}
              />

              {/* Customer Drop-off Card */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-brand-deep uppercase tracking-wider block">Customer Destination</span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {activeTask.customerName}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">{activeTask.customerAddress}</p>
                  </div>
                  <span className="text-sm font-black text-brand-deep bg-white px-2.5 py-1 rounded-xl border border-emerald-200 shadow-sm">
                    {activeTask.dropDistanceKm || 3.8} km
                  </span>
                </div>

                {/* Customer delivery notes */}
                {activeTask.customerNotes && (
                  <div className="mt-3 pt-2.5 border-t border-emerald-200/60 text-xs text-emerald-950 font-medium">
                    💬 Customer Note: "{activeTask.customerNotes}"
                  </div>
                )}

                {/* Payment reminder badge */}
                <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Payment Mode:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-md ${
                    activeTask.paymentMode === 'Cash on Delivery' 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {activeTask.paymentMode} {activeTask.paymentMode === 'Cash on Delivery' ? `(Collect ₹${activeTask.codAmount || activeTask.orderTotal})` : '✓'}
                  </span>
                </div>
              </div>

              {/* Contact Actions: Call Customer & Support */}
              <div className="flex gap-2">
                <button
                  onClick={() => triggerCall(activeTask.customerName, "Customer", activeTask.customerPhone, activeTask.id)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-deep" />
                  <span>Call Customer</span>
                </button>

                <button
                  onClick={() => triggerSupport(activeTask.id)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Headphones className="w-4 h-4 text-brand-deep" />
                  <span>Get Help</span>
                </button>
              </div>

              {/* Advancement CTA */}
              <button
                onClick={() => {
                  advanceDeliveryStep();
                  // Pre-fill next step state
                }}
                className="w-full py-4 bg-brand-lime hover:bg-brand-limeHover active:scale-[0.99] text-brand-darkest font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-action transition-all"
              >
                <span>Arrived at Customer Doorstep</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 4: COMPLETE DELIVERY */}
          {activeStep === 'CONFIRM_DROP' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center py-1">
                <div className="w-12 h-12 rounded-full bg-brand-lime/20 text-brand-deep mx-auto flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-7 h-7 text-brand-deep" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg">Handover & Finalize</h3>
                <p className="text-xs text-slate-500">Hand package to {activeTask.customerName}</p>
              </div>

              {/* Cash Collection Check (if COD) */}
              {activeTask.paymentMode === 'Cash on Delivery' && (
                <div 
                  onClick={() => setCashCollected(!cashCollected)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    cashCollected 
                      ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-400' 
                      : 'bg-amber-50 border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        cashCollected ? 'bg-brand-emerald text-white' : 'bg-white border border-amber-300'
                      }`}>
                        {cashCollected ? <CheckCircle2 className="w-4 h-4" /> : <DollarSign className="w-4 h-4 text-amber-700" />}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900">Cash on Delivery Confirmation</span>
                        <p className="text-xs text-slate-600">Collect ₹{activeTask.codAmount || activeTask.orderTotal} in cash</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-deep bg-white px-2 py-1 rounded-md border">
                      {cashCollected ? "Collected ✓" : "Required"}
                    </span>
                  </div>
                </div>
              )}

              {/* Customer OTP / PIN input */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-brand-deep" />
                    <span>Customer Delivery PIN / OTP</span>
                  </label>
                  <button
                    onClick={() => setCustomerOtpInput("5921")}
                    className="text-[11px] font-bold text-brand-deep underline"
                  >
                    Auto-fill (5921)
                  </button>
                </div>
                
                <input
                  type="text"
                  maxLength={4}
                  value={customerOtpInput}
                  onChange={(e) => setCustomerOtpInput(e.target.value)}
                  placeholder="Enter 4-digit code"
                  className="w-full text-center text-xl font-mono font-bold tracking-widest py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-emerald/30 outline-none"
                />
              </div>

              {/* Earnings payout breakdown for this order */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold">Your Payout for this Order:</span>
                <span className="text-base font-black text-brand-deep">₹{activeTask.partnerPay}</span>
              </div>

              {/* Final Complete CTA */}
              <button
                onClick={handleFinalCompletion}
                className="w-full py-4 bg-brand-lime hover:bg-brand-limeHover active:scale-[0.99] text-brand-darkest font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-action transition-all"
              >
                <Sparkles className="w-5 h-5 text-brand-darkest" />
                <span>Complete Delivery & Collect ₹{activeTask.partnerPay}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
