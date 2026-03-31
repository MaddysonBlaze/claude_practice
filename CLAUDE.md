# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # Start development server (Turbopack, localhost:3000)
bun build      # Production build (Turbopack)
bun start      # Start production server
bun lint       # Run ESLint
```

No test runner is configured yet.

## This is Next.js 16 — read the docs before writing code

**APIs, conventions, and file structure differ significantly from prior versions.** Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

### Breaking changes from Next.js 15

**Async Request APIs** — synchronous access is fully removed. These must now be `await`ed:
- `cookies()`, `headers()`, `draftMode()` from `next/headers`
- `params` in layout, page, route, default, opengraph-image, icon files
- `searchParams` in page files
- `id` in sitemap and opengraph-image generating functions

```tsx
// CORRECT in Next.js 16
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const filters = (await props.searchParams).filters
}
```

Run `bunx next typegen` (or `bun dev`/`bun build`) to auto-generate globally available `PageProps`, `LayoutProps`, and `RouteContext` type helpers — no import needed.

**Turbopack is the default bundler** for both `next dev` and `next build`. Custom webpack configs will break production builds. Use `--webpack` flag to opt out, or `turbopack.*` (top-level in `next.config.ts`, not `experimental.turbopack`) to configure.

**`middleware` → `proxy`** — rename `middleware.ts` to `proxy.ts` and export `proxy` (not `middleware`). The `edge` runtime is not supported in `proxy`; use `nodejs`. Config flags also renamed (e.g. `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`).

**PPR** — `experimental.ppr` is removed. Use `cacheComponents: true` in `next.config.ts` instead.

**Image defaults changed:**
- `minimumCacheTTL`: 60s → 14400s (4 hours)
- `imageSizes`: `16` removed from defaults
- `qualities`: now defaults to `[75]` only
- Local IP optimization blocked by default
- Max redirects: unlimited → 3
- `images.domains` deprecated → use `images.remotePatterns`
- `next/legacy/image` deprecated → use `next/image`

### Stable APIs in Next.js 16 (drop the `unstable_` prefix)

```ts
import { cacheLife, cacheTag } from 'next/cache'  // was unstable_cacheLife, unstable_cacheTag
```

New cache APIs: `updateTag` (Server Actions only, read-your-writes), `refresh` (refresh client router from Server Action), `revalidateTag(tag, profile)` (now accepts optional `cacheLife` profile as second arg).

**React Compiler** is stable but opt-in: `reactCompiler: true` in `next.config.ts`.

## Architecture

This is a Next.js 16 App Router project. All routes live under `app/`. Pages and layouts are **Server Components by default** — add `'use client'` only for components that need state, event handlers, lifecycle hooks, or browser APIs.

- `app/layout.tsx` — root layout, wraps all pages, must include `<html>` and `<body>` tags
- `app/page.tsx` — home route (`/`)
- `app/globals.css` — global styles via `@import "tailwindcss"` (Tailwind CSS v4 syntax)

Path alias `@/*` resolves to the project root.

Styling uses **Tailwind CSS v4** with `@tailwindcss/postcss`. Theme tokens are configured inline in CSS via `@theme`. Dark mode uses `prefers-color-scheme` media query with CSS custom properties.
