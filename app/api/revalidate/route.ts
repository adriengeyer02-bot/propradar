import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type RevalidateBody = {
  paths?: unknown;
};

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const providedSecret = request.headers.get('x-revalidate-secret');

  if (!secret || providedSecret !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as RevalidateBody;
  const paths: string[] = Array.isArray(body.paths)
    ? body.paths.filter((path): path is string => typeof path === 'string')
    : [];
  const targets: string[] = paths.length ? paths : ['/', '/guides', '/radar-brief', '/promos', '/comparateur', '/sitemap.xml', '/feed.xml'];

  targets.forEach((path) => {
    revalidatePath(path);
  });

  return NextResponse.json({
    ok: true,
    revalidated: targets,
    updatedAt: new Date().toISOString(),
  });
}
