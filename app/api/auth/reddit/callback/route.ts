import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  return NextResponse.json({
    ok: true,
    message: 'Reddit callback registered for PropRadar. Monitoring uses server-side app-only OAuth.',
    origin: request.nextUrl.origin,
  });
}
