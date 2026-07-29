"use client";

import { X, MapPin, Star } from "lucide-react";
import { useEffect } from "react";
import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}

const BADGE_TONES: Record<string, string> = {
  slate:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  green:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  amber:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  red: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  blue: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  purple:
    "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
};

export function Badge({
  children,
  tone = "slate",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof BADGE_TONES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${BADGE_TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  icon,
  tone = "slate",
  hint,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  tone?: keyof typeof BADGE_TONES;
  hint?: string;
}) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {hint && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {hint}
            </p>
          )}
        </div>
        {icon && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${BADGE_TONES[tone]}`}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-4">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl dark:bg-slate-900 sm:max-w-lg sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function inputClass() {
  return "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500";
}

export function labelClass() {
  return "mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-300";
}

export function GradientButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full bg-gradient-to-r from-rose-900 via-red-800 to-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function PropertyCardStanza({
  name,
  location,
  price,
  image,
  amenities,
  rating,
  reviews,
  badge,
  onScheduleVisit,
  onExplore,
}: {
  name: string;
  location: string;
  price: string;
  image?: string;
  amenities: string[];
  rating?: number;
  reviews?: number;
  badge?: string;
  onScheduleVisit: () => void;
  onExplore: () => void;
}) {
  return (
    <Card className="group overflow-hidden transition hover:shadow-lg">
      {/* Image Section */}
      <div className="relative h-40 w-full bg-gradient-to-br from-rose-900 to-amber-700">
        {image && (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        )}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {badge && <Badge tone="amber">{badge}</Badge>}
          {rating && (
            <Badge tone="green">
              <Star size={12} className="fill-current" /> {rating}
            </Badge>
          )}
        </div>
        <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold">
          1/5 photos
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
              <MapPin size={12} /> {location}
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="my-3 flex flex-wrap gap-1">
          {amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} tone="blue" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {amenities.length > 3 && (
            <Badge tone="slate" className="text-xs">
              +{amenities.length - 3} more
            </Badge>
          )}
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-rose-900 dark:text-amber-400 mb-4">
          {price}
          <span className="text-xs font-normal text-slate-600 dark:text-slate-400 ml-1">
            /month
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onScheduleVisit}
            className="flex-1 rounded-lg bg-rose-900 text-white px-3 py-2 text-xs font-semibold hover:bg-rose-800 transition"
          >
            Schedule Visit
          </button>
          <button
            onClick={onExplore}
            className="flex-1 rounded-lg border border-rose-900 text-rose-900 dark:text-amber-400 px-3 py-2 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-slate-800 transition"
          >
            Explore
          </button>
        </div>
      </div>
    </Card>
  );
}

export function StanzaBadge({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "security" | "food" | "furnished";
}) {
  const variants = {
    default: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    security: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    food: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    furnished: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
