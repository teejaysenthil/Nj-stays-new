"use client";

import { useState } from "react";
import { CalendarClock, CheckCircle2, PhoneCall } from "lucide-react";
import { Modal, inputClass, labelClass } from "@/components/ui";
import { useApp } from "@/lib/store";

export default function InquiryModal({
  open,
  onClose,
  defaultPropertyIds = ["felix-64"],
  defaultType = "visit",
}: {
  open: boolean;
  onClose: () => void;
  defaultPropertyIds?: string[];
  defaultType?: "callback" | "visit";
}) {
  const { submitInquiry, properties } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyIds, setPropertyIds] = useState<string[]>(defaultPropertyIds);
  const [type, setType] = useState<"callback" | "visit">(defaultType);
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function reset() {
    setName("");
    setPhone("");
    setPropertyIds(defaultPropertyIds);
    setType(defaultType);
    setPreferredDate("");
    setMessage("");
    setSubmitted(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function toggleProperty(id: string) {
    setPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || propertyIds.length === 0) return;
    submitInquiry({ name, phone, propertyIds, type, preferredDate, message });
    setSubmitted(true);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={type === "visit" ? "Schedule a Visit" : "Request a Callback"}
    >
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <CheckCircle2 className="text-emerald-500" size={40} />
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            Thanks, {name}!
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Our team will {type === "visit" ? "confirm your visit slot" : "call you back"} shortly on {phone}.
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
          <div className="flex gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setType("visit")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition ${
                type === "visit"
                  ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <CalendarClock size={14} /> Schedule Visit
            </button>
            <button
              type="button"
              onClick={() => setType("callback")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition ${
                type === "callback"
                  ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <PhoneCall size={14} /> Request Callback
            </button>
          </div>

          <div>
            <label className={labelClass()}>Full Name</label>
            <input
              className={inputClass()}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className={labelClass()}>Phone Number</label>
            <input
              className={inputClass()}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              required
            />
          </div>
          <div>
            <label className={labelClass()}>
              Properties you&apos;re interested in
            </label>
            <div className="space-y-1.5 rounded-lg border border-slate-200 p-2.5 dark:border-slate-700">
              {properties.map((p) => (
                <label
                  key={p.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <input
                    type="checkbox"
                    checked={propertyIds.includes(p.id)}
                    onChange={() => toggleProperty(p.id)}
                    className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-slate-700 dark:text-slate-200">{p.name}</span>
                  {p.status === "coming_soon" && (
                    <span className="text-xs text-slate-400">(Opening Soon)</span>
                  )}
                </label>
              ))}
            </div>
            {propertyIds.length === 0 && (
              <p className="mt-1 text-xs text-rose-500">
                Select at least one property.
              </p>
            )}
          </div>
          {type === "visit" && (
            <div>
              <label className={labelClass()}>Preferred Date</label>
              <input
                type="date"
                className={inputClass()}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className={labelClass()}>Message (optional)</label>
            <textarea
              className={inputClass()}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Anything specific you'd like us to know?"
            />
          </div>
          <button
            type="submit"
            disabled={propertyIds.length === 0}
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {type === "visit" ? "Schedule my Visit" : "Request Callback"}
          </button>
        </form>
      )}
    </Modal>
  );
}
