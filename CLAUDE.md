# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Next.js dev server
npm run build   # production build (also the main type check)
npm run lint    # ESLint (next core-web-vitals + typescript config)
```

No test suite exists. `@biomejs/biome` is installed but has no config and no script; ESLint is the linter in use.

## Architecture

Single-page terminal-themed portfolio on Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion.

- **Content lives in JSON, not components.** `src/app/data/*.json` (hero, about, skills, projects, achievements, contact) holds all portfolio text. To add or change a project, skill, etc., edit the JSON; the section components in `src/components/sections/` just render it.
- **Page composition:** `src/app/page.tsx` stacks the sections in order. `src/app/layout.tsx` wraps everything in `TerminalLayout` (the fake terminal window with CRT/scanline overlays), so the page scrolls inside that window's content div, not the document body.
- **Section anchors:** each section has an `id` (`about`, `skills`, `projects`, `contact`, ...). `Navbar` highlights the active link via `useRouterHash`, and `CommandInput` scrolls to them with `getElementById`. Renaming an id breaks both.
- **Interactive terminal** (`src/components/ui/CommandInput.tsx`, rendered inside `Hero`): a client-side command parser with a virtual filesystem built at module load from the same JSON files (`ls`, `cd`, `cat`, `theme`, section-navigation commands). New commands go in its `switch`, and the `help` text must be updated by hand.
- **Theming:** colors are CSS variables (`--primary`, `--secondary`, `--background`, ...) defined in `src/app/globals.css` and mapped to Tailwind colors in `@theme` (e.g. `text-primary`). The `theme` command swaps themes at runtime by overwriting those variables on `document.documentElement`, so use the variable-backed Tailwind colors rather than hardcoded hex values if a component should follow the theme.
- **Contact form:** `Contact` posts to `src/app/api/send/route.ts`, which validates with Zod and sends mail via Resend. It needs `RESEND_API_KEY` in `.env`. The Zod schema is duplicated between the route and the client form; keep them in sync.
- `src/components/ui/{button,form,input,label,textarea,sonner}.tsx` are shadcn/ui-style primitives; `cn()` lives in `src/lib/utils.ts`.

## Gotchas

- `projects.json` (like `experience.json` and `publications.json`) is kept newest-first and rendered in file order; add new entries at the top.
- `ai`, `@ai-sdk/react`, `langchain`, `@xenova/transformers`, and `dotenv` are in `package.json` but not imported anywhere in `src/`.
- Path alias: `@/*` maps to `src/*`.
