"use client";

import { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, MessageSquare, ChevronDown } from "lucide-react";
import { Card, Badge, SectionHeading } from "@/components/ui";

interface RentRecord {
  id: string;
  tenantName: string;
  unitNumber: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  lastReminder?: string;
}

const RENT_DATA: RentRecord[] = [
  {
    id: "1",
    tenantName: "Arjun Rao",
    unitNumber: "101",
    amount: 15500,
    dueDate: "2026-08-05",
    status: "paid",
    lastReminder: "2026-07-28",
  },
  {
    id: "2",
    tenantName: "Priya Nair",
    unitNumber: "102",
    amount: 15500,
    dueDate: "2026-08-05",
    status: "paid",
  },
  {
    id: "3",
    tenantName: "Karthik Subramanian",
    unitNumber: "103",
    amount: 16500,
    dueDate: "2026-08-05",
    status: "pending",
  },
  {
    id: "4",
    tenantName: "Sneha Reddy",
    unitNumber: "201",
    amount: 16500,
    dueDate: "2026-08-05",
    status: "pending",
  },
  {
    id: "5",
    tenantName: "Vignesh Kumar",
    unitNumber: "202",
    amount: 18000,
    dueDate: "2026-07-31",
    status: "overdue",
  },
];

export default function RentCollectionMetrics() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const paidCount = RENT_DATA.filter((r) => r.status === "paid").length;
  const pendingCount = RENT_DATA.filter((r) => r.status === "pending").length;
  const overdueCount = RENT_DATA.filter((r) => r.status === "overdue").length;
  const totalAmount = RENT_DATA.reduce((sum, r) => sum + r.amount, 0);
  const collectedAmount = RENT_DATA.filter((r) => r.status === "paid").reduce(
    (sum, r) => sum + r.amount,
    0
  );

  const metrics = [
    { label: "Total Collection", value: `₹${collectedAmount.toLocaleString("en-IN")}`, tone: "green" },
    { label: "Pending", value: `₹${RENT_DATA.filter((r) => r.status === "pending").reduce((sum, r) => sum + r.amount, 0).toLocaleString("en-IN")}`, tone: "amber" },
    { label: "Overdue", value: `₹${RENT_DATA.filter((r) => r.status === "overdue").reduce((sum, r) => sum + r.amount, 0).toLocaleString("en-IN")}`, tone: "red" },
    { label: "Collection Rate", value: `${((collectedAmount / totalAmount) * 100).toFixed(1)}%`, tone: "blue" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "green";
      case "pending":
        return "amber";
      case "overdue":
        return "red";
      default:
        return "slate";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return CheckCircle2;
      case "pending":
        return Clock;
      case "overdue":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="p-4">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {metric.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Status Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4 bg-green-50 dark:bg-green-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-green-700 dark:text-green-400">Paid</p>
              <p className="mt-1 text-2xl font-bold text-green-900 dark:text-green-300">
                {paidCount}
              </p>
            </div>
            <CheckCircle2 size={32} className="text-green-600 dark:text-green-500" />
          </div>
        </Card>

        <Card className="p-4 bg-amber-50 dark:bg-amber-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                Pending
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-900 dark:text-amber-300">
                {pendingCount}
              </p>
            </div>
            <Clock size={32} className="text-amber-600 dark:text-amber-500" />
          </div>
        </Card>

        <Card className="p-4 bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-red-700 dark:text-red-400">Overdue</p>
              <p className="mt-1 text-2xl font-bold text-red-900 dark:text-red-300">
                {overdueCount}
              </p>
            </div>
            <AlertTriangle size={32} className="text-red-600 dark:text-red-500" />
          </div>
        </Card>
      </div>

      {/* Rent Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                  Tenant
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                  Unit
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {RENT_DATA.map((record) => {
                const StatusIcon = getStatusIcon(record.status);
                return (
                  <tr
                    key={record.id}
                    className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {record.tenantName}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      #{record.unitNumber}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      ₹{record.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {new Date(record.dueDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={getStatusColor(record.status)}>
                        <StatusIcon size={12} className="mr-1" />
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === record.id ? null : record.id)
                        }
                        className="flex items-center gap-1 text-rose-900 hover:text-rose-800 dark:text-amber-400 dark:hover:text-amber-300"
                      >
                        <MessageSquare size={14} />
                        <span className="text-xs font-medium">Remind</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
