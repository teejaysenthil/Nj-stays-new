"use client";

import {
  Building2,
  CalendarClock,
  CheckCircle2,
  Globe,
  Phone,
  PhoneCall,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { Badge, Card, SectionHeading } from "@/components/ui";

export default function ManageGuestPortal() {
  const { properties, inquiries, updatePropertyStatus, markInquiryContacted } = useApp();

  return (
    <div className="px-4 py-8 sm:px-6">
      <SectionHeading
        title="Manage Guest Portal"
        subtitle="Control what guests see on njstays.com and follow up on leads"
      />

      <Card className="mb-8 p-5">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <Globe size={16} /> Public Listing Status
        </h3>
        <ul className="space-y-3">
          {properties.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Building2 size={16} className="text-slate-600 dark:text-slate-300" />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{p.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {p.address}, {p.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={p.status === "live" ? "green" : "blue"}>
                  {p.status === "live" ? "Live on Guest Site" : "Coming Soon"}
                </Badge>
                <button
                  onClick={() =>
                    updatePropertyStatus(p.id, p.status === "live" ? "coming_soon" : "live")
                  }
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {p.status === "live" ? "Mark Coming Soon" : "Publish Live"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <SectionHeading
        title="Guest Inquiries"
        subtitle="Visit requests & callback requests from the public site"
      />
      <Card className="overflow-hidden">
        {inquiries.length === 0 ? (
          <p className="p-5 text-sm text-slate-500 dark:text-slate-400">
            No inquiries submitted yet. Try the &ldquo;Schedule a Visit&rdquo; form on the guest site.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {inquiries.map((inquiry) => (
              <li key={inquiry.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{inquiry.name}</p>
                    <Badge tone={inquiry.type === "visit" ? "blue" : "purple"}>
                      {inquiry.type === "visit" ? (
                        <>
                          <CalendarClock size={11} /> Visit
                        </>
                      ) : (
                        <>
                          <PhoneCall size={11} /> Callback
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Phone size={11} /> {inquiry.phone}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Interested in:{" "}
                    {inquiry.propertyIds
                      .map((id) => properties.find((p) => p.id === id)?.name ?? id)
                      .join(", ")}
                    {inquiry.preferredDate && ` · Preferred: ${inquiry.preferredDate}`}
                  </p>
                  {inquiry.message && (
                    <p className="mt-1 text-xs text-slate-400">&ldquo;{inquiry.message}&rdquo;</p>
                  )}
                </div>
                {inquiry.contacted ? (
                  <Badge tone="green">
                    <CheckCircle2 size={11} /> Contacted
                  </Badge>
                ) : (
                  <button
                    onClick={() => markInquiryContacted(inquiry.id)}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                  >
                    Mark Contacted
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
