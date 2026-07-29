"use client";

import { useState } from "react";
import { CheckCircle2, KeyRound, Save, Settings as SettingsIcon } from "lucide-react";
import { useApp } from "@/lib/store";
import { Card, SectionHeading, inputClass, labelClass } from "@/components/ui";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-slate-700 dark:text-slate-200">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-700"
        }`}
        aria-pressed={checked}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

export default function AdminSettings() {
  const { settings, updateSettings, currentUser } = useApp();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [password, setPassword] = useState("");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="px-4 py-8 sm:px-6">
      <SectionHeading title="Admin Settings" subtitle="Business profile, notifications, and account" />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <SettingsIcon size={16} /> Business Profile
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className={labelClass()}>Business Name</label>
              <input
                className={inputClass()}
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass()}>Support Email</label>
              <input
                type="email"
                className={inputClass()}
                value={form.supportEmail}
                onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass()}>Support Phone</label>
              <input
                className={inputClass()}
                value={form.supportPhone}
                onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
              />
            </div>

            <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                Notification Preferences
              </p>
              <Toggle
                checked={form.notifyEmail}
                onChange={(v) => setForm({ ...form, notifyEmail: v })}
                label="Email notifications"
              />
              <Toggle
                checked={form.notifySms}
                onChange={(v) => setForm({ ...form, notifySms: v })}
                label="SMS notifications"
              />
              <Toggle
                checked={form.notifyPush}
                onChange={(v) => setForm({ ...form, notifyPush: v })}
                label="Push notifications"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
            >
              {saved ? (
                <>
                  <CheckCircle2 size={15} /> Saved
                </>
              ) : (
                <>
                  <Save size={15} /> Save Changes
                </>
              )}
            </button>
          </form>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <KeyRound size={16} /> Account
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Name</dt>
              <dd className="font-medium text-slate-900 dark:text-white">{currentUser?.name}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Email</dt>
              <dd className="font-medium text-slate-900 dark:text-white">{currentUser?.email}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Role</dt>
              <dd className="font-medium capitalize text-slate-900 dark:text-white">Owner / Admin</dd>
            </div>
          </dl>
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <label className={labelClass()}>Change Password</label>
            <input
              type="password"
              className={inputClass()}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
            <button
              type="button"
              disabled={password.length < 4}
              onClick={() => setPassword("")}
              className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Update Password
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
