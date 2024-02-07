import { NextRequest, NextResponse } from "next/server";
import generateCharacterSheet from "./generateCharSheet.mjs";

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  if (!id) return NextResponse.json({ success: false, error: "No id provided" });

  const response = await generateCharacterSheet(id);
  return NextResponse.json({ success: true, body: response });
}