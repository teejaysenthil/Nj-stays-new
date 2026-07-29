"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  IndianRupee,
  Loader2,
  ReceiptText,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { Badge, Card, SectionHeading } from "@/components/ui";
import PaymentModal from "@/components/tenant/PaymentModal";
import TicketForm from "@/components/tenant/TicketForm";

const TICKET_STATUS_TONE = {
  Open: "amber",
  "In Progress": "blue",
  Resolved: "green",
} as const;

const TICKET_STATUS_ICON = {
  Open: AlertTriangle,
  "In Progress": Loader2,
  Resolved: CheckCircle2,
} as const;

export default function TenantPortal() {
  const { tenants, currentTenantId, tickets, notices, properties } = useApp();
  const [payOpen, setPayOpen] = useState(false);

  const tenant = tenants.find((t) => t.id === currentTenantId) ?? tenants[0];
  const property = properties.find((p) => p.id === tenant.propertyId)!;
  const unitNumber = tenant.unitId.split("-").pop();

  const myTickets = useMemo(
    () => tickets.filter((t) => t.tenantId === tenant.id),
    [tickets, tenant.id]
  );

  const myNotices = useMemo(
    () =>
      notices.filter(
        (n) => n.propertyIds === "all" || n.propertyIds.includes(tenant.propertyId)
      ),
    [notices, tenant.propertyId]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Welcome back, {tenant.name.split(" ")[0]}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Building2 size={14} /> {property.name} · Unit #{unitNumber}
          </p>
        </div>
        <Badge tone="green">
          <ShieldCheck size={12} /> Active Lease
        </Badge>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Lease Details */}
        <Card className="p-5">
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
            Current Lease Details
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Unit Number</dt>
              <dd className="font-medium text-slate-900 dark:text-white">
                #{unitNumber}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Monthly Rent</dt>
              <dd className="font-medium text-slate-900 dark:text-white">
                ₹{tenant.rentAmount.toLocaleString("en-IN")}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Security Deposit</dt>
              <dd className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-white">
                ₹{tenant.depositAmount.toLocaleString("en-IN")}
                <Badge
                  tone={
                    tenant.depositStatus === "paid"
                      ? "green"
                      : tenant.depositStatus === "partial"
                      ? "amber"
                      : "red"
                  }
                >
                  {tenant.depositStatus}
                </Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Lease End Date</dt>
              <dd className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-white">
                <CalendarDays size={13} />
                {new Date(tenant.leaseEnd).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </dd>
            </div>
          </dl>
        </Card>

        {/* Rent Payment Widget */}
        <Card className="p-5">
          <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
            Rent Payment
          </h3>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Due on</p>
              <p className="font-semibold text-slate-900 dark:text-white">
                {new Date(tenant.rentDueDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">Amount</p>
              <p className="flex items-center justify-end gap-1 font-semibold text-slate-900 dark:text-white">
                <IndianRupee size={14} />
                {tenant.rentAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Badge
              tone={
                tenant.rentStatus === "paid"
                  ? "green"
                  : tenant.rentStatus === "pending"
                  ? "amber"
                  : "red"
              }
            >
              {tenant.rentStatus === "paid" && <CheckCircle2 size={12} />}
              {tenant.rentStatus === "overdue" && <AlertTriangle size={12} />}
              {tenant.rentStatus.charAt(0).toUpperCase() + tenant.rentStatus.slice(1)}
            </Badge>
            {tenant.rentStatus !== "paid" && (
              <button
                onClick={() => setPayOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
              >
                <Wallet size={14} /> Pay Rent / Upload Receipt
              </button>
            )}
          </div>
          {tenant.rentStatus === "paid" && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <ReceiptText size={13} /> You&apos;re all caught up for this cycle.
            </p>
          )}
        </Card>
      </div>

      {/* Maintenance Desk */}
      <div className="mt-8">
        <SectionHeading
          title="Maintenance / Complaints Desk"
          subtitle="Raise a ticket and track its status"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <TicketForm />
          <Card className="p-5">
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
              My Tickets
            </h3>
            {myTickets.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No tickets raised yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {myTickets.map((ticket) => {
                  const StatusIcon = TICKET_STATUS_ICON[ticket.status];
                  return (
                    <li
                      key={ticket.id}
                      className="rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {ticket.category}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            {ticket.description}
                          </p>
                        </div>
                        <Badge tone={TICKET_STATUS_TONE[ticket.status]}>
                          <StatusIcon
                            size={11}
                            className={ticket.status === "In Progress" ? "animate-spin" : ""}
                          />
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                        <span>Priority: {ticket.priority}</span>
                        {ticket.assignedTo && <span>Assigned: {ticket.assignedTo}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>

      {/* Community Notices */}
      <div className="mt-8">
        <SectionHeading
          title="Community Notices"
          subtitle="Announcements from NJ Stays management"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {myNotices.map((notice) => (
            <Card key={notice.id} className="p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  <Bell size={14} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {notice.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {notice.message}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {notice.author}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        tenantId={tenant.id}
        amount={tenant.rentAmount}
      />
    </div>
  );
}
