"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building2, Home, Moon, ShieldCheck, Sun, User } from "lucide-react";
import { useEffect } from "react";
import { useApp } from "@/lib/store";
import type { Role } from "@/lib/types";

const ROLE_TABS: { role: Role; label: string; href: string; icon: typeof Home }[] = [
  { role: "guest",  label: "Guest View",    href: "/",       icon: Home },
  { role: "tenant", label: "Tenant Portal", href: "/tenant", icon: User },
  { role: "owner",  label: "Owner Admin",   href: "/admin",  icon: ShieldCheck },
];

// The portal switcher is a demo convenience. On a real production hostname it
// should be hidden — tenants/admins access their portals via dedicated login links.
function useShowPortalSwitcher() {
  // Always show during SSR / hydration so the layout doesn't shift.
  // After hydration, hide on any real production-style hostname that is NOT
  // localhost and NOT a Vercel preview URL (*.vercel.app / v0.dev).
  if (typeof window === "undefined") return true;
  const host = window.location.hostname;
  const isPreview =
    host === "localhost" ||
    host.endsWith(".vercel.app") ||
    host.endsWith(".v0.dev") ||
    host === "127.0.0.1";
  return isPreview;
}

export default function Navbar() {
  const { setRole, theme, toggleTheme } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const showPortalSwitcher = useShowPortalSwitcher();

  const activeTab =
    ROLE_TABS.find((tab) => tab.href !== "/" && pathname.startsWith(tab.href))
      ?.role ?? "guest";

  useEffect(() => {
    setRole(activeTab);
  }, [activeTab, setRole]);

  function handleRoleChange(next: Role, href: string) {
    setRole(next);
    router.push(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setRole("guest")}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-sm">
            <Building2 size={18} />
          </span>
          <span className="hidden text-lg font-bold tracking-tight sm:inline">
            NJ Stays
          </span>
        </Link>

        {/* Portal Switcher — preview / demo only */}
        {showPortalSwitcher && (
          <nav aria-label="Portal switcher" className="flex flex-1 items-center justify-center">
            <div className="flex w-full max-w-xs items-center gap-0.5 rounded-full bg-slate-100 p-1 dark:bg-slate-800/70 sm:w-auto">
              {ROLE_TABS.map(({ role: r, label, href, icon: Icon }) => {
                const active = activeTab === r;
                return (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r, href)}
                    className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition-all sm:flex-none sm:px-3 sm:text-sm ${
                      active
                        ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                    aria-pressed={active}
                  >
                    <Icon size={13} className="shrink-0" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
