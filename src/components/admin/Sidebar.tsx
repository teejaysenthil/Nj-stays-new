"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Building2,
  FileBarChart,
  Globe,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
import { useApp } from "@/lib/store";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Manage Properties", icon: Building2 },
  { href: "/admin/tenants", label: "Manage Tenants", icon: Users },
  { href: "/admin/complaints", label: "Manage Complaints", icon: Wrench },
  { href: "/admin/payments", label: "Manage Payments", icon: Wallet },
  { href: "/admin/reports", label: "Get Reports", icon: FileBarChart },
  { href: "/admin/guest-portal", label: "Manage Guest Portal", icon: Globe },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Admin Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { tickets, inquiries } = useApp();

  const openTickets = tickets.filter((t) => t.status !== "Resolved").length;
  const uncontactedInquiries = inquiries.filter((i) => !i.contacted).length;

  const badges: Record<string, number> = {
    "/admin/complaints": openTickets,
    "/admin/guest-portal": uncontactedInquiries,
  };

  const navList = (
    <nav className="space-y-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        const badge = badges[href];
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Icon size={16} />
              {label}
            </span>
            {!!badge && (
              <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800 lg:hidden">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Owner Admin Menu
        </p>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
          aria-label="Open menu"
        >
          <Menu size={16} />
        </button>
      </div>

      <aside className="hidden w-60 shrink-0 border-r border-slate-200 p-4 dark:border-slate-800 lg:block">
        {navList}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full w-64 bg-white p-4 shadow-xl dark:bg-slate-950">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Menu</p>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>
            {navList}
          </div>
        </div>
      )}
    </>
  );
}
