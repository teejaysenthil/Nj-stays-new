"use client";

import { useState } from "react";
import { Megaphone, Send } from "lucide-react";
import { Badge, Card, inputClass, labelClass } from "@/components/ui";
import { useApp } from "@/lib/store";

export default function NoticePublisher() {
  const { notices, addNotice, properties: PROPERTIES } = useApp();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<"all" | string>("all");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    addNotice({
      title,
      message,
      propertyIds: target === "all" ? "all" : [target],
    });
    setTitle("");
    setMessage("");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="p-5">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <Megaphone size={16} /> Publish a Notice
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass()}>Title</label>
            <input
              className={inputClass()}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Lift Maintenance"
              required
            />
          </div>
          <div>
            <label className={labelClass()}>Message</label>
            <textarea
              className={inputClass()}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Details tenants should know…"
              required
            />
          </div>
          <div>
            <label className={labelClass()}>Broadcast To</label>
            <select
              className={inputClass()}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
              <option value="all">All Properties</option>
              {PROPERTIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} only
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            <Send size={14} /> Publish Notice
          </button>
        </form>
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
          Recent Notices
        </h3>
        <ul className="max-h-96 space-y-3 overflow-y-auto">
          {notices.map((notice) => (
            <li key={notice.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {notice.title}
                </p>
                <Badge tone="blue">
                  {notice.propertyIds === "all"
                    ? "All Properties"
                    : PROPERTIES.find((p) => p.id === notice.propertyIds[0])?.name}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {notice.message}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
