import { NextResponse } from "next/server";
import { serverStore } from "@/lib/server-store";
import type { Notice } from "@/lib/types";

export async function GET() {
  return NextResponse.json({ notices: serverStore.notices });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.title || !body?.message) {
    return NextResponse.json(
      { error: "title and message are required" },
      { status: 400 }
    );
  }

  const notice: Notice = {
    id: `notice-${serverStore.notices.length + 1}-${Date.now()}`,
    title: body.title,
    message: body.message,
    propertyIds: body.propertyIds ?? "all",
    createdAt: new Date().toISOString(),
    author: body.author ?? "NJ Stays Management",
  };

  serverStore.notices.unshift(notice);
  return NextResponse.json({ notice }, { status: 201 });
}
