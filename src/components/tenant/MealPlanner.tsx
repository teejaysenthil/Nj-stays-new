"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";
import { Card } from "@/components/ui";

interface Meal {
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

const MOCK_MEALS: Meal[] = [
  {
    date: "2026-08-01",
    breakfast: "Idli & Sambar",
    lunch: "Chicken Biryani & Raita",
    dinner: "Roti & Dal Makhani",
  },
  {
    date: "2026-08-02",
    breakfast: "Dosa & Chutney",
    lunch: "Paneer Tikka Masala & Rice",
    dinner: "Chapati & Aloo Curry",
  },
  {
    date: "2026-08-03",
    breakfast: "Poha & Jalebi",
    lunch: "Mutton Curry & Paratha",
    dinner: "Roti & Spinach Gravy",
  },
  {
    date: "2026-08-04",
    breakfast: "Upma & Tea",
    lunch: "Fish Fry & Rice",
    dinner: "Chapati & Bhindi Fry",
  },
  {
    date: "2026-08-05",
    breakfast: "Puri & Aloo",
    lunch: "Veg Fried Rice & Manchurian",
    dinner: "Roti & Baingan Bharta",
  },
];

export default function MealPlanner() {
  const [selectedDate, setSelectedDate] = useState("2026-08-03");
  const [currentWeek, setCurrentWeek] = useState(0);

  const selectedMeal = MOCK_MEALS.find((m) => m.date === selectedDate);

  const weekStart = new Date(2026, 7, 1 + currentWeek * 7);
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const handlePrevWeek = () => {
    if (currentWeek > 0) setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
        Monthly Meal Plan
      </h3>

      {/* Week Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handlePrevWeek}
          disabled={currentWeek === 0}
          className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronLeft size={16} /> Prev
        </button>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {weekStart.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })}{" "}
          -{" "}
          {new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString(
            "en-IN",
            { month: "short", day: "numeric" }
          )}
        </p>
        <button
          onClick={handleNextWeek}
          className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* Day Selection */}
      <div className="mb-6 grid grid-cols-7 gap-2">
        {weekDays.map((date) => {
          const day = new Date(date);
          const dayName = day.toLocaleDateString("en-IN", { weekday: "short" });
          const dayNum = day.getDate();
          const isSelected = date === selectedDate;
          const hasMeal = MOCK_MEALS.some((m) => m.date === date);

          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              disabled={!hasMeal}
              className={`flex flex-col items-center justify-center rounded-lg p-2.5 text-xs font-medium transition ${
                isSelected
                  ? "bg-gradient-to-br from-rose-900 to-amber-700 text-white"
                  : hasMeal
                  ? "border-2 border-slate-200 text-slate-700 hover:border-rose-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-400"
                  : "border-2 border-slate-200 text-slate-400 cursor-not-allowed dark:border-slate-700 dark:text-slate-600"
              }`}
            >
              <span className="font-semibold">{dayName}</span>
              <span className="text-xs opacity-75">{dayNum}</span>
            </button>
          );
        })}
      </div>

      {/* Meal Details */}
      {selectedMeal ? (
        <div className="space-y-3 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900 dark:text-white">
              {new Date(selectedDate).toLocaleDateString("en-IN", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h4>
            <UtensilsCrossed size={18} className="text-rose-900 dark:text-amber-400" />
          </div>

          <div className="space-y-3">
            {/* Breakfast */}
            <div className="border-l-4 border-rose-900 pl-3">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                BREAKFAST
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                {selectedMeal.breakfast}
              </p>
            </div>

            {/* Lunch */}
            <div className="border-l-4 border-amber-700 pl-3">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                LUNCH
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                {selectedMeal.lunch}
              </p>
            </div>

            {/* Dinner */}
            <div className="border-l-4 border-rose-800 pl-3">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                DINNER
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">
                {selectedMeal.dinner}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-slate-50 p-4 text-center dark:bg-slate-800/50">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            No meal plan available for this date.
          </p>
        </div>
      )}
    </Card>
  );
}
