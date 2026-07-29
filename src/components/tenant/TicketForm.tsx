"use client";

import { useState } from "react";
import { CheckCircle2, ImagePlus, Send } from "lucide-react";
import { Card, inputClass, labelClass } from "@/components/ui";
import { useApp } from "@/lib/store";
import type { TicketCategory, TicketPriority } from "@/lib/types";

const CATEGORIES: TicketCategory[] = [
  "Plumbing",
  "Electrical",
  "Wi-Fi",
  "Housekeeping",
  "Parking",
  "Other",
];
const PRIORITIES: TicketPriority[] = ["Low", "Medium", "High", "Urgent"];

export default function TicketForm() {
  const { submitTicket } = useApp();
  const [category, setCategory] = useState<TicketCategory>("Plumbing");
  const [priority, setPriority] = useState<TicketPriority>("Medium");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    submitTicket({ category, priority, description, hasImage: !!fileName });
    setSubmitted(true);
    setDescription("");
    setFileName("");
    setTimeout(() => setSubmitted(false), 2500);
  }

  return (
    <Card className="p-5">
      <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
        Raise a New Ticket
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass()}>Category</label>
            <select
              className={inputClass()}
              value={category}
              onChange={(e) => setCategory(e.target.value as TicketCategory)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass()}>Priority</label>
            <select
              className={inputClass()}
              value={priority}
              onChange={(e) => setPriority(e.target.value as TicketPriority)}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass()}>Describe the issue</label>
          <textarea
            className={inputClass()}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g. Bathroom tap is leaking continuously"
            required
          />
        </div>
        <div>
          <label className={labelClass()}>Attach a photo (optional)</label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-sm text-slate-500 hover:border-orange-400 hover:text-orange-600 dark:border-slate-700 dark:text-slate-400">
            <ImagePlus size={16} />
            {fileName || "Choose an image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
        >
          {submitted ? (
            <>
              <CheckCircle2 size={16} className="text-emerald-500" /> Ticket
              Submitted
            </>
          ) : (
            <>
              <Send size={15} /> Submit Ticket
            </>
          )}
        </button>
      </form>
    </Card>
  );
}
