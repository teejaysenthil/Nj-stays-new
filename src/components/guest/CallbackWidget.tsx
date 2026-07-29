"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Modal } from "@/components/ui";

export default function CallbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setPhone("");
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <>
      {/* Floating Widget Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-900 to-amber-700 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition animate-bounce"
      >
        <MessageSquare size={18} />
        <span>Request Callback</span>
      </button>

      {/* Modal */}
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setPhone("");
          setSubmitted(false);
        }}
        title="Request a Callback"
      >
        <div className="space-y-4">
          {!submitted ? (
            <>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Enter your phone number and our team will get back to you within 2 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-900/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-rose-900 to-amber-700 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                  Request Callback
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                Request Received!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Our team will call you shortly. Thank you!
              </p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
