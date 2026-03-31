# MCPHub — MVP Spec

## Context

The user is building **MCPHub**, a discovery platform for open-source MCP (Model Context Protocol) servers. The MVP goal is simple: let developers find and browse MCP servers in a clean, card-based UI with search. No auth, no submissions, no ratings — just display and discoverability.

The project lives in a fresh Next.js 16 App Router repo (`/Volumes/dev/claude_tutorials/hookhub`) with Tailwind CSS v4. Nothing custom exists yet.

---

## Product Spec: MCPHub MVP

### What is MCPHub?
A curated, searchable directory of open-source MCP servers. Each server is sourced from a GitHub repository and has a name, category, description, and a link to its repo.

### Goals
- Let developers quickly browse available MCP servers
- Filter/search by name or category
- Click through to a server's GitHub repo
- Fast, static, no backend needed for MVP

---

## Data Model

Each MCP server entry:

```ts
type MCPServer = {
  name: string           // e.g. "filesystem"
  category: string       // e.g. "File System", "Database", "Browser", "AI", "Utilities"
  description: string    // 1–2 sentence description
  repoUrl: string        // GitHub URL
  author: string         // GitHub org or username
}
```

Data source for MVP: a static JSON/TS file at `lib/data/mcp-servers.ts` — no database. Seed with ~15–20 real MCP servers from the official Anthropic repo and community.

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero + search bar + server card grid |

MVP is a single-page app. No detail pages needed.

---

## UI Components

### Layout (`app/layout.tsx`)
- Update metadata: title "MCPHub", description "Discover open-source MCP servers"
- Keep Geist font, add a simple nav header with the MCPHub logo/wordmark

### Home Page (`app/page.tsx`)
1. **Hero section** — Title "MCPHub", tagline "Discover open-source MCP servers"
2. **Search bar** — client component, filters cards in real-time by name or description
3. **Category filter pills** — filter by category (All, File System, Database, Browser, etc.)
4. **Server card grid** — responsive grid (1 col mobile → 2 col tablet → 3 col desktop)

### ServerCard component (`components/ServerCard.tsx`)
- Server name (bold)
- Category badge (colored pill)
- Description (2–3 lines, truncated)
- Author
- "View on GitHub" button/link → opens `repoUrl` in new tab

### SearchBar + CategoryFilter (`components/ServerSearch.tsx`)
- `'use client'` component
- Controlled input with instant filtering (no debounce needed for static data)
- Category pills below the search input
- Passes filtered results down (or use URL search params for shareability — MVP: state is fine)

---

## File Structure

```
app/
  layout.tsx          — update metadata + nav header
  page.tsx            — home page (Server Component, passes data to client search)
  globals.css         — keep as-is, may add minor custom tokens

components/
  ServerCard.tsx      — card UI (Server Component)
  ServerSearch.tsx    — search + filter (Client Component)
  CategoryBadge.tsx   — reusable colored pill for categories

lib/
  data/
    mcp-servers.ts    — static array of MCPServer objects (seed data)
  types.ts            — MCPServer type definition
```

---

## Styling Notes

- Tailwind CSS v4 throughout
- Dark mode support via `prefers-color-scheme` (already configured in globals.css)
- Card style: white/dark bg, subtle border, rounded-xl, hover shadow lift
- Category badges: use distinct color per category (map category → Tailwind color class)
- Search bar: full-width on mobile, centered max-w on desktop

---

## Seed Data (Initial MCP Servers ~15-20)

Pull from real community sources:
- `@modelcontextprotocol/server-filesystem` — File System
- `@modelcontextprotocol/server-github` — Developer Tools
- `@modelcontextprotocol/server-postgres` — Database
- `@modelcontextprotocol/server-sqlite` — Database
- `@modelcontextprotocol/server-brave-search` — Search
- `@modelcontextprotocol/server-fetch` — Utilities
- `@modelcontextprotocol/server-memory` — AI
- `@modelcontextprotocol/server-puppeteer` — Browser
- `@modelcontextprotocol/server-slack` — Communication
- `@modelcontextprotocol/server-google-maps` — Maps
- Plus ~5–10 notable community servers

---

## Out of Scope for MVP

- User submissions / contribute form
- Auth / accounts
- Server ratings or reviews
- Pagination (static list is small enough)
- Detail/profile pages per server
- Backend / database
- Install instructions or version tracking

---

## Verification

1. Run `bun dev` — site loads at localhost:3000
2. All ~15–20 cards render in the grid
3. Typing in search bar filters cards in real-time
4. Clicking a category pill filters to that category
5. "All" pill resets filters
6. "View on GitHub" links open correct repo URLs in new tab
7. Dark mode renders correctly (toggle via OS setting)
8. Responsive layout looks correct at mobile/tablet/desktop widths

---

## Critical Files to Create/Modify

| File | Action |
|------|--------|
| `lib/types.ts` | Create — MCPServer type |
| `lib/data/mcp-servers.ts` | Create — seed data array |
| `components/ServerCard.tsx` | Create — card component |
| `components/ServerSearch.tsx` | Create — client search + filter |
| `components/CategoryBadge.tsx` | Create — badge pill |
| `app/page.tsx` | Modify — replace boilerplate with home page |
| `app/layout.tsx` | Modify — update metadata + add nav |
