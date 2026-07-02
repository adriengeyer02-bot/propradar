import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const providedSecret = request.headers.get('x-revalidate-secret');

  if (!secret || providedSecret !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const paths = Array.isArray(body.paths) ? body.paths.filter((path: unknown): path is string => typeof path === 'string') : [];
  const targets = paths.length ? paths : ['/', '/guides', '/promos', '/comparateur', '/sitemap.xml', '/feed.xml'];

  targets.forEach((path) => {
    revalidatePath(path);
  });

  return NextResponse.json({
    ok: true,
    revalidated: targets,
    updatedAt: new Date().toISOString(),
  });
}
