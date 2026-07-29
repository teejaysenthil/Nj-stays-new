"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, IndianRupee, TrendingUp, Wallet } from "lucide-react";
import { Badge, Card, StatCard } from "@/components/ui";
import PaymentModal from "@/components/tenant/PaymentModal";
import { useApp } from "@/lib/store";
import type { Tenant } from "@/lib/types";

export default function FinancialTracker({ tenants }: { tenants: Tenant[] }) {
  const { setRentStatus } = useApp();
  const [payTarget, setPayTarget] = useState<Tenant | null>(null);

  const totalRevenue = useMemo(
    () => tenants.reduce((sum, t) => sum + t.rentAmount, 0),
    [tenants]
  );
  const collected = useMemo(
    () =>
      tenants
        .filter((t) => t.rentStatus === "paid")
        .reduce((sum, t) => sum + t.rentAmount, 0),
    [tenants]
  );
  const pendingTenants = tenants.filter((t) => t.rentStatus !== "paid");
  const overdueTenants = tenants.filter((t) => t.rentStatus === "overdue");
  const pendingAmount = pendingTenants.reduce((sum, t) => sum + t.rentAmount, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Monthly Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          icon={<IndianRupee size={16} />}
          tone="green"
          hint="Total rent roll"
        />
        <StatCard
          label="Collected"
          value={`₹${collected.toLocaleString("en-IN")}`}
          icon={<TrendingUp size={16} />}
          tone="blue"
          hint="This cycle"
        />
        <StatCard
          label="Pending Dues"
          value={`₹${pendingAmount.toLocaleString("en-IN")}`}
          icon={<Wallet size={16} />}
          tone="amber"
          hint={`${pendingTenants.length} tenant(s)`}
        />
        <StatCard
          label="Overdue Alerts"
          value={`${overdueTenants.length}`}
          icon={<AlertTriangle size={16} />}
          tone="red"
          hint="Needs follow-up"
        />
      </div>

      <Card className="p-5">
        <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
          Pending Dues
        </h3>
        {pendingTenants.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All rents collected for this cycle. 🎉
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {pendingTenants.map((tenant) => (
              <li
                key={tenant.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {tenant.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Due {new Date(tenant.rentDueDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}{" "}
                    · ₹{tenant.rentAmount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={tenant.rentStatus === "overdue" ? "red" : "amber"}>
                    {tenant.rentStatus === "overdue" ? "Overdue" : "Pending"}
                  </Badge>
                  {tenant.rentStatus !== "overdue" && (
                    <button
                      onClick={() => setRentStatus(tenant.id, "overdue")}
                      className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Flag Overdue
                    </button>
                  )}
                  <button
                    onClick={() => setPayTarget(tenant)}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                  >
                    Record Payment
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {payTarget && (
        <PaymentModal
          open={!!payTarget}
          onClose={() => setPayTarget(null)}
          tenantId={payTarget.id}
          amount={payTarget.rentAmount}
        />
      )}
    </div>
  );
}
