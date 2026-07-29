export type Role = "guest" | "tenant" | "owner";

export type UnitStatus = "occupied" | "vacant";

export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  rating: number;
  reviewCount: number;
  unitType: string;
  totalUnits: number;
  amenities: string[];
  gradient: string;
  status: "live" | "coming_soon";
  totalFloors?: number;
  buildingType?: "co-living" | "pg";
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  floor: number;
  status: UnitStatus;
  tenantId?: string;
  rent: number;
  apartmentType?: "1BHK" | "1RK" | "Studio" | "2BHK";
  hasBalcony?: boolean;
  securityDeposit?: number;
  furnishingType?: "Fully Furnished" | "Semi-Furnished" | "Unfurnished";
}

export type DepositStatus = "paid" | "pending" | "partial";
export type RentStatus = "paid" | "pending" | "overdue";

export interface Tenant {
  id: string;
  propertyId: string;
  unitId: string;
  name: string;
  phone: string;
  email: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  depositAmount: number;
  depositStatus: DepositStatus;
  rentStatus: RentStatus;
  rentDueDate: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  idProofType: string;
  idProofUploaded: boolean;
  leaseAgreementUploaded: boolean;
  occupationType?: "Working Professional" | "Student";
  employerName?: string;
  collegeUniversity?: string;
  moveInDate?: string;
  moveOutDate?: string;
}

export type TicketCategory =
  | "Plumbing"
  | "Electrical"
  | "Wi-Fi"
  | "Housekeeping"
  | "Parking"
  | "Other";

export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Resolved";

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  unitId: string;
  tenantId: string;
  tenantName: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  hasImage: boolean;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface Notice {
  id: string;
  title: string;
  message: string;
  propertyIds: string[] | "all";
  createdAt: string;
  author: string;
}

export type PaymentMethod = "Cash" | "UPI" | "Bank Transfer";

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  month: string;
  status: "Paid" | "Pending";
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  propertyIds: string[];
  type: "callback" | "visit";
  preferredDate?: string;
  message?: string;
  createdAt: string;
  contacted: boolean;
}

export type AuthRole = "tenant" | "owner";

export interface AuthUser {
  name: string;
  email: string;
  password: string;
  role: AuthRole;
  tenantId?: string;
}

export interface AuthSession {
  name: string;
  email: string;
  role: AuthRole;
  tenantId?: string;
}

export interface BusinessSettings {
  businessName: string;
  supportEmail: string;
  supportPhone: string;
  notifyEmail: boolean;
  notifySms: boolean;
  notifyPush: boolean;
}
