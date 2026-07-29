"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building2, Home, Moon, ShieldCheck, Sun, User } from "lucide-react";
import { useEffect } from "react";
import { useApp } from "@/lib/store";
import type { Role } from "@/lib/types";

const ROLE_TABS: { role: Role; label: string; href: string; icon: typeof Home }[] = [
  { role: "guest", label: "Guest View", href: "/", icon: Home },
  { role: "tenant", label: "Tenant Portal", href: "/tenant", icon: User },
  { role: "owner", label: "Owner Admin", href: "/admin", icon: ShieldCheck },
];

export default function Navbar() {
  const { setRole, theme, toggleTheme } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab =
    ROLE_TABS.find((tab) => tab.href !== "/" && pathname.startsWith(tab.href))?.role ??
    "guest";

  useEffect(() => {
    setRole(activeTab);
  }, [activeTab, setRole]);

  function handleRoleChange(next: Role, href: string) {
    setRole(next);
    router.push(href);
  }

  // Show portal switcher in preview/demo mode (development or when not on production domain)
  const isProduction = typeof window !== "undefined" && window.location.hostname === "localhost";
  const showPortalSwitcher = process.env.NODE_ENV === "development" || isProduction === false;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setRole("guest")}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-sm">
              <Building2 size={18} />
            </span>
            <span className="hidden text-lg font-bold tracking-tight sm:inline">
              NJ Stays
            </span>
          </Link>

          {/* Portal Switcher - Only show in preview/demo mode */}
          {showPortalSwitcher && (
            <nav className="flex flex-1 items-center justify-center">
              <div className="flex w-full max-w-sm items-center gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800/70 sm:w-auto">
                {ROLE_TABS.map(({ role: r, label, href, icon: Icon }) => {
                  const active = activeTab === r;
                  return (
                    <button
                      key={r}
                      onClick={() => handleRoleChange(r, href)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all sm:flex-none sm:px-3.5 sm:text-sm ${
                        active
                          ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
                          : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                      aria-pressed={active}
                    >
                      <Icon size={14} />
                      <span className="hidden md:inline">{label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>
    </>
  );
}
