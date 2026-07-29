"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Bike,
  Building2,
  CalendarClock,
  CheckSquare,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Square,
  Star,
  Wifi,
  Zap,
} from "lucide-react";
import { REVIEWS } from "@/lib/data";
import { useApp } from "@/lib/store";
import { Badge, Card, SectionHeading } from "@/components/ui";
import InquiryModal from "@/components/guest/InquiryModal";
import PropertyGallery from "@/components/guest/PropertyGallery";

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  "High-speed Wi-Fi": Wifi,
  "Fully Furnished": Sparkles,
  "24/7 Security": ShieldCheck,
  "Power Backup": Zap,
  Housekeeping: BadgeCheck,
  "Two-Wheeler Parking": Bike,
};

export default function GuestLanding() {
  const { properties } = useApp();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"visit" | "callback">("visit");
  const [modalPropertyIds, setModalPropertyIds] = useState<string[]>(["felix-64"]);
  const [modalKey, setModalKey] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const felix64 = properties.find((p) => p.id === "felix-64")!;

  const q = query.trim().toLowerCase();
  const filteredProperties = !q
    ? properties
    : properties.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );

  function openModal(type: "visit" | "callback", propertyIds = ["felix-64"]) {
    setModalType(type);
    setModalPropertyIds(propertyIds);
    setModalKey((k) => k + 1);
    setModalOpen(true);
  }

  function toggleSelected(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function scrollToProperties() {
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="amber" className="mb-4">
              <Sparkles size={12} /> Trusted by 100+ happy residents
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Premium Fully Furnished Stays in Bengaluru
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
              Move-in ready 1BHK apartments across the NJ Stays property
              family — starting with Felix 64 in BTM 1st Stage.
            </p>

            <div className="mx-auto mt-7 flex max-w-lg items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pl-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by locality or property name…"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none dark:text-white"
              />
              <button
                onClick={scrollToProperties}
                className="shrink-0 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
              >
                Search
              </button>
            </div>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={scrollToProperties}
                className="rounded-full bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              >
                Explore Properties
              </button>
              <button
                onClick={() => openModal("visit")}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
              >
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Property */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          title="Featured Property"
          subtitle="Our flagship building, loved by long-term residents"
        />
        <Card className="overflow-hidden">
          <div
            className={`h-32 w-full bg-gradient-to-r ${felix64.gradient} sm:h-40`}
          />
          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {felix64.name}
                  </h3>
                  <Badge tone="green">
                    <Star size={12} className="fill-current" /> {felix64.rating} ({felix64.reviewCount} reviews)
                  </Badge>
                </div>
                <p className="mt-1 text-sm font-medium text-orange-600 dark:text-orange-400">
                  {felix64.tagline}
                </p>
                <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  {felix64.address}, {felix64.city} - {felix64.pincode}
                </p>
                <a
                  href={`tel:${felix64.phone.replace(/\s+/g, "")}`}
                  className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-orange-600 dark:text-slate-300"
                >
                  <PhoneCall size={15} /> {felix64.phone}
                </a>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <button
                  onClick={() => openModal("visit", [felix64.id])}
                  className="rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                >
                  Schedule a Visit
                </button>
                <button
                  onClick={() => openModal("callback", [felix64.id])}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Request Callback
                </button>
              </div>
            </div>

            <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wide text-slate-400">
              Photo Tour
            </p>
            <PropertyGallery propertyName={felix64.name} />

            <p className="mb-2 mt-6 text-xs font-medium uppercase tracking-wide text-slate-400">
              Amenities
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {felix64.amenities.map((amenity) => {
                const Icon = AMENITY_ICONS[amenity] ?? Sparkles;
                return (
                  <div
                    key={amenity}
                    className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/60"
                  >
                    <Icon size={18} className="text-orange-600 dark:text-orange-400" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      {amenity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <SectionHeading
          title="What our residents say"
          subtitle="Real feedback from Felix 64 residents on Google Reviews"
        />
        <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {REVIEWS.map((review) => (
            <Card key={review.id} className="min-w-[260px] flex-1 p-4 sm:min-w-0">
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < review.rating ? "fill-current" : "text-slate-300 dark:text-slate-700"}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                {review.author} · {review.source}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Property Directory */}
      <section id="properties" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionHeading
          title="NJ Stays Property Directory"
          subtitle="Every building in the NJ Stays family — tick the ones you're interested in to enquire about several at once"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {filteredProperties.map((property) => {
            const isSelected = selectedIds.includes(property.id);
            return (
              <Card
                key={property.id}
                className={`overflow-hidden transition ${
                  isSelected ? "ring-2 ring-orange-500" : ""
                }`}
              >
                <div className={`h-24 w-full bg-gradient-to-r ${property.gradient}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => toggleSelected(property.id)}
                      className="flex items-start gap-2 text-left"
                    >
                      {isSelected ? (
                        <CheckSquare size={20} className="mt-0.5 shrink-0 text-orange-600" />
                      ) : (
                        <Square size={20} className="mt-0.5 shrink-0 text-slate-300 dark:text-slate-600" />
                      )}
                      <span className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                          <Building2 size={16} className="text-slate-600 dark:text-slate-300" />
                        </span>
                        <span>
                          <span className="block font-semibold text-slate-900 dark:text-white">
                            {property.name}
                          </span>
                          <span className="block text-xs text-slate-500 dark:text-slate-400">
                            {property.unitType} · {property.totalUnits} units
                          </span>
                        </span>
                      </span>
                    </button>
                    <Badge tone={property.status === "live" ? "green" : "blue"}>
                      {property.status === "live" ? "Live" : "Opening Soon"}
                    </Badge>
                  </div>
                  <p className="mt-3 flex items-start gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    {property.address}, {property.city}
                  </p>
                  {property.rating > 0 && (
                    <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Star size={13} className="fill-current text-amber-400" />
                      {property.rating} ({property.reviewCount} reviews)
                    </p>
                  )}

                  <div className="mt-4">
                    <PropertyGallery propertyName={property.name} variant="compact" />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => openModal("visit", [property.id])}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                    >
                      <CalendarClock size={13} /> Schedule Visit
                    </button>
                    <button
                      onClick={() => openModal("callback", [property.id])}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <PhoneCall size={13} /> Enquire
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {selectedIds.length > 0 && (
        <div className="sticky bottom-4 z-30 mx-auto flex max-w-md items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {selectedIds.length} propert{selectedIds.length === 1 ? "y" : "ies"} selected
          </span>
          <button
            onClick={() => openModal("visit", selectedIds)}
            className="rounded-full bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"
          >
            Enquire about selected
          </button>
        </div>
      )}

      <InquiryModal
        key={modalKey}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultType={modalType}
        defaultPropertyIds={modalPropertyIds}
      />
    </div>
  );
}
