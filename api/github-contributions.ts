type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

const contributionsCache = new Map<string, { expiresAt: number; body: string }>();
const CONTRIBUTIONS_CACHE_TTL_MS = 15 * 60 * 1000;

function sendJson(res: any, statusCode: number, body: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function fetchContributionDays(username: string): Promise<ContributionDay[]> {
  const response = await fetch(
    `https://github.com/users/${encodeURIComponent(username)}/contributions`,
    {
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0',
      },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub contributions request failed with ${response.status}`);
  }

  const html = await response.text();
  const days: ContributionDay[] = [];
  const dayPattern =
    /<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d+)"[^>]*>[\s\S]*?<\/td>\s*<tool-tip[^>]*>([^<]+)<\/tool-tip>/g;

  for (const match of html.matchAll(dayPattern)) {
    const date = match[1];
    const level = Number(match[2]);
    const tooltip = match[3];
    const countMatch = tooltip.match(/^(\d+)\s+contributions?/i);
    const count = countMatch ? Number(countMatch[1]) : 0;

    days.push({ date, count, level });
  }

  if (days.length === 0) {
    throw new Error('No contribution data found in GitHub response');
  }

  return days;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const username = String(req.query?.username ?? '').trim();

    if (!username) {
      sendJson(res, 400, { error: 'username is required' });
      return;
    }

    const cacheKey = username.toLowerCase();
    const cached = contributionsCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.end(cached.body);
      return;
    }

    const days = await fetchContributionDays(username);
    const body = JSON.stringify({
      username,
      days,
      updatedAt: new Date().toISOString(),
    });

    contributionsCache.set(cacheKey, {
      expiresAt: Date.now() + CONTRIBUTIONS_CACHE_TTL_MS,
      body,
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(body);
  } catch (error) {
    sendJson(res, 502, {
      error: error instanceof Error ? error.message : 'Failed to load GitHub contributions',
    });
  }
}
