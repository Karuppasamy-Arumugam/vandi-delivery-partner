# 🛵 Vandi - Delivery Partner Single-Page Web Application
> **“Deliver more. Earn better.”**

A modern, mobile-first single-page web application built with **React** and **Vite**, designed specifically for multi-category delivery partners operating across **Tamil Nadu, India** (Chennai, Coimbatore, Madurai, and surrounding clusters).

---

## 🌟 Key Features

### 1. 📍 Tamil Nadu Localization & Context
- **Personalized Header**: Greets the partner with *"Vanakkam, Arjun"*, live Tamil Nadu locale date, and operating zone badge (*Chennai Central, South Chennai, OMR Tech Corridor, Coimbatore, Madurai*).
- **Realistic Tamil Nadu Hubs**: Includes actual pickup and drop hotspots such as *Anna Nagar 2nd Avenue, Pondy Bazaar T. Nagar, Shenoy Nagar, Phoenix Marketcity Velachery, Adyar Gandhi Nagar, Guindy Industrial Estate, and TIDEL Park OMR*.
- **Indian Currency**: All partner payouts, base fares, distance pay, tips, and cash-on-delivery amounts formatted in **₹ (INR)**.

### 2. ⚡ Online / Offline Availability Switch
- **Pulsating Radar Indicator**: Visual live GPS radar scanning for orders when Online.
- **Offline Guard**: Disables task acceptance with clear educational feedback explaining how going online unlocks high-demand orders in the zone.

### 3. 📦 6 Diverse Delivery Categories
Built-in realistic sample orders across all major delivery sectors:
1. **🍔 Food Delivery**: e.g., Murugan Idli Shop, Dindigul Thalappakatti Biryani, Adyar Ananda Bhavan (A2B).
2. **🛒 Groceries**: e.g., Pazhamudir Nilayam, Chennai Fresh Mart.
3. **💊 Medicine & Care**: e.g., Apollo Pharmacy 24x7 Express, MedPlus.
4. **📦 Express Parcels**: e.g., Tamil Nadu Courier & Logistics Hub (Guindy).
5. **📄 Secure Documents**: e.g., Madras High Court Advocate Chambers, TIDEL Park IT Registry.
6. **🛍️ Retail & Apparel**: e.g., FabIndia (Express Avenue Mall), Phoenix Marketcity.

### 4. 🚀 4-Stage Active Delivery Workflow
When a delivery request is accepted, the interface seamlessly transitions into a 4-step guided delivery pipeline:
1. **Reach Store**: Turn-by-turn map visualizer, store instructions, and functional **Call Store** modal.
2. **Verify Pickup**: Order checklist verification and 4-digit Merchant OTP validation.
3. **Ride to Drop**: Customer navigation with delivery notes, COD payment alerts, and **Call Customer** modal.
4. **Complete Delivery**: Customer OTP verification, cash collection confirmation, celebration confetti, instant earnings credit, and automatic progression to the next order.

### 5. 💰 Comprehensive Earnings & Instant Payouts
- **Today's Breakdown**: Base pay, distance pay, weather/surge bonuses, and customer tips.
- **Daily Target Progress**: Visual progress bar tracking milestone target (e.g. ₹1,500 target + ₹150 incentive bonus).
- **Weekly Trend**: Mon–Sun visual bar chart tracking weekly earnings.
- **Instant Bank / UPI Cashout**: Functional modal allowing instant withdrawals to UPI VPA or IMPS Bank Account with zero transfer fee.
- **Transaction Ledger**: Chronological transaction history linking order credits and cashout debits.

### 6. 📋 Tasks & Order History
- **Multi-Filter Tabs**: Filter by *All Tasks*, *Active*, *Completed*, and *Declined*.
- **Category Chips**: Filter by *Food, Groceries, Medicine, Parcel, Documents, Retail*.
- **Search Bar**: Instant lookup by Order ID, Store Name, or Customer.
- **Detailed Receipts**: Tap any task to view itemized bill, route distance, and payout breakdown.

### 7. 👤 Partner Profile & Safety SOS
- **Partner Credentials**: Arjun Kumar (ID: `VND-TN-4092`), 4.92 ★ rating with 1,240 ratings, TVS Jupiter 125 (`TN 09 BV 4821`).
- **KYC Badges**: Aadhaar, Tamil Nadu Driving License, Vehicle RC, and Police Verification all marked verified.
- **🚨 24/7 Emergency SOS Modal**: Instant one-tap broadcast dispatch and quick-dial links for **112** (Tamil Nadu Police & Emergency) and **108** (Ambulance).
- **24/7 Partner Support**: Instant trouble-ticket resolution for common delivery challenges (*customer unreachable, store delay, waterlogging/rain, wrong address*).
- **State Persistence**: `localStorage` automatic synchronization with a **Reset Demo Data** option in profile settings.

---

## 🎨 Design System

- **Primary Color**: Deep Forest Green (`#064E3B` / `#0A5C36`)
- **Action & Accent**: Vibrant Lime Green (`#84E21D` / `#22C55E`)
- **Background**: Warm Off-White (`#F8F9F7` / `#F3F4ED` / `#FFFFFF`)
- **Typography**: Inter & Plus Jakarta Sans
- **Controls**: Touch-friendly minimum 48px hit targets, clear focus states, ARIA accessibility attributes, and zero layout shift.

---

## 💻 Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (ESNext)
- **Styling**: Tailwind CSS v4 + Custom Theme Tokens
- **Icons**: Lucide React (`lucide-react`)
- **Visual FX**: `canvas-confetti` for delivery completion celebration
- **Storage**: `localStorage` for offline state persistence

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/Karuppasamy-Arumugam/vandi-delivery-partner.git
cd vandi-delivery-partner

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will launch at `http://localhost:5173`.

---

## 🏗️ Production Build & Verification

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📱 Mobile Preview & Responsive Modes
On desktop screens, a top control bar allows toggling between **Full Width Mode** and **Mobile Frame Mode** (simulated smartphone bezel) for testing mobile responsiveness. On mobile devices, the app automatically adopts the full native viewport layout with edge-to-edge touch navigation.

---

## 📄 License
MIT License © 2026 Vandi Logistics Technologies Pvt. Ltd.
