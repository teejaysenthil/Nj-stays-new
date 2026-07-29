import { NextResponse } from "next/server";
import { serverStore } from "@/lib/server-store";
import type { Payment } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ payments: serverStore.payments });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.tenantId || !body?.propertyId || !body?.amount) {
    return NextResponse.json(
      { error: "tenantId, propertyId and amount are required" },
      { status: 400 }
    );
  }

  const payment: Payment = {
    id: `pay-${serverStore.payments.length + 1}-${Date.now()}`,
    tenantId: body.tenantId,
    propertyId: body.propertyId,
    amount: body.amount,
    method: body.method ?? "UPI",
    date: new Date().toISOString().slice(0, 10),
    month: new Date().toLocaleString("en-IN", { month: "long", year: "numeric" }),
    status: "Paid",
  };

  serverStore.payments.unshift(payment);
  return NextResponse.json({ payment }, { status: 201 });
}
