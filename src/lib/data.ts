import type {
  Property,
  Unit,
  Tenant,
  MaintenanceTicket,
  Notice,
  Payment,
  Review,
  AuthUser,
} from "./types";

export const PROPERTIES: Property[] = [
  {
    id: "felix-64",
    slug: "felix-64",
    name: "Felix 64",
    tagline: "Premium Co-Living Apartments",
    address: "4th Cross Rd, Tavarekere, Ramappa Layout, BTM 1st Stage",
    city: "Bengaluru",
    pincode: "560029",
    phone: "+91 94839 26622",
    rating: 4.6,
    reviewCount: 38,
    unitType: "1BHK",
    totalUnits: 62,
    totalFloors: 6,
    buildingType: "co-living",
    amenities: [
      "Secure Parking",
      "24/7 Security",
      "Lift/Elevator",
      "Laundry Service",
      "Fully Furnished",
      "Power Backup",
      "Balcony",
      "Common Area",
    ],
    gradient: "from-orange-500 via-rose-500 to-pink-600",
    status: "live",
  },
  {
    id: "nj-unit-2",
    slug: "nj-stays-unit-2",
    name: "NJ Stays - Unit 2",
    tagline: "Fully Furnished 1BHK Apartments (Opening Soon)",
    address: "Near Tavarekere Main Road, BTM 1st Stage",
    city: "Bengaluru",
    pincode: "560029",
    phone: "+91 94839 26622",
    rating: 0,
    reviewCount: 0,
    unitType: "1BHK",
    totalUnits: 8,
    amenities: [
      "High-speed Wi-Fi",
      "Fully Furnished",
      "24/7 Security",
      "Power Backup",
    ],
    gradient: "from-sky-500 via-indigo-500 to-violet-600",
    status: "coming_soon",
  },
];

const tenantNames = [
  "Arjun Rao",
  "Priya Nair",
  "Karthik Subramanian",
  "Sneha Reddy",
  "Vignesh Kumar",
  "Ananya Iyer",
  "Rahul Menon",
  "Divya Bhat",
  "Suresh Pillai",
  "Meera Krishnan",
];

// Generate 62 units: ~10-11 units per floor across 6 floors
const vacantUnitNumbers = new Set(["301", "302", "502", "601"]);
const apartmentTypes: Array<"1BHK" | "1RK" | "Studio" | "2BHK"> = [
  "1BHK",
  "1RK",
  "Studio",
  "1BHK",
  "1RK",
];

export const UNITS: Unit[] = Array.from({ length: 62 }, (_, idx) => {
  const floor = Math.floor(idx / 11) + 1;
  const unitOnFloor = (idx % 11) + 1;
  const unitNumber = `${floor}0${String(unitOnFloor).padStart(2, "0")}`.replace(
    /(.)\1$/,
    "$1"
  );
  const isVacant = vacantUnitNumbers.has(unitNumber);
  const apartmentType = apartmentTypes[idx % apartmentTypes.length];
  const baseRent = apartmentType === "2BHK" ? 35000 : apartmentType === "1BHK" ? 25000 : 18000;

  return {
    id: `felix64-${unitNumber}`,
    propertyId: "felix-64",
    unitNumber,
    floor,
    status: isVacant ? "vacant" : "occupied",
    tenantId: isVacant ? undefined : `tenant-${unitNumber}`,
    rent: baseRent + (floor - 1) * 2000,
    apartmentType,
    hasBalcony: apartmentType !== "Studio",
    securityDeposit: baseRent,
    furnishingType: "Fully Furnished",
  };
});

const occupiedUnits = UNITS.filter((u) => u.status === "occupied");

const rentStatuses: Array<"paid" | "pending" | "overdue"> = [
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "pending",
  "pending",
  "overdue",
  "paid",
];

export const TENANTS: Tenant[] = occupiedUnits.map((unit, idx) => {
  const occupationType = idx % 2 === 0 ? "Working Professional" : "Student";
  return {
    id: `tenant-${unit.unitNumber}`,
    propertyId: "felix-64",
    unitId: unit.id,
    name: tenantNames[idx % tenantNames.length],
    phone: `+91 98${(40000000 + idx * 137).toString().slice(0, 6)}`,
    email: `${tenantNames[idx % tenantNames.length]
      .toLowerCase()
      .replace(/\s+/g, ".")}@example.com`,
    leaseStart: "2025-04-01",
    leaseEnd: "2026-03-31",
    rentAmount: unit.rent,
    depositAmount: unit.rent,
    depositStatus: idx === 8 ? "partial" : "paid",
    rentStatus: rentStatuses[idx],
    rentDueDate: "2026-08-05",
    emergencyContactName:
      idx % 2 === 0 ? "Ramesh (Father)" : "Lakshmi (Mother)",
    emergencyContactPhone: `+91 90${(11000000 + idx * 219).toString().slice(0, 6)}`,
    idProofType: idx % 2 === 0 ? "Aadhaar Card" : "Passport",
    idProofUploaded: true,
    leaseAgreementUploaded: idx !== 9,
    occupationType,
    employerName: occupationType === "Working Professional" ? "Tech Corp India" : undefined,
    collegeUniversity: occupationType === "Student" ? "IIT Bangalore" : undefined,
    moveInDate: "2025-04-01",
  };
});

