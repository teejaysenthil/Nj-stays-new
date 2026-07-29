"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  IndianRupee,
  Wallet,
} from "lucide-react";
import { Card, Badge } from "@/components/ui";
import type { Tenant } from "@/lib/types";

interface PaymentStatusProps {
  tenant: Tenant;
  onPayClick: () => void;
}

export default function PaymentStatus({
  tenant,
  onPayClick,
}: PaymentStatusProps) {
  const daysUntilDue = Math.ceil(
    (new Date(tenant.rentDueDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const getStatusColor = () => {
    if (tenant.rentStatus === "paid") return "green";
    if (tenant.rentStatus === "pending") {
      return daysUntilDue > 3 ? "amber" : "red";
    }
    return "red";
  };

  const getStatusIcon = () => {
    if (tenant.rentStatus === "paid") return CheckCircle2;
    if (tenant.rentStatus === "pending") return Clock;
    return AlertTriangle;
  };

  const StatusIcon = getStatusIcon();

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Rent Payment Status
        </h3>
        <Badge tone={getStatusColor()}>
          <StatusIcon size={14} className="mr-1" />
          {tenant.rentStatus === "paid"
            ? "Paid"
            : tenant.rentStatus === "pending"
            ? "Pending"
            : "Overdue"}
        </Badge>
      </div>

      {/* Payment Info */}
      <div className="space-y-4 mb-6">
        {/* Amount */}
        <div className="rounded-lg bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Amount Due
            </span>
            <span className="text-2xl font-bold text-rose-900 dark:text-amber-400 flex items-center">
              <IndianRupee size={20} />
              {tenant.rentAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Monthly rent for{" "}
            {new Date(tenant.rentDueDate).toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Due Date */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Due Date</p>
            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {new Date(tenant.rentDueDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="text-right">
            {daysUntilDue > 0 ? (
              <p className={`text-sm font-semibold ${
                daysUntilDue > 3
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-red-600 dark:text-red-400"
              }`}>
                {daysUntilDue} days left
              </p>
            ) : (
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                {Math.abs(daysUntilDue)} days overdue
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {tenant.rentStatus === "paid" && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
          <p className="text-sm text-green-700 dark:text-green-400">
            ✓ Your rent payment has been received. Thank you!
          </p>
        </div>
      )}

      {tenant.rentStatus === "overdue" && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            ⚠ Your payment is overdue. Please pay immediately to avoid penalties.
          </p>
        </div>
      )}

      {tenant.rentStatus === "pending" && daysUntilDue < 3 && (
        <div className="mb-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Reminder: Your payment is due soon. Please pay before the deadline.
          </p>
        </div>
      )}

      {/* Payment Button */}
      {tenant.rentStatus !== "paid" && (
        <button
          onClick={onPayClick}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-900 to-amber-700 px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
        >
          <Wallet size={18} />
          Pay Rent / Upload Receipt
        </button>
      )}
    </Card>
  );
}
