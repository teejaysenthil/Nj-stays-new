"use client";

import { useMemo, useState } from "react";
import { Building2, PlusCircle } from "lucide-react";
import { useApp } from "@/lib/store";
import { Badge, Card, SectionHeading } from "@/components/ui";
import UnitGrid from "@/components/admin/UnitGrid";
import AddPropertyModal from "@/components/admin/AddPropertyModal";
import PropertyFilter from "@/components/admin/PropertyFilter";

export default function ManageProperties() {
  const { properties, units, tenants } = useApp();
  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0].id);
  const [addOpen, setAddOpen] = useState(false);

  const property = properties.find((p) => p.id === selectedPropertyId) ?? properties[0];
  const propertyUnits = useMemo(
    () => units.filter((u) => u.propertyId === selectedPropertyId),
    [units, selectedPropertyId]
  );
  const propertyTenants = useMemo(
    () => tenants.filter((t) => t.propertyId === selectedPropertyId),
    [tenants, selectedPropertyId]
  );

  const occupied = propertyUnits.filter((u) => u.status === "occupied").length;
  const vacant = propertyUnits.length - occupied;

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <SectionHeading
          title="Manage Properties"
          subtitle="Property & unit management across the NJ Stays portfolio"
        />
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-500 hover:border-orange-400 hover:text-orange-600 dark:border-slate-700 dark:text-slate-400"
        >
          <PlusCircle size={15} /> Add Property
        </button>
      </div>

      <PropertyFilter
        value={selectedPropertyId}
        onChange={(id) => id !== "all" && setSelectedPropertyId(id)}
      />

      <Card className="mb-6 overflow-hidden">
        <div className={`h-2 w-full bg-gradient-to-r ${property.gradient}`} />
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
              <Building2 size={18} className="text-slate-600 dark:text-slate-300" />
            </span>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{property.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {property.address}, {property.city} - {property.pincode}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="green">{occupied} Occupied</Badge>
            <Badge tone="slate">{vacant} Vacant</Badge>
            <Badge tone={property.status === "live" ? "green" : "blue"}>
              {property.status === "live" ? "Live" : "Coming Soon"}
            </Badge>
          </div>
        </div>
      </Card>

      {propertyUnits.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 p-10 text-center">
          <Building2 size={28} className="text-slate-400" />
          <p className="font-medium text-slate-700 dark:text-slate-200">
            {property.name} has no units configured yet
          </p>
          <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
            This property is opening soon. Add units once construction / onboarding is complete to start managing tenants and rent here.
          </p>
        </Card>
      ) : (
        <UnitGrid units={propertyUnits} tenants={propertyTenants} />
      )}

      <AddPropertyModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
