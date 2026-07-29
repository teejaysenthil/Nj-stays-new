"use client";

import { MessageCircle, Phone, MapPin } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import type { Tenant } from "@/lib/types";

interface ProfileCardProps {
  tenant: Tenant;
  propertyName: string;
  unitNumber: string;
}

export default function ProfileCard({
  tenant,
  propertyName,
  unitNumber,
}: ProfileCardProps) {
  const whatsappLink = `https://wa.me/${tenant.phone.replace(/\D/g, "")}?text=Hi%20${tenant.name}%2C%20I%27m%20reaching%20out%20from%20NJ%20Stays%20management.`;

  return (
    <Card className="overflow-hidden">
      {/* Header Gradient */}
      <div className="h-24 w-full bg-gradient-to-r from-rose-900 via-red-800 to-amber-700" />

      {/* Content */}
      <div className="px-5 py-6 sm:p-6">
        {/* Profile Info */}
        <div className="mb-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {tenant.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Resident since{" "}
                {new Date(tenant.leaseStart).toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <Badge tone="green">
              <span className="inline-block h-2 w-2 rounded-full bg-green-600 mr-1.5" />
              Verified
            </Badge>
          </div>

          {/* Property & Unit */}
          <div className="space-y-2 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <MapPin size={16} className="text-rose-900 dark:text-amber-400" />
              <strong>{propertyName}</strong> · Unit #{unitNumber}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Lease ends: {new Date(tenant.leaseEnd).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-2 mb-6">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Contact Methods
          </p>

          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 transition"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${tenant.phone}`}
            className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
          >
            <Phone size={18} />
            <span>{tenant.phone}</span>
          </a>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500 dark:text-slate-400">Monthly Rent</p>
            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              ₹{tenant.rentAmount.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500 dark:text-slate-400">Deposit</p>
            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              ₹{tenant.depositAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
