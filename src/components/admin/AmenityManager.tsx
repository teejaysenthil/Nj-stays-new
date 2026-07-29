"use client";

import { useState } from "react";
import { Wifi, Dumbbell, UtensilsCrossed, Zap, Gamepad2, Lock, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { Card, Badge, SectionHeading } from "@/components/ui";

interface Amenity {
  id: string;
  name: string;
  icon: typeof Wifi;
  enabled: boolean;
  category: "essential" | "comfort" | "entertainment";
}

const AMENITIES: Amenity[] = [
  { id: "wifi", name: "High-Speed Wi-Fi", icon: Wifi, enabled: true, category: "essential" },
  { id: "gym", name: "Gym", icon: Dumbbell, enabled: false, category: "comfort" },
  { id: "meals", name: "3-Time Meals", icon: UtensilsCrossed, enabled: true, category: "essential" },
  { id: "laundry", name: "Laundry Service", icon: Sparkles, enabled: true, category: "comfort" },
  { id: "gaming", name: "Gaming Console", icon: Gamepad2, enabled: false, category: "entertainment" },
  { id: "biometric", name: "Biometric Entry", icon: Lock, enabled: true, category: "essential" },
  { id: "security", name: "24/7 Security", icon: ShieldCheck, enabled: true, category: "essential" },
  { id: "furnished", name: "Fully Furnished", icon: Sparkles, enabled: true, category: "essential" },
];

export default function AmenityManager() {
  const [amenities, setAmenities] = useState(AMENITIES);
  const [saving, setSaving] = useState(false);

  const handleToggle = (id: string) => {
    setAmenities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const categories = ["essential", "comfort", "entertainment"] as const;

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categoryLabel =
          category === "essential"
            ? "Essential Amenities"
            : category === "comfort"
            ? "Comfort Features"
            : "Entertainment";
        
        const categoryAmenities = amenities.filter((a) => a.category === category);

        return (
          <div key={category}>
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
              {categoryLabel}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoryAmenities.map((amenity) => {
                const Icon = amenity.icon;
                return (
                  <Card
                    key={amenity.id}
                    className={`p-4 cursor-pointer transition ${
                      amenity.enabled
                        ? "ring-2 ring-rose-900 dark:ring-amber-400"
                        : ""
                    }`}
                    onClick={() => handleToggle(amenity.id)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                        amenity.enabled
                          ? "bg-rose-900 text-white dark:bg-amber-700 dark:text-slate-950"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}>
                        <Icon size={20} />
                      </div>
                      <input
                        type="checkbox"
                        checked={amenity.enabled}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleToggle(amenity.id);
                        }}
                        className="w-4 h-4 rounded border-slate-300 text-rose-900 focus:ring-rose-900 dark:border-slate-700 dark:accent-amber-400"
                      />
                    </div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {amenity.name}
                    </p>
                    <Badge
                      tone={amenity.enabled ? "green" : "slate"}
                      className="mt-2"
                    >
                      {amenity.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Save Button */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-900 to-amber-700 px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50 transition"
        >
          {saving && <Loader2 size={18} className="animate-spin" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition">
          Cancel
        </button>
      </div>
    </div>
  );
}
