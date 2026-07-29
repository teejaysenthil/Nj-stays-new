"use client";

import AuthGate from "@/components/auth/AuthGate";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate role="owner" portalName="Owner Admin">
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </AuthGate>
  );
}
