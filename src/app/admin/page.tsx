"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Bell,
  Building2,
  Globe,
  IndianRupee,
  Users,
  Wrench,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { Badge, Card, SectionHeading, StatCard } from "@/components/ui";

export default function AdminOverview() {
  const { properties, units, tenants, tickets, inquiries } = useApp();

  const totalRevenue = tenants.reduce((sum, t) => sum + t.rentAmount, 0);
  const occupied = units.filter((u) => u.status === "occupied").length;
  const vacant = units.length - occupied;
  const openTickets = tickets.filter((t) => t.status !== "Resolved").length;
  const uncontactedInquiries = inquiries.filter((i) => !i.contacted).length;

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Owner Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage properties, rent, tenants, and maintenance across NJ Stays
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Monthly Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          icon={<IndianRupee size={16} />}
          tone="green"
        />
        <StatCard
          label="Occupancy"
          value={`${occupied}/${occupied + vacant}`}
          icon={<Users size={16} />}
          tone="blue"
          hint={`${vacant} vacant`}
        />
        <StatCard
          label="Open Complaints"
          value={`${openTickets}`}
          icon={<Wrench size={16} />}
          tone="amber"
        />
        <StatCard
          label="New Inquiries"
          value={`${uncontactedInquiries}`}
          icon={<Bell size={16} />}
          tone="red"
        />
      </div>

      <SectionHeading title="Properties" subtitle="Multi-property overview" />
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {properties.map((p) => {
          const pUnits = units.filter((u) => u.propertyId === p.id);
          const pOccupied = pUnits.filter((u) => u.status === "occupied").length;
          return (
            <Card key={p.id} className="overflow-hidden">
              <div className={`h-2 w-full bg-gradient-to-r ${p.gradient}`} />
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Building2 size={18} className="text-slate-600 dark:text-slate-300" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {p.totalUnits} units · {p.unitType}
                    </p>
                  </div>
                </div>
                {pUnits.length > 0 ? (
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {pOccupied}/{pUnits.length}
                    </p>
                    <p className="text-xs text-slate-400">occupied</p>
                  </div>
                ) : (
                  <Badge tone="blue">Coming Soon</Badge>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <SectionHeading title="Quick Links" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/properties">
          <Card className="flex items-center gap-3 p-4 hover:border-orange-400 dark:hover:border-orange-500">
            <Building2 size={18} className="text-orange-600" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Manage Properties &amp; Units
            </span>
          </Card>
        </Link>
        <Link href="/admin/complaints">
          <Card className="flex items-center gap-3 p-4 hover:border-orange-400 dark:hover:border-orange-500">
            <Wrench size={18} className="text-orange-600" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {openTickets} open complaint{openTickets === 1 ? "" : "s"}
            </span>
          </Card>
        </Link>
        <Link href="/admin/guest-portal">
          <Card className="flex items-center gap-3 p-4 hover:border-orange-400 dark:hover:border-orange-500">
            <Globe size={18} className="text-orange-600" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {uncontactedInquiries} new guest inquir{uncontactedInquiries === 1 ? "y" : "ies"}
            </span>
          </Card>
        </Link>
      </div>

      {vacant > 0 && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          {vacant} unit{vacant === 1 ? "" : "s"} currently vacant across your live properties.
        </div>
      )}
    </div>
  );
}
