"use client";

import { CheckCircle2, DoorOpen } from "lucide-react";
import { Card } from "@/components/ui";
import type { Tenant, Unit } from "@/lib/types";

export default function UnitGrid({
  units,
  tenants,
}: {
  units: Unit[];
  tenants: Tenant[];
}) {
  const floors = Array.from(new Set(units.map((u) => u.floor))).sort(
    (a, b) => b - a
  );

  function tenantFor(unit: Unit) {
    return tenants.find((t) => t.id === unit.tenantId);
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Floor / Room Grid
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Occupied
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" /> Vacant
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {floors.map((floor) => (
          <div key={floor}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Floor {floor}
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {units
                .filter((u) => u.floor === floor)
                .map((unit) => {
                  const tenant = tenantFor(unit);
                  const occupied = unit.status === "occupied";
                  return (
                    <div
                      key={unit.id}
                      className={`rounded-xl border p-3 text-center transition ${
                        occupied
                          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                          : "border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        {occupied ? (
                          <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <DoorOpen size={14} className="text-slate-400" />
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        #{unit.unitNumber}
                      </p>
                      <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                        {occupied ? tenant?.name.split(" ")[0] : "Available"}
                      </p>
                      <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        ₹{unit.rent.toLocaleString("en-IN")}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
