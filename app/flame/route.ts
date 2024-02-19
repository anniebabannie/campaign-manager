import { NextRequest, NextResponse } from 'next/server'

export async function GET(response: NextResponse) {
  return NextResponse.json({ success: true });
}

export async function POST(request: NextRequest, response: NextResponse) {
  const { filename, args } = await request.json();

  console.log("filename", filename)
  console.log("args", args)
  return NextResponse.json({ success: true });
}