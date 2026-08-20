import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SAMPLE_DELIVERY_TASKS, INITIAL_COMPLETED_TASKS } from '../data/sampleTasks';
import { OPERATING_ZONES } from '../data/zones';

const DeliveryContext = createContext(null);

const STORAGE_KEYS = {
  ONLINE_STATUS: 'vandi_online_status_v1',
  ACTIVE_TASK: 'vandi_active_task_v1',
  ACTIVE_STEP: 'vandi_active_step_v1',
  COMPLETED_TASKS: 'vandi_completed_tasks_v1',
  DECLINED_TASKS: 'vandi_declined_tasks_v1',
  EARNINGS: 'vandi_earnings_v1',
  PROFILE: 'vandi_profile_v1',
};

const DEFAULT_PROFILE = {
  name: "Arjun Kumar",
  id: "VND-TN-4092",
  phone: "+91 98412 87654",
  rating: 4.92,
  ratingCount: 1240,
  vehicleType: "TVS Jupiter 125 (Electric Hybrid)",
  vehicleReg: "TN 09 BV 4821",
  zoneId: "chennai_central",
  city: "Chennai",
  joinedDate: "March 2023",
  tier: "Diamond SuperPartner",
  acceptanceRate: "96.4%",
  onTimeRate: "98.8%",
  verificationStatus: {
    aadhaar: true,
    drivingLicense: true,
    vehicleRc: true,
    backgroundCheck: true
  }
};

const INITIAL_EARNINGS = {
  today: 475,
  weekly: 6420,
  dailyTarget: 1500,
  payoutReady: 2450,
  basePayToday: 300,
  distancePayToday: 125,
  surgePayToday: 50,
  tipsToday: 0,
  transactions: [
    {
      id: "TXN-TN-9921",
      title: "Delivery: Murugan Idli Shop",
      orderId: "VND-TN-1029",
      amount: 110,
      type: "credit",
      category: "Food",
      time: "Today, 02:45 PM"
    },
    {
      id: "TXN-TN-9920",
      title: "Delivery: Chennai Fresh Mart",
      orderId: "VND-TN-1014",
      amount: 95,
      type: "credit",
      category: "Groceries",
      time: "Today, 01:15 PM"
    },
    {
      id: "TXN-TN-9919",
      title: "Delivery: MedPlus Pharmacy",
      orderId: "VND-TN-0988",
      amount: 150,
      type: "credit",
      category: "Medicine",
      time: "Today, 11:30 AM"
    },
    {
      id: "TXN-TN-9918",
      title: "Delivery: TIDEL Park Documents",
      orderId: "VND-TN-0942",
      amount: 120,
      type: "credit",
      category: "Documents",
      time: "Today, 10:05 AM"
    },
    {
      id: "TXN-TN-9915",
      title: "Instant Bank Withdrawal (UPI)",
      orderId: "PAYOUT-TN-882",
      amount: -1800,
      type: "debit",
      category: "Payout",
      time: "Yesterday, 09:30 PM"
    }
  ]
};

