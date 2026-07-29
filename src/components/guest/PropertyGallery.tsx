"use client";

import { useState } from "react";
import {
  BedDouble,
  Bike,
  Building2,
  ChevronLeft,
  ChevronRight,
  Sofa,
  ShowerHead,
  Sun,
  UtensilsCrossed,
  X,
} from "lucide-react";

const GALLERY_ITEMS = [
  { label: "Living Room", icon: Sofa, gradient: "from-orange-400 to-rose-500" },
  { label: "Bedroom", icon: BedDouble, gradient: "from-indigo-400 to-violet-600" },
  { label: "Kitchen", icon: UtensilsCrossed, gradient: "from-amber-400 to-orange-600" },
  { label: "Bathroom", icon: ShowerHead, gradient: "from-sky-400 to-cyan-600" },
  { label: "Balcony View", icon: Sun, gradient: "from-yellow-400 to-amber-600" },
  { label: "Building Exterior", icon: Building2, gradient: "from-rose-400 to-pink-600" },
  { label: "Parking Area", icon: Bike, gradient: "from-emerald-400 to-teal-600" },
];

export default function PropertyGallery({
  propertyName,
  variant = "full",
}: {
  propertyName: string;
  variant?: "full" | "compact";
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = variant === "compact" ? GALLERY_ITEMS.slice(0, 4) : GALLERY_ITEMS;

  function close() {
    setActiveIndex(null);
  }

  function next(e?: React.MouseEvent) {
    e?.stopPropagation();
    setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));
  }

  function prev(e?: React.MouseEvent) {
    e?.stopPropagation();
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }

  return (
    <>
      <div
        className={`grid gap-2 ${
          variant === "compact"
            ? "grid-cols-4"
            : "grid-cols-3 sm:grid-cols-4 md:grid-cols-7"
        }`}
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => setActiveIndex(idx)}
              className={`group relative flex aspect-square flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-sm transition-transform hover:scale-[1.03]`}
            >
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              <Icon size={variant === "compact" ? 16 : 22} className="relative drop-shadow" />
              <span className="relative px-1 text-center text-[9px] font-medium leading-tight drop-shadow sm:text-xs">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <div
            className={`relative flex aspect-[4/3] w-full max-w-xl flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br ${GALLERY_ITEMS[activeIndex].gradient} text-white shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const Icon = GALLERY_ITEMS[activeIndex].icon;
              return <Icon size={64} className="drop-shadow" />;
            })()}
            <p className="text-lg font-semibold drop-shadow">
              {GALLERY_ITEMS[activeIndex].label}
            </p>
            <p className="text-sm text-white/80">{propertyName}</p>
            <p className="absolute bottom-3 text-xs text-white/70">
              {activeIndex + 1} / {GALLERY_ITEMS.length}
            </p>
          </div>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
}
