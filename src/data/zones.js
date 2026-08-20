// Tamil Nadu operating zones and clusters
export const OPERATING_ZONES = [
  {
    id: "chennai_central",
    name: "Chennai Central (Anna Nagar, T. Nagar, Shenoy Nagar)",
    city: "Chennai",
    shortName: "Chennai Central",
    activeOrdersSurge: "1.2x Demand",
    surgeMultiplier: 1.2,
    popularHubs: ["Anna Nagar 2nd Ave", "Pondy Bazaar", "Shenoy Nagar", "Kilpauk"]
  },
  {
    id: "chennai_south",
    name: "Chennai South (Adyar, Velachery, Besant Nagar)",
    city: "Chennai",
    shortName: "Chennai South",
    activeOrdersSurge: "1.3x High Demand",
    surgeMultiplier: 1.3,
    popularHubs: ["Phoenix Marketcity", "Adyar Gandhi Nagar", "Besant Nagar Beach Rd"]
  },
  {
    id: "chennai_omr",
    name: "OMR IT Corridor (Taramani, Perungudi, Sholinganallur)",
    city: "Chennai",
    shortName: "OMR Tech Corridor",
    activeOrdersSurge: "1.4x Super Surge",
    surgeMultiplier: 1.4,
    popularHubs: ["TIDEL Park", "Navalur", "Sholinganallur Junction"]
  },
  {
    id: "chennai_west",
    name: "Chennai West & Industrial (Guindy, Porur, Koyambedu)",
    city: "Chennai",
    shortName: "Chennai West",
    activeOrdersSurge: "1.1x Normal",
    surgeMultiplier: 1.1,
    popularHubs: ["Guindy Estate", "Koyambedu Market", "DLF Cybercity"]
  },
  {
    id: "coimbatore_central",
    name: "Coimbatore Central (RS Puram, Gandhipuram, Peelamedu)",
    city: "Coimbatore",
    shortName: "Coimbatore City",
    activeOrdersSurge: "1.2x Demand",
    surgeMultiplier: 1.2,
    popularHubs: ["DB Road RS Puram", "Cross Cut Road", "Brookefields Mall"]
  },
  {
    id: "madurai_city",
    name: "Madurai City (KK Nagar, Simmakkal, Anna Nagar)",
    city: "Madurai",
    shortName: "Madurai City",
    activeOrdersSurge: "1.1x Normal",
    surgeMultiplier: 1.1,
    popularHubs: ["KK Nagar East", "Town Hall Road", "Simmakkal Ground"]
  }
];

export const PARTNER_INCENTIVES = [
  {
    id: "inc_daily_1",
    title: "Daily Target Milestone",
    target: 8,
    bonus: 180,
    unit: "deliveries",
    description: "Complete 8 deliveries today to unlock ₹180 direct bonus"
  },
  {
    id: "inc_daily_2",
    title: "Peak Hour Rush",
    target: 12,
    bonus: 300,
    unit: "deliveries",
    description: "Complete 12 deliveries today for ₹300 bonus"
  },
  {
    id: "inc_weekly_1",
    title: "Weekly Consistency Superstar",
    target: 50,
    bonus: 1200,
    unit: "weekly deliveries",
    description: "Complete 50 deliveries this week for ₹1,200 payout bonus"
  }
];
