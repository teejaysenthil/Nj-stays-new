"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Users, Home } from "lucide-react";

export default function PortalSwitcher() {
  const pathname = usePathname();

  const portals = [
    {
      name: "Guest Portal",
      href: "/",
      icon: Home,
      description: "Browse & book properties",
      active: pathname === "/" || !pathname.startsWith("/tenant") && !pathname.startsWith("/admin"),
    },
    {
      name: "Tenant Portal",
      href: "/tenant",
      icon: Users,
      description: "Resident dashboard",
      active: pathname.startsWith("/tenant"),
    },
    {
      name: "Admin Portal",
      href: "/admin",
      icon: Building2,
      description: "Property management",
      active: pathname.startsWith("/admin"),
    },
  ];

  return (
    <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-1 overflow-x-auto">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.href}
                href={portal.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                  portal.active
                    ? "border-rose-900 text-rose-900 dark:border-amber-400 dark:text-amber-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <Icon size={16} />
                <span>{portal.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
