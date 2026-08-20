import React, { useState } from 'react';
import { IndianRupee, X, ArrowUpRight, CheckCircle2, Building2, Smartphone, ShieldCheck } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';

export const PayoutModal = () => {
  const { payoutModal, closePayoutModal, earnings, processPayout } = useDelivery();
  const [amount, setAmount] = useState(earnings.payoutReady > 0 ? String(earnings.payoutReady) : "500");
  const [payoutMethod, setPayoutMethod] = useState("upi");
  const [upiId, setUpiId] = useState("arjun.kumar@okaxis");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transferredAmount, setTransferredAmount] = useState(0);

  if (!payoutModal.isOpen) return null;

  const handleWithdraw = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0 || numAmount > earnings.payoutReady) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTransferredAmount(numAmount);
      const success = processPayout(numAmount, payoutMethod === 'upi' ? upiId : 'SBI IMPS A/C ...4892');
      if (success) {
        setIsSuccess(true);
      }
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    closePayoutModal();
  };

  const setQuickAmount = (val) => {
    setAmount(String(Math.min(val, earnings.payoutReady)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="Instant Payout">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
        
        {/* Header */}
        <div className="bg-brand-deep text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-lime text-brand-darkest flex items-center justify-center font-bold">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Instant Partner Cashout</h3>
              <p className="text-xs text-brand-lime font-medium">0% Transfer Fee • 24x7 IMPS / UPI</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close Payout Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!isSuccess ? (
            <form onSubmit={handleWithdraw} className="space-y-5">
              {/* Balance Card */}
              <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Payout Balance</span>
                  <div className="text-2xl font-black text-brand-deep flex items-center mt-0.5">
                    <span>₹{earnings.payoutReady.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAmount(String(earnings.payoutReady))}
                  className="text-xs font-bold text-brand-deep bg-white border border-emerald-300 px-3 py-1.5 rounded-xl hover:bg-emerald-100/50 shadow-sm transition-all"
                >
                  Withdraw All
                </button>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Enter Amount to Withdraw (₹)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-lg">
                    ₹
                  </div>
                  <input
                    type="number"
                    min="50"
                    max={earnings.payoutReady}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="w-full pl-9 pr-4 py-3 text-lg font-bold text-slate-900 border border-slate-300 rounded-xl focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 transition-all"
                    placeholder="Enter amount"
                  />
                </div>

                {/* Quick amount chips */}
                <div className="flex gap-2 mt-2">
                  {[500, 1000, 2000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      disabled={earnings.payoutReady < val}
                      onClick={() => setQuickAmount(val)}
                      className={`text-xs px-3 py-1 rounded-lg border font-semibold transition-colors ${
                        Number(amount) === val
                          ? 'bg-brand-deep text-white border-brand-deep'
                          : earnings.payoutReady < val
                          ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-emerald'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payout Method Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Deposit Destination
                </label>
                <div className="space-y-2">
                  {/* UPI Option */}
                  <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    payoutMethod === 'upi' ? 'border-brand-emerald bg-emerald-50/50 ring-1 ring-brand-emerald' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="payoutMethod"
                      value="upi"
                      checked={payoutMethod === 'upi'}
                      onChange={() => setPayoutMethod('upi')}
                      className="text-brand-emerald focus:ring-brand-emerald"
                    />
                    <Smartphone className="w-5 h-5 text-brand-deep" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">Instant UPI VPA</p>
                      <p className="text-[11px] text-slate-500 font-mono">{upiId}</p>
                    </div>
                    <span className="text-[10px] font-bold text-brand-emerald bg-emerald-100 px-2 py-0.5 rounded-md">Instant</span>
                  </label>

                  {/* Bank Account Option */}
                  <label className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    payoutMethod === 'bank' ? 'border-brand-emerald bg-emerald-50/50 ring-1 ring-brand-emerald' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="payoutMethod"
                      value="bank"
                      checked={payoutMethod === 'bank'}
                      onChange={() => setPayoutMethod('bank')}
                      className="text-brand-emerald focus:ring-brand-emerald"
                    />
                    <Building2 className="w-5 h-5 text-brand-deep" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900">State Bank of India (IMPS)</p>
                      <p className="text-[11px] text-slate-500 font-mono">A/C: *******4821 • IFSC: SBIN0001234</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Safety banner */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-brand-emerald flex-shrink-0" />
                <span>NPCI 256-bit encrypted transfer with zero processing fee.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing || Number(amount) <= 0 || Number(amount) > earnings.payoutReady}
                className="w-full py-4 bg-brand-lime hover:bg-brand-limeHover text-brand-darkest font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-action active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-brand-darkest border-t-transparent rounded-full animate-spin"></span>
                    Transferring Funds...
                  </span>
                ) : (
                  <>
                    <span>Confirm Payout of ₹{Number(amount) || 0}</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-5 py-4 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-brand-lime/20 text-brand-deep mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-brand-deep" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Transfer Successful!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  ₹{transferredAmount.toLocaleString('en-IN')} has been sent to {payoutMethod === 'upi' ? upiId : 'SBI A/C ...4821'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-800">TXN-UPI-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Remaining Balance:</span>
                  <span className="font-bold text-brand-deep">₹{earnings.payoutReady.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Credit Time:</span>
                  <span className="font-bold text-emerald-600">Immediate (&lt; 30 seconds)</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 bg-brand-deep hover:bg-brand-forest text-white font-bold rounded-xl text-sm transition-colors shadow-md"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
