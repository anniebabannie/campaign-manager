import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("generate character sheet");
  return NextResponse.json({ success: true });
}