import { NextResponse } from "next/server";
import { serverStore } from "@/lib/server-store";
import type { Inquiry } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ inquiries: serverStore.inquiries });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (
    !body?.name ||
    !body?.phone ||
    !Array.isArray(body?.propertyIds) ||
    body.propertyIds.length === 0 ||
    !body?.type
  ) {
    return NextResponse.json(
      { error: "name, phone, propertyIds (non-empty array) and type are required" },
      { status: 400 }
    );
  }

  const inquiry: Inquiry = {
    id: `inq-${serverStore.inquiries.length + 1}-${Date.now()}`,
    name: body.name,
    phone: body.phone,
    propertyIds: body.propertyIds,
    type: body.type,
    preferredDate: body.preferredDate || undefined,
    message: body.message || undefined,
    createdAt: new Date().toISOString(),
    contacted: false,
  };

  serverStore.inquiries.unshift(inquiry);
  return NextResponse.json({ inquiry }, { status: 201 });
}
