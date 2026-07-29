"use client";

import {
  AlertTriangle,
  Building2,
  Download,
  IndianRupee,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { Badge, Card, SectionHeading, StatCard } from "@/components/ui";
import { downloadCsv } from "@/lib/csv";
import type { TicketCategory, TicketStatus } from "@/lib/types";

export default function Reports() {
  const { properties, units, tenants, tickets, payments } = useApp();

  const totalRevenue = tenants.reduce((sum, t) => sum + t.rentAmount, 0);
  const collected = tenants
    .filter((t) => t.rentStatus === "paid")
    .reduce((sum, t) => sum + t.rentAmount, 0);
  const pending = totalRevenue - collected;

  const ticketsByStatus = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] ?? 0) + 1;
    return acc;
  }, {} as Record<TicketStatus, number>);

  const ticketsByCategory = tickets.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  }, {} as Record<TicketCategory, number>);

  function exportOccupancy() {
    downloadCsv(
      "occupancy-report.csv",
      properties.map((p) => {
        const pUnits = units.filter((u) => u.propertyId === p.id);
        const pOccupied = pUnits.filter((u) => u.status === "occupied").length;
        return {
          Property: p.name,
          "Total Units": pUnits.length,
          Occupied: pOccupied,
          Vacant: pUnits.length - pOccupied,
          "Occupancy Rate (%)": pUnits.length
            ? Math.round((pOccupied / pUnits.length) * 100)
            : 0,
        };
      })
    );
  }

  function exportRevenue() {
    downloadCsv(
      "revenue-report.csv",
      tenants.map((t) => ({
        Tenant: t.name,
        Property: properties.find((p) => p.id === t.propertyId)?.name ?? "",
        "Monthly Rent": t.rentAmount,
        Status: t.rentStatus,
        "Due Date": t.rentDueDate,
      }))
    );
  }

  function exportMaintenance() {
    downloadCsv(
      "maintenance-report.csv",
      tickets.map((t) => ({
        Tenant: t.tenantName,
        Category: t.category,
        Priority: t.priority,
        Status: t.status,
        "Created At": t.createdAt,
      }))
    );
  }

  function exportPayments() {
    downloadCsv(
      "payment-history.csv",
      payments.map((p) => ({
        Tenant: tenants.find((t) => t.id === p.tenantId)?.name ?? "",
        Month: p.month,
        Amount: p.amount,
        Method: p.method,
        Date: p.date,
        Status: p.status,
      }))
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6">
      <SectionHeading title="Get Reports" subtitle="Occupancy, revenue, and maintenance summaries" />

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Total Units"
          value={`${units.length}`}
          icon={<Building2 size={16} />}
          tone="slate"
        />
        <StatCard
          label="Revenue Collected"
          value={`₹${collected.toLocaleString("en-IN")}`}
          icon={<TrendingUp size={16} />}
          tone="green"
        />
        <StatCard
          label="Revenue Pending"
          value={`₹${pending.toLocaleString("en-IN")}`}
          icon={<IndianRupee size={16} />}
          tone="amber"
        />
        <StatCard
          label="Open Tickets"
          value={`${(ticketsByStatus.Open ?? 0) + (ticketsByStatus["In Progress"] ?? 0)}`}
          icon={<Wrench size={16} />}
          tone="red"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Users size={16} /> Occupancy Report
            </h3>
            <button
              onClick={exportOccupancy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Download size={12} /> Export CSV
            </button>
          </div>
          <ul className="space-y-2">
            {properties.map((p) => {
              const pUnits = units.filter((u) => u.propertyId === p.id);
              const pOccupied = pUnits.filter((u) => u.status === "occupied").length;
              const rate = pUnits.length ? Math.round((pOccupied / pUnits.length) * 100) : 0;
              return (
                <li key={p.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-800 dark:text-slate-100">{p.name}</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {pOccupied}/{pUnits.length} occupied
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <IndianRupee size={16} /> Revenue Report
            </h3>
            <button
              onClick={exportRevenue}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Download size={12} /> Export CSV
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="bg-emerald-500"
                  style={{ width: `${totalRevenue ? (collected / totalRevenue) * 100 : 0}%` }}
                />
                <div
                  className="bg-amber-400"
                  style={{ width: `${totalRevenue ? (pending / totalRevenue) * 100 : 0}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Collected ₹{collected.toLocaleString("en-IN")}</span>
                <span>Pending ₹{pending.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
          <button
            onClick={exportPayments}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-medium text-slate-500 hover:border-orange-400 hover:text-orange-600 dark:border-slate-700 dark:text-slate-400"
          >
            <Download size={12} /> Export Full Payment History
          </button>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Wrench size={16} /> Maintenance Report
            </h3>
            <button
              onClick={exportMaintenance}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Download size={12} /> Export CSV
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">By Status</p>
              <div className="flex flex-wrap gap-2">
                {(["Open", "In Progress", "Resolved"] as TicketStatus[]).map((status) => (
                  <Badge key={status} tone={status === "Resolved" ? "green" : status === "Open" ? "amber" : "blue"}>
                    {status}: {ticketsByStatus[status] ?? 0}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">By Category</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(ticketsByCategory).map(([category, count]) => (
                  <Badge key={category} tone="slate">
                    {category}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {(ticketsByStatus.Open ?? 0) > 2 && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
              <AlertTriangle size={12} /> Open ticket volume is higher than usual — consider assigning more vendors.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
