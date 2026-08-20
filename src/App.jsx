import React, { useState } from 'react';
import { useDelivery, DeliveryProvider } from './context/DeliveryContext';
import { Header } from './components/Header';
import { AvailabilityToggle } from './components/AvailabilityToggle';
import { EarningsSummaryCard } from './components/EarningsSummaryCard';
import { NewDeliveryRequest } from './components/NewDeliveryRequest';
import { ActiveDeliveryFlow } from './components/ActiveDeliveryFlow';
import { TasksView } from './components/TasksView';
import { EarningsView } from './components/EarningsView';
import { ProfileView } from './components/ProfileView';
import { BottomNav } from './components/BottomNav';
import { CallModal } from './components/Modals/CallModal';
import { SupportModal } from './components/Modals/SupportModal';
import { PayoutModal } from './components/Modals/PayoutModal';
import { EmergencyModal } from './components/Modals/EmergencyModal';
import { SAMPLE_DELIVERY_TASKS } from './data/sampleTasks';
import { 
  Smartphone, Monitor, Sparkles, AlertCircle, 
  CheckCircle2, Info, ArrowRight, Layers 
} from 'lucide-react';

const AppContent = () => {
  const { 
    activeTab, 
    activeTask, 
    acceptDeliveryRequest, 
    toastMessage, 
    isOnline 
  } = useDelivery();

  const [deviceFrameMode, setDeviceFrameMode] = useState(false); // Mobile frame toggle for desktop view

  return (
    <div className="min-h-screen bg-[#032418] text-slate-900 flex flex-col items-center justify-start antialiased selection:bg-brand-lime selection:text-brand-darkest font-sans">
      
      {/* Top Desktop Helper Toolbar (Only visible on large screens) */}
      <aside aria-label="Desktop preview options" className="hidden lg:flex w-full max-w-4xl items-center justify-between py-2.5 px-4 text-xs text-emerald-200/90 border-b border-emerald-900/60 bg-brand-forest/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-brand-lime text-brand-darkest font-black flex items-center justify-center text-xs">
            வ
          </div>
          <span className="font-bold text-white tracking-wide">Vandi Delivery Partner Application</span>
          <span className="text-emerald-400 font-mono text-[11px]">• Tamil Nadu Multi-Category Logistics</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile frame preview toggle */}
          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors"
            title="Toggle Smartphone Frame"
          >
            {deviceFrameMode ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5 text-brand-lime" />}
            <span>{deviceFrameMode ? "Full Width Mode" : "Mobile Frame Mode"}</span>
          </button>
        </div>
      </aside>

      {/* Main App Container (Mobile First Container) */}
      <main className={`w-full transition-all duration-300 min-h-screen flex flex-col bg-brand-forest relative shadow-2xl ${
        deviceFrameMode 
          ? 'max-w-md my-4 rounded-[40px] border-8 border-slate-900 overflow-hidden min-h-[92vh] max-h-[94vh] ring-1 ring-emerald-500/30' 
          : 'max-w-md md:max-w-lg lg:max-w-xl'
      }`}>
        
        {/* Sticky Header */}
        <Header />

        {/* View Switcher */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {activeTab === 'home' && (
            <div className="space-y-1 pb-24 animate-fade-in">
              {/* Online/Offline Availability Switch */}
              <AvailabilityToggle />

              {/* Earnings Overview Card */}
              <EarningsSummaryCard />

              {/* Active Delivery Flow OR Incoming Request Card */}
              {activeTask ? (
                <ActiveDeliveryFlow />
              ) : (
                <>
                  <NewDeliveryRequest />

                  {/* Category Task Quick-Sampler (Allows easily trying all 6 categories!) */}
                  {isOnline && (
                    <div className="px-4 pb-6">
                      <div className="bg-slate-900/80 border border-emerald-900/70 rounded-3xl p-4 text-white">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-brand-lime" />
                            <span className="font-bold text-xs text-brand-lime">
                              Sample Category Tasks
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">Click to preview</span>
                        </div>

                        <p className="text-[11px] text-slate-300 mb-3">
                          Test delivery workflows for all 6 Tamil Nadu logistics categories:
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                          {SAMPLE_DELIVERY_TASKS.slice(0, 6).map((task) => (
                            <button
                              key={task.id}
                              onClick={() => acceptDeliveryRequest(task)}
                              className="p-2 rounded-xl bg-white/10 hover:bg-brand-lime hover:text-brand-darkest active:scale-95 text-white border border-white/10 text-left transition-all group"
                              title={`Accept ${task.category} task from ${task.pickupBusiness}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[11px] block truncate group-hover:text-brand-darkest">
                                  {task.category}
                                </span>
                                <span className="text-[10px] font-black text-brand-lime group-hover:text-brand-darkest">
                                  ₹{task.partnerPay}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400 group-hover:text-brand-darkest/80 block truncate mt-0.5">
                                {task.pickupBusiness.split(' ')[0]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'tasks' && <TasksView />}
          {activeTab === 'earnings' && <EarningsView />}
          {activeTab === 'profile' && <ProfileView />}
        </div>

        {/* Global Toast Banner */}
        {toastMessage && (
          <div 
            role="status" 
            aria-live="polite"
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm animate-slide-up"
          >
            <div className={`p-3.5 rounded-2xl shadow-floating text-xs font-bold flex items-center gap-2.5 text-white border ${
              toastMessage.type === 'error'
                ? 'bg-red-950/95 border-red-500 text-red-200'
                : toastMessage.type === 'info'
                ? 'bg-slate-900/95 border-slate-700 text-slate-200'
                : 'bg-emerald-950/95 border-brand-lime/80 text-emerald-100'
            }`}>
              {toastMessage.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              ) : toastMessage.type === 'info' ? (
                <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-brand-lime flex-shrink-0" />
              )}
              <span className="flex-1">{toastMessage.message}</span>
            </div>
          </div>
        )}

        {/* Global Modals */}
        <CallModal />
        <SupportModal />
        <PayoutModal />
        <EmergencyModal />

        {/* Single-Page Bottom Fixed Navigation */}
        <BottomNav />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <DeliveryProvider>
      <AppContent />
    </DeliveryProvider>
  );
}
