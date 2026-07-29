"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/store";
import { Badge, Card, SectionHeading } from "@/components/ui";
import FinancialTracker from "@/components/admin/FinancialTracker";
import PropertyFilter from "@/components/admin/PropertyFilter";

export default function ManagePayments() {
  const { tenants, payments } = useApp();
  const [filter, setFilter] = useState("all");

  const filteredTenants = useMemo(
    () => (filter === "all" ? tenants : tenants.filter((t) => t.propertyId === filter)),
    [tenants, filter]
  );
  const filteredPayments = useMemo(
    () => (filter === "all" ? payments : payments.filter((p) => p.propertyId === filter)),
    [payments, filter]
  );

  function tenantName(tenantId: string) {
    return tenants.find((t) => t.id === tenantId)?.name ?? "—";
  }

  return (
    <div className="px-4 py-8 sm:px-6">
      <SectionHeading
        title="Manage Payments"
        subtitle="Rent & financial tracker across the portfolio"
      />
      <PropertyFilter value={filter} onChange={setFilter} />

      <FinancialTracker tenants={filteredTenants} />

      <div className="mt-8">
        <SectionHeading title="Payment History" />
        <Card className="overflow-hidden">
          {filteredPayments.length === 0 ? (
            <p className="p-5 text-sm text-slate-500 dark:text-slate-400">
              No payments recorded yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
                    <th className="px-5 py-2 font-medium">Tenant</th>
                    <th className="px-5 py-2 font-medium">Month</th>
                    <th className="px-5 py-2 font-medium">Amount</th>
                    <th className="px-5 py-2 font-medium">Method</th>
                    <th className="px-5 py-2 font-medium">Date</th>
                    <th className="px-5 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">
                        {tenantName(payment.tenantId)}
                      </td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{payment.month}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                        ₹{payment.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{payment.method}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{payment.date}</td>
                      <td className="px-5 py-3">
                        <Badge tone="green">{payment.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
