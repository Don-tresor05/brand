import { motion } from 'motion/react';
import { useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const codeExamples = [
    {
      title: 'React Hook',
      language: 'TypeScript',
      code: `// Custom hook for data fetching with caching
import { useState, useEffect } from 'react';

export function useDataFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cache = sessionStorage.getItem(url);
    if (cache) {
      setData(JSON.parse(cache));
      setLoading(false);
      return;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem(url, JSON.stringify(data));
        setData(data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`,
    },
    {
      title: 'Node.js API',
      language: 'TypeScript',
      code: `// Express middleware with type safety
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as AuthRequest['user'];
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`,
    },
    {
      title: 'Algorithm',
      language: 'TypeScript',
      code: `// Binary search with generics
function binarySearch<T>(
  arr: T[],
  target: T,
  comparator: (a: T, b: T) => number
): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = comparator(arr[mid], target);

    if (comparison === 0) return mid;
    if (comparison < 0) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// Usage
const numbers = [1, 3, 5, 7, 9, 11];
const index = binarySearch(
  numbers,
  7,
  (a, b) => a - b
);`,
    },
  ];

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex gap-2 mb-4">
        {codeExamples.map((example, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 rounded-lg transition-all cursor-pointer ${
              activeTab === index
                ? 'bg-accent text-accent-foreground'
                : 'bg-card hover:bg-surface'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {example.title}
          </motion.button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        className="relative bg-card rounded-2xl border border-border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span
              className="text-sm text-muted-foreground"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {codeExamples[activeTab].language}
            </span>
          </div>
          <motion.button
            onClick={copyCode}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <CheckCircle2 size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </motion.button>
        </div>

        <div className="p-6 overflow-x-auto">
          <pre
            className="text-sm leading-relaxed"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            <code>{codeExamples[activeTab].code}</code>
          </pre>
        </div>
      </motion.div>
    </div>
  );
}
