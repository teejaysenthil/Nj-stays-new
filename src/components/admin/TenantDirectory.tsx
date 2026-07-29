"use client";

import { CheckCircle2, Phone, XCircle } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import type { Tenant, Unit } from "@/lib/types";

export default function TenantDirectory({
  tenants,
  units,
}: {
  tenants: Tenant[];
  units: Unit[];
}) {
  function unitNumberFor(tenant: Tenant) {
    return units.find((u) => u.id === tenant.unitId)?.unitNumber ?? "-";
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-5 pb-0">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Tenant Directory
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {tenants.length} active tenants
        </p>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
              <th className="px-5 py-2 font-medium">Tenant</th>
              <th className="px-5 py-2 font-medium">Unit</th>
              <th className="px-5 py-2 font-medium">Contact</th>
              <th className="px-5 py-2 font-medium">Emergency Contact</th>
              <th className="px-5 py-2 font-medium">Lease Ends</th>
              <th className="px-5 py-2 font-medium">ID Proof</th>
              <th className="px-5 py-2 font-medium">Lease Doc</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">
                  {tenant.name}
                </td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                  #{unitNumberFor(tenant)}
                </td>
                <td className="px-5 py-3">
                  <a
                    href={`tel:${tenant.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-orange-600 dark:text-slate-300"
                  >
                    <Phone size={12} /> {tenant.phone}
                  </a>
                </td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                  <p>{tenant.emergencyContactName}</p>
                  <p className="text-xs text-slate-400">{tenant.emergencyContactPhone}</p>
                </td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                  {new Date(tenant.leaseEnd).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-3">
                  {tenant.idProofUploaded ? (
                    <Badge tone="green">
                      <CheckCircle2 size={11} /> {tenant.idProofType}
                    </Badge>
                  ) : (
                    <Badge tone="red">
                      <XCircle size={11} /> Missing
                    </Badge>
                  )}
                </td>
                <td className="px-5 py-3">
                  {tenant.leaseAgreementUploaded ? (
                    <Badge tone="green">
                      <CheckCircle2 size={11} /> Uploaded
                    </Badge>
                  ) : (
                    <Badge tone="red">
                      <XCircle size={11} /> Missing
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
