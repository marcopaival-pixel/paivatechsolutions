import { NextResponse } from "next/server";
import { getStorageStatus } from "@/lib/db";

export async function GET() {
  const storage = await getStorageStatus();
  const degraded = storage.mode === "unavailable";
  return NextResponse.json({
    status: degraded ? "degraded" : "ok",
    service: "nexshape-site",
    storage,
    timestamp: new Date().toISOString(),
  });
}
