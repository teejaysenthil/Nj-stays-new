"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/store";
import { SectionHeading } from "@/components/ui";
import MaintenanceKanban from "@/components/admin/MaintenanceKanban";
import PropertyFilter from "@/components/admin/PropertyFilter";

export default function ManageComplaints() {
  const { tickets } = useApp();
  const [filter, setFilter] = useState("all");

  const filteredTickets = useMemo(
    () => (filter === "all" ? tickets : tickets.filter((t) => t.propertyId === filter)),
    [tickets, filter]
  );

  return (
    <div className="px-4 py-8 sm:px-6">
      <SectionHeading
        title="Manage Complaints"
        subtitle="Maintenance operations hub — assign and track tenant tickets"
      />
      <PropertyFilter value={filter} onChange={setFilter} />
      <MaintenanceKanban tickets={filteredTickets} />
    </div>
  );
}
