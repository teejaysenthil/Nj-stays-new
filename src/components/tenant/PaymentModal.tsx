"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Modal, inputClass, labelClass } from "@/components/ui";
import { useApp } from "@/lib/store";
import type { Payment } from "@/lib/types";

export default function PaymentModal({
  open,
  onClose,
  tenantId,
  amount,
}: {
  open: boolean;
  onClose: () => void;
  tenantId: string;
  amount: number;
}) {
  const { recordPayment } = useApp();
  const [method, setMethod] = useState<Payment["method"]>("UPI");
  const [fileName, setFileName] = useState("");
  const [done, setDone] = useState(false);

  function handleClose() {
    setDone(false);
    setFileName("");
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    recordPayment({ tenantId, amount, method });
    setDone(true);
  }

  return (
    <Modal open={open} onClose={handleClose} title="Pay Rent / Upload Receipt">
      {done ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <CheckCircle2 className="text-emerald-500" size={40} />
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            Payment recorded!
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ₹{amount.toLocaleString("en-IN")} marked as paid via {method}.
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
            <label className={labelClass()}>Amount Due</label>
            <input
              className={inputClass()}
              value={`₹${amount.toLocaleString("en-IN")}`}
              disabled
            />
          </div>
          <div>
            <label className={labelClass()}>Payment Method</label>
            <select
              className={inputClass()}
              value={method}
              onChange={(e) => setMethod(e.target.value as Payment["method"])}
            >
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label className={labelClass()}>Upload Receipt (optional)</label>
            <input
              type="file"
              className={`${inputClass()} cursor-pointer`}
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
            {fileName && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Selected: {fileName}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Confirm Payment
          </button>
        </form>
      )}
    </Modal>
  );
}
