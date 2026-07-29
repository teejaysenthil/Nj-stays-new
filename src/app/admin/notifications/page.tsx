"use client";

import { useMemo } from "react";
import {
  AlertTriangle,
  Bell,
  BellOff,
  Check,
  Globe,
  Wrench,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { Badge, Card, SectionHeading } from "@/components/ui";

interface NotificationItem {
  id: string;
  tone: "red" | "amber" | "blue";
  icon: typeof Bell;
  title: string;
  message: string;
  createdAt: string;
}

export default function Notifications() {
  const { tenants, tickets, inquiries, dismissedNotificationIds, dismissNotification } = useApp();

  const notifications = useMemo<NotificationItem[]>(() => {
    const items: NotificationItem[] = [];

    tenants
      .filter((t) => t.rentStatus === "overdue")
      .forEach((t) => {
        items.push({
          id: `overdue-${t.id}`,
          tone: "red",
          icon: AlertTriangle,
          title: "Rent overdue",
          message: `${t.name} has an overdue rent payment of ₹${t.rentAmount.toLocaleString("en-IN")}.`,
          createdAt: t.rentDueDate,
        });
      });

    tickets
      .filter((t) => t.status !== "Resolved" && (t.priority === "High" || t.priority === "Urgent"))
      .forEach((t) => {
        items.push({
          id: `ticket-${t.id}`,
          tone: "amber",
          icon: Wrench,
          title: `${t.priority} priority complaint`,
          message: `${t.tenantName} raised a ${t.category.toLowerCase()} issue: "${t.description}"`,
          createdAt: t.createdAt,
        });
      });

    inquiries
      .filter((i) => !i.contacted)
      .forEach((i) => {
        items.push({
          id: `inquiry-${i.id}`,
          tone: "blue",
          icon: Globe,
          title: "New guest inquiry",
          message: `${i.name} requested a ${i.type === "visit" ? "visit" : "callback"} · ${i.phone}`,
          createdAt: i.createdAt,
        });
      });

    return items
      .filter((n) => !dismissedNotificationIds.includes(n.id))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [tenants, tickets, inquiries, dismissedNotificationIds]);

  return (
    <div className="px-4 py-8 sm:px-6">
      <SectionHeading
        title="Notifications"
        subtitle="System alerts across rent, maintenance, and guest inquiries"
      />

      {notifications.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 p-10 text-center">
          <BellOff size={26} className="text-slate-400" />
          <p className="font-medium text-slate-700 dark:text-slate-200">You&apos;re all caught up</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No pending alerts right now.
          </p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <li key={n.id}>
                <Card className="flex items-start justify-between gap-3 p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        n.tone === "red"
                          ? "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                          : n.tone === "amber"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                      }`}
                    >
                      <Icon size={15} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {n.title}
                        </p>
                        <Badge tone={n.tone}>{n.tone === "red" ? "Urgent" : n.tone === "amber" ? "High" : "Info"}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{n.message}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissNotification(n.id)}
                    aria-label="Dismiss notification"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                  >
                    <Check size={15} />
                  </button>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
