"use client";

import { useMemo, useState } from "react";
import { UserPlus } from "lucide-react";
import { useApp } from "@/lib/store";
import { SectionHeading } from "@/components/ui";
import TenantDirectory from "@/components/admin/TenantDirectory";
import NoticePublisher from "@/components/admin/NoticePublisher";
import AddTenantModal from "@/components/admin/AddTenantModal";
import PropertyFilter from "@/components/admin/PropertyFilter";

export default function ManageTenants() {
  const { tenants, units, properties } = useApp();
  const [filter, setFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);

  const filteredTenants = useMemo(
    () => (filter === "all" ? tenants : tenants.filter((t) => t.propertyId === filter)),
    [tenants, filter]
  );
  const filteredUnits = useMemo(
    () => (filter === "all" ? units : units.filter((u) => u.propertyId === filter)),
    [units, filter]
  );

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <SectionHeading title="Manage Tenants" subtitle="Directory, contacts, and lease documents" />
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
        >
          <UserPlus size={15} /> Add Tenant
        </button>
      </div>

      <PropertyFilter value={filter} onChange={setFilter} />

      <div className="mb-8">
        <TenantDirectory tenants={filteredTenants} units={filteredUnits} />
      </div>

      <SectionHeading
        title="Community Notice Board"
        subtitle="Broadcast announcements to tenants"
      />
      <NoticePublisher />

      <AddTenantModal
        key={filter}
        open={addOpen}
        onClose={() => setAddOpen(false)}
        propertyId={filter === "all" ? properties[0].id : filter}
      />
    </div>
  );
}
