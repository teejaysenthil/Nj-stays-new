"use client";

import { useState } from "react";
import { Badge } from "@/components/ui";
import { Sliders, X } from "lucide-react";

export interface Filters {
  budget: [number, number];
  sharing: string[];
  meals: boolean;
  amenities: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const AMENITIES = [
  { id: "ac", label: "AC" },
  { id: "wifi", label: "High-Speed Wi-Fi" },
  { id: "gym", label: "Gym" },
  { id: "housekeeping", label: "Housekeeping" },
  { id: "gaming", label: "Gaming Zone" },
  { id: "furnished", label: "Fully Furnished" },
  { id: "security", label: "24/7 Security" },
  { id: "parking", label: "Bike Parking" },
];

const SHARING_OPTIONS = ["Single", "Double", "Triple"];

export default function FilterSidebar({
  filters,
  onFilterChange,
  isOpen = true,
  onClose,
}: FilterSidebarProps) {
  const [localBudget, setLocalBudget] = useState(filters.budget);

  const handleBudgetChange = (value: string, index: 0 | 1) => {
    const newBudget: [number, number] = [...localBudget] as [number, number];
    newBudget[index] = parseInt(value) || 0;
    setLocalBudget(newBudget);
    onFilterChange({ ...filters, budget: newBudget });
  };

  const toggleSharing = (sharing: string) => {
    const newSharing = filters.sharing.includes(sharing)
      ? filters.sharing.filter((s) => s !== sharing)
      : [...filters.sharing, sharing];
    onFilterChange({ ...filters, sharing: newSharing });
  };

  const toggleAmenity = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter((a) => a !== amenityId)
      : [...filters.amenities, amenityId];
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 z-30 h-screen w-64 overflow-y-auto bg-white dark:bg-slate-900 shadow-lg md:static md:h-auto md:w-full md:bg-transparent md:shadow-none">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:mb-6 md:border-0 md:bg-transparent md:p-0">
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <Sliders size={18} /> Filters
          </div>
          <button onClick={onClose} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-4 md:p-0">
          {/* Budget Range */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Budget Range
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">
                  Min: ₹{localBudget[0].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="1000"
                  value={localBudget[0]}
                  onChange={(e) => handleBudgetChange(e.target.value, 0)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400">
                  Max: ₹{localBudget[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="10000"
                  max="50000"
                  step="1000"
                  value={localBudget[1]}
                  onChange={(e) => handleBudgetChange(e.target.value, 1)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Sharing Type */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Sharing Type
            </h3>
            <div className="space-y-2">
              {SHARING_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.sharing.includes(option)}
                    onChange={() => toggleSharing(option)}
                    className="w-4 h-4 rounded border-slate-300 text-rose-900 focus:ring-rose-900 dark:border-slate-700"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {option} Sharing
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Meals */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Meals
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.meals}
                onChange={(e) =>
                  onFilterChange({ ...filters, meals: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-300 text-rose-900 focus:ring-rose-900 dark:border-slate-700"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                Meals Included
              </span>
            </label>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
              Amenities
            </h3>
            <div className="space-y-2">
              {AMENITIES.map((amenity) => (
                <label
                  key={amenity.id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={() => toggleAmenity(amenity.id)}
                    className="w-4 h-4 rounded border-slate-300 text-rose-900 focus:ring-rose-900 dark:border-slate-700"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {amenity.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() =>
              onFilterChange({
                budget: [10000, 50000],
                sharing: [],
                meals: false,
                amenities: [],
              })
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </>
  );
}
