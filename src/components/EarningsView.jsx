import React, { useState } from 'react';
import { 
  IndianRupee, TrendingUp, Calendar, ArrowUpRight, 
  Award, Target, ChevronRight, Wallet, Clock, 
  ArrowDownLeft, Sparkles, CheckCircle2 
} from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';
import { PARTNER_INCENTIVES } from '../data/zones';

export const EarningsView = () => {
  const { earnings, triggerPayout, completedTasks } = useDelivery();
  const [selectedPeriod, setSelectedPeriod] = useState('weekly'); // 'weekly' or 'monthly'

  // Weekly bar data
  const weeklyDays = [
    { day: 'Mon', amount: 820, deliveries: 8 },
    { day: 'Tue', amount: 940, deliveries: 9 },
    { day: 'Wed', amount: 1120, deliveries: 11 },
    { day: 'Thu', amount: earnings.today || 475, deliveries: 5, isToday: true },
    { day: 'Fri', amount: 0, deliveries: 0 },
    { day: 'Sat', amount: 0, deliveries: 0 },
    { day: 'Sun', amount: 0, deliveries: 0 },
  ];

  const maxWeeklyAmount = 1200;

  return (
    <div className="p-4 space-y-4 pb-24 animate-fade-in" aria-label="Earnings Dashboard">
      
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Earnings & Payouts</h2>
          <p className="text-xs text-emerald-200/80">Track Tamil Nadu earnings, incentives, and bank transfers</p>
        </div>
        <div className="w-8 h-8 rounded-xl bg-brand-forest border border-emerald-600/40 text-brand-lime flex items-center justify-center font-bold">
          <Wallet className="w-4 h-4" />
        </div>
      </div>

      {/* Main Payout Balance Hero Card */}
      <div className="bg-gradient-to-br from-brand-forest via-brand-deep to-emerald-950 rounded-3xl p-5 border border-emerald-700/60 text-white shadow-floating relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                Payout-Ready Balance
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                ₹{earnings.payoutReady.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Instant Cashout Button */}
            <button
              onClick={triggerPayout}
              className="px-4 py-2.5 bg-brand-lime hover:bg-brand-limeHover text-brand-darkest font-black text-xs rounded-xl shadow-action active:scale-95 transition-all flex items-center gap-1.5"
              aria-label="Cashout Funds"
            >
              <span>Cash Out</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-emerald-300/80 mt-3 pt-3 border-t border-emerald-800/80 flex items-center justify-between">
            <span>Linked Account: SBI IMPS A/C ••••4821</span>
            <span className="text-brand-lime font-bold">0% Transfer Fee</span>
          </p>
        </div>
      </div>

      {/* Today's Earning Breakdown Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center justify-between border-b pb-2.5">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Today's Total</span>
            <span className="text-2xl font-black text-slate-900">₹{earnings.today.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
            {completedTasks.length} Deliveries
          </span>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 text-[10px] uppercase font-semibold block">Base Pay</span>
            <span className="font-bold text-slate-800 text-sm">₹{earnings.basePayToday || 300}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 text-[10px] uppercase font-semibold block">Distance Pay</span>
            <span className="font-bold text-slate-800 text-sm">₹{earnings.distancePayToday || 125}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 text-[10px] uppercase font-semibold block">Surge & Weather</span>
            <span className="font-bold text-amber-700 text-sm">₹{earnings.surgePayToday || 50}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-500 text-[10px] uppercase font-semibold block">Customer Tips</span>
            <span className="font-bold text-brand-emerald text-sm">₹{earnings.tipsToday || 0}</span>
          </div>
        </div>
      </div>

      {/* Weekly Performance Bar Chart */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Weekly Trend</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">₹{earnings.weekly.toLocaleString('en-IN')}</span>
              <span className="text-xs text-emerald-600 font-semibold">(Mon - Sun)</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-28 pt-4 px-1">
          {weeklyDays.map((item, idx) => {
            const heightPercent = Math.max(8, Math.round((item.amount / maxWeeklyAmount) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[9px] font-bold text-slate-500">
                  {item.amount > 0 ? `₹${item.amount}` : '-'}
                </span>
                <div 
                  className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ${
                    item.isToday 
                      ? 'bg-brand-lime border-t-2 border-brand-darkest' 
                      : item.amount > 0 
                      ? 'bg-brand-deep/80 hover:bg-brand-deep' 
                      : 'bg-slate-100'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className={`text-[10px] font-bold ${
                  item.isToday ? 'text-brand-deep font-extrabold underline' : 'text-slate-400'
                }`}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestone Incentives Tracker */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-slate-900 text-sm">Active Partner Incentives</h3>
        </div>

        <div className="space-y-2.5">
          {PARTNER_INCENTIVES.map((inc) => {
            const progress = Math.min(inc.target, completedTasks.length);
            const isCompleted = progress >= inc.target;
            const percent = Math.round((progress / inc.target) * 100);

            return (
              <div key={inc.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{inc.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{inc.description}</p>
                  </div>
                  <span className="text-xs font-black text-brand-deep bg-emerald-100 px-2 py-0.5 rounded-lg whitespace-nowrap">
                    +₹{inc.bonus}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        isCompleted ? 'bg-brand-lime' : 'bg-brand-deep'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">
                    {progress}/{inc.target} ({percent}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Earning Transactions Ledger */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm">Recent Transactions</h3>
          <span className="text-xs text-slate-400 font-medium">Auto-synced</span>
        </div>

        <div className="space-y-2">
          {earnings.transactions.map((txn, idx) => {
            const isCredit = txn.type === 'credit';
            return (
              <div key={txn.id || idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    isCredit ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                  }`}>
                    {isCredit ? <ArrowDownLeft className="w-4 h-4 text-brand-deep" /> : <ArrowUpRight className="w-4 h-4 text-red-600" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{txn.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{txn.time} • {txn.orderId}</p>
                  </div>
                </div>

                <span className={`font-black text-sm ${
                  isCredit ? 'text-brand-deep' : 'text-slate-800'
                }`}>
                  {isCredit ? '+' : ''}₹{Math.abs(txn.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
