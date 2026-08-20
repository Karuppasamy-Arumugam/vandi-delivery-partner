import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Clock, MapPin, 
  Search, Filter, ChevronRight, Utensils, 
  ShoppingBag, Pill, Package, FileText, ArrowRight, Eye
} from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';
import { CATEGORY_CONFIG } from '../data/sampleTasks';

export const TasksView = () => {
  const { completedTasks, declinedTasks, activeTask, setActiveTab } = useDelivery();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'completed', 'declined'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskDetail, setSelectedTaskDetail] = useState(null);

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'Food', label: 'Food' },
    { key: 'Groceries', label: 'Groceries' },
    { key: 'Medicine', label: 'Medicine' },
    { key: 'Parcel', label: 'Parcel' },
    { key: 'Documents', label: 'Documents' },
    { key: 'Retail products', label: 'Retail' }
  ];

  // Helper icon for category
  const renderCategoryIcon = (cat) => {
    switch (cat) {
      case 'Food': return <Utensils className="w-3.5 h-3.5" />;
      case 'Groceries': return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'Medicine': return <Pill className="w-3.5 h-3.5" />;
      case 'Parcel': return <Package className="w-3.5 h-3.5" />;
      case 'Documents': return <FileText className="w-3.5 h-3.5" />;
      case 'Retail products': return <ShoppingBag className="w-3.5 h-3.5" />;
      default: return <Package className="w-3.5 h-3.5" />;
    }
  };

  // Filter tasks
  let displayedTasks = [];

  if (statusFilter === 'all' || statusFilter === 'active') {
    if (activeTask) {
      displayedTasks.push({ ...activeTask, taskStatus: 'Active' });
    }
  }

  if (statusFilter === 'all' || statusFilter === 'completed') {
    completedTasks.forEach(t => displayedTasks.push({ ...t, taskStatus: 'Completed' }));
  }

  if (statusFilter === 'all' || statusFilter === 'declined') {
    declinedTasks.forEach(t => displayedTasks.push({ ...t, taskStatus: 'Declined' }));
  }

  // Filter by category
  if (categoryFilter !== 'all') {
    displayedTasks = displayedTasks.filter(t => t.category === categoryFilter);
  }

  // Filter by query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayedTasks = displayedTasks.filter(t => 
      t.id?.toLowerCase().includes(q) ||
      t.pickupBusiness?.toLowerCase().includes(q) ||
      t.customerName?.toLowerCase().includes(q) ||
      t.pickupAddress?.toLowerCase().includes(q) ||
      t.customerAddress?.toLowerCase().includes(q)
    );
  }

  return (
    <div className="p-4 space-y-4 pb-24 animate-fade-in" aria-label="Partner Tasks List">
      
      {/* Title & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">Delivery Tasks</h2>
          <p className="text-xs text-emerald-200/80">Manage active, completed, and past Tamil Nadu runs</p>
        </div>
        <div className="bg-brand-forest/90 border border-emerald-600/40 text-brand-lime text-xs font-bold px-3 py-1.5 rounded-xl">
          {displayedTasks.length} {displayedTasks.length === 1 ? 'Task' : 'Tasks'}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Order #, Store, or Customer..."
          className="w-full pl-9 pr-4 py-2.5 bg-white rounded-2xl text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
        />
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-1.5 p-1 bg-slate-900/60 rounded-2xl border border-emerald-900/50">
        {[
          { key: 'all', label: 'All Tasks' },
          { key: 'active', label: `Active (${activeTask ? 1 : 0})` },
          { key: 'completed', label: `Completed (${completedTasks.length})` },
          { key: 'declined', label: `Declined (${declinedTasks.length})` }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === tab.key
                ? 'bg-brand-lime text-brand-darkest shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Filter Pills (Horizontal Scroll) */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategoryFilter(cat.key)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex-shrink-0 ${
              categoryFilter === cat.key
                ? 'bg-brand-deep text-brand-lime border border-brand-lime/40'
                : 'bg-white/10 text-emerald-100 border border-white/10 hover:bg-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {displayedTasks.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-card">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">No tasks found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No tasks match your selected filter or query.
            </p>
          </div>
        ) : (
          displayedTasks.map((task, idx) => {
            const isCompleted = task.taskStatus === 'Completed';
            const isActive = task.taskStatus === 'Active';
            const isDeclined = task.taskStatus === 'Declined';
            const categoryMeta = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG["Food"];

            return (
              <div
                key={task.id + idx}
                onClick={() => setSelectedTaskDetail(task)}
                className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-brand-emerald shadow-card transition-all cursor-pointer group"
              >
                {/* Card Top Row: Order ID, Category, Status Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${categoryMeta.color}`}>
                      {renderCategoryIcon(task.category)}
                      <span>{task.category}</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-500">
                      #{task.id}
                    </span>
                  </div>

                  {/* Status */}
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isActive
                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping"></span>}
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />}
                    {isDeclined && <XCircle className="w-3.5 h-3.5 text-red-600" />}
                    <span>{task.taskStatus}</span>
                  </span>
                </div>

                {/* Pickup & Drop brief */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span className="truncate max-w-[200px]">{task.pickupBusiness}</span>
                    </div>
                    <span className="font-black text-sm text-brand-deep">
                      ₹{task.partnerPay}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="truncate max-w-[200px]">{task.customerName} ({task.customerAddress?.split(',')[0]})</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
                      {task.totalDistanceKm || 3.5} km
                    </span>
                  </div>
                </div>

                {/* Footer time / action */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{task.completedAt || task.declinedAt || task.timestamp || "Active"}</span>
                  </span>

                  {isActive ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab('home');
                      }}
                      className="text-xs font-bold text-brand-deep bg-brand-lime px-2.5 py-1 rounded-lg flex items-center gap-1 hover:bg-brand-limeHover"
                    >
                      <span>Resume Flow</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-brand-deep font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      <span>View Receipt</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Receipt / Detail Modal */}
      {selectedTaskDetail && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true" aria-label="Task Receipt">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slide-up">
            
            {/* Modal Header */}
            <div className="bg-brand-deep text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest block">
                  Delivery Receipt
                </span>
                <h3 className="font-extrabold text-base text-white">
                  Order #{selectedTaskDetail.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTaskDetail(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close Receipt Modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              
              {/* Partner Earnings Summary */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-semibold">Total Partner Payout</span>
                  <div className="text-2xl font-black text-brand-deep">
                    ₹{selectedTaskDetail.partnerPay}
                  </div>
                </div>
                <div className="text-right text-xs text-slate-600 space-y-0.5">
                  <p>Base Pay: ₹{selectedTaskDetail.basePay || 60}</p>
                  <p>Distance/Surge: ₹{(selectedTaskDetail.surgePay || 10) + (selectedTaskDetail.distancePay || 25)}</p>
                  {selectedTaskDetail.tip > 0 && <p className="text-emerald-700 font-bold">Tip: ₹{selectedTaskDetail.tip}</p>}
                </div>
              </div>

              {/* Store & Customer addresses */}
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">Pickup Store</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedTaskDetail.pickupBusiness}</p>
                  <p className="text-slate-600 mt-0.5">{selectedTaskDetail.pickupAddress}</p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">Customer Drop</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedTaskDetail.customerName}</p>
                  <p className="text-slate-600 mt-0.5">{selectedTaskDetail.customerAddress}</p>
                </div>
              </div>

              {/* Items in order */}
              {selectedTaskDetail.orderItems && (
                <div className="space-y-2">
                  <span className="font-bold text-slate-700 text-xs uppercase tracking-wider block">
                    Order Items ({selectedTaskDetail.orderItems.length})
                  </span>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                    {selectedTaskDetail.orderItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.qty}x {item.name}</span>
                        {item.price > 0 && <span className="font-mono text-slate-500">₹{item.price}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedTaskDetail(null)}
                className="w-full py-3.5 bg-brand-deep text-white font-bold rounded-xl text-xs shadow-md"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
