import { motion } from 'motion/react';
import { useState } from 'react';

export default function GitHubHeatmap() {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Generate mock contribution data for the last year
  const generateContributions = () => {
    const contributions = [];
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const count = Math.floor(Math.random() * 20);
      contributions.push({
        date: new Date(d).toISOString().split('T')[0],
        count,
      });
    }
    return contributions;
  };

  const contributions = generateContributions();

  const getIntensity = (count: number) => {
    if (count === 0) return 'opacity-20';
    if (count < 5) return 'opacity-40';
    if (count < 10) return 'opacity-60';
    if (count < 15) return 'opacity-80';
    return 'opacity-100';
  };

  // Group by weeks
  const weeks: any[] = [];
  let currentWeek: any[] = [];

  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if ((index + 1) % 7 === 0 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  return (
    <div className="relative">
      <motion.div
        className="overflow-x-auto pb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex gap-1 min-w-full justify-center p-8 bg-card rounded-2xl border border-border">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day: any, dayIndex: number) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 bg-accent rounded-sm cursor-pointer ${getIntensity(day.count)}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                  whileHover={{ scale: 1.5 }}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {hoveredDay && (
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-4 py-2 bg-card border border-border rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm">
            <div className="font-semibold">{hoveredDay.count} contributions</div>
            <div className="text-muted-foreground">{hoveredDay.date}</div>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 5, 10, 15, 20].map((count) => (
            <div
              key={count}
              className={`w-3 h-3 bg-accent rounded-sm ${getIntensity(count)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
