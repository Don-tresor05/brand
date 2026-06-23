import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

type GitHubHeatmapProps = {
  username: string;
};

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionResponse = {
  username: string;
  days: ContributionDay[];
  updatedAt: string;
};

function parseDateLabel(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00Z`));
}

function getIntensity(level: number) {
  if (level <= 0) return 'bg-surface';
  if (level === 1) return 'bg-accent/35';
  if (level === 2) return 'bg-accent/55';
  if (level === 3) return 'bg-accent/75';
  return 'bg-accent';
}

export default function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const refreshIntervalMs = 15 * 60 * 1000;

    async function loadContributions() {
      try {
        const response = await fetch(
          `/api/github-contributions?username=${encodeURIComponent(username)}`,
          {
            signal: controller.signal,
            cache: 'no-store',
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = (await response.json()) as ContributionResponse;
        setDays(payload.days);
        setStatus('loaded');
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setDays([]);
        setStatus('error');
      }
    }

    void loadContributions();
    const intervalId = window.setInterval(() => {
      void loadContributions();
    }, refreshIntervalMs);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [username]);

  const weeks = useMemo(() => {
    const dayMap = new Map(days.map((day) => [day.date, day]));
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const start = new Date(today);
    start.setDate(start.getDate() - 365);
    start.setHours(12, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());

    const weeksData: Array<Array<ContributionDay | null>> = [];
    let currentWeek: Array<ContributionDay | null> = [];

    for (let cursor = new Date(start); cursor <= today; cursor.setDate(cursor.getDate() + 1)) {
      const date = cursor.toISOString().slice(0, 10);
      currentWeek.push(dayMap.get(date) ?? { date, count: 0, level: 0 });

      if (currentWeek.length === 7) {
        weeksData.push([...currentWeek]);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksData.push(currentWeek);
    }

    return weeksData;
  }, [days]);

  return (
    <div className="relative space-y-6">
      <div className="relative overflow-x-auto pb-4">
        <div className="inline-flex min-w-full justify-center gap-1 rounded-2xl border border-border bg-card p-8">
          {status === 'loading' && (
            <div className="flex min-h-[220px] w-full items-center justify-center text-sm text-muted-foreground">
              Loading live GitHub data...
            </div>
          )}

          {status === 'error' && (
            <div className="flex min-h-[220px] w-full items-center justify-center text-center text-sm text-muted-foreground">
              GitHub contributions could not be loaded right now.
            </div>
          )}

          {status === 'loaded' &&
            weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) =>
                  day ? (
                    <motion.button
                      key={`${weekIndex}-${dayIndex}-${day.date}`}
                      type="button"
                      className={`w-3 h-3 rounded-sm cursor-pointer ${
                        day.level <= 0 ? 'bg-surface' : `bg-accent ${getIntensity(day.level)}`
                      }`}
                      whileHover={{ scale: 1.5 }}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      aria-label={`${day.count} contributions on ${parseDateLabel(day.date)}`}
                    />
                  ) : (
                    <div key={`${weekIndex}-${dayIndex}-empty`} className="w-3 h-3 rounded-sm opacity-0" />
                  ),
                )}
              </div>
            ))}
        </div>
      </div>

      {status === 'loaded' && hoveredDay && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-card px-4 py-2 shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm">
            <div className="font-semibold">{hoveredDay.count} contributions</div>
            <div className="text-muted-foreground">{parseDateLabel(hoveredDay.date)}</div>
          </div>
        </motion.div>
      )}

      {status === 'loaded' && (
        <>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${
                    level === 0 ? 'bg-surface' : `bg-accent ${getIntensity(level)}`
                  }`}
                />
              ))}
            </div>
            <span>More</span>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Live from GitHub profile @{username}
          </div>
        </>
      )}
    </div>
  );
}
