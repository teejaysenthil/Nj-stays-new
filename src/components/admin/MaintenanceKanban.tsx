"use client";

import { AlertTriangle, ArrowRight, Clock, User } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { useApp } from "@/lib/store";
import type { MaintenanceTicket, TicketStatus } from "@/lib/types";

const COLUMNS: TicketStatus[] = ["Open", "In Progress", "Resolved"];

const PRIORITY_TONE: Record<MaintenanceTicket["priority"], "slate" | "amber" | "red"> = {
  Low: "slate",
  Medium: "slate",
  High: "amber",
  Urgent: "red",
};

const NEXT_STATUS: Record<TicketStatus, TicketStatus | null> = {
  Open: "In Progress",
  "In Progress": "Resolved",
  Resolved: null,
};

export default function MaintenanceKanban({
  tickets,
}: {
  tickets: MaintenanceTicket[];
}) {
  const { updateTicketStatus } = useApp();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {COLUMNS.map((column) => {
        const columnTickets = tickets.filter((t) => t.status === column);
        return (
          <div key={column}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {column}
              </p>
              <Badge tone="slate">{columnTickets.length}</Badge>
            </div>
            <div className="space-y-3">
              {columnTickets.length === 0 && (
                <Card className="p-4 text-center text-xs text-slate-400">
                  No tickets
                </Card>
              )}
              {columnTickets.map((ticket) => {
                const next = NEXT_STATUS[ticket.status];
                return (
                  <Card key={ticket.id} className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {ticket.category}
                      </p>
                      <Badge tone={PRIORITY_TONE[ticket.priority]}>
                        {ticket.priority === "Urgent" && <AlertTriangle size={10} />}
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {ticket.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <User size={12} /> {ticket.tenantName}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock size={12} />
                      {new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                      {ticket.assignedTo && <span>· {ticket.assignedTo}</span>}
                    </div>
                    {next && (
                      <button
                        onClick={() => updateTicketStatus(ticket.id, next)}
                        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Move to {next} <ArrowRight size={12} />
                      </button>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
