"use client";

import { useState } from "react";
import {
  Building2,
  KeyRound,
  LogOut,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { Card, inputClass, labelClass } from "@/components/ui";
import type { AuthRole } from "@/lib/types";

const DEMO_CREDENTIALS: Record<AuthRole, { email: string; password: string }> = {
  tenant: { email: "arjun@example.com", password: "demo1234" },
  owner: { email: "owner@njstays.com", password: "demo1234" },
};

function AuthForm({ role, portalName }: { role: AuthRole; portalName: string }) {
  const { signUp, logIn } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result =
      mode === "login"
        ? logIn({ email, password, role })
        : signUp({ name, email, password, role });
    if (!result.ok) setError(result.error ?? "Something went wrong.");
  }

  function fillDemo() {
    const demo = DEMO_CREDENTIALS[role];
    setMode("login");
    setEmail(demo.email);
    setPassword(demo.password);
    setError("");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 text-white shadow-md">
          {role === "tenant" ? <User size={22} /> : <ShieldCheck size={22} />}
        </span>
        <h1 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
          {portalName}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Sign in with your email to continue
        </p>
      </div>

      <Card className="p-5 sm:p-6">
        <div className="mb-4 flex gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition ${
              mode === "login"
                ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition ${
              mode === "signup"
                ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className={labelClass()}>Full Name</label>
              <input
                className={inputClass()}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}
          <div>
            <label className={labelClass()}>Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                className={`${inputClass()} pl-8`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className={labelClass()}>Password</label>
            <div className="relative">
              <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                className={`${inputClass()} pl-8`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={4}
                required
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={fillDemo}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-medium text-slate-500 hover:border-orange-400 hover:text-orange-600 dark:border-slate-700 dark:text-slate-400"
        >
          <Sparkles size={13} /> Use demo {role} account
        </button>
        {mode === "signup" && role === "tenant" && (
          <p className="mt-3 text-center text-xs text-slate-400">
            Demo note: new sign-ups are linked to the sample tenant profile
            (Unit #101) so you can explore the portal immediately.
          </p>
        )}
      </Card>
    </div>
  );
}

export default function AuthGate({
  role,
  portalName,
  children,
}: {
  role: AuthRole;
  portalName: string;
  children: React.ReactNode;
}) {
  const { currentUser, logOut } = useApp();

  if (!currentUser || currentUser.role !== role) {
    return <AuthForm role={role} portalName={portalName} />;
  }

  return (
    <div>
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 text-sm sm:px-6">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Building2 size={13} /> Signed in as{" "}
            <span className="font-medium text-slate-700 dark:text-slate-200">
              {currentUser.name}
            </span>{" "}
            ({currentUser.email})
          </span>
          <button
            onClick={logOut}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
