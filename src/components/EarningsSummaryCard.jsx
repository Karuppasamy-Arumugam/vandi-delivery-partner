import React from 'react';
import { IndianRupee, TrendingUp, CheckCircle, ArrowRight, Wallet, Target, Sparkles } from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';

export const EarningsSummaryCard = () => {
  const { earnings, completedTasks, setActiveTab, triggerPayout } = useDelivery();

  const todayCompletedCount = completedTasks.filter(t => t.completedAt?.startsWith('Today')).length;
  const progressPercent = Math.min(100, Math.round((earnings.today / earnings.dailyTarget) * 100));

  return (
    <section className="px-4 pb-3" aria-label="Earnings Overview">
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-card">
        
        {/* Top summary row: Today's Earnings & Completed count */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <span>Today's Earnings</span>
              <span className="text-emerald-600 font-semibold">• Live</span>
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                ₹{earnings.today.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +18% vs yesterday
              </span>
            </div>
          </div>

          {/* Completed deliveries counter badge */}
          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Completed</span>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-brand-emerald flex items-center justify-center font-bold">
                <CheckCircle className="w-4 h-4 text-brand-deep" />
              </div>
              <span className="text-lg font-black text-slate-900">{todayCompletedCount}</span>
              <span className="text-xs text-slate-500 font-medium">orders</span>
            </div>
          </div>
        </div>

        {/* Daily Target Progress Bar */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Target className="w-4 h-4 text-brand-emerald" />
              <span>Daily Target: ₹{earnings.dailyTarget.toLocaleString('en-IN')}</span>
            </div>
            <span className="text-brand-deep font-bold">{progressPercent}% Achieved</span>
          </div>

          {/* Progress bar line */}
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 via-brand-emerald to-brand-lime rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
            <span>₹{(Math.max(0, earnings.dailyTarget - earnings.today)).toLocaleString('en-IN')} to hit target</span>
            <span className="text-emerald-700 font-medium">+₹150 incentive bonus</span>
          </p>
        </div>

        {/* Quick Footer Stats: Weekly total & Instant Payout CTA */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          
          {/* Weekly Total */}
          <div 
            onClick={() => setActiveTab('earnings')}
            className="p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 cursor-pointer transition-colors"
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Weekly Earnings</span>
            <span className="text-base font-extrabold text-slate-800">
              ₹{earnings.weekly.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Available Payout with Instant Cashout CTA */}
          <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/70 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Ready Payout</span>
              <span className="text-base font-extrabold text-brand-deep">
                ₹{earnings.payoutReady.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={triggerPayout}
              className="px-2.5 py-1 bg-brand-deep hover:bg-brand-forest text-brand-lime text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-transform"
              aria-label="Instant Payout"
            >
              Cash Out
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
