"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Modal, inputClass, labelClass } from "@/components/ui";
import { useApp } from "@/lib/store";

export default function AddTenantModal({
  open,
  onClose,
  propertyId,
}: {
  open: boolean;
  onClose: () => void;
  propertyId: string;
}) {
  const { addTenant, properties } = useApp();
  const [selectedProperty, setSelectedProperty] = useState(propertyId);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const property = properties.find((p) => p.id === selectedProperty);

  function reset() {
    setName("");
    setPhone("");
    setEmail("");
    setEmergencyName("");
    setEmergencyPhone("");
    setError("");
    setDone(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const result = addTenant({
      propertyId: selectedProperty,
      name,
      phone,
      email,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
    });
    if (!result.ok) {
      setError(result.error ?? "Something went wrong.");
      return;
    }
    setDone(true);
  }

  return (
    <Modal open={open} onClose={handleClose} title={`Add Tenant · ${property?.name ?? ""}`}>
      {done ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <CheckCircle2 className="text-emerald-500" size={40} />
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            {name} added to {property?.name}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Moved into the next available vacant unit.
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
            <label className={labelClass()}>Property</label>
            <select
              className={inputClass()}
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass()}>Full Name</label>
            <input className={inputClass()} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass()}>Phone</label>
              <input className={inputClass()} value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
              <label className={labelClass()}>Email</label>
              <input type="email" className={inputClass()} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass()}>Emergency Contact</label>
              <input
                className={inputClass()}
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="Name (relation)"
                required
              />
            </div>
            <div>
              <label className={labelClass()}>Emergency Phone</label>
              <input
                className={inputClass()}
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                required
              />
            </div>
          </div>
          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Add Tenant
          </button>
        </form>
      )}
    </Modal>
  );
}