export const CURRENT_TENANT_ID = TENANTS[0].id;

export const MAINTENANCE_TICKETS: MaintenanceTicket[] = [
  {
    id: "tkt-1001",
    propertyId: "felix-64",
    unitId: TENANTS[2].unitId,
    tenantId: TENANTS[2].id,
    tenantName: TENANTS[2].name,
    category: "Plumbing",
    priority: "High",
    description: "Kitchen sink is leaking from the pipe joint below the counter.",
    hasImage: true,
    status: "In Progress",
    createdAt: "2026-07-24T09:15:00+05:30",
    updatedAt: "2026-07-26T11:00:00+05:30",
    assignedTo: "Manjunath (Plumber)",
  },
  {
    id: "tkt-1002",
    propertyId: "felix-64",
    unitId: TENANTS[5].unitId,
    tenantId: TENANTS[5].id,
    tenantName: TENANTS[5].name,
    category: "Wi-Fi",
    priority: "Medium",
    description: "Wi-Fi router keeps disconnecting every evening after 8 PM.",
    hasImage: false,
    status: "Open",
    createdAt: "2026-07-27T19:40:00+05:30",
    updatedAt: "2026-07-27T19:40:00+05:30",
  },
  {
    id: "tkt-1003",
    propertyId: "felix-64",
    unitId: TENANTS[0].unitId,
    tenantId: TENANTS[0].id,
    tenantName: TENANTS[0].name,
    category: "Electrical",
    priority: "Low",
    description: "One tube light in the living room is flickering.",
    hasImage: false,
    status: "Resolved",
    createdAt: "2026-07-18T14:20:00+05:30",
    updatedAt: "2026-07-20T10:05:00+05:30",
    assignedTo: "Suresh (Electrician)",
  },
];

export const NOTICES: Notice[] = [
  {
    id: "notice-1",
    title: "Overhead Water Tank Cleaning - Aug 2",
    message:
      "The overhead water tank will be cleaned on Sunday, Aug 2 between 10 AM - 1 PM. Water supply will be temporarily interrupted. Please store water in advance.",
    propertyIds: "all",
    createdAt: "2026-07-27T10:00:00+05:30",
    author: "NJ Stays Management",
  },
  {
    id: "notice-2",
    title: "Wi-Fi Maintenance Window",
    message:
      "Our ISP will perform fibre maintenance on Wednesday night (12 AM - 3 AM). Expect brief Wi-Fi interruptions across all units.",
    propertyIds: ["felix-64"],
    createdAt: "2026-07-25T18:30:00+05:30",
    author: "NJ Stays Management",
  },
  {
    id: "notice-3",
    title: "Festive Housekeeping Schedule",
    message:
      "Housekeeping will visit twice this week (Tue & Fri) instead of once, ahead of the upcoming festival weekend.",
    propertyIds: "all",
    createdAt: "2026-07-22T09:00:00+05:30",
    author: "NJ Stays Management",
  },
];

export const PAYMENTS: Payment[] = TENANTS.filter(
  (t) => t.rentStatus === "paid"
).map((t, idx) => ({
  id: `pay-${t.id}`,
  tenantId: t.id,
  propertyId: t.propertyId,
  amount: t.rentAmount,
  method: idx % 3 === 0 ? "UPI" : idx % 3 === 1 ? "Cash" : "Bank Transfer",
  date: "2026-07-05",
  month: "July 2026",
  status: "Paid",
}));

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Ashwin K.",
    rating: 5,
    text: "Good flats, great location & owner. Very responsive to any issues.",
    date: "2026-05-12",
    source: "Google Reviews",
  },
  {
    id: "rev-2",
    author: "Deepika S.",
    rating: 5,
    text: "Staying for 1 year, good service. Housekeeping and security are reliable.",
    date: "2026-03-02",
    source: "Google Reviews",
  },
  {
    id: "rev-3",
    author: "Naveen T.",
    rating: 4,
    text: "Well maintained 1BHK, close to BTM main road. Wi-Fi speed is great for WFH.",
    date: "2026-01-20",
    source: "Google Reviews",
  },
  {
    id: "rev-4",
    author: "Pooja R.",
    rating: 5,
    text: "Owner is very approachable and quick to resolve maintenance requests.",
    date: "2025-11-08",
    source: "Google Reviews",
  },
];

export const DEMO_USERS: AuthUser[] = [
  {
    name: TENANTS[0].name,
    email: "arjun@example.com",
    password: "demo1234",
    role: "tenant",
    tenantId: TENANTS[0].id,
  },
  {
    name: "Nithya J.",
    email: "owner@njstays.com",
    password: "demo1234",
    role: "owner",
  },
];
