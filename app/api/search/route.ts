import { searchSite } from '../../lib/siteSearch';

export const runtime = 'nodejs';

export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q') ?? '';
  const results = searchSite(query, 10);

  return Response.json(
    { results },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  );
}
