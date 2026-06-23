import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        (ref.current as HTMLSpanElement).textContent = Math.floor(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function StatsCounter() {
  const stats = [
    { label: 'GitHub Repositories', value: 74, suffix: '' },
    { label: 'Yearly Contributions', value: 1532, suffix: '' },
    { label: 'GitHub Followers', value: 7, suffix: '' },
    { label: 'Active Specialties', value: 6, suffix: '+' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-8 bg-card rounded-2xl border border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -8, borderColor: 'var(--accent)' }}
        >
          <div
            className="text-5xl mb-3 text-accent"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
