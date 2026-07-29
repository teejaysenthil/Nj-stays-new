import { NextResponse } from "next/server";
import { serverStore } from "@/lib/server-store";
import type { MaintenanceTicket } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ tickets: serverStore.tickets });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.propertyId || !body?.unitId || !body?.tenantId || !body?.category) {
    return NextResponse.json(
      { error: "propertyId, unitId, tenantId and category are required" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const ticket: MaintenanceTicket = {
    id: `tkt-${serverStore.tickets.length + 1}-${Date.now()}`,
    propertyId: body.propertyId,
    unitId: body.unitId,
    tenantId: body.tenantId,
    tenantName: body.tenantName ?? "Tenant",
    category: body.category,
    priority: body.priority ?? "Medium",
    description: body.description ?? "",
    hasImage: !!body.hasImage,
    status: "Open",
    createdAt: now,
    updatedAt: now,
  };

  serverStore.tickets.unshift(ticket);
  return NextResponse.json({ ticket }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  if (!body?.id || !body?.status) {
    return NextResponse.json({ error: "id and status are required" }, { status: 400 });
  }

  const ticket = serverStore.tickets.find((t) => t.id === body.id);
  if (!ticket) {
    return NextResponse.json({ error: "ticket not found" }, { status: 404 });
  }

  ticket.status = body.status;
  ticket.updatedAt = new Date().toISOString();
  if (body.assignedTo) ticket.assignedTo = body.assignedTo;

  return NextResponse.json({ ticket });
}
