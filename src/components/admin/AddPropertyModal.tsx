"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Modal, inputClass, labelClass } from "@/components/ui";
import { useApp } from "@/lib/store";

const AMENITY_OPTIONS = [
  "High-speed Wi-Fi",
  "Fully Furnished",
  "24/7 Security",
  "Power Backup",
  "Housekeeping",
  "Two-Wheeler Parking",
];

const GRADIENT_OPTIONS = [
  "from-orange-500 via-rose-500 to-pink-600",
  "from-sky-500 via-indigo-500 to-violet-600",
  "from-emerald-500 via-teal-500 to-cyan-600",
  "from-amber-500 via-orange-500 to-red-600",
];

export default function AddPropertyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { addProperty } = useApp();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [totalUnits, setTotalUnits] = useState("8");
  const [phone, setPhone] = useState("+91 94839 26622");
  const [amenities, setAmenities] = useState<string[]>(["Fully Furnished"]);
  const [gradient, setGradient] = useState(GRADIENT_OPTIONS[1]);
  const [done, setDone] = useState(false);

  function reset() {
    setName("");
    setAddress("");
    setTotalUnits("8");
    setAmenities(["Fully Furnished"]);
    setGradient(GRADIENT_OPTIONS[1]);
    setDone(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function toggleAmenity(a: string) {
    setAmenities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;
    addProperty({
      name,
      tagline: "Fully Furnished 1BHK Apartments (Opening Soon)",
      address,
      city: "Bengaluru",
      pincode: "560029",
      phone,
      unitType: "1BHK",
      totalUnits: Number(totalUnits) || 1,
      amenities,
      gradient,
    });
    setDone(true);
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add a New Property">
      {done ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <CheckCircle2 className="text-emerald-500" size={40} />
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            {name} added!
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            It now appears in your property list as &ldquo;Coming Soon&rdquo; until you configure units.
          </p>
          <button
            onClick={handleClose}
            className="mt-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass()}>Property Name</label>
            <input
              className={inputClass()}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. NJ Stays - Unit 3"
              required
            />
          </div>
          <div>
            <label className={labelClass()}>Address</label>
            <input
              className={inputClass()}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, area, landmark"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass()}>Total Units</label>
              <input
                type="number"
                min={1}
                className={inputClass()}
                value={totalUnits}
                onChange={(e) => setTotalUnits(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()}>Contact Phone</label>
              <input
                className={inputClass()}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={labelClass()}>Amenities</label>
            <div className="grid grid-cols-2 gap-1.5">
              {AMENITY_OPTIONS.map((a) => (
                <label key={a} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={amenities.includes(a)}
                    onChange={() => toggleAmenity(a)}
                    className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass()}>Card Color</label>
            <div className="flex gap-2">
              {GRADIENT_OPTIONS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGradient(g)}
                  className={`h-8 w-8 rounded-full bg-gradient-to-br ${g} ${
                    gradient === g ? "ring-2 ring-offset-2 ring-slate-900 dark:ring-white" : ""
                  }`}
                  aria-label={`Choose gradient ${g}`}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Add Property
          </button>
        </form>
      )}
    </Modal>
  );
}
