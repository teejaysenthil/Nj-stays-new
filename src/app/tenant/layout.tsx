"use client";

import AuthGate from "@/components/auth/AuthGate";

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return <AuthGate role="tenant" portalName="Tenant Portal">{children}</AuthGate>;
}