export const DeliveryProvider = ({ children }) => {
  // 1. Navigation State
  const [activeTab, setActiveTab] = useState('home');

  // 2. Online / Offline State
  const [isOnline, setIsOnline] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ONLINE_STATUS);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // 3. Partner Profile
  const [partnerProfile, setPartnerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // 4. Completed & Declined Tasks
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_TASKS);
      return saved ? JSON.parse(saved) : INITIAL_COMPLETED_TASKS;
    } catch {
      return INITIAL_COMPLETED_TASKS;
    }
  });

  const [declinedTasks, setDeclinedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DECLINED_TASKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Earnings State
  const [earnings, setEarnings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EARNINGS);
      return saved ? JSON.parse(saved) : INITIAL_EARNINGS;
    } catch {
      return INITIAL_EARNINGS;
    }
  });

  // 6. Active Task & Workflow Step
  const [activeTask, setActiveTask] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_TASK);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeStep, setActiveStep] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_STEP);
      return saved || 'NAV_PICKUP'; // NAV_PICKUP -> CONFIRM_PICKUP -> NAV_DROP -> CONFIRM_DROP
    } catch {
      return 'NAV_PICKUP';
    }
  });

  // 7. Incoming Delivery Request Queue
  const [taskQueueIndex, setTaskQueueIndex] = useState(0);
  const [currentRequest, setCurrentRequest] = useState(() => SAMPLE_DELIVERY_TASKS[0]);
  const [requestTimeLeft, setRequestTimeLeft] = useState(30);

  // 8. Global Modals
  const [callModal, setCallModal] = useState({
    isOpen: false,
    name: '',
    role: '',
    phone: '',
    orderId: ''
  });

  const [supportModal, setSupportModal] = useState({
    isOpen: false,
    orderId: null,
    topic: null
  });

  const [payoutModal, setPayoutModal] = useState({
    isOpen: false
  });

  const [emergencyModal, setEmergencyModal] = useState({
    isOpen: false
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.id ? null : prev));
    }, 3800);
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ONLINE_STATUS, JSON.stringify(isOnline));
    } catch (e) {
      console.error(e);
    }
  }, [isOnline]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TASK, JSON.stringify(activeTask));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_STEP, activeStep);
    } catch (e) {
      console.error(e);
    }
  }, [activeTask, activeStep]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_TASKS, JSON.stringify(completedTasks));
    } catch (e) {
      console.error(e);
    }
  }, [completedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DECLINED_TASKS, JSON.stringify(declinedTasks));
    } catch (e) {
      console.error(e);
    }
  }, [declinedTasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EARNINGS, JSON.stringify(earnings));
    } catch (e) {
      console.error(e);
    }
  }, [earnings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(partnerProfile));
    } catch (e) {
      console.error(e);
    }
  }, [partnerProfile]);

  // Request countdown timer when online & no active task
  useEffect(() => {
    if (!isOnline || activeTask || !currentRequest) return;

    const timer = setInterval(() => {
      setRequestTimeLeft(prev => {
        if (prev <= 1) {
          // Time expired, rotate to next request
          rotateNextRequest();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOnline, activeTask, currentRequest, taskQueueIndex]);

  // Rotate next sample task
  const rotateNextRequest = () => {
    const nextIdx = (taskQueueIndex + 1) % SAMPLE_DELIVERY_TASKS.length;
    setTaskQueueIndex(nextIdx);
    setCurrentRequest(SAMPLE_DELIVERY_TASKS[nextIdx]);
    setRequestTimeLeft(30);
  };

  // Toggle Online / Offline
  const toggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (nextState) {
      showToast("You are now ONLINE. Searching for nearby Tamil Nadu orders...");
    } else {
      showToast("You are now OFFLINE. New delivery requests paused.", "info");
    }
  };

  // Accept incoming delivery request
  const acceptDeliveryRequest = (taskToAccept) => {
    const task = taskToAccept || currentRequest;
    if (!task) return;
    setActiveTask(task);
    setActiveStep('NAV_PICKUP');
    showToast(`Accepted Order ${task.id} (${task.category})! Heading to ${task.pickupBusiness}`);
  };

  // Decline incoming delivery request
  const declineDeliveryRequest = (reason = "Declined by partner") => {
    if (!currentRequest) return;
    const declinedItem = {
      ...currentRequest,
      declinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      declineReason: reason
    };
    setDeclinedTasks(prev => [declinedItem, ...prev]);
    showToast(`Order ${currentRequest.id} declined. Fetching next order...`, "info");
    rotateNextRequest();
  };

  // Advance delivery workflow
  const advanceDeliveryStep = () => {
    if (!activeTask) return;

    if (activeStep === 'NAV_PICKUP') {
      setActiveStep('CONFIRM_PICKUP');
      showToast(`Arrived at ${activeTask.pickupBusiness}. Please verify items & OTP.`);
    } else if (activeStep === 'CONFIRM_PICKUP') {
      setActiveStep('NAV_DROP');
      showToast(`Pickup verified! Starting delivery to ${activeTask.customerName}.`);
    } else if (activeStep === 'CONFIRM_DROP') {
      // Finalize Delivery
      completeDeliveryFlow();
    }
  };

  // Complete Delivery Action
  const completeDeliveryFlow = () => {
    if (!activeTask) return;

    const task = activeTask;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newCompletedTask = {
      ...task,
      completedAt: `Today, ${nowTime}`,
      status: "Completed",
      ratingGiven: 5
    };

    // Update Completed Tasks list
    setCompletedTasks(prev => [newCompletedTask, ...prev]);

    // Update Earnings
    const taskEarning = task.partnerPay || 100;
    setEarnings(prev => ({
      ...prev,
      today: prev.today + taskEarning,
      weekly: prev.weekly + taskEarning,
      payoutReady: prev.payoutReady + taskEarning,
      basePayToday: prev.basePayToday + (task.basePay || 60),
      distancePayToday: prev.distancePayToday + (task.distancePay || 25),
      surgePayToday: prev.surgePayToday + (task.surgePay || 10),
      tipsToday: prev.tipsToday + (task.tip || 0),
      transactions: [
        {
          id: `TXN-TN-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `Delivery: ${task.pickupBusiness}`,
          orderId: task.id,
          amount: taskEarning,
          type: "credit",
          category: task.category,
          time: `Today, ${nowTime}`
        },
        ...prev.transactions
      ]
    }));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#84E21D', '#0A5C36', '#22C55E', '#FBBF24']
      });
    } catch (e) {
      console.log(e);
    }

    // Reset active task
    setActiveTask(null);
    setActiveStep('NAV_PICKUP');
    showToast(`🎉 Delivery completed! ₹${taskEarning} added to your earnings!`);

    // Prepare next request
    rotateNextRequest();
  };

  // Trigger simulated phone call
  const triggerCall = (name, role, phone, orderId) => {
    setCallModal({
      isOpen: true,
      name,
      role,
      phone,
      orderId
    });
  };

  const closeCallModal = () => {
    setCallModal(prev => ({ ...prev, isOpen: false }));
  };

  // Trigger Support Modal
  const triggerSupport = (orderId = null, topic = null) => {
    setSupportModal({
      isOpen: true,
      orderId: orderId || activeTask?.id || null,
      topic
    });
  };

  const closeSupportModal = () => {
    setSupportModal({ isOpen: false, orderId: null, topic: null });
  };

  // Trigger Emergency SOS Modal
  const triggerEmergency = () => {
    setEmergencyModal({ isOpen: true });
  };

  const closeEmergencyModal = () => {
    setEmergencyModal({ isOpen: false });
  };

  // Trigger Payout Modal
  const triggerPayout = () => {
    setPayoutModal({ isOpen: true });
  };

  const closePayoutModal = () => {
    setPayoutModal({ isOpen: false });
  };

  // Process Payout / Instant Cashout
  const processPayout = (amount, upiId) => {
    if (amount <= 0 || amount > earnings.payoutReady) {
      showToast("Invalid payout amount.", "error");
      return false;
    }

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEarnings(prev => ({
      ...prev,
      payoutReady: prev.payoutReady - amount,
      transactions: [
        {
          id: `TXN-TN-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `Instant Bank Transfer (${upiId || 'UPI'})`,
          orderId: `PAYOUT-${Math.floor(100 + Math.random() * 900)}`,
          amount: -amount,
          type: "debit",
          category: "Payout",
          time: `Today, ${nowTime}`
        },
        ...prev.transactions
      ]
    }));

    showToast(`₹${amount} transferred to your bank account successfully!`);
    closePayoutModal();
    return true;
  };

  // Change Operating Zone
  const changeOperatingZone = (zoneId) => {
    const selectedZone = OPERATING_ZONES.find(z => z.id === zoneId);
    if (selectedZone) {
      setPartnerProfile(prev => ({
        ...prev,
        zoneId: selectedZone.id,
        city: selectedZone.city
      }));
      showToast(`Operating zone switched to ${selectedZone.shortName}`);
    }
  };

  // Reset prototype data
  const resetPrototypeData = () => {
    localStorage.clear();
    setIsOnline(true);
    setPartnerProfile(DEFAULT_PROFILE);
    setCompletedTasks(INITIAL_COMPLETED_TASKS);
    setDeclinedTasks([]);
    setEarnings(INITIAL_EARNINGS);
    setActiveTask(null);
    setActiveStep('NAV_PICKUP');
    setTaskQueueIndex(0);
    setCurrentRequest(SAMPLE_DELIVERY_TASKS[0]);
    showToast("Prototype reset to initial demo state!");
  };

  const currentZone = OPERATING_ZONES.find(z => z.id === partnerProfile.zoneId) || OPERATING_ZONES[0];

  return (
    <DeliveryContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isOnline,
        toggleOnline,
        partnerProfile,
        setPartnerProfile,
        changeOperatingZone,
        currentZone,
        completedTasks,
        declinedTasks,
        earnings,
        activeTask,
        activeStep,
        setActiveStep,
        currentRequest,
        requestTimeLeft,
        acceptDeliveryRequest,
        declineDeliveryRequest,
        advanceDeliveryStep,
        completeDeliveryFlow,
        callModal,
        triggerCall,
        closeCallModal,
        supportModal,
        triggerSupport,
        closeSupportModal,
        emergencyModal,
        triggerEmergency,
        closeEmergencyModal,
        payoutModal,
        triggerPayout,
        closePayoutModal,
        processPayout,
        toastMessage,
        showToast,
        resetPrototypeData,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
};
