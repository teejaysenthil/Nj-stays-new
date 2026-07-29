"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  Role,
  Unit,
  Tenant,
  MaintenanceTicket,
  Notice,
  Payment,
  Inquiry,
  Property,
  AuthUser,
  AuthSession,
  AuthRole,
  BusinessSettings,
  TicketCategory,
  TicketPriority,
  TicketStatus,
  RentStatus,
} from "./types";
import {
  UNITS,
  TENANTS,
  MAINTENANCE_TICKETS,
  NOTICES,
  PAYMENTS,
  PROPERTIES,
  DEMO_USERS,
  CURRENT_TENANT_ID,
} from "./data";

type Theme = "light" | "dark";

interface AppData {
  properties: Property[];
  units: Unit[];
  tenants: Tenant[];
  tickets: MaintenanceTicket[];
  notices: Notice[];
  payments: Payment[];
  inquiries: Inquiry[];
  authUsers: AuthUser[];
  dismissedNotificationIds: string[];
  settings: BusinessSettings;
}

interface StoredState extends AppData {
  role: Role;
  theme: Theme;
  currentUser: AuthSession | null;
}

const STORAGE_KEY = "nj-stays-state-v2";

function seedState(): StoredState {
  return {
    role: "guest",
    theme: "light",
    currentUser: null,
    properties: PROPERTIES,
    units: UNITS,
    tenants: TENANTS,
    tickets: MAINTENANCE_TICKETS,
    notices: NOTICES,
    payments: PAYMENTS,
    inquiries: [],
    authUsers: DEMO_USERS,
    dismissedNotificationIds: [],
    settings: {
      businessName: "NJ Stays",
      supportEmail: "hello@njstays.com",
      supportPhone: "+91 94839 26622",
      notifyEmail: true,
      notifySms: true,
      notifyPush: false,
    },
  };
}

interface AppContextValue extends StoredState {
  currentTenantId: string;
  setRole: (role: Role) => void;
  toggleTheme: () => void;
  submitTicket: (input: {
    category: TicketCategory;
    priority: TicketPriority;
    description: string;
    hasImage: boolean;
  }) => void;
  updateTicketStatus: (
    id: string,
    status: TicketStatus,
    assignedTo?: string
  ) => void;
  addNotice: (input: {
    title: string;
    message: string;
    propertyIds: string[] | "all";
  }) => void;
  recordPayment: (input: {
    tenantId: string;
    amount: number;
    method: Payment["method"];
  }) => void;
  setRentStatus: (tenantId: string, status: RentStatus) => void;
  submitInquiry: (input: {
    name: string;
    phone: string;
    propertyIds: string[];
    type: "callback" | "visit";
    preferredDate?: string;
    message?: string;
  }) => void;
  markInquiryContacted: (id: string) => void;
  updatePropertyStatus: (id: string, status: Property["status"]) => void;
  addProperty: (input: {
    name: string;
    tagline: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    unitType: string;
    totalUnits: number;
    amenities: string[];
    gradient: string;
  }) => void;
  addTenant: (input: {
    propertyId: string;
    name: string;
    phone: string;
    email: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  }) => { ok: boolean; error?: string };
  updateSettings: (patch: Partial<BusinessSettings>) => void;
  dismissNotification: (id: string) => void;
  signUp: (input: {
    name: string;
    email: string;
    password: string;
    role: AuthRole;
  }) => { ok: boolean; error?: string };
  logIn: (input: {
    email: string;
    password: string;
    role: AuthRole;
  }) => { ok: boolean; error?: string };
  logOut: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredState>(seedState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredState;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
        setState(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [state.theme]);

  const setRole = useCallback((role: Role) => {
    setState((s) => ({ ...s, role }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  }, []);

  const submitTicket = useCallback(
    (input: {
      category: TicketCategory;
      priority: TicketPriority;
      description: string;
      hasImage: boolean;
    }) => {
      setState((s) => {
        const tenant = s.tenants.find((t) => t.id === CURRENT_TENANT_ID);
        if (!tenant) return s;
        const now = new Date().toISOString();
        const ticket: MaintenanceTicket = {
          id: `tkt-${Math.floor(1000 + s.tickets.length * 7 + Date.now() % 1000)}`,
          propertyId: tenant.propertyId,
          unitId: tenant.unitId,
          tenantId: tenant.id,
          tenantName: tenant.name,
          category: input.category,
          priority: input.priority,
          description: input.description,
          hasImage: input.hasImage,
          status: "Open",
          createdAt: now,
          updatedAt: now,
        };
        fetch("/api/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticket),
        }).catch(() => {});
        return { ...s, tickets: [ticket, ...s.tickets] };
      });
    },
    []
  );

  const updateTicketStatus = useCallback(
    (id: string, status: TicketStatus, assignedTo?: string) => {
      setState((s) => ({
        ...s,
        tickets: s.tickets.map((t) =>
          t.id === id
            ? {
                ...t,
                status,
                assignedTo: assignedTo ?? t.assignedTo,
                updatedAt: new Date().toISOString(),
              }
            : t
        ),
      }));
    },
    []
  );

  const addNotice = useCallback(
    (input: { title: string; message: string; propertyIds: string[] | "all" }) => {
      fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }).catch(() => {});
      setState((s) => ({
        ...s,
        notices: [
          {
            id: `notice-${Date.now()}`,
            title: input.title,
            message: input.message,
            propertyIds: input.propertyIds,
            createdAt: new Date().toISOString(),
            author: "NJ Stays Management",
          },
          ...s.notices,
        ],
      }));
    },
    []
  );

