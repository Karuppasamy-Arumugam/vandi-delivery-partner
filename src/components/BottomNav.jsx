import React from 'react';
import { Home, ClipboardList, Wallet, User, Radio, Flame } from 'lucide-react';
import { useDelivery } from '../context/DeliveryContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab, activeTask, currentRequest, isOnline, completedTasks } = useDelivery();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      hasBadge: isOnline && !activeTask && currentRequest,
      badgeText: '1'
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: ClipboardList,
      hasBadge: !!activeTask,
      badgeText: activeTask ? 'Active' : null
    },
    {
      id: 'earnings',
      label: 'Earnings',
      icon: Wallet,
      hasBadge: false,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      hasBadge: false,
    }
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-floating"
      aria-label="Bottom Navigation"
    >
      <div className="max-w-md mx-auto px-3 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 min-w-[64px] min-h-[48px] rounded-2xl transition-all ${
                isActive 
                  ? 'text-brand-deep font-extrabold scale-105' 
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active Tab Background Pill */}
              {isActive && (
                <span className="absolute inset-0 bg-emerald-50 rounded-2xl -z-10 border border-emerald-200/60 transition-all" />
              )}

              {/* Icon with potential notification badge */}
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'text-brand-deep stroke-[2.5]' : 'stroke-[1.8]'}`} />

                {/* Badge Indicator */}
                {item.hasBadge && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-brand-lime text-brand-darkest text-[9px] font-black rounded-full border border-white shadow-sm animate-pulse">
                    {item.badgeText}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[11px] mt-1 tracking-tight ${
                isActive ? 'text-brand-deep font-extrabold' : 'text-slate-600'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
