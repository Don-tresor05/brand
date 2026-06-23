import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

type ContributionDay = {
  date: string
  count: number
  level: number
}

const contributionsCache = new Map<string, { expiresAt: number; body: string }>()
const CONTRIBUTIONS_CACHE_TTL_MS = 15 * 60 * 1000

async function fetchContributionDays(username: string): Promise<ContributionDay[]> {
  const response = await fetch(
    `https://github.com/users/${encodeURIComponent(username)}/contributions`,
    {
      headers: {
        Accept: 'text/html,application/xhtml+xml',
      },
    },
  )

  if (!response.ok) {
    throw new Error(`GitHub contributions request failed with ${response.status}`)
  }

  const html = await response.text()
  const days: ContributionDay[] = []
  const dayPattern =
    /<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d+)"[^>]*>[\s\S]*?<\/td>\s*<tool-tip[^>]*>([^<]+)<\/tool-tip>/g

  for (const match of html.matchAll(dayPattern)) {
    const date = match[1]
    const level = Number(match[2])
    const tooltip = match[3]
    const countMatch = tooltip.match(/^(\d+)\s+contributions?/i)
    const count = countMatch ? Number(countMatch[1]) : 0

    days.push({ date, count, level })
  }

  if (days.length === 0) {
    throw new Error('No contribution data found in GitHub response')
  }

  return days
}

function githubContributionsPlugin() {
  return {
    name: 'github-contributions-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/github-contributions')) {
          next()
          return
        }

        try {
          const url = new URL(req.url, 'http://localhost')
          const username = url.searchParams.get('username')?.trim()

          if (!username) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'username is required' }))
            return
          }

          const cacheKey = username.toLowerCase()
          const cached = contributionsCache.get(cacheKey)
          if (cached && cached.expiresAt > Date.now()) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.setHeader('Cache-Control', 'no-store')
            res.end(cached.body)
            return
          }

          const days = await fetchContributionDays(username)
          const body = JSON.stringify({
            username,
            days,
            updatedAt: new Date().toISOString(),
          })

          contributionsCache.set(cacheKey, {
            expiresAt: Date.now() + CONTRIBUTIONS_CACHE_TTL_MS,
            body,
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.setHeader('Cache-Control', 'no-store')
          res.end(body)
        } catch (error) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'Failed to load GitHub contributions',
            }),
          )
        }
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/github-contributions')) {
          next()
          return
        }

        try {
          const url = new URL(req.url, 'http://localhost')
          const username = url.searchParams.get('username')?.trim()

          if (!username) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'username is required' }))
            return
          }

          const cacheKey = username.toLowerCase()
          const cached = contributionsCache.get(cacheKey)
          if (cached && cached.expiresAt > Date.now()) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.setHeader('Cache-Control', 'no-store')
            res.end(cached.body)
            return
          }

          const days = await fetchContributionDays(username)
          const body = JSON.stringify({
            username,
            days,
            updatedAt: new Date().toISOString(),
          })

          contributionsCache.set(cacheKey, {
            expiresAt: Date.now() + CONTRIBUTIONS_CACHE_TTL_MS,
            body,
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.setHeader('Cache-Control', 'no-store')
          res.end(body)
        } catch (error) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'Failed to load GitHub contributions',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig({
  publicDir: 'Public',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    githubContributionsPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
