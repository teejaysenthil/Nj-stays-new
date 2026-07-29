import type { Inquiry, MaintenanceTicket, Notice, Payment } from "./types";

interface ServerStore {
  inquiries: Inquiry[];
  tickets: MaintenanceTicket[];
  notices: Notice[];
  payments: Payment[];
}

const globalForStore = globalThis as unknown as { __njStaysStore?: ServerStore };

export const serverStore: ServerStore =
  globalForStore.__njStaysStore ??
  (globalForStore.__njStaysStore = {
    inquiries: [],
    tickets: [],
    notices: [],
    payments: [],
  });
