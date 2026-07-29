"use client";

import { useState } from "react";
import { Wifi, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui";

export default function WiFiViewer() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const wifiSSID = "NJ_Stays_Premium_2.4GHz";
  const wifiPassword = "NSP@2024secure!";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Wi-Fi Access
        </h3>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <Wifi size={18} />
          <span className="text-xs font-semibold">Connected</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* SSID */}
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            Network Name (SSID)
          </label>
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">
              {wifiSSID}
            </p>
            <button
              onClick={() => handleCopy(wifiSSID, "ssid")}
              className="rounded-lg border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
              title="Copy SSID"
            >
              {copiedField === "ssid" ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="rounded-lg bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 p-4">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            Password
          </label>
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-lg font-bold text-slate-900 dark:text-white font-mono">
              {wifiPassword}
            </p>
            <button
              onClick={() => handleCopy(wifiPassword, "password")}
              className="rounded-lg border border-rose-300 bg-white p-2 text-rose-700 hover:bg-rose-50 dark:border-rose-700 dark:bg-slate-800 dark:text-rose-300 dark:hover:bg-slate-700 transition"
              title="Copy Password"
            >
              {copiedField === "password" ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
        <p className="text-xs text-blue-700 dark:text-blue-400">
          💡 <strong>Tip:</strong> These credentials are for personal use only. Do not
          share with guests or unauthorized users.
        </p>
      </div>

      {/* Connection Status */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p className="mb-3 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase">
          Connection Details
        </p>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600 dark:text-slate-400">Speed:</dt>
            <dd className="font-medium text-slate-900 dark:text-white">
              300 Mbps (Shared)
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600 dark:text-slate-400">Frequency:</dt>
            <dd className="font-medium text-slate-900 dark:text-white">2.4 GHz</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600 dark:text-slate-400">Support:</dt>
            <dd className="font-medium text-slate-900 dark:text-white">
              24/7 Available
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}
