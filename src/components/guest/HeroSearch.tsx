"use client";

import { useState } from "react";
import { Search, MapPin, Users, Home } from "lucide-react";
import { GradientButton } from "@/components/ui";

export interface SearchFilters {
  city: string;
  gender: string;
  occupancy: string;
}

interface HeroSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onScheduleVisit: () => void;
}

const CITIES = [
  "Koramangala",
  "Indiranagar",
  "HSR Layout",
  "BTM 1st Stage",
  "Whitefield",
];

const GENDERS = ["Gents", "Ladies", "Unisex"];
const OCCUPANCY = ["Single", "Double", "Triple Sharing"];

export default function HeroSearch({
  onSearch,
  onScheduleVisit,
}: HeroSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    city: "",
    gender: "",
    occupancy: "",
  });
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 100);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <>
      {/* Main Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-red-900 to-amber-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Find Your Perfect Co-Living Space
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-amber-50">
              Curated, furnished apartments designed for modern professionals and students
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="rounded-2xl bg-white shadow-2xl p-2 sm:p-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  {/* City Filter */}
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">
                      <MapPin size={14} className="inline mr-1" /> Location
                    </label>
                    <select
                      value={filters.city}
                      onChange={(e) =>
                        setFilters({ ...filters, city: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/20 focus:outline-none"
                    >
                      <option value="">All Cities</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gender Filter */}
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">
                      <Users size={14} className="inline mr-1" /> Gender
                    </label>
                    <select
                      value={filters.gender}
                      onChange={(e) =>
                        setFilters({ ...filters, gender: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/20 focus:outline-none"
                    >
                      <option value="">All Genders</option>
                      {GENDERS.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Occupancy Filter */}
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">
                      <Home size={14} className="inline mr-1" /> Occupancy
                    </label>
                    <select
                      value={filters.occupancy}
                      onChange={(e) =>
                        setFilters({ ...filters, occupancy: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/20 focus:outline-none"
                    >
                      <option value="">All Types</option>
                      {OCCUPANCY.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-rose-900 to-amber-700 px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
                  >
                    <Search size={16} /> Search
                  </button>
                </div>
              </div>

              {/* Hero CTA Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <GradientButton onClick={handleSearch}>
                  Explore Properties
                </GradientButton>
                <button
                  onClick={onScheduleVisit}
                  className="rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Search Bar (shows on scroll) */}
      {isSticky && (
        <div className="fixed top-24 left-0 right-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-lg dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <select
                  value={filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-rose-900 focus:outline-none"
                >
                  <option value="">All Cities</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={filters.gender}
                  onChange={(e) =>
                    setFilters({ ...filters, gender: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-rose-900 focus:outline-none"
                >
                  <option value="">All Genders</option>
                  {GENDERS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={filters.occupancy}
                  onChange={(e) =>
                    setFilters({ ...filters, occupancy: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-rose-900 focus:outline-none"
                >
                  <option value="">All Types</option>
                  {OCCUPANCY.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 rounded-lg bg-rose-900 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800"
              >
                <Search size={16} /> Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
