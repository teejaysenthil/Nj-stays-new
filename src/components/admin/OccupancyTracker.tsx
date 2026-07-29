"use client";

import { Card, Badge } from "@/components/ui";

export default function OccupancyTracker() {
  const occupied = 8;
  const total = 12;
  const percentOccupied = (occupied / total) * 100;

  const getOccupancyStatus = () => {
    if (percentOccupied <= 60) return { label: "Low", color: "green", bgColor: "bg-green-100 dark:bg-green-900/30" };
    if (percentOccupied <= 80) return { label: "Medium", color: "amber", bgColor: "bg-amber-100 dark:bg-amber-900/30" };
    return { label: "High", color: "red", bgColor: "bg-red-100 dark:bg-red-900/30" };
  };

  const status = getOccupancyStatus();

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Occupancy Card */}
      <Card className="p-6">
        <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
          Real-Time Occupancy
        </h3>

        <div className="mb-6 space-y-4">
          {/* Big Number */}
          <div className="text-center">
            <p className="text-5xl font-bold text-slate-900 dark:text-white">
              {occupied}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              of {total} beds occupied
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  percentOccupied <= 60
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : percentOccupied <= 80
                    ? "bg-gradient-to-r from-amber-500 to-amber-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
                }`}
                style={{ width: `${percentOccupied}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>0%</span>
              <span className="font-semibold">{Math.round(percentOccupied)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`rounded-lg p-4 ${status.bgColor}`}>
          <p className={`text-sm font-semibold ${
            status.label === "Low"
              ? "text-green-700 dark:text-green-400"
              : status.label === "Medium"
              ? "text-amber-700 dark:text-amber-400"
              : "text-red-700 dark:text-red-400"
          }`}>
            {status.label} Occupancy - {12 - occupied} beds available
          </p>
        </div>
      </Card>

      {/* Unit Breakdown */}
      <Card className="p-6">
        <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
          Unit Breakdown
        </h3>

        <div className="space-y-4">
          {/* Occupied */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Occupied Units
              </span>
              <Badge tone="green">{occupied}</Badge>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {(occupied / total * 100).toFixed(1)}% occupancy rate
            </div>
          </div>

          {/* Vacant */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Vacant Units
              </span>
              <Badge tone="blue">{total - occupied}</Badge>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Ready for immediate move-in
            </div>
          </div>

          {/* Maintenance */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Under Maintenance
              </span>
              <Badge tone="amber">1</Badge>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Expected to be ready next week
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-6 w-full rounded-lg border border-rose-900 bg-white px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-50 dark:border-amber-400 dark:bg-slate-800 dark:text-amber-400 dark:hover:bg-slate-700 transition">
          View Detailed Breakdown
        </button>
      </Card>
    </div>
  );
}
