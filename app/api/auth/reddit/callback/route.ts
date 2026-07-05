import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  return NextResponse.json({
    ok: true,
    message: 'Callback Reddit enregistré pour PropRadar. Le monitoring utilise OAuth app-only côté serveur.',
    origin: request.nextUrl.origin,
  });
}
