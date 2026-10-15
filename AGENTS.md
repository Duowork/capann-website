# AGENTS.md — capann-website

## What this is
Marketing landing page for **Capann**, a browser extension (draw, point, screenshot, screen-record on any page; one-time purchase, no subscription). Built by Duowork.
Single-page React site. Content and visual design are ports of the static design export — do not invent copy or styling.

## Source of truth (design export, outside this repo)
`/Users/romeo/Desktop/Capann website/`
- `Capann Landing.dc.html` — full page structure + copy (authoritative, incl. FAQ)
- `uploads/capann-website-copy.md` — marketing copy
- `uploads/design-tokens.md` — toolbar design system (surfaces, borders, accents, text, radius, motion, translucency, states)
- `Capann Brand Sheet.dc.html` + `assets/README.md` — logo usage, palette (`#121212` ink, `#F6F5F2` paper, `#A78BFA` draw, `#86EFAC` recording, `#F5E8A6` highlight)
- `assets/{svg,png,favicon}/` — copied into this repo's `public/`; re-copy from here if assets change

## Stack
Vite 8 + React 19 (JS, no TypeScript) + Tailwind CSS v4 (`@tailwindcss/vite`). Node 22. Lint: `oxlint`.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/` (always verify changes with this)
- `npm run preview` — serve `dist/` locally
- `npm run lint` — oxlint
- `npm run deploy` — build + publish `dist/` to `gh-pages` branch (`predeploy` runs the build)

## Deployment
GitHub Project Pages at `https://romeopeter.github.io/capann-website/` (remote `origin`: `romeopeter/capann-website`).
- `vite.config.js` sets `base: '/capann-website/'`. Do not remove/alter without updating deploy target.
- After `npm run deploy`, Pages must serve from the `gh-pages` branch (one-time repo-settings step).
- `index.html` asset URLs are rewritten by Vite automatically; **hardcoded absolute public paths in JSX break under the base** — always prefix with `import.meta.env.BASE_URL` (see `src/App.jsx` logo `<img>` usage).

## Styling rules
- Tailwind utilities for general styling; custom CSS only where necessary (`src/index.css`).
- Design tokens live in `@theme` in `src/index.css`, mapped 1:1 from `design-tokens.md`:
  canonical names (`bg-surface-base`, `rounded-panel`, `ease-morph`, `blur-panel`, …) + short landing aliases (`bg-panel`, `text-draw`, `bg-ink`, …). Both work; prefer canonical names in new code.
- Custom helpers: `.glass` (frosted panel), `.tool-active`, `.duration-morph`, `.delay-stagger-row`, `.font-display`.
- Token doc rule: never introduce new colors/radii/fonts silently — deviations are flagged in the `index.css` header comment (page bg `#141417`, browser mock `#0F0F12`, body `#B8B8C0`, hover `#C4B0FC`, save-ink `#0A2E1B` are landing-derived).
- Tailwind v4 tree-shakes unused non-color theme vars from output; utilities still generate on demand. Verified pattern: use the class, `npm run build`, grep `dist/assets/*.css`.

## App structure
- `src/App.jsx` — entire page (data arrays `USES`/`FEATURES`/`SHORTCUTS`/`FAQS` + `ToolbarDemo` interactive toolbar mock with `useState` for tool/color/size). `ToolbarDemo` is a demo, not the real extension.
- `src/main.jsx` — entry; `src/index.css` — theme + base styles; `index.html` — fonts (Big Shoulders Display + Sora via Google Fonts), favicons, meta.
- Brand icon in use: `svg/capann-icon-light.svg` ("light" = for dark backgrounds, per assets README).

## Git
`main` branch. Keep commits scoped (landing build / theme / deploy were separate commits). `node_modules/` and `dist/` are gitignored — never commit them.
