import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  console.log("====== Hit the `serverless-example` route");
  return NextResponse.json(
    {
      hello: "butts"
    }
  );
}