  const recordPayment = useCallback(
    (input: { tenantId: string; amount: number; method: Payment["method"] }) => {
      setState((s) => {
        const tenant = s.tenants.find((t) => t.id === input.tenantId);
        if (!tenant) return s;
        const payment: Payment = {
          id: `pay-${Date.now()}`,
          tenantId: input.tenantId,
          propertyId: tenant.propertyId,
          amount: input.amount,
          method: input.method,
          date: new Date().toISOString().slice(0, 10),
          month: new Date().toLocaleString("en-IN", {
            month: "long",
            year: "numeric",
          }),
          status: "Paid",
        };
        fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payment),
        }).catch(() => {});
        return {
          ...s,
          payments: [payment, ...s.payments],
          tenants: s.tenants.map((t) =>
            t.id === input.tenantId ? { ...t, rentStatus: "paid" } : t
          ),
        };
      });
    },
    []
  );

  const setRentStatus = useCallback((tenantId: string, status: RentStatus) => {
    setState((s) => ({
      ...s,
      tenants: s.tenants.map((t) =>
        t.id === tenantId ? { ...t, rentStatus: status } : t
      ),
    }));
  }, []);

  const submitInquiry = useCallback(
    (input: {
      name: string;
      phone: string;
      propertyIds: string[];
      type: "callback" | "visit";
      preferredDate?: string;
      message?: string;
    }) => {
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }).catch(() => {});
      setState((s) => ({
        ...s,
        inquiries: [
          {
            id: `inq-${Date.now()}`,
            createdAt: new Date().toISOString(),
            contacted: false,
            ...input,
          },
          ...s.inquiries,
        ],
      }));
    },
    []
  );

  const markInquiryContacted = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      inquiries: s.inquiries.map((i) =>
        i.id === id ? { ...i, contacted: true } : i
      ),
    }));
  }, []);

  const updatePropertyStatus = useCallback(
    (id: string, status: Property["status"]) => {
      setState((s) => ({
        ...s,
        properties: s.properties.map((p) =>
          p.id === id ? { ...p, status } : p
        ),
      }));
    },
    []
  );

  const addProperty = useCallback(
    (input: {
      name: string;
      tagline: string;
      address: string;
      city: string;
      pincode: string;
      phone: string;
      unitType: string;
      totalUnits: number;
      amenities: string[];
      gradient: string;
    }) => {
      setState((s) => ({
        ...s,
        properties: [
          ...s.properties,
          {
            id: `prop-${Date.now()}`,
            slug: input.name.toLowerCase().replace(/\s+/g, "-"),
            rating: 0,
            reviewCount: 0,
            status: "coming_soon",
            ...input,
          },
        ],
      }));
    },
    []
  );

  const addTenant = useCallback(
    (input: {
      propertyId: string;
      name: string;
      phone: string;
      email: string;
      emergencyContactName: string;
      emergencyContactPhone: string;
    }) => {
      let result: { ok: boolean; error?: string } = { ok: true };
      setState((s) => {
        const vacantUnit = s.units.find(
          (u) => u.propertyId === input.propertyId && u.status === "vacant"
        );
        if (!vacantUnit) {
          result = { ok: false, error: "No vacant units available in this property." };
          return s;
        }
        const today = new Date().toISOString().slice(0, 10);
        const tenant: Tenant = {
          id: `tenant-${Date.now()}`,
          propertyId: input.propertyId,
          unitId: vacantUnit.id,
          name: input.name,
          phone: input.phone,
          email: input.email,
          leaseStart: today,
          leaseEnd: today,
          rentAmount: vacantUnit.rent,
          depositAmount: vacantUnit.rent * 2,
          depositStatus: "pending",
          rentStatus: "pending",
          rentDueDate: today,
          emergencyContactName: input.emergencyContactName,
          emergencyContactPhone: input.emergencyContactPhone,
          idProofType: "Aadhaar Card",
          idProofUploaded: false,
          leaseAgreementUploaded: false,
        };
        return {
          ...s,
          tenants: [...s.tenants, tenant],
          units: s.units.map((u) =>
            u.id === vacantUnit.id ? { ...u, status: "occupied", tenantId: tenant.id } : u
          ),
        };
      });
      return result;
    },
    []
  );

  const updateSettings = useCallback((patch: Partial<BusinessSettings>) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      dismissedNotificationIds: [...s.dismissedNotificationIds, id],
    }));
  }, []);

  const signUp = useCallback(
    (input: { name: string; email: string; password: string; role: AuthRole }) => {
      const email = input.email.trim().toLowerCase();
      let result: { ok: boolean; error?: string } = { ok: true };
      setState((s) => {
        if (s.authUsers.some((u) => u.email.toLowerCase() === email)) {
          result = { ok: false, error: "An account with this email already exists." };
          return s;
        }
        const newUser: AuthUser = {
          name: input.name,
          email,
          password: input.password,
          role: input.role,
          tenantId: input.role === "tenant" ? CURRENT_TENANT_ID : undefined,
        };
        return {
          ...s,
          authUsers: [...s.authUsers, newUser],
          currentUser: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            tenantId: newUser.tenantId,
          },
        };
      });
      return result;
    },
    []
  );

  const logIn = useCallback(
    (input: { email: string; password: string; role: AuthRole }) => {
      const email = input.email.trim().toLowerCase();
      let result: { ok: boolean; error?: string } = { ok: true };
      setState((s) => {
        const user = s.authUsers.find(
          (u) => u.email.toLowerCase() === email && u.role === input.role
        );
        if (!user) {
          result = { ok: false, error: "No account found with this email for this portal." };
          return s;
        }
        if (user.password !== input.password) {
          result = { ok: false, error: "Incorrect password." };
          return s;
        }
        return {
          ...s,
          currentUser: {
            name: user.name,
            email: user.email,
            role: user.role,
            tenantId: user.tenantId,
          },
        };
      });
      return result;
    },
    []
  );

  const logOut = useCallback(() => {
    setState((s) => ({ ...s, currentUser: null }));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      currentTenantId: state.currentUser?.tenantId ?? CURRENT_TENANT_ID,
      setRole,
      toggleTheme,
      submitTicket,
      updateTicketStatus,
      addNotice,
      recordPayment,
      setRentStatus,
      submitInquiry,
      markInquiryContacted,
      updatePropertyStatus,
      addProperty,
      addTenant,
      updateSettings,
      dismissNotification,
      signUp,
      logIn,
      logOut,
    }),
    [
      state,
      setRole,
      toggleTheme,
      submitTicket,
      updateTicketStatus,
      addNotice,
      recordPayment,
      setRentStatus,
      submitInquiry,
      markInquiryContacted,
      updatePropertyStatus,
      addProperty,
      addTenant,
      updateSettings,
      dismissNotification,
      signUp,
      logIn,
      logOut,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